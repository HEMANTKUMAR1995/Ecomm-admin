import axios from "axios";
import { useState } from "react";

// let button = new Button();
const RemoveProduct = () => {
  const [responseData, setResponseData] = useState({});
  var idList = [];
  const deleteFoodItem = async (res) => {
    const deleteURL = "http://localhost:8080/api/v1/food/removeItem";
    res?.map((id) => idList.push(id?._id));

    try {
      const response = await axios.delete(deleteURL, {
        data: { id: idList[0] },
      });

      if (response.data.success) {
        console.log("Food item deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  function HandleClick() {
    axios
      .get("http://localhost:8080/api/v1/food/getFoodList")
      .then((response) => {
        if (response.data) {
          console.log("***res", response);
          //   console.log(response.data);
          setResponseData(response?.data?.data);
        }

        return deleteFoodItem(responseData);
        // return console.log("resp", responseData);
      });
  }
  return (
    <div className="Remove-Product">
      <button
        // type="button"
        style={{ backgroundColor: "red" }}
        onClick={HandleClick}
      >
        Remove
      </button>
      <button style={{ backgroundColor: "yellow" }}>See All items</button>
    </div>
  );
};

export default RemoveProduct;
