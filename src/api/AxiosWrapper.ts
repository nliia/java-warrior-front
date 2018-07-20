import axios, {
    AxiosAdapter,
    AxiosBasicCredentials,
    AxiosProxyConfig,
    AxiosResponse,
    AxiosTransformer,
    CancelToken
} from "axios"

const api = "http://89.223.91.62:9090"

export default class AxiosWrapper {

    static async get<ParamsType, DataType> (path: string, config?: AxiosRequestConfig<ParamsType>) : Promise<AxiosResponse<DataType>> {
        return await axios.get(`${api}${path}`, config);
    }

    static async post<ParamsType, DataType> (path: string, data: ParamsType, config?: AxiosRequestConfig<ParamsType>) : Promise<AxiosResponse<DataType>> {
        return await axios.post(`${api}${path}`, data, config);
    }

    static async delete<ParamsType, DataType> (path: string, config?: AxiosRequestConfig<ParamsType>) : Promise<AxiosResponse<DataType>> {
        return await axios.delete(`${api}${path}`, config);
    }

    static async patch<ParamsType, DataType> (path: string, data: ParamsType, config?: AxiosRequestConfig<ParamsType>) : Promise<AxiosResponse<DataType>> {
        return await axios.patch(`${api}${path}`, data, config);
    }

    static async put<ParamsType, DataType> (path: string, data: ParamsType, config?: AxiosRequestConfig<ParamsType>) : Promise<AxiosResponse<DataType>> {
        return await axios.put(path, data, config);
    }
}

export interface AxiosRequestConfig<ParamsT> {
    url?: string;
    method?: string;
    baseURL?: string;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];
    headers?: any;
    params?: ParamsT;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    withCredentials?: boolean;
    adapter?: AxiosAdapter;
    auth?: AxiosBasicCredentials;
    responseType?: string;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: (status: number) => boolean;
    maxRedirects?: number;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig | false;
    cancelToken?: CancelToken;
  }