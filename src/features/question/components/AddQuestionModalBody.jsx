/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import SelectBox from "../../../components/Input/SelectBox";
import { TrashIcon } from "@heroicons/react/24/outline";
import { addNewQuestion } from "../questionSlice";
import { openLoader } from "../../common/loaderSlice";

const INITIAL_LEAD_OBJ = {
  Id: "",
  LicenseTitleId: "",
  QuestionContent: "",
  QuestionMedia: "",
  Important: false,
  Explanation: "",
  License: "",
};

function AddQuestionModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [licenses, setLicenses] = useState([]);
  const [LicenseTitleId, setLicenseTitleId] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [deleteImage, setDeleteImage] = useState(false);

  const [licenseAndTitle, setLicenseAndTitle] = useState({
    License: "",
    LicenseTitleId: "",
  });

  useEffect(() => {
    const getLicenses = async () => {
      const response = await axios.get("/license/getAllLicenses");
      if (response.data) {
        const list = response.data.map((item) => ({
          value: item.Id,
          name: item.LicenseName,
        }));
        setLicenses(list);
        setLeadObj({ ...leadObj, License: licenses[0]?.Id });
        setLicenseAndTitle({ ...licenseAndTitle, License: licenses[0]?.Id });
      }
      return response.data[0].Id;
    };

    getLicenses().then((res) => getTitles(res));
  }, []);

  const getTitles = async (lId) => {
    const response = await axios.get(
      `/licenseTitle/getLicenseTitlesByLicenseId/${lId}`
    );
    console.log("responseTitle", response);
    if (response.data) {
      const list = response.data.map((item) => ({
        value: item.LicenseTitle.Id,
        name: item.Title.TitleName,
      }));
      setLicenseTitleId(list);
      setLeadObj({ ...leadObj, LicenseTitleId: LicenseTitleId[0]?.value });
      setLicenseAndTitle({
        ...licenseAndTitle,
        LicenseTitleId: LicenseTitleId[0]?.value,
      });
    }
  };

  useEffect(() => {
    if (leadObj.License) getTitles(leadObj.License);
  }, [leadObj.License]);

  // useEffect(() => {
  //   console.log("LicenseTitleId", LicenseTitleId);
  // }, [LicenseTitleId]);

  const handleFileChange = (event) => {
    setDeleteImage(false);
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

  const handleDelete = () => {
    setImageFile(null);
    setImageURL(null);
    setDeleteImage(true);
  };

  const uploadImage = async (questionId) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    const response2 = await axios.post(
      `/question/uploadQuestionMedia/${questionId}`,
      formData
    );
    console.log("response2", response2);
    return response2.data.imageURL;
  };

  const AddQuestion = async () => {
    setLoading(true);
    let newQuestionObj = {
      Id: "string",
      LicenseTitleId: leadObj.LicenseTitleId || LicenseTitleId[0]?.value,
      QuestionContent: leadObj.QuestionContent,
      QuestionMedia: "string",
      Important: leadObj.Important,
      Explanation: leadObj.Explanation,
    };

    console.table(newQuestionObj);

    const response = await axios.post(
      "/question/createQuestion",
      newQuestionObj
    );
    if (response.data) {
      let newSignObj = newQuestionObj;
      const questionId = response.data.questionId;
      let response2;
      if (imageFile) {
        const imgURL = await uploadImage(questionId);
        response2 = imgURL;
      }

      newSignObj = {
        ...newSignObj,
        Id: questionId,
        QuestionMedia: response2,
      };

      closeModal();

      setTimeout(() => {
        window.location.reload();
      }, 500);
      // dispatch(addNewQuestion(newSignObj));
      window.location.reload();
      dispatch(
        showNotification({ message: "Thêm mới thành công!", status: 1 })
      );
      setLoading(false);
    } else {
      dispatch(showNotification({ message: "Thêm mới thất bại!", status: 0 }));
    }
    // closeModal();
    setLoading(false);
  };

  const saveNewLead = async () => {
    if (leadObj.QuestionContent.trim() === "")
      return setErrorMessage("Phải có tên!");
    else if (leadObj.Explanation.trim() === "")
      return setErrorMessage("Phải có giải thích!");
    else {
      AddQuestion();
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
        defaultValue={leadObj.QuestionContent}
        updateType="QuestionContent"
        containerStyle="mt-4"
        labelTitle="Nội dung câu hỏi"
        updateFormValue={updateFormValue}
      />

      <div className="flex flex-row gap-2">
        <SelectBox
          type="text"
          // defaultValue={signTypes[0] || ""}
          placeholder="Chọn loại bằng lái"
          options={licenses}
          updateType="License"
          containerStyle="mt-4"
          labelTitle="Loại bằng lái"
          updateFormValue={updateFormValue}
        />
        <div className="w-full">
          {licenses && (
            <SelectBox
              type="text"
              // defaultValue={LicenseTitleId[0] || ""}
              placeholder="Chọn loại câu hỏi"
              options={LicenseTitleId}
              updateType="LicenseTitleId"
              containerStyle="mt-4"
              labelTitle="Loại câu hỏi"
              updateFormValue={updateFormValue}
            />
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="label text-sm ">Ảnh</label>
        <div className="flex gap-2">
          <input
            type="file"
            className="file-input w-full max-w-xs"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button className="btn btn-ghost" onClick={() => handleDelete()}>
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
        </div>
        {imageURL && (
          <img
            src={imageURL}
            alt="Preview"
            className="mt-4 object-cover w-48 h-48"
          />
        )}
      </div>

      <InputText
        type="text"
        defaultValue={leadObj.Explanation}
        updateType="Explanation"
        containerStyle="mt-4"
        labelTitle="Giải thích"
        updateFormValue={updateFormValue}
      />

      <div className={`form-control w-[100px]`}>
        <label className="label">
          <span className={"label-text text-base-content "}>Điểm liệt</span>
          <input
            type={"checkbox"}
            // checked={leadObj.Important}
            value={leadObj.Important}
            className="checkbox"
            onClick={(e) =>
              setLeadObj({ ...leadObj, Important: e.target.checked })
            }
          />
        </label>
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

export default AddQuestionModalBody;
