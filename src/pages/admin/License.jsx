import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import License from "../../features/license/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bằng lái" }));
  }, [dispatch]);

  return (
    <div className="">
      <License />
    </div>
  );
}

export default InternalPage;
