import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const history = useNavigate();

  return <Button onClick={() => history(-1)}>Go back</Button>;
};
