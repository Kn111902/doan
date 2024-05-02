import baseApi from "./BaseApi";


const uploadFile = {
  uploadProduct: (data) => {
    const url = '/product/upload';
    return baseApi.post(url, data ,{
        'Content-Type':'multipart/form-data'
    });
  },
  
};

export default uploadFile;
