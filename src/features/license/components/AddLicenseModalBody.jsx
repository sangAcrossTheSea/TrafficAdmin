/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLicense, getLicensesContent } from "../licenseSlice";
import axios from "axios";

const INITIAL_LEAD_OBJ = {
  LicenseName: "",
};

function AddLicenseModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const AddLicense = async () => {
    setLoading(true);
    const newLicenseObj = {
      Id: "string",
      LicenseName: leadObj.LicenseName,
    };
    const response = await axios.post("/license/createLicense", newLicenseObj);
    console.log("response", response);
    closeModal();

    if (response.data) {
      const newObj = {
        Id: response.data.licenseId,
        LicenseName: leadObj.LicenseName,
      };
      dispatch(addNewLicense(newObj));
      dispatch(getLicensesContent());
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
    if (leadObj.LicenseName.trim() === "")
      return setErrorMessage("Phải có tên!");
    else {
      AddLicense();
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
        defaultValue={leadObj.LicenseName}
        updateType="LicenseName"
        containerStyle="mt-4"
        labelTitle="Tên loại bằng lái"
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

export default AddLicenseModalBody;
