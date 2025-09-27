import React, { useEffect, useState, useRef } from "react";
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
        getData();
    }, [searchItem]);

    return (
        <>
            <Header SetSearchItem={SetSearchItem} />
            <CateOption />

            {token ? (
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
            ) : (
                <Navigate to={"/login"} />
            )}
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
            const childrenArray = Array.from(container.children);
            const containerCenter = container.scrollLeft + container.offsetWidth / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            childrenArray.forEach((child, index) => {
                const childCenter = child.offsetLeft + child.offsetWidth / 2;
                const distance = Math.abs(containerCenter - childCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            setCenterIndex(closestIndex);
        };

        container.addEventListener("scroll", handleScroll);
        handleScroll(); // initial call

        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="horizontal-scroll-container">
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    className: (child.props.className || "") + (index === centerIndex ? " in-view" : ""),
                    key: index,
                })
            )}
        </div>
    );
}

export { Detail, CateOption, HorizontalScroll };
export default Home;
