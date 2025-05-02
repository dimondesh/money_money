import * as Yup from "yup";

export const addTrnValidSchema = (isOnIncomeTab) => {
  return isOnIncomeTab
    ? Yup.object({
        sum: Yup.string().required("Required* "),
        comment: Yup.string().required("Required*"),
        categoryId: Yup.string().required("Required*"),
      })
    : Yup.object({
        sum: Yup.string().required("Required*"),
        comment: Yup.string().required("Required*"),
      });
};
