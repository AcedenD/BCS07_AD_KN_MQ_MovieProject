import * as yup from "yup";

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

export const addUserSchema = yup.object().shape({
  taiKhoan: yup
    .string()
    .min(4, "Need atleast 4 charaters")
    .required("Please enter tài khoản"),
  matKhau: yup
    .string()
    .matches(
      passRegex,
      "Need atleast 6 charaters, 1 upper case, 1 lower case and 1 number"
    )
    .required("Please enter in password"),
  email: yup
    .string()
    .email("Invalid email(ex: test@gmail.com)")
    .required("Please enter in email"),
  soDt: yup.string().required("Please enter in phone number"),
  maNhom: yup.string().required("Please enter in group code"),
  maLoaiNguoiDung: yup.string().required("Please enter in user type"),
  hoTen: yup.string().required("Please enter in full name"),
});
