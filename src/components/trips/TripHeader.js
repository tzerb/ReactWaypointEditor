import React, {PropTypes} from 'react';
import TextDisplay from '../common/TextDisplay';
import TextDisplayBig from '../common/TextDisplayBig';
import DateDisplay from '../common/DateDisplay';

const TripHeader = ({trip}) => {
  try {

    return (
      <div>
        <h1>Trip View</h1>
        <h3>Trip : {trip.title} | {trip.description} </h3>
        <TextDisplay
          name="title"
          label="Title"
          value={trip.title}
          />        
          <br/>
        <TextDisplayBig
          name="description"
          label="Description"
          value={trip.description}
          />        
          <br/>      
        <DateDisplay
          name="dateTime"
          label="Date/Time"
          value={trip.dateTime}
          />           
          <br/>
      </div>

    );
  } catch (ex)
  {
    return (<div>Error rendering TripHeader</div>); 
  }

};

TripHeader.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripHeader;
/*
        <h1>Trip : {trip.name} | {trip.description} </h1>
        <TextDisplay
          name="title"
          label="Title"
          value={trip.title}
          />



        <DateTimeDisplay
          name="dateTime"
          label="Date/Time"
          value={trip.dateTime}
          />
*/