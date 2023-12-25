/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewSignType, getSignTypesContent } from "../signTypeSlice";
import axios from "axios";

const INITIAL_LEAD_OBJ = {
  signType: "",
};

function AddSignTypeModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const AddSignType = async () => {
    setLoading(true);
    const newSignTypeObj = {
      Id: "string",
      SignType: leadObj.signType,
    };
    const response = await axios.post(
      "/trafficSignType/createTrafficSignType",
      newSignTypeObj
    );
    console.log("response", response);
    closeModal();

    if (response.data) {
      dispatch(addNewSignType(newSignTypeObj));
      dispatch(getSignTypesContent());
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
    if (leadObj.signType.trim() === "") return setErrorMessage("Phải có tên!");
    else {
      AddSignType();
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
        defaultValue={leadObj.signType}
        updateType="signType"
        containerStyle="mt-4"
        labelTitle="Tên loại biển báo"
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

export default AddSignTypeModalBody;
