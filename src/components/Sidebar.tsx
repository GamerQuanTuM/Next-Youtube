"use client";

import { SetStateAction, useState } from "react";
import {
  MdHomeFilled,
  MdOutlineSubscriptions,
  MdOutlineWatchLater,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { SiYoutubemusic } from "react-icons/si";
import { FaAngleRight } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuHistory } from "react-icons/lu";
import { AiFillPlaySquare } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Sidebar() {
  const [activeIcon, setActiveIcon] = useState("Home");
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const handleIconClick = (iconName: SetStateAction<string>) => {
    setActiveIcon(iconName);
  };

  const isIconActive = (iconName: string) => activeIcon === iconName;

  return (
    <div
      className={`h-[88vh] overflow-y-auto ${
        isHover ? "scroller" : "no-scroll"
      } pt-5 pb-10`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Primary Icons */}
      <div className="flex flex-col items-center ">
        {/* Home Icon */}
        <div
          className={`flex px-[7.5%] items-center gap-7 cursor-pointer h-9 w-full hover:bg-gray-300/20 hover:rounded-xl ${
            isIconActive("Home") ? "bg-gray-300/20 rounded-xl" : ""
          }`}
          onClick={() => {
            handleIconClick("Home");
            router.push("/");
          }}
        >
          <MdHomeFilled className="w-7 h-7 " />
          <p className="text-base font-medium -ml-1">Home</p>
        </div>

        {/* Shorts Icon */}
        <div
          className={`flex px-[7.5%] items-center gap-7 cursor-pointer h-9 w-full hover:bg-gray-300/20 hover:rounded-xl ${
            isIconActive("Shorts") ? "bg-gray-300/20 rounded-xl" : ""
          }`}
          onClick={() => handleIconClick("Shorts")}
        >
          <SiYoutubeshorts className="w-6 h-6" />
          <p className="text-base font-medium">Shorts</p>
        </div>

        {/* Subscriptions Icon */}
        <div
          className={`flex px-[7.5%] items-center gap-7 cursor-pointer h-9 w-full hover:bg-gray-300/20 hover:rounded-xl ${
            isIconActive("Subscriptions") ? "bg-gray-300/20 rounded-xl" : ""
          }`}
          onClick={() => handleIconClick("Subscriptions")}
        >
          <MdOutlineSubscriptions className="w-6 h-6" />
          <p className="text-base font-medium">Subscriptions</p>
        </div>

        {/* Youtube Music Icon */}
        <div
          className={`flex px-[7.5%] items-center gap-7 cursor-pointer h-9 w-full hover:bg-gray-300/20 hover:rounded-xl ${
            isIconActive("Youtube Music") ? "bg-gray-300/20 rounded-xl" : ""
          }`}
          onClick={() => handleIconClick("Youtube Music")}
        >
          <SiYoutubemusic className="w-6 h-6" />
          <p className="text-base font-medium">Youtube Music</p>
        </div>
      </div>

      <div className="border-b-2 border-gray-200 mx-5 my-4" />

      <div>
        <div className="flex px-[7.5%] items-center gap-2 hover:bg-gray-300/20 hover:rounded-xl cursor-pointer h-9">
          <p className="text-lg">You</p>
          <FaAngleRight className="w-4 h-4" />
        </div>
        <div className="flex flex-col items-center mt-3">
          {/* Your Profile Icon */}
          <div
            className={`flex px-[7.5%] items-center gap-7 cursor-pointer h-9 w-full hover:bg-gray-300/20 hover:rounded-xl ${
              isIconActive("Your Profile") ? "bg-gray-300/20 rounded-xl" : ""
            }`}
            onClick={() => handleIconClick("Your Profile")}
          >
            <CgProfile className="w-6 h-6" />
            <p className="text-base font-medium">Your Profile</p>
          </div>

          {/* History Icon */}
          <div
            className={`flex px-[7.5%] items-center gap-7 cursor-pointer h-9 w-full hover:bg-gray-300/20 hover:rounded-xl ${
              isIconActive("History") ? "bg-gray-300/20 rounded-xl" : ""
            }`}
            onClick={() => handleIconClick("History")}
          >
            <LuHistory className="w-6 h-6" />
            <p className="text-base font-medium">History</p>
          </div>

          {/* Your Videos Icon */}
          <div
            className={`flex px-[7.5%] items-center gap-7 cursor-pointer h-9 w-full hover:bg-gray-300/20 hover:rounded-xl ${
              isIconActive("Your Videos") ? "bg-gray-300/20 rounded-xl" : ""
            }`}
            onClick={() => handleIconClick("Your Videos")}
          >
            <AiFillPlaySquare className="w-6 h-6" />
            <p className="text-base font-medium">Your Videos</p>
          </div>

          {/* Watch Later Icon */}
          <div
            className={`flex px-[7.5%] items-center gap-7 cursor-pointer h-9 w-full hover:bg-gray-300/20 hover:rounded-xl ${
              isIconActive("Watch Later") ? "bg-gray-300/20 rounded-xl" : ""
            }`}
            onClick={() => handleIconClick("Watch Later")}
          >
            <MdOutlineWatchLater className="w-6 h-6" />
            <p className="text-base font-medium">Watch Later</p>
          </div>

          {/* Downloads Icon */}
          <div
            className={`flex px-[7.5%] items-center gap-7 cursor-pointer h-9 w-full hover:bg-gray-300/20 hover:rounded-xl ${
              isIconActive("Downloads") ? "bg-gray-300/20 rounded-xl" : ""
            }`}
            onClick={() => handleIconClick("Downloads")}
          >
            <LiaDownloadSolid className="w-6 h-6" />
            <p className="text-base font-medium">Downloads</p>
          </div>

          {/* Show More Icon */}
          <div
            className={`flex px-[7.5%] items-center gap-7 cursor-pointer h-9 w-full hover:bg-gray-300/20 hover:rounded-xl ${
              isIconActive("Show More") ? "bg-gray-300/20 rounded-xl" : ""
            }`}
            onClick={() => handleIconClick("Show More")}
          >
            <FaAngleDown className="w-6 h-6" />
            <p className="text-base font-medium">Show More</p>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-gray-200 mx-5 my-4" />

      <div>
        <div className="px-[7.5%] text-base font-bold">Subscriptions</div>

        <div className="flex flex-col items-center mt-5">
          <div
            className={`flex px-[7.5%] items-center gap-8 cursor-pointer h-10 w-full hover:bg-gray-300/20 hover:rounded-xl`}
          >
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Sana_Minatozaki_for_Pearly_Gates_Korea_01.jpg/800px-Sana_Minatozaki_for_Pearly_Gates_Korea_01.jpg"
              }
              alt="Facebook.png"
              height={500}
              width={500}
              className="w-7 h-7 rounded-full object-cover"
            />
            <p className="text-base font-medium">Home</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
