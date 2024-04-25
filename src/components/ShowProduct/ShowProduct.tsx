"use client";
import React, { useEffect, useState } from "react";
import { IProduct } from "./interface/IShowProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const ShowProduct = () => {
  const [productLists, setProductLists] = useState<IProduct[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("https://inventory-nestjs-server.onrender.com/product/get-products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProductLists(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    const url = `https://inventory-nestjs-server.onrender.com/product/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedProducts =
          productLists &&
          productLists.filter((product: IProduct) => product._id !== id);
        setProductLists(updatedProducts);
        toast.success("Product deleted successfully", {
          position: "top-right",
        });
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Error deleting product", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="mt-10 text-center font-bold text-4xl">
          Available Products List
        </h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <table className="mt-4 border ">
            <tr>
              <th className="bg-violet-600 text-white p-4">Product Name</th>
              <th className="bg-violet-600 text-white p-4">Product Price</th>
              <th className="bg-violet-600 text-white p-4">Product Quantity</th>
              <th className="bg-violet-600 text-white p-4">Expairation Date</th>
              <th className="bg-violet-600 text-white p-4">Actions</th>
            </tr>
            <tbody>
              {productLists &&
                productLists.map((product: IProduct, index: number) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-200" : ""}
                  >
                    <td className="p-4">{product.productName}</td>
                    <td className="p-4"> ${product.productPrice}</td>
                    <td className="p-4">{product.productQuantity}</td>
                    <td className="p-4">{product.exprationDate}</td>

                    <Link
                      href={`/${product._id}`}
                      className="bg-orange-400 p-2.5 m-2 px-4 rounded-md text-white font-semibold hover:bg-neutral-300 hover:text-black hover:duration-500"
                    >
                      Update
                    </Link>
                    <button
                      onClick={(e) => handleDelete(product._id)}
                      className="bg-red-500 p-2 m-2 px-4 rounded-md text-white font-semibold  hover:bg-neutral-300 hover:text-black hover:duration-500"
                    >
                      Delete
                    </button>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ShowProduct;
