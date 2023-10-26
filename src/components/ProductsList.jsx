import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const ProductsList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:3004/products");
    return response.data;
  };

  const { data } = useSWR("products", fetcher);
  if (!data) return <h2>Loading...</h2>;

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:3004/products/${productId}`);
    mutate("products");
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <Link
          to="/add"
          className="bg-green-500 hover:bg-green-700 border-slate-200 text-[#ffffff] font-bold py-2 px-4 rounded-lg"
        >
          Add New
        </Link>
        <div className="relative shadow rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => {
                return (
                  <tr className="bg-[#ffffff border-b" key={e.id}>
                    <th className="py-3 px-1 text-center">{i + 1}</th>
                    <th className="py-3 px-6 font-medium text-gray-900">
                      {e.name}
                    </th>
                    <th className="py-3 px-6">{e.price}</th>
                    <th className="py-3 px-6">Action</th>
                    <Link
                      to={`/edit/${e.id}`}
                      className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-[#ffffff]"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(e.id)}
                      to={`/edit/ `}
                      className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-[#ffffff]"
                    >
                      Delete
                    </button>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
