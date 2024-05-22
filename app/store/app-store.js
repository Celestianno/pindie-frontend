import { create } from "zustand";
import { setJWT, removeJWT, getJWT, getMe, isResponseOk } from "../api/api-utils";
import { endpoints } from "../api/config";

export const useStore = create((set) => ({
    isAuth: undefined,
    user: undefined,
    token: undefined,
    login: (user, token) => {
        set({isAuth: true, user, token});
        setJWT(token);
    },
    logout: () => {
        set({isAuth: false, user: null, token: null});
        removeJWT();
    },
    checkAuth: async() => {
        const jwt = getJWT();

        if(jwt) {
            const user = await getMe(endpoints.me, jwt);

            if(isResponseOk(user)) {
                set({isAuth: true, user: {id: user._id, username: user.username, email: user.email}, token: jwt});
                setJWT(jwt);
            } else {
                set({isAuth: false, user: null, token: null});
                removeJWT();
            }
        } else {
            set({isAuth: false, user: null, token: null});
        }
    },
}));