import { stringify } from 'qs';
import request from '../utils/request';

export function queryPosts(params) {
    return request(`/admin/posts`)
}
export function publicPost(params) {
    return request(`/admin/posts/publish`, {
        method: 'POST', 
        body: {
            ...params
        }
    })
}
export function savePost(params) {
    return request(`/admin/posts/save_to_draft`, {
        method: 'PUT', 
        body: {
            ...params
        }
    })
}
export function delPost(params) {
    return request(`/admin/posts/del`, {
        method: 'PUT', 
        body: {
            ...params
        }
    })
}
export function queryCounts(params) {
    return request(`/admin/getCounts`)
}
export function querySettings(params) {
    return request(`/admin/settings`)
}
export function updateSettings(params) {
    return request(`/admin/settings`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export function updateAvator(params) {
    return request(`/admin/upload/avator`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export function queryTags(params) {
    return request(`/admin/tags`)
}
export function delTag(params) {
    return request(`/admin/tags`, {
        method: 'DELETE',
        body: {
            ...params
        }
    })
}
export function saveTag(params) {
    return request(`/admin/tags`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}
export function queryPostById(params) {
    return request(`/admin/posts/detail?${qs.stringify(params)}`)
}

export function login(params) {
    return request(`/admin/posts`, {
        method: 'POST',
        body: {
            ...params
        }
    })
}