import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Account from "../../features/account/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Người dùng" }));
  }, [dispatch]);

  return (
    <div className="">
      <Account />
    </div>
  );
}

export default InternalPage;
