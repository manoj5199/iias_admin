import {
  ActionFunctionArgs,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { authenticator } from "~/api/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Integrations" },
    { name: "description", content: "Welcome to Integrations!" },
  ];
};

export const loader = ({}: LoaderFunctionArgs) => {
  return redirect("/dashboard");
};
export default function Index() {
  return <></>;
}
