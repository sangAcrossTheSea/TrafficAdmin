/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "@/components/Cards/TitleCard";
import { openModal } from "@/features/common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "@/utils/globalConstantUtil";
import {
  ArchiveBoxArrowDownIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { showNotification } from "@/features/common/headerSlice";
import SearchBar from "@/components/Input/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { set } from "react-hook-form";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Thêm câu hỏi vào đề",
        size: "lg",
        bodyType: MODAL_BODY_TYPES.EXAM_DETAIL_ADD_NEW,
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

function ExamDetail() {
  const { examName, examId } = useParams();
  const [examDetail, setExamDetail] = useState([]);
  const [examDetailTotal, setExamDetailTotal] = useState(0);
  const [numberOfImportant, setNumberOfImportant] = useState(0);
  const [filteredExamDetail, setFilteredExamDetail] = useState([]); // eslint-disable-line no-unused-vars
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen } = useSelector((state) => state.modal);

  const getExamDetail = async () => {
    try {
      const res = await axios.get(
        `/examination/getAllExaminationQuestions/${examId}`
      );
      const dataRes = res.data.data;

      setExamDetail(dataRes);
      setFilteredExamDetail(dataRes);
      setExamDetailTotal(res.data.total);
      setNumberOfImportant(res.data.numberOfImportantQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getExamDetail();
  }, [isOpen]);

  useEffect(() => {
    const search = () => {
      if (!Array.isArray(examDetail)) {
        console.log("exams not array", examDetail);
        return [];
      }

      if (searchText === "") {
        console.log("exams", examDetail);
        return examDetail;
      } else {
        return examDetail.filter((item) =>
          item.Question?.QuestionContent.toLowerCase().includes(
            searchText.toLowerCase()
          )
        );
      }
    };
    const searchResult = search();
    setFilteredExamDetail(searchResult);
  }, [searchText]);

  // useEffect(() => {
  //   console.log("filteredExamDetailLog", filteredExamDetail);
  // }, [filteredExamDetail]);

  const deleteCurrentExam = (index) => {
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn xoá câu hỏi này khỏi bài thi?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.EXAM_DETAIL_DELETE,
          _id: index,
        },
      })
    );
  };

  const editCurrentExam = (
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

  return (
    <>
      <TitleCard
        title={`Danh sách câu hỏi trong ${examName}`}
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* <SearchBar searchText={searchText} setSearchText={setSearchText} /> */}
        <section>
          <div className="flex items-center">
            <div className="flex">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Nhập từ khóa"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
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
        <div>
          <div className="flex flex-row justify-start py-4 gap-4">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Tổng số câu hỏi</div>
                <div className="stat-value">{examDetailTotal}</div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Số câu điểm liệt</div>
                <div className="stat-value">{numberOfImportant}</div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
          </div>
        </div>
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên</th>
                <th>Hình ảnh</th>
                <th>Loại câu hỏi</th>
                <th>Giải thích</th>
                <th>Điểm liệt</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredExamDetail.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="">{k + 1}</div>
                      </div>
                    </td>
                    <td>{l.Question.QuestionContent}</td>
                    <td>
                      <img
                        src={l.Question.QuestionMedia}
                        alt="sign"
                        className="h-24 w-24 object-cover"
                      />
                    </td>
                    <td>{l.Title.TitleName}</td>
                    <td className="max-w-sm">{l.Question.Explanation}</td>
                    <td> {showImportant(l.Question.Important)}</td>

                    <td>
                      {/* <button
                        className="btn btn-square btn-ghost"
                        onClick={() => navigate(`/article/${l.Id}`)}
                      >
                        <EyeIcon className="w-5 text-green-800" />
                      </button> */}
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() =>
                          editCurrentExam(
                            k,
                            l.Question.Id,
                            l.Question.LicenseTitleId,
                            l.Question.QuestionContent,
                            l.Question.QuestionMedia,
                            l.Question.Important,
                            l.Question.Explanation,
                            l.License.Id,
                            l.Answers
                          )
                        }
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentExam(l.Id)}
                      >
                        <ArchiveBoxArrowDownIcon className="w-5 text-red-700" />
                      </button>
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

export default ExamDetail;
