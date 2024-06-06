import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import ReactPaginate from "react-paginate";

const ProductAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.product.error);
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });
  const [prevQuery, setPrevQuery] = useState({});

  useEffect(() => {
    const currentName = query.get("name");
    const currentPage = query.get("page") || 1;

    setSearchQuery((prevState) => {
      if (prevState.name !== currentName || prevState.page !== currentPage) {
        return { page: currentPage, name: currentName || "" };
      }
      return prevState;
    });
  }, [query]);

  useEffect(() => {
    if (
      searchQuery.page !== prevQuery.page ||
      searchQuery.name !== prevQuery.name
    ) {
      setPrevQuery(searchQuery);

      const params = new URLSearchParams(searchQuery);
      navigate("?" + params.toString());
      dispatch(productActions.getProductList({ ...searchQuery }));
    }
  }, [searchQuery]);

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  return (
    <Container>
      <Row>
        {(productList || []).map((item, index) => (
          <Col md={3} sm={12} key={index}>
            <ProductCard productList={item} />
          </Col>
        ))}
      </Row>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={searchQuery.page - 1} // 1페이지면 2임 여긴 한개씩 +1 해야함
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
