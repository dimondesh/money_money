import React from "react";
import { useFormikContext } from "formik";
import PasswordStrengthBar from "react-password-strength-bar";
import s from "./ProgressBar.module.css";

const ProgressBar = () => {
  const { values } = useFormikContext();

  const confirmValue = values.confirmPassword;
  const isMatch = values.password === confirmValue;

  const getFakeStrength = (value) => {
    if (!value) return 0;
    if (!isMatch) return 1;
    return 4;
  };

  return (
    <>
      <PasswordStrengthBar
        password={confirmValue}
        scoreWordStyle={{ display: "none" }}
        score={getFakeStrength(confirmValue)}
        shortScoreWord=""
      />
      {!isMatch && confirmValue && (
        <div className={s.progressBar}>
          <div
            className={s.confirmProgresFill}
            style={{
              width: isMatch ? "100%" : "50%",
              backgroundColor: isMatch ? "#ffc727" : "#ff6b6b", // жовта або червона
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
