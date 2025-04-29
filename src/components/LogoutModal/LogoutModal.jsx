import { useDispatch, useSelector } from "react-redux";
import { selectIsLogOutModalOpen } from "redux/modal/selectors";

export const logOutModal = () => {
  const dispatch = useDispatch();
  const isLogOutModalOpen = useSelector(selectIsLogOutModalOpen);

  return (
    <ModalWrapper isOpenModal={isLogOutModalOpen}>
      <div className="customModalSize">
        <div className={s.logo}>
          <Logo type="modal" />
        </div>
        <p className={s.text}>Are you sure you want to log out?</p>
        <div className={s.buttons}>
          <FormButton
            type={"button"}
            text={"Logout"}
            variant={"multiColorButton"}
            handlerFunction={() => dispatch(logoutThunk())}
          />
          <FormButton
            type={"button"}
            text={"cancel"}
            variant={"whiteButton"}
            handlerFunction={() => dispatch(closeModal())}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
