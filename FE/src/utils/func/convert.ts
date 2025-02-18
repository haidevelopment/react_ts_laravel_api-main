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
export const formatDateVietnamese = (dateString:string) => {
  const months = [
    "tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6",
    "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
export const replaceTimes = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear(); 

  const formattedDate = `${day < 10 ? "0" : ""}${day}/${
    month < 10 ? "0" : ""
  }${month}/${year}`;

  return formattedDate;
};
export const truncateText = (text: string, maxLength: number = 50): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};