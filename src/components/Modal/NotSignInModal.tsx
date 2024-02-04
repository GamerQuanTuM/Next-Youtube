"use client";
import Link from "next/link";
import Modal from "@/components/Modal/Modal";
import { useNotSignInModal } from "@/app/context/NotSignIn";

export default function NotSignInModal() {
  const { isOpen, onClose } = useNotSignInModal();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"Upload a Video"}
      header={false}
      height="min-h-[8rem]"
      width="min-w-[16rem]"
    >
      <div className="text-xl font-medium">
        Please sign in to proceed further
      </div>
      <button className="mt-7 rounded-xl bg-blue-500 px-2 py-1 text-white font-medium">
        <Link href="/sign-in">Sign In</Link>
      </button>
    </Modal>
  );
}
