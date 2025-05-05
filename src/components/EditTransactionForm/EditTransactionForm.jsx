import "react-datepicker/dist/react-datepicker.css";

import {
  closeModalEditTransaction,
  selectTransactionId,
} from "../../redux/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import FormButton from "../FormButton/FormButton";
import ReactDatePicker from "react-datepicker";
import css from "./EditTransactionForm.module.css";
import {
  editTransactions,
  getTransactions,
} from "../../redux/transactions/operations";
import { selectCategories } from "@redux/categories/selectors";
import { selectTransactions } from "../../redux/transactions/selectors";
import { showToast } from "../Toast/CustomToaster";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { validationEditTransaction } from "../../helpers/editValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { getBalanceThunk } from "@redux/auth/operations";
import { getIncomeAndExpenseSummaryByPeriod } from "@redux/statistics/operations";
import { FiCalendar } from "react-icons/fi";

const EditTransactionForm = () => {
  const dispatch = useDispatch();

  const transactionId = useSelector(selectTransactionId);
  const allTransactions = useSelector(selectTransactions);
  const transaction = allTransactions.find((t) => t._id === transactionId);
  const categories = useSelector(selectCategories);

  if (!transaction) return null;

  const { _id, type } = transaction;

  const initialDate =
    transaction?.date && !isNaN(new Date(transaction.date))
      ? new Date(transaction.date)
      : new Date();

  const [startDate, setStartDate] = useState(initialDate);
  const [categoryIdv, setCategoryIdv] = useState(transaction.categoryId || "");

  const handleChange = (e) => {
    setCategoryIdv(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      sum: Math.abs(transaction.sum),
      comment: transaction.comment || "",
      date: initialDate,
    },
    resolver: yupResolver(validationEditTransaction),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (!_id) {
      showToast("error", "Something went wrong. Please reopen the modal.");
      return;
    }

    const updatedTransaction = {
      date: startDate.toISOString(),
      comment: data.comment,
      sum: parseFloat(data.sum),
      type: transaction.type,
      categoryId: categoryIdv,
    };

    try {
      await dispatch(
        editTransactions({ id: _id, updatedTransaction })
      ).unwrap();
      dispatch(getBalanceThunk());
      dispatch(closeModalEditTransaction());
      showToast("success", "Transaction updated successfully!");
    } catch (error) {
      showToast("error", "Please try again.");
      console.error("Edit error:", error);
    }
  };

  const currentCategory = categories.find(
    (cat) => cat.id === categoryIdv
  )?.name;

  return (
    <div className={css.modal}>
      <div className={css.header}>
        <h2 className={css.title}>Edit transaction</h2>
        <p className={css.toggleRow}>
          <span
            className={`${css.toggle} ${
              type === "income" ? css.activeToggle : css.inactiveToggle
            }`}
          >
            Income
          </span>
          /
          <span
            className={`${css.toggle} ${
              type === "expense" ? css.activeToggle : css.inactiveToggle
            }`}
          >
            Expense
          </span>
        </p>
      </div>

      {type === "expense" && (
        <p
          className={
            currentCategory ? css.categoryLabel : css.categoryLabelEmpty
          }
        >
          <div className={`${css.inputField} ${css.category}`}>
            <select
              name="categoryId"
              value={categoryIdv}
              onChange={handleChange}
              required
              className={css.selectTransparent}
            >
              <option value="" disabled hidden>
                Select a category
              </option>
              {categories.slice(0, -1).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </p>
      )}

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.twoInput}>
          <div className={css.errorField}>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className={css.numInput}
              {...register("sum")}
            />
            {errors.sum && (
              <span className={css.message}>{errors.sum.message}</span>
            )}
          </div>

          <div className={`${css.dateInput} ${css.date}`}>
            <ReactDatePicker
              dateFormat="dd.MM.yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              locale="en-US"
              calendarStartDay={1}
            />
            <FiCalendar className={css.icon} />
          </div>
          {errors.date && (
            <span className={css.message}>{errors.date.message}</span>
          )}
        </div>

        <div className={css.errorField}>
          <input
            type="text"
            placeholder="Comment"
            className={css.textInput}
            {...register("comment")}
          />
          {errors.comment && (
            <span className={css.message}>{errors.comment.message}</span>
          )}
        </div>

        <div className={css.buttonsWrapper}>
          <FormButton
            type="submit"
            text="Save"
            variant="multiColorButton"
            isDisabled={!isValid || (type === "expense" && !categoryIdv)}
          />
          <FormButton
            type="button"
            text="Cancel"
            variant="whiteButton"
            handlerFunction={() => dispatch(closeModalEditTransaction())}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTransactionForm;
