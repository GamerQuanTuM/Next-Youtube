"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { FaUpload } from "react-icons/fa";

import { useVideoModal } from "@/app/context/VideoModal";
import Modal from "@/components/Modal/Modal";
import { axiosInstance } from "@/utils/baseURL";
import { getTags } from "@/functions/tags";
import { Category, User } from "@prisma/client";

export default function VideoModal() {
  const { userId } = useAuth();
  
  const { isOpen, onClose } = useVideoModal();
  
  let formData = new FormData();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [stage, setStage] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [categories, setCategories] = useState<{ name: string; id: Number }[]>(
    []
  );

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setSelectedFile(selectedFile);

    if (selectedFile) {
      formData.append("file", selectedFile as Blob);
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const categoryId = Number(selectedOption);

  const handleUpload = async () => {
    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile as Blob);
      formData.append("upload_preset", "youtube");
      formData.append("cloud_name", "dh7ccyxk5");
      formData.append("folder", `Youtube/${userId}`);
    }

    try {
      const { data: videoData } = await axios.post(
        "https://api.cloudinary.com/v1_1/dh7ccyxk5/video/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (
              progressEvent.total !== undefined &&
              progressEvent.loaded !== undefined
            ) {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              // Here you can update the state to reflect the upload progress
              console.log(`Upload Progress: ${progress}%`);
              // For example, you can set the progress to a state variable
              setUploadProgress(progress);
            }
          },
        }
      );

      if (videoData) {
        console.log(videoData);
        // toast.success("Video Uploaded successfully");

        const {
          data: { message },
        } = (await axiosInstance.post("/user/get-user", {
          clerk_id: userId,
        })) as { data: { message: User } };

        axiosInstance
          .post("/video/upload-video", {
            title,
            description,
            tags: getTags(tags),
            userId: message?.id,
            video_url: videoData.secure_url,
            categoryId,
          })
          .then((res) => {
            console.log(res);
            toast.success("Video Uploaded successfully");
            setSelectedFile(null);
            setTitle("");
            setDescription("");
            setTags("");
            onClose();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Video upload failed!");
          });
      }
    } catch (error) {
      console.log(error);
      toast.error("Video upload failed!");
    }
  };

  useEffect(() => {
    const getAllCategory = () => {
      axiosInstance
        .get("/category/get-all-categories")
        .then((res) => {
          const categoryNames: { name: string; id: Number }[] = [];
          res.data.message.map((category: Category) => {
            categoryNames.push({
              name: category.name,
              id: category.id,
            });
            setCategories(categoryNames);
          });
        })
        .catch((err) => console.log(err));
    };
    getAllCategory();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Upload a Video"}>
      <h1 className="flex justify-center items-center mt-1 mb-3">
        <div className={`h-7 w-7 rounded-full ${stage && "bg-blue-500"}`}></div>
        <div
          className={`border-t-2 border-solid ${
            stage === 1 && "border-gray-200"
          } ${stage === 2 && "border-blue-500"}
            w-[20%]`}
        ></div>
        <div
          className={`h-7 w-7 rounded-full ${stage === 1 && "bg-gray-300"} ${
            stage === 2 && "bg-blue-500"
          }`}
        ></div>
      </h1>
      {stage === 1 ? (
        <div className="pb-5">
          <h1 className="text-2xl font-bold mx-4">Details</h1>
          <div className="flex gap-3 mx-3 mt-5">
            <div className="flex flex-col gap-3 flex-1 h-96 overflow-y-auto">
              <input
                className="border-solid border-[1px] border-gray-400 hover:outline-blue-500 hover:outline-1 h-14 rounded-md w-full px-5 bg-inherit"
                placeholder="Title (required)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="border-solid border-[1px] border-gray-400 hover:outline-blue-500 hover:outline-1 h-auto rounded-md w-full pt-4 pb-2 px-5 flex flex-col flex-grow">
                <p className="text-gray-500  text-base">Description</p>
                <textarea
                  className="mt-3 bg-inherit w-full outline-none min-h-24 h-auto flex-grow scroller"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <input
                value={tags}
                className="border-solid border-[1px] border-gray-400 hover:outline-blue-500 hover:outline-1 h-14 rounded-md w-full px-5 bg-inherit"
                placeholder="Tags"
                onChange={(e) => setTags(e.target.value)}
              />

              <div className="flex justify-end" onClick={() => setStage(2)}>
                <button
                  className="text-center text-white bg-blue-500 rounded-xl h-10 w-24 disabled:cursor-not-allowed disabled:opacity-10"
                  // disabled={!tags && !title && !description}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div className="w-full">
            <label
              htmlFor="select"
              className="block text-sm font-medium text-gray-700"
            >
              Select an option:
            </label>
            <select
              id="select"
              name="select"
              value={selectedOption}
              onChange={handleSelectChange}
              className="mt-1 block w-full h-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Choose a option ...</option>
              {categories.map(
                (category: { name: string; id: Number }, i: number) => (
                  <>
                    <option value={category.id.toString()} key={i}>
                      {category.name}
                    </option>
                  </>
                )
              )}
            </select>

            <div className="w-full bg-gray-500/20 rounded-xl mt-4 h-72 px-3 relative">
              {selectedFile ? (
                <>
                  <RxCross1
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => setSelectedFile(null)}
                  />
                  <video
                    mt-4
                    className="h-48 w-full object-cover rounded-xl mt-7 pt-8"
                    controls
                  >
                    <source
                      src={URL.createObjectURL(selectedFile)}
                      type={selectedFile.type}
                    />
                  </video>
                  <div className="flex flex-col gap-1 justify-center mt-5">
                    <p className="text-sm text-gray-500">Filename</p>
                    <p className="text-sm black break-all">
                      {selectedFile ? selectedFile.name : "No file selected"}
                    </p>
                  </div>
                </>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center gap-3">
                  <FaUpload className="h-12 w-12" color="#767676" />
                  <h1 className="text-center text-2xl text-[#767676]">
                    Upload a Video
                  </h1>
                </div>
              )}
              {uploadProgress! > 0 && uploadProgress != 100 && (
                <progress
                  id="file"
                  value={String(uploadProgress)}
                  max="100"
                  className="h-2 rounded-xl w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-blue-300 [&::-webkit-progress-value]:bg-blue-700 [&::-moz-progress-bar]:bg-blue-700"
                ></progress>
              )}
            </div>

            <div className="my-5 flex gap-3 items-center  justify-end">
              <button className="text-center text-white bg-blue-500 rounded-xl h-10 w-24">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                  id="upload-video-input"
                />
                <label
                  htmlFor="upload-video-input"
                  className="text-center text-white bg-blue-500 rounded-xl h-10 w-24 cursor-pointer"
                >
                  Select
                </label>
              </button>
              <button
                className="text-center text-blue-500 bg-white border-solid border-2 border-blue-500 rounded-xl h-10 w-24 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!selectedFile}
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
