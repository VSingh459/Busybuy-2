import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCart, clearCart } from "./cartReducer";
import { setOrders, clearOrders } from "./ordersReducer";
import productData from "../../utils/data.js";

// LOGIN
export const handleLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3700/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response from server:", data);

      const { token, cart, orders } = data;

      // ✅ Enrich cart with full product data from local list
      const enrichedCart = cart
        .filter(item => typeof item.productId === "number")
        .map(item => {
          const pid = item.productId;
          const matched = productData.find(p => p.id === pid);

          const enrichedItem = {
            id: pid,
            quantity: item.quantity,
            image: matched?.image || null,
            name: matched?.title || "",
            price: matched?.price || 0,
          };

          console.log("Enriched item:", enrichedItem);
          return enrichedItem;
        });

      console.log("Enriched Cart:", enrichedCart);

      thunkAPI.dispatch(setCart(enrichedCart));
      thunkAPI.dispatch(setOrders(orders));

      return token;
    } catch (error) {
      console.error("Login failed:", error);
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);



// SIGNUP
export const handleSignup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3700/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const token = await response.text(); // assuming plain token returned
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue("Signup failed");
    }
  }
);

// LOGOUT
// LOGOUT
export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    const cartArr = state.cart.cartArr;
    const orders = state.order.orders; // ✅ FIXED: was state.orders

    if (!token) {
      console.log("No token available for logout.");
      return;
    }

    console.log("🔥 Inside handleLogout thunk");
    console.log("Token being sent:", token);
    console.log("Cart contents:", cartArr);
    console.log("Orders contents:", orders);

    try {
      const response = await fetch("http://localhost:3700/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ cart: cartArr, orders }),
      });

      const result = await response.json();
      console.log("✅ Response from backend:", result);

      // Clear state in all slices
      thunkAPI.dispatch(clearCart());
      thunkAPI.dispatch(clearOrders());

      return;
    } catch (error) {
      console.error("Logout failed:", error);
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);


const initialState = {
  token: null,
  name: null,
  email: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = null;
      state.name = null;
      state.email = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = "succeeded";
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = "succeeded";
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.token = null;
        state.name = null;
        state.email = null;
        state.status = "idle";
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(handleSignup.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { clearToken, setToken } = authSlice.actions;
export default authSlice.reducer;
