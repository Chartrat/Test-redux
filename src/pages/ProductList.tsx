import React, { useEffect, useState } from "react";
import DessertList from "../components/DessertList";
import Cart from "../components/Cart";
import dessertData from "../data.json";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [desserts, setDesserts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    setDesserts(dessertData);
  }, []);

  return (
    <div className="container mt-5">
      <h1>Desserts</h1>
      <div className="row">
        <div className="col-md-8">
          <DessertList desserts={desserts} />
          </div>
        <div className="col-md-4">
          <Cart/>
        </div>
      </div>
    </div>
  );
}

export default App;
