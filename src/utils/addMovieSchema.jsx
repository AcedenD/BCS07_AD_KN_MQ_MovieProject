import * as yup from "yup";

const maPhimRegex = /^[1-9][0-9]{4}$/;

const hinhAnhRegex = /\.(jpeg|jpg|gif|png)$/;

export const addMovieSchema = yup.object().shape({
  maPhim: yup
    .string()
    .matches(maPhimRegex, "Movie ID needs to be 5 digits, and not start with 0")
    .required("Please enter movie ID"),
  tenPhim: yup
    .string()
    .required("Please enter movie name"),
  moTa: yup
    .string()
    .required("Please enter movie description"),
  ngayKhoiChieu: yup
    .date()
    .min(new Date(), "The release date should be in the future")
    .required("Please enter release date"),
  maNhom: yup
    .string()
    .required("Please enter in group code"),
  dangChieu: yup
    .boolean()
    .required("Please specify if the movie is being shown"),
  sapChieu: yup
    .boolean()
    .required("Please specify if the movie is upcoming"),
  hot: yup
    .boolean()
    .required("Please specify if the movie is hot"),
  danhGia: yup
    .number()
    .min(1, "Rating must be at least 1")
    .max(10, "Rating must be at most 10")
    .required("Please enter a rating"),
  hinhAnh: yup
    .string()
    .matches(hinhAnhRegex, "The image must be a .jpg, .png, or .gif file")
    .required("Please enter an image url"),
});
