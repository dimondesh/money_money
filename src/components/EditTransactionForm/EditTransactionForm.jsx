import "react-datepicker/dist/react-datepicker.css";

import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import CustomIconForCalendar from "../AddTransactionForm/CustomIconForCalendar";
import DatePicker from "react-datepicker";
import FormButton from "../FormButton/FormButton";
import { closeModalEditTransaction } from "../../redux/modal/modalSlice";
import css from "./EditTransactionForm.module.css";
import { editTransactions } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/categories/selectors";
// import { selectCurrentTransaction } from "@redux/transactions";
import { showToast } from "..//../components/Toast/CustomToaster";
import { useState } from "react";
import { validationEditTransaction } from "../../helpers/editValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectTransactions } from "@redux/transactions/selectors";

const EditTransactionForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const transaction = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);
  const [startDate, setStartDate] = useState(new Date(transaction.date));

  const { _id, type, categoryId, comment } = transaction;

  if (!transaction) return null;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sum: Math.abs(transaction.sum),
      comment: transaction.comment,
    },
    resolver: yupResolver(validationEditTransaction),
  });

  const onSubmit = async (data) => {
    try {
      const updatedTransaction = {
        type: type,
        categoryId: categoryId,
        sum: parseFloat(data.sum),
        comment: comment,
        date: startDate.toISOString(),
      };

      await dispatch(editTransactions({ _id, updatedTransaction })).unwrap();

      dispatch(closeModal());
    } catch (error) {
      console.error("Edit transaction error:", error);
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
              transaction.type === "income"
                ? css.activeToggle
                : css.inactiveToggle
            }`}
          >
            Income
          </span>
          /
          <span
            className={`${css.toggle} ${
              transaction.type === "expense"
                ? css.activeToggle
                : css.inactiveToggle
            }`}
          >
            Expense
          </span>
        </p>
      </div>
      {transaction.type === "expense" && (
        <p
          className={
            currentCategory ? css.categoryLabel : css.categoryLabelEmpty
          }
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
              {...register("amount")}
            />
            {errors.amount && (
              <span className={css.message}>{errors.amount.message}</span>
            )}
          </div>
          <Controller
            control={control}
            name="date"
            render={() => (
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                calendarStartDay={1}
                dateFormat="dd.MM.yyyy"
                maxDate={new Date()}
                customInput={<CustomIconForCalendar />}
              />
            )}
          />
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
