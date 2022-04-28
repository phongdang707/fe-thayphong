export const mapData = params => {
  const payload = {};
    if(params.id) {
      payload.id = params.id;
    }
    if(params.id_content) {
      payload.id_content = params.id_content;
    }
    if (params.title.value) {
      payload.title = params.title.value;
    }
    if (params.chapter.value) {
      payload.chapter = params.chapter.value;
    }
    if(params.content) {
      payload.content = params.content;
    }
    if(params.link_file) {
      payload.link_file = params.link_file;
    }
    payload.time = new Date().getTime();
  return payload;
};

export const mapDataDelete = params => {
  const payload = {};
  if (params.itemSelected) {
    payload.id = params.itemSelected;
  }
  payload.time = new Date().getTime();
  return payload;
};
