import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import New from "../../features/new/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Câu hỏi" }));
  }, [dispatch]);

  return (
    <div className="">
      <New />
    </div>
  );
}

export default InternalPage;
