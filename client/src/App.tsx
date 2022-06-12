import { useEffect, useState } from "react";

function App() {
  const [products,setProducts] = useState([
    {name:'Product1',price:'100'},
    {name:'product2',price:'100'}
  ]);

  useEffect(()=>{
    fetch("http://localhost:5000/api/products")
      .then(response=>response.json())
      .then(data=>setProducts(data))
  },[]
 )

  function addProduct(){
    setProducts(prevState=>[...prevState,
      {name:'product'+prevState.length,price:'100'}
    ])
  }
  return (
    <div>
      <ul>
        {products.map((item,index)=>(
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <button onClick={addProduct}>add product</button>
    </div>
  );
}

export default App;
