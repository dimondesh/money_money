export const formatNumber = (number) => {
  const validNumber = Number(number);

  if (isNaN(validNumber)) {
    return; // або поверніть порожній рядок, або повідомлення про помилку
  }

  return validNumber.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
