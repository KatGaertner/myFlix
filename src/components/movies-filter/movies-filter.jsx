import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, InputGroup } from "react-bootstrap";
import { setFilter } from "../../redux/reducers/movies";

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  // clean up when filter element is dismounted
  useEffect(() => {
    return () => {
      dispatch(setFilter(""));
    };
  }, []);

  return (
    <InputGroup className="filter-container">
      <Form.Control
        type="text"
        id="movies-filter"
        aria-label="Start typing to filter movies"
        placeholder="Start typing to filter movies..."
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        className="filterbar"
      />
      <Button
        variant="secondary"
        type="button"
        onClick={(e) => dispatch(setFilter(""))}
        className="reset-btn"
        title="Reset filter"
      >
        &times;
      </Button>
    </InputGroup>
  );
};
