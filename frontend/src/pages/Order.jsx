import { useEffect, useState } from "react"
import AuthStore from "../AuthStore"
import Header from "../components/Navbar"

function Order() {
  const {token}=AuthStore()
  console.log(token)

  const [order, setOrder] = useState([])

  const Uploaded = async () => {
    let res = await fetch("http://localhost:8000/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })

    let data = await res.json()
    setOrder(data)
   

  }

  
  useEffect(() => {
    Uploaded()
  }, [])

  return <>
    <div>
     <Header/>
          <div className="order">
            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>District</th>
                <th>Number</th>
              </tr>
              {
                order.map(item=><>
                <tr>
                <th>{item.userId}</th>
                <th>{item.name}</th>
                <th>{item.district}</th>
                <th>{item.number}</th>
              </tr>
                </>)
              }
            </table>
          </div>
        
    </div>

  </>
}

export default Order