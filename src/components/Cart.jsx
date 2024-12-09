import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const handleConfirmOrder = () => {
    setIsModalOpen(true); // Show modal when order is confirmed
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
    dispatch(clearCart()); // Optionally clear the cart when the modal is closed
  };

  return (
    <div className="cart">
      <h2 className="cart-title">
        Your Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
      </h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-content">
          {cart.map((item) => {
            return (
              <div key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-quantity-price">
                    {item.quantity}x @ ${item.price.toFixed(2)} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  className="remove-item-btn"
                  onClick={() => {
                    dispatch(removeFromCart(item.id));
                  }}
                >
                  ✖
                </button>
              </div>
            );
          })}
          <div className="cart-summary">
            <h3 className="order-total">Order Total: ${total.toFixed(2)}</h3>
            <p className="delivery-info">
              This is a <span>carbon-neutral</span> delivery
            </p>
          </div>
          <div className="cart-buttons">
            <button
              className="clear-cart-btn"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              Clear Cart
            </button>
            <button className="confirm-order-btn" onClick={handleConfirmOrder}>
              Confirm Order
            </button>
          </div>
        </div>
      )}

<Modal
  show={isModalOpen}
  onHide={handleCloseModal}
  centered
  dialogClassName="mobile-modal"
>
  <Modal.Body>
    <div className="order-confirmation">
      <div className="confirmation-header">
        <div className="icon-check">✔</div>
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
      </div>

      <div className="order-details">
        {cart.map((item) => (
          <div key={item.id} className="order-item">
            <img
              src={item.image.thumbnail}
              alt={item.name}
              className="item-thumbnail"
            />
            <div className="item-info">
              <p className="item-name">{item.name}</p>
              <p className="item-quantity-price">
                <span>{item.quantity}x</span> @ ${item.price.toFixed(2)}
              </p>
            </div>
            <p className="item-total">${(item.quantity * item.price).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="order-total">
        <p>Order Total</p>
        <h4>${total.toFixed(2)}</h4>
      </div>
    </div>
  </Modal.Body>

  <Modal.Footer className="mobile-footer">
    <button
      className="start-new-order-btn"
      onClick={() => {
        handleCloseModal();
        dispatch(clearCart());
      }}
    >
      Start New Order
    </button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default Cart;
