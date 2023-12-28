/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { ARCHIVE_MODAL_CLOSE_TYPES } from "../../../utils/globalConstantUtil";
import axios from "axios";
import { showNotification } from "../headerSlice";
import { updateNewStatus } from "../../new/newSlice";
import { updateUserActive } from "../../account/accountSlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const { message, type, _id, index, status } = extraObject;

  const proceedWithYes = async () => {
    if (type) {
      let response;
      if (type === ARCHIVE_MODAL_CLOSE_TYPES.NEW_ARCHIVE) {
        response = await axios.put(`/news/hideOrUnhideNews/${_id}`);
      } else if (type === ARCHIVE_MODAL_CLOSE_TYPES.USER_ARCHIVE) {
        response = await axios.put(`/user/activeOrInactiveUser/${_id}`);
      }

      if (response.data) {
        // window.location.reload();
        if (type === ARCHIVE_MODAL_CLOSE_TYPES.NEW_ARCHIVE) {
          dispatch(updateNewStatus({ index: index, IsHidden: !status }));
          dispatch(
            showNotification({ message: "Lưu trữ thành công!", status: 1 })
          );
        } else if (type === ARCHIVE_MODAL_CLOSE_TYPES.USER_ARCHIVE) {
          dispatch(updateUserActive({ index: index, IsActive: !status }));
          dispatch(
            showNotification({ message: "Cập nhật thành công!", status: 1 })
          );
        }
      } else {
        dispatch(showNotification({ message: "Lưu trữ thất bại!", status: 0 }));
      }
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Huỷ
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Lưu trữ
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
