import React , {useEffect}from 'react'

function HomePage() {

    useEffect(()=>{
        document.title = "Home"
    })
    return (
        <div>
            Home page
        </div>
    )
}

export default HomePage
