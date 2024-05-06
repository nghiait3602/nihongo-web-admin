import axiosClient from "./axiosClient";

class BaiTapApi {
  BaiTapHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/cauhoi/${url}`, {
      method: method ?? "get",
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const baiTapApi = new BaiTapApi();
export default baiTapApi;
