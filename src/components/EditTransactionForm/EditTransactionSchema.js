import * as yup from 'yup';

export const editTransactionSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError('Введіть число')
    .required('Обовʼязкове поле')
    .positive('Сума має бути більше 0'),
  date: yup
    .date()
    .typeError('Невірний формат дати')
    .required('Обовʼязкове поле'),
  comment: yup
    .string()
    .required('Обовʼязкове поле')
    .max(100, 'Коментар має бути не більше 100 символів'),
});
