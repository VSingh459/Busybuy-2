const OrderTable = ({ orders = [] }) => {  // Default to empty array
  return (
    <div className="order-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order">
            <h3 className="order-date">Order Date: {order.date}</h3>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price (Rs)</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, pIndex) => (
                  <tr key={pIndex}>
                    <td>{product.title}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="total-label">Total Price</td>
                  <td className="total-price">Rs {order.totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderTable;
