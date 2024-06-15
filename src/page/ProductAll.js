import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import ReactPaginate from "react-paginate";
import useQueryState from "../hooks/useQueryState";

const ProductAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.product.error);
  const { productList, totalPageNum } = useSelector((state) => state.product);

  const [query, setQuery] = useSearchParams();
  const name = query.get("name") || "";
  const page = query.get("page") || 1;

  useEffect(() => {
    const params = { name, page };
    if (page) {
      dispatch(productActions.getProductList(params));
    }
  }, [dispatch, name, page]);

  const handlePageClick = ({ selected }) => {
    const newQuery = new URLSearchParams(query.toString());
    newQuery.set("page", selected + 1);
    setQuery(newQuery);
  };
  return (
    <Container>
      <Row>
        {productList.length > 0 ? (
          productList.map((item) => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {name === "" ? (
              <h2>등록된 상품이 없습니다!</h2>
            ) : (
              <h6>{name}과 일치한 상품이 없습니다!</h6>
            )}
          </div>
        )}
      </Row>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={parseInt(page) - 1} // 문자열을 숫자로 변환하고 0-indexed 페이지 번호로 변환
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        className="display-center list-style-none"
      />
    </Container>
  );
};

export default ProductAll;
