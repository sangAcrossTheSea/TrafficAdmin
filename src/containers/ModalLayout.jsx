import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import AddDecreeModalBody from "../features/decree/components/AddDecreeModalBody";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import EditDecreeModalBody from "../features/decree/components/EditDecreeModalBody";
import AddArticleModalBody from "../features/article/components/AddArticleModalBody";
import EditArticleModalBody from "../features/article/components/EditArticleModalBody";
import AddClauseModalBody from "../features/articleDetail/components/AddClauseModalBody";
import EditClauseModalBody from "../features/articleDetail/components/EditClauseModalBody";
import AddFineTypeModalBody from "../features/fineType/components/AddFineTypeModalBody";
import AddQuestionModalBody from "../features/question/components/AddQuestionModalBody";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.DECREE_ADD_NEW]: (
                <AddDecreeModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.DECREE_EDIT]: (
                <EditDecreeModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.ARTICLE_ADD_NEW]: (
                <AddArticleModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.ARTICLE_EDIT]: (
                <EditArticleModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.CLAUSE_ADD_NEW]: (
                <AddClauseModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.CLAUSE_EDIT]: (
                <EditClauseModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.FINE_TYPE_ADD_NEW]: (
                <AddFineTypeModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.QUESTION_ADD_NEW]: (
                <AddQuestionModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),

              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),

              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
