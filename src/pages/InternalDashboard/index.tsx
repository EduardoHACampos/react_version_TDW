import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PUBLICATION_FILTERS, getPublicationTypeLabel } from "../../constants/publications";
import { AuthContext } from "../../contexts/AuthContext";
import type { Publication, UserRole } from "../../interface";
import {
  getApiHealthReady,
  getJobs,
  listPublications,
  updateCurrentUser,
  type ApiHealthReady,
  type Job,
} from "../../services/api";
import { ApiClientError, formatApiErrorForDisplay } from "../../services/httpClient";
import { stripHtml } from "../../utils/html";
import {
  canCreateUsers,
  canManageJobs,
  canManagePublications,
  canManageUsers,
} from "../../utils/roles";
import * as S from "./styles";

interface ProfileFormValues {
  name: string;
  email: string;
  currentPassword: string;
  password: string;
}

const formatDate = (value?: string) => {
  if (!value) {
    return "Recently updated";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently updated";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const formatDateTime = (value?: string) => {
  if (!value) {
    return "Not checked yet";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
};

const formatUptime = (uptime: number | null | undefined) => {
  if (typeof uptime !== "number" || uptime < 0) {
    return "Unknown";
  }

  const totalSeconds = Math.floor(uptime);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
};

const sortJobs = (jobs: Job[]) =>
  [...jobs].sort((leftJob, rightJob) => {
    if (leftJob.isActive !== rightJob.isActive) {
      return Number(rightJob.isActive) - Number(leftJob.isActive);
    }

    if (leftJob.createdAt && rightJob.createdAt) {
      return (
        new Date(rightJob.createdAt).getTime() -
        new Date(leftJob.createdAt).getTime()
      );
    }

    return rightJob.id - leftJob.id;
  });

const getRoleSummary = (role: UserRole | null | undefined) => {
  if (role === "ADMIN") {
    return "You have full studio access across publications, hiring, and team management.";
  }

  if (role === "LEADER") {
    return "You can manage publications, open job positions, and control developer accounts.";
  }

  return "You can review the protected studio area, while account and hiring management stay hidden for your role.";
};

const getAccessLevelLabel = (role: UserRole | null | undefined) => {
  if (role === "ADMIN") {
    return "Full access";
  }

  if (role === "LEADER") {
    return "Content + team oversight";
  }

  return "Review access";
};

const getTeamActionDescription = (role: UserRole | null | undefined) => {
  if (role === "ADMIN") {
    return "Create Admin, Leader, and Developer accounts under the current role rules.";
  }

  return "Review user management access and control developer lifecycle actions within the current backend hierarchy.";
};

const InternalDashboard: React.FC = () => {
  const { user, syncUser } = useContext(AuthContext);
  const [recentPublications, setRecentPublications] = useState<Publication[]>([]);
  const [publicationTotal, setPublicationTotal] = useState(0);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [publicationsError, setPublicationsError] = useState("");
  const [jobsError, setJobsError] = useState("");
  const [profileValues, setProfileValues] = useState<ProfileFormValues>({
    name: "",
    email: "",
    currentPassword: "",
    password: "",
  });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileMessage, setProfileMessage] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [apiHealth, setApiHealth] = useState<ApiHealthReady | null>(null);
  const [apiHealthError, setApiHealthError] = useState("");
  const [isCheckingApiHealth, setIsCheckingApiHealth] = useState(true);
  const [lastHealthCheckAt, setLastHealthCheckAt] = useState("");

  useEffect(() => {
    setProfileValues((currentValues) => ({
      ...currentValues,
      name: user?.name ?? "",
      email: user?.email ?? "",
      currentPassword: "",
      password: "",
    }));
    setProfileErrors({});
    setProfileMessage("");
  }, [user?.email, user?.name]);

  useEffect(() => {
    let isMounted = true;

    const loadOverview = async () => {
      setIsLoading(true);
      setPublicationsError("");
      setJobsError("");

      const [publicationsResult, jobsResult] = await Promise.allSettled([
        listPublications({ page: 1, limit: 4 }),
        getJobs(),
      ]);

      if (!isMounted) {
        return;
      }

      if (publicationsResult.status === "fulfilled") {
        setRecentPublications(publicationsResult.value.data);
        setPublicationTotal(publicationsResult.value.total);
      } else {
        setRecentPublications([]);
        setPublicationTotal(0);
        setPublicationsError(
          formatApiErrorForDisplay(
            publicationsResult.reason,
            "We couldn't load publications right now.",
            { includeRequestId: true },
          ),
        );
      }

      if (jobsResult.status === "fulfilled") {
        setJobs(sortJobs(jobsResult.value));
      } else {
        setJobs([]);
        setJobsError(
          formatApiErrorForDisplay(
            jobsResult.reason,
            "We couldn't load jobs right now.",
            { includeRequestId: true },
          ),
        );
      }

      setIsLoading(false);
    };

    void loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadHealthStatus = async () => {
      setIsCheckingApiHealth(true);

      try {
        const health = await getApiHealthReady();

        if (!isMounted) {
          return;
        }

        setApiHealth(health);
        setApiHealthError("");
        setLastHealthCheckAt(new Date().toISOString());
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setApiHealth(null);
        setApiHealthError(
          formatApiErrorForDisplay(
            error,
            "We couldn't check the API status right now.",
            { includeRequestId: true },
          ),
        );
        setLastHealthCheckAt(new Date().toISOString());
      } finally {
        if (isMounted) {
          setIsCheckingApiHealth(false);
        }
      }
    };

    void loadHealthStatus();
    const healthInterval = window.setInterval(loadHealthStatus, 60000);

    return () => {
      isMounted = false;
      window.clearInterval(healthInterval);
    };
  }, []);

  const activeJobsCount = jobs.filter((job) => job.isActive).length;
  const inactiveJobsCount = jobs.length - activeJobsCount;
  const availableInternalAreas =
    1 + Number(canManageJobs(user?.role)) + Number(canManageUsers(user?.role));

  const handleProfileFieldChange = <K extends keyof ProfileFormValues>(
    field: K,
    value: ProfileFormValues[K],
  ) => {
    setProfileValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    if (profileErrors[field]) {
      setProfileErrors((currentErrors) => ({
        ...currentErrors,
        [field]: "",
      }));
    }

    if (profileMessage) {
      setProfileMessage("");
    }
  };

  const resetProfileForm = () => {
    setProfileValues({
      name: user?.name ?? "",
      email: user?.email ?? "",
      currentPassword: "",
      password: "",
    });
    setProfileErrors({});
    setProfileMessage("");
  };

  const handleProfileSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (!profileValues.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!profileValues.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    if (profileValues.password && !profileValues.currentPassword) {
      nextErrors.currentPassword = "Current password is required to change your password.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setProfileErrors(nextErrors);
      return;
    }

    setIsSavingProfile(true);
    setProfileErrors({});
    setProfileMessage("");

    try {
      const payload = {
        name: profileValues.name.trim(),
        email: profileValues.email.trim(),
        ...(profileValues.password
          ? {
              currentPassword: profileValues.currentPassword,
              password: profileValues.password,
            }
          : {}),
      };

      const updatedUser = await updateCurrentUser(payload);
      syncUser(updatedUser);
      setProfileValues({
        name: updatedUser.name,
        email: updatedUser.email,
        currentPassword: "",
        password: "",
      });
      toast.success("Profile updated successfully.");
    } catch (error) {
      if (error instanceof ApiClientError) {
        setProfileErrors(error.fieldErrors ?? {});
        setProfileMessage(
          formatApiErrorForDisplay(
            error,
            "We couldn't update your profile right now. Please try again later.",
            { includeRequestId: true },
          ),
        );
      } else if (error instanceof Error) {
        setProfileMessage(error.message);
      } else {
        setProfileMessage(
          "We couldn't update your profile right now. Please try again later.",
        );
      }
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <S.PageContainer>
      <S.HeaderCard>
        <div>
          <S.PageTitle>Overview</S.PageTitle>
          <S.PageSubtitle>
            Keep track of the current protected workspace, public-facing content,
            and the modules available for your role.
          </S.PageSubtitle>
        </div>

        <S.RoleChip>{user?.role ?? "No role"}</S.RoleChip>
      </S.HeaderCard>

      <S.HighlightGrid>
        <S.HighlightCard>
          <S.HighlightEyebrow>Access level</S.HighlightEyebrow>
          <S.HighlightTitle>{getAccessLevelLabel(user?.role)}</S.HighlightTitle>
          <S.HighlightText>{getRoleSummary(user?.role)}</S.HighlightText>
        </S.HighlightCard>

        <S.HighlightCard>
          <S.HighlightEyebrow>Protected session</S.HighlightEyebrow>
          <S.HighlightTitle>{user?.name ?? "Unknown user"}</S.HighlightTitle>
          <S.HighlightText>
            Signed in as {user?.email ?? "unknown account"} with automatic
            protected requests for the modules available in this panel.
          </S.HighlightText>
        </S.HighlightCard>
      </S.HighlightGrid>

      <S.SectionCard>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>System status</S.SectionTitle>
            <S.SectionDescription>
              Internal API readiness check for support and production monitoring.
            </S.SectionDescription>
          </div>

          <S.StatusPill $status={apiHealthError ? "error" : apiHealth ? "ok" : "checking"}>
            {apiHealthError ? "Needs attention" : apiHealth ? "Online" : "Checking"}
          </S.StatusPill>
        </S.SectionHeader>

        {apiHealthError && <S.StatusBox $isError>{apiHealthError}</S.StatusBox>}

        <S.HealthGrid>
          <S.HealthItem>
            <S.MetricLabel>API</S.MetricLabel>
            <S.HealthValue>
              {isCheckingApiHealth && !apiHealth
                ? "Checking..."
                : apiHealth?.status ?? "Offline"}
            </S.HealthValue>
          </S.HealthItem>

          <S.HealthItem>
            <S.MetricLabel>Database</S.MetricLabel>
            <S.HealthValue>{apiHealth?.database ?? "Unknown"}</S.HealthValue>
          </S.HealthItem>

          <S.HealthItem>
            <S.MetricLabel>Uptime</S.MetricLabel>
            <S.HealthValue>{formatUptime(apiHealth?.uptime)}</S.HealthValue>
          </S.HealthItem>

          <S.HealthItem>
            <S.MetricLabel>Last check</S.MetricLabel>
            <S.HealthValue>{formatDateTime(lastHealthCheckAt)}</S.HealthValue>
          </S.HealthItem>
        </S.HealthGrid>
      </S.SectionCard>

      <S.SectionCard>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>My profile</S.SectionTitle>
            <S.SectionDescription>
              Review your current account details, update your email, and change
              your password without leaving the dashboard.
            </S.SectionDescription>
          </div>
        </S.SectionHeader>

        {profileMessage && <S.StatusBox $isError>{profileMessage}</S.StatusBox>}

        <S.ProfileForm onSubmit={handleProfileSubmit}>
          <S.FormGrid>
            <S.FormField>
              <label htmlFor="profile-name">Name</label>
              <S.TextInput
                id="profile-name"
                value={profileValues.name}
                onChange={(event) =>
                  handleProfileFieldChange("name", event.target.value)
                }
                autoComplete="name"
                required
              />
              {profileErrors.name && (
                <S.FieldError>{profileErrors.name}</S.FieldError>
              )}
            </S.FormField>

            <S.FormField>
              <label htmlFor="profile-email">Email</label>
              <S.TextInput
                id="profile-email"
                type="email"
                value={profileValues.email}
                onChange={(event) =>
                  handleProfileFieldChange("email", event.target.value)
                }
                autoComplete="email"
                required
              />
              {profileErrors.email && (
                <S.FieldError>{profileErrors.email}</S.FieldError>
              )}
            </S.FormField>
          </S.FormGrid>

          <S.FormGrid>
            <S.FormField>
              <label htmlFor="profile-current-password">Current password</label>
              <S.TextInput
                id="profile-current-password"
                type="password"
                value={profileValues.currentPassword}
                onChange={(event) =>
                  handleProfileFieldChange("currentPassword", event.target.value)
                }
                autoComplete="current-password"
              />
              {profileErrors.currentPassword && (
                <S.FieldError>{profileErrors.currentPassword}</S.FieldError>
              )}
            </S.FormField>

            <S.FormField>
              <label htmlFor="profile-password">New password</label>
              <S.TextInput
                id="profile-password"
                type="password"
                value={profileValues.password}
                onChange={(event) =>
                  handleProfileFieldChange("password", event.target.value)
                }
                autoComplete="new-password"
              />
              {profileErrors.password && (
                <S.FieldError>{profileErrors.password}</S.FieldError>
              )}
            </S.FormField>
          </S.FormGrid>

          <S.HelperText>
            Leave the password fields blank if you only want to update your name
            or email.
          </S.HelperText>

          <S.FormActions>
            <S.PrimaryButton type="submit" disabled={isSavingProfile}>
              {isSavingProfile ? "Saving..." : "Save profile"}
            </S.PrimaryButton>
            <S.SecondaryButton
              type="button"
              onClick={resetProfileForm}
              disabled={isSavingProfile}
            >
              Reset
            </S.SecondaryButton>
          </S.FormActions>
        </S.ProfileForm>
      </S.SectionCard>

      <S.MetricsGrid>
        <S.MetricCard>
          <S.MetricLabel>Publications</S.MetricLabel>
          <S.MetricValue>{isLoading ? "..." : publicationTotal}</S.MetricValue>
          <S.MetricHelp>Tracked from the current backend publications module.</S.MetricHelp>
        </S.MetricCard>

        <S.MetricCard>
          <S.MetricLabel>Active jobs</S.MetricLabel>
          <S.MetricValue>{isLoading ? "..." : activeJobsCount}</S.MetricValue>
          <S.MetricHelp>Visible on the public opportunities flow right now.</S.MetricHelp>
        </S.MetricCard>

        <S.MetricCard>
          <S.MetricLabel>Inactive jobs</S.MetricLabel>
          <S.MetricValue>{isLoading ? "..." : inactiveJobsCount}</S.MetricValue>
          <S.MetricHelp>Stored in the system but hidden from public listing.</S.MetricHelp>
        </S.MetricCard>

        <S.MetricCard>
          <S.MetricLabel>Internal areas</S.MetricLabel>
          <S.MetricValue>{availableInternalAreas}</S.MetricValue>
          <S.MetricHelp>Available now according to your authenticated role.</S.MetricHelp>
        </S.MetricCard>
      </S.MetricsGrid>

      <S.SectionCard>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Quick actions</S.SectionTitle>
            <S.SectionDescription>
              Jump directly to the modules that are enabled for your current role.
            </S.SectionDescription>
          </div>
        </S.SectionHeader>

        <S.ActionGrid>
          <S.ActionCard to="/internal/news">
            <S.ActionEyebrow>
              {canManagePublications(user?.role) ? "Manage" : "Review"}
            </S.ActionEyebrow>
            <S.ActionTitle>Publications</S.ActionTitle>
            <S.ActionDescription>
              {canManagePublications(user?.role)
                ? "Create, update, preview, and organize official public content."
                : "Review the publications area and stay aligned with the live content feed."}
            </S.ActionDescription>
            <S.ActionCta>Open publications</S.ActionCta>
          </S.ActionCard>

          {canManageJobs(user?.role) && (
            <S.ActionCard to="/internal/jobs">
              <S.ActionEyebrow>Manage</S.ActionEyebrow>
              <S.ActionTitle>Job Board</S.ActionTitle>
              <S.ActionDescription>
                Create protected vacancies that flow into the public opportunities
                page without changing the public apply contract.
              </S.ActionDescription>
              <S.ActionCta>Open job board</S.ActionCta>
            </S.ActionCard>
          )}

          {canManageUsers(user?.role) && (
            <S.ActionCard to="/internal/team">
              <S.ActionEyebrow>Manage</S.ActionEyebrow>
              <S.ActionTitle>Team Management</S.ActionTitle>
              <S.ActionDescription>
                {canCreateUsers(user?.role)
                  ? getTeamActionDescription(user?.role)
                  : "Review the internal hierarchy, where Admin creates accounts and Leader oversight is limited to developer lifecycle actions."}
              </S.ActionDescription>
              <S.ActionCta>Open team management</S.ActionCta>
            </S.ActionCard>
          )}

          {!canManageJobs(user?.role) && !canManageUsers(user?.role) && (
            <S.RestrictionCard>
              <S.ActionEyebrow>Restricted</S.ActionEyebrow>
              <S.ActionTitle>Administrative modules</S.ActionTitle>
              <S.ActionDescription>
                Hiring management and account creation stay unavailable for your
                current role, matching the backend permission model.
              </S.ActionDescription>
            </S.RestrictionCard>
          )}
        </S.ActionGrid>
      </S.SectionCard>

      <S.ContentGrid>
        <S.SectionCard>
          <S.SectionHeader>
            <div>
              <S.SectionTitle>Latest publications</S.SectionTitle>
              <S.SectionDescription>
                Recent official content from the current publications module.
              </S.SectionDescription>
            </div>
          </S.SectionHeader>

          {publicationsError ? (
            <S.StatusBox $isError>{publicationsError}</S.StatusBox>
          ) : recentPublications.length === 0 ? (
            <S.EmptyState>
              {isLoading ? "Loading publications..." : "No publications found yet."}
            </S.EmptyState>
          ) : (
            <S.List>
              {recentPublications.map((publication) => (
                <S.ListItem key={publication.id}>
                  <S.ListMetaRow>
                    <S.TypeBadge>
                      {getPublicationTypeLabel(publication.type)}
                    </S.TypeBadge>
                    <S.MetaText>{formatDate(publication.createdAt)}</S.MetaText>
                  </S.ListMetaRow>

                  <S.ListTitle>{publication.title}</S.ListTitle>
                  <S.ListDescription>
                    {stripHtml(publication.summary) || "No summary provided."}
                  </S.ListDescription>
                  <S.ListLink to={`/news/${publication.slug}`}>
                    Open public page
                  </S.ListLink>
                </S.ListItem>
              ))}
            </S.List>
          )}
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <div>
              <S.SectionTitle>Hiring snapshot</S.SectionTitle>
              <S.SectionDescription>
                Public job openings and stored vacancies from the current jobs module.
              </S.SectionDescription>
            </div>
          </S.SectionHeader>

          {jobsError ? (
            <S.StatusBox $isError>{jobsError}</S.StatusBox>
          ) : jobs.length === 0 ? (
            <S.EmptyState>
              {isLoading ? "Loading jobs..." : "No jobs found yet."}
            </S.EmptyState>
          ) : (
            <S.List>
              {jobs.slice(0, 4).map((job) => (
                <S.ListItem key={job.id}>
                  <S.ListMetaRow>
                    <S.JobStatus $isActive={job.isActive}>
                      {job.isActive ? "Active" : "Inactive"}
                    </S.JobStatus>
                    <S.MetaText>{formatDate(job.createdAt)}</S.MetaText>
                  </S.ListMetaRow>

                  <S.ListTitle>{job.title}</S.ListTitle>
                  <S.ListDescription>{job.description}</S.ListDescription>
                </S.ListItem>
              ))}
            </S.List>
          )}
        </S.SectionCard>
      </S.ContentGrid>

      <S.SectionCard>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Publication type lanes</S.SectionTitle>
            <S.SectionDescription>
              Current content lanes available in the backend handoff and the public site.
            </S.SectionDescription>
          </div>
        </S.SectionHeader>

        <S.FilterGrid>
          {PUBLICATION_FILTERS.map((filter) => (
            <S.FilterCard key={filter.value}>
              <S.ActionTitle>{filter.label}</S.ActionTitle>
              <S.ActionDescription>
                Routed through the publications module with type{" "}
                <strong>{filter.value}</strong>.
              </S.ActionDescription>
            </S.FilterCard>
          ))}
        </S.FilterGrid>
      </S.SectionCard>
    </S.PageContainer>
  );
};

export default InternalDashboard;
