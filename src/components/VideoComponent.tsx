"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { IoIosShareAlt } from "react-icons/io";
import { RiDownloadLine } from "react-icons/ri";
import {
  RiThumbUpFill,
  RiThumbUpLine,
  RiThumbDownFill,
  RiThumbDownLine,
} from "react-icons/ri";
import { Channel, User, Video, Comment } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";

// import { comments } from "@/constants/data";
import { axiosInstance } from "@/utils/baseURL";

type CurrentUser = User & {
  Channel: Channel;
  Video: Video[];
  Comment: Comment[];
};

type ExtendedComment = Comment & {
  user: User & {
    Channel: Channel;
  };
  video: Video;
};

export default function VideoComponent({
  video,
}: {
  video: Video | undefined;
}) {
  const [videoLiked, setVideoLiked] = useState(false);
  const [videoDisliked, setVideoDisLiked] = useState(false);
  const [input, setInput] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [channel, setChannel] = useState<Channel | undefined>();
  const [comments, setComments] = useState<ExtendedComment[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [flag, setFlag] = useState(false);

  let storedViewCount: string | null = null;

  if (typeof window !== "undefined") {
    storedViewCount = localStorage.getItem("viewCount");
  }
  const defaultViewCount = video?.views.toString(); // Convert the default value to a string

  const [viewCount, setViewCount] = useState(
    storedViewCount ? parseInt(storedViewCount) : parseInt(defaultViewCount!)
  );
  const [hasPlayed, setHasPlayed] = useState(false);

  const videoRef: React.RefObject<HTMLVideoElement> = useRef(null);

  const { userId } = useAuth();
  const params = useParams();
  const id = Number(params.id);

  const updateViewCount = () => {
    const updatedViewCount = viewCount + 1;
    setViewCount(updatedViewCount);
    localStorage.setItem("viewCount", updatedViewCount.toString());
    console.log("View count updated:", updatedViewCount);
  };

  const videoClicked = () => {
    if (!hasPlayed) {
      updateViewCount();
      setHasPlayed(true);
    }
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

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

  useEffect(() => {
    const getChannel = async () => {
      try {
        const {
          data: { message },
        } = await axiosInstance.post("/channel/get-channel-by-id", {
          clerk_id: video?.userId,
        });

        setChannel(message);
      } catch (error) {
        console.error(error);
      }
    };

    getChannel();
  }, []);

  const formattedDate = (date: Date) => {
    const day = date.getDate(); // Get the day of the month

    const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
    const year = date.getFullYear();

    let monthInWords;
    if (month === 1) {
      monthInWords = "January";
    } else if (month === 2) {
      monthInWords = "February";
    } else if (month === 3) {
      monthInWords = "March";
    } else if (month === 4) {
      monthInWords = "April";
    } else if (month === 5) {
      monthInWords = "May";
    } else if (month === 6) {
      monthInWords = "June";
    } else if (month === 7) {
      monthInWords = "July";
    } else if (month === 8) {
      monthInWords = "August";
    } else if (month === 9) {
      monthInWords = "September";
    } else if (month === 10) {
      monthInWords = "October";
    } else if (month === 11) {
      monthInWords = "November";
    } else if (month === 12) {
      monthInWords = "December";
    }
    return `${day < 10 ? `0${day}` : day} ${monthInWords} ${year}`;
  };

  useEffect(() => {
    const dbUser = async () => {
      try {
        const {
          data: { message },
        } = (await axiosInstance.post("/user/get-user", {
          clerk_id: userId,
        })) as { data: { message: CurrentUser } };
        setCurrentUser(message);
      } catch (error) {
        console.log(error);
      }
    };

    dbUser();
  }, []);

  const handleComment = async () => {
    try {
      await axiosInstance.post("/comment/upload-comment", {
        comment: input,
        userId: currentUser?.id,
        videoId: video?.id,
      });

      // Assuming you want to clear the input field after a successful comment upload
      setInput("");
      setFlag(true);
    } catch (error) {
      console.error("Error uploading comment:", error);
    }
  };

  useEffect(() => {
    if (channel) {
      if (channel?.subscribe?.includes(currentUser?.id!)) {
        setSubscribed(true);
      } else {
        setSubscribed(false);
      }
    }
  }, [channel, currentUser?.id])

  const handleSubscribe = async () => {
    try {
      if (currentUser?.id && channel) {
        if (subscribed) {
          // If user is subscribed, unsubscribe
          await axiosInstance.post("/channel/unsubscribe", {
            userId: currentUser?.id,
            id: channel.id,
          });
          setSubscribed(false); // Update state to reflect unsubscribed
        } else {
          // If user is not subscribed, subscribe
          await axiosInstance.post("/channel/subscribe", {
            userId: currentUser?.id,
            id: channel.id,
          });
          setSubscribed(true); // Update state to reflect subscribed
        }
      }
    } catch (error) {
      console.error("Error handling subscription:", error);
    }
  };

  useEffect(() => {
    const getAllCommentsByVideo = async () => {
      const {
        data: { message },
      } = (await axiosInstance.post("/comment/get-comments-by-video", {
        videoId: id,
      })) as { data: { message: ExtendedComment[] } };
      setComments(message);
    };
    getAllCommentsByVideo();
  }, [flag]);

  return (
    <div className="mx-3">
      <div className="w-full h-[30rem] cursor-pointer">
        {video?.video_url && (
          <video
            controls
            // autoPlay
            className="rounded-3xl h-full w-full"
            ref={videoRef}
            // onClick={videoClicked}
          >
            <source src={video?.video_url} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="w-full">
        {/* Video Title */}
        <h1 className="text-lg font-bold my-5">{video?.title}</h1>

        {/* Channel Desc And Video Likes */}
        <div className="flex justify-between my-7">
          <div className="flex gap-3 items-center">
            {channel && (
              <Image
                alt="image.png"
                src={channel?.image_url!}
                height={500}
                width={500}
                className="h-9 w-9 rounded-full"
              />
            )}

            <div className="flex flex-col justify-center">
              <h1 className="text-base font-bold">{channel?.name}</h1>
              <h1 className="text-xs font-medium">
                {channel?.subscribe?.length} subscribers
              </h1>
            </div>

            <button
              onClick={handleSubscribe}
              className={`${
                subscribed ? "bg-gray-500" : "bg-black hover:bg-gray-900"
              } px-3 py-1 rounded-3xl text-white ml-2`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className="flex gap-3 items-center relative">
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
                <h1>{video?.likes.length}</h1>
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
                <span>{formattedDate(new Date(video?.createdAt ?? ""))}</span>
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
                {video?.views} views&nbsp;&nbsp;
                <span>{formattedDate(new Date(video?.createdAt ?? ""))}</span>
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
        {userId ? (
          <div className="mt-7">
            <h1 className="text-2xl font-bold">24 Comments</h1>

            <div className="mt-5 flex gap-3 relative">
              <Image
                src={currentUser?.Channel?.image_url as string}
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
                  onClick={handleComment}
                  disabled={input.length === 0}
                  className={`rounded-3xl text-white text-center h-8 w-24 
                ${
                  input.length > 0 ? "bg-blue-700" : "bg-gray-100 text-gray-500"
                }`}
                >
                  Comment
                </button>
                <button
                  // className={`${isInputFocused ? "" : "hidden"}`}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Subscribers Comment */}
            <div className="mt-10">
              {comments.length > 0 ? (
                comments.map((comment: ExtendedComment, i) => (
                  <div key={i} className="flex gap-3 mt-7">
                    <Image
                      src={comment.user.Channel.image_url as string}
                      alt="image.png"
                      className="w-12 h-12 rounded-full"
                      height={500}
                      width={500}
                    />

                    <div className="flex flex-col justify-center gap-1">
                      <h1 className="font-bold text-sm break-all">
                        @{comment.user.Channel.name}&nbsp;&nbsp;
                        <span className="font-normal text-gray-600 pt-0.5 text-xs">
                          {formattedDate(new Date(comment?.createdAt ?? ""))}
                        </span>
                      </h1>
                      <p>{comment?.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-12 text-gray-500 text-center text-4xl font-bold">
                  This Video has no comments
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-12 text-gray-500 text-center text-4xl font-bold">
            Log in to comment in these video
          </div>
        )}
      </div>
    </div>
  );
}

//
