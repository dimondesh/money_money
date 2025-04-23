import { Field, Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerThunk } from "../../redux/auth/operations";
import s from "./RegistrationForm.module.css";
import registerValidatSchema from "helpers/registerValidatSchema";
import { useMediaQuery } from "react-responsive";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const initialValues = {
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, options) => {
    try {
      const { name, email, password } = values;
      const resultAction = await dispatch(
        registerThunk({ name, email, password })
      );

      if (registerThunk.fulfilled.match(resultAction)) {
        toast.success("Реєстрація успішна!");
        navigate("/dashboard");
      } else {
        throw new Error(resultAction.payload || "Щось пішло не так");
      }
      options.resetForm();
    } catch (error) {
      toast.error(error.message);
    } finally {
      options.setSubmitting(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registerValidatSchema}
      >
        <Form className={s.container}>
          <div className={s.logo}>
            {isMobile ? (
              <svg
                width="21"
                height="26"
                viewBox="0 0 21 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2328 3.50029C13.4298 3.04956 11.6269 2.1481 10.2747 0.795898C8.92251 2.1481 7.11958 3.04956 5.31665 3.50029C5.76738 7.55689 7.11958 10.2613 10.2747 12.5149C13.4298 10.2613 15.2328 7.55689 15.2328 3.50029Z"
                  fill="#FFC727"
                />
                <path
                  d="M13.4296 20.2824L0.809082 5.4082V12.6199L10.7252 23.8882L13.4296 20.2824Z"
                  fill="#FBFBFB"
                />
                <path
                  d="M14.782 18.9306L20.1908 12.6204V5.85938L11.6268 15.7755L14.782 18.9306Z"
                  fill="#FBFBFB"
                />
                <path
                  d="M15.2327 21.1842V25.2408L20.1907 19.3813V15.3247L15.2327 21.1842Z"
                  fill="#FBFBFB"
                />
                <path
                  d="M5.76714 21.1842L0.809082 15.3247V19.3813L5.76714 25.2408V21.1842Z"
                  fill="#FBFBFB"
                />
              </svg>
            ) : (
              <svg
                width="28"
                height="35"
                viewBox="0 0 28 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.6829 3.94514C18.1371 3.30829 15.5914 2.03458 13.6821 0.124023C11.7727 2.03458 9.22698 3.30829 6.68121 3.94514C7.31765 9.67683 9.22698 13.4979 13.6821 16.6822C18.1371 13.4979 20.6829 9.67683 20.6829 3.94514Z"
                  fill="#FFC727"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.1367 27.658L0.316406 6.64185V16.8315L14.3181 32.7528L18.1367 27.658Z"
                  fill="#FBFBFB"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.0463 25.7476L27.6836 16.8316V7.27881L15.5912 21.2896L20.0463 25.7476Z"
                  fill="#FBFBFB"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.6827 28.9317V34.6634L27.6836 26.3843V20.6526L20.6827 28.9317Z"
                  fill="#FBFBFB"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.31725 28.9317L0.316406 20.6526V26.3843L7.31725 34.6634V28.9317Z"
                  fill="#FBFBFB"
                />
              </svg>
            )}
            <h1 className={s.registerH1}>Money Guard</h1>
          </div>
          <label className={s.label}>
            <div className={s.wrapperInput}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C8.8299 15 6.01077 16.5306 4.21597 18.906C3.82968 19.4172 3.63653 19.6728 3.64285 20.0183C3.64773 20.2852 3.81533 20.6219 4.02534 20.7867C4.29716 21 4.67384 21 5.4272 21H18.5727C19.3261 21 19.7028 21 19.9746 20.7867C20.1846 20.6219 20.3522 20.2852 20.3571 20.0183C20.3634 19.6728 20.1703 19.4172 19.784 18.906C17.9892 16.5306 15.17 15 12 15Z"
                  fill="white"
                />
                <path
                  d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z"
                  fill="white"
                />
              </svg>
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className={s.fieldForm}
              />
            </div>
            {isMobile ? (
              <svg
                width="280"
                height="2"
                viewBox="0 0 280 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1H280" stroke="white" />
              </svg>
            ) : (
              <svg
                width="409"
                height="2"
                viewBox="0 0 409 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1H409" stroke="white" strokeOpacity="0.4" />
              </svg>
            )}
            <ErrorMessage name="name" component="div" className={s.error} />
          </label>
          <label className={s.label}>
            <div className={s.wrapperInput}>
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z"
                  fill="white"
                />
              </svg>
              <Field
                name="email"
                type="email"
                placeholder="E-mail"
                className={s.fieldForm}
              />
            </div>
            {isMobile ? (
              <svg
                width="280"
                height="2"
                viewBox="0 0 280 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1H280" stroke="white" />
              </svg>
            ) : (
              <svg
                width="409"
                height="2"
                viewBox="0 0 409 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1H409" stroke="white" strokeOpacity="0.4" />
              </svg>
            )}
            <ErrorMessage name="email" component="div" className={s.error} />
          </label>
          <label className={s.label}>
            <div className={s.wrapperInput}>
              <svg
                width="16"
                height="21"
                viewBox="0 0 16 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM8 16C6.9 16 6 15.1 6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16ZM11.1 7H4.9V5C4.9 3.29 6.29 1.9 8 1.9C9.71 1.9 11.1 3.29 11.1 5V7Z"
                  fill="white"
                />
              </svg>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={s.fieldForm}
              />
              <ProgressBar />
            </div>
            {isMobile ? (
              <svg
                width="280"
                height="2"
                viewBox="0 0 280 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1H280" stroke="white" />
              </svg>
            ) : (
              <svg
                width="409"
                height="2"
                viewBox="0 0 409 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1H409" stroke="white" strokeOpacity="0.4" />
              </svg>
            )}
            <ErrorMessage name="password" component="div" className={s.error} />
          </label>
          <label className={s.label}>
            <div className={s.wrapperInput}>
              <svg
                width="16"
                height="21"
                viewBox="0 0 16 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM8 16C6.9 16 6 15.1 6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16ZM11.1 7H4.9V5C4.9 3.29 6.29 1.9 8 1.9C9.71 1.9 11.1 3.29 11.1 5V7Z"
                  fill="white"
                />
              </svg>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className={s.fieldForm}
              />
            </div>
            {isMobile ? (
              <svg
                width="280"
                height="2"
                viewBox="0 0 280 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1H280" stroke="white" />
              </svg>
            ) : (
              <svg
                width="409"
                height="2"
                viewBox="0 0 409 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1H409" stroke="white" strokeOpacity="0.4" />
              </svg>
            )}
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={s.error}
            />
          </label>
          <div className={s.wrapperCheckbox}>
            <button type="submit" className={s.formBtn}>
              Register
            </button>
            <button className={s.btnLogin} type="button">
              <Link to="/login" className={s.link}>
                Log in{" "}
              </Link>
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
