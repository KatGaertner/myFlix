import { Col, Row } from "react-bootstrap";
import { leftColumnWidth, rightColumnWidth } from "./layout";
import PropTypes from "prop-types";

export const ProfileShow = ({ userData }) => {
  const showBirthday = (datafield) => {
    if (datafield) {
      return datafield;
    } else {
      return <i>not set</i>;
    }
  };

  return (
    <>
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
    birthday: PropTypes.instanceOf(Date),
    favorites: PropTypes.arrayOf(PropTypes.string),
  }),
};
