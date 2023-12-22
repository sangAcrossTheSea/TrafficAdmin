/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";

const INITIAL_LEAD_OBJ = {
  DecreeName: "",
  DecreeNumber: "",
};

function AddDecreeModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.DecreeName.trim() === "")
      return setErrorMessage("Phải có tên!");
    else if (leadObj.DecreeNumber.trim() === "")
      return setErrorMessage("Phải có số hiệu nghị định!");
    else {
      setLoading(true);
      const date = new Date();
      let newDecreeObj = {
        Id: "string",
        DecreeName: leadObj.DecreeName,
        DecreeDate: date.toISOString(),
        DecreeNumber: leadObj.DecreeNumber,
      };
      const response = await axios.post("/decree/createDecree", newDecreeObj);
      console.log("response", response);
      // dispatch(addNewDecree({ newDecreeObj }));
      window.location.reload();
      dispatch(showNotification({ message: "New Decree Added!", status: 1 }));
      closeModal();
      setLoading(false);
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
        defaultValue={leadObj.DecreeName}
        updateType="DecreeName"
        containerStyle="mt-4"
        labelTitle="Tên nghị định"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.DecreeNumber}
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

export default AddDecreeModalBody;
