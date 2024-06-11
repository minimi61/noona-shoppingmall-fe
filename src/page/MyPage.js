import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";

const MyPage = () => {
  const dispatch = useDispatch();
  const { myOrder } = useSelector((state) => state.order);
  //오더리스트 들고오기
  useEffect(() => {
    dispatch(orderActions.getOrder());
  }, []);
  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  return (
    <Container className="status-card-container">
      {myOrder.length > 0 ? (
        myOrder.map((order, idx) => <OrderStatusCard order={order} key={idx} />)
      ) : (
        <div className="text-align-center empty-bag">
          <h2> 주문한 상품이 없습니다</h2>
        </div>
      )}
    </Container>
  );
};

export default MyPage;
