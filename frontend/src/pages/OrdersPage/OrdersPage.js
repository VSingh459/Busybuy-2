import { useSelector } from "react-redux";
import OrderTable from "../../components/OrderTable/OrderTable";
import "./Orders.css";

const OrdersPage = () => {
  const orders = useSelector((state) => state.order.orders);

  console.log("Orders received in OrdersPage:", orders);

  return (
    <div>
      <h2>My Orders</h2>
      <OrderTable orders={orders || []} />
    </div>
  );
};

export default OrdersPage;
