import PropTypes from "prop-types";

export const moviesType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    imageURL: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
  })
);
