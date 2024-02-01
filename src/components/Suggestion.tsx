"use client";
import React, { useEffect, useState } from "react";
import { channel } from "@/constants/data";
import { axiosInstance } from "@/utils/baseURL";
import { Video } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function Suggestion({
  categoryId,
}: {
  categoryId: Number | undefined | null;
}) {
  const [suggestedVideo, setSuggestedVideo] = useState<Video[] | []>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchSuggestedVideos = async () => {
      if (categoryId !== undefined && categoryId !== null) {
        try {
          const response = await axiosInstance.post("/video/suggested-video", {
            categoryId: categoryId,
          });
          const { message } = response.data;
          setSuggestedVideo(message);
        } catch (error) {
          console.error("Error fetching suggested videos:", error);
        }
      }
    };

    fetchSuggestedVideos();
  }, [categoryId]); // Run useEffect whenever categoryId changes

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
  return (
    <div className="w-[90%] mr-5 space-y-4">
      {categoryId &&
        suggestedVideo.map((video) => (
          <div
            className="flex gap-2 cursor-pointer"
            key={video.id}
            onClick={() => router.push(`/${video?.id}`)}
          >
            <div className="w-[11rem] min-w-[11rem] h-auto cursor-pointer">
              <video className="w-full h-auto rounded-xl">
                <source src={video.video_url} type="video/mp4" className="w-full h-auto" />
              </video>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="break-all font-bold text-xs">
                {video?.description?.substring(0, 55)} ...
              </h1>
              <h2 className="text-gray-500 text-xs">{channel?.name}</h2>
              <h2 className="text-gray-500 text-xs">
                {video?.views} likes views •{" "}
                <span>{formattedDate(new Date(video?.createdAt ?? ""))}</span>
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
}
