import axios, { AxiosError, type AxiosResponse } from "axios";
import { AuthService } from "./auth.service";

const client = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    validateStatus: (status) => {
        return status.toString().startsWith('2')

    }
})

export async function login(username: string, password: string) {
    return await client.request({
        url: '/users/login',
        method: 'post',
        data: {
            username: username,
            password: password
        }
    })
}

export async function useAxios(path: string, method = 'get', payload = {}) {

    let rsp: AxiosResponse

    try {
        rsp = await client.request({
            url: path,
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${AuthService.getAccessToken()}`

            },
            data: payload
        }) as AxiosResponse
    } catch (e) {
        rsp = (e as AxiosError).response as AxiosResponse
    }
    if (rsp == undefined) {
        throw new Error('CANT_REACH_BACKEND')
    }

    if (rsp.status == 401) {
        window.location.href = "/login"
        return

    }

    if (rsp.status == 403) {
        try {
            const token = await client.request({
                url: '/users/refresh',
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${AuthService.getRefreshToken()}`

                }
            })
            AuthService.saveAuth(token.data)

            return await client.request({
                url: path,
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${AuthService.getAccessToken()}`

                },
                data: payload
            })
        } catch (e) {
            AuthService.clearAuth()
            throw new Error('REFRESH_FAILED')
        }

    }

    if (rsp.status == 404) {
        throw new Error('NOT_FOUND')
    }

    return rsp;
}