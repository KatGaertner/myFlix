import { Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export const LoadingInfo = () => {
  return (
    <Col className="d-flex justify-content-center rounded-4 bg-body">
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Col>
  );
};
