import React from "react";
import  GoogleMapReact  from 'google-map-react';

 import useStyles from './style'
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlined  from "@material-ui/icons/LocationOnOutlined";
import  Rating  from "@material-ui/lab/Rating";
import mapStyles from "../../mapStyles";
const Map = ({setCoordinates,setBounds,coordinates,places,setchildClicked})=>{
    const classes = useStyles()
    const isMobile = useMediaQuery('(min-width:600px)')
    
    return ( //AIzaSyDffee2UnikdSvnRB0ngS3KAPO4ddGkjbE

<div className={classes.mapContainer}>
<GoogleMapReact
bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
defaultCenter={coordinates}
center={coordinates}
defaultZoom={14}
margin={[50,50,50,50]}
options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
onChange={(e)=>{
   
    
    
    setCoordinates({
        lat:e.center.lat,
        lng:e.center.lng
    })
    setBounds({
        ne:e.marginBounds.ne,
        sw:e.marginBounds.sw
     })
    

}}
onChildClick={(child)=>{setchildClicked(child)}}
>

       
       
{ places.length && places.map((place, i) => (
<div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
       <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating value={Number(place.rating)} size="small"readOnly/> 
       </Paper>

       </div>
))}
</GoogleMapReact>

</div>




    )
    


    
}
 export default Map