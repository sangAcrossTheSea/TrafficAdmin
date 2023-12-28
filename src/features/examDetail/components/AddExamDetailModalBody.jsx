/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useParams } from "react-router-dom";

const INITIAL_LEAD_OBJ = {
  ArticleTitle: "",
};

function AddArticleModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const { decreeId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const AddArticle = async () => {
    setLoading(true);
    const date = new Date();
    const newArticleObject = {
      Id: "string",
      DecreeId: decreeId,
      ArticleTitle: leadObj.ArticleTitle,
    };
    const response = await axios.post(
      "/article/createArticle",
      newArticleObject
    );
    console.log("response", response);
    closeModal();

    if (response.data) {
      // window.location.reload();
      dispatch(
        showNotification({ message: "Thêm mới thành công!", status: 1 })
      );
      setLoading(false);
    } else {
      dispatch(showNotification({ message: "Thêm mới thất bại!", status: 0 }));
    }
  };

  const saveNewLead = async () => {
    if (leadObj.ArticleTitle.trim() === "")
      return setErrorMessage("Phải có tên!");
    else {
      AddArticle();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={leadObj.ArticleTitle}
        updateType="ArticleTitle"
        containerStyle="mt-4"
        labelTitle="Tên điều luật"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Huỷ
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Lưu
        </button>
      </div>
    </>
  );
}

export default AddArticleModalBody;
