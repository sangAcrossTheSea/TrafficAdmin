/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteFineType, getFineTypesContent } from "./fineTypeSlice";
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
        title: "Thêm loại mức phạt",
        bodyType: MODAL_BODY_TYPES.FINE_TYPE_ADD_NEW,
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

function FineType() {
  const { fineTypes } = useSelector((state) => state.fineType);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFineTypesContent());
  }, []);

  const deleteCurrentDecree = (index, _id) => {
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn xoá loại mức phạt này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.FINE_TYPE_DELETE,
          _id: _id,
          index: index,
        },
      })
    );
  };

  const editCurrentDecree = (index, id, name) => {
    dispatch(
      openModal({
        title: "Chỉnh sửa loại mức phạt",
        bodyType: MODAL_BODY_TYPES.FINE_TYPE_EDIT,
        extraObject: {
          id,
          name,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Danh sách loại mức phạt"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fineTypes?.map((l, k) => {
                return (
                  <tr key={l.Id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="">{k + 1}</div>
                      </div>
                    </td>
                    <td>{l.FineType}</td>
                    <td>
                      {/* <button
                        className="btn btn-square btn-ghost"
                        onClick={() => navigate(`/decree/${l.Id}`)}
                      >
                        <EyeIcon className="w-5 text-green-800" />
                      </button> */}
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => editCurrentDecree(k, l.Id, l.FineType)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentDecree(k, l.Id)}
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

export default FineType;
