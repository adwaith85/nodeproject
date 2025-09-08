import { useEffect, useState } from "react"
import Header from "../components/Navbar"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Navigate, useNavigate } from "react-router-dom";

import AuthStore from "../AuthStore";

function Home() {

    const [data, SetData] = useState([])
    const [cart, setCart] = useState()
    const [searchItem, SetSearchItem] = useState("")
    const navigate = useNavigate()
    const {token}=AuthStore()


    const getData = async () => {
         // Or wherever you stored the JWT

        let res = await fetch(`http://localhost:8000/products?search=${searchItem}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!res.ok) {
            navigate("/login")
            return alert(
                " not logined")


        }



        let data = await res.json()


        SetData(data)

    }

    const additem = (item) => {
        setCart((prev) => [...prev, item])
    }



    useEffect(() => {
        getData()

    }, [searchItem])

    const deleteItem = async (id) => {
        await fetch(`http://localhost:8000/products/${id}`, {
            method: "DELETE"
        })
        SetData(currentdata => currentdata.filter(item => item._id !== id))

    }



    return <>

        <Header SetSearchItem={SetSearchItem} />
        {/* <div className="body">


            {
                data.map(item => <>
                    <Card className="card" style={{ width: '18rem', backgroundColor: "", margin: "20px" }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item><img style={{ width: '13rem', height: '10rem' }} src={item.image}></img></ListGroup.Item>
                            <ListGroup.Item>{item.name}</ListGroup.Item>
                            <ListGroup.Item>{item.price}</ListGroup.Item>
                            <ListGroup.Item><button onClick={() => deleteItem(item._id)}>DELETE</button></ListGroup.Item>

                        </ListGroup>
                    </Card>


                </>)
            }
        </div> */}
{
    token?
        <Container fluid>
            <Row className="g-2">
                {data.map(item => (
                    <Col key={item.id} className="g-4">
                        <Detail
                            additem={additem}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        id={item._id}
                        />
                    </Col>
                ))}
            </Row>
        </Container>:<Navigate to={"/login"}/>
}


    </>
}


import CartStore from "../store";

function Detail(props) {

    const {add}=CartStore()

    const item = {
        id: props.id,
        image: props.image,
        name: props.name,
        price: props.price
    };

    return (

        <Card className="card" style={{ width: '18rem', backgroundColor: "", margin: "20px" }}>
            <ListGroup variant="flush">
                <ListGroup.Item><img style={{ width: '13rem', height: '10rem' }} src={item.image}></img></ListGroup.Item>
                <ListGroup.Item>{item.name}</ListGroup.Item>
                <ListGroup.Item>{item.price}</ListGroup.Item>
                <button onClick={() =>{
                    console.log(item)
                    add(item)
                }}>ADD TO CART</button>
                {/* <ListGroup.Item><button onClick={() => deleteItem(item._id)}>DELETE</button></ListGroup.Item> */}

            </ListGroup>
        </Card>

    );
}

export default Home