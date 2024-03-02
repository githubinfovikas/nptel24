export const getToken = () => {
    return localStorage.getItem("token");
};

export const gmail = () => {
    return localStorage.getItem("email");
}

export const name = () => {
    return localStorage.getItem("name");
}

export const registrationNumber = () => {
    return localStorage.getItem("registrationNumber");
}

export const branch = () => {
    return localStorage.getItem("branch");
}

export const batch = () => {
    return localStorage.getItem("batch");
}

export const userType = () => {
    return localStorage.getItem("userType");
}

export const destination = () => {
    return localStorage.getItem("destination");
}


export const headers = {
    "Content-Type": "application/json",
    Authorization: getToken(),
};

//  export const url = "http://localhost:8080"
export const url = "https://nptel24.vercel.app"