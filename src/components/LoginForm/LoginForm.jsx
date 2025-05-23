import { Form, Formik } from 'formik';
import { MdOutlineMailOutline } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
import s from './LoginForm.module.css';
import { loginThunk } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import { loginValidatiSchema } from 'helpers';
import FormButton from '../common/FormButton/FormButton';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo/Logo';
import { refreshUserThunk } from '../../redux/auth/operations';
import InputFormField from 'components/InputFormField/InputFormField';
import { motion } from 'framer-motion';
export const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

const handleSubmit = async (values, actions) => {
  try {
    const response = await dispatch(loginThunk(values)); 

    if (loginThunk.fulfilled.match(response)) {
      await dispatch(refreshUserThunk());       
      actions.resetForm();                   
    } else {
      console.error('Login failed:', response); 
    }
  } catch (error) {
    console.error('Something went wrong:', error);
  }
};

  return (
    <div className={s.backdrop}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className={s.modal}>
          <Logo />
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidatiSchema}
            onSubmit={handleSubmit}
          >
            <Form className={s.form}>
              <div className={s.inputs}>
                <InputFormField
                  icon={MdOutlineMailOutline}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <InputFormField
                  icon={MdLock}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className={s.btns}>
                <FormButton
                  type="submit"
                  text={'LogIn'}
                  variant={'multiColorButtton'}
                />
                <Link to="/register">
                  <FormButton
                    type="button"
                    text={'Register'}
                    variant={'whiteButtton'}
                  />
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
