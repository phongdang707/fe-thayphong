export const mapData = params => {
  const payload = {};
    if(params.id) {
      payload.id = params.id;
    }
    if(params.id_exam) {
      payload.id_exam = params.id_exam;
    }
    if(params.quiz_number) {
      payload.quiz_number = params.quiz_number;
    }
    if(params.time) {
      payload.time = params.time;
    }
    payload.isSuffer = params.isSuffer;
    payload.create_at = new Date().getTime();
  return payload;
};
