export const checkRole = (user, allowedRoles = []) => {
  console.log(user);
  if (!user) throw new Error("Unauthorized");
  if (!allowedRoles.includes(user.roleName)) {
    throw new Error("Forbidden: You don't have access");
  }
};
