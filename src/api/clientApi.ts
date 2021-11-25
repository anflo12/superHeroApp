import axios, { AxiosResponse } from "axios";
import config from "../config";


const clientApi = {
  get: <T>(url: string): any => {
    return axios
      .get<T>(`${config.baseUrl}${url}`)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  post: <T>(url: string, data: T): any => {
    return axios
      .post<T>(`${config.baseUrl}${url}`, data)
      .then((response: AxiosResponse) => response.data)
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
};

export default clientApi;
