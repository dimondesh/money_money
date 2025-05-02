const dateFormat = (date) => {
  const result = date.split("-").reverse();
  result[2] = result[2].slice(2, 4);
  return result.join(".");
};

export default dateFormat;

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Місяці від 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
