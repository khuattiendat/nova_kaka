import Single from "../../../components/single/Single.jsx"
import { singleProduct } from "../../../data.js"
import "./product.scss"

const Product = () => {

  //Fetch data and send to Single Component
  return (
    <div className="product">
       <Single {...singleProduct}/>
    </div>
  )
}

export default Product