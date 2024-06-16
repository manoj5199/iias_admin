import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/api/auth.server";

const index = () => {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};

export default index;
