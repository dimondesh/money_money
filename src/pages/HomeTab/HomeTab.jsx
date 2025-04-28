
import Balance from '../../components/Balance/Balance.jsx';
import CreateButton from '../../components/CreateButton/CreateButton.jsx';
import TransactionsList from '../../components/TransactionsList/TransactionsList.jsx';
import css from './HomeTab.module.css';
import { getTransactions } from '../../redux/transactions/operations.js';
import { getTransactionsCategories } from '../../redux/statistics/operations.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useMedia } from '../../hooks/useMedia';

const HomeTab = () => {
    const { isMobile } = useMedia();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTransactionsCategories());
    }, [dispatch]);

    return (
        <div className={css.homeTab}>
            {isMobile && <Balance />}
            <TransactionsList />
            <CreateButton />
        </div>
    );
};

export default HomeTab;