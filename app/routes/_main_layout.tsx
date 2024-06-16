import { NavLink, Outlet, useFetcher, useLocation } from "@remix-run/react";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { BiSolidEdit } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { authenticator } from "~/api/auth.server";
import { IoExitOutline } from "react-icons/io5";
import { Logo } from "~/components";

const nav_list = [
  { title: "courses", to: "/courses", icon: LuBookOpen },
  { title: "blogs", to: "/blogs", icon: BiSolidEdit },
  { title: "gallery", to: "/gallery", icon: GrGallery },
  { title: "customers", to: "/customers", icon: FaUser }
];

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const nav_ele = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const fetcher = useFetcher();

  const logoutHandler = () => {
    let formData = new FormData();
    formData.append("type", "logout");
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    let click = (e: any) => {
      if (nav_ele.current && !nav_ele.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    addEventListener("click", click, true);

    return () => {
      removeEventListener("click", click, true);
    };
  }, []);

  useEffect(() => {
    let drag = (e: any) => {
      setIsOpen(false);
    };
    window.addEventListener("resize", drag, true);
    return () => {
      removeEventListener("drag", drag);
    };
  }, []);
  return (
    <div className="w-dvw h-dvh flex relative overflow-hidden">
      {isOpen && (
        <div className="absolute top-0 left-0 w-dvw h-dvh bg-black bg-opacity-10 backdrop-blur-sm z-40"></div>
      )}
      <aside
        ref={nav_ele}
        className={`h-dvh ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-all z-50  absolute lg:relative left-0 lg:left-auto top-0 lg:top-auto h-full bg-gray-100 py-5 w-64 [&>*]:text-gray-900 shadow-md overflow-hidden flex flex-col justify-start`}
      >
        <div className="flex justify-center items-center">
          <Logo/>
        </div>
        <ul className="flex flex-col">
          {/* Navigation */}
          {nav_list.map((item) => {
            return (
              <NavLink
                to={item.to}
                key={item.title}
                className={({ isActive }) => {
                  return `py-3 px-8 hover:bg-gray-900 hover:text-gray-50 capitalize flex gap-3 items-center text-lg rounded-lg ${
                    isActive ? "bg-gray-900 text-gray-50" : ""
                  }`;
                }}
              >
                {item.icon && <item.icon size={21} />}
                {item.title}
              </NavLink>
            );
          })}
        </ul>
        <p
          className="justify-self-end px-8 py-3 flex gap-4 capitalize cursor-pointer rounded-md hover:bg-slate-900 hover:text-gray-50"
          onClick={() => logoutHandler()}
        >
          <IoExitOutline size={21} />
          logout
        </p>
      </aside>
      <div className="flex-1">
        <header className="bg-slate-900 flex justify-between items-center px-8 py-3 shadow-md">
          <RxHamburgerMenu
            className="text-gray-100 lg:hidden text-3xl md:text-4xl"
            onClick={(e) => setIsOpen(true)}
          />
          <div></div>
          <button className="p-2 rounded-full bg-slate-100">
            <IoPersonSharp className="text-2xl" />
          </button>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
