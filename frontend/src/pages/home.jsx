import { useEffect, useState } from "react"
import Header from "../components/Navbar"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Navigate, useNavigate } from "react-router-dom";

function Home() {

    const [data, SetData] = useState([])

    const [searchItem, SetSearchItem] = useState("")
    const navigate=useNavigate()
    const getData = async () => {
        let token = localStorage.getItem('token'); // Or wherever you stored the JWT

        let res = await fetch(`http://localhost:8000/products?search=${searchItem}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if(!res.ok){ 
            navigate("/login")
            return alert(
               " not logined")
              
            
        }

        

        let data = await res.json()


        SetData(data)

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
        <div className="body">


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
        </div>
    </>
}

export default Home