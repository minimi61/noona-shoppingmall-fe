import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  const nonStockCheck = Object.values(item.stock).every((_item) => _item === 0);

  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      {nonStockCheck && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            padding: "0 10px",
          }}
        >
          SOLD OUT
        </div>
      )}
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
