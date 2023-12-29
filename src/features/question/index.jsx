/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteQuestion, getQuestionsContent } from "./questionSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import {
  XCircleIcon,
  PencilSquareIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { showNotification } from "../common/headerSlice";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Thêm câu hỏi",
        bodyType: MODAL_BODY_TYPES.QUESTION_ADD_NEW,
        size: "lg",
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Thêm
      </button>
    </div>
  );
};

function Question() {
  const { questions } = useSelector((state) => state.question);
  const [questionList, setQuestionList] = useState(questions); //[{id: 1, name: "abc"}, {id: 2, name: "xyz"}
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [qq, setQq] = useState(questions.Question);

  useEffect(() => {
    dispatch(getQuestionsContent());
    console.table("questionList", questionList);
    setQq(questions.Question);
  }, []);

  const deleteCurrentLead = (index, _id) => {
    console.log("deleteCurrentLead", index, _id);
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn xoá câu hỏi này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.QUESTION_DELETE,
          index,
          _id,
        },
      })
    );
  };

  const editCurrentLead = (
    index,
    Id,
    LicenseTitleId,
    QuestionContent,
    QuestionMedia,
    Important,
    Explanation,
    LicenseId,
    Answers
  ) => {
    dispatch(
      openModal({
        title: "Sửa câu hỏi",
        bodyType: MODAL_BODY_TYPES.QUESTION_EDIT,
        size: "lg",
        extraObject: {
          index,
          Id,
          LicenseTitleId,
          QuestionContent,
          QuestionMedia,
          Important,
          Explanation,
          LicenseId,
          Answers,
        },
      })
    );
  };

  const showImportant = (index) => {
    if (index === true)
      return <div className="badge badge-neutral">Điểm liệt</div>;
    else return <div></div>;
  };

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const search = () => {
    if (!Array.isArray(questions)) {
      return [];
    }

    if (searchTerm === "") {
      return questions;
    } else {
      return questions.filter((item) =>
        item.Question?.QuestionContent.toLowerCase().includes(
          searchTerm.toLowerCase()
        )
      );
    }
  };

  useEffect(() => {
    setQuestionList(search());
  }, [searchTerm]);

  useEffect(() => {
    setQuestionList(questions);
  }, [questions]);

  return (
    <>
      <TitleCard
        title="Danh sách câu hỏi"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <section>
          <div className="flex items-center">
            <div className="flex">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Nhập từ khóa"
                value={searchTerm}
                onChange={onSearch}
              />
            </div>
            <div className="flex-initial ml-2">
              <button className="btn btn-primary">
                <span className="p-2 text-white">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </span>
                Tìm kiếm
              </button>
            </div>
          </div>
        </section>
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
              {questionList?.map((l, k) => {
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
                    <td>
                      {/* <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentLead(k)}
                      >
                        <EyeIcon className="w-5 text-green-800" />
                      </button> */}
                      <div className="flex justify-end">
                        <div className="tooltip" data-tip="Sửa câu hỏi">
                          <button
                            className="btn btn-square btn-ghost"
                            onClick={() => {
                              editCurrentLead(
                                k,
                                l.Question.Id,
                                l.Question.LicenseTitleId,
                                l.Question.QuestionContent,
                                l.Question.QuestionMedia,
                                l.Question.Important,
                                l.Question.Explanation,
                                l.License.Id,
                                l.Answers
                              );
                            }}
                          >
                            <PencilSquareIcon className="w-5" />
                          </button>
                        </div>
                        <div className="tooltip" data-tip="Xoá câu hỏi">
                          <button
                            className="btn btn-square btn-ghost"
                            onClick={() => {
                              deleteCurrentLead(k, id);
                            }}
                          >
                            <XCircleIcon className="w-5 text-red-700" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Question;
