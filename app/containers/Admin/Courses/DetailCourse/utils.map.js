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

export const mapDataExam = params => {
  const payload = {};
    if(params.id) {
      payload.id = params.id;
    }
    if(params.exam_id) {
      payload.exam_id = params.exam_id;
    }
    if (params.number_quiz.value) {
      payload.number_quiz = params.number_quiz.value;
    }
    if(params.exam_time) {
      payload.exam_time = params.exam_time;
    }
    if(params.exam_name.value) {
      payload.name_exam = params.exam_name.value;
    }
    payload.isSuffer = params.isSuffer;
    payload.time = new Date().getTime();
  return payload;
};

export const mapDataStatus = params => {
  const payload = {};
  payload.id = params.id;
  payload.status = params.selectStatus;
  payload.time = new Date().getTime();
  return payload;
};
