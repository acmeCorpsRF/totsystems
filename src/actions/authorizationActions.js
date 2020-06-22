export const AUTHORIZATION = 'AUTHORIZATION';
export const REGISTRATION = 'REGISTRATION';

export const authorization = (login, password) => ({
    type: AUTHORIZATION,
    login, password
});

export const registration = (login, password, name, activity) => ({
    type: REGISTRATION,
    login, password, name, activity
});