import PropTypes from "prop-types";
import { Form, InputGroup } from "react-bootstrap";
import { useState } from "react";

export const PasswordField = ({
  fieldID,
  fieldValue,
  onChange,
  fieldPlaceholder = "",
  required = false,
  className = "",
  ariaDescribedby = "",
  autocomplete,
}) => {
  const [passwordFieldType, setPasswordFieldType] = useState("password");

  const togglePasswordFieldType = () => {
    if (passwordFieldType === "password") {
      setPasswordFieldType("text");
    } else {
      setPasswordFieldType("password");
    }
  };

  return (
    <>
      <InputGroup className={className}>
        <Form.Control
          type={passwordFieldType}
          id={fieldID}
          value={fieldValue}
          onChange={onChange}
          minLength={8}
          placeholder={fieldPlaceholder}
          required={required}
          aria-describedby={ariaDescribedby}
          autoComplete={autocomplete}
        />
        <InputGroup.Text className="bg-body">
          <img
            role="button"
            src={
              passwordFieldType === "password"
                ? require("./eye.svg")
                : require("./eye-alt.svg")
            }
            title={
              passwordFieldType === "password"
                ? "Show password"
                : "Hide password"
            }
            width={"18px"}
            height={"18px"}
            onClick={togglePasswordFieldType}
          />
        </InputGroup.Text>
      </InputGroup>
    </>
  );
};

PasswordField.propTypes = {
  fieldID: PropTypes.string.isRequired,
  fieldValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldPlaceholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  ariaDescribedby: PropTypes.string,
  autocomplete: PropTypes.string.isRequired,
};
