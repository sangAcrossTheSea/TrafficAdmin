/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewSign } from "../signSlice";
import axios from "axios";

const INITIAL_LEAD_OBJ = {
  Id: "",
  SignName: "",
  SignTypeId: "",
  SignImage: "",
  SignExplanation: "",
};

function AddSignModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const AddSign = async () => {
    setLoading(true);
    const newSignObj = {
      Id: "string",
      Sign: leadObj.Sign,
    };
    const response = await axios.post(
      "/trafficSign/createTrafficSign",
      newSignObj
    );
    console.log("response", response);
    closeModal();

    if (response.data) {
      dispatch(addNewSign(newSignObj));
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
    if (leadObj.Sign.trim() === "") return setErrorMessage("Phải có tên!");
    else {
      AddSign();
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
        defaultValue={leadObj.Sign}
        updateType="Sign"
        containerStyle="mt-4"
        labelTitle="Tên xử phạt"
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

export default AddSignModalBody;
