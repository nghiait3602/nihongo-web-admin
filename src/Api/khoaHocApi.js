import axiosClient from "./axiosClient";

class KhoaHocApi {
  KhoaHocHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/khoahoc/${url}`, {
      method: method ?? "get",
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const khoaHocApi = new KhoaHocApi();
export default khoaHocApi;
