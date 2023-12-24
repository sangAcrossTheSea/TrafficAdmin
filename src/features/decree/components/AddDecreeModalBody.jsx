/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewDecree } from "../decreeSlice";
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

  const AddDecree = async () => {
    setLoading(true);
    const date = new Date();
    const newDecreeObj = {
      Id: "string",
      DecreeName: leadObj.DecreeName,
      DecreeDate: date.toISOString(),
      DecreeNumber: leadObj.DecreeNumber,
    };
    const response = await axios.post("/decree/createDecree", newDecreeObj);
    console.log("response", response);
    closeModal();

    if (response.data) {
      dispatch(addNewDecree(newDecreeObj));
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
    if (leadObj.DecreeName.trim() === "")
      return setErrorMessage("Phải có tên!");
    else if (leadObj.DecreeNumber.trim() === "")
      return setErrorMessage("Phải có số hiệu nghị định!");
    else {
      AddDecree();
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
          Huỷ
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Lưu
        </button>
      </div>
    </>
  );
}

export default AddDecreeModalBody;
