import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const { productList } = useSelector((state) => state.product);
  const navigate = useNavigate();

  // productList가 업데이트될 때마다 filterData를 다시 계산
  const filterData = productList || {}.find((item) => item._id === id);
  const { name, image, price, description, stock } = filterData || {};

  const stockToArray = Object.keys(stock || {}).map((size) => [
    size,
    stock[size],
  ]);
  const addItemToCart = () => {
    // 사이즈를 아직 선택 안 했다면 에러
    // 아직 로그인을 안 한 유저라면 로그인 페이지로 이동
    // 카트에 아이템 추가하기
  };

  const selectSize = (value) => {
    setSize(value);
  };

  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
  }, [dispatch, id]);
  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img src={image && image} className="w-100" alt="product" />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{name}</div>
          <div className="product-info">₩ {price}</div>
          <div className="product-info">{description}</div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
            >
              {size === "" ? "사이즈 선택" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {stockToArray.map((size, index) => (
                <Dropdown.Item
                  key={index}
                  style={{
                    width: "100%",
                  }}
                  eventKey={size[1] !== 0 && size[0]}
                  disabled={size[1] === 0}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div>{stockToArray[index][0]}</div>
                    <div>잔여: {stockToArray[index][1]}개</div>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "사이즈를 선택해주세요."}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
