import axiosClient from './axiosClient';
class TienTrinhApi {
  TienTrinhHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/tientrinhbaihoc/${url}`, {
      method: method ?? 'get',
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const tienTrinhApi = new TienTrinhApi();
export default tienTrinhApi;