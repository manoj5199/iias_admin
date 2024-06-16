import { NavItemDataProp } from "../navigation";
import NavItem from "../nav_item";
const index = ({ data }: { data?: NavItemDataProp[] }) => {
  return (
    <ul className="flex h-full flex-col md:flex-row md:items-center md:justify-center">
      {data?.map((item) => {
        return (
          <NavItem
            title={item.title}
            key={item.title}
            sub_nav={item.sub_nav}
            to={item.to}
          />
        );
      })}
    </ul>
  );
};

export default index;
