const authHeaders = () => ({
    'content-type': 'application/json',
    'authorization': localStorage.getItem('accessToken'),
});

const apiFetch = (url, options = {}) => {
    let headers = { ...authHeaders(), ...options.headers };

    if (options.body instanceof FormData) {
        delete headers['content-type'];
    }

    return fetch(url, { ...options, headers })
        .then(response => {
            if (response.status === 401) {
                localStorage.removeItem('accessToken');
                window.location.reload();
                return Promise.reject(new Error('Unauthorized'));
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
        headers: {},
        body
    })
        .then(response => response.ok ? response.json() : Promise.reject(new Error('Request failed')));

export const apiPatch = (url, body) =>
    apiFetch(url, {
        method: 'PATCH',
        headers: {},
        body
    })
        .then(response => response.ok ? response.json() : Promise.reject(new Error('Request failed')));

export const apiPut = (url, body) =>
    apiFetch(url, {
        method: 'PUT',
        headers: {},
        body
    })
        .then(response => response.ok ? response.json() : Promise.reject(new Error('Request failed')));

export const apiDelete = (url) =>
    apiFetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }
            return null;
        });

export default apiFetch;
