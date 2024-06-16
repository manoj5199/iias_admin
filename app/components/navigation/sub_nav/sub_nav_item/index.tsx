import { NavLink } from "@remix-run/react";
import { LinkProp } from "../../navigation";

const index = ({ title, to }: LinkProp) => {
  return (
    <li className="[&:hover>*]:text-orange-500 hover:bg-gray-100">
      <NavLink to={to ? to : "#"} className="block capitalize px-8 py-3">
        {title}
      </NavLink>
    </li>
  );
};

export default index;
