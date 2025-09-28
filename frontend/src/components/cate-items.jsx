import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "./Navbar";
import { CateOption } from "../pages/home";

function DisplayCategory() {

    const { name } = useParams()
    const [cateItems, setcateItems] = useState([])
    const getcateItems = async () => {
        let res = await fetch(`http://localhost:8000/cateItem/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/JSON"
            },
        })
        let data = await res.json()
        setcateItems(data)
    }

    useEffect(() => {
        getcateItems()
    }, [{ name }])

    return <>
        <Header />
        <CateOption />

        <h2>{name}</h2>
        {
            cateItems.map(item => <>
                <div>
                    <Card className="card" >
                        <ListGroup variant="flush">
                            <ListGroup.Item><img style={{ width: '13rem', height: '10rem' }} src={item.image}></img></ListGroup.Item>
                            <ListGroup.Item>{item.name}</ListGroup.Item>
                            <ListGroup.Item>{item.price}</ListGroup.Item>
                            <ListGroup.Item>
                                {item?.category?.name ?? "no category"}
                            </ListGroup.Item>
                            <button onClick={() => {
                                console.log(item)
                                add(item)
                            }}>ADD TO CART</button>
                            {/* <ListGroup.Item><button onClick={() => deleteItem(item._id)}>DELETE</button></ListGroup.Item> */}

                        </ListGroup>
                    </Card>

                </div>
            </>)
        }
    </>
}

export default DisplayCategory