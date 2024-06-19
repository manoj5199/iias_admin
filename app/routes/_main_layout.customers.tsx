import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
import { ObjectId } from "mongodb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { authenticator } from "~/api/auth.server";
import { customers } from "~/database/index.server";

export type LoaderDataType = {
  customerData: [
    {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      subject: string;
    }
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  let userData = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!userData) {
    return userData;
  }
  const customerData = await customers.find().toArray();
  return json({ customerData });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("type");
  if (type === "logout") {
    return await authenticator.logout(request, { redirectTo: "/login" });
  }
  if (type === "delete-customers") {
    let id = formData.get("id")?.toString();
    await customers.deleteOne({ _id: new ObjectId(id) });
    return json({ error: false, message: "deleted succes" });
  }
};

const index = () => {
  const fetcher = useFetcher();
  const { customerData } = useLoaderData<LoaderDataType>();

  const handleDelete = async (id: string) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("type", "delete-customers");
    fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });
  };

  return (
    <div className="flex justify-center items-center text-gray-800">
      <div className="w-10/12 pt-7">
        <h1 className="text-base sm:text-lg font-medium capitalize">
          customers
        </h1>
        <div className="h-[80dvh] overflow-y-scroll no-scrollbar">
          <div className="flex flex-col gap-4">
            {customerData.map((value, index) => {
              return (
                <div
                  key={index}
                  className="w-full rounded-md shadow flex overflow-hidden sm:gap-6 items-center bg-slate-50"
                >
                  <div className="flex-1 py-4 pl-8 min-w-[200px]">
                    <h1 className="font-medium text-xl text-gray-900 capitalize">
                      {value.firstname + " " + value.lastname}
                    </h1>
                    <p className="flex flex-wrap">email: {value.email}</p>
                    <p className="flex flex-wrap">subject: {value.subject}</p>
                  </div>
                  <p className="text-wrap pr-8">
                    <MdDelete
                      color="red"
                      size={25}
                      onClick={() => handleDelete(value._id)}
                    />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
