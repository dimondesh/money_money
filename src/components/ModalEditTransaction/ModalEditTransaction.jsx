import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';
import { useSelector } from 'react-redux';

const ModalEditTransaction = () => {
    const isEditModalOpen = useSelector(selectIsEditModalOpen);
    return (
        <ModalWrapper isOpenModal={isEditModalOpen}>
            <EditTransactionForm />
        </ModalWrapper>
    );
};
export default ModalEditTransaction;