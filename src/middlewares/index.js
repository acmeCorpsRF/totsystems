import messageMiddleware from './botMessageMiddleware';
import {apiMiddleware} from 'redux-api-middleware';

export default [
    messageMiddleware,
    apiMiddleware
];