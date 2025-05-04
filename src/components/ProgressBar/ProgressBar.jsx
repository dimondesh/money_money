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
      {!isMatch && confirmValue && (
        <PasswordStrengthBar
          password={confirmValue}
          scoreWordStyle={{ display: "none" }}
          score={getFakeStrength(confirmValue)}
          shortScoreWord=""
          barColors={["#ff4d4f", "#ff4d4f", "#ff4d4f", "#ff4d4f", "#ff4d4f"]}
        />
      )}
    </>
  );
};

export default ProgressBar;
