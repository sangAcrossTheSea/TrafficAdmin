/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useParams } from "react-router-dom";

let INITIAL_LEAD_OBJ = {
  ArticleTitle: "",
};

function EditArticleModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  INITIAL_LEAD_OBJ = {
    ArticleTitle: extraObject.title,
  };

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { decreeId } = useParams();

  const EditDecree = async () => {
    setLoading(true);
    let newDecreeObj = {
      Id: extraObject.id,
      DecreeId: decreeId,
      ArticleTitle: leadObj.ArticleTitle,
    };
    try {
      const response = await axios.put(
        `/article/updateArticle/${extraObject.id}`,
        newDecreeObj
      );
      dispatch(showNotification({ message: "Sửa thành công!", status: 1 }));
      closeModal();
    } catch (error) {
      console.log("error", error);
      dispatch(showNotification({ message: "Sửa thất bại!", status: 0 }));
    }
    setLoading(false);
  };

  const saveNewLead = async () => {
    if (leadObj.ArticleTitle.trim() === "")
      return setErrorMessage("Phải có tên!");
    else {
      EditDecree();
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
        defaultValue={extraObject.title}
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

export default EditArticleModalBody;
