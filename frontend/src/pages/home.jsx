import React, { useEffect, useState, useRef } from "react";
import './Home.css'
import LandingPage from "./LandingPage";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Navbar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import AuthStore from "../AuthStore";
import CartStore from "../store";

function Home() {
  const [data, SetData] = useState([]);
  const [cart, setCart] = useState([]); // initialize as empty array
  const [searchItem, SetSearchItem] = useState("");

  const navigate = useNavigate();
  const { token } = AuthStore();

  const getData = async () => {
    if (!token) return;

    let res = await fetch(`http://localhost:8000/products?search=${searchItem}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      navigate("/login");
      return " not logined";
    }

    let data = await res.json();
    SetData(data);
  };

  const additem = (item) => {
    setCart((prev) => [...prev, item]);
  };

  useEffect(() => {
    if (token) {
      getData();
    }
  }, [searchItem, token]);

  return (
    <>
      <div className="home-page">
        <Header SetSearchItem={SetSearchItem} />
        {token ? (
          <>
            <CateOption />
            <Container fluid>
              <Row>
                <HorizontalScroll>
                  {data.map((item) => (
                    <Detail
                      key={item._id}
                      additem={additem}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      id={item._id}
                      category={item?.category ?? ""}
                    />
                  ))}
                </HorizontalScroll>
              </Row>
            </Container>
          </>
        ) : (
          <LandingPage />
        )}
      </div>
    </>
  );
}

function Detail(props) {
  const { add } = CartStore();

  const item = {
    id: props.id,
    image: props.image,
    name: props.name,
    price: props.price,
    category: props.category,
  };

  return (
    <Card className={`card ${props.className || ""}`}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <img className="card-image" src={item.image} alt={item.name} />
        </ListGroup.Item>
        <ListGroup.Item>{item.name}</ListGroup.Item>
        <ListGroup.Item>{item.price}</ListGroup.Item>
        <ListGroup.Item>{item?.category?.name ?? "no category"}</ListGroup.Item>
        <button
          onClick={() => {
            console.log(item);
            add(item);
          }}
        >
          ADD TO CART
        </button>
      </ListGroup>
    </Card>
  );
}

function CateOption() {
  const [categorylist, setCategorylist] = useState([]);

  const getCategory = async () => {
    let res = await fetch("http://localhost:8000/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    setCategorylist(data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <section className="flipkart-category-strip">
      {categorylist.map((item, index) => (
        <Link to={`/Categories/${item.name}`} className="category-label" key={index}>
          <div className="category-tile">
            {item.image && <img src={item.image} alt={item.name} className="category-icon" />}
            {item.name}
          </div>
        </Link>
      ))}
    </section>
  );
}

function HorizontalScroll({ children }) {
  const containerRef = useRef(null);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll('.card');
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenterX - cardCenterX);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCenterIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Spacer to allow first and last card to reach center
  const spacerStyle = { width: 'calc(50vw - 125px)', flexShrink: 0 };

  return (
    <div ref={containerRef} className="horizontal-scroll-container">
      <div style={spacerStyle} />
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          className: `${child.props.className || ""} card${index === centerIndex ? " in-view" : ""}`,
          key: index,
        })
      )}
      <div style={spacerStyle} />
    </div>
  );
}

export { Detail, CateOption, HorizontalScroll };
export default Home;
