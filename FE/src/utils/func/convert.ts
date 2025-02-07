export const convertVND = (number: number) => {
  if (isNaN(number)) {
    return "Dữ liệu không hợp lệ";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};
export const convertStatus = (status: number) => {
  if (status == 1) {
    return "Đang kinh doanh";
  } else {
    return " Ngừng kinh doanh";
  }
};
export const truncateProductName = (name:string, maxLength = 40) => {
  return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
};
