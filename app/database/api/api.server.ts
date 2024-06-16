import { nav_collection } from "../index.server";

type LinkProp = { to?: string; title: string };
type NavItemDataProp = {
  to?: string;
  title: string;
  sub_nav?: LinkProp[];
} | any;


let routerData: NavItemDataProp[] = [
  { title: "about us", to: "/about" },
  {
    title: "courses",
    to: "/courses",
  },
  {
    title: "courses",
    to: "/courses",
    sub_nav: [
      {
        title: "java master class",
      },
      {
        title: "Selenium java for begineors",
      },
      {
        title: "10 - days of java",
      },
    ],
  },
];

const insertData = async() => {
  await nav_collection.insertMany(routerData)
}

export const getRouterData = async (): Promise<NavItemDataProp[]> => {
  // await insertData();
  // TODO: get the data from database return after awaiting  
  routerData = await nav_collection.find().toArray();
  return routerData;
};

