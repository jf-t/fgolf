export const login = user => ({
    type: 'LOGIN',
    user
});

export const signup = user => ({
    type: 'SIGNUP',
    user
});

export const receiveUser = user => ({
    type: 'RECEIVE_USER',
    user
});
