import { NavLink } from "@remix-run/react";
import { NavItemDataProp } from "../navigation";
import SubNav from "../sub_nav";

const index = ({ title, to, sub_nav }: NavItemDataProp) => {
  return (
    <li className="w-full md:w-auto md:[&:hover>.con]:pt-4 [&:hover>a]:text-orange-500 [&:hover>.con]:h-fit md:[&:hover>.con]:h-max md:h-full flex relative flex-col">
      <NavLink
        to={to ? to! : "#"}
        className={({ isActive }) => {
          return `capitalize hover:cursor-pointer md:h-full flex items-center px-8 py-4 md:py-0 w-full ${
            isActive ? "text-orange-500" : ""
          }`;
        }}
      >
        {title}
      </NavLink>
      {sub_nav ? <SubNav data={sub_nav!} /> : null}
    </li>
  );
};

export default index;
