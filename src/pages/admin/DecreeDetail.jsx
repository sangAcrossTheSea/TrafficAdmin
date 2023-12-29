import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import DecreeDetail from "../../features/article/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Thông tin nghị định" }));
  }, [dispatch]);

  return (
    <section className="">
      <DecreeDetail />
    </section>
  );
}

export default InternalPage;
