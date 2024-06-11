import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({ order }) => {
  const { orderNum, items, totalPrice, createdAt } = order;
  const dateStr = createdAt;
  const dateOnly = dateStr?.match(/^\d{4}-\d{2}-\d{2}/)[0];
  return (
    <div>
      <Row className="status-card">
        <Col xs={2}>
          <img src={items[0].productId.image} alt="" height={96} />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {orderNum}</strong>
          </div>

          <div className="text-12">{dateOnly || ""}</div>

          <div>
            {items[0].productId.name}
            {items.length > 1 && `외 ${items.length - 1}개`}
          </div>
          <div>₩ {currencyFormat(totalPrice)}</div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg="warning">preparing</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
