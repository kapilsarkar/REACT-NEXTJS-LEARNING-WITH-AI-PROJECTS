import { useEffect } from "react"
import { account } from "../appwrite/config.js"
const Home = () => {
  useEffect(()=>{
      console.log(account)
  },[])
  return (
    <div>
       <h2>Home</h2>
       
    </div>
  )
}

export default Home
