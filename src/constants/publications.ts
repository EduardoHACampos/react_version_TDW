import type { PublicationType } from "../interface";

export const PUBLICATION_FILTERS: Array<{
  label: string;
  value: PublicationType;
}> = [
  { label: "News", value: "ANNOUNCEMENT" },
  { label: "Patch Notes", value: "PATCH_NOTE" },
  { label: "Dev Logs", value: "DEV_LOG" },
  { label: "Livestreams", value: "LIVESTREAM" },
];

export const getPublicationTypeLabel = (type: PublicationType) => {
  switch (type) {
    case "ANNOUNCEMENT":
      return "News";
    case "PATCH_NOTE":
      return "Patch Notes";
    case "DEV_LOG":
      return "Dev Logs";
    case "LIVESTREAM":
      return "Livestream";
    default:
      return type;
  }
};
