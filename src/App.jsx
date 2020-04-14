import React, {useState, useEffect} from 'react';
import ImageCard from './components/card'
import SearchImages from './components/searchImage'

function App() {

  const [images , setImages] = useState([])
  const [islLoading ,setIsLoading] = useState(true)
  const [term , setTerm] = useState('')

  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=14526249-c59cf9219dcfde1d164685562&q=${term}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data => {
      setImages(data.hits)
      setIsLoading(false)
    })
    .catch(err => console.log(err))
  } , [term])


  return (
    <div className="container mx-auto">
      <SearchImages searchText={(text)=>setTerm(text)} />

      {!islLoading && images.length===0 && <h1 className="text-6xl text-center mx-auto mt-32">Not Found.....</h1> }
      { islLoading? <h1 className="text-6xl text-center mx-auto mt-32">Loading.....</h1>:<div className=" grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {images.map(image=> (
          <ImageCard key={image.id} image={image}/>
        ))}
      </div>}
    </div> 
  );
}

export default App;
