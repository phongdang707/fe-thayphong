/* eslint-disable arrow-body-style */
import {callApiWithAuth} from "../request";
import {getToken} from "../storage";
// import URL_API from "../config/common";
// import { getEntryV2 } from "./utils";

const API = {
    students: {
        register: (params) => {
            return callApiWithAuth(`users/registerWithForm`, "POST", params).then(
                (res) => {
                    return res;
                }
            );
        },
        getList: (params) => {
            return callApiWithAuth(`students/getStudent`, "POST", params).then(
                (res) => {
                    return res;
                }
            );
        },
        getListStudentConfirm: (params) => {
            return callApiWithAuth(`users/studentRegisterWithForm`, "GET", params).then(
                (res) => {
                    return res;
                }
            );
        },
        downloadForStudent: (params) => {
            return callApiWithAuth(
                `students/getStudentForExportExcel`,
                "POST",
                params,
                true
            ).then((res) => {
                return res;
            });
        },
        getStudentById: (params) => {
            return callApiWithAuth(`students/getStudentById`, "POST").then((res) => {
                return res;
            });
        },
        getStudentByIdForAdmin: (params) => {
            return callApiWithAuth(
                `students/getStudentByIdForAdmin`,
                "POST",
                params
            ).then((res) => {
                return res;
            });
        },
        getStudentDashboard: () => {
            return callApiWithAuth(`students/getStudentDashboard/`, "GET").then(
                (res) => {
                    return res;
                }
            );
        },
        create: (params) => {
            return callApiWithAuth(`students/register`, "POST", params).then(
                (res) => {
                    return res;
                }
            );
        },
        update: (params) => {
            return callApiWithAuth(
                `students/update/${params.activeId}`,
                "PUT",
                params
            ).then((res) => {
                return res;
            });
        },
        updatePassword: (params) => {
            return callApiWithAuth(
                `students/updatePassword/${params.id}`,
                "POST",
                params
            ).then((res) => {
                return res;
            });
        },
        updatePasswordStudent: (params) => {
            return callApiWithAuth(
                `students/updatePasswordForStudent/${params.id}`,
                "PUT",
                params
            ).then((res) => {
                return res;
            });
        },
        delete: (params) => {
            return callApiWithAuth(`students/deleteStudent`, "POST", params).then(
                (res) => {
                    return res;
                }
            );
        },
        deleteStudentRegister: (params) => {
            return callApiWithAuth(`users/refuseStudentToUser`, "POST", params).then(
                (res) => {
                    return res;
                }
            );
        },
        confirmStudentToUser: (params) => {
            return callApiWithAuth(`users/confirmStudentToUser`, "POST", params).then(
                (res) => {
                    return res;
                }
            );
        },
        refuseStudentToUser: (params) => {
            return callApiWithAuth(`users/refuseStudentToUser`, "POST", params).then(
                (res) => {
                    return res;
                }
            );
        },
    },
};

export default API;
