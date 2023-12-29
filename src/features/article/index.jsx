/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "@/components/Cards/TitleCard";
import { openModal } from "@/features/common/modalSlice";
import { deleteDecree, getDecreesContent } from "../decree/decreeSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "@/utils/globalConstantUtil";
import {
  ArchiveBoxArrowDownIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { showNotification } from "@/features/common/headerSlice";
import SearchBar from "@/components/Input/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Thêm điều luật",
        bodyType: MODAL_BODY_TYPES.ARTICLE_ADD_NEW,
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

function DecreeDetail() {
  const { decreeId } = useParams();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]); // eslint-disable-line no-unused-vars
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    const getArticles = async () => {
      const res = await axios.get(`/article/getArticlesByDecreeId/${decreeId}`);
      const dataRes = res.data;
      setArticles(dataRes);
      setFilteredArticles(dataRes);
    };

    getArticles();
  }, [isOpen]);

  useEffect(() => {
    const searchArticles = () => {
      const res = articles.filter((article) => {
        return article.ArticleTitle.toLowerCase().includes(
          searchText.toLowerCase()
        );
      });
      setFilteredArticles(articles);
      if (searchText) setFilteredArticles(res);
    };
    searchArticles();
  }, [searchText]);

  const deleteCurrentDecree = (index) => {
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn xoá điều luật này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.ARTICLE_DELETE,
          _id: index,
        },
      })
    );
  };

  const editCurrentDecree = (id, title) => {
    dispatch(
      openModal({
        title: "Chỉnh sửa điều luật",
        bodyType: MODAL_BODY_TYPES.ARTICLE_EDIT,
        extraObject: {
          id,
          title,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Danh sách điều luật"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
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
              {filteredArticles?.map((l, k) => {
                return (
                  <tr key={l.Id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="">{k + 1}</div>
                      </div>
                    </td>
                    <td>{l.ArticleTitle}</td>
                    <td>
                      <div className="flex justify-end">
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => navigate(`/article/${l.Id}`)}
                        >
                          <EyeIcon className="w-5 text-green-800" />
                        </button>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() =>
                            editCurrentDecree(l.Id, l.ArticleTitle)
                          }
                        >
                          <PencilSquareIcon className="w-5" />
                        </button>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentDecree(l.Id)}
                        >
                          <ArchiveBoxArrowDownIcon className="w-5 text-red-700" />
                        </button>
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

export default DecreeDetail;
