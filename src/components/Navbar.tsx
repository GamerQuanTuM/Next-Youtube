"use client";

import Image from "next/image";
import { useState } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Video } from "@prisma/client";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { MdOutlineVideoCall } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";

import Facebook from "../../public/Facebook.png";
import { useSearchResultsStore } from "@/app/context/SearchResultStore";
import { useOpenSidebar } from "../app/context/OpenSidebar";
import { useVideoModal } from "@/app/context/VideoModal";
import ClientOnly from "./ClientOnly";
import { axiosInstance } from "@/utils/baseURL";
import Link from "next/link";

export default function Navbar() {
  const { userId } = useAuth();
  // const videos = ["Apple", "Mango", "Banana", "Guava", "Avocado", "Amazon"];
  const [text, setText] = useState("");

  const router = useRouter();

  const { onClose, onOpen } = useVideoModal();

  const { setOpen, open } = useOpenSidebar();

  const { searchResults, setSearchResults } = useSearchResultsStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;

    axiosInstance
      .post(`/video/search-video`, {
        searchTerm: inputText,
      })
      .then(({ data }) => {
        setText(data.message.title);
        if (data.message.length === 0) {
          setSearchResults([]);
        } else {
          setSearchResults(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // setText(inputText);
    // if (inputText === "") {
    //   setSearchResults([]);
    // } else {
    //   const filteredResults = videos.filter((video) =>
    //     video.toLowerCase().startsWith(inputText.toLowerCase())
    //   );
    //   setSearchResults(filteredResults);
    // }
  };

  const handleClearSearch = () => {
    setText("");
    setSearchResults([]);
  };

  const uploadVideo = () => {
    if (!userId) {
      toast.error("Please sign in to upload video");
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <ClientOnly>
      <div className="flex h-20" onClick={() => setSearchResults([])}>
        <div className="w-[18%] flex justify-center items-center gap-4">
          <RxHamburgerMenu
            className="w-6 h-6 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          <Image
            src={Facebook}
            alt="Facebook.png"
            height={500}
            width={500}
            className="h-10 w-28 object-cover"
          />
        </div>
        <div className="flex-1 w-full flex">
          <div className="flex-1 w-full flex justify-center items-center h-full">
            <div className="h-10 w-[60%] mx-auto flex relative">
              <div className="absolute top-2.5 left-3">
                <CiSearch className="h-5 w-5 " />
              </div>
              <div className="absolute top-2.5 right-32">
                {text && (
                  <RxCross1
                    className="h-5 w-5 cursor-pointer"
                    onClick={handleClearSearch}
                  />
                )}
              </div>

              {searchResults.length > 0 && (
                <div className="absolute top-10 left-2.5 w-[78%] min-h-96 rounded-xl drop-shadow-md bg-white z-50 overflow-y-auto ">
                  {searchResults.map((search: Video) => (
                    <div
                      key={search.id}
                      onClick={() => {
                        router.push(`/${search.id}`);
                        setText("")
                      }}
                      className="px-5 my-1 py-7 mx-3 h-10 flex gap-4 items-center cursor-pointer hover:bg-gray-300/20 hover:rounded-xl"
                    >
                      <CiSearch className="min-h-7 min-w-7 " />
                      <div className="">{search.title}</div>
                    </div>
                  ))}
                </div>
              )}
              <input
                className="h-full rounded-l-full w-[80%] border-[1px] outline-none border-gray-500 px-10"
                placeholder="Type something"
                value={text}
                onChange={handleSearchChange}
              />
              <button className="h-full rounded-r-full border-[1px] outline-none border-gray-500 w-[20%] bg-slate-300/20">
                Search
              </button>
            </div>
          </div>
          <div className="w-[30%] ">
            <div className="w-full flex justify-end items-center h-full pr-10 gap-8">
              <BsBell className="w-6 h-6 cursor-pointer" />
              <MdOutlineVideoCall
                className="w-8 h-8 cursor-pointer"
                onClick={uploadVideo}
              />

              {userId ? (
                <UserButton />
              ) : (
                <Link href="/sign-in">
                  <div className="h-8 w-8 rounded-full object-cover border-solid border-[1px] border-gray-300/20 cursor-pointer bg-gray-500/20 text-white flex items-center justify-center">
                    P
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
