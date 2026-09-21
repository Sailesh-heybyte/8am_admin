export const hasPermission = (me, codename) =>
  me.permissions.includes(codename);
