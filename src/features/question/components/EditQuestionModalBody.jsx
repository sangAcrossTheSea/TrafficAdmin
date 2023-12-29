/* eslint-disable react/prop-types */
import { useState, useEffect, useDebugValue } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import SelectBox from "../../../components/Input/SelectBox";
import EditAnswerBody from "./EditAnswerBody";
import { TrashIcon } from "@heroicons/react/24/outline";
import { openLoader } from "../../common/loaderSlice";
import { updateQuestion } from "../questionSlice";

// l.Question.Id,
//   l.Question.LicenseTitleId,
//   l.Question.QuestionContent,
//   l.Question.QuestionMedia,
//   l.Question.Important,
//   l.Question.Explanation,
//   l.License.Id,

let INITIAL_LEAD_OBJ = {
  Id: "",
  LicenseTitleId: "",
  QuestionContent: "",
  QuestionMedia: "",
  Important: false,
  Explanation: "",
  LicenseId: "",
};

function AddQuestionModalBody({ closeModal, extraObject }) {
  // INITIAL_LEAD_OBJ = {
  //   Id: extraObject.Id,
  //   LicenseTitleId: extraObject.LicenseTitleId,
  //   QuestionContent: extraObject.QuestionContent,
  //   QuestionMedia: extraObject.QuestionMedia,
  //   Important: extraObject.Important,
  //   Explanation: extraObject.Explanation,
  //   LicenseId: extraObject.LicenseId,
  // };

  const dispatch = useDispatch();
  const extraQuestion = extraObject.infor.Question;
  const extraLicense = extraObject.infor.LicenseId;
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState({
    Id: extraQuestion.Id,
    LicenseTitleId: extraQuestion.LicenseTitleId,
    QuestionContent: extraQuestion.QuestionContent,
    QuestionMedia: extraQuestion.QuestionMedia,
    Important: extraQuestion.Important,
    Explanation: extraQuestion.Explanation,
    LicenseId: extraLicense,
  });

  const [licenses, setLicenses] = useState([]);
  const [LicenseTitleId, setLicenseTitleId] = useState([]);
  const [imageURL, setImageURL] = useState(extraQuestion.QuestionMedia);
  const [imageFile, setImageFile] = useState(null);
  const [refreshPoint, setRefreshPoint] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  const [answers, setAnswers] = useState([]);

  const [licenseAndTitle, setLicenseAndTitle] = useState({
    License: "",
    LicenseTitleId: "",
  });

  useEffect(() => {
    setLeadObj({ ...leadObj, Important: extraQuestion.Important });
  }, [extraQuestion.Important]);

  useEffect(() => {
    console.log("leadObj.Important", leadObj.Important);
  }, [leadObj.Important]);

  useEffect(() => {
    const getAnswers = async () => {
      const res = await axios.get(
        `/question/getAllAnswers/${extraQuestion.Id}`
      );
      const dataRes = res.data;
      setAnswers(dataRes);
    };
    getAnswers();
  }, [refreshPoint]);

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
  }, [refreshPoint]);

  const getTitles = async (lId) => {
    const response = await axios.get(
      `/licenseTitle/getLicenseTitlesByLicenseId/${lId}`
    );
    // console.log("responseTitle", response);
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
    if (leadObj.LicenseId) getTitles(leadObj.LicenseId);
  }, [leadObj.LicenseId]);

  // useEffect(() => {
  //   console.log("LicenseTitleId", LicenseTitleId);
  // }, [LicenseTitleId]);

  const handleFileChange = (event) => {
    setDeleteImage(false);
    const file = event.target.files?.[0];

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
    setDeleteImage(true);
    setImageFile(null);
    setImageURL(null);
  };

  const uploadImage = async (questionId) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    const response2 = await axios.post(
      `/question/uploadQuestionMedia/${questionId}`,
      formData
    );
    // console.log("response2", response2);
    return response2.data.imageURL;
  };

  const AddQuestion = async () => {
    setLoading(true);
    let newQuestionObj = {
      Id: extraQuestion.Id,
      LicenseTitleId: leadObj.LicenseTitleId || LicenseTitleId[0]?.value,
      QuestionContent: leadObj.QuestionContent,
      QuestionMedia: deleteImage ? "string" : leadObj.QuestionMedia,
      Important: leadObj.Important,
      Explanation: leadObj.Explanation,
    };

    console.table(newQuestionObj);

    const response = await axios.put(
      `/question/updateQuestion/${extraQuestion.Id}`,
      newQuestionObj
    );
    if (response) {
      let newSignObj = extraObject.infor;
      const questionId = extraQuestion.Id;

      let response2 = leadObj.QuestionMedia;
      if (imageFile !== null) {
        const imgURL = await uploadImage(questionId);
        response2 = imgURL;
      }

      newSignObj = {
        ...newSignObj,
        Question: {
          ...newSignObj.Question,
          LicenseTitleId: leadObj.LicenseTitleId || LicenseTitleId[0]?.value,
          QuestionContent: leadObj.QuestionContent,
          QuestionMedia: response2,
          Important: leadObj.Important,
          Explanation: leadObj.Explanation,
        },
      };
      closeModal();

      dispatch(
        updateQuestion({ index: extraObject.index, newLeadObj: newSignObj })
      );

      dispatch(showNotification({ message: "Sửa thành công!", status: 1 }));
      setLoading(false);
    } else {
      dispatch(showNotification({ message: "Sửa thất bại!", status: 0 }));
    }
    closeModal();
    setLoading(false);
  };

  const saveNewLead = async () => {
    if (leadObj.QuestionContent.trim() === "")
      return setErrorMessage("Phải có tên!");
    // else if (imageFile === null) return setErrorMessage("Phải có ảnh");
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
        defaultValue={extraQuestion.QuestionContent}
        updateType="QuestionContent"
        containerStyle="mt-4"
        labelTitle="Nội dung câu hỏi"
        updateFormValue={updateFormValue}
      />

      <div className="flex flex-row gap-2">
        <SelectBox
          type="text"
          defaultValue={extraQuestion.LicenseId}
          placeholder="Chọn loại bằng lái"
          options={licenses}
          updateType="LicenseId"
          containerStyle="mt-4"
          labelTitle="Loại bằng lái"
          updateFormValue={updateFormValue}
        />
        <div className="w-full">
          {licenses && (
            <SelectBox
              type="text"
              defaultValue={extraQuestion.LicenseTitleId}
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
        {imageURL && imageURL !== "string" && (
          <img
            src={imageURL}
            alt="Preview"
            className="mt-4 object-cover w-48 h-48"
          />
        )}
      </div>

      <InputText
        type="text"
        defaultValue={extraQuestion.Explanation}
        updateType="Explanation"
        containerStyle="mt-4"
        labelTitle="Giải thích"
        updateFormValue={updateFormValue}
      />

      <div className={`form-control w-[100px]`}>
        <label className="label">
          <span className={"label-text text-base-content "}>Điểm liệt</span>
          <input
            type="checkbox"
            defaultChecked={leadObj.Important}
            value={leadObj.Important}
            className="checkbox"
            onClick={(e) =>
              setLeadObj({ ...leadObj, Important: e.target.checked })
            }
          />
        </label>
      </div>

      <div>
        <EditAnswerBody
          questionId={extraObject.infor.Question.Id}
          answers={answers}
          setRefreshPoint={setRefreshPoint}
        />
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
