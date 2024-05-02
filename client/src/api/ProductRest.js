import baseApi from "./BaseApi";
const path = "/product";

const productRest = {
  getProducts: (params) => {
    const url = `${path}`;
    return baseApi.get(url, { params });
  },
  getProductActive: (params) => {
    const url = `${path}/active`;

    return baseApi.get(url, { params });
  },
  getProductByPrice: (params) => {
    const url = `${path}/price`;
    return baseApi.get(url, { params });
  },
  getProductByCategory: (params) => {
    const url = `${path}/category`;

    return baseApi.get(url, { params });
  },
  getProductById: (id) => {
    const url = `${path}/${id}`;
    return baseApi.get(url);
  },
  getProductByName: (params) => {
    const url = `${path}/search`;
    return baseApi.get(url, { params });
  },
  getProductByUserId: (params) => {
    const url = `${path}`;
    return baseApi.get(url, { params });
  },
  create: (data) => {
    const url = `${path}/create`;

    return baseApi.post(url, data);
  },
  topSalling: () => {
    const url = `${path}/top-selling`;
    return baseApi.get(url);
  },
  stopSale: (ids) => {
    const url = `${path}/stopSale`;
    return baseApi.put(url, ids);
  },
  update: (data) => {
    const url = `${path}/update`;
    return baseApi.put(url, data);
  },
};

export default productRest;
