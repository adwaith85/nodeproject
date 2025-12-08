import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const AuthStore = create(
  persist(
    (set) => ({
      token: null,
      addToken: (item) =>
        set((state) => ({
          token: item,
        })),
      removeToken: () =>
        set((state) => ({
          token: null,
        })),
    }),
    {
      name: "Auth-storage", // key name in storage
      storage: createJSONStorage(() => sessionStorage), // defaults to localStorage
    }
  )
)




export default AuthStore
