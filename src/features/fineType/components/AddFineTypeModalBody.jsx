/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewFineType, getFineTypesContent } from "../fineTypeSlice";
import axios from "axios";

const INITIAL_LEAD_OBJ = {
  FineType: "",
};

function AddFineTypeModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const AddFineType = async () => {
    setLoading(true);
    const newFineTypeObj = {
      Id: "string",
      FineType: leadObj.FineType,
    };
    const response = await axios.post(
      "/trafficFineType/createTrafficFineType",
      newFineTypeObj
    );
    console.log("response", response);
    closeModal();

    if (response.data) {
      dispatch(addNewFineType(newFineTypeObj));
      dispatch(getFineTypesContent());
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
    if (leadObj.FineType.trim() === "") return setErrorMessage("Phải có tên!");
    else {
      AddFineType();
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
        defaultValue={leadObj.FineType}
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

export default AddFineTypeModalBody;
