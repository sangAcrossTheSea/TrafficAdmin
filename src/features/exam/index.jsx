/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteExam, getExaminationsContent } from "./examSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import {
  ArchiveBoxArrowDownIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { showNotification } from "../common/headerSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Thêm bài thi",
        bodyType: MODAL_BODY_TYPES.EXAM_ADD_NEW,
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

function Examination() {
  const { exams } = useSelector((state) => state.exam);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false);
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    dispatch(getExaminationsContent());
  }, [isChange]);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const res = await axios.get("/license/getAllLicenses");
        const dataRes = res.data;
        setLicenses(dataRes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLicenses();
  }, []);

  const getLicenseName = (id) => {
    const license = licenses.find((l) => l.Id === id);
    return license?.LicenseName;
  };

  const deleteCurrentExamination = (index, _id) => {
    setIsChange(!isChange);
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn xoá bài thi này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.EXAM_DELETE,
          _id,
          index,
        },
      })
    );
  };

  const editCurrentExamination = (index, Id, ExaminationName, LicenseId) => {
    setIsChange(!isChange);
    dispatch(
      openModal({
        title: "Chỉnh sửa bài thi",
        bodyType: MODAL_BODY_TYPES.EXAM_EDIT,
        extraObject: {
          Id,
          ExaminationName,
          LicenseId,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Danh sách bài thi"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Bằng lái</th>
                <th>Tên</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {exams?.map((l, k) => {
                return (
                  <tr key={l.Id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="">
                          {/* <div className="mask mask-squircle w-12 h-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div> */}
                          {k + 1}
                        </div>
                        {/* <div>
                          <div className="font-bold">{l.ExaminationName}</div>
                          <div className="text-sm opacity-50">
                            {l.last_name}
                          </div>
                        </div> */}
                      </div>
                    </td>
                    <td>{getLicenseName(l.LicenseId)}</td>
                    <td>{l.ExaminationName}</td>
                    <td>
                      <div className="flex justify-end pr-4">
                        <div className="tooltip" data-tip="Xem bài thi">
                          <button
                            className="btn btn-square btn-ghost"
                            onClick={() =>
                              navigate(
                                `/exam/${l.ExaminationName}/${l.Id}/${l.LicenseId}`
                              )
                            }
                          >
                            <EyeIcon className="w-5 text-green-800" />
                          </button>
                        </div>
                        <div className="tooltip" data-tip="Sửa bài thi">
                          <button
                            className="btn btn-square btn-ghost"
                            onClick={() =>
                              editCurrentExamination(
                                k,
                                l.Id,
                                l.ExaminationName,
                                l.LicenseId
                              )
                            }
                          >
                            <PencilSquareIcon className="w-5" />
                          </button>
                        </div>
                        <div className="tooltip" data-tip="Xoá bài thi">
                          <button
                            className="btn btn-square btn-ghost"
                            onClick={() => {
                              deleteCurrentExamination(k, l.Id);
                            }}
                          >
                            <ArchiveBoxArrowDownIcon className="w-5 text-red-700" />
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

export default Examination;
