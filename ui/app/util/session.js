export const getCookie = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const setCookie = (key, val) => {
    console.log(key, JSON.stringify(val));
    localStorage.setItem([key], JSON.stringify(val));
};

export const isLoggedIn = () => {
    return (!!getCookie('user'));
};
