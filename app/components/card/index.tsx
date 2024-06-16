import { useFetcher } from "@remix-run/react";
import React, { MouseEventHandler } from "react";
import { MdDelete } from "react-icons/md";


interface CardProps {
    imageUrl: string;
    title: string;
    id:string
  }

  const Card = ({ imageUrl, title,id }:CardProps) => {
    const fetcher = useFetcher()
    const onDeleteHandler = () =>{
      const formData = new FormData()
      formData.append("type","delete-gallery")
      formData.append("id",id)
      fetcher.submit(formData,{method:"POST",encType:"multipart/form-data"})
    }
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50">
        <img className="w-full" src={imageUrl} alt={title} />
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="" onClick={()=>onDeleteHandler()}>
          <MdDelete size={21} color="red" />
          </p>
        </div>
      </div>
    );
  };

  export default Card;