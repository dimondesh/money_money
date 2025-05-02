import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencyRates } from "../../redux/currency/currencySlice";
import styles from "./Currency.module.css";

const Currency = () => {
  const dispatch = useDispatch();
  const { rates, isLoading, error } = useSelector(state => state.currency);
  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);
  const getCurrencyName = (code) => {
     if (code === 840) return 'USD';
     if (code === 978) return 'EUR';
     return code;
  }
  return (
    <div className={styles.currencyWrapper}>
      {isLoading && !rates.length && <p>Loading currency...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {!isLoading && !error && rates.length > 0 && (
        <table className={styles.currencyTable}>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Purchase</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.currencyCodeA}>
                <td>{getCurrencyName(rate.currencyCodeA)}</td>
                <td>{rate.rateBuy?.toFixed(2) || '-'}</td>
                <td>{rate.rateSell?.toFixed(2) || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       {!isLoading && !error && !rates.length && <p>No currency data available.</p>}
    </div>
  );
};

export default Currency;
