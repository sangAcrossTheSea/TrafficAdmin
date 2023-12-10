import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Decree from "../../features/decree/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Nghị định" }));
  }, [dispatch]);

  return (
    <div className="">
      <Decree />
    </div>
  );
}

export default InternalPage;
