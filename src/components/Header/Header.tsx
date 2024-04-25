import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-indigo-700 text-white p-4 flex justify-around items-center">
      <Link href={"/"} className="text-4xl font-bold">
        Inventory
      </Link>
      <Link
        href={"/add-product"}
        className="bg-green-400 py-3 px-6 rounded-md font-bold hover:bg-white hover:text-black hover:duration-500"
      >
        Add Product
      </Link>
    </div>
  );
};

export default Header;
