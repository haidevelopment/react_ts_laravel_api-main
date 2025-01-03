export const setLocal = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getLocal = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
