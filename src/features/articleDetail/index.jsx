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
import Clause from "./Clause";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Thêm khoản mới",
        bodyType: MODAL_BODY_TYPES.CLAUSE_ADD_NEW,
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

function ArticleDetail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState([]); // eslint-disable-line no-unused-vars
  const [articleDetail, setArticleDetail] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]); // eslint-disable-line no-unused-vars
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    const getArticleDetail = async () => {
      const res = await axios.get(`/article/getAllArticleDetails/${articleId}`);
      const dataRes = res.data;
      console.log("dataRes", dataRes);
      setArticle(dataRes.article);
      setArticleDetail(dataRes.details);
      setFilteredArticles(dataRes);
    };

    getArticleDetail();
  }, [isOpen]);

  const deleteCurrentDecree = (index) => {
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Bạn chắc chắn muốn xoá khoản này?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.CLAUSE_DELETE,
          index,
        },
      })
    );
  };

  const editCurrentDecree = (id, title) => {
    dispatch(
      openModal({
        title: "Chỉnh sửa khoản",
        bodyType: MODAL_BODY_TYPES.CLAUSE_EDIT,
        extraObject: {
          id,
          title,
        },
      })
    );
  };

  //   useEffect(() => {
  //     const searchArticles = () => {
  //       const res = articleDetail.filter((article) => {
  //         return article.ArticleTitle.toLowerCase().includes(
  //           searchText.toLowerCase()
  //         );
  //       });
  //       setFilteredArticles(articleDetail);
  //       if (searchText) setFilteredArticles(res);
  //     };
  //     searchArticles();
  //   }, [searchText]);

  return (
    <>
      <TitleCard
        title={article?.ArticleTitle}
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* <SearchBar searchText={searchText} setSearchText={setSearchText} /> */}
        {/* Leads List in table format loaded from slice after api call */}
        <div className="py-6 grid grid-cols-1 gap-2">
          {articleDetail?.map((item, index) => (
            <div
              tabIndex={0}
              key={index}
              className="collapse collapse-arrow border border-neutral-300"
            >
              <div className="collapse-title text-xl font-medium flex justify-between">
                <p>{item?.Clause?.ClauseTitle}</p>
                <div className="flex items-center">
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() =>
                      editCurrentDecree(item?.Id, item?.ClauseTitle)
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
              </div>
              <div className="collapse-content">
                {item?.PointsList?.map((l, k) => (
                  <Clause points={l} key={k} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </TitleCard>
    </>
  );
}

export default ArticleDetail;
