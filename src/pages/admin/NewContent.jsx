import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import NewDetail from "../../features/new/NewDetail";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Chi tiết bài báo" }));
  }, [dispatch]);

  return (
    <section className="">
      <NewDetail />
    </section>
  );
}

export default InternalPage;
