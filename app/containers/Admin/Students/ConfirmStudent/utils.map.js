export const mapData = params => {
  const payload = {};
  payload.page = params.page;
  if (params.rowsPerPage) {
    payload.rowsPerPage = params.rowsPerPage;
  }
  payload.searchText = params.searchText;
  payload.grade = params.grade;
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
