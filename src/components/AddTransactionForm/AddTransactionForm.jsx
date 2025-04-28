// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import s from './AddTransactionForm.module.css';
// import { addTransaction } from '../../redux/transactions/operations';
// import { selectCategories } from '../../redux/transactions/selectors';
// import { addTrnValidSchema } from '../../helpers'; // подключение из helpers
// import { getTransactionId } from '../../components/constant';

// const AddTransactionForm = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const categories = useSelector(selectCategories);
//   const [transactionType, setTransactionType] = useState('expense');

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(addTrnValidSchema(transactionType === 'income')),
//     defaultValues: {
//       type: 'expense',
//       amount: '',
//       date: new Date(),
//       category: '',
//       comment: '',
//     },
//   });

//   const handleTypeChange = (type) => {
//     setTransactionType(type);
//     setValue('type', type);
//     if (type === 'income') {
//       setValue('category', '');
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         transactionDate: data.date,
//         type: transactionType.toUpperCase(),
//         amount: transactionType === 'income' ? +data.amount : -data.amount,
//         comment: data.comment,
//         categoryId:
//           transactionType === 'income'
//             ? '063f1132-ba5d-42b4-951d-44011ca46262'
//             : getTransactionId(data.category, categories),
//       };

//       await dispatch(addTransaction(payload)).unwrap();
//       onClose();
//     } catch (error) {
//       console.error('Failed to add transaction:', error);
//     }
//   };

//   return (
//     <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
//       {/* Тип транзакции */}
//       <div className={styles.switcherWrapper}>
//         <button
//           type="button"
//           className={`${styles.switchButton} ${transactionType === 'income' ? styles.active : ''}`}
//           onClick={() => handleTypeChange('income')}
//         >
//           Income
//         </button>
//         <button
//           type="button"
//           className={`${styles.switchButton} ${transactionType === 'expense' ? styles.active : ''}`}
//           onClick={() => handleTypeChange('expense')}
//         >
//           Expense
//         </button>
//       </div>

//       {/* Категория */}
//       {transactionType === 'expense' && (
//         <div className={styles.fieldGroup}>
//           <label className={styles.label}>
//             Category:
//             <select
//               {...register('category')}
//               className={`${styles.input} ${errors.category ? styles.inputError : ''}`}
//             >
//               <option value="">Select a category</option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.name}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </label>
//           {errors.category && <p className={styles.errorMessage}>{errors.category.message}</p>}
//         </div>
//       )}

//       {/* Сумма */}
//       <div className={styles.fieldGroup}>
//         <label className={styles.label}>
//           Amount:
//           <input
//             type="text"
//             {...register('amount')}
//             placeholder="0.00"
//             className={`${styles.input} ${errors.amount ? styles.inputError : ''}`}
//           />
//         </label>
//         {errors.amount && <p className={styles.errorMessage}>{errors.amount.message}</p>}
//       </div>

//       {/* Дата */}
//       <div className={styles.fieldGroup}>
//         <label className={styles.label}>
//           Date:
//           <Controller
//             control={control}
//             name="date"
//             render={({ field }) => (
//               <DatePicker
//                 {...field}
//                 selected={field.value}
//                 onChange={(date) => field.onChange(date)}
//                 dateFormat="dd.MM.yyyy"
//                 className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
//               />
//             )}
//           />
//         </label>
//         {errors.date && <p className={styles.errorMessage}>{errors.date.message}</p>}
//       </div>

//       {/* Комментарий */}
//       <div className={styles.fieldGroup}>
//         <label className={styles.label}>
//           Comment:
//           <input
//             type="text"
//             {...register('comment')}
//             placeholder="Comment"
//             className={`${styles.input} ${errors.comment ? styles.inputError : ''}`}
//           />
//         </label>
//         {errors.comment && <p className={styles.errorMessage}>{errors.comment.message}</p>}
//       </div>

//       {/* Кнопки */}
//       <div className={styles.buttons}>
//         <button type="submit" className={styles.addButton}>
//           Add
//         </button>
//         <button type="button" className={styles.cancelButton} onClick={onClose}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddTransactionForm;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addTransaction } from "../../redux/transactions/transactionOps";
import { fetchCategories } from "../../redux/categories/operations";
import { selectCategories, selectCategoriesLoading } from "../../redux/categories/selectors";
import styles from "./AddTransactionForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loadingCategories = useSelector(selectCategoriesLoading);
  
  const [transactionType, setTransactionType] = useState('expense');
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const validationSchema = Yup.object({
    amount: Yup.number().positive('Must be positive').required('Required'),
    comment: Yup.string().required('Required'),
    categoryId: transactionType === "expense" ? Yup.string().required('Required') : Yup.string(),
  });

  const handleTypeChange = (type, setFieldValue) => {
    setTransactionType(type);
    setFieldValue('categoryId', '');
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(addTransaction({
        ...values,
        type: transactionType,
        date: startDate.toISOString(),
        amount: transactionType === 'expense' ? -Math.abs(values.amount) : Math.abs(values.amount),
      })).unwrap();
      resetForm();
      onClose();
    } catch (error) {
      console.error('Failed to add transaction', error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        amount: '',
        comment: '',
        categoryId: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className={styles.form}>
          {/* Селектор типа */}
          <div className={styles.switcherWrapper}>
            <button type="button" onClick={() => handleTypeChange('income', setFieldValue)}
              className={transactionType === "income" ? styles.active : ''}>
              Income
            </button>
            <button type="button" onClick={() => handleTypeChange('expense', setFieldValue)}
              className={transactionType === "expense" ? styles.active : ''}>
              Expense
            </button>
          </div>

          {/* Категории */}
          {transactionType === "expense" && (
            <div className={styles.fieldGroup}>
              {loadingCategories ? (
                <p>Loading categories...</p>
              ) : (
                <Field as="select" name="categoryId" className={styles.select}>
                  <option value="">Select category</option>
                  {categories
                    .filter(cat => cat.type === "expense")
                    .map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </Field>
              )}
              <ErrorMessage name="categoryId" component="div" className={styles.error} />
            </div>
          )}

          {/* Amount */}
          <div className={styles.fieldGroup}>
            <Field type="number" name="amount" placeholder="Amount" className={styles.input} />
            <ErrorMessage name="amount" component="div" className={styles.error} />
          </div>

          {/* Date */}
          <div className={styles.fieldGroup}>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="dd.MM.yyyy"
              className={styles.input}
            />
          </div>

          {/* Comment */}
          <div className={styles.fieldGroup}>
            <Field type="text" name="comment" placeholder="Comment" className={styles.input} />
            <ErrorMessage name="comment" component="div" className={styles.error} />
          </div>

          {/* Buttons */}
          <div className={styles.buttons}>
            <button type="submit" disabled={isSubmitting} className={styles.addButton}>
              Add
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddTransactionForm;
