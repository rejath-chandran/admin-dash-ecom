// import { create } from "zustand";
// import api from "../api/axios";

// export const useAuthStore = create((set) => ({
//   accessToken: undefined, // 🟢 use undefined meaning "not checked yet"
//   user: null,
//   isInitialized: false,

//   setAuth: ({ token, user }) => set({ accessToken: token, user }),
//   clearAuth: () => set({ accessToken: null, user: null, isInitialized: true }),

//   initializeAuth: async () => {
//     try {
//       const res = await api.post("/auth/refresh", {});
//       set({ accessToken: res.data.accessToken, isInitialized: true });
//     } catch {
//       set({ accessToken: null, user: null, isInitialized: true });
//     }
//   },
// }));


import { create } from "zustand";
import api from "../api/axios";

export const useAuthStore = create((set) => ({
  accessToken: undefined, // undefined = not checked yet
  user: null,
  isInitialized: false,

  setAuth: ({ token, user }) => set({ accessToken: token, user }),

  clearAuth: () => set({ accessToken: null, user: null, isInitialized: false }),

  initializeAuth: async () => {
    try {
      const res = await api.post("/auth/refresh", {});
      set({ accessToken: res.data.accessToken, isInitialized: true });
    } catch {
      set({ accessToken: null, user: null, isInitialized: true });
    }
  },
}));
