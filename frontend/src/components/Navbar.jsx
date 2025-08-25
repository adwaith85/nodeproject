import { Link } from "react-router-dom"

function Navbar(){

    return <div className="navbar">
    
    <Link to={'/'}>HOME</Link>
    <Link to={'/admin'}>ADMIN</Link>
    </div>
}


export default Navbar