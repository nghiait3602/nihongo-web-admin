import axiosClient from './axiosClient';

class BaiDocApi {
  BaiDocHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/baitapdoc/${url}`, {
      method: method ?? 'get',
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const baiDocApi = new BaiDocApi();
export default baiDocApi;
