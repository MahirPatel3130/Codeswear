import React from 'react'
import Product from "../models/Product";
import mongoose from 'mongoose';

const Tshirts = ({products}) => {
  console.log(products)
  return (
    <div>
     <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
      {products.map((item)=>{

      return <div key={item._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
        <a passhref={true} href={`/product/${item.slug}`} className="block rounded overflow-hidden cursor-pointer">
          <img alt="ecommerce" className=" h-[36vh] block m-auto " src={item.img}/>
        </a>
        <div className="mt-4 text-center md:text-left">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
          <p className="mt-1">${item.price}</p>
          <p className="mt-1">S, M, L, XL, XXL</p>
        </div>
      </div>})}
      
    </div>
  </div>
</section> 
    </div>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
  

  let products = await Product.find({category: 'tshirt'});
  return {
    props: {products: JSON.parse(JSON.stringify(products))}, // will be passed to the page component as props
  }
}

export default Tshirts
