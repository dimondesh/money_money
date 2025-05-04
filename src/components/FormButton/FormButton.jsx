import styles from './FormButton.module.css';

const FormButton = ({
  type = 'button',
  text,
  handlerFunction,
  variant = 'default',
  isDisabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={handlerFunction}
      className={`${styles.formButton} ${styles[variant]}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default FormButton;
