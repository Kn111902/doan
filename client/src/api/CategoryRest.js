import baseApi from "./BaseApi";
const path = "/category";

const CategoryRest = {
  create: (title) => {
    const url = `${path}/cretae`;
    return baseApi.post(url, {title});
  },
 
  getAll: () => {
    const url = `${path}/getAll`;
    return baseApi.get(url);
  },
};

export default CategoryRest;
