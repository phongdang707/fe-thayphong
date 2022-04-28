export const mapData = params => {
  const payload = {};
    if(params.collectionName) {
      payload.collectionName = params.collectionName;
    }
    payload.page = params.page;
    if (params.rowsPerPage) {
      payload.rowsPerPage = params.rowsPerPage;
    }
    payload.searchText = params.searchText;
  return payload;
};

export const mapRestoreData = params => {
  const payload = {};
    if(params.collectionName) {
      payload.collectionName = params.collectionName;
    }
    if (params.selectRow) {
      payload.selectRow = params.selectRow;
    }
    payload.time = new Date().getTime();
  return payload;
};
