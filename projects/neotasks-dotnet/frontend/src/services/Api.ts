import axios from 'axios';
export const api = axios.create({ baseURL: '/app-api', timeout: 15000 });
export function getApiError(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.error || error.response?.data?.detail ||
            (error.response?.status === 403 ? 'Você não tem permissão para esta operação.' :
             error.response?.status === 404 ? 'O registro não foi encontrado.' :
             error.response?.status === 401 ? 'Sua sessão expirou. Entre novamente.' :
             'Não foi possível concluir a operação. Verifique a conexão e tente novamente.');
    }
    return typeof error === 'string' ? error : 'Não foi possível concluir a operação.';
}
api.interceptors.request.use(config => {
    const token = sessionStorage.getItem('neotasks:token');
    if (token) config.headers.Authorization = 'Bearer ' + token;
    const offsetMinutes = -new Date().getTimezoneOffset();
    if (config.url === '/daytotalminutes') config.data = { ...config.data, offsetMinutes };
    if (config.url === '/monthtotalminutes') config.params = { ...config.params, offsetMinutes };
    return config;
});
api.interceptors.response.use(response => response, error => {
    if (error.response?.status === 401 && error.config?.url !== '/login') {
        window.dispatchEvent(new Event('neotasks:session-expired'));
    }
    return Promise.reject(error);
});
