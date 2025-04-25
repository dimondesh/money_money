import { Form, Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineMailOutline, MdLock } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';
import s from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operations';
console.log('Проверка импорта registerThunk:', registerThunk);
import { registerValidatSchema } from 'helpers';
import FormButton from '../common/FormButton/FormButton';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo/Logo';
// import ProgressBar from '../ProgressBar/ProgressBar';
import InputFormField from 'components/InputFormField/InputFormField';
import { motion } from 'framer-motion';

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, actions) => {
  console.log('handleSubmit called with values:', values);
  const { username, email, password } = values;
  try {
    const resultAction = await dispatch(
      registerThunk({ username, email, password })
    );

    if (registerThunk.fulfilled.match(resultAction)) {

      navigate('/login');
      actions.resetForm(); 
    } else {

      if (resultAction.payload) {

         console.error("Registration failed (rejectedWithValue):", resultAction.payload);
      } else {

         console.error("Registration failed with unknown error object:", resultAction);
         toast.error("Щось пішло не так під час реєстрації.");
      }
    }
  } catch (error) {

    console.error("Dispatch error:", error);
    toast.error(error.message || "Сталася непередбачена помилка.");
  } finally {
    actions.setSubmitting(false);
  }
};

  return (
    <div className={s.backdrop}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className={s.modal}>
          <Logo />
          <Formik
            initialValues={initialValues}
            validationSchema={registerValidatSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className={s.form}>
                <div className={s.inputs}>
                  <InputFormField
                    icon={IoPerson}
                    type="text"
                    name="username"
                    placeholder="Name"
                  />
                  <InputFormField
                    icon={MdOutlineMailOutline}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                  />
                  <InputFormField
                    icon={MdLock}
                    type="password"
                    name="password"
                    placeholder="Password"
                    passwordValue={values.password}
                  />
                  <InputFormField
                    icon={MdLock}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    confirmValue={values.confirmPassword}
                    passwordValue={values.password}
                  />
                </div>
                <div className={s.btns}>
                  <FormButton
                    type="submit"
                    text={'Register'}
                    variant={'multiColorButtton'}
                  />
                  <Link to="/login">
                    <FormButton
                      type="button"
                      text={'LogIn'}
                      variant={'whiteButtton'}
                    />
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
