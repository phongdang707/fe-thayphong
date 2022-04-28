export const mapData = params => {
  const payload = new FormData();
  if (params.id) {
    payload.append('id', params.id);
  }
  if (params.name_course.value) {
    payload.append('name_course', params.name_course.value);
  }
  if (params.grade.value) {
    payload.append('grade', params.grade.value);
  }
  if (params.description.value) {
    payload.append('description', params.description.value);
  }
  if (params.selected) {
    payload.append('students', params.selected);
  }
  if (params.imgData) {
    payload.append('avatar', params.imgData);
  }
  payload.append('time', new Date().getTime());
  return payload;
};

export const mapCheckData = params => {
  const payload = {};
  if (params.id) {
    payload.id = params.id;
  }
  if (params.name_course.value) {
    payload.name_course = params.name_course.value;
  }
  return payload;
};
