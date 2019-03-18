import {ACCESS_TOKEN, RESTHOST} from '../constants';
import request from "superagent";

export const get = (options) => {
    return request
        .get(options.url)
        .query(options.data)
        .type('application/json')
        .set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
};

export const post = (options) => {
    return request
        .post(options.url)
        .type('application/json')
        .set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        .send(options.data)
};

export const put = (options) => {
    return request
        .put(options.url)
        .type('application/json')
        .set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        .send(options.data)
};

export const del = (options) => {
    return request
        .delete(options.url)
        .type('application/json')
        .set('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        .send(options.data)
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: RESTHOST + "/user",
        method: 'GET'
    });
}
