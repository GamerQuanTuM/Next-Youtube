import axios from "axios";
import { create } from "zustand";
import { User } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";

interface CurrentUserState {
  currentUser: User | null;
  setCurrentUser: () => void;
}

const useCurrentUser = create<CurrentUserState>((set) => ({
  currentUser: null,
  setCurrentUser: async () => {
    const { userId } = useAuth();

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      const {
        data: { message: user },
      } = (await axios.post(`http://localhost:3000/api/v1/user/get-user`, {
        clerk_id: userId,
      })) as { data: { message: User } };
      set({ currentUser: user });
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  },
}));

export default useCurrentUser;
