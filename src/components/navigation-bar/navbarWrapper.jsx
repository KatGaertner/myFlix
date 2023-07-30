import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const useOutsideAlerter = (ref, handleToggle) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleToggle();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
};

export const OutsideAlerter = (props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.handleToggle);

  return <div ref={wrapperRef}>{props.children}</div>;
};

OutsideAlerter.propTypes = {
  props: PropTypes.object,
};
