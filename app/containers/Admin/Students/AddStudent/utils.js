export const checkIsRequired = (data) => {
  if (data.length < 1) {
    return false;
  } else {
    return true;
  }
};
export const mapValid = (type, data, dataConfirm) => {
  let errors = [];

  for (let i = 0; i < type.length; i++) {
    const element = type[i];
    if (element === "required") {
      if (data.length < 1) {
        errors.push("Vui lòng không được để  trống");
      }
    }
    if (element === "phone") {
      let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (re.test(data) === false) errors.push("Vui lòng nhập số điện thoại");
    }
    if (element === "confirmPassword") {
      if (data !== dataConfirm) errors.push("Nhập lại mật khẩu không khớp");
    }
  }
  return errors;
};