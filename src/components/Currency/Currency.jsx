import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Currency.module.css';
import { selectCurrencyRates } from '../../redux/currency/selectors';

const Currency = () => {
  const rates = useSelector(selectCurrencyRates);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Currency</h2>
      <ul className={styles.list}>
        {rates.map(({ ccy, base_ccy, buy, sale }) => (
          <li key={ccy} className={styles.item}>
            <span>{ccy}/{base_ccy}</span>
            <span>Buy: {Number(buy).toFixed(2)}</span>
            <span>Sell: {Number(sale).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Currency;
// Compare this snippet from src/redux/currency/selectors.js: