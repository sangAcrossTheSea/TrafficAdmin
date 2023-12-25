import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FaceFrownIcon from "@heroicons/react/24/solid/FaceFrownIcon";
import { setPageTitle } from "../features/common/headerSlice";
import { useNavigate } from "react-router-dom";

function InternalPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Error" }));
  }, []);

  return (
    <div className="hero bg-base-200 h-screen">
      <div className="hero-content text-accent text-center text-black">
        <div className="max-w-md">
          <FaceFrownIcon className="h-48 w-48 inline-block" />
          <h1 className="text-5xl  font-bold">404 - Not Found</h1>
          <p className="text-xl">
            The page you are looking for does not exist.
          </p>
          <div className="mt-6">
            <button
              className="btn btn-neutral  hover:bg-gray-700"
              onClick={() => navigate("/")}
            >
              Go back home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternalPage;
