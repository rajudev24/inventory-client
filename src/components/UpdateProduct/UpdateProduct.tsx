"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../InputField/InputField";
import { Updates } from "@/types";

const UpdateProduct: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

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
      .optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Updates>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`https://inventory-nestjs-server.onrender.com/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        reset(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit: SubmitHandler<Updates> = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://inventory-nestjs-server.onrender.com/product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const resData = await response.json();
        toast.success("Product Updated Successfully", {
          position: "top-right",
        });
        if (resData)
          setTimeout(() => {
            router.push("/");
          }, 2000);
      } else {
        toast.error("Failed to update product", { position: "top-right" });
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
        <h1 className="mt-10 text-center font-bold text-4xl">Update Product</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 bg-slate-300 p-6 rounded-md mb-12 w-[500px]"
        >
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              {Object.keys(validationSchema.fields).map((key) => (
                <InputField
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  register={register(key as keyof Updates)}
                  type={key === "expirationDate" ? "date" : "text"}
                  placeholder={`Enter ${key}`}
                  error={errors[key as keyof Updates]?.message}
                />
              ))}
              <button
                type="submit"
                className="mt-2 bg-indigo-700 text-white py-2 px-4 w-full rounded-md font-semibold"
              >
                Update
              </button>
            </>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProduct;
