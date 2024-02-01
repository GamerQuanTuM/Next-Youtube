"use client";

import React, { useEffect, useState } from "react";
import { Video } from "@prisma/client";
import VideoComponent from "@/components/VideoComponent";
import Suggestion from "@/components/Suggestion";
import { axiosInstance } from "@/utils/baseURL";
import { useParams } from "next/navigation";

export default function Video() {

  const [video, setVideo] = useState<Video | undefined>()

  const params = useParams();

  const id = Number(params.id);

  useEffect(() => {
    const getVideo = async () => {
      const {
        data: { message },
      } = (await axiosInstance.post("/video/get-video-by-id", {
        id,
      })) as { data: { message: Video } };

      if (message) {
        setVideo(message);
      } else {
        console.log("No video");
      }
    };
    getVideo();
  }, []);
  return (
    <main className="flex h-full">
      <div className="flex-1 overflow-y-auto h-[40rem] no-scroll pb-16">
        <VideoComponent video={video} />
      </div>
      <div className="w-[30%] h-full">
        <Suggestion categoryId={video?.categoryId } />
      </div>
    </main>
  );
}
