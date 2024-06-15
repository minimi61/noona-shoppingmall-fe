import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const Popup = ({ children }) => {
  const [showMainPop, setShowMainPop] = useState(false);
  const checkExpires = () => {
    const existExpires = localStorage.getItem("popup");
    if (existExpires) {
      setShowMainPop(false);
    } else {
      setShowMainPop(true);
    }
  };
  const closeTodayPop = () => {
    let expires = new Date();
    expires = expires.setHours(expires.getHours() + 24);
    localStorage.setItem("popup", expires);
    setShowMainPop(false);
  };

  useEffect(() => {
    checkExpires();
  }, []);
  return (
    <>
      {children}
      {showMainPop && (
        <>
          <div
            style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999,
            }}
          >
            <img
              src="image/openpopup.png"
              style={{ width: "400px", height: "500px" }}
            />
            <div
              style={{
                textAlign: "end",
                padding: "5px",
                fontSize: "18px",
                cursor: "pointer",
              }}
              onClick={closeTodayPop}
            >
              오늘 하루 보지 않기
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Popup;
