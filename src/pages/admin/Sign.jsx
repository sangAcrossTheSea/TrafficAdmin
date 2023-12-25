import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Sign from "../../features/sign/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Biển báo" }));
  }, [dispatch]);

  return (
    <div className="">
      <Sign />
    </div>
  );
}

export default InternalPage;
