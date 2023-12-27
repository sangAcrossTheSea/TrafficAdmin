/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import SelectBox from "../../../components/Input/SelectBox";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewExam, getExaminationsContent } from "../examSlice";
import axios from "axios";

const INITIAL_LEAD_OBJ = {
  ExaminationName: "",
  LicenseId: "",
};

function AddExaminationModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [licenses, setLicenses] = useState([]);
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  useEffect(() => {
    const getLicenses = async () => {
      const response = await axios.get("/license/getAllLicenses");
      if (response.data) {
        const list = response.data.map((item) => ({
          value: item.Id,
          name: item.LicenseName,
        }));
        setLicenses(list);
        setLeadObj({ ...leadObj, LicenseId: licenses[0]?.Id });
      }
      return response.data[0].Id;
    };

    getLicenses();
  }, []);

  const AddExamination = async () => {
    setLoading(true);
    const date = new Date();
    const newExaminationObj = {
      Id: "string",
      ExaminationName: leadObj.ExaminationName,
      LicenseId: leadObj.LicenseId || licenses[0]?.value,
    };
    const response = await axios.post(
      "/examination/createExamination",
      newExaminationObj
    );
    console.log("response", response);

    if (response.data) {
      const newObj = {
        ...leadObj,
        LicenseId: leadObj.LicenseId || licenses[0]?.value,
        Id: response.data.examinationId,
      };
      console.log("newObj", newObj);
      dispatch(addNewExam(newObj));

      dispatch(
        showNotification({ message: "Thêm mới thành công!", status: 1 })
      );
      setLoading(false);
    } else {
      dispatch(showNotification({ message: "Thêm mới thất bại!", status: 0 }));
    }
    closeModal();
  };

  const saveNewLead = async () => {
    if (leadObj.ExaminationName.trim() === "")
      return setErrorMessage("Phải có tên!");
    else {
      AddExamination();
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
        defaultValue={leadObj.ExaminationName}
        updateType="ExaminationName"
        containerStyle="mt-4"
        labelTitle="Tên bài thi"
        updateFormValue={updateFormValue}
      />

      <SelectBox
        type="text"
        // defaultValue={signTypes[0] || ""}
        placeholder="Chọn loại bằng lái"
        options={licenses}
        updateType="LicenseId"
        containerStyle="mt-4"
        labelTitle="Loại bằng lái"
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

export default AddExaminationModalBody;
