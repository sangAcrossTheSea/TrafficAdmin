/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { updateDecree } from "../decreeSlice";
import axios from "axios";

let INITIAL_LEAD_OBJ = {
  DecreeName: "",
  DecreeNumber: "",
};

function EditDecreeModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  INITIAL_LEAD_OBJ = {
    DecreeName: extraObject.name,
    DecreeNumber: extraObject.number,
  };

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const EditDecree = async () => {
    setLoading(true);
    const date = new Date();
    let newDecreeObj = {
      Id: extraObject.id,
      DecreeName: leadObj.DecreeName,
      DecreeDate: date.toISOString(),
      DecreeNumber: leadObj.DecreeNumber,
    };
    try {
      const response = await axios.put(
        `/decree/updateDecree/${extraObject.id}`,
        newDecreeObj
      );
      console.log("response", response);
      dispatch(
        updateDecree({ index: extraObject.index, newLeadObj: newDecreeObj })
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
    if (leadObj.DecreeName.trim() === "")
      return setErrorMessage("Phải có tên!");
    else if (leadObj.DecreeNumber.trim() === "")
      return setErrorMessage("Phải có số hiệu nghị định!");
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
        updateType="DecreeName"
        containerStyle="mt-4"
        labelTitle="Tên nghị định"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={extraObject.number}
        updateType="DecreeNumber"
        containerStyle="mt-4"
        labelTitle="Số hiệu nghị định"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Save
        </button>
      </div>
    </>
  );
}

export default EditDecreeModalBody;
