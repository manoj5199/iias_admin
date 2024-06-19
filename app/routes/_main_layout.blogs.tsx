import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import {
  json,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal } from "~/components/Modal";
import Form from "~/components/form";
import BlogForm from "~/components/blogform";
import uploadFileToAWS from "~/api/upload.server";
import { blogs } from "~/database/index.server";
import { authenticator } from "~/api/auth.server";
import { MdDelete } from "react-icons/md";
import { ObjectId } from "mongodb";

export type LodeDataType = {
  successCanditates: [{ name: string; position: string; img_url: string }];
  blogData: [
    {
      _id: string;
      title: string;
      description: string;
      document: string;
      category: string;
      fileName: String;
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
  const blogData = await blogs.find().toArray();

  return json({ blogData });
};

export const action = async ({ request, response }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("type");
  if (type === "logout") {
    return await authenticator.logout(request, { redirectTo: "/login" });
  }

  if (type === "delete-blogs") {
    let id = formData.get("id")?.toString();
    await blogs.deleteOne({ _id: new ObjectId(id) });
    return json({ error: false, message: "deleted succes" });
  }

  if (type === "add-blogs") {
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const Upload: any = formData.get("upload");
    let location = "pdf/";

    if (!title || !description || !category || !(Upload.size > 0)) {
      return json({ error: true, message: "All fields required." });
    }

    if (!Upload || typeof Upload === "string") {
      return { error: false, message: "No file uploaded" };
    }

    const buffer = await Upload.arrayBuffer();

    const fileName = Upload.name;

    if (category === "current affairs") {
      location = location + "current_affairs/" + fileName;
    }
    if (category === "general studies") {
      location = location + "general_studies/" + fileName;
    }
    if (category === "optional") {
      location = location + "optional/" + fileName;
    }
    let UArray = new Uint8Array(buffer);

    const payload = {
      type: "blogs",
      data: {
        title,
        description,
        category,
        fileName,
      },
      location,
      Body: UArray,
    };

    console.log(payload);
    //Process the uploaded file here
    const uploadData = await uploadFileToAWS(payload);
    // await blogs.insertOne(payload.data);
    return json({
      error: false,
      message: "Insert success",
      data: payload!.data,
    });
  }
  return json({});
};

const index = () => {
  const fetcher = useFetcher();
  const { blogData } = useLoaderData<LodeDataType>();

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("type", "delete-blogs");
    fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });
  };

  const actionData = useActionData<{
    title: string;
    description: string;
    document: string;
  }>();

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <div className="flex justify-center items-center text-gray-800">
      <div className="w-10/12 pt-7">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-base sm:text-lg font-medium capitalize">blogs</h1>
          <Modal>
            <Modal.Open>
              <button
                className="bg-gray-900 rounded-md px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-2 text-gray-200 capitalize text-sm md:text-base lg:text-lg"
                onClick={toggleModal}
              >
                add new
              </button>
            </Modal.Open>
            <Modal.Window>
              <BlogForm />
              {/* <Modal.Close>
              <button className="bg-gray-900 rounded-md px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-2 text-gray-200 capitalize text-sm md:text-base lg:text-lg">Close</button>
            </Modal.Close> */}
            </Modal.Window>
          </Modal>
        </div>
        <div className="h-[80dvh] overflow-y-scroll no-scrollbar">
          <div className="flex flex-col gap-4">
            {blogData.map((value, index) => {
              return (
                <div
                  key={index}
                  className="w-full rounded-md shadow flex overflow-hidden sm:gap-6 items-center bg-slate-50"
                >
                  <div className="flex-1 py-4 pl-8">
                    <h1 className="font-medium text-xl text-gray-900 capitalize">
                      {value.title}
                    </h1>
                    <p className="capitalize font-medium text-gray-500 text-xs mb-2 flex-wrap">
                      document: <span className="">{value?.fileName}</span>
                    </p>
                    <p>{value.description}</p>
                  </div>
                  <p className="text-wrap pr-2 sm:pr-8">
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
