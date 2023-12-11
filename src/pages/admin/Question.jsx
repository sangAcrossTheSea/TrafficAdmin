import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Question from "../../features/question/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Câu hỏi" }));
  }, [dispatch]);

  return (
    <div className="">
      <Question />
    </div>
  );
}

export default InternalPage;
