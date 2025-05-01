import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { selectIsEditModalOpen } from '../../redux/modals/selectors';
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