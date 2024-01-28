import React from "react";
import { channel, video } from "@/constants/data";

export default function Suggestion() {
  return (
    <div className="w-[90%] mr-5 space-y-4">
      <div className="flex gap-2">
        <div className="w-[14rem] h-auto cursor-pointer">
          <video className="w-full h-auto rounded-xl">
            <source src={video.link} type="video/mp4" />
          </video>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="brek-all font-bold text-sm">
            {video?.description?.substring(0, 55)} ...
          </h1>
          <h2 className="text-gray-500 text-xs">{channel?.name}</h2>
          <h2 className="text-gray-500 text-xs">
            {video?.views} likes views • <span>{video?.createdAt}</span>
          </h2>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-[14rem] h-auto cursor-pointer">
          <video className="w-full h-auto rounded-xl">
            <source src={video.link} type="video/mp4" />
          </video>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="brek-all font-bold text-sm">
            {video?.description?.substring(0, 55)} ...
          </h1>
          <h2 className="text-gray-500 text-xs">{channel?.name}</h2>
          <h2 className="text-gray-500 text-xs">
            {video?.views} likes views • <span>{video?.createdAt}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
