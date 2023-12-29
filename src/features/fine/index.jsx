console.log("🚀 ~ file: index.jsx:1 ~ Fine ~ target:", target);
/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteFine, getFinesContent } from "./fineSlice";
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
        title: "Thêm mức phạt",
        size: "lg",
        bodyType: MODAL_BODY_TYPES.FINE_ADD_NEW,
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

function Fine() {
  const { fines } = useSelector((state) => state.fine);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState("all");
  const [filteredFines, setFilteredFines] = useState([]);
  const [fineTypes, setFineTypes] = useState([]); // {Id, FineType}
  const [selectedFineType, setSelectedFineType] = useState("all"); // {Id, FineType}

  useEffect(() => {
    dispatch(getFinesContent());
  }, [isChange]);

  const getFineTypes = async () => {
    const response = await axios.get("/trafficFineType/getAllTrafficFineTypes");
    setFineTypes(response.data);
  };

  useEffect(() => {
    getFineTypes();
  }, [fines]);

  useEffect(() => {
    if (selectedVehicleType === "all" && selectedFineType === "all") {
      setFilteredFines(fines);
    } else if (selectedVehicleType === "all" || selectedFineType === "all") {
      const filtered = fines.filter(
        (f) =>
          f.VehicleType === selectedVehicleType ||
          f.FineTypeId === selectedFineType
      );
      setFilteredFines(filtered);
    } else {
      const filtered = fines.filter(
        (f) =>
          f.VehicleType === selectedVehicleType &&
          f.FineTypeId === selectedFineType
      );
      setFilteredFines(filtered);
    }
  }, [selectedVehicleType, fines, selectedFineType]);

  const deleteCurrentDecree = (index, _id) => {
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn xoá mức phạt này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.FINE_DELETE,
          _id,
          index,
        },
      })
    );
  };

  const editCurrentDecree = (
    index,
    Id,
    FineName,
    FineTypeId,
    VehicleType,
    FineBehavior,
    FineContent,
    FineAdditional,
    FineNote
  ) => {
    dispatch(
      openModal({
        title: "Chỉnh sửa mức phạt",
        bodyType: MODAL_BODY_TYPES.FINE_EDIT,
        size: "lg",
        extraObject: {
          index,
          Id,
          FineName,
          FineTypeId,
          VehicleType,
          FineBehavior,
          FineContent,
          FineAdditional,
          FineNote,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Danh sách mức phạt"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="grid grid-cols-3">
          <div className="flex gap-2 pb-4 items-center">
            <div className="block">
              <p className="min-w-[62px] w-full">Lọc theo</p>
            </div>
            <select
              className="select select-bordered"
              onChange={(e) => {
                setSelectedVehicleType(e.target.value);
              }}
            >
              <option value="all">Tất cả</option>
              <option value="motorbike">Xe máy</option>
              <option value="car">Ô tô</option>
              <option value="other">Khác</option>
            </select>

            <select
              className="select select-bordered"
              onChange={(e) => {
                setSelectedFineType(e.target.value);
              }}
            >
              <option value="all" key="all">
                Tất cả
              </option>
              {fineTypes?.map((f) => {
                return (
                  <option value={f.Id} key={f.Id}>
                    {f.FineType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên</th>
                <th>Loại phương tiện</th>
                <th>Hành vi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredFines?.map((l, k) => {
                return (
                  <tr key={l.Id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="">{k + 1}</div>
                      </div>
                    </td>
                    <td className="truncate max-w-sm">{l.FineName}</td>
                    <td>
                      {/* {switchVehicleType(l.VehicleType)} */}
                      {l.VehicleType === "motorbike"
                        ? "Xe máy"
                        : l.VehicleType === "car"
                        ? "Ô tô"
                        : "Khác"}
                    </td>
                    <td className="truncate max-w-sm">{l.FineBehavior}</td>
                    <td>
                      {/* <button
                        className="btn btn-square btn-ghost"
                        onClick={() => navigate(`/decree/${l.Id}`)}
                      >
                        <EyeIcon className="w-5 text-green-800" />
                      </button> */}
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() =>
                          editCurrentDecree(
                            k,
                            l.Id,
                            l.FineName,
                            l.FineTypeId,
                            l.VehicleType,
                            l.FineBehavior,
                            l.FineContent,
                            l.FineAdditional,
                            l.FineNote
                          )
                        }
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

export default Fine;
