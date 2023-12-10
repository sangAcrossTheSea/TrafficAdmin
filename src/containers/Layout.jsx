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
import { HomeIcon, BookOpenIcon } from "@heroicons/react/20/solid";
import ModalLayout from "./ModalLayout";
import { useSelector } from "react-redux";

const Layout = () => {
  const [clpSidebar, setClpSidebar] = useState(false);
  const navigate = useNavigate();
  const [arrow, setArrow] = useState(true);
  const mainContentRef = useRef(null);
  const { pageTitle } = useSelector((state) => state.header);

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
              className="cursor-pointer mx-auto my-[30px]"
            >
              <div className="flex justify-center items-center gap-2 rounded-full pt-2">
                <img
                  src="/logo-nobg.png"
                  alt="logo"
                  className="h-10 w-18 rounded-full"
                />
                {clpSidebar ? "" : <p className="text-lg">Traffic Learn</p>}
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
            <MenuItem
              icon={<HomeIcon className="h-6 w-6 text-gray-300" />}
              active
              component={<Link to="/" />}
              className=""
            >
              <p>Trang chủ</p>
            </MenuItem>
            <MenuItem
              icon={<BookOpenIcon className="h-6 w-6 text-gray-300" />}
              active
              component={<Link to="/decree" />}
              className=""
            >
              <p>Nghị định</p>
            </MenuItem>
            <SubMenu
              label="Charts"
              rootStyles={{
                ["& > ." + menuClasses.button]: {
                  backgroundColor: "#1a202c",
                },
                ["." + menuClasses.subMenuContent]: {
                  backgroundColor: "#454545",
                },
              }}
              // icon={<FaPeopleGroup />}
            >
              <MenuItem
                active
                component={<Link to="/employee/department" />}
                className=""
              >
                <p>Department</p>
              </MenuItem>
            </SubMenu>
            <div
              className=" absolute bottom-0 left-0 w-full text-white text-center py-2 cursor-pointer"
              onClick={handleSidebar}
            >
              {arrow ? (
                <ArrowLeftCircleIcon className="w-8 h-8 inline-block text-white" />
              ) : (
                <ArrowRightCircleIcon className="w-8 h-8 inline-block" />
              )}
            </div>
          </Menu>
        </Sidebar>
      </div>

      <div
        className={`w-full h-screen bg-gray-100 drawer-content flex flex-col ${
          clpSidebar ? "ml-[5rem]" : "ml-[15.6rem]"
        }`}
      >
        <header className={`z-50`}>
          <Navbar />
        </header>
        <main
          className="z-10 px-2 md:px-6 overflow-y-auto pt-8"
          ref={mainContentRef}
        >
          <Outlet />
        </main>
        <ModalLayout />
      </div>
    </section>
  );
};

export default Layout;
