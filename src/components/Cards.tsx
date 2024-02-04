"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/baseURL";
import { Video } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";

type VideoLink = {
  id: number;
  link: string;
};

const Card = () => {
  const [playing, setPlaying] = useState(false);
  const [videoLinks, setVideoLinks] = useState<VideoLink[]>([]);

  const router = useRouter();

  const {userId} = useAuth();

  // useEffect(() => {
  //   const getAllVideos = async () => {
  //     const {
  //       data: { message },
  //     } = (await axiosInstance.get("video/get-all-videos")) as {
  //       data: { message: Video[] };
  //     };

  //     const videoLinks: VideoLink[] = [];

  //     message
  //       ? message?.map((video: Video) => {
  //           videoLinks.push({ id: video.id, link: video.video_url });
  //         })
  //       : videoLinks.push([]);

  //     setVideoLinks(videoLinks);
  //   };
  //   getAllVideos();
  // }, []);

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axiosInstance.get("video/get-all-videos");
        const videos: Video[] = response.data.message;
        
        const videoLinks: VideoLink[] = videos.map((video: Video) => ({
          id: video.id,
          link: video.video_url
        }));
  
        setVideoLinks(videoLinks);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
  
    getAllVideos();
  }, []);
  

  const handleMouseEnter = (index: number) => {
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      setPlaying(true);
      videoElement.play();
    }
  };

  const handleMouseLeave = (index: number) => {
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      setPlaying(false);
      videoElement.currentTime = 0;
      videoElement.pause();
      videoElement.muted = false; // Unmute when paused
    }
  };

  const videoRefs = useRef<Array<HTMLVideoElement | null>>(
    videoLinks?.map(() => null)
  );

  useEffect(() => {
    return () => {
      // Clean up event listeners
      videoRefs.current.forEach((videoElement, index) => {
        if (videoElement) {
          videoElement.removeEventListener("mouseenter", () =>
            handleMouseEnter(index)
          );
          videoElement.removeEventListener("mouseleave", () =>
            handleMouseLeave(index)
          );
        }
      });
    };
  }, []);

  return (
    <div className="mt-5 flex gap-5 flex-wrap mx-auto">
      {videoLinks?.map((link: VideoLink, i: number) => {
        return (
          <div
            key={i}
            className="w-[25rem] h-[15rem] min-w-[25rem] min-h-[15rem] cursor-pointer rounded-xl"
            onClick={() => router.push(`/${link.id}`)}
          >
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
                if (el) {
                  el.addEventListener("mouseenter", () => handleMouseEnter(i));
                  el.addEventListener("mouseleave", () => handleMouseLeave(i));
                }
              }}
              className="w-[25rem] h-[15rem] rounded-3xl"
              autoPlay
              muted={playing} // Mute when playing
            >
              <source src={link.link} type="video/mp4" />
            </video>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
