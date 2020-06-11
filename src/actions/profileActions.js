import {RSAA, getJSON} from 'redux-api-middleware';

export const START_PROFILE_LOADING = 'START_PROFILE_LOADING';
export const SUCCESS_PROFILE_LOADING = 'SUCCESS_PROFILE_LOADING';
export const ERROR_PROFILE_LOADING = 'ERROR_PROFILE_LOADING';

export const loadProfile = () => ({
    [RSAA]: {
        endpoint: '/api/profile.json',
        method: 'GET',
        types: [
            START_PROFILE_LOADING,
            {
                type: SUCCESS_PROFILE_LOADING,
                payload: (action, state, response) => getJSON(response).then(data => data)
            },
            ERROR_PROFILE_LOADING
        ]
    }
});