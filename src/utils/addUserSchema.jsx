import * as yup from "yup";

const passRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

const soDtRegex = /^[0-9]{10}$/;

export const addUserSchema = yup.object().shape({
  taiKhoan: yup
    .string()
    .min(4, "Need atleast 4 charaters")
    .required("Please enter tài khoản"),
  matKhau: yup
    .string()
    .matches(
      passRegex,
      "Need atleast 6 charaters, 1 letter, 1 number and 1 special character"
    )
    .required("Please enter in password"),
  email: yup
    .string()
    .email("Invalid email(ex: test@gmail.com)")
    .required("Please enter in email"),
  soDT: yup
    .string()
    .matches(soDtRegex, "Phone number needs to be 10 digits, and only number")
    .required("Please enter in phone number"),
  maNhom: yup.string().required("Please enter in group code"),
  maLoaiNguoiDung: yup.string().required("Please enter in user type"),
  hoTen: yup.string().required("Please enter in full name"),
});

// test
