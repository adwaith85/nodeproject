import { useEffect } from "react"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from "react-bootstrap/ListGroup"; 
import Button from "react-bootstrap/Button"; 
import CartStore from "../store";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, remove } = CartStore();
  console.log(cart)

  useEffect(() => {
    if (cart.length === 0) {
      console.log("Your cart is empty!"); 
      // optional: alert("Your cart is empty!");
    }
  }, [cart]);

  return (
    <>
      <h2>Your Cart</h2>
      <Link to={'/'}>HOME</Link>
      <Container>
        <Row>
          {cart.map((item) => (
            <Col key={item.id}>
              <Card style={{ width: "18rem", margin: "20px" }}>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <img
                        style={{ width: "13rem", height: "10rem" }}
                        src={item.image}
                        alt={item.name}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>{item.name}</ListGroup.Item>
                    <ListGroup.Item>₹{item.price}</ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => remove(item.id)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Cart;
