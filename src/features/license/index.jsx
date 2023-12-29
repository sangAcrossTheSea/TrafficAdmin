/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteLicense, getLicensesContent } from "./licenseSlice";
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
        title: "Thêm loại bằng lái",
        bodyType: MODAL_BODY_TYPES.LICENSE_ADD_NEW,
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
  const { licenses } = useSelector((state) => state.license);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLicensesContent());
  }, []);

  const deleteCurrentDecree = (index, _id) => {
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn xoá loại bằng lái này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LICENSE_DELETE,
          _id: _id,
          index: index,
        },
      })
    );
  };

  const editCurrentDecree = (index, id, name) => {
    dispatch(
      openModal({
        title: "Chỉnh sửa loại bằng lái",
        bodyType: MODAL_BODY_TYPES.LICENSE_EDIT,
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
        title="Danh sách loại bằng lái"
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
              {licenses?.map((l, k) => {
                return (
                  <tr key={l.Id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="">{k + 1}</div>
                      </div>
                    </td>
                    <td>{l.LicenseName}</td>
                    <td>
                      {/* <button
                        className="btn btn-square btn-ghost"
                        onClick={() => navigate(`/decree/${l.Id}`)}
                      >
                        <EyeIcon className="w-5 text-green-800" />
                      </button> */}
                      <div className="flex justify-end mr-6">
                        <div className="tooltip" data-tip="Sủa loại bằng lái">
                          <button
                            className="btn btn-square btn-ghost"
                            onClick={() =>
                              editCurrentDecree(k, l.Id, l.LicenseName)
                            }
                          >
                            <PencilSquareIcon className="w-5" />
                          </button>
                        </div>
                        <div className="tooltip" data-tip="Xoá loại bằng lái">
                          <button
                            className="btn btn-square btn-ghost"
                            onClick={() => deleteCurrentDecree(k, l.Id)}
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

export default FineType;
