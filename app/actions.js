'use server'

export const fetcher = ([url, headers]) => fetch(url, {
    method: 'GET', // or 'PUT'
    mode: 'cors',
    headers: headers,
    //redirect: 'follow', // manual, *follow, error
}).then((res) => res.json())

export const fetcherPost = ([url, headers, formData]) => fetch(url, {
    method: 'POST', // or 'PUT'
    headers: headers,
    body: formData,
    mode: 'cors',
    // redirect: 'follow', // manual, *follow, error
}).then((res) => res.json())


export async function create() {
    // ...
}
import { cookies } from 'next/headers'

export async function createCookie(data) {
    cookies().set(data.name, data.value)

}

export async function setCookie(key, val) {
    cookies().set(key, val);

}
export async function createSecureCookie(data) {
    cookies().set(data.name, data.value, { secure: true })
}


export async function createRootHTTPOnlyCookie(data) {
    cookies().set({
        name: data.name,
        value: data.value,
        httpOnly: true,
        path: '/',
    })
}
export async function createSessionCookie(data) {
    cookies().set({
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    })
}

export async function setSessionCookie(val) {
    cookies().set({
        name: "__session",
        value:val
    })
}

export async function getSessionCookie(userID) {
    let sCookie= cookies().get({
        name: "otmmSession",
    })
    console.log(JSON.stringify(sCookie));
    //TODO: refactor to return something handling session and checking for anonymous
    console.log("Userid: "+userID);
    if(!sCookie.value)
        sCookie.value="anonymous"
    return sCookie.value;
}

export async function getCookie(cookieName) {
    let sCookie= cookies().get({
        name: cookieName,
    })
    console.log(JSON.stringify(sCookie));
    return sCookie.value;
}

export async function deleteCookie(data) {
    cookies().set('name', '')
}

export async function deleteMaxAge(name) {
    cookies().set(name, '', { maxAge: 0 })
}

export async function deletePastExpiry(data) {
    const oneDay = 24 * 60 * 60 * 1000
    cookies().set('name', 'value', { expires: Date.now() - oneDay })
}