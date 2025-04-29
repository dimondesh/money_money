import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
import DatePicker from 'react-datepicker';
import { EditTransactionSchema } from './EditTransactionSchema'; // ОНОВЛЕНИЙ імпорт
import { Loader } from '../Loader/Loader';
import { closeModal } from '../../redux/modal/slice';
import css from './EditTransactionForm.module.css';
import { editTransactions } from '../../redux/transactions/operations';
import { selectCategories } from '../../redux/transactions/selectors';
import { selectCurrentTransaction } from '../../redux/transactions/selectors';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const EditTransactionForm = () => {
  const dispatch = useDispatch();
  const { transaction } = useSelector(selectCurrentTransaction);
  const categories = useSelector(selectCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date(transaction.date));

  if (!transaction) return null;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: Math.abs(transaction.amount),
      comment: transaction.comment,
    },
    resolver: yupResolver(EditTransactionSchema), // ОНОВЛЕНО
  });

  const currentCategory = categories.find(cat => cat.id === transaction.categoryId)?.name;

  const onSubmit = async (data) => {
    setIsLoading(true);

    const updatedTransaction = {
      date: startDate.toISOString(),
      comment: data.comment,
      amount: parseFloat(data.amount) * (transaction.type === 'EXPENSE' ? -1 : 1),
      type: transaction.type,
      categoryId: transaction.categoryId,
      id: transaction._id,
    };

    try {
      await dispatch(editTransactions(updatedTransaction)).unwrap();
      dispatch(closeModal());
      toast.success('Transaction updated successfully!');
    } catch (error) {
      console.error('Failed to edit transaction:', error.message);
      toast.error('Failed to update transaction!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={css.backdrop} onClick={() => dispatch(closeModal())}></div>
      <div className={css.modal}>
        <div className={css.header}>
          <h2 className={css.title}>Edit transaction</h2>
          <p className={css.toggleRow}>
            <span className={`${css.toggle} ${transaction.type === 'INCOME' ? css.activeToggle : css.inactiveToggle}`}>Income</span>/
            <span className={`${css.toggle} ${transaction.type === 'EXPENSE' ? css.activeToggle : css.inactiveToggle}`}>Expense</span>
          </p>
        </div>

        {transaction.type === 'EXPENSE' && (
          <p className={currentCategory ? css.categoryLabel : css.categoryLabelEmpty}>{currentCategory}</p>
        )}

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.twoInput}>
            <div className={css.errorField}>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                className={css.numInput}
                {...register('amount')}
              />
              {errors.amount && <span className={css.message}>{errors.amount.message}</span>}
            </div>

            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={startDate}
                  onChange={(date) => {
                    field.onChange(date);
                    setStartDate(date);
                  }}
                  calendarStartDay={1}
                  dateFormat="dd.MM.yyyy"
                  maxDate={new Date()}
                  customInput={<AddTransactionForm />}
                />
              )}
            />
          </div>

          <div className={css.errorField}>
            <input
              type="text"
              placeholder="Comment"
              className={css.textInput}
              {...register('comment')}
            />
            {errors.comment && <span className={css.message}>{errors.comment.message}</span>}
          </div>

          <div className={css.buttonsWrapper}>
            <button type="submit" className={`${css.button} ${css.saveButton}`}>
              Save
            </button>
            <button
              type="button"
              className={`${css.button} ${css.cancelButton}`}
              onClick={() => dispatch(closeModal())}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTransactionForm;
