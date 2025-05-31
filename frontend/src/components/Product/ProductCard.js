import "./Product.css";
import adder from '../../assets/addCircle.png';
import minus from '../../assets/minusCircle.png';
import { useDispatch } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  rem,
} from "../../redux/reducers/cartReducer";

function PCard({ id, image, name, price, flag, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="pp">
      <img src={image} alt="Product" id="prodIcon" />
      <p id="name">{name}</p>

      <div id="paral">
        <p id="price">Rs {price}</p>
        {flag && (
          <div id="imo">
            <button id="bA" onClick={() => dispatch(increaseQuantity(id))}>
              <img src={adder} alt="add Circle" id="aa" />
            </button>

            <p id="qu">{quantity}</p>

            <button id="qM" onClick={() => dispatch(decreaseQuantity(id))}>
              <img src={minus} alt="minus Circle" id="mm" />
            </button>
          </div>
        )}
      </div>

      {flag ? (
        <button id="red" onClick={() => dispatch(rem(id))}>
          Remove From Cart
        </button>
      ) : (
        <button
          id="pipo"
          onClick={() => dispatch(addToCart({ id, image, name, price }))}
        >
          Add To Cart
        </button>
      )}
    </div>
  );
}

export default PCard;
