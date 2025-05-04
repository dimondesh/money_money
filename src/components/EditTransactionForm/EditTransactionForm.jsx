import "react-datepicker/dist/react-datepicker.css";

import {
  closeModalEditTransaction,
  selectTransactionId,
} from "../../redux/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";

import FormButton from "../FormButton/FormButton";
import ReactDatePicker from "react-datepicker";
import css from "./EditTransactionForm.module.css";
import { editTransactions } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/categories/selectors";
import { selectTransactions } from "../../redux/transactions/selectors";
import { showToast } from "../Toast/CustomToaster";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { validationEditTransaction } from "../../helpers/editValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const EditTransactionForm = () => {
  const dispatch = useDispatch();

  const transactionId = useSelector(selectTransactionId);
  const allTransactions = useSelector(selectTransactions);
  const transaction = allTransactions.find((t) => t._id === transactionId);

  if (!transaction) return null;

  const { _id, type, categoryId } = transaction;
  const categories = useSelector(selectCategories);

  const initialDate =
    transaction?.date && !isNaN(new Date(transaction.date))
      ? new Date(transaction.date)
      : new Date();

  const [startDate, setStartDate] = useState(initialDate);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      sum: Math.abs(transaction.sum),
      comment: transaction.comment,
      date: initialDate,
    },
    resolver: yupResolver(validationEditTransaction),
    mode: "onChange", // Для оновлення isValid при кожній зміні
  });

  const onSubmit = async (data) => {
    if (!_id) {
      showToast("error", "Something went wrong. Please reopen the modal.");
      return;
    }

    try {
      const updatedTransaction = {
        type,
        categoryId,
        sum: parseFloat(data.sum),
        comment: data.comment,
        date: startDate.toISOString(),
      };

      await dispatch(editTransactions({ _id, updatedTransaction })).unwrap();
      dispatch(closeModalEditTransaction());
    } catch (error) {
      showToast("error", "Please try again.");
    }
  };

  const currentCategory = categories.data?.find(
    (cat) => cat.id === categoryId
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
          className={currentCategory ? css.categoryLabel : css.categoryLabelEmpty}
        >
          {currentCategory}
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

          {/* Стандартний календар з ReactDatePicker */}
          <div className={`${css.inputField} ${css.date}`}>
            <ReactDatePicker
              dateFormat="dd.MM.yyyy"
              selected={startDate} // Вибір дати з стейту
              onChange={(date) => setStartDate(date)} // Оновлення дати
              locale="en-US"
              calendarStartDay={1}
            />
          </div>
          {errors.date && <span className={css.message}>{errors.date.message}</span>}
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
            type={"submit"}
            text={"Save"}
            variant={"multiColorButton"}
            isDisabled={!isValid}
          />
          <FormButton
            type={"button"}
            text={"cancel"}
            variant={"whiteButton"}
            handlerFunction={() => dispatch(closeModalEditTransaction())}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTransactionForm;
