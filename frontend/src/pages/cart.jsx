import { useEffect, useState } from "react"
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
import { Navigate, useNavigate } from "react-router-dom";

function Cart() {
  const { cart, remove, add, decrease, getTotal } = CartStore();
  const { token } = AuthStore()
  console.log(cart)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (cart.length === 0) {
      console.log("Your cart is empty!");
      // optional: alert("Your cart is empty!");
    }
  }, [cart]);


  return <><Header />
    {
      token ? <>
      

        <div className="cart-details">
          <center><h2>Your Cart</h2></center>
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <h2>Total Amount = ₹{getTotal()}</h2>
          </div>
          <Container >
            <Row className="flex-column">
              {cart.map((item) => (
                <Col key={item.id}>
                  <Card className="cart">
                    <Card.Body >
                      <ListGroup variant="flush">
                        <div className="container">
                          <div className="cartimage">


                            <img
                              style={{ width: "10rem", height: "8rem", borderRadius: "9px", borderColor: "black", border: "1px solid" }}
                              src={item.image}
                              alt={item.name}
                            />

                          </div>
                          <div className="cart-text">
                            <ListGroup.Item>{item.name}</ListGroup.Item>
                            <ListGroup.Item>₹{item.price}</ListGroup.Item>
                            <button onClick={() => decrease(item.id)}>-</button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                            // style={{ width: "40px", textAlign: "center" }}
                            />
                            <button onClick={() => add(item)}>+</button>
                          </div>



                          <Button
                            variant="danger"
                            className="btn"
                            onClick={() => remove(item.id)}
                          >
                            Remove
                          </Button>

                        </div>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container></div>
      
      
      </>  : <Navigate to={"/login"} />
    }
  </>
}

export default Cart;
