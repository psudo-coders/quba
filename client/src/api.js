function get(url) {
    return async (data) => {
        const urlWithParams = new URL(url);

        for(const [key, value] of Object.entries(data)) {
            urlWithParams.searchParams.append(key, value);
        }

        const resp = await fetch(urlWithParams, {
            method: 'GET',
        });
        if (resp.ok) {
            return resp.json();
        }
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (resp.ok) {
            return resp.json();
        }
        const text = await resp.text();
        try {
            const json = JSON.parse(text);
            throw new Error(json.error);
        } catch (e) {
            throw new Error(text);
        }
    }
}

export const login = post('/api/login');
export const signup = post('/api/signup');
// TODO: add other api calls when needed
