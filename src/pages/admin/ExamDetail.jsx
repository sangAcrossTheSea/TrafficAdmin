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
    <section className="">
      <ExamDetail />
    </section>
  );
}

export default InternalPage;
