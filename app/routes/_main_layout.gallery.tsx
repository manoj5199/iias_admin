import Card from "~/components/card";
import { Modal } from "~/components/Modal";
import Form from "../components/gallery-form";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { gallery } from "~/database/index.server";
import { useState } from "react";
import { authenticator } from "~/api/auth.server";
import uploadFileToAWS from "~/api/upload.server";
import { ObjectId } from "mongodb";
import e from "express";

export type LoaderDataType = {
  galleryData: [
    { name: string; position: string; img_url: string; _id: string }
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  let userData = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!userData) {
    return userData;
  }
  const galleryData = await gallery.find().toArray();

  return json({ galleryData });
};

export const action = async ({ request, response }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("type")?.toString();

  if (type === "delete-gallery") {
    let id = formData.get("id")?.toString();
    const resp = await gallery
      .deleteOne({ _id: new ObjectId(id) })
      .then((v) => {
        let count = v.deletedCount;
        if (count <= 0) {
          throw new Error("Data not deleted.");
        }
        return { error: false, message: "deleted success." };
      })
      .catch((err) => {
        return { error: true, message: err.message };
      });
    return resp;
  }

  if (type === "add-gallery") {
    const name = formData.get("name")?.toString();
    const position = formData.get("position")?.toString();
    const galleryType = formData.get("gallery")?.toString();
    const upload = formData.get("Upload");
    let location = "gallery/";

    if (!name || !position || !galleryType || !upload) {
      return json({ error: true, message: "All fields required." });
    }

    if (!upload || typeof upload === "string") {
      return { error: true, message: "No file uploaded" };
    }

    const buffer = await upload.arrayBuffer();

    const filename = upload.name;

    if (galleryType === "candidate") {
      location = location + "success/" + filename;
    }
    if (galleryType === "faculty") {
      location = location + "faculty/" + filename;
    }
    var UArray = new Uint8Array(buffer);

    const payload = {
      type: "gallery",
      data: {
        name,
        position,
        type: galleryType,
      },
      location,
      Body: UArray,
    };

    const uploadData = await uploadFileToAWS(payload);
    // await gallery.insertOne(payload.data);
    return json({
      error: false,
      message: "Insert success",
      data: { ...uploadData! },
    });
  } else {
    return null;
  }
};

const index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { galleryData } = useLoaderData<LoaderDataType>();

  return (
    <>
      <div className="flex justify-center items-center text-gray-800">
        {isFormOpen && <Form closeHandler={() => setIsFormOpen(false)}></Form>}
        <div className="w-10/12 pt-7">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-base sm:text-lg font-medium capitalize">
              gallery
            </h1>
            <button
              className="bg-slate-900 rounded-md px-6 py-3 text-white capitalize"
              onClick={(_) => setIsFormOpen(true)}
            >
              add new
            </button>
          </div>
          <div className="h-[80dvh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-wrap gap-8 w-full">
              {galleryData.map((value, index) => (
                <Card
                  key={index}
                  imageUrl={value.img_url}
                  title={value.name}
                  id={value._id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
