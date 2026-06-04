import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import {
  EMAIL_QUEUE_STATUSES,
  EMAIL_QUEUE_TYPES,
  cancelEmailQueueJob,
  getEmailQueueStatus,
  listEmailQueueJobs,
  retryEmailQueueJob,
  type EmailQueueJob,
  type EmailQueueStatus,
  type EmailQueueStatusResponse,
  type EmailQueueType,
  type PaginatedEmailQueueJobsResponse,
} from "../../services/api";
import { formatApiErrorForDisplay } from "../../services/httpClient";
import * as S from "./styles";

const PAGE_LIMIT = 20;
const REFRESH_INTERVAL_MS = 60000;

type StatusFilter = EmailQueueStatus | "ALL";
type TypeFilter = EmailQueueType | "ALL";
type QueueAction = "retry" | "cancel";

const STATUS_LABELS: Record<EmailQueueStatus, string> = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SENT: "Sent",
  FAILED: "Failed",
  RETRYING: "Retrying",
  CANCELLED: "Cancelled",
};

const TYPE_LABELS: Record<EmailQueueType, string> = {
  CONTACT: "Contact",
  APPLICATION: "Application",
  USER_INFO: "User info",
  PUBLICATION_BROADCAST: "Publication broadcast",
};

const STATUS_TONES: Record<
  EmailQueueStatus,
  "pending" | "processing" | "sent" | "failed" | "retrying" | "cancelled"
> = {
  PENDING: "pending",
  PROCESSING: "processing",
  SENT: "sent",
  FAILED: "failed",
  RETRYING: "retrying",
  CANCELLED: "cancelled",
};

const canRetryJob = (status: EmailQueueStatus) =>
  status === "FAILED" || status === "RETRYING" || status === "CANCELLED";

const canCancelJob = (status: EmailQueueStatus) =>
  status === "PENDING" || status === "RETRYING" || status === "FAILED";

const formatDateTime = (value?: string | null) => {
  if (!value) {
    return "Not scheduled";
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

const buildQueueParams = (
  page: number,
  statusFilter: StatusFilter,
  typeFilter: TypeFilter,
) => ({
  page,
  limit: PAGE_LIMIT,
  ...(statusFilter !== "ALL" ? { status: statusFilter } : {}),
  ...(typeFilter !== "ALL" ? { type: typeFilter } : {}),
});

const getQueueErrorMessage = (error: unknown, fallbackMessage: string) =>
  formatApiErrorForDisplay(error, fallbackMessage, {
    includeRequestId: true,
  });

const InternalEmailQueue: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [queueStatus, setQueueStatus] =
    useState<EmailQueueStatusResponse | null>(null);
  const [queueJobs, setQueueJobs] =
    useState<PaginatedEmailQueueJobsResponse | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [queueError, setQueueError] = useState("");
  const [lastUpdatedAt, setLastUpdatedAt] = useState("");
  const [activeAction, setActiveAction] = useState<{
    jobId: number;
    action: QueueAction;
  } | null>(null);

  const loadQueueSnapshot = async (options: { silent?: boolean } = {}) => {
    if (options.silent) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const [nextStatus, nextJobs] = await Promise.all([
        getEmailQueueStatus(),
        listEmailQueueJobs(buildQueueParams(page, statusFilter, typeFilter)),
      ]);

      setQueueStatus(nextStatus);
      setQueueJobs(nextJobs);
      setQueueError("");
      setLastUpdatedAt(new Date().toISOString());
    } catch (error) {
      setQueueError(
        getQueueErrorMessage(
          error,
          "We couldn't load the email queue right now. Please try again later.",
        ),
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadQueue = async (options: { silent?: boolean } = {}) => {
      if (options.silent) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const [nextStatus, nextJobs] = await Promise.all([
          getEmailQueueStatus(),
          listEmailQueueJobs(buildQueueParams(page, statusFilter, typeFilter)),
        ]);

        if (!isMounted) {
          return;
        }

        setQueueStatus(nextStatus);
        setQueueJobs(nextJobs);
        setQueueError("");
        setLastUpdatedAt(new Date().toISOString());
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setQueueError(
          getQueueErrorMessage(
            error,
            "We couldn't load the email queue right now. Please try again later.",
          ),
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    };

    void loadQueue();
    const refreshInterval = window.setInterval(() => {
      void loadQueue({ silent: true });
    }, REFRESH_INTERVAL_MS);

    return () => {
      isMounted = false;
      window.clearInterval(refreshInterval);
    };
  }, [page, statusFilter, typeFilter]);

  const handleStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setStatusFilter(event.target.value as StatusFilter);
    setPage(1);
  };

  const handleTypeFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setTypeFilter(event.target.value as TypeFilter);
    setPage(1);
  };

  const handleRetryJob = async (job: EmailQueueJob) => {
    setActiveAction({ jobId: job.id, action: "retry" });

    try {
      const response = await retryEmailQueueJob(job.id);
      toast.success(response.message);
      await loadQueueSnapshot({ silent: true });
    } catch (error) {
      toast.error(
        getQueueErrorMessage(
          error,
          "We couldn't retry this email job right now.",
        ),
      );
    } finally {
      setActiveAction(null);
    }
  };

  const handleCancelJob = async (job: EmailQueueJob) => {
    if (!window.confirm(`Cancel email queue job #${job.id}?`)) {
      return;
    }

    setActiveAction({ jobId: job.id, action: "cancel" });

    try {
      const response = await cancelEmailQueueJob(job.id);
      toast.success(response.message);
      await loadQueueSnapshot({ silent: true });
    } catch (error) {
      toast.error(
        getQueueErrorMessage(
          error,
          "We couldn't cancel this email job right now.",
        ),
      );
    } finally {
      setActiveAction(null);
    }
  };

  const totalPages = queueJobs?.totalPages ?? 1;
  const counts = queueStatus?.counts;
  const hasJobs = Boolean(queueJobs?.data.length);

  return (
    <S.PageContainer>
      <S.HeaderCard>
        <div>
          <S.PageTitle>Email queue</S.PageTitle>
          <S.PageSubtitle>
            Monitor queued public email deliveries, retry failed messages, and
            cancel pending jobs without changing the public form contracts.
          </S.PageSubtitle>
        </div>

        <S.RoleChip>{user?.role ?? "No role"}</S.RoleChip>
      </S.HeaderCard>

      <S.MetricsGrid>
        <S.MetricCard>
          <S.MetricLabel>Pending</S.MetricLabel>
          <S.MetricValue>{counts?.PENDING ?? "..."}</S.MetricValue>
          <S.MetricHelp>Waiting for the backend worker to send.</S.MetricHelp>
        </S.MetricCard>

        <S.MetricCard>
          <S.MetricLabel>Retrying</S.MetricLabel>
          <S.MetricValue>{counts?.RETRYING ?? "..."}</S.MetricValue>
          <S.MetricHelp>Scheduled again after a failed attempt.</S.MetricHelp>
        </S.MetricCard>

        <S.MetricCard>
          <S.MetricLabel>Failed</S.MetricLabel>
          <S.MetricValue>{counts?.FAILED ?? "..."}</S.MetricValue>
          <S.MetricHelp>Needs review or a manual retry.</S.MetricHelp>
        </S.MetricCard>

        <S.MetricCard>
          <S.MetricLabel>Next send</S.MetricLabel>
          <S.MetricValue>
            {formatDateTime(queueStatus?.nextScheduledAt)}
          </S.MetricValue>
          <S.MetricHelp>
            Last updated {formatDateTime(lastUpdatedAt)}.
          </S.MetricHelp>
        </S.MetricCard>
      </S.MetricsGrid>

      <S.SectionCard>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Email delivery health</S.SectionTitle>
            <S.SectionDescription>
              Public form submissions still use the same routes. A successful
              response now means the backend safely received and queued the email.
            </S.SectionDescription>
          </div>

          <S.SecondaryButton
            type="button"
            onClick={() => void loadQueueSnapshot({ silent: true })}
            disabled={isLoading || isRefreshing}
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </S.SecondaryButton>
        </S.SectionHeader>

        {queueError && <S.StatusBox $isError>{queueError}</S.StatusBox>}

        <S.MetricsGrid>
          <S.MetricCard>
            <S.MetricLabel>Processing</S.MetricLabel>
            <S.MetricValue>{counts?.PROCESSING ?? "..."}</S.MetricValue>
            <S.MetricHelp>Currently being handled by the backend.</S.MetricHelp>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricLabel>Sent</S.MetricLabel>
            <S.MetricValue>{counts?.SENT ?? "..."}</S.MetricValue>
            <S.MetricHelp>Successfully delivered through the provider.</S.MetricHelp>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricLabel>Cancelled</S.MetricLabel>
            <S.MetricValue>{counts?.CANCELLED ?? "..."}</S.MetricValue>
            <S.MetricHelp>Stopped before being sent.</S.MetricHelp>
          </S.MetricCard>
        </S.MetricsGrid>
      </S.SectionCard>

      <S.SectionCard>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Queued jobs</S.SectionTitle>
            <S.SectionDescription>
              Emails are masked by the backend, so the dashboard can be useful
              without exposing full recipient data.
            </S.SectionDescription>
          </div>
        </S.SectionHeader>

        <S.FilterGrid>
          <S.FieldGroup>
            <label htmlFor="email-queue-status">Status</label>
            <S.Select
              id="email-queue-status"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="ALL">All statuses</option>
              {EMAIL_QUEUE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </S.Select>
          </S.FieldGroup>

          <S.FieldGroup>
            <label htmlFor="email-queue-type">Type</label>
            <S.Select
              id="email-queue-type"
              value={typeFilter}
              onChange={handleTypeFilterChange}
            >
              <option value="ALL">All types</option>
              {EMAIL_QUEUE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {TYPE_LABELS[type]}
                </option>
              ))}
            </S.Select>
          </S.FieldGroup>

          <S.FieldGroup>
            <label>Result</label>
            <S.DetailValue>
              {queueJobs
                ? `${queueJobs.total} job${queueJobs.total === 1 ? "" : "s"} found`
                : "Loading jobs..."}
            </S.DetailValue>
          </S.FieldGroup>
        </S.FilterGrid>

        {isLoading ? (
          <S.StatusBox>Loading email queue jobs...</S.StatusBox>
        ) : !hasJobs ? (
          <S.EmptyState>No email queue jobs found for these filters.</S.EmptyState>
        ) : (
          <S.QueueList>
            {queueJobs?.data.map((job) => {
              const isRetrying =
                activeAction?.jobId === job.id && activeAction.action === "retry";
              const isCancelling =
                activeAction?.jobId === job.id &&
                activeAction.action === "cancel";

              return (
                <S.QueueCard key={job.id}>
                  <S.QueueCardHeader>
                    <div>
                      <S.MetaRow>
                        <S.TypeBadge>{TYPE_LABELS[job.type]}</S.TypeBadge>
                        <S.StatusPill $status={STATUS_TONES[job.status]}>
                          {STATUS_LABELS[job.status]}
                        </S.StatusPill>
                        <S.DetailValue>#{job.id}</S.DetailValue>
                      </S.MetaRow>

                      <S.QueueSubject>{job.subject}</S.QueueSubject>
                    </div>

                    <S.CardActions>
                      {canRetryJob(job.status) && (
                        <S.SecondaryButton
                          type="button"
                          onClick={() => void handleRetryJob(job)}
                          disabled={Boolean(activeAction)}
                        >
                          {isRetrying ? "Retrying..." : "Retry"}
                        </S.SecondaryButton>
                      )}

                      {canCancelJob(job.status) && (
                        <S.DangerButton
                          type="button"
                          onClick={() => void handleCancelJob(job)}
                          disabled={Boolean(activeAction)}
                        >
                          {isCancelling ? "Cancelling..." : "Cancel"}
                        </S.DangerButton>
                      )}
                    </S.CardActions>
                  </S.QueueCardHeader>

                  <S.DetailGrid>
                    <S.DetailItem>
                      <S.DetailLabel>To</S.DetailLabel>
                      <S.DetailValue>{job.to}</S.DetailValue>
                    </S.DetailItem>

                    <S.DetailItem>
                      <S.DetailLabel>Attempts</S.DetailLabel>
                      <S.DetailValue>
                        {job.attempts} / {job.maxAttempts}
                      </S.DetailValue>
                    </S.DetailItem>

                    <S.DetailItem>
                      <S.DetailLabel>Scheduled</S.DetailLabel>
                      <S.DetailValue>{formatDateTime(job.scheduledAt)}</S.DetailValue>
                    </S.DetailItem>

                    <S.DetailItem>
                      <S.DetailLabel>Sent</S.DetailLabel>
                      <S.DetailValue>{formatDateTime(job.sentAt)}</S.DetailValue>
                    </S.DetailItem>

                    <S.DetailItem>
                      <S.DetailLabel>Created</S.DetailLabel>
                      <S.DetailValue>{formatDateTime(job.createdAt)}</S.DetailValue>
                    </S.DetailItem>

                    <S.DetailItem>
                      <S.DetailLabel>Updated</S.DetailLabel>
                      <S.DetailValue>{formatDateTime(job.updatedAt)}</S.DetailValue>
                    </S.DetailItem>
                  </S.DetailGrid>

                  {job.lastError && (
                    <S.ErrorText>Last error: {job.lastError}</S.ErrorText>
                  )}
                </S.QueueCard>
              );
            })}
          </S.QueueList>
        )}

        <S.PaginationRow>
          <S.PaginationText>
            Page {queueJobs?.page ?? page} of {totalPages}
          </S.PaginationText>

          <S.CardActions>
            <S.SecondaryButton
              type="button"
              onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              disabled={isLoading || page <= 1}
            >
              Previous
            </S.SecondaryButton>
            <S.SecondaryButton
              type="button"
              onClick={() =>
                setPage((currentPage) => Math.min(totalPages, currentPage + 1))
              }
              disabled={isLoading || page >= totalPages}
            >
              Next
            </S.SecondaryButton>
          </S.CardActions>
        </S.PaginationRow>
      </S.SectionCard>
    </S.PageContainer>
  );
};

export default InternalEmailQueue;
