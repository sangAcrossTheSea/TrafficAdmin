import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import FineType from "../../features/fineType/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Loại mức phạt" }));
  }, [dispatch]);

  return (
    <div className="">
      <FineType />
    </div>
  );
}

export default InternalPage;
