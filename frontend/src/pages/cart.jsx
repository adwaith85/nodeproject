import { useEffect } from "react"
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import CartStore from "../store";
import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import AuthStore from "../AuthStore";

function Cart() {
  const { cart, remove } = CartStore();
  const {token}=AuthStore()
  console.log(cart)

  useEffect(() => {
    if (cart.length === 0) {
      console.log("Your cart is empty!");
      // optional: alert("Your cart is empty!");
    }
  }, [cart]);


  return (
    <>

      <Header />
     {
      token?<>
            <center><h2>Your Cart</h2></center>
      <Container >
        <Row>
          {cart.map((item) => (
            <Col key={item.id}>
              <Card className="cart">
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <img
                        style={{ width: "13rem", height: "10rem",borderRadius:"9px",borderColor:"black",border:"1px solid" }}
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
      </Container></>:<>
      
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      <h1>not logind</h1>
      </>
     }
    </>
  );
}

export default Cart;
