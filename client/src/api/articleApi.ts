import httpClientInstance from "../httpClient";

type ArticleDTO = {
  title: string;
  body: string;
};

class articleApi {
  createArticle = (payload: ArticleDTO) =>
    httpClientInstance.post("/article", { ...payload });

  updateArticle = (payload: ArticleDTO, id: string | number) =>
    httpClientInstance.put(`/article/${id}`, { ...payload });

  deleteArticle = (id: string | number) =>
    httpClientInstance.delete(`/article/${id}`);

  favoriteArticle = (id: string | number) =>
    httpClientInstance.post(`/article/${id}/favorite`);

  unfavoriteArticle = (id: string | number) =>
    httpClientInstance.delete(`/article/${id}/favorite`);
}

export default new articleApi();
