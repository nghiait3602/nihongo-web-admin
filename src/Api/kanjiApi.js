import axiosClient from "./axiosClient";

class KanjiApi {
  KanjiHandler = async (url, data, method, token) => {
    return await axiosClient(`/api/v1/kanji/${url}`, {
      method: method ?? "get",
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Truyền token qua header Authorization nếu tồn tại
      },
    });
  };
}

const kanjiApi = new KanjiApi();
export default kanjiApi;