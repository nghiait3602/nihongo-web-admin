import axiosClient from './axiosClient';
class AuthAPI {
  HandlerAuthentication = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/users${url}`, {
      method: method ?? 'get',
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : '', // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}
const authenticationAPI = new AuthAPI();
export default authenticationAPI;
