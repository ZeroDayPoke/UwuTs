import axios, { AxiosResponse } from "axios";
import { handleApiResponse, handleApiError, createApi } from "./apiConfig";

interface UserResponse {
  roles: string[];
  userId: string;
  email: string;
  token?: string;
  id?: string;
}

axios.defaults.withCredentials = true;

const userApi = {
  ...createApi("users"),

  signup: (userData: any): Promise<UserResponse> =>
    axios
      .post("/users/signup", userData)
      .then((response: AxiosResponse) => {
        const userWithRoles: UserResponse = {
          roles: response.data.roles,
          userId: response.data.userId,
          email: response.data.email,
        };
        return handleApiResponse({ ...response, data: userWithRoles });
      })
      .catch(handleApiError),

  login: (userData: any): Promise<UserResponse> =>
    axios
      .post("/users/login", userData)
      .then((response: AxiosResponse) => {
        const userWithRolesAndFavorites: UserResponse = {
          roles: response.data.roles,
          userId: response.data.id,
          email: response.data.email,
        };
        return handleApiResponse({
          ...response,
          data: userWithRolesAndFavorites,
        });
      })
      .catch(handleApiError),

  logout: (): Promise<any> => {
    localStorage.removeItem("accessToken");
    return axios
      .post("/users/logout")
      .then(handleApiResponse)
      .catch(handleApiError);
  },

  getAccount: (): Promise<any> =>
    axios
      .get("/users/account", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(handleApiResponse)
      .catch(handleApiError),

  getAllUsers: () =>
    axios
      .get("/users/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(handleApiResponse)
      .catch(handleApiError),
};

export default userApi;
