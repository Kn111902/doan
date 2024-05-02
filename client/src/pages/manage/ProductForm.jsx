import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import CategoryRest from "../../api/CategoryRest";
import productRest from "../../api/ProductRest";
import uploadFile from "../../api/UploadFile";
import { getProductByUserId } from "../../redux/productAction";

function ProductForm({ mode, product, closeForm, page, limit }) {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title , setTitle] =useState ("")
  const [category , setCategory]= useState([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
  const  fetchCategory= async()=>{
    try {
      const data = await CategoryRest.getAll()
      setCategory(data)
    } catch (error) {
    }
    }
    fetchCategory()
  },[])

  const handleChangeTitle =(e)=>{
    setTitle(e.target.value)
  }
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (product) {
      try {
        const fileExtension = data?.image[0].name
          .split(".")
          .pop()
          .toLowerCase();
        if (
          !["jpg", "png", "jpeg", "gif", "webp", "tiff"].includes(fileExtension)
        ) {
          toast("Định dạng file phải  là png, jpg, jpeg, gif, webp, tiff");
        } else {
          await productRest.update({ ...data, id: product.pid });
          const formData = new FormData();
          formData.append("file", data.image[0]);
          formData.append("productId", product.pid);
          await uploadFile.uploadProduct(formData);
          toast("Cập nhật  sản phẩm thành công");
          reset();
          closeForm();
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
      }
    } else {
      const id = Math.floor(Math.random() * 10000);
      try {
        const fileExtension = data?.image[0].name
          .split(".")
          .pop()
          .toLowerCase();
        if (
          !["jpg", "png", "jpeg", "gif", "webp", "tiff"].includes(fileExtension)
        ) {
          toast("Định dạng file phải  là png, jpg, jpeg, gif, webp, tiff");
        } else {
          await productRest.create({ ...data, category: Number(data.category) , id, sellerId: user.userId });
          const formData = new FormData();
          formData.append("file", data.image[0]);
          formData.append("productId", id);
          await uploadFile.uploadProduct(formData);
          setTimeout(() => {
            toast("Thêm sản phẩm thành công");
          }, 300);
          reset();
          dispatch(getProductByUserId({ limit, page, useId: user.userId }));
          closeForm();
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
      }
    }
  };

  const closeModal = ()=>{
    setIsModalOpen(false)
  }

  const addCategory = async (e)=>{
    e.preventDefault();
    try {
      const success = await CategoryRest.create(title);
      if(success){
        toast("Thêm danh mục thành công");
        setTitle("")
      }else{
        toast(`Danh mục [${title}] đã tồn tại rồi.`);
      }
      setIsModalOpen(false)
    } catch (error) {
      toast("Server error")
    }

  }
  return (
    <div className=" mx-auto bg-white p-8 rounded-md shadow-md  mb-5">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">
        {mode ? "Thêm sản phẩm" : "Cập nhập sản phẩm"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-xl font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            defaultValue={product ? product.title : ""}
            {...register("title", {
              required: "Tên sản phẩm phải dài hon 20 ký tự",
              min: 20,
            })}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-xl border-gray-300 rounded-md"
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-xl font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            defaultValue={product ? product.price : ""}
            {...register("price", {
              required: "Giá  phải là số.",
              pattern: "/^d+$/",
            })}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-xl border-gray-300 rounded-md"
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-xl font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            defaultValue={product ? product.description : ""}
            {...register("description", { required: "Mô tả là bắt buộc." })}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-xl border-gray-300 rounded-md"
          ></textarea>
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        <div></div>
        <div>
          <label
            htmlFor="size"
            className="block text-xl font-medium text-gray-700"
          >
            Size
          </label>
          <input
            type="checkbox"
            className="shadow-md"
            value="1"
            {...register("size")}
          ></input>{" "}
          SM
          <input
            type="checkbox"
            className="shadow-md"
            value="2"
            {...register("size")}
          ></input>{" "}
          MD
          <input
            type="checkbox"
            className="shadow-md"
            value="3"
            {...register("size")}
          ></input>{" "}
          LG
        </div>
        <div>
          <label
            htmlFor="color"
            className="block text-xl font-medium text-gray-700"
          >
            Color
          </label>
          <input
            type="checkbox"
            className="shadow-md"
            value="1"
            {...register("color")}
          ></input>{" "}
          RED
          <input
            type="checkbox"
            className="shadow-md"
            value="2"
            {...register("color")}
          ></input>{" "}
          WHITE
          <input
            type="checkbox"
            className="shadow-md"
            value="3"
            {...register("color")}
          ></input>{" "}
          BLUE
        </div>

        <div>
          <label
            htmlFor="  "
            className="block text-xl font-medium text-gray-700"
          >
            Category
          </label>
          <select
            className="shadow-md"
            select="1"
            {...register("category")}
            id="category"
          >
            
            {
              category.map((d , index)=> { 
                if (index = 0){
                  return <option selected key={d.categoryId} value={d.categoryId} >{d.title} </option>
                }
              return <option key={d.categoryId} value={d.categoryId} >{d.title} </option>})
            }
            
          </select>
          <PlusOutlined onClick={()=>setIsModalOpen(true)} />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-xl font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            {...register("image", { required: "Ảnh là bắt buộc." })}
            rows="3"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-xl border-gray-300 rounded-md"
          ></input>
          {errors.image && <span>{errors.image.message}</span>}
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
      <Modal
          footer={null}
          title="Thêm danh mục."
          open={isModalOpen}
          visible={isModalOpen}
        >
          <form onSubmit={addCategory}>
          <label
            htmlFor="title"
            className="block text-xl font-medium text-gray-700"
          >
           Tên danh mục
          </label>
          <input
            type="text"
            id="title"
            onChange={(e)=>handleChangeTitle(e)}
            className="mt-1 outline-none p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-xl border-gray-300 rounded-md"
          />
            
            <div className="flex justify-around mt-3">
              <Button htmlType="submit">Thêm</Button>
              <Button onClick={closeModal}>Hủy bỏ</Button>
            </div>
          </form>
        </Modal>
    </div>
  );
}

export default ProductForm;
