import React from "react";
import VideoComponent from "../../../components/VideoComponent";
import Suggestion from "../../../components/Suggestion";

export default function Video() {
  return (
    <main className="flex h-full">
      <div className="flex-1 overflow-y-auto h-[40rem] no-scroll pb-16">
        <VideoComponent />
      </div>
      <div className="w-[40%] h-full">
        <Suggestion />
      </div>
    </main>
  );
}
