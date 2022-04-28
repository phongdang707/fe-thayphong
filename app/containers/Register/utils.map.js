export const mapData = params => {
  const payload = {};
  if (params.userName) {
    payload.user_name = params.userName;
  }
  if (params.password) {
    payload.password = params.password;
  }
  return payload;
};
