import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ArticleDetail from "../../features/articleDetail/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Thông tin nghị định" }));
  }, [dispatch]);

  return (
    <div className="">
      <ArticleDetail />
    </div>
  );
}

export default InternalPage;
