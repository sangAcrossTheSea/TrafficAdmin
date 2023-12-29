import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Exam from "../../features/exam/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Đề thi" }));
  }, [dispatch]);

  return (
    <section className="">
      <Exam />
    </section>
  );
}

export default InternalPage;
