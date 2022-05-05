import axios from "../plugins/axios";

export class ApiService {
  static async get<T>(
    url: string,
    params?: Record<string, string>
  ): Promise<T> {
    const response = await axios.get<T>(url, {
      params,
    });
    return response.data;
  }

  static async post<T, D>(url: string, data: D): Promise<T> {
    const response = await axios.post<T>(url, data);
    return response.data;
  }
}
