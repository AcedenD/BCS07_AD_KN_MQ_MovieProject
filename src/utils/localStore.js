export const luuXuongLocal = (ten, data) => {
  const newData = JSON.stringify(data);
  localStorage.setItem(ten, newData);
};

export const layDuLieuLocal = (ten) => {
  const value = localStorage.getItem(ten);
  // when parse, 2 outcome can happen. 1 is have value, 2 is null

  if (JSON.parse(value)) {
    return JSON.parse(value);
  } else {
    return null;
  }
};
