import { Col, Row, Button } from "react-bootstrap";
import { leftColumnWidth, rightColumnWidth } from "./layout";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const ProfileShow = ({ handleToggle }) => {
  const userData = useSelector((state) => state.userData.data);

  const showBirthday = (datafield) => {
    if (datafield) {
      // the date has to be parsed as UTC, otherwise it might get pushed around based on local timezones
      // the "undefined" parameter should mean the date is in the local format in the browser
      const dateFormatter = new Intl.DateTimeFormat(undefined, {
        timeZone: "UTC",
        dateStyle: "long",
      });
      return dateFormatter.format(new Date(datafield));
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="d-flex button-container">
        <Button className="" variant="primary" onClick={handleToggle}>
          Edit
        </Button>
      </div>

      <Row className="show-row">
        <Col sm={leftColumnWidth} className="show-left">
          Username:
        </Col>
        <Col sm={rightColumnWidth} className="show-right">
          {userData.name}
        </Col>
      </Row>
      <Row>
        <Col sm={leftColumnWidth} className="show-left">
          E-Mail:
        </Col>
        <Col sm={rightColumnWidth} className="show-right">
          {userData.email}
        </Col>
      </Row>
      <Row>
        <Col sm={leftColumnWidth} className="show-left">
          Birthday:
        </Col>
        <Col sm={rightColumnWidth} className="show-right">
          {showBirthday(userData.birthday)}
        </Col>
      </Row>
      <Row>
        <Col sm={leftColumnWidth} className="show-left" />
        <Col sm={rightColumnWidth} className="show-right" />
      </Row>
    </>
  );
};

ProfileShow.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};
