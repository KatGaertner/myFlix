import { Col, Row, Button } from "react-bootstrap";
import { leftColumnWidth, rightColumnWidth } from "./layout";
import PropTypes from "prop-types";

export const ProfileShow = ({ userData, handleToggle }) => {
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
      return <i>not set</i>;
    }
  };

  return (
    <>
      <div className="d-flex mb-2">
        <Button className="mb-2" variant="primary" onClick={handleToggle}>
          Edit
        </Button>
      </div>
      <Row className="my-3">
        <Col sm={leftColumnWidth} className="">
          Username:
        </Col>
        <Col sm={rightColumnWidth}>{userData.name}</Col>
      </Row>
      <Row className="my-3">
        <Col sm={leftColumnWidth} className="">
          E-Mail:
        </Col>
        <Col sm={rightColumnWidth}>{userData.email}</Col>
      </Row>
      <Row className="my-3">
        <Col sm={leftColumnWidth} className="">
          Birthday:
        </Col>
        <Col sm={rightColumnWidth}>{showBirthday(userData.birthday)}</Col>
      </Row>
    </>
  );
};

ProfileShow.propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
    favorites: PropTypes.arrayOf(PropTypes.string),
  }),
};
