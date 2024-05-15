import axiosClient from "./axiosClient";

class UserApi {
  UserHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/users/${url}`, {
      method: method ?? "get",
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const userApi = new UserApi();
export default userApi;