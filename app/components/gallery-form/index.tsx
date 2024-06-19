import { useEffect, useRef, useState } from "react";
import Input from "../input";
import { Overlay } from "../Overlay";
import { Form, useActionData, useFetcher } from "@remix-run/react";
import toast from "react-hot-toast";
import { useModelContext } from "../Modal";

const form_actions = [
  { title: "create", to: "/create" },
  { title: "edit", to: "/edit" },
];

const index = () => {
  const { closeModal }: any = useModelContext();
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();
  const submmitHandler = () => {
    const formData = new FormData(formRef.current!);
    formData.append("type", "add-gallery");

    fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    const responseData: any = fetcher.data;
    if (responseData) {
      responseData.error
        ? toast.error(responseData.message)
        : toast.success(responseData.message);

      if (!responseData.error) {
        formRef.current?.reset();
        closeModal();
      }
    }
  }, [fetcher.data]);

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="flex flex-col bg-white"
      ref={formRef}
    >
      <Input lable="name" required={true} />
      <Input lable="position" required={true} />
      <select
        name="gallery"
        id="gallery"
        className="px-6 py-3 w-full mt-4 mb-2 capitalize rounded-lg border border-slate-300 focus:border-blue-300 active:border-slate-300"
        required
        defaultValue={"candidate"}
      >
        <option value={"candidate"} className="capitalize">
          candidate
        </option>
        <option value={"faculty"} className="capitalize">
          faculty
        </option>
      </select>
      <Input
        lable="Upload"
        type="file"
        name="file"
        accept="image/png, image/gif, image/jpeg"
        required={true}
      />
      {/* <Input lable="Upload" type="file" name="file" accept="application/pdf" required/> */}
      <button
        onClick={(e) => {
          e.preventDefault();
          submmitHandler();
        }}
        className="bg-gray-700 text-white px-6 py-3 mt-2 rounded-lg outline outline-1 outline-slate-300 focus-within:outline-blue-400"
      >
        Submit
      </button>
    </Form>
    // </Overlay>
  );
};

export default index;
