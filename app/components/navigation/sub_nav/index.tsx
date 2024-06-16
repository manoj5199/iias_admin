import { LinkProp } from "../navigation";
import SubNavItem from "./sub_nav_item";

const index = ({ data }: { data?: LinkProp[] }) => {
  return (
    <ul className="con md:absolute left-1/2 md:top-full md:-translate-x-1/2 h-0 overflow-hidden md:rounded-md md:shadow md:z-50 w-full md:w-max transition-all">
      {data?.map((item) => {
        return <SubNavItem key={item.title} title={item.title} to={item.to} />;
      })}
    </ul>
  );
};

export default index;
