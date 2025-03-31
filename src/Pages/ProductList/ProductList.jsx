/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "./ProductList.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../../../../frontend/frontend/src/Context/StoreContext";

const ProductList = ({ url }) => {
  const [ProductList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { imageData, setImageData } = useContext(StoreContext);
  const fetchList = () => {
    setLoading(true);
    axios
      .get(`${url}/api/v1/food/getFoodList`)
      .then((response) => {
        if (response.data.success) {
          setProductList(response?.data?.data);
        } else {
          toast.error("Error!");
        }
      })
      .catch((error) => {
        toast.error("Error!");
        console.error("There was an error fetching the food list!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeProduct = async (id) => {
    const removeProduct = await axios.delete(`${url}/api/v1/food/removeItem`, {
      data: { id: id },
    });
    if (removeProduct.data.success) {
      toast.success(removeProduct.data.message);
      fetchList();
    } else {
      toast.error("Error!");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="food-list flex-col">
      <p>All Food List</p>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {ProductList.map((val, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + val?.image} />
                <p>{val.name}</p>
                <p>{val.category}</p>
                <p>${val.price}</p>
                <p
                  onClick={() => {
                    removeProduct(val?._id);
                  }}
                >
                  🗑️
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
