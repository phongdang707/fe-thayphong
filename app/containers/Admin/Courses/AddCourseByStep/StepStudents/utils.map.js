export const mapData = params => {
  const payload = {};
  payload.page = params.page;
  if (params.rowsPerPage) {
    payload.rowsPerPage = params.rowsPerPage;
  }
  payload.grade = params.grade;
  payload.searchText = params.searchText;
  return payload;
};
