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

export default apiFetch;
