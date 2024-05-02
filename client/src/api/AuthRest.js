import baseApi from "./BaseApi";
const path = "/user";

const authRest = {
  login: (data) => {
    const url = `${path}/login`;
    return baseApi.post(url, data);
  },
  register: (data) => {
    const url = `${path}/register`;
    return baseApi.post(url, data);
  },
  update: (data) => {
    const url = `${path}/update`;
    return baseApi.put(url, data);
  },

  findByUser: (userId) => {
    const url = `${path}/getUser`;
    return baseApi.get(url, {
      params: {
        userId,
      },
    });
  },
  getUserList: (params) => {
    const url = `${path}/manage`;
    return baseApi.get(url, {
      params,
    });
  },
  getCusList: (params) => {
    const url = `${path}/manage/search`;
    return baseApi.get(url, {
      params,
    });
  },
  lock: (data) => {
    const url = `${path}/lock`;
    return baseApi.put(url, data);
  },
};

export default authRest;
