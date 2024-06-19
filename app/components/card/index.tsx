import { useFetcher } from "@remix-run/react";
import React, { MouseEventHandler, useEffect } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

interface CardProps {
  imageUrl: string;
  title: string;
  id: string;
  position: string;
}

const Card = ({ imageUrl, title, id, position }: CardProps) => {
  const fetcher = useFetcher();
  const onDeleteHandler = () => {
    const formData = new FormData();
    formData.append("type", "delete-gallery");
    formData.append("id", id);
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
    }
  }, [fetcher.data]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50">
      <img
        className="max-w-[250px] aspect-square object-cover"
        src={imageUrl}
        alt={title}
      />
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl mb-2 flex flex-col">
          <p>{title}</p>
          <p>{position}</p>
        </div>
        <p className="" onClick={() => onDeleteHandler()}>
          <MdDelete size={21} color="red" />
        </p>
      </div>
    </div>
  );
};

export default Card;
