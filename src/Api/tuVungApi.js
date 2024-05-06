import axiosClient from './axiosClient';
class TuVungApi {
  TuVungHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/tuvung/${url}`, {
      method: method ?? 'get',
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const tuVungApi = new TuVungApi();
export default tuVungApi;
