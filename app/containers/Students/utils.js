export const mapEntryToFe = (dataBE) => {
  const data = {};
  data.address = dataBE.address;
  data.classRoom = dataBE.class_room;
  data.fullName = dataBE.full_name;
  data.grade = dataBE.grade;
  data.yearOfBirth = dataBE.year_of_birth;
  data.school = dataBE.school;
  data.numberStudent = dataBE.phong_number_student;
  data.numberFamily = dataBE.phong_number_family;
  data._id = dataBE._id;

  return data;
};
