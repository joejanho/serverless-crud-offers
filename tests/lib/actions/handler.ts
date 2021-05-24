import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/dev/';

const post = (data = {}, url = '') => {
    return new Promise((resolve, reject) => {
        return fetch(BASE_URL + url, {
            method: 'post',
            body:    JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((json) => {
                resolve(json);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export default {
    createAd: (data) => post(data, 'ad/create'),
    getAds: (data) => post(data, 'ads'),
}