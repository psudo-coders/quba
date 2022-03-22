function get(url) {
    return async (data) => {
        const urlWithParams = new URL(url, window.location.href);

        for(const [key, value] of Object.entries(data)) {
            urlWithParams.searchParams.append(key, value);
        }

        const resp = await fetch(urlWithParams, {
            method: 'GET',
            credentials: 'include',
        });
        if (resp.ok) {
            return resp.json();
        }
        checkSessionExpired(resp);
        const text = await resp.text();
        try {
            const json = JSON.parse(text);
            throw new Error(json.error);
        } catch (e) {
            throw new Error(text);
        }
    }
}

function post(url) {
    return async (data) => {
        const resp = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (resp.ok) {
            return resp.json();
        }
        checkSessionExpired(resp);
        const text = await resp.text();
        try {
            const json = JSON.parse(text);
            throw new Error(json.error);
        } catch (e) {
            throw new Error(text);
        }
    }
}

function checkSessionExpired(resp) {
    if (resp.status == 401) {
        if (window.location.pathname != '/login') {
            window.location.href = '/login';
        }
    }
}

export const login = post('/api/login');
export const signup = post('/api/signup');
export const userInfo = get('/api/userInfo');
export const logout = post('/api/logout');
export const questionCreate = post('/api/question/create');
export const testGenerate = get('/api/test/generate');

export const Roles = {
    ADMIN: 0,
    REVIEWER: 1,
    SUBMITTER: 2,
};
// TODO: add other api calls when needed
