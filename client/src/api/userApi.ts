import httpClientInstance from "../httpClient";

class userApi {
  getAllUser = () => httpClientInstance.get("/user");

  deleteUser = (email: string) => httpClientInstance.delete(`/user/${email}`);
}

export default new userApi();
