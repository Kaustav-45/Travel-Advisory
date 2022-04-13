import {createRef, useState,useEffect} from "react";
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import useStyles from './style'
import PlaceDetails from "../Place details/Placedetails";

const List = ({places,childClicked,isloading,type,setType,rating,setRating})=>{
    
    const [elRefs, setelRefs] = useState([]);
    const classes= useStyles()
 
    useEffect(() => {
    const refs = Array(places?.length).fill().map((_,i)=> elRefs[i] || createRef())
    setelRefs(refs)
    }, [places]);


    return (<>
    <div className={classes.container}>
    <Typography variant="h4">Restuarants,Hotels And Attractions</Typography>
    {isloading ? (<div className={classes.loading}>
        <CircularProgress size='5rem'/>
    </div>) :(
        <>
<FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

<FormControl className={classes.formControl}>
<InputLabel>Rating</InputLabel>
    <Select value={rating} onChange={e=>setRating(e.target.value)}>
       <MenuItem value={0}>All</MenuItem>
       <MenuItem value={3}>Above 3.0</MenuItem>
       <MenuItem value={4}>Above 4.0</MenuItem>
       <MenuItem value={4.5}>Above 4.5</MenuItem>
    </Select>
    
</FormControl>
         <Grid container spacing={3} className={classes.list}>
{ places?.map((place,i)=>(
    
    <Grid item  ref={elRefs[i]} key={i} xs={12}>
       
<PlaceDetails 
place={place}
selected={Number(childClicked)=== i}
refProp={elRefs[i]}
/>
</Grid>
))


}
</Grid>
</>
) }

</div>







</>

    )
}
 export default List