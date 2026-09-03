const apiFetch = (url, options = {}) => {
    const headers = {
        'content-type': 'application/json',
        'authorization': localStorage.getItem('accessToken'),
        ...options.headers
    };

    return fetch(url, { ...options, headers })
        .then(response => {
            if (response.status === 401) {
                localStorage.removeItem('accessToken');
                window.location.reload();
                return Promise.reject(new Error('Unauthorized'));
            }
            if (response.ok || response.status >= 400 && response.status !== 401) {
                return response;
            }
            return response;
        });
};

export const apiGet = (url) =>
    apiFetch(url, { method: 'GET' })
        .then(response => response.json());

export const apiPost = (url, body) =>
    apiFetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(response => response.ok ? response.json() : Promise.reject(new Error('Request failed')));

export const apiPut = (url, body) =>
    apiFetch(url, {
        method: 'PUT',
        body: JSON.stringify(body)
    })
        .then(response => response.ok ? response.json() : Promise.reject(new Error('Request failed')));

export const apiPatch = (url, body) =>
    apiFetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body)
    })
        .then(response => response.ok ? response.json() : Promise.reject(new Error('Request failed')));

export default apiFetch;
