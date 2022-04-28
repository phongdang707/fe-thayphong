export const mapData = params => {
  const payload = {};
    if (params.id) {
      payload.id = params.id;
    }
    if (params.name_exam.value) {
      payload.name_exam = params.name_exam.value;
    }
    if (params.grade) {
      payload.grade = params.grade;
    }
    payload.time = new Date().getTime();
  return payload;
};
