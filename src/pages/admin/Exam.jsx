import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Exam from "../../features/exam/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bài thi" }));
  }, [dispatch]);

  return (
    <div className="">
      <Exam />
    </div>
  );
}

export default InternalPage;
