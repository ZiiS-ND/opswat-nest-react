import httpClientInstance from "../httpClient";

type LoginObject = {
  email: string;
  password: string;
};

type RegisterObject = {
  email: string;
  password: string;
  username: string;
  fullname: string;
};

class authApi {
  login = (payload: LoginObject) => httpClientInstance.post("/login", payload);

  register = (payload: RegisterObject) =>
    httpClientInstance.post("/register", payload);
}

export default new authApi();
