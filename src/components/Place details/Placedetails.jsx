import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import Rating from '@material-ui/lab/Rating';
import useStyles from './style';

const PlaceDetails =({place,refProp,selected})=>{
  
if(selected) refProp?.current?.scrollIntoView({behavior:"smooth",block:"start"})

  const classes = useStyles()
    return (
      <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography variant='h5' gutterBottom> {place.name} </Typography>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant ='subtitle1'>Price</Typography>
          <Typography gutterBottom  variant='subtitle1'>{place.price_level}</Typography>

        </Box>
        <Box display='flex' justifyContent='space-between'>
        <Rating value={Number(place.rating)} size="small"readOnly/>
          <Typography gutterBottom  variant='subtitle1'>out of {place.num_reviews} reviews</Typography>

        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant ='subtitle1'>Ranking</Typography>
          <Typography  gutterBottom variant='subtitle1'>{place.ranking}</Typography>

        </Box>
        {place?.awards?.map((award) => (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({name})=>(
            <Chip size='small' key={name} label={name} className={classes.chip}/>
        ))
        }
        
        </CardContent>
        <CardActions>
          <LocationOnIcon/>
          <PhoneIcon/> 
          <Button size='small' color='primary' onClick={()=>window.open(place.web_url,'_blank')}>
            Trip Advisor
          </Button>
          <Button size='small' color='primary'  onClick={()=>window.open(place.website,'_blank')}>
          Website
          </Button>
        </CardActions>
        
      
     
    </Card>
    )
}

export default PlaceDetails