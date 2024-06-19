import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import {
  json,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { authenticator } from "~/api/auth.server";
import uploadFileToAWS from "~/api/upload.server";
import { Modal } from "~/components/Modal";
import Form from "~/components/form";
import { courses } from "~/database/index.server";

export type LodeDataType = {
  successCanditates: [{ name: string; position: string; img_url: string }];
  blogData: [
    { title: string; description: string; document: string; category: string }
  ];
  courseData: [
    {
      _id: string;
      title: string;
      description: string;
      duration: string;
      category: string;
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
  const courseData = await courses.find().toArray();

  return json({ courseData });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("type");
  let payload = null;

  if (type === "delete-courses") {
    let id = formData.get("id")?.toString();
    await courses.deleteOne({ _id: new ObjectId(id) });
    return json({ error: false, message: "deleted succes" });
  }
  if (type === "add-courses") {
    const title = formData.get("title");
    const description = formData.get("description");
    const duration = formData.get("duration");
    const category = formData.get("category");

    if (!title || !description || !category) {
      return json({ error: true, message: "All fields required." });
    }

    payload = {
      type: "courses",
      data: {
        title,
        description,
        duration,
        category,
      },
    };
    await courses.insertOne(payload.data);
    return json({
      error: false,
      message: "Insert success",
      data: payload!.data,
    });
  } else {
    return null;
  }
};

const index = () => {
  const fetcher = useFetcher();
  const { courseData } = useLoaderData<LodeDataType>();

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("type", "delete-courses");
    fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });
  };

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <div className="flex justify-center items-center text-gray-800">
      <div className="w-10/12 pt-7">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-base sm:text-lg font-medium capitalize">
            courses
          </h1>
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
              <Form />
              {/* <Modal.Close>
              <button className="bg-gray-900 rounded-md px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-2 text-gray-200 capitalize text-sm md:text-base lg:text-lg">Close</button>
            </Modal.Close> */}
            </Modal.Window>
          </Modal>
        </div>
        <div className="h-[80dvh] overflow-y-scroll no-scrollbar">
          <div className="flex flex-col gap-4">
            {courseData.map((value, index) => {
              return (
                <div
                  key={index}
                  className="w-full rounded-md shadow flex overflow-hidden gap-6 items-center bg-slate-50"
                >
                  <div className="flex-1 py-4 px-8">
                    <h1 className="font-medium text-xl text-gray-900 capitalize">
                      {value.title}
                    </h1>
                    <p className="capitalize font-medium text-gray-500 text-xs mb-2">
                      duration: <span>{value.duration}</span>
                    </p>
                    <p>{value.description}</p>
                    <p>{value.category}</p>
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
