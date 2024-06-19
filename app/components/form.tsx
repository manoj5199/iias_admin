import { Form, Link, useActionData, useFetcher } from "@remix-run/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Input from "./input";
import { useModelContext } from "./Modal";
import TextArea from "../components/textarea";
import toast from "react-hot-toast";

const index = () => {
  const fetcher = useFetcher();
  const { closeModal }: any = useModelContext();
  const formRef = useRef<HTMLFormElement>(null);
  const loading = fetcher.state === "submitting";
  const actionData = useActionData<{
    title: string;
    description: string;
    duration: string;
    category?: string;
  }>();
  const onSubmitHandler = () => {
    let formData = new FormData(formRef.current!);
    formData.append("type", "add-courses");

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
        : toast.success(responseData.message) && closeModal();
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form method="POST" ref={formRef}>
      <Input lable="title" required={true} />
      <TextArea lable="description" required={true} />
      <Input lable="duration" required={true} />
      <Input lable="category" required={true} />
      <button
        className="bg-gray-700 text-white px-6 py-3 mt-2 rounded-lg outline outline-1 outline-slate-300 focus-within:outline-blue-400"
        disabled={loading}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        {loading ? "please wait" : "Submit"}
      </button>
    </fetcher.Form>
  );
};

export default index;
