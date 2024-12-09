import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";

const DessertList = ({ desserts }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // ฟังก์ชันหาปริมาณสินค้าที่เพิ่มในตะกร้า
  const getItemQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="desserts">
      {desserts.map((dessert) => {
        const quantity = getItemQuantity(dessert.id);

        return (
          <div key={dessert.id} className="dessert-item">
            <img
              src={dessert.image.thumbnail}
              alt={dessert.name}
              className="dessert-image"
            />
            <p className="dessert-category">{dessert.category}</p>
            <h5>{dessert.name}</h5>
            <p className="dessert-price">${dessert.price.toFixed(2)}</p>


            {quantity === 0 ? (
              <button
                className="add-to-cart-btn"
                onClick={() => dispatch(addToCart(dessert))}
              >
                <span>🛒 Add to Cart</span>
              </button>
            ) : (
              <div className="quantity-controls">
                <button
                  className="decrease-btn"
                  onClick={() => dispatch(removeFromCart(dessert.id))}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="increase-btn"
                  onClick={() => dispatch(addToCart(dessert))}
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DessertList;
