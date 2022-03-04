// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    request<T = TODO>(config: AxiosRequestConfig): Promise<T>;
    get<T = TODO>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = TODO>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = TODO>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = TODO>(
      url: string,
      data?: TODO,
      config?: AxiosRequestConfig
    ): Promise<T>;
    put<T = TODO>(
      url: string,
      data?: TODO,
      config?: AxiosRequestConfig
    ): Promise<T>;
    patch<T = TODO>(
      url: string,
      data?: TODO,
      config?: AxiosRequestConfig
    ): Promise<T>;
  }
}
