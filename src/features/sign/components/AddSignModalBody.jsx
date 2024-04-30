/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SelectBox from "../../../components/Input/SelectBox";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewSign } from "../signSlice";
import axios from "axios";
import newSlice from "../../new/newSlice";

const INITIAL_LEAD_OBJ = {
  Id: "",
  SignName: "",
  SignTypeId: "6551aab56d606f4ee5d4d93d",
  SignImage: "",
  SignExplanation: "",
};

function AddSignModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [signTypes, setSignTypes] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const getSignTypes = async () => {
      const response = await axios.get(
        "/trafficSignType/getAllTrafficSignTypes"
      );
      console.log("response", response);
      if (response.data) {
        const list = response.data.map((signType) => ({
          value: signType.Id,
          name: signType.SignType,
        }));
        setSignTypes(list);
      }
      console.log("signTypes", signTypes);
    };

    getSignTypes();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    //check if file is not image
    if (file && file.type.split("/")[0] !== "image") {
      //clear file input
      event.target.value = null;

      dispatch(
        showNotification({
          message: "File không hợp lệ!",
          status: 0,
        })
      );
      return;
    }

    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (trafficSignId) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    const response2 = await axios.post(
      `/trafficSign/uploadTrafficSignImage/${trafficSignId}`,
      formData
    );
    console.log("response2", response2);
    return response2.data.imageURL;
  };

  const AddSign = async () => {
    setLoading(true);
    let newSignObj = {
      ...leadObj,
    };

    const response = await axios.post(
      "/trafficSign/createTrafficSign",
      newSignObj
    );
    console.log("response", response);
    closeModal();

    if (response.data) {
      const trafficSignId = response.data.trafficSignId;

      const imgURL = await uploadImage(trafficSignId);
      const response2 = imgURL;

      newSignObj = {
        ...newSignObj,
        Id: trafficSignId,
        SignImage: response2,
      };
      dispatch(addNewSign({ newLeadObj: newSignObj }));
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
    if (leadObj.SignName.trim() === "") return setErrorMessage("Phải có tên!");
    else if (leadObj.SignExplanation.trim() === "")
      return setErrorMessage("Phải có mô tả!");
    else if (imageFile === null) return setErrorMessage("Phải có ảnh!");
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
        defaultValue={leadObj.SignName}
        updateType="SignName"
        containerStyle="mt-4"
        labelTitle="Tên biển báo"
        updateFormValue={updateFormValue}
      />

      <SelectBox
        type="text"
        // defaultValue={signTypes[0] || ""}
        placeholder="Chọn loại biển báo"
        options={signTypes}
        updateType="SignTypeId"
        containerStyle="mt-4"
        labelTitle="Loại biển báo"
        updateFormValue={updateFormValue}
      />
      <div></div>

      <div className="mt-4">
        <label className="label text-sm ">Ảnh</label>
        <input
          type="file"
          className="file-input w-full max-w-xs"
          accept="image/*"
          onChange={handleFileChange}
        />
        {imageURL && (
          <img
            src={imageURL}
            alt="Preview"
            className="mt-4 object-cover w-48 h-48"
          />
        )}
      </div>

      <div className="mt-4">
        <label className="label text-sm ">Mô tả</label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Nội dung"
          value={leadObj.SignExplanation}
          onChange={(e) =>
            setLeadObj({ ...leadObj, SignExplanation: e.target.value })
          }
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

export default AddSignModalBody;
