export const mapData = params => {
  const payload = {};
    if(params.id) {
      payload.id = params.id;
    }
    if(params.id_question) {
      payload.id_question = params.id_question;
    }
    if (params.question.value) {
      payload.question = params.question.value;
    }
    if (params.answer_a.value) {
      payload.answer_a = params.answer_a.value;
    }
    if (params.answer_b.value) {
      payload.answer_b = params.answer_b.value;
    }
    if (params.answer_c.value) {
      payload.answer_c = params.answer_c.value;
    }
    if (params.answer_d.value) {
      payload.answer_d = params.answer_d.value;
    }
    if (params.correct_answer) {
      payload.correct_answer = params.correct_answer;
    }
    if (params.solution) {
      payload.solution = params.solution;
    }
    payload.time = new Date().getTime();
  return payload;
};
export const mapDataDelete = params => {
  const payload = {};
  if (params.itemSelected) {
    payload.id = params.itemSelected;
  }
  if(params.id) {
    payload.id_exam = params.id;
  }
  payload.time = new Date().getTime();
  return payload;
};
