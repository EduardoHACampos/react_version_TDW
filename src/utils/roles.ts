import type { UserRole } from "../interface";

export const hasAllowedRole = (
  role: UserRole | null | undefined,
  allowedRoles: UserRole[],
) => Boolean(role && allowedRoles.includes(role));

export const canManagePublications = (role: UserRole | null | undefined) =>
  hasAllowedRole(role, ["ADMIN", "LEADER"]);

export const canManageJobs = (role: UserRole | null | undefined) =>
  hasAllowedRole(role, ["ADMIN", "LEADER"]);

export const canManageUsers = (role: UserRole | null | undefined) =>
  hasAllowedRole(role, ["ADMIN", "LEADER"]);

export const canCreateUsers = (role: UserRole | null | undefined) =>
  role === "ADMIN";

export const canManageDeveloperAccounts = (
  role: UserRole | null | undefined,
) => hasAllowedRole(role, ["ADMIN", "LEADER"]);

export const getAssignableRoles = (role: UserRole | null | undefined) => {
  if (role === "ADMIN") {
    return ["ADMIN", "LEADER", "DEVELOPER"] as const;
  }

  return [] as const;
};
