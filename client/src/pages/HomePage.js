import React , {useEffect}from 'react'
import ReactPaginate from 'react-paginate'
import Loader from '../components/Loader/Loader'
function HomePage() {

    useEffect(()=>{
        document.title = "Home"
    })
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 ">
            {/* <Loader/> */}
           
        </div>
    )
}

export default HomePage
