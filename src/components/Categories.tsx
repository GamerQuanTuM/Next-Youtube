"use client";

import React, { useState, useRef, RefObject, useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Options = [
  "All",
  "Mixes",
  "Music",
  "Live",
  "Korean Dramas",
  "CSS",
  "Gaming",
  "Computer Programming",
  "News",
  "K Pop",
  "Variety Shows",
  "Data Structures And Algorithms",
  "Mobile Games",
  "Recently Added",
  "New To Old",
];

const Categories = ({ category }: { category?: string[] }) => {
  const [activeOption, setActiveOption] = useState(Options[0]);
  const containerRef: RefObject<HTMLDivElement> = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleActive = (option: string) => {
    setActiveOption(option);
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = containerRef.current;

    if (container) {
      const scrollAmount = direction === "left" ? -150 : 150;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (
        (direction === "left" && container.scrollLeft > 0) ||
        (direction === "right" && container.scrollLeft < maxScrollLeft)
      ) {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    const updateArrowsVisibility = () => {
      const maxScrollLeft =
        container && container.scrollWidth - container.clientWidth;
      const showLeftArrow = container && container.scrollLeft > 0;
      const showRightArrow = container && container.scrollLeft < maxScrollLeft!;

      setShowLeftArrow(showLeftArrow!);
      setShowRightArrow(showRightArrow!);
    };

    // Call the function once during the component mount
    updateArrowsVisibility();

    if (container) {
      container.addEventListener("scroll", updateArrowsVisibility);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateArrowsVisibility);
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      {showLeftArrow && (
        <FaAngleLeft
          className="mr-2 absolute left-6 z-10 top-6 rounded-full hover:bg-gray-400/20 p-1 w-8 h-8 cursor-pointer"
          onClick={() => handleScroll("left")}
        />
      )}

      {showRightArrow && (
        <FaAngleRight
          className="mr-2 absolute right-6 z-10 top-6 rounded-full hover:bg-gray-400/20 p-1 w-8 h-8 cursor-pointer"
          onClick={() => handleScroll("right")}
        />
      )}

      <div className="flex flex-col items-center w-full">
        <div
          className="h-10 flex gap-3 mt-5 mx-3 overflow-x-auto w-[70rem] no-scroll relative overflow-y-hidden"
          ref={containerRef}
        >
          {Options.map((option, i) => (
            <div
              key={i}
              className={`text-sm ${
                option === activeOption
                  ? "bg-black text-white"
                  : "bg-slate-200/80 text-black"
              }  text-center flex items-center justify-center rounded-lg w-auto min-w-32 px-2 py-2 cursor-pointer`}
              onClick={() => handleActive(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
