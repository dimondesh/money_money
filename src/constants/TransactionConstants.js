const getTransactionId = (transactionCategory, categories) => {
  const transactionTargeted = categories?.find(
    (item) => item.name === transactionCategory
  );

  // return transactionTargeted.id;
  return transactionTargeted?.id || null;
};

const getTransactionCategory = (transactionId, categories) => {
  const transactionTargeted = categories?.find(
    (item) => item.id === transactionId
  );

  // return transactionTargeted.name;
  return transactionTargeted?.name || "";
};

const formatData = (unixData) => {
  const year = new Date(unixData).getFullYear();
  const mounth = new Date(unixData).getMonth() + 1;
  const day = new Date(unixData).getDate();

  const doubleDigitsFormatMounth = String(mounth).padStart(2, 0);
  const doubleDigitsFormatDay = String(day).padStart(2, 0);

  return `${doubleDigitsFormatDay}.${doubleDigitsFormatMounth}.${year}`;
};

const Months_OPTIONS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const CURRENT_YEAR = new Date().getFullYear();

const YEARS_OPTIONS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

const getTrasactionCategoryColor = (category) => {
  switch (category) {
    case "Main expenses":
      return "rgba(254, 208, 87, 1)";

    case "Products":
      return "rgba(255, 0, 255, 1)";

    case "Car":
      return "rgba(253, 148, 152, 1)";

    case "Self care":
      return "rgba(197, 186, 255, 1)";

    case "Child care":
      return "rgba(127, 255, 0, 1)";

    case "Household products":
      return "rgba(74, 86, 226, 1)";

    case "Education":
      return "rgba(0, 255, 255, 1)";

    case "Leisure":
      return "rgba(255, 119, 0, 1)";

    case "Other expenses":
      return "rgba(0, 173, 132, 1)";

    case "Entertainment":
      return "rgba(177, 15, 72, 1)";

    default:
      return "rgb(128, 128, 128)";
  }
};

const categories = [
  {
    id: "da8d0a6d-60c9-4cc5-be1e-34680e6a181d",
    name: "Main expenses",
    type: "expense",
  },
  {
    id: "677d8aac-12a3-467c-8c1c-5493bae43996",
    name: "Products",
    type: "expense",
  },
  {
    id: "89707abe-6aec-45d5-a10c-3d8ddf1b6851",
    name: "Car",
    type: "expense",
  },
  {
    id: "d12ba90e-10ae-4862-a9bb-ff4dcb09c177",
    name: "Self care",
    type: "expense",
  },
  {
    id: "b9b1159e-d14b-4f50-a500-f937af5b2438",
    name: "Child care",
    type: "expense",
  },
  {
    id: "661da941-3c7a-4921-9e8a-7b466a546a18",
    name: "Household products",
    type: "expense",
  },
  {
    id: "a5b7487c-d5c9-4099-9266-ca2fe93a796e",
    name: "Education",
    type: "expense",
  },
  {
    id: "9c4c46b1-7687-40f2-8923-a98903b24062",
    name: "Leisure",
    type: "expense",
  },
  {
    id: "b580ddd9-ae63-4258-b860-e4fa2b8fa25a",
    name: "Other expenses",
    type: "expense",
  },
  {
    id: "7350db95-89fc-43bd-9a71-1e5bf4e6bf4e",
    name: "Entertainment",
    type: "expense",
  },
  {
    id: "c15023f1-5812-42b2-93c3-54d66c539e5b",
    name: "Income",
    type: "income",
  },
];

export {
  getTransactionId,
  getTransactionCategory,
  formatData,
  Months_OPTIONS,
  YEARS_OPTIONS,
  getTrasactionCategoryColor,
  categories,
};
