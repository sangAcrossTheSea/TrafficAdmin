/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import SelectBox from "../../../components/Input/SelectBox";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewFine } from "../fineSlice";
import axios from "axios";

// {
//   "Id": "string",
//   "FineName": "string",
//   "FineId": "string",
//   "VehicleType": "string",
//   "FineBehavior": "string",
//   "FineContent": "string",
//   "FineAdditional": "string",
//   "FineNote": "string"
// }

const INITIAL_LEAD_OBJ = {
  Id: "string",
  FineName: "",
  FineTypeId: "",
  VehicleType: "",
  FineBehavior: "",
  FineContent: "",
  FineAdditional: "",
  FineNote: "",
};

function AddFineModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [fineTypes, setFineTypes] = useState([]);

  useEffect(() => {
    const getFineTypes = async () => {
      const response = await axios.get(
        "/trafficFineType/getAllTrafficFineTypes"
      );
      console.log("response", response);
      if (response.data) {
        const list = response.data.map((fineType) => ({
          value: fineType.Id,
          name: fineType.FineType,
        }));
        setFineTypes(list);
      }
      console.log("fineTypes", fineTypes);
    };

    getFineTypes();
  }, []);

  const AddFine = async () => {
    setLoading(true);
    const newFineObj = {
      Id: "string",
      FineName: leadObj.FineName,
      FineTypeId: leadObj.FineTypeId || fineTypes[0].value,
      VehicleType: leadObj.VehicleType || "motorbike",
      FineBehavior: leadObj.FineBehavior,
      FineContent: leadObj.FineContent,
      FineAdditional: leadObj.FineAdditional,
      FineNote: leadObj.FineNote,
    };
    const response = await axios.post(
      "/trafficFine/createTrafficFine",
      newFineObj
    );
    console.log("response", response);
    closeModal();

    if (response.data) {
      dispatch(addNewFine(newFineObj));
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
    if (leadObj.FineName.trim() === "") return setErrorMessage("Phải có tên!");
    // if (leadObj.FineTypeId.trim() === "")
    //   return setErrorMessage("Phải có loại mức phạt!");
    // if (leadObj.VehicleType.trim() === "")
    //   return setErrorMessage("Phải có phương tiện!");
    if (leadObj.FineBehavior.trim() === "")
      return setErrorMessage("Phải có hành vi vi phạm!");
    if (leadObj.FineContent.trim() === "")
      return setErrorMessage("Phải có nội dung!");
    // if (leadObj.FineAdditional.trim() === "")
    //   return setErrorMessage("Phải có thông tin thêm!");
    // if (leadObj.FineNote.trim() === "")
    //   return setErrorMessage("Phải có ghi chú!");
    else {
      AddFine();
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
        defaultValue={leadObj.FineName}
        updateType="FineName"
        containerStyle="mt-4"
        labelTitle="Tên mức phạt"
        updateFormValue={updateFormValue}
      />
      <SelectBox
        type="text"
        defaultValue={fineTypes[0]}
        options={fineTypes}
        updateType="FineTypeId"
        containerStyle="mt-4"
        labelTitle="Loại mức phạt"
        updateFormValue={updateFormValue}
      />
      <div></div>
      <SelectBox
        type="text"
        defaultValue={[{ value: "motorbike", name: "Xe máy" }]}
        options={[
          { value: "motorbike", name: "Xe máy" },
          { value: "car", name: "Ô tô" },
          { value: "other", name: "Khác" },
        ]}
        updateType="VehicleType"
        containerStyle="mt-4"
        labelTitle="Phương tiện"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.FineBehavior}
        updateType="FineBehavior"
        containerStyle="mt-4"
        labelTitle="Hành vi vi phạm"
        updateFormValue={updateFormValue}
      />

      <div className="mt-4">
        <label className="label">
          <span className={"label-text text-base-content "}>Nội dung</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Nội dung"
          value={leadObj.FineContent}
          onChange={(e) =>
            setLeadObj({ ...leadObj, FineContent: e.target.value })
          }
        ></textarea>
      </div>

      <div className="mt-4">
        <label className="label">
          <span className={"label-text text-base-content "}>
            Mức phạt bổ sung
          </span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Thêm"
          value={leadObj.FineAdditional}
          onChange={(e) =>
            setLeadObj({ ...leadObj, FineAdditional: e.target.value })
          }
        ></textarea>
      </div>
      <div className="mt-3">
        <label className="label">
          <span className={"label-text text-base-content "}>Ghi chú</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Ghi chú"
          value={leadObj.FineNote}
          onChange={(e) => setLeadObj({ ...leadObj, FineNote: e.target.value })}
        ></textarea>
      </div>

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

export default AddFineModalBody;
