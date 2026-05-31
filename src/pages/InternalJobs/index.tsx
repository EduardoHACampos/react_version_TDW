import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import {
  createJob,
  deleteJobPermanently,
  getJobs,
  toggleJobStatus,
  updateJob,
  type Job,
} from "../../services/api";
import { ApiClientError, formatApiErrorForDisplay } from "../../services/httpClient";
import * as S from "./styles";

interface JobFormValues {
  title: string;
  description: string;
  isActive: boolean;
}

const INITIAL_FORM_VALUES: JobFormValues = {
  title: "",
  description: "",
  isActive: true,
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

const formatCreatedAt = (value?: string) => {
  if (!value) {
    return "Recently created";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently created";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const validateJobForm = (values: JobFormValues) => {
  const nextErrors: Record<string, string> = {};

  if (values.title.trim().length < 3) {
    nextErrors.title = "Title must be at least 3 characters.";
  }

  if (!values.description.trim()) {
    nextErrors.description = "Description is required.";
  }

  return nextErrors;
};

const getJobAdminErrorMessage = (error: unknown, fallbackMessage: string) =>
  formatApiErrorForDisplay(error, fallbackMessage, {
    includeRequestId: true,
  });

const InternalJobs: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [formValues, setFormValues] = useState<JobFormValues>(INITIAL_FORM_VALUES);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState("");
  const [jobsMessage, setJobsMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [editingValues, setEditingValues] = useState<JobFormValues>(INITIAL_FORM_VALUES);
  const [editingErrors, setEditingErrors] = useState<Record<string, string>>({});
  const [editingMessage, setEditingMessage] = useState("");
  const [isSavingJobId, setIsSavingJobId] = useState<number | null>(null);
  const [isTogglingJobId, setIsTogglingJobId] = useState<number | null>(null);
  const [isDeletingJobId, setIsDeletingJobId] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      try {
        setIsLoadingJobs(true);
        setJobsMessage("");
        const nextJobs = await getJobs();

        if (!isMounted) {
          return;
        }

        setJobs(sortJobs(nextJobs));
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setJobsMessage(
          getJobAdminErrorMessage(
            error,
            "We couldn't load the current jobs right now. Please try again later.",
          ),
        );
      } finally {
        if (isMounted) {
          setIsLoadingJobs(false);
        }
      }
    };

    void loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFieldChange = <K extends keyof JobFormValues>(
    field: K,
    value: JobFormValues[K],
  ) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    if (fieldErrors[field]) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        [field]: "",
      }));
    }

    if (formMessage) {
      setFormMessage("");
    }
  };

  const resetForm = () => {
    setFormValues(INITIAL_FORM_VALUES);
    setFieldErrors({});
    setFormMessage("");
  };

  const replaceJobInState = (nextJob: Job) => {
    setJobs((currentJobs) =>
      sortJobs(
        currentJobs.map((job) => (job.id === nextJob.id ? nextJob : job)),
      ),
    );
  };

  const handleStartEdit = (job: Job) => {
    setEditingJobId(job.id);
    setEditingValues({
      title: job.title,
      description: job.description,
      isActive: job.isActive,
    });
    setEditingErrors({});
    setEditingMessage("");
  };

  const handleCancelEdit = () => {
    setEditingJobId(null);
    setEditingValues(INITIAL_FORM_VALUES);
    setEditingErrors({});
    setEditingMessage("");
  };

  const handleEditingFieldChange = <K extends keyof JobFormValues>(
    field: K,
    value: JobFormValues[K],
  ) => {
    setEditingValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    if (editingErrors[field]) {
      setEditingErrors((currentErrors) => ({
        ...currentErrors,
        [field]: "",
      }));
    }

    if (editingMessage) {
      setEditingMessage("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateJobForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    setFormMessage("");

    try {
      const createdJob = await createJob(formValues);

      setJobs((currentJobs) =>
        sortJobs([
          createdJob,
          ...currentJobs.filter((job) => job.id !== createdJob.id),
        ]),
      );
      toast.success("Job created successfully.");
      resetForm();
    } catch (error) {
      if (error instanceof ApiClientError) {
        const nextFieldErrors = { ...(error.fieldErrors ?? {}) };

        if (error.status === 409 && !nextFieldErrors.title) {
          nextFieldErrors.title = error.message;
        }

        setFieldErrors(nextFieldErrors);
        setFormMessage(
          getJobAdminErrorMessage(
            error,
            "We couldn't create this job right now. Please try again later.",
          ),
        );
      } else if (error instanceof Error) {
        setFormMessage(error.message);
      } else {
        setFormMessage(
          "We couldn't create this job right now. Please try again later.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmEdit = async (jobId: number) => {
    const validationErrors = validateJobForm(editingValues);

    if (Object.keys(validationErrors).length > 0) {
      setEditingErrors(validationErrors);
      return;
    }

    setIsSavingJobId(jobId);
    setEditingErrors({});
    setEditingMessage("");

    try {
      const updatedJob = await updateJob(jobId, {
        title: editingValues.title,
        description: editingValues.description,
      });

      replaceJobInState(updatedJob);
      toast.success("Job updated successfully.");
      handleCancelEdit();
    } catch (error) {
      if (error instanceof ApiClientError) {
        const nextFieldErrors = { ...(error.fieldErrors ?? {}) };

        if (error.status === 409 && !nextFieldErrors.title) {
          nextFieldErrors.title = error.message;
        }

        setEditingErrors(nextFieldErrors);
        setEditingMessage(
          getJobAdminErrorMessage(
            error,
            "We couldn't update this job right now. Please try again later.",
          ),
        );
      } else if (error instanceof Error) {
        setEditingMessage(error.message);
      } else {
        setEditingMessage(
          "We couldn't update this job right now. Please try again later.",
        );
      }
    } finally {
      setIsSavingJobId(null);
    }
  };

  const handleToggleJob = async (job: Job) => {
    const nextActionLabel = job.isActive ? "disable" : "enable";

    if (
      !window.confirm(
        `Do you want to ${nextActionLabel} "${job.title}"?`,
      )
    ) {
      return;
    }

    setIsTogglingJobId(job.id);

    try {
      const response = await toggleJobStatus(job.id);
      replaceJobInState(response.job);
      toast.success(
        response.job.isActive
          ? "Job enabled successfully."
          : "Job disabled successfully.",
      );
    } catch (error) {
      toast.error(
        getJobAdminErrorMessage(
          error,
          "We couldn't update this job status right now. Please try again later.",
        ),
      );
    } finally {
      setIsTogglingJobId(null);
    }
  };

  const handleDeleteJob = async (job: Job) => {
    if (
      !window.confirm(
        `Permanently delete "${job.title}"? This cannot be undone and may be blocked if applications are linked.`,
      )
    ) {
      return;
    }

    setIsDeletingJobId(job.id);

    try {
      const response = await deleteJobPermanently(job.id);

      setJobs((currentJobs) =>
        sortJobs(currentJobs.filter((currentJob) => currentJob.id !== job.id)),
      );
      toast.success(response.message);
    } catch (error) {
      toast.error(
        getJobAdminErrorMessage(
          error,
          "We couldn't permanently delete this job right now. Please try again later.",
        ),
      );
    } finally {
      setIsDeletingJobId(null);
    }
  };

  return (
    <S.PageContainer>
      <S.HeaderCard>
        <div>
          <S.PageTitle>Job board</S.PageTitle>
          <S.PageSubtitle>
            Create protected job openings for the public opportunities page using
            the current backend contract.
          </S.PageSubtitle>
        </div>

        <S.RoleChip>{user?.role ?? "No role"}</S.RoleChip>
      </S.HeaderCard>

      <S.InfoCard>
        <S.InfoTitle>Permission summary</S.InfoTitle>
        <S.InfoText>
          Only Admin and Leader accounts can create new jobs. Public listing,
          public job details, and public applications stay on the existing job
          routes.
        </S.InfoText>
      </S.InfoCard>

      <S.FormCard>
        <S.SectionTitle>Create job</S.SectionTitle>

        {formMessage && <S.StatusBox $isError>{formMessage}</S.StatusBox>}

        <S.Form onSubmit={handleSubmit}>
          <S.FieldGroup>
            <label htmlFor="job-title">Title</label>
            <S.TextInput
              id="job-title"
              value={formValues.title}
              onChange={(event) => handleFieldChange("title", event.target.value)}
              placeholder="Frontend Developer"
              required
            />
            {fieldErrors.title && <S.FieldError>{fieldErrors.title}</S.FieldError>}
          </S.FieldGroup>

          <S.FieldGroup>
            <label htmlFor="job-description">Description</label>
            <S.TextArea
              id="job-description"
              value={formValues.description}
              onChange={(event) =>
                handleFieldChange("description", event.target.value)
              }
              placeholder="Describe the role, expectations, and key skills."
              required
            />
            {fieldErrors.description && (
              <S.FieldError>{fieldErrors.description}</S.FieldError>
            )}
          </S.FieldGroup>

          <S.ToggleField>
            <input
              id="job-is-active"
              type="checkbox"
              checked={formValues.isActive}
              onChange={(event) =>
                handleFieldChange("isActive", event.target.checked)
              }
            />
            <div>
              <span>Publish as active job</span>
              <small>
                Active jobs appear in the public opportunities flow immediately.
              </small>
            </div>
          </S.ToggleField>

          <S.ActionRow>
            <S.PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create job"}
            </S.PrimaryButton>
          </S.ActionRow>
        </S.Form>
      </S.FormCard>

      <S.ListCard>
        <S.SectionTitle>Current jobs</S.SectionTitle>

        {isLoadingJobs ? (
          <S.StatusBox>Loading current jobs...</S.StatusBox>
        ) : jobsMessage ? (
          <S.StatusBox $isError>{jobsMessage}</S.StatusBox>
        ) : jobs.length === 0 ? (
          <S.EmptyState>No jobs created yet.</S.EmptyState>
        ) : (
          <S.JobsGrid>
            {jobs.map((job) => {
              const isEditing = editingJobId === job.id;
              const isSavingThisJob = isSavingJobId === job.id;
              const isTogglingThisJob = isTogglingJobId === job.id;
              const isDeletingThisJob = isDeletingJobId === job.id;

              return (
                <S.JobCard key={job.id}>
                  <S.JobCardHeader>
                    <S.JobMetaBlock>
                      <S.JobStatus $isActive={job.isActive}>
                        {job.isActive ? "Active" : "Inactive"}
                      </S.JobStatus>
                      <S.JobDate>{formatCreatedAt(job.createdAt)}</S.JobDate>
                    </S.JobMetaBlock>

                    <S.CardActionRow>
                      {!isEditing ? (
                        <S.SecondaryButton
                          type="button"
                          onClick={() => handleStartEdit(job)}
                          disabled={isSavingJobId !== null || isTogglingJobId !== null}
                        >
                          Edit
                        </S.SecondaryButton>
                      ) : (
                        <>
                          <S.SecondaryButton
                            type="button"
                            onClick={handleCancelEdit}
                            disabled={isSavingThisJob}
                          >
                            Cancel
                          </S.SecondaryButton>
                          <S.PrimaryButton
                            type="button"
                            onClick={() => void handleConfirmEdit(job.id)}
                            disabled={isSavingThisJob}
                          >
                            {isSavingThisJob ? "Saving..." : "Confirm"}
                          </S.PrimaryButton>
                        </>
                      )}
                    </S.CardActionRow>
                  </S.JobCardHeader>

                  {!isEditing ? (
                    <>
                      <S.JobTitle>{job.title}</S.JobTitle>
                      <S.JobDescription>{job.description}</S.JobDescription>

                      <S.JobFooter>
                        <S.SecondaryButton
                          type="button"
                          onClick={() => void handleToggleJob(job)}
                          disabled={
                            isTogglingThisJob ||
                            isSavingJobId !== null ||
                            isDeletingThisJob
                          }
                        >
                          {isTogglingThisJob
                            ? "Updating..."
                            : job.isActive
                              ? "Disable"
                              : "Enable"}
                        </S.SecondaryButton>
                        <S.DangerButton
                          type="button"
                          onClick={() => void handleDeleteJob(job)}
                          disabled={
                            isTogglingThisJob ||
                            isSavingJobId !== null ||
                            isDeletingThisJob
                          }
                        >
                          {isDeletingThisJob ? "Deleting..." : "Delete permanently"}
                        </S.DangerButton>
                      </S.JobFooter>
                    </>
                  ) : (
                    <S.InlineEditorShell>
                      {editingMessage && (
                        <S.StatusBox $isError>{editingMessage}</S.StatusBox>
                      )}

                      <S.FieldGroup>
                        <label htmlFor={`job-title-${job.id}`}>Title</label>
                        <S.TextInput
                          id={`job-title-${job.id}`}
                          value={editingValues.title}
                          onChange={(event) =>
                            handleEditingFieldChange("title", event.target.value)
                          }
                          placeholder="Frontend Developer"
                          required
                        />
                        {editingErrors.title && (
                          <S.FieldError>{editingErrors.title}</S.FieldError>
                        )}
                      </S.FieldGroup>

                      <S.FieldGroup>
                        <label htmlFor={`job-description-${job.id}`}>
                          Description
                        </label>
                        <S.TextArea
                          id={`job-description-${job.id}`}
                          value={editingValues.description}
                          onChange={(event) =>
                            handleEditingFieldChange(
                              "description",
                              event.target.value,
                            )
                          }
                          placeholder="Describe the role, expectations, and key skills."
                          required
                        />
                        {editingErrors.description && (
                          <S.FieldError>{editingErrors.description}</S.FieldError>
                        )}
                      </S.FieldGroup>
                    </S.InlineEditorShell>
                  )}
                </S.JobCard>
              );
            })}
          </S.JobsGrid>
        )}
      </S.ListCard>
    </S.PageContainer>
  );
};

export default InternalJobs;
