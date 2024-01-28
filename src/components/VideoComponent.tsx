"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoIosShareAlt } from "react-icons/io";
import { RiDownloadLine } from "react-icons/ri";
import {
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownFill,
  RiThumbDownLine,
} from "react-icons/ri";

import { channel, video, comments } from "@/constants/data";

export default function VideoComponent() {
  const [videoLiked, setVideoLiked] = useState(false);
  const [videoDisliked, setVideoDisLiked] = useState(false);
  const [input, setInput] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleCancel = () => {
    setIsInputFocused(false);
    setInput("");
  };

  const handleLiked = () => {
    if (videoLiked) {
      setVideoLiked(false); // Unlike if already liked
    } else {
      setVideoLiked(true); // Like if not already liked
      setVideoDisLiked(false); // Remove dislike if liked
    }
  };

  const handleDisliked = () => {
    if (videoDisliked) {
      setVideoDisLiked(false); // Remove dislike if already disliked
    } else {
      setVideoDisLiked(true); // Dislike if not already disliked
      setVideoLiked(false); // Remove like if disliked
    }
  };
  return (
    <div className="mx-3">
      <div className="w-full h-[30rem] cursor-pointer">
        <video controls autoPlay className="rounded-3xl h-full w-full">
          <source src={video?.link} type="video/mp4" />
        </video>
      </div>

      <div className="w-full">
        {/* Video Title */}
        <h1 className="text-lg font-bold my-5">{video?.title}</h1>

        {/* Channel Desc And Video Likes */}
        <div className="flex justify-between my-7">
          <div className="flex gap-5 items-center">
            <Image
              alt="image.png"
              src="https://yt3.ggpht.com/aAfrvaGKSmk8cOLaXWjPih-ANSQhUz8a3dfzdkPXnnEYW_YHwwq32AvWpomt1F8PwinkrGWr=s88-c-k-c0x00ffffff-no-rj"
              height={500}
              width={500}
              className="h-9 w-9 rounded-full"
            />

            <div className="flex flex-col justify-center">
              <h1 className="text-base font-bold">{channel.name}</h1>
              <h1 className="text-xs font-medium">
                {channel.subscribers} subscribers
              </h1>
            </div>

            <button
              className={`bg-black hover:bg-gray-900 px-3 py-1 rounded-3xl text-white ml-5`}
            >
              Subscribe
            </button>
          </div>

          <div className="flex gap-5 items-center relative">
            <div className="flex w-36 h-10 bg-slate-200/80  rounded-3xl">
              <button
                className="flex items-center gap-2 hover:bg-slate-300/80 w-[60%] rounded-l-3xl border-r-[1px] border-solid border-gray-400/20 pl-4"
                onClick={handleLiked}
              >
                {videoLiked ? (
                  <RiThumbUpFill className="w-6 h-6" />
                ) : (
                  <RiThumbUpLine className="w-6 h-6" />
                )}
                <h1>{video?.likes}</h1>
              </button>
              <button
                className="flex-1 hover:bg-slate-300/80 hover:rounded-r-3xl pl-3"
                onClick={handleDisliked}
              >
                {videoDisliked ? (
                  <RiThumbDownFill className="w-6 h-6" />
                ) : (
                  <RiThumbDownLine className="w-6 h-6" />
                )}
              </button>
            </div>

            <button className="rounded-3xl bg-slate-200/80 hover:bg-slate-300/80 flex items-center justify-center px-3 w-28 h-10  gap-4">
              <IoIosShareAlt className="w-6 h-6" />
              <h1>Share</h1>
            </button>

            <button className="rounded-3xl bg-slate-200/80 hover:bg-slate-300/80 flex items-center justify-center px-3 w-32 h-10  gap-4">
              <RiDownloadLine className="w-6 h-6" />
              <h1>Download</h1>
            </button>
          </div>
        </div>

        {/* Video Description */}
        <div
          className={`transition-transform duration-500 overflow-hidden ${
            showMore ? "h-auto" : "min-h-20"
          }`}
        >
          {!showMore ? (
            <div className="bg-slate-200/80 w-full rounded-xl py-3 px-4">
              <h1 className="text-sm font-bold">
                {video?.views} views&nbsp;&nbsp;
                <span>{video?.createdAt}</span>
              </h1>
              <h2 className="mt-3">
                {video?.description.substring(0, 125)} ...
              </h2>

              <p
                className="mt-4 font-semibold cursor-pointer"
                onClick={() => setShowMore(true)}
              >
                more...
              </p>
            </div>
          ) : (
            <div className="bg-slate-200/80 w-full rounded-xl py-3 px-4 transition-all">
              <h1 className="text-sm font-bold">
                {video?.views}&nbsp;&nbsp;
                <span>{video?.createdAt}</span>
              </h1>
              <h2 className="mt-3">{video?.description}</h2>
              <div className="border-2 border-dashed border-black/50 my-5" />

              <div className="">
                {video?.tags.map((tag, i) => (
                  <div key={i} className="text-blue-500">
                    #{tag}
                  </div>
                ))}
              </div>

              <p
                className="mt-4 font-semibold cursor-pointer"
                onClick={() => setShowMore(false)}
              >
                less...
              </p>
            </div>
          )}
        </div>

        {/*Comments */}
        <div className="mt-7">
          <h1 className="text-2xl font-bold">24 Comments</h1>

          <div className="mt-5 flex gap-3 relative">
            <Image
              src="https://yt3.ggpht.com/aAfrvaGKSmk8cOLaXWjPih-ANSQhUz8a3dfzdkPXnnEYW_YHwwq32AvWpomt1F8PwinkrGWr=s88-c-k-c0x00ffffff-no-rj"
              alt="image.png"
              className="w-10 h-10 rounded-full"
              height={500}
              width={500}
            />
            <input
              placeholder="Add a comment..."
              className="border-b-[1px] border-solid border-gray-300/200 outline-none w-full absolute left-12 px-3"
              onChange={(e) => setInput(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={input}
            />
            <div className="flex gap-5 items-center absolute right-0 top-9">
              <button
                disabled={input.length === 0}
                className={`rounded-3xl text-white text-center h-8 w-24 ${
                  isInputFocused ? "" : "hidden"
                } ${
                  input.length > 0 ? "bg-blue-700" : "bg-gray-100 text-gray-500"
                }`}
              >
                Comment
              </button>
              <button
                className={`${isInputFocused ? "" : "hidden"}`}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Subscribers Comment */}
          <div className="mt-10">
            {comments.map((comment, i) => (
              <div key={i} className="flex gap-3 mt-7">
                <Image
                  src="https://yt3.ggpht.com/aAfrvaGKSmk8cOLaXWjPih-ANSQhUz8a3dfzdkPXnnEYW_YHwwq32AvWpomt1F8PwinkrGWr=s88-c-k-c0x00ffffff-no-rj"
                  alt="image.png"
                  className="w-12 h-12 rounded-full"
                  height={500}
                  width={500}
                />

                <div className="flex flex-col justify-center gap-1">
                  <h1 className="font-bold text-sm break-all">
                    @{comment?.name}&nbsp;&nbsp;
                    <span className="font-normal text-gray-600 pt-0.5 text-xs">
                      {comment?.createdAt}
                    </span>
                  </h1>
                  <p>{comment?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

//
