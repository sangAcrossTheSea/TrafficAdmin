/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useParams } from "react-router-dom";

const INITIAL_LEAD_OBJ = {
  ArticleTitle: "",
};

function AddArticleModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { examId, licenseId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        `/question/getAllQuestionsByLicenseId/${licenseId}`
      );
      setQuestions(response.data.data);
    };
    fetchQuestions();
  }, []);

  const showImportant = (index) => {
    if (index === true)
      return <div className="badge badge-neutral">Điểm liệt</div>;
    else return <div></div>;
  };

  const AddQuestionToExam = (questionId) => async () => {
    setLoading(true);
    const date = new Date();
    const newQuestionObject = {
      Id: "string",
      ExaminationId: examId,
      QuestionId: questionId,
    };
    const response = await axios.post(
      "/examinationQuestion/createExaminationQuestion",
      newQuestionObject
    );
    if (response.data) {
      // window.location.reload();
      dispatch(
        showNotification({ message: "Thêm mới thành công!", status: 1 })
      );
      setLoading(false);
    } else {
      dispatch(showNotification({ message: "Thêm mới thất bại!", status: 0 }));
    }
    console.log("response", response);
  };

  const AddArticle = async () => {
    setLoading(true);
    const date = new Date();
    const newArticleObject = {
      Id: "string",
      DecreeId: decreeId,
      ArticleTitle: leadObj.ArticleTitle,
    };
    const response = await axios.post(
      "/article/createArticle",
      newArticleObject
    );
    console.log("response", response);
    closeModal();

    if (response.data) {
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
    if (leadObj.ArticleTitle.trim() === "")
      return setErrorMessage("Phải có tên!");
    else {
      AddArticle();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      {/* <InputText
        type="text"
        defaultValue={leadObj.ArticleTitle}
        updateType="ArticleTitle"
        containerStyle="mt-4"
        labelTitle="Tên điều luật"
        updateFormValue={updateFormValue}
      /> */}

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Stt</th>
              <th>Nội dung</th>
              <th>Hạng giấy phép</th>
              <th>Nhóm câu hỏi</th>
              <th>Loại câu hỏi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {questions?.map((l, k) => {
              return (
                <tr key={k}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="">
                        {/* <div className="mask mask-squircle w-12 h-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div> */}
                        {k + 1}
                      </div>
                      {/* <div>
                          <div className="font-bold">{l.questionName}</div>
                          <div className="text-sm opacity-50">
                            {l.last_name}
                          </div>
                        </div> */}
                    </div>
                  </td>
                  <td className="truncate max-w-md">
                    {l.Question.QuestionContent}
                  </td>
                  <td>{l.License.LicenseName}</td>
                  <td>{l.Title.TitleName}</td>
                  <td>
                    {/* {moment(new Date())
                        .add(-5 * (k + 2), "days")
                        .format("DD MMM YY")} */}
                    {showImportant(l.Question.Important)}
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-neutral"
                      onClick={AddQuestionToExam(l.Question.Id)}
                    >
                      +
                    </button>
                    <button className="btn btn-outline">-</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

export default AddArticleModalBody;
