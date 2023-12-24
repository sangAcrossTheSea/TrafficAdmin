/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteNew, getNewsContent } from "./newSlice";
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

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Thêm bài báo",
        bodyType: MODAL_BODY_TYPES.NEW_ADD_NEW,
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

function New() {
  const { news } = useSelector((state) => state.new);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsContent());
    console.log("News", news);
  }, []);

  const deleteCurrentLead = (index) => {
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn vô hiệu nghị định này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.DECREE_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Danh sách tin tức"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tiêu đề</th>
                <th>Mô tả</th>
                <th>Chỉnh sửa lần cuối</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {news?.map((l, k) => {
                return (
                  <tr key={l.id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="">
                          {/* <div className="mask mask-squircle w-12 h-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div> */}
                          {k + 1}
                        </div>
                        {/* <div>
                          <div className="font-bold">{l.NewName}</div>
                          <div className="text-sm opacity-50">
                            {l.last_name}
                          </div>
                        </div> */}
                      </div>
                    </td>
                    <td className="truncate max-w-sm">{l.NewsTitle}</td>
                    <td className="truncate max-w-sm">{l.NewsClarify}</td>
                    <td>
                      {moment(new Date()).format("DD MMM YY")}
                      {/* {new Date(l.NewDate).toLocaleDateString("vi-VN")} */}
                    </td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentLead(k)}
                      >
                        <EyeIcon lSquareIcon className="w-5 text-green-800" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentLead(k)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentLead(k)}
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

export default New;
