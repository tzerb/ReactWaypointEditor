import React, {PropTypes} from 'react';
import TextDisplay from '../common/TextDisplay';
import TextDisplayBig from '../common/TextDisplayBig';
import DateTimeDisplay from '../common/DateTimeDisplay';

const TripHeader = ({trip}) => {
  try {

    return (
      <div>Header
        <h1>Trip : {trip.title} | {trip.description} </h1>
        <TextDisplay
          name="title"
          label="Title"
          value={trip.title}
          />        <br/>
        <TextDisplayBig
          name="description"
          label="Description"
          value={trip.description}
          />        <br/>      
          <DateTimeDisplay
          name="dateTime"
          label="Date/Time"
          value={trip.dateTime}
          />           <br/>
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