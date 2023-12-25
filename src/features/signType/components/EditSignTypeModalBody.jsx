/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { updateSignType } from "../signTypeSlice";
import axios from "axios";

let INITIAL_LEAD_OBJ = {
  FineType: "",
};

function EditFineTypeModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  INITIAL_LEAD_OBJ = {
    FineType: extraObject.name,
  };

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const EditDecree = async () => {
    setLoading(true);
    let newDecreeObj = {
      Id: extraObject.id,
      FineType: leadObj.FineType,
    };
    try {
      const response = await axios.put(
        `/trafficFineType/updateTrafficFineType/${extraObject.id}`,
        newDecreeObj
      );
      console.log("response", response);
      dispatch(
        updateSignType({ index: extraObject.index, newLeadObj: newDecreeObj })
      );
      // window.location.reload();
      dispatch(showNotification({ message: "Sửa thành công!", status: 1 }));
      closeModal();
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      dispatch(showNotification({ message: "Sửa thất bại!", status: 0 }));
    }
  };

  const saveNewLead = async () => {
    if (leadObj.FineType.trim() === "") return setErrorMessage("Phải có tên!");
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
        defaultValue={extraObject.name}
        updateType="FineType"
        containerStyle="mt-4"
        labelTitle="Tên loại mức phạt"
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

export default EditFineTypeModalBody;
