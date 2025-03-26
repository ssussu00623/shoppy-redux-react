/***********************
 * axios 연동을 위한 공통 API
 * : api가 아니라 axiosApi라고 이름 지어도~
 ***********************/

import axios from "axios";

/**POST Method */
export async function axiosPost({ url, data }) {
    let result = null;
    try {
        result = await axios({
            method: 'post',
            url: url,
            data: data
        }).then(res => res.data)
    } catch (error) {
        console.log(error);
    }

    return result;
}
/**PUT Method */
export async function axiosPut({ url, data }) {
    let result = null;
    try {
        result = await axios({
            method: 'put',
            url: url,
            data: data
        }).then(res => res.data)
    } catch (error) {
        console.log(error);
    }

    return result;
}
/**Delete Method */
export async function axiosDelete({ url, data }) {
    let result = null;
    try {
        result = await axios({
            method: 'delete',
            url: url,
            data: data
        }).then(res => res.data)
    } catch (error) {
        console.log(error);
    }

    return result;
}
/**Get Method */
export async function axiosGet({ url, data }) {
    let result = null;
    try {
        result = await axios({
            method: 'get',
            url: url,
            data: data
        }).then(res => res.data)
    } catch (error) {
        console.log(error);
    }

    return result;
}