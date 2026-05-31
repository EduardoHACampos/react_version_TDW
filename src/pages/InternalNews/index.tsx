import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { PUBLICATION_FILTERS, getPublicationTypeLabel } from "../../constants/publications";
import type { Publication, PublicationType } from "../../interface";
import {
  createPublication,
  deletePublication,
  deletePublicationImage,
  listPublications,
  updatePublication,
} from "../../services/api";
import {
  ApiClientError,
  formatApiErrorForDisplay,
  resolveApiUrl,
} from "../../services/httpClient";
import {
  htmlToPlainText,
  plainTextToHtml,
  renderRichTextMarkup,
  stripHtml,
} from "../../utils/html";
import { canManagePublications } from "../../utils/roles";
import * as S from "./styles";

const PAGE_SIZE = 6;
const MAX_IMAGES = 6;
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

type PublicationFilter = PublicationType | "ALL";
type PreviewEditableSection =
  | "title"
  | "type"
  | "summary"
  | "content"
  | "images"
  | null;

interface PublicationFormValues {
  title: string;
  summary: string;
  content: string;
  type: PublicationType;
}

interface DraftImagePreview {
  key: string;
  name: string;
  source: string;
  kind: "existing" | "new";
  imageId?: number;
}

const EMPTY_FORM_VALUES: PublicationFormValues = {
  title: "",
  summary: "",
  content: "",
  type: "ANNOUNCEMENT",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const getPublicationExcerpt = (publication: Publication) => {
  const summaryText = stripHtml(publication.summary);

  if (summaryText) {
    return summaryText;
  }

  return stripHtml(publication.content);
};

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  return formatApiErrorForDisplay(error, fallbackMessage, {
    includeRequestId: true,
  });
};

const getFileSignature = (file: File) =>
  `${file.name}-${file.size}-${file.lastModified}`;

const getPreviewSectionFromField = (
  field: string | undefined,
): PreviewEditableSection => {
  switch (field) {
    case "title":
      return "title";
    case "type":
      return "type";
    case "summary":
      return "summary";
    case "content":
      return "content";
    case "image":
    case "images":
      return "images";
    default:
      return null;
  }
};

const InternalNews: React.FC = () => {
  const { user } = useContext(AuthContext);
  const userCanManage = canManagePublications(user?.role);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [filter, setFilter] = useState<PublicationFilter>("ALL");
  const [page, setPage] = useState(1);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingPublication, setEditingPublication] = useState<Publication | null>(
    null,
  );
  const [formValues, setFormValues] =
    useState<PublicationFormValues>(EMPTY_FORM_VALUES);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedImagePreviews, setSelectedImagePreviews] = useState<
    DraftImagePreview[]
  >([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [removingImageKey, setRemovingImageKey] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activePreviewEditor, setActivePreviewEditor] =
    useState<PreviewEditableSection>(null);
  const [isDraggingImages, setIsDraggingImages] = useState(false);

  useEffect(() => {
    const nextPreviews = selectedImages.map((file) => ({
      key: getFileSignature(file),
      name: file.name,
      source: URL.createObjectURL(file),
      kind: "new" as const,
    }));

    setSelectedImagePreviews(nextPreviews);

    return () => {
      nextPreviews.forEach((preview) => {
        URL.revokeObjectURL(preview.source);
      });
    };
  }, [selectedImages]);

  const fetchPublications = async (nextPage = page, nextFilter = filter) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await listPublications({
        page: nextPage,
        limit: PAGE_SIZE,
        type: nextFilter === "ALL" ? undefined : nextFilter,
      });

      if (response.totalPages > 0 && nextPage > response.totalPages) {
        setPage(response.totalPages);
        return;
      }

      setPublications(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      setPublications([]);
      setTotalPages(1);
      setError(
        getErrorMessage(
          err,
          "We couldn't load publications right now. Please try again later.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchPublications();
  }, [page, filter]);

  const getSanitizedDraftValues = () => ({
    title: formValues.title.trim(),
    summary: plainTextToHtml(formValues.summary),
    content: plainTextToHtml(formValues.content),
    type: formValues.type,
  });

  const getDraftValidationErrors = () => {
    const nextErrors: Record<string, string> = {};
    const sanitizedValues = getSanitizedDraftValues();

    if (!sanitizedValues.title) {
      nextErrors.title = "Title is required.";
    }

    if (!stripHtml(sanitizedValues.summary)) {
      nextErrors.summary = "Summary is required.";
    }

    if (!stripHtml(sanitizedValues.content)) {
      nextErrors.content = "Content is required.";
    }

    return nextErrors;
  };

  const existingDraftImages: DraftImagePreview[] = editingPublication
    ? editingPublication.images.map((image) => ({
        key: `existing-${image.id}`,
        name: image.fileName,
        source: resolveApiUrl(image.fileUrl),
        kind: "existing",
        imageId: image.id,
      }))
    : [];

  const draftImages = [...existingDraftImages, ...selectedImagePreviews];
  const draftTitle = formValues.title.trim() || "Untitled publication";
  const sanitizedDraftValues = getSanitizedDraftValues();
  const renderedDraftValues = {
    summary: renderRichTextMarkup(sanitizedDraftValues.summary),
    content: renderRichTextMarkup(sanitizedDraftValues.content),
  };

  const resetForm = () => {
    setEditingPublication(null);
    setFormValues(EMPTY_FORM_VALUES);
    setSelectedImages([]);
    setFormErrors({});
    setFormMessage("");
    setIsPreviewMode(false);
    setActivePreviewEditor(null);
    setIsDraggingImages(false);
  };

  const handleFieldChange = <K extends keyof PublicationFormValues>(
    field: K,
    value: PublicationFormValues[K],
  ) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    if (formErrors[field]) {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        [field]: "",
      }));
    }

    if (formMessage) {
      setFormMessage("");
    }
  };

  const appendSelectedImages = (incomingFiles: File[]) => {
    if (incomingFiles.length === 0) {
      return;
    }

    const existingFileKeys = new Set(selectedImages.map(getFileSignature));
    const nextSelectedImages = [...selectedImages];
    const currentExistingCount = editingPublication?.images.length ?? 0;
    let skippedCount = 0;

    incomingFiles.forEach((file) => {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        skippedCount += 1;
        return;
      }

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        skippedCount += 1;
        return;
      }

      const fileKey = getFileSignature(file);

      if (existingFileKeys.has(fileKey)) {
        skippedCount += 1;
        return;
      }

      if (currentExistingCount + nextSelectedImages.length >= MAX_IMAGES) {
        skippedCount += 1;
        return;
      }

      existingFileKeys.add(fileKey);
      nextSelectedImages.push(file);
    });

    if (nextSelectedImages.length === selectedImages.length) {
      setFormMessage(
        `No new images were added. Check the format, size, duplicates, or the ${MAX_IMAGES}-image limit.`,
      );
      return;
    }

    setSelectedImages(nextSelectedImages);
    setFormMessage("");

    if (formErrors.images) {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        images: "",
      }));
    }

    if (skippedCount > 0) {
      toast.info(
        `${nextSelectedImages.length - selectedImages.length} image(s) added. ${skippedCount} file(s) skipped because of limits, duplicates, or invalid format.`,
      );
    }
  };

  const handleImageSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    appendSelectedImages(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const handleDropImages = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingImages(false);
    appendSelectedImages(Array.from(event.dataTransfer.files ?? []));
  };

  const handleRemoveSelectedImage = (fileKey: string) => {
    setSelectedImages((currentImages) =>
      currentImages.filter((file) => getFileSignature(file) !== fileKey),
    );
  };

  const openPreview = () => {
    const validationErrors = getDraftValidationErrors();

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setFormMessage("Please review the highlighted fields before previewing.");
      setIsPreviewMode(false);
      setActivePreviewEditor(
        getPreviewSectionFromField(Object.keys(validationErrors)[0]),
      );
      return;
    }

    setFormErrors({});
    setFormMessage("");
    setIsPreviewMode(true);
    setActivePreviewEditor(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const savePublication = async () => {
    if (!userCanManage) {
      return false;
    }

    const validationErrors = getDraftValidationErrors();

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setFormMessage("Please review the highlighted fields before publishing.");
      setActivePreviewEditor(
        getPreviewSectionFromField(Object.keys(validationErrors)[0]),
      );
      return false;
    }

    setFormErrors({});
    setFormMessage("");
    setIsSaving(true);

    try {
      const payload = {
        ...getSanitizedDraftValues(),
        images: selectedImages,
      };

      const isEditingCurrentPublication = Boolean(editingPublication);

      if (editingPublication) {
        await updatePublication(editingPublication.id, payload);
        toast.success("Publication updated successfully.");
      } else {
        await createPublication(payload);
        toast.success("Publication created successfully.");
      }

      resetForm();
      await fetchPublications(isEditingCurrentPublication ? page : 1, filter);

      if (!isEditingCurrentPublication && page !== 1) {
        setPage(1);
      }

      return true;
    } catch (saveError) {
      if (saveError instanceof ApiClientError) {
        const normalizedFieldErrors = {
          ...(saveError.fieldErrors ?? {}),
        };

        if (normalizedFieldErrors.image && !normalizedFieldErrors.images) {
          normalizedFieldErrors.images = normalizedFieldErrors.image;
        }

        setFormErrors(normalizedFieldErrors);
        setFormMessage(saveError.message);
        setActivePreviewEditor(
          getPreviewSectionFromField(Object.keys(normalizedFieldErrors)[0]),
        );
      } else {
        setFormMessage(
          getErrorMessage(
            saveError,
            "We couldn't save this publication right now. Please try again later.",
          ),
        );
      }

      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await savePublication();
  };

  const handleStartEdit = (publication: Publication) => {
    setEditingPublication(publication);
    setFormValues({
      title: publication.title,
      summary: htmlToPlainText(publication.summary),
      content: htmlToPlainText(publication.content),
      type: publication.type,
    });
    setSelectedImages([]);
    setFormErrors({});
    setFormMessage("");
    setIsPreviewMode(false);
    setActivePreviewEditor(null);
    setIsDraggingImages(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (publication: Publication) => {
    if (
      !window.confirm(`Delete "${publication.title}"? This action cannot be undone.`)
    ) {
      return;
    }

    setIsDeletingId(publication.id);

    try {
      await deletePublication(publication.id);
      toast.success("Publication deleted successfully.");

      if (editingPublication?.id === publication.id) {
        resetForm();
      }

      if (publications.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await fetchPublications();
      }
    } catch (deleteError) {
      toast.error(
        getErrorMessage(
          deleteError,
          "We couldn't delete this publication right now. Please try again later.",
        ),
      );
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleRemoveExistingImage = async (
    publicationId: number,
    imageId: number,
  ) => {
    if (!window.confirm("Remove this image from the publication?")) {
      return;
    }

    const nextRemovingKey = `${publicationId}:${imageId}`;
    setRemovingImageKey(nextRemovingKey);

    try {
      await deletePublicationImage(publicationId, imageId);
      toast.success("Image removed successfully.");

      setPublications((currentPublications) =>
        currentPublications.map((publication) =>
          publication.id === publicationId
            ? {
                ...publication,
                images: publication.images.filter((image) => image.id !== imageId),
              }
            : publication,
        ),
      );

      setEditingPublication((currentPublication) =>
        currentPublication && currentPublication.id === publicationId
          ? {
              ...currentPublication,
              images: currentPublication.images.filter(
                (image) => image.id !== imageId,
              ),
            }
          : currentPublication,
      );
    } catch (removeError) {
      toast.error(
        getErrorMessage(
          removeError,
          "We couldn't remove this image right now. Please try again later.",
        ),
      );
    } finally {
      setRemovingImageKey(null);
    }
  };

  const renderImageManager = () => (
    <S.ImageManagerShell>
      <S.HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        multiple
        onChange={handleImageSelection}
      />

      <S.UploadDropZone
        role="button"
        tabIndex={0}
        $isDragging={isDraggingImages}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          setIsDraggingImages(true);
        }}
        onDragLeave={(event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          setIsDraggingImages(false);
        }}
        onDrop={handleDropImages}
      >
        <S.UploadTitle>Add publication images</S.UploadTitle>
        <S.UploadHint>
          Drag and drop multiple files here or click to browse. New files are
          added to the current selection instead of replacing it.
        </S.UploadHint>
        <S.UploadCounter>
          {draftImages.length} / {MAX_IMAGES} images ready for this publication
        </S.UploadCounter>
      </S.UploadDropZone>

      <S.HelperText>
        Optional. Up to 6 images total, 5MB each, using JPG, PNG, WEBP, or GIF.
      </S.HelperText>

      {formErrors.images && <S.FieldError>{formErrors.images}</S.FieldError>}

      {draftImages.length > 0 ? (
        <S.ImageSection>
          <S.ImageSectionTitle>Current gallery</S.ImageSectionTitle>
          <S.ImageGrid>
            {existingDraftImages.map((image) => (
              <S.ImageCard key={image.key}>
                <S.ImagePreview src={image.source} alt={image.name} />
                <S.ImageFooter>
                  <S.ImageMeta>
                    <span>{image.name}</span>
                    <S.ImageBadge>Published</S.ImageBadge>
                  </S.ImageMeta>
                  <S.GhostDangerButton
                    type="button"
                    onClick={() => {
                      if (editingPublication && image.imageId) {
                        void handleRemoveExistingImage(
                          editingPublication.id,
                          image.imageId,
                        );
                      }
                    }}
                    disabled={
                      removingImageKey ===
                      `${editingPublication?.id ?? "draft"}:${image.imageId ?? "0"}`
                    }
                  >
                    {removingImageKey ===
                    `${editingPublication?.id ?? "draft"}:${image.imageId ?? "0"}`
                      ? "Removing..."
                      : "Remove"}
                  </S.GhostDangerButton>
                </S.ImageFooter>
              </S.ImageCard>
            ))}

            {selectedImagePreviews.map((image) => (
              <S.ImageCard key={image.key}>
                <S.ImagePreview src={image.source} alt={image.name} />
                <S.ImageFooter>
                  <S.ImageMeta>
                    <span>{image.name}</span>
                    <S.ImageBadge $variant="pending">Pending</S.ImageBadge>
                  </S.ImageMeta>
                  <S.GhostDangerButton
                    type="button"
                    onClick={() => handleRemoveSelectedImage(image.key)}
                  >
                    Remove
                  </S.GhostDangerButton>
                </S.ImageFooter>
              </S.ImageCard>
            ))}
          </S.ImageGrid>
        </S.ImageSection>
      ) : (
        <S.EmptyPreviewState>
          No images selected yet. Add a cover image or a small gallery when it
          helps the publication read better.
        </S.EmptyPreviewState>
      )}
    </S.ImageManagerShell>
  );

  const renderComposerForm = () => (
    <S.Form onSubmit={handleSubmit}>
      <S.FieldGrid>
        <S.FieldGroup>
          <label htmlFor="publication-title">Title</label>
          <S.CompactTextArea
            id="publication-title"
            value={formValues.title}
            onChange={(event) => handleFieldChange("title", event.target.value)}
            placeholder="Write the publication title."
            required
          />
          {formErrors.title && <S.FieldError>{formErrors.title}</S.FieldError>}
        </S.FieldGroup>

        <S.FieldGroup>
          <label htmlFor="publication-type">Type</label>
          <S.SelectInput
            id="publication-type"
            value={formValues.type}
            onChange={(event) =>
              handleFieldChange("type", event.target.value as PublicationType)
            }
          >
            {PUBLICATION_FILTERS.map((publicationFilter) => (
              <option
                key={publicationFilter.value}
                value={publicationFilter.value}
              >
                {publicationFilter.label}
              </option>
            ))}
          </S.SelectInput>
          {formErrors.type && <S.FieldError>{formErrors.type}</S.FieldError>}
        </S.FieldGroup>
      </S.FieldGrid>

      <S.FieldGroup>
        <label htmlFor="publication-summary">Summary</label>
        <S.TextArea
          id="publication-summary"
          value={formValues.summary}
          onChange={(event) => handleFieldChange("summary", event.target.value)}
          placeholder="Write a short plain-text summary."
          style={{ minHeight: "180px" }}
        />
        <S.HelperText>
          Use [label](https://link) to turn part of the text into a clickable
          link.
        </S.HelperText>
        {formErrors.summary && <S.FieldError>{formErrors.summary}</S.FieldError>}
      </S.FieldGroup>

      <S.FieldGroup>
        <label htmlFor="publication-content">Content</label>
        <S.TextArea
          id="publication-content"
          value={formValues.content}
          onChange={(event) => handleFieldChange("content", event.target.value)}
          placeholder="Write the publication body in plain text."
          style={{ minHeight: "320px" }}
        />
        <S.HelperText>
          Use [label](https://link) to add mentions or external references in
          the text.
        </S.HelperText>
        {formErrors.content && <S.FieldError>{formErrors.content}</S.FieldError>}
      </S.FieldGroup>

      <S.FieldGroup>
        <label>Images</label>
        {renderImageManager()}
      </S.FieldGroup>

      <S.ActionRow>
        <S.PrimaryButton type="submit" disabled={isSaving}>
          {isSaving
            ? editingPublication
              ? "Saving..."
              : "Creating..."
            : editingPublication
              ? "Save publication"
              : "Create publication"}
        </S.PrimaryButton>
        <S.SecondaryButton type="button" onClick={openPreview}>
          Preview publication
        </S.SecondaryButton>
        {editingPublication && (
          <S.SecondaryButton type="button" onClick={resetForm}>
            Cancel edit
          </S.SecondaryButton>
        )}
      </S.ActionRow>
    </S.Form>
  );

  const renderPreviewInlineEditor = () => {
    if (!activePreviewEditor) {
      return null;
    }

    if (activePreviewEditor === "title") {
      return (
        <S.PreviewInlineEditor>
          <S.FieldGroup>
            <label htmlFor="preview-publication-title">Title</label>
            <S.CompactTextArea
              id="preview-publication-title"
              value={formValues.title}
              onChange={(event) =>
                handleFieldChange("title", event.target.value)
              }
              placeholder="Write the publication title."
              required
            />
            {formErrors.title && <S.FieldError>{formErrors.title}</S.FieldError>}
          </S.FieldGroup>
          <S.ActionRow>
            <S.SecondaryButton
              type="button"
              onClick={() => setActivePreviewEditor(null)}
            >
              Done
            </S.SecondaryButton>
          </S.ActionRow>
        </S.PreviewInlineEditor>
      );
    }

    if (activePreviewEditor === "type") {
      return (
        <S.PreviewInlineEditor>
          <S.FieldGroup>
            <label htmlFor="preview-publication-type">Type</label>
            <S.SelectInput
              id="preview-publication-type"
              value={formValues.type}
              onChange={(event) =>
                handleFieldChange("type", event.target.value as PublicationType)
              }
            >
              {PUBLICATION_FILTERS.map((publicationFilter) => (
                <option
                  key={publicationFilter.value}
                  value={publicationFilter.value}
                >
                  {publicationFilter.label}
                </option>
              ))}
            </S.SelectInput>
            {formErrors.type && <S.FieldError>{formErrors.type}</S.FieldError>}
          </S.FieldGroup>
          <S.ActionRow>
            <S.SecondaryButton
              type="button"
              onClick={() => setActivePreviewEditor(null)}
            >
              Done
            </S.SecondaryButton>
          </S.ActionRow>
        </S.PreviewInlineEditor>
      );
    }

    if (activePreviewEditor === "summary") {
      return (
        <S.PreviewInlineEditor>
          <S.TextArea
            id="preview-publication-summary"
            value={formValues.summary}
            onChange={(event) =>
              handleFieldChange("summary", event.target.value)
            }
            placeholder="Write a concise summary."
            style={{ minHeight: "180px" }}
          />
          <S.HelperText>
            Use [label](https://link) to turn part of the text into a clickable
            link.
          </S.HelperText>
          {formErrors.summary && <S.FieldError>{formErrors.summary}</S.FieldError>}
          <S.ActionRow>
            <S.SecondaryButton
              type="button"
              onClick={() => setActivePreviewEditor(null)}
            >
              Done
            </S.SecondaryButton>
          </S.ActionRow>
        </S.PreviewInlineEditor>
      );
    }

    if (activePreviewEditor === "content") {
      return (
        <S.PreviewInlineEditor>
          <S.TextArea
            id="preview-publication-content"
            value={formValues.content}
            onChange={(event) =>
              handleFieldChange("content", event.target.value)
            }
            placeholder="Write the publication body."
            style={{ minHeight: "320px" }}
          />
          <S.HelperText>
            Use [label](https://link) to add mentions or external references in
            the text.
          </S.HelperText>
          {formErrors.content && <S.FieldError>{formErrors.content}</S.FieldError>}
          <S.ActionRow>
            <S.SecondaryButton
              type="button"
              onClick={() => setActivePreviewEditor(null)}
            >
              Done
            </S.SecondaryButton>
          </S.ActionRow>
        </S.PreviewInlineEditor>
      );
    }

    return (
      <S.PreviewInlineEditor>
        {renderImageManager()}
        <S.ActionRow>
          <S.SecondaryButton
            type="button"
            onClick={() => setActivePreviewEditor(null)}
          >
            Done
          </S.SecondaryButton>
        </S.ActionRow>
      </S.PreviewInlineEditor>
    );
  };

  const renderPreviewMode = () => (
    <S.PreviewWorkspace>
      <S.PreviewFloatingActions>
        <S.PrimaryButton
          type="button"
          onClick={() => void savePublication()}
          disabled={isSaving}
        >
          {isSaving
            ? "Publishing..."
            : editingPublication
              ? "Publish update"
              : "Publish"}
        </S.PrimaryButton>
        <S.SecondaryButton
          type="button"
          onClick={() => {
            setIsPreviewMode(false);
            setActivePreviewEditor(null);
          }}
          disabled={isSaving}
        >
          Cancel
        </S.SecondaryButton>
      </S.PreviewFloatingActions>

      <S.PreviewCanvas>
        <S.PreviewHeaderCard>
          <S.PreviewSectionToolbar>
            <S.PreviewSectionLabel>Type</S.PreviewSectionLabel>
            <S.SecondaryButton
              type="button"
              onClick={() => setActivePreviewEditor("type")}
            >
              Edit
            </S.SecondaryButton>
          </S.PreviewSectionToolbar>
          <S.TypeBadge>{getPublicationTypeLabel(formValues.type)}</S.TypeBadge>
          {activePreviewEditor === "type" && renderPreviewInlineEditor()}

          <S.PreviewSectionToolbar>
            <S.PreviewSectionLabel>Title</S.PreviewSectionLabel>
            <S.SecondaryButton
              type="button"
              onClick={() => setActivePreviewEditor("title")}
            >
              Edit
            </S.SecondaryButton>
          </S.PreviewSectionToolbar>
          <S.PreviewTitle>{draftTitle}</S.PreviewTitle>
          {activePreviewEditor === "title" && renderPreviewInlineEditor()}

          <S.PreviewSectionToolbar>
            <S.PreviewSectionLabel>Summary</S.PreviewSectionLabel>
            <S.SecondaryButton
              type="button"
              onClick={() => setActivePreviewEditor("summary")}
            >
              Edit
            </S.SecondaryButton>
          </S.PreviewSectionToolbar>
          <S.PreviewSummaryRichText
            dangerouslySetInnerHTML={{ __html: renderedDraftValues.summary }}
          />
          {activePreviewEditor === "summary" && renderPreviewInlineEditor()}

          <S.PreviewAuthorLine>
            Previewing as {user?.name ?? "Unknown author"}
          </S.PreviewAuthorLine>
        </S.PreviewHeaderCard>

        <S.PreviewImageCard>
          <S.PreviewSectionToolbar>
            <S.PreviewSectionLabel>Images</S.PreviewSectionLabel>
            <S.SecondaryButton
              type="button"
              onClick={() => setActivePreviewEditor("images")}
            >
              Edit
            </S.SecondaryButton>
          </S.PreviewSectionToolbar>

          {draftImages.length > 0 ? (
            <>
              <S.PreviewFeaturedImage
                src={draftImages[0].source}
                alt={draftImages[0].name}
              />

              {draftImages.length > 1 && (
                <S.PreviewGalleryGrid>
                  {draftImages.slice(1).map((image) => (
                    <S.PreviewGalleryImage
                      key={image.key}
                      src={image.source}
                      alt={image.name}
                    />
                  ))}
                </S.PreviewGalleryGrid>
              )}
            </>
          ) : (
            <S.EmptyPreviewState>
              No gallery yet. Add images if this publication needs a cover or a
              sequence of screenshots.
            </S.EmptyPreviewState>
          )}

          {activePreviewEditor === "images" && renderPreviewInlineEditor()}
        </S.PreviewImageCard>

        <S.PreviewContentCard>
          <S.PreviewSectionToolbar>
            <S.PreviewSectionLabel>Content</S.PreviewSectionLabel>
            <S.SecondaryButton
              type="button"
              onClick={() => setActivePreviewEditor("content")}
            >
              Edit
            </S.SecondaryButton>
          </S.PreviewSectionToolbar>
          <S.PreviewRichText
            dangerouslySetInnerHTML={{ __html: renderedDraftValues.content }}
          />
          {activePreviewEditor === "content" && renderPreviewInlineEditor()}
        </S.PreviewContentCard>
      </S.PreviewCanvas>
    </S.PreviewWorkspace>
  );

  return (
    <S.PageContainer>
      <S.HeaderRow>
        <div>
          <S.PageTitle>Publications</S.PageTitle>
          <S.PageSubtitle>
            Manage official news, patch notes, dev logs, and livestream
            archives from the current backend contract.
          </S.PageSubtitle>
        </div>

        <S.RoleChip>{user?.role ?? "No role"}</S.RoleChip>
      </S.HeaderRow>

      {!userCanManage && (
        <S.StatusBox>
          Your role can review publications, but only Admin and Leader accounts
          can create, edit, or delete them.
        </S.StatusBox>
      )}

      {userCanManage && (
        <S.SectionCard>
          <S.SectionHeader>
            <div>
              <S.SectionTitle>
                {editingPublication ? "Edit publication" : "Create publication"}
              </S.SectionTitle>
              <S.SectionDescription>
                Draft in plain text, preview the full page before publishing,
                add text links with [label](https://link), and manage multiple
                images without replacing the files you already selected.
              </S.SectionDescription>
            </div>

            {!isPreviewMode && (
              <S.HeaderActions>
                <S.SecondaryButton type="button" onClick={openPreview}>
                  Full preview
                </S.SecondaryButton>

                {editingPublication && (
                  <S.SecondaryButton type="button" onClick={resetForm}>
                    Cancel edit
                  </S.SecondaryButton>
                )}
              </S.HeaderActions>
            )}
          </S.SectionHeader>

          {formMessage && <S.StatusBox $isError>{formMessage}</S.StatusBox>}

          {!isPreviewMode ? renderComposerForm() : renderPreviewMode()}
        </S.SectionCard>
      )}

      <S.SectionCard>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>Current publications</S.SectionTitle>
            <S.SectionDescription>
              Filter the feed by module type and preview the public result before
              publishing changes.
            </S.SectionDescription>
          </div>
        </S.SectionHeader>

        <S.FilterRow>
          <S.FilterButton
            type="button"
            $isActive={filter === "ALL"}
            onClick={() => {
              setFilter("ALL");
              setPage(1);
            }}
          >
            All
          </S.FilterButton>

          {PUBLICATION_FILTERS.map((publicationFilter) => (
            <S.FilterButton
              key={publicationFilter.value}
              type="button"
              $isActive={filter === publicationFilter.value}
              onClick={() => {
                setFilter(publicationFilter.value);
                setPage(1);
              }}
            >
              {publicationFilter.label}
            </S.FilterButton>
          ))}
        </S.FilterRow>

        {error && <S.StatusBox $isError>{error}</S.StatusBox>}
        {isLoading && <S.StatusBox>Loading publications...</S.StatusBox>}

        {!isLoading && !error && publications.length === 0 && (
          <S.StatusBox>No publications found for this filter.</S.StatusBox>
        )}

        {!isLoading && !error && publications.length > 0 && (
          <>
            <S.PublicationGrid>
              {publications.map((publication) => (
                <S.PublicationCard key={publication.id}>
                  {publication.images[0] ? (
                    <S.CardImage
                      src={resolveApiUrl(publication.images[0].fileUrl)}
                      alt={publication.title}
                    />
                  ) : (
                    <S.CardImagePlaceholder>
                      {getPublicationTypeLabel(publication.type)}
                    </S.CardImagePlaceholder>
                  )}

                  <S.CardBody>
                    <S.CardMetaRow>
                      <S.TypeBadge>
                        {getPublicationTypeLabel(publication.type)}
                      </S.TypeBadge>
                      <S.MetaText>{formatDate(publication.createdAt)}</S.MetaText>
                    </S.CardMetaRow>

                    <S.CardTitle>{publication.title}</S.CardTitle>
                    <S.CardSummary>
                      {getPublicationExcerpt(publication)}
                    </S.CardSummary>

                    <S.MetaText>By {publication.author.name}</S.MetaText>

                    <S.CardActions>
                      <S.PreviewLink
                        to={`/news/${publication.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Public preview
                      </S.PreviewLink>

                      {userCanManage && (
                        <>
                          <S.SecondaryButton
                            type="button"
                            onClick={() => handleStartEdit(publication)}
                          >
                            Edit
                          </S.SecondaryButton>
                          <S.DangerButton
                            type="button"
                            onClick={() => void handleDelete(publication)}
                            disabled={isDeletingId === publication.id}
                          >
                            {isDeletingId === publication.id
                              ? "Deleting..."
                              : "Delete"}
                          </S.DangerButton>
                        </>
                      )}
                    </S.CardActions>
                  </S.CardBody>
                </S.PublicationCard>
              ))}
            </S.PublicationGrid>

            {totalPages > 1 && (
              <S.Pagination>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <S.PageButton
                      key={pageNumber}
                      type="button"
                      $isActive={pageNumber === page}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </S.PageButton>
                  ),
                )}
              </S.Pagination>
            )}
          </>
        )}
      </S.SectionCard>
    </S.PageContainer>
  );
};

export default InternalNews;
