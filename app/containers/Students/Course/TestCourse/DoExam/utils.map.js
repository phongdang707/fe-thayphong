export const mapData = params => {
  const payload = {};
  payload.answer = params.answer;
  payload.id = params.id;
  payload.update_at = new Date().getTime();
  return payload;
};
