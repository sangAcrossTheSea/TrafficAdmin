/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteDecree, getDecreesContent } from "./decreeSlice";
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

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Thêm nghị định",
        bodyType: MODAL_BODY_TYPES.DECREE_ADD_NEW,
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

function Decree() {
  const { decrees } = useSelector((state) => state.decree);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    dispatch(getDecreesContent());
  }, [isChange]);

  const deleteCurrentDecree = (index, _id) => {
    setIsChange(!isChange);
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn xoá nghị định này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.DECREE_DELETE,
          _id,
          index,
        },
      })
    );
  };

  const editCurrentDecree = (index, id, name, number) => {
    setIsChange(!isChange);
    dispatch(
      openModal({
        title: "Chỉnh sửa nghị định",
        bodyType: MODAL_BODY_TYPES.DECREE_EDIT,
        extraObject: {
          id,
          name,
          number,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Danh sách nghị định"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Số</th>
                <th>Tên</th>
                <th>Chỉnh sửa lần cuối</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {decrees?.map((l, k) => {
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
                          <div className="font-bold">{l.DecreeName}</div>
                          <div className="text-sm opacity-50">
                            {l.last_name}
                          </div>
                        </div> */}
                      </div>
                    </td>
                    <td>{l.DecreeNumber}</td>
                    <td>{l.DecreeName}</td>
                    <td>
                      {/* {moment(new Date())
                        .add(-5 * (k + 2), "days")
                        .format("DD MMM YY")} */}
                      {new Date(l.DecreeDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => navigate(`/decree/${l.Id}`)}
                      >
                        <EyeIcon className="w-5 text-green-800" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() =>
                          editCurrentDecree(
                            k,
                            l.Id,
                            l.DecreeName,
                            l.DecreeNumber
                          )
                        }
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => {
                          deleteCurrentDecree(k, l.Id);
                        }}
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

export default Decree;
