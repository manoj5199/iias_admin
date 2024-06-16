import { useEffect, useRef, useState } from "react";
import Input from "../input";
import { Overlay } from "../Overlay";
import { Form , useActionData, useFetcher } from "@remix-run/react";


const form_actions = [
  { title: "create", to: "/create" },
  { title: "edit", to: "/edit" },
];

const index = ({ overlay }: { overlay?: boolean }) => {
  const [contactModal, setContactModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  // const actionData = useActionData()
  const fetcher = useFetcher()
const submmitHandler = ()=>{
  const formData = new FormData(formRef.current!)
  formData.append("type","add-gallery")

  fetcher.submit(formData, {method:"POST", encType:"multipart/form-data"})
}

  useEffect(() => {
    let click = (e: any) => {
      if (formRef.current && !formRef.current.contains(e.target!)) {
        setContactModal(false);
      }
    };
    addEventListener("click", click, true);

    return () => {
      removeEventListener("click", click);
    };
  }, []);

  useEffect(() => {
    let drag = (e: any) => {
      setContactModal(false);
    };
    window.addEventListener("resize", drag, true);
    return () => {
      removeEventListener("drag", drag);
    };
  }, []);
  //actionData
  useEffect(() => {
    if (fetcher.data) {
      formRef.current?.reset();
      setContactModal(false);
    }
  }, [fetcher.data]);
  let Form_1 = (
  <Form
      method="post"
      encType="multipart/form-data"
      className="flex flex-col bg-white rounded-md p-6"
      ref={formRef}
    >
      <Input lable="name" />
      <Input lable="position" />
      <select
        name="gallery"
        id="gallery"
        className="px-6 py-3 w-full mt-4 mb-2 border-2"
      >
        <option value={"none"} selected disabled hidden>
          select
        </option>
        <option value={"candidate"}>candidate</option>
        <option value={"faculty"}>faculty</option>
      </select>
      <Input
        lable="Upload"
        type="file"
        name="file"
        accept="image/png, image/gif, image/jpeg"
        required
      />
      {/* <Input lable="Upload" type="file" name="file" accept="application/pdf" required/> */}
      <button
       onClick={(e)=>{
        e.preventDefault()
        console.log("hello losu")
        submmitHandler()
       }}
        className="bg-gray-700 text-white px-6 py-3 mt-2 rounded-lg outline outline-1 outline-slate-300 focus-within:outline-blue-400"
      >
        Submit
      </button>
    </Form>)

  if (!overlay) {
    return Form_1;
  }
  if (overlay && contactModal) {
    return <Overlay children={Form_1} />;
  } else {
    return <button className="bg-slate-900 rounded-md px-6 py-3 text-white capitalize" onClick={(_)=>setContactModal(true)}>add new</button>;
  }
};

export default index;