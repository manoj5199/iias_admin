export type LinkProp = { to?: string; title: string };
export type NavItemDataProp = {
  to?: string;
  title: string;
  sub_nav?: LinkProp[];
};
