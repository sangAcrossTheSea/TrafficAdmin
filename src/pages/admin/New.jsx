import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import New from "../../features/new/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bài báo" }));
  }, [dispatch]);

  return (
    <section className="">
      <New />
    </section>
  );
}

export default InternalPage;
