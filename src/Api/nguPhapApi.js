import axiosClient from './axiosClient';
class NguPhapApi {
  NguPhapHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/nguphap/${url}`, {
      method: method ?? 'get',
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const nguPhapApi = new NguPhapApi();
export default nguPhapApi;