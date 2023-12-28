/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { CONFIRMATION_MODAL_CLOSE_TYPES } from "../../../utils/globalConstantUtil";
import axios from "axios";
import { showNotification } from "../headerSlice";
import { deleteDecree } from "../../decree/decreeSlice";
import { deleteFineType } from "../../fineType/fineTypeSlice";
import { deleteNew } from "../../new/newSlice";
import { deleteSignType } from "../../signType/signTypeSlice";
import { deleteSign } from "../../sign/signSlice";
import { deleteExam } from "../../exam/examSlice";
import { deleteQuestion } from "../../question/questionSlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const { message, type, _id, index } = extraObject;

  const proceedWithYes = async () => {
    if (type) {
      let response;
      if (type === CONFIRMATION_MODAL_CLOSE_TYPES.DECREE_DELETE) {
        response = await axios.delete(`/decree/deleteDecree/${_id}`);
      } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.ARTICLE_DELETE) {
        response = await axios.delete(`/article/deleteArticle/${_id}`);
      } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CLAUSE_DELETE) {
        response = await axios.delete(`/clause/deleteClause/${_id}`);
      } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.FINE_TYPE_DELETE) {
        response = await axios.delete(
          `/trafficFineType/deleteTrafficFineType/${_id}`
        );
      } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.NEW_DELETE) {
        response = await axios.delete(`/news/deleteNews/${_id}`);
      } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.SIGN_TYPE_DELETE) {
        response = await axios.delete(
          `/trafficSignType/deleteTrafficSignType/${_id}`
        );
      } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.SIGN_DELETE) {
        response = await axios.delete(`/trafficSign/deleteTrafficSign/${_id}`);
      } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.EXAM_DELETE) {
        response = await axios.delete(`/examination/deleteExamination/${_id}`);
      } else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.QUESTION_DELETE) {
        response = await axios.delete(`/question/deleteQuestion/${_id}`);
      }

      if (response.data) {
        // window.location.reload();
        dispatch(showNotification({ message: "Xoá thành công!", status: 1 }));
        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.DECREE_DELETE)
          dispatch(deleteDecree(index));
        else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.FINE_TYPE_DELETE)
          dispatch(deleteFineType(index));
        // else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.ARTICLE_DELETE)
        //   dispatch(deleteFineType(index));
        // else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CLAUSE_DELETE)
        //   dispatch(deleteFineType(index));
        else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.NEW_DELETE)
          dispatch(deleteNew(index));
        else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.SIGN_TYPE_DELETE)
          dispatch(deleteSignType(index));
        else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.SIGN_DELETE)
          dispatch(deleteSign(index));
        else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.EXAM_DELETE)
          dispatch(deleteExam(index));
        else if (type === CONFIRMATION_MODAL_CLOSE_TYPES.QUESTION_DELETE)
          dispatch(deleteQuestion(index));
      } else {
        dispatch(showNotification({ message: "Xoá thất bại!", status: 0 }));
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
          Xoá
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
