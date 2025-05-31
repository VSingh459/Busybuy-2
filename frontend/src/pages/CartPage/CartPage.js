import './CartPage.css';
import PCard from '../../components/Product/ProductCard.js';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../../redux/reducers/ordersReducer';
import { clearCart } from '../../redux/reducers/cartReducer';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartArr = useSelector((state) => state.cart.cartArr);
  const total = useSelector((state) => state.cart.total);

  const handlePurchase = () => {
    if (cartArr.length === 0) return;

    const newOrder = {
      date: new Date().toISOString().split("T")[0],
      products: cartArr.map(({ id, name, quantity, price }) => ({
        id,
        title: name,
        quantity,
        price,
      })),
      totalPrice: total,
    };

    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    navigate("/orders");
  };

  return (
    <div className="cartMain">
      <div className="minor">
        <p id="tp">Total Price: Rs {total}</p>
        <button id="pur" onClick={handlePurchase}>Purchase</button>
      </div>

      <div className="cartProducts">
        {cartArr.map((product,index) => (
          <PCard
            key={product.id || index}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            flag={true}
            quantity={product.quantity}
          />
        ))}
      </div>
    </div>
  );
};

export default CartPage;
