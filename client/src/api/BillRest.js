import baseApi from "./BaseApi";
const path = "/bill";

const billRest = {
  createBill: (data) => {
    const url = `${path}/create/bill`;
    return baseApi.post(url, data);
  },
  createBuy: (data) => {
    const url = `${path}/create/buy`;
    return baseApi.post(url, data);
  },
  getBillByUserId: (params) => {
    const url = `${path}/userId`;
    return baseApi.get(url, { params });
  },
  getBills: () => {
    const url = `${path}/getAll`;
    return baseApi.get(url);
  },
  getDataChart: () => {
    const url = `dataChartQty`;
    return baseApi.get(url);
  },
  export: (data) => {
    const url = `${path}/pdf`;
    return baseApi.post(url, data, {
      responseType: "arraybuffer",
    });
  },
  delete: (id) => {
    const url = `${path}/delete`;
    return baseApi.delete(url, { params: { id } });
  },
  getBillByCus: (fullName) => {
    const url = `${path}/get/fullName`;
    return baseApi.get(url, {
      params: {
        fullName,
      },
    });
  },
  dagiao: (id) => {
    console.log("🚀 ~ id:", id);
    const url = `${path}/received`;
    return baseApi.put(url, id);
  },
};

export default billRest;
