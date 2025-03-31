import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/sideBar/SideBar";
import AddProduct from "./Pages/AddProduct/AddProduct";
import ProductList from "./Pages/ProductList/ProductList";
import ProductOrder from "./Pages/ProductOrders/ProductOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const URL = "http://localhost:8080";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path="/add" element={<AddProduct url={URL} />} />
          <Route path="/list" element={<ProductList url={URL} />} />
          <Route path="/orders" element={<ProductOrder url={URL} />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
