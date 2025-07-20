import { create } from "zustand";
import { Contact } from "@/models/Contact";

interface ContactStore {
  contacts: Contact[];
  fetchContacts: () => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  contacts: [
    { id: 2, name: "Денис", avatar: "https://sun1-19.userapi.com/s/v1/ig2/7C9nX4rUQXfkmlhhpyvHv2KbUiosZkcgMn1JNXNMSCKBFRDorvwOLkEy5u8tpmmNM8lO2ERj_3a_CWyGR1gGKfAs.jpg?quality=95" },
    { id: 4, name: "Петр", avatar: "https://wallpapers.com/images/hd/split-face-portrait-illustration-94fzh2bivtwz8744.jpg" },
  ],
  fetchContacts: () => {},
})); 