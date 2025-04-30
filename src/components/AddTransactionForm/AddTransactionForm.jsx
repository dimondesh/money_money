import { useEffect, useState } from "react";
import styles from "./AddTransactionForm.module.css";
import FormButton from "components/common/FormButton/FormButton";
import icons from "../../images/icons/sprite.svg";
import { useMedia } from "../../hooks/useMedia";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { addTrnValidSchema } from "../../helpers/index.js";
import { useDispatch, useSelector } from "react-redux";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enUS from "date-fns/locale/en-US";
// import { categories } from "../../constants/TransactionConstants";

import { addTransactions } from "@redux/transactions/operations";
import { getBalanceThunk } from "@redux/auth/operations";

import { FiCalendar } from "react-icons/fi";
import { selectCategories } from "@redux/categories/selectors";

registerLocale("en-US", enUS);

const AddTransactionForm = ({ closeModal }) => {
  const [isOnIncomeTab, setIsOnIncomeTab] = useState(false);
  const { isTablet } = useMedia();
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());

  const initialValues = {
    amount: "",
    comment: "",
    category: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);

      const transactionData = {
        type: isOnIncomeTab ? "income" : "expense",
        category: values.category || (isOnIncomeTab ? "Income" : "Main"),
        sum: Number(values.sum),
        comment: values.comment,
        date: startDate.toISOString(),
      };

      await dispatch(addTransactions(transactionData)).unwrap();
      resetForm();
      await dispatch(getBalanceThunk());
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      closeModal();
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.modalContent}>
      {isTablet && (
        <button className={styles.closeButton} onClick={() => closeModal()}>
          <svg>
            <use href={`${icons}#icon-close`}></use>
          </svg>
        </button>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={addTrnValidSchema(isOnIncomeTab)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className={styles.formTitle}>Add transaction</h2>

            <div className={styles.switcheWrapper}>
              <span className={`${isOnIncomeTab ? styles.income : null}`}>
                Income
              </span>

              <input
                type="checkbox"
                id="switcherButton"
                onChange={() => setIsOnIncomeTab(!isOnIncomeTab)}
                checked={!isOnIncomeTab}
              />
              <label htmlFor="switcherButton"></label>

              <span className={`${!isOnIncomeTab ? styles.expense : null}`}>
                Expense
              </span>
            </div>

            <div className={styles.inputWrapper}>
              {!isOnIncomeTab && (
                <div className={`${styles.inputField} ${styles.category}`}>
                  <Field as="select" name="category" autoFocus required>
                    <option value="">Select your category</option>
                    {categories.slice(0, -1).map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="p" />
                </div>
              )}

              <div className={`${styles.inputField} ${styles.amount}`}>
                <Field type="number" name="sum" min="1" placeholder="0.00" />
                <ErrorMessage name="sum" component="p" />
              </div>

              <div className={`${styles.inputField} ${styles.date}`}>
                <ReactDatePicker
                  dateFormat="dd.MM.yyyy"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  locale="en-US"
                  calendarStartDay={1}
                />
                <FiCalendar className={styles.icon} />
              </div>

              <div className={`${styles.inputField} ${styles.comment}`}>
                <Field type="text" name="comment" placeholder="Comment" />
                <ErrorMessage name="comment" component="p" />
              </div>
            </div>

            <div className={styles.buttonsWrapper}>
              <FormButton
                type={"submit"}
                text={"Add"}
                variant={"multiColorButtton"}
                isDisabled={isSubmitting}
              />
              <FormButton
                type={"button"}
                text={"cancel"}
                variant={"whiteButtton"}
                handlerFunction={() => closeModal()}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTransactionForm;

// import { useEffect, useState } from 'react';
// import styles from './AddTransactionForm.module.css';
// import FormButton from '../common/FormButton/FormButton';
// import icons from '../../images/icons/sprite.svg';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import ReactDatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { getTransactionId } from '../../constants/TransactionConstants';
// import { addTransactions } from '../../redux/transactions/operations';
// import { FiCalendar } from 'react-icons/fi';
// import Select from 'react-select';
// import { customStyles } from './customStyles';
// import { addTrnValidSchema } from '../../helpers/addTrnValidSchema';
// import { useMedia } from '../../hooks/useMedia';
// import { selectCategories } from '../../redux/categories/selectors';

// const AddTransactionForm = ({ closeModal }) => {
//   const [isOnIncomeTab, setIsOnIncomeTab] = useState(false);
//   useEffect(() => {}, [isOnIncomeTab]);
//   const { isTablet } = useMedia();
//   const dispatch = useDispatch();
//   const [startDate, setStartDate] = useState(new Date());
//   const categories = useSelector(selectCategories);
//   const initialValues = {
//     sum: '',
//     comment: '',
//     category: null,
//   };
//   const transactionCategories = useSelector(selectCategories);

//   const handleSubmit = (values, { setSubmitting, setStatus }) => {
//     setSubmitting(true);

//     dispatch(
//       addTransactions({
//         transactionDate: startDate,
//
//         type: isOnIncomeTab ? 'income' : 'expense',
//         categoryId: isOnIncomeTab
//           ? 'c15023f1-5812-42b2-93c3-54d66c539e5b'
//           : getTransactionId(values.category, categories),
//         comment: values.comment,
//         amount: isOnIncomeTab ? values.amount : 0 - values.amount,
//       })
//     )
//       .unwrap()
//       .then(() => {
//         closeModal();
//       })
//       .catch(error => {
//         setStatus({ success: false, error: error });
//         setSubmitting(false);
//       });
//   };
//   const catOptions = transactionCategories
//     .slice(0, -1)
//     .map(item => ({ value: item.name, label: item.name }));
//   return (
//     <div className={styles.modalContent}>
//       {isTablet && (
//         <button className={styles.closeButton} onClick={() => closeModal()}>
//           <svg>
//             <use href={`${icons}#icon-close`}></use>
//           </svg>
//         </button>
//       )}
//       <Formik
//         initialValues={initialValues}
//         validationSchema={addTrnValidSchema(isOnIncomeTab)}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, setFieldValue }) => (
//           <Form>
//             <h2 className={styles.formTitle}>Add transaction</h2>
//             <div className={styles.switcheWrapper}>
//               <span className={`${isOnIncomeTab && styles.income}`}>
//                 Income
//               </span>
//               <input
//                 type="checkbox"
//                 id="switcherButton"
//                 onChange={() => setIsOnIncomeTab(!isOnIncomeTab)}
//                 checked={!isOnIncomeTab}
//               />
//               <label htmlFor="switcherButton"></label>
//               <span className={`${!isOnIncomeTab ? styles.expense : null}`}>
//                 Expense
//               </span>
//             </div>
//             <div className={styles.inputWrapper}>
//               {!isOnIncomeTab && (
//                 <div className={`${styles.inputField} ${styles.category}`}>
//                   <Select
//                     onChange={selectedOption =>
//                       setFieldValue(
//                         'category',
//                         selectedOption ? selectedOption.value : null
//                       )
//                     }
//                     name="category"
//                     autoFocus
//                     options={catOptions}
//                     styles={customStyles}
//                   />
//                   <ErrorMessage name="category" component="p" />
//                 </div>
//               )}

//               <div className={`${styles.inputField} ${styles.amount}`}>
//                 <Field type="number" name="sum" min="1" placeholder="0.00" />
//                 <ErrorMessage name="sum" component="p" />
//               </div>

//               <div className={`${styles.inputField} ${styles.date}`}>
//                 <ReactDatePicker
//                   dateFormat="dd.MM.yyyy"
//                   selected={startDate}
//                   onChange={date => setStartDate(date)}
//                   calendarStartDay={1}
//                   maxDate={new Date()}
//                 />
//                 <FiCalendar className={styles.icon} />
//               </div>

//               <div className={`${styles.inputField} ${styles.comment}`}>
//                 <Field type="text" name="comment" placeholder="Comment" />
//                 <ErrorMessage name="comment" component="p" />
//               </div>
//             </div>

//             <div className={styles.buttonsWrapper}>
//               <FormButton
//                 type={'submit'}
//                 text={'Add'}
//                 variant={'multiColorButtton'}
//                 isDisabled={isSubmitting}
//               />
//               <FormButton
//                 type={'button'}
//                 text={'cancel'}
//                 variant={'whiteButtton'}
//                 handlerFunction={() => closeModal()}
//               />
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default AddTransactionForm;
