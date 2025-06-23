export const checkRole = (user, allowedRoles = []) => {
  if (!user) throw new Error("Unauthorized");
  if (!allowedRoles.includes(user.roleName)) {
    throw new Error("Forbidden: You don't have access");
  }
};
