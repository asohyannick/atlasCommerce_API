import { UserRole } from "../enum/roles.enum";
export function assignRoleBasedOnEmail(email: string): UserRole {
  const e = email.toLowerCase();
  if (e.includes("sysadmin") || e.includes("root")) return UserRole.SUPER_ADMIN;
  if (e.includes("admin")) return UserRole.ADMIN;
  return UserRole.CUSTOMER;
}
