import update from 'react-addons-update';
import {AUTHORIZATION, REGISTRATION} from '../actions/authorizationActions';

const initialStore = {
    authorizedUser: false,
    regLoginUser: '',
    regPasswordUser: '',
    regNameUser: '',
    regSocialActivityUser: '',
    registeredUser: false
};

export default function authorizationReducer(store = initialStore, action) {
    switch (action.type) {
        case AUTHORIZATION: {
            return update(store, {
                authorizedUser: {$set: true}
            });
        }
        case REGISTRATION: {
            return update(store, {
                authorizedUser: {$set: true},
                regLoginUser: {$set: action.login},
                regPasswordUser: {$set: action.password},
                regNameUser: {$set: action.name},
                regSocialActivityUser: {$set: action.activity},
                registeredUser: {$set: true}
            });
        }
        default:
            return store;
    }
}
