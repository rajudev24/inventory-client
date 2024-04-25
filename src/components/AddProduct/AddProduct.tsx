import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../InputField/InputField";
import { Inputs } from "@/types";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product Name is required"),
    productPrice: Yup.number()
      .typeError("Product Price must be a number")
      .required("Product Price is required"),
    productQuantity: Yup.number()
      .typeError("Product Quantity must be a number")
      .required("Product Quantity is required"),
    expirationDate: Yup.string()
      .typeError("Expiration Date must be a Date")
      .required("Expiration Date is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/product/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();

      if (res) {
        toast.success("Product Added Successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="mt-10 text-center font-bold text-4xl">Add Product</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 bg-slate-300 p-6 rounded-md w-[500px]"
        >
          <InputField
            label="Product Name"
            placeholder="Enter product name"
            register={register("productName")}
            error={errors.productName?.message}
          />
          <InputField
            label="Product Price"
            placeholder="Enter product price"
            register={register("productPrice")}
            error={errors.productPrice?.message}
          />
          <InputField
            label="Product Quantity"
            placeholder="Enter product quantity"
            register={register("productQuantity")}
            error={errors.productQuantity?.message}
          />
          <InputField
            placeholder=""
            label="Expiration Date"
            type="date"
            register={register("expirationDate")}
            error={errors.expirationDate?.message}
          />
          <button
            type="submit"
            className="mt-4 bg-indigo-700 text-white py-2 px-4 w-full rounded-md font-semibold"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
