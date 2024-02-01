"use client";

import { RxCross1 } from "react-icons/rx";

const VideoModal = ({
  isOpen,
  onClose,
  children,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title: string;
}) => {
  const closeModal = () => {
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="relative rounded-lg w-[50rem] min-h-[35rem] overflow-y-auto bg-gray-100">
              <div className="p-6 relative bg-white">
                <p className="text-2xl font-bold flex items-center h-full">{title}</p>
                <RxCross1
                  className="absolute h-7 w-7 right-3 top-3 cursor-pointer"
                  onClick={closeModal}
                />
              </div>

              <div className="p-4 bg-gray-100 border-t border-gray-200 rounded-b">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;
