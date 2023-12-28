import { useState, useEffect } from "react";
import {
  ArchiveBoxArrowDownIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const EditAnswerBody = ({ questionId, answers, setRefreshPoint }) => {
  // const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState({
    Id: "",
    QuestionId: questionId,
    AnswerContent: "",
    Result: false,
  });
  const [submitType, setSubmitType] = useState(true);

  // useEffect(() => {
  //   const getAnswers = async () => {
  //     const res = await axios.get(`/question/getAnswers/${questionId}`);
  //     const dataRes = res.data;
  //     setAnswers(dataRes);
  //   };
  //   getAnswers();
  // }, []);

  const saveAnswer = async () => {
    if (newAnswer.AnswerContent.trim() === "") {
      return;
    }
    if (submitType) {
      const response = await axios.post(`/answer/createAnswer`, newAnswer);
      if (response.data) {
        setNewAnswer({
          Id: "",
          QuestionId: questionId,
          AnswerContent: "",
          Result: false,
        });
        setRefreshPoint((prev) => !prev);
      }
    } else {
      const response = await axios.put(
        `/answer/updateAnswer/${newAnswer.Id}`,
        newAnswer
      );
      if (response.data) {
        setNewAnswer({
          Id: "",
          AnswerContent: "",
        });
        setRefreshPoint((prev) => !prev);
      }
    }
    setSubmitType((prev) => !prev);
  };

  const saveCurrentAnswer = () => {
    saveAnswer();
  };

  const editCurrentAnswer = (answerId, content, result) => {
    setNewAnswer({
      Id: answerId,
      QuestionId: questionId,
      AnswerContent: content,
      Result: result,
    });
    setSubmitType(false);
  };

  const deleteCurrentAnswer = async (answerId) => {
    const response = await axios.delete(`/answer/deleteAnswer/${answerId}`);
    if (response.data) {
      setRefreshPoint((prev) => !prev);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Danh sách câu trả lời:</span>
        <div className="flex flex-col">
          {/* <input
            type="text"
            placeholder="Tên điểm"
            className="input input-bordered w-full max-w-xs my-2"
            value={newAnswer.AnswerTitle}
            onChange={(e) =>
              setNewAnswer({ ...newAnswer, AnswerTitle: e.target.value })
            }
          /> */}
          <textarea
            className="textarea textarea-bordered"
            placeholder="Nội dung"
            value={newAnswer.AnswerContent}
            onChange={(e) =>
              setNewAnswer({ ...newAnswer, AnswerContent: e.target.value })
            }
          ></textarea>
          <div className={`form-control w-[100px]`}>
            <label className="label">
              <span className={"label-text text-base-content "}>
                Là đáp án?
              </span>
              <input
                type={"checkbox"}
                // defaultValue={newAnswer.Result}
                checked={newAnswer.Result}
                value={newAnswer.Result}
                className="checkbox"
                onClick={(e) =>
                  setNewAnswer({ ...newAnswer, Result: e.target.checked })
                }
              />
            </label>
          </div>
          {/* <input
          type="text"
          placeholder="Nội dung"
          className="input input-bordered w-full max-w-xs my-2 mx-auto"
          value={newAnswer.AnswerContent}
          onChange={(e) =>
            setNewAnswer({ ...newAnswer, AnswerContent: e.target.value })
          }
        /> */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="btn btn-ghost"
              onClick={() =>
                setSubmitType(true) &
                setNewAnswer({
                  AnswerTitle: "",
                  AnswerContent: "",
                })
              }
            >
              Huỷ
            </button>
            <button className="btn btn-neutral" onClick={saveCurrentAnswer}>
              {submitType ? "Thêm mới" : "Sửa"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="">
            {answers?.length > 0 &&
              answers?.map((answer, index) => (
                <div className="grid grid-cols-12 items-center">
                  <div className="col-span-9 grid grid-cols-6">
                    <span className="">{index + 1}.</span>
                    <span className="ml-2">{answer?.AnswerContent}</span>
                    <span className="ml-2 col-start-6">
                      {answer?.Result ? (
                        <p className="font-bold italic">Đáp án</p>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() =>
                        editCurrentAnswer(
                          answer?.Id,
                          answer?.AnswerContent,
                          answer?.Result
                        )
                      }
                    >
                      <PencilSquareIcon className="w-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => deleteCurrentAnswer(answer?.Id)}
                    >
                      <ArchiveBoxArrowDownIcon className="w-5 text-red-700" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAnswerBody;
