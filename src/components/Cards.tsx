"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { videoLinks } from "@/constants/data";

const Card = () => {
  const [playing, setPlaying] = useState(false);

  const router = useRouter();

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
    <div className="mt-5 flex gap-5 flex-wrap ml-3">
      {videoLinks?.map((link, i) => (
        <div
          key={i}
          className="w-[25rem] h-[15rem] cursor-pointer"
          onClick={() => router.push(`/${i}}`)}
        >
          <video
            ref={(el) => {
              videoRefs.current[i] = el;
              if (el) {
                el.addEventListener("mouseenter", () => handleMouseEnter(i));
                el.addEventListener("mouseleave", () => handleMouseLeave(i));
              }
            }}
            className="w-full h-full rounded-3xl"
            autoPlay
            muted={playing} // Mute when playing
          >
            <source src={link} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default Card;
