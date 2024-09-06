import Single from "../../../components/single/Single.jsx"
import { singleUser } from "../../../data.js"
import "./user.scss"

const User = () => {

  //Fetch data and send to Single Component
  
  return (
    <div className="user">
      <Single {...singleUser}/>
    </div>
  )
}

export default User