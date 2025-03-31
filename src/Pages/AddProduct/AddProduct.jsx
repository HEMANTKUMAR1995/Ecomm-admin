import { useState } from "react";
import { assets } from "../../assets/assets";
import "./AddProduct.css";
import axios from "axios";
import RemoveProduct from "../RemoveProduct/RemoveProduct";
import HandleClick from "../RemoveProduct/RemoveProduct";
import { ADMIN_URL, itemCategory } from "../../Constants";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [image, setImage] = useState();
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const food_Item_list = Object.values(itemCategory);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const AddURL = ADMIN_URL;
    var formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("description", String(productDetails.description));
    formData.append("price", Number(productDetails.price));
    formData.append("category", productDetails.category);
    formData.append("image", image);
    const response = await axios.post(`${AddURL}/api/v1/food/add`, formData);
    if (response.data.success) {
      setProductDetails({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add-Product">
      <form className="flex-col" onSubmit={handleOnSubmit}>
        <div className="add-image-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
            />

            <input
              type="file"
              id="image"
              hidden
              required
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </label>
        </div>
        <div className="add-product-name flex col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            placeholder="Type Here"
            value={productDetails.name}
            onChange={onChangeHandler}
          />
          <div className="add-product-desc felx-col">
            <p>Product Descrioption</p>
            <textarea
              name="description"
              rows="6"
              placeholder="Write content here"
              required
              value={productDetails.description}
              onChange={onChangeHandler}
            />
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select
                name="category"
                value={productDetails.category}
                onChange={onChangeHandler}
              >
                {food_Item_list.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
                {/* <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Desert">Desert</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="pasta">pasta</option>
                <option value="Noodles">Noodles</option> */}
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input
                type="number"
                name="price"
                placeholder="$20"
                value={productDetails.price}
                onChange={onChangeHandler}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="add-button">
          Add
        </button>
        <RemoveProduct
          onClick={() => {
            HandleClick;
          }}
        />
      </form>
    </div>
  );
};

export default AddProduct;
