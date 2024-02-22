import { jwtDecode } from "jwt-decode";
import { getToken } from "./common";
export const isUserLoggedIn = () => {
    const token = getToken();
    
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                return true;
            } else {
                localStorage.clear();
                window.location.reload();
                window.location.href = "/";
                return false;
            }

        } catch (error) {
            console.error(error);
        }
    }
    return false;
};
