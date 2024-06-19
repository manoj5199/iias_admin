import { Form, Link, useActionData, useFetcher } from "@remix-run/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Input from "./input";
import { useModelContext } from "./Modal";
import TextArea from "../components/textarea";
const form_actions = [
  { title: "create", to: "/create" },
  { title: "edit", to: "/edit" },
];

const index = () => {
  const fetcher = useFetcher();
  const modal = useModelContext();
  const formRef = useRef<HTMLFormElement>(null);
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
    if (fetcher.data) {
      modal!.closeModal();
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form method="POST" ref={formRef}>
      <Input lable="title" required />
      <TextArea lable="description" required />
      <Input lable="duration" required />
      <Input lable="category" required />
      <button
        className="bg-gray-700 text-white rounded-md px-6 py-3 mt-2"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        Submit
      </button>
    </fetcher.Form>
  );
};

export default index;
