import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const response = await api.post("/order", payload);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.CREATE_ORDER_SUCCESS,
      payload: response.data.orderNum,
    });
    dispatch(cartActions.getCartQty());
    navigate("/payment/success");
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST });
    const response = await api.get("/order");
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_ORDER_SUCCESS,
      payload: response.data.orderList,
    });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_FAIL, payload: error.error });
  }
};
const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST });
    const response = await api.get("/order/admin", { params: { ...query } });
    if (response.status !== 200) throw new Error(response.error);
    const data = response.data;

    dispatch({
      type: types.GET_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: error.error });
  }
};

const updateOrder = (id, status, page) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });
    const response = await api.put(`/order/admin/${id}`, { status: status });
    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.UPDATE_ORDER_SUCCESS,
    });
    dispatch(getOrderList({ page }));

    dispatch(
      commonUiActions.showToastMessage("배송상태가 변경되었습니다!", "success")
    );
  } catch (error) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, "error"));
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
