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

export const mapDataDelete = params => {
  const payload = {};
  if (params.selected) {
    payload.selected = params.selected;
  }
  payload.time = new Date().getTime();
  return payload;
};
