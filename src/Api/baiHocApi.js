import axiosClient from "./axiosClient";

class BaiHocApi {
  BaiHocHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/baihoc/${url}`, {
      method: method ?? "get",
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const baiHocApi = new BaiHocApi();
export default baiHocApi;
