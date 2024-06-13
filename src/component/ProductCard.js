import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`);
  };

  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      <img
        src={item.image || ""}
        alt=""
        style={{ width: "100%", height: "300px" }}
      />
      <div style={{ margin: "10px 0px", fontSize: "20px", fontWeight: "bold" }}>
        {item.name}
      </div>
      <div style={{ fontSize: "18px" }}>
        ₩ {Number(item.price).toLocaleString()}
      </div>
    </div>
  );
};

export default ProductCard;
