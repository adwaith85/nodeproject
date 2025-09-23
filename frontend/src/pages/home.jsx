import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Navbar"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { Navigate, useNavigate } from "react-router-dom";

import AuthStore from "../AuthStore";

function Home() {

    const [data, SetData] = useState([])
    const [cart, setCart] = useState()

    const [categorylist, setCategorylist] = useState([])
    const [searchItem, SetSearchItem] = useState("")

    const navigate = useNavigate()
    const { token } = AuthStore()


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
            return (
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




    const getCategory = async () => {
        let res = await fetch("http://localhost:8000/category", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },

        })
        let data = await res.json()
        setCategorylist(data)
    }

    useEffect(() => {
        getCategory()
    }, [])

    // const deleteItem = async (id) => {
    //     await fetch(`http://localhost:8000/products/${id}`, {
    //         method: "DELETE"
    //     })
    //     SetData(currentdata => currentdata.filter(item => item._id !== id))

    // }



    return <>

        <Header SetSearchItem={SetSearchItem} />

       <section className="flipkart-category-strip">
  {categorylist.map((item, index) => (
    <div className="category-tile" key={index}>
      {item.image && (
        <img src={item.image} alt={item.name} className="category-icon" />
      )}
      <Link to={`/Categories/${item.name}`} className="category-label">
        {item.name}
      </Link>
    </div>
  ))}
</section>


        {/* <h2 className="category-list">
            {
                categorylist.map(item => <div className="cate-menu">
                <img src={item.image} alt=".." />
                    <Link to={`/Categories/${item.name}`} className="cate-link" >{item.name}</Link>
                    
                </div>)

            }
        </h2> */}


        {
            token ?

                <Container fluid>
                    <Row >
                        {data.map(item => (
                            <Col key={item.id} >
                                <Detail
                                    additem={additem}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    id={item._id}
                                    category={item?.category ?? ""}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container> : <Navigate to={"/login"} />
        }


    </>
}


import CartStore from "../store";

function Detail(props) {

    const { add } = CartStore()

    const item = {
        id: props.id,
        image: props.image,
        name: props.name,
        price: props.price,
        category: props.category
    };

    return (

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


    );
}

export default Home