import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, InputGroup } from "react-bootstrap";
import { setFilter } from "../../redux/reducers/movies";

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <InputGroup className="mx-md-5 mb-3 mb-md-0">
      <Form.Control
        type="text"
        id="movies-filter"
        aria-label="Start typing to filter movies"
        placeholder="Start typing to filter movies..."
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        className="bg-primary filterbar"
      />
      <Button
        variant="outline-secondary"
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
