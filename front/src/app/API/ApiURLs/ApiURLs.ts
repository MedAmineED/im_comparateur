const url = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/';

interface ApiUrlsInterface {
    readonly ACTUALITES: string,
    readonly GUIDE: string,
    readonly CLIENT: string,
    CLIENT_PUBLIC: string,
    readonly BASE_URL: string,
    readonly AUTH: {
        readonly LOGIN: string,
        readonly LOGOUT: string,
        readonly REGISTER: string,
    }
}

const ApiUrls: ApiUrlsInterface = {
    ACTUALITES: `${url}api/actualites`,
    GUIDE: `${url}api/guides`,
    CLIENT: `${url}api/clients`,
    CLIENT_PUBLIC: `${url}api/clients/public`,
    BASE_URL: url,
    AUTH: {
        LOGIN: `${url}api/login`,
        LOGOUT: `${url}api/logout`,
        REGISTER: `${url}api/register`,
    }
}

export default ApiUrls;