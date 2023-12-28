import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ExamDetail from "../../features/examDetail/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Thông tin đề thi" }));
  }, [dispatch]);

  return (
    <div className="">
      <ExamDetail />
    </div>
  );
}

export default InternalPage;
