import React,{useState,useEffect} from "react";
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';
import { CssBaseline, Grid} from '@material-ui/core'
import { getPlacesData } from "./api";
import { Rating } from "@material-ui/lab";
const App = ()=>{
   const [places,setPlaces] =  useState([])
   const [coordinates,setCoordinates] =  useState({})
   const [bounds,setBounds] =  useState({})
   const[type,setType] = useState('hotels')
    const[rating,setRating]=useState('')
    
    const [filteredPlaces, setFilteredPlaces] = useState([]);
   const [ isloading, setIsloading] = useState(false);
   const[childClicked,setchildClicked]=useState(null)
   useEffect(() => {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      })
    },[]) 
    useEffect(() => {
      const filtered = places.filter((place) => Number(place.rating) > rating);
  
      setFilteredPlaces(filtered);
    }, [rating]);
   useEffect(()=>{
      if(bounds){
          setIsloading(true)
         getPlacesData(type,bounds.sw,bounds.ne).then((data)=>{
            setPlaces(data?.filter((place)=>place.name && place.num_reviews >0))
                 setFilteredPlaces([])
                 
                 setIsloading(false)
                
         })
      }
   },[type,bounds])
  
    return (
       <>
       <CssBaseline/>
          <Header
            setCoordinates={setCoordinates} 
          />
          <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12}md={4}>
                   <List places={filteredPlaces.length ? filteredPlaces : places}
                   isloading={isloading}

                  childClicked={childClicked}
                  
                   type={type}
                   setType={setType}
                   rating ={rating}
                   setRating={setRating}
                   />
                </Grid>
                <Grid item xs={12}md={8}>
                   <Map
                   setBounds={setBounds}
                   setCoordinates={setCoordinates}
                   coordinates={coordinates}
                   places={filteredPlaces.length ? filteredPlaces : places}
                   setchildClicked={setchildClicked}
                   />
                </Grid>
         </Grid>

       </>
    )
}

export default App