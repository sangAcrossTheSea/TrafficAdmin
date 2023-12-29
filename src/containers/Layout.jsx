import { useEffect, useState, startTransition, useRef } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import Navbar from "./Header";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  NewspaperIcon,
  DocumentIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import ModalLayout from "./ModalLayout";
import RightSidebar from "./RightSidebar";
import { useSelector, useDispatch } from "react-redux";
import { removeNotificationMessage } from "../features/common/headerSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const dispatch = useDispatch();
  const [clpSidebar, setClpSidebar] = useState(false);
  const navigate = useNavigate();
  const [arrow, setArrow] = useState(true);
  const mainContentRef = useRef(null);
  const { pageTitle } = useSelector((state) => state.header);
  const { newNotificationMessage, newNotificationStatus } = useSelector(
    (state) => state.header
  );

  useEffect(() => {
    if (newNotificationMessage) {
      switch (newNotificationStatus) {
        case 1:
          toast.success(newNotificationMessage);
          break;
        case 0:
          toast.error(newNotificationMessage);
          break;
        case 2:
          toast.warning(newNotificationMessage);
          break;
        default:
          break;
      }
    }
    dispatch(removeNotificationMessage());
  }, [newNotificationMessage]);

  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [pageTitle]);

  function handleSidebar() {
    setArrow(!arrow);
    startTransition(() => {
      setClpSidebar(!clpSidebar);
    });
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        handleSidebar();
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="w-full flex">
      <div className="h-[100vh] flex fixed z-[1]">
        <Sidebar
          collapsed={clpSidebar}
          transitionDuration={800}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#1a202c",
              color: "#ffff",
            },
          }}
        >
          <aside className="flex items-center justify-center text-white font-semibold">
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer mx-auto mt-[30px] mb-[20px]"
            >
              <div className="flex justify-center items-center gap-2 rounded-full pt-2">
                <img
                  src="/logo-nobg.png"
                  alt="logo"
                  className="h-10 w-18 rounded-full"
                />
                {clpSidebar ? "" : <p className="text-lg">Traffic Learn</p>}
              </div>
              <div
                className="w-full text-white text-center cursor-pointer pt-4"
                onClick={handleSidebar}
              >
                {arrow ? (
                  <ArrowLeftCircleIcon className="w-8 h-8 inline-block text-white" />
                ) : (
                  <ArrowRightCircleIcon className="w-8 h-8 inline-block" />
                )}
              </div>
            </div>
          </aside>
          <Menu
            menuItemStyles={{
              button: ({ disabled }) => {
                return {
                  color: disabled ? "#f5d9ff" : "#ffff",
                  // backgroundColor: active ? "#eecef9" : undefined,
                  "&:hover": {
                    backgroundColor: "#858483",
                  },
                };
              },
            }}
          >
            {/* <MenuItem
              icon={<HomeIcon className="h-6 w-6 text-gray-300" />}
              active
              component={<Link to="/" />}
              className=""
            >
              <p>Trang chủ</p>
            </MenuItem> */}
            <MenuItem
              icon={<BookOpenIcon className="h-6 w-6 text-gray-300" />}
              active
              component={<Link to="/decree" />}
              className=""
            >
              <p>Nghị định</p>
            </MenuItem>
            <SubMenu
              label="Mức phạt"
              rootStyles={{
                ["& > ." + menuClasses.button]: {
                  backgroundColor: "#1a202c",
                },
                ["." + menuClasses.subMenuContent]: {
                  backgroundColor: "#454545",
                },
              }}
              icon={<DocumentIcon className="h-6 w-6 text-gray-300" />}
            >
              <MenuItem active component={<Link to="/fine" />} className="">
                <p>Mức phạt</p>
              </MenuItem>
              <MenuItem
                active
                component={<Link to="/fine-type" />}
                className=""
              >
                <p>Loại mức phạt</p>
              </MenuItem>
            </SubMenu>
            <SubMenu
              label="Biển báo"
              rootStyles={{
                ["& > ." + menuClasses.button]: {
                  backgroundColor: "#1a202c",
                },
                ["." + menuClasses.subMenuContent]: {
                  backgroundColor: "#454545",
                },
              }}
              icon={
                <ExclamationTriangleIcon className="h-6 w-6 text-gray-300" />
              }
            >
              <MenuItem active component={<Link to="/sign" />} className="">
                <p>Biển báo</p>
              </MenuItem>
              <MenuItem
                active
                component={<Link to="/sign-type" />}
                className=""
              >
                <p>Loại biển báo</p>
              </MenuItem>
            </SubMenu>
            {/* <MenuItem
              icon={
                <QuestionMarkCircleIcon className="h-6 w-6 text-gray-300" />
              }
              active
              component={<Link to="/question" />}
              className=""
            >
              <p>Câu hỏi</p>
            </MenuItem> */}
            <MenuItem
              icon={<AcademicCapIcon className="h-6 w-6 text-gray-300" />}
              active
              component={<Link to="/exam" />}
              className=""
            >
              <p>Đề thi</p>
            </MenuItem>
            <SubMenu
              label="Câu hỏi"
              rootStyles={{
                ["& > ." + menuClasses.button]: {
                  backgroundColor: "#1a202c",
                },
                ["." + menuClasses.subMenuContent]: {
                  backgroundColor: "#454545",
                },
              }}
              icon={
                <QuestionMarkCircleIcon className="h-6 w-6 text-gray-300" />
              }
            >
              <MenuItem active component={<Link to="/question" />} className="">
                <p>Câu hỏi</p>
              </MenuItem>
              {/* <MenuItem
                active
                component={<Link to="/question-group" />}
                className=""
              >
                <p>Loại câu hỏi</p>
              </MenuItem> */}
              <MenuItem active component={<Link to="/license" />} className="">
                <p>Bằng lái</p>
              </MenuItem>
            </SubMenu>
            <MenuItem
              icon={<NewspaperIcon className="h-6 w-6 text-gray-300" />}
              active
              component={<Link to="/news" />}
              className=""
            >
              <p>Bài báo</p>
            </MenuItem>
            <MenuItem
              icon={<UserCircleIcon className="h-6 w-6 text-gray-300" />}
              active
              component={<Link to="/account" />}
              className=""
            >
              <p>Tài khoản</p>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      <div
        className={`w-full h-screen  drawer-content flex flex-col ${
          clpSidebar ? "ml-[5rem]" : "ml-[15.6rem]"
        }`}
      >
        <header className={`z-50`}>
          <Navbar />
        </header>
        <main
          className="px-2 md:px-6 overflow-y-auto pt-8"
          ref={mainContentRef}
        >
          <Outlet />
        </main>
        <ModalLayout />
        <RightSidebar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </section>
  );
};

export default Layout;
