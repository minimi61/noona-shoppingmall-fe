import * as types from "../constants/order.constants";

const initialState = {
  loading: false,
  error: "",
  orderNum: "",
  myOrder: {},
  orderList: [],
  email: "",
  totalPageNum: 1,
  selectedOrder: {},
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
    case types.GET_ORDER_REQUEST:
    case types.GET_ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_ORDER_SUCCESS:
      return { ...state, orderNum: payload };
    case types.GET_ORDER_SUCCESS:
      return { ...state, myOrder: payload };
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        orderList: payload.data,
        email: payload.user,
        totalPageNum: payload.totalPageNum,
      };
    case types.CREATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
    case types.GET_ORDER_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    case types.SET_SELECTED_ORDER:
      return { ...state, selectedOrder: payload };
  }

  return state;
}
export default orderReducer;
