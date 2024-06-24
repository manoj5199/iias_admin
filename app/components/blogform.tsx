import { Form, useActionData, useFetcher } from "@remix-run/react";
import React, {
  FormEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "./input";
import { useModelContext } from "./Modal";
import toast from "react-hot-toast";

const index = () => {
  const { closeModal }: any = useModelContext();
  const fileUpload = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();

  const submitHandler = () => {
    // console.log("test", fileUpload.current?.files)

    if (
      fileUpload &&
      fileUpload.current &&
      fileUpload.current.files &&
      fileUpload.current!.files![0]
    ) {
      var size = parseFloat(
        (fileUpload.current!.files![0].size / 1024).toString()
      );
      if (size > 5 * 1024) {
        return alert("File size should less than 5MB.");
      }
    } else {
      return alert("error message.");
    }
    const formData = new FormData(formRef.current!);
    formData.append("type", "add-blogs");

    fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });
  };

  const modal = useModelContext();
  const loading = fetcher.state === "submitting";

  const actionData = useActionData<{
    title: string;
    description: string;
    document: string;
  }>();

  useEffect(() => {
    const responseData: any = fetcher.data;
    if (responseData) {
      responseData.error
        ? toast.error(responseData.message)
        : toast.success(responseData.message) && closeModal();
    }
  }, [fetcher.data]);
  return (
    <fetcher.Form ref={formRef}>
      <Input lable="title" required={true} />
      <Input lable="description" required={true} />
      <select
        name="category"
        id="category"
        className="px-6 py-3 w-full mt-4 mb-2 border-2"
        required={true}
      >
        <option value={"current affairs"} selected>
          current affairs
        </option>
        <option value={"general studies"}>general studies</option>
        <option value={"optional"}>optional</option>
      </select>
      {/* <Input lable="Upload" type="file" name="file" accept="application/pdf" ref={fileUpload} required /> */}
      <input
        type="file"
        name="upload"
        accept="application/pdf"
        ref={fileUpload}
        required={true}
        className="w-full"
      />

      <button
        className="bg-gray-700 text-white px-6 py-3 mt-2 rounded-lg outline outline-1 outline-slate-300 focus-within:outline-blue-400"
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        {loading ? "please wait" : "Submit"}
      </button>
    </fetcher.Form>
  );
};

export default index;
