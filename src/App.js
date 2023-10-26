import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
function App() {
  return (
    <div className="text-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
