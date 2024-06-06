import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const useQueryState = (initialState, action) => {
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    page: query.get("page") || initialState.page,
    name: query.get("name") || initialState.name,
  });
  const [prevState, setPrevState] = useState({});

  useEffect(() => {
    const currentName = query.get("name");
    const currentPage = query.get("page") || initialState.page;

    setState((prevState) => {
      if (prevState.name !== currentName || prevState.page !== currentPage) {
        return { page: currentPage, name: currentName || "" };
      }
      return prevState;
    });
  }, [query, initialState.page]);

  useEffect(() => {
    if (state.page !== prevState.page || state.name !== prevState.name) {
      setPrevState(state);

      const params = new URLSearchParams(state);
      navigate("?" + params.toString());

      dispatch(action(state));
    }
  }, [state, navigate, dispatch, action]);

  return [state, setState];
};

export default useQueryState;
