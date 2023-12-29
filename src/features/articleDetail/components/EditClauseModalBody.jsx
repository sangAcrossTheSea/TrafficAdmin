/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  ArchiveBoxArrowDownIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

let INITIAL_LEAD_OBJ = {
  Id: "",
  ArticleId: "",
  ClauseTitle: "",
};

function EditArticleModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  INITIAL_LEAD_OBJ = {
    Id: extraObject.id,
    ArticleId: extraObject.decreeId,
    ClauseTitle: extraObject.title,
  };

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [points, setPoints] = useState([]);
  const { articleId } = useParams();
  const [newPoint, setNewPoint] = useState({
    PointTitle: "",
    PointContent: "",
  });
  const [refreshPoint, setRefreshPoint] = useState(false);
  const [submitType, setSubmitType] = useState(true);

  useEffect(() => {
    const getPoints = async () => {
      const res = await axios.get(
        `/point/getPointsByClauseId/${extraObject.id}`
      );
      const dataRes = res.data;
      setPoints(dataRes);
    };
    getPoints();
  }, [refreshPoint]);

  const EditDecree = async () => {
    setLoading(true);
    let newDecreeObj = {
      Id: extraObject.id,
      ArticleId: articleId,
      ClauseTitle: leadObj.ClauseTitle,
    };
    try {
      const response = await axios.put(
        `/clause/updateClause/${extraObject.id}`,
        newDecreeObj
      );
      dispatch(showNotification({ message: "Sửa thành công!", status: 1 }));
      closeModal();
    } catch (error) {
      console.log("error", error);
      dispatch(showNotification({ message: "Sửa thất bại!", status: 0 }));
    }
    setLoading(false);
  };

  const saveNewLead = async () => {
    if (leadObj.ClauseTitle.trim() === "")
      return setErrorMessage("Phải có tên!");
    else {
      EditDecree();
    }
  };

  const saveNewPoint = async () => {
    if (submitType) {
      if (newPoint.PointTitle.trim() === "")
        return setErrorMessage("Phải có tên!");
      else if (newPoint.PointContent.trim() === "")
        return setErrorMessage("Phải có nội dung!");
      else {
        const newPointObject = {
          Id: "string",
          ClauseId: extraObject.id,
          PointTitle: newPoint.PointTitle,
          PointContent: newPoint.PointContent,
        };
        const response = await axios.post("/point/createPoint", newPointObject);
        console.log("response", response);
        setNewPoint({
          PointTitle: "",
          PointContent: "",
        });

        setRefreshPoint(!refreshPoint);
        dispatch(
          showNotification({ message: "Thêm mới thành công!", status: 1 })
        );
      }
    } else {
      if (newPoint.PointTitle.trim() === "")
        return setErrorMessage("Phải có tên!");
      else if (newPoint.PointContent.trim() === "")
        return setErrorMessage("Phải có nội dung!");
      else {
        const newPointObject = {
          Id: newPoint.Id,
          ClauseId: extraObject.id,
          PointTitle: newPoint.PointTitle,
          PointContent: newPoint.PointContent,
        };
        const response = await axios.put(
          `/point/updatePoint/${newPoint.Id}`,
          newPointObject
        );
        console.log("response", response);
        setNewPoint({
          PointTitle: "",
          PointContent: "",
        });

        setRefreshPoint(!refreshPoint);
        dispatch(showNotification({ message: "Sửa thành công!", status: 1 }));
      }
    }
  };

  const editCurrentPoint = async (id, title, content) => {
    setSubmitType(false);
    setNewPoint({
      Id: id,
      ClauseId: extraObject.id,
      PointTitle: title,
      PointContent: content,
    });
  };

  const deleteCurrentPoint = async (id) => {
    const response = await axios.delete(`/point/deletePoint/${id}`);
    console.log("response", response);
    setNewPoint({
      PointTitle: "",
      PointContent: "",
    });
    setRefreshPoint(!refreshPoint);
    dispatch(showNotification({ message: "Xóa thành công!", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  const updateNewPoint = ({ updateType, value }) => {
    setErrorMessage("");
    setNewPoint({ ...newPoint, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={extraObject.title}
        updateType="ClauseTitle"
        containerStyle="mt-4"
        labelTitle="Tên khoản"
        updateFormValue={updateFormValue}
      />

      <div className="mt-4">
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Danh sách điểm:</span>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Tên điểm"
              className="input input-bordered w-full max-w-xs my-2"
              value={newPoint.PointTitle}
              onChange={(e) =>
                setNewPoint({ ...newPoint, PointTitle: e.target.value })
              }
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Nội dung"
              value={newPoint.PointContent}
              onChange={(e) =>
                setNewPoint({ ...newPoint, PointContent: e.target.value })
              }
            ></textarea>
            {/* <input
              type="text"
              placeholder="Nội dung"
              className="input input-bordered w-full max-w-xs my-2 mx-auto"
              value={newPoint.PointContent}
              onChange={(e) =>
                setNewPoint({ ...newPoint, PointContent: e.target.value })
              }
            /> */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="btn btn-ghost"
                onClick={() =>
                  setSubmitType(true) &
                  setNewPoint({
                    PointTitle: "",
                    PointContent: "",
                  })
                }
              >
                Huỷ
              </button>
              <button className="btn btn-neutral" onClick={saveNewPoint}>
                {submitType ? "Thêm mới" : "Sửa"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1">
            <div className="">
              {points?.length > 0 &&
                points?.map((point, index) => (
                  <div className="grid grid-cols-12">
                    <div className="col-span-9">
                      <span className="ml-2">{point?.PointTitle}</span>
                      <span className="ml-2">{point?.PointContent}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() =>
                          editCurrentPoint(
                            point?.Id,
                            point?.PointTitle,
                            point?.PointContent
                          )
                        }
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentPoint(point?.Id)}
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

export default EditArticleModalBody;
