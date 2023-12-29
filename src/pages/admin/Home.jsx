import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Trang chủ" }));
  }, [dispatch]);

  return <section className="">Trang chủ</section>;
}

export default InternalPage;
