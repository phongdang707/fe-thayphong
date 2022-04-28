import produce from "immer";
import Types from "./constants";
import { mapValid } from "./utils";

// The initial state of the App
export const initialState = {
  fullName: { error: null, value: "", listErros: [], validate: true },
  school: { error: null, value: "", listErros: [] },
  classRoom: { error: null, value: "", listErros: [] },
  yearOfBirth: { error: null, value: "", listErros: [] },
  grade: { error: null, value: "", listErros: [] },
  name: { error: null, value: "", listErros: [], validate: true },
  password: { error: null, value: "", listErros: [], validate: true },
  phoneNumberStudent: { error: null, value: "", listErros: [] },
  phoneNumberFamily: { error: null, value: "", listErros: [], validate: true },
  address: { error: null, value: "", listErros: [] },
  confirmPassword: { error: null, value: "", listErros: [], validate: true },
  isLoading: true,
  isSucess: false,
  isError: false,
  isDisable: true,
  isUpdate: false,
  label: "Thêm học sinh",
  activeId: "",
};

/* eslint-disable default-case, no-param-reassign */
const addStudentReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Types.INIT: {
        draft.isLoading = true;
        draft.activeId = action.payload.id;
        return;
      }
      case Types.INIT_DONE: {
        draft.isLoading = false;
        const { user } = action.payload;
        if (user) {
          const {
            user_name,
            school,
            class_room,
            year_of_birth,
            grade,
            full_name,
            phong_number_student,
            phong_number_family,
            address,
            _id,
          } = user;
          draft.fullName.value = full_name;
          draft.school.value = school;
          draft.classRoom.value = class_room;
          draft.yearOfBirth.value = year_of_birth;
          draft.grade.value = grade;
          draft.name.value = user_name;
          draft.phoneNumberStudent.value = phong_number_student;
          draft.phoneNumberFamily.value = phong_number_family;
          draft.address.value = address;
          draft.isUpdate = true;
          // draft.activeId = _id;
          draft.label = "Chỉnh sửa thông tin học sinh";
          draft.fullName.error = false;
          draft.name.error = false;
          draft.password.error = false;
          draft.confirmPassword.error = false;
          draft.phoneNumberFamily.error = false;
          // const listError = [
          //   draft.fullName.error,
          //   draft.name.error,
          //   draft.password.error,
          //   draft.confirmPassword.error,
          //   draft.phoneNumberFamily.error,
          // ];

          draft.isDisable = true;

          // if (listError.every((e) => e === false)) {
          //   draft.isDisable = false;
          // } else {
          //   draft.isDisable = true;
          // }
        } else {
          draft.label = "Thêm mới thông tin học sinh";
        }
        return;
      }
      case Types.ONCHANGE:
        switch (Object.keys(action.payload)[0]) {
          case "fullName":
            let errorsFullName = mapValid(
              ["required"],
              action.payload.fullName
            );
            if (errorsFullName.length > 0) {
              draft.fullName.error = true;
              draft.fullName.listErros = errorsFullName;
            } else {
              draft.fullName.error = false;
              draft.fullName.listErros = [];
            }
            draft.fullName.value = action.payload.fullName;

            break;
          case "school":
            draft.school.value = action.payload.school;
            break;
          case "classRoom":
            draft.classRoom.value = action.payload.classRoom;
            break;
          case "yearOfBirth":
            draft.yearOfBirth.value = action.payload.yearOfBirth;
            break;
          case "grade":
            draft.grade.value = action.payload.grade;
            break;
          case "name":
            let errorsName = mapValid(["required"], action.payload.name);
            if (errorsName.length > 0) {
              draft.name.error = true;
              draft.name.listErros = errorsName;
            } else {
              draft.name.error = false;
              draft.name.listErros = [];
            }
            draft.name.value = action.payload.name;
            break;
          case "password":
            let errorsPassword = mapValid(
              ["required"],
              action.payload.password
            );
            if (errorsPassword.length > 0) {
              draft.password.error = true;
              draft.password.listErros = errorsPassword;
            } else {
              draft.password.error = false;
              draft.password.listErros = [];
            }
            draft.password.value = action.payload.password;
            break;
          case "confirmPassword":
            let errorsConfirmPassword = mapValid(
              ["required", "confirmPassword"],
              action.payload.confirmPassword,
              draft.password.value
            );
            if (errorsConfirmPassword.length > 0) {
              draft.confirmPassword.error = true;
              draft.confirmPassword.listErros = errorsConfirmPassword;
            } else {
              draft.confirmPassword.error = false;
              draft.confirmPassword.listErros = [];
            }
            draft.confirmPassword.value = action.payload.confirmPassword;
            break;
          case "phoneNumberStudent":
            draft.phoneNumberStudent.value = action.payload.phoneNumberStudent;
            break;
          case "phoneNumberFamily":
            let errorsPhoneF = mapValid(
              ["required", "phone"],
              action.payload.phoneNumberFamily
            );
            if (errorsPhoneF.length > 0) {
              draft.phoneNumberFamily.error = true;
              draft.phoneNumberFamily.listErros = errorsPhoneF;
            } else {
              draft.phoneNumberFamily.error = false;
              draft.phoneNumberFamily.listErros = [];
            }
            draft.phoneNumberFamily.value = action.payload.phoneNumberFamily;
            break;
          case "address":
            draft.address.value = action.payload.address;
            break;
          default:
            break;
        }
        const listError = [
          draft.fullName.error,
          draft.name.error,
          draft.password.error,
          draft.confirmPassword.error,
          draft.phoneNumberFamily.error,
        ];

        if (listError.every((e) => e === false)) {
          draft.isDisable = false;
        } else {
          draft.isDisable = true;
        }

        return;
      case Types.SUBMIT_ADD_STUDENT: {
        draft.isLoading = true;
        return;
      }
      case Types.SUBMIT_ADD_STUDENT_DONE: {
        draft.isLoading = false;
        draft.isSucess = true;
        draft.isError = false;
        return;
      }
      case Types.SUBMIT_ADD_STUDENT_ERROR: {
        draft.isError = true;
        draft.isDisable = true;
        draft.isLoading = false;
        action.payload.data.errors.forEach((each) => {
          if (each.param === "user_name") {
            draft.name.error = true;
            draft.name.listErros.push(each.msg);
          }
        });
        return;
      }
      case Types.UPDATE_PASSWORD: {
        draft.isLoading = true;
        return;
      }
      case Types.UPDATE_PASSWORD_DONE: {
        draft.isLoading = false;
        return;
      }
      case Types.UPDATE_STUDENT: {
        draft.isLoading = true;
        return;
      }
      case Types.UPDATE_STUDENT_DONE: {
        draft.isLoading = false;
        return;
      }
      case Types.RESET: {
        return initialState;
      }
    }
  });

export default addStudentReducer;
