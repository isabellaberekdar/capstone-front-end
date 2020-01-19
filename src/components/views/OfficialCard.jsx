import React from "react";
import PropTypes from "prop-types";

import "../views/OfficialCard.css";

const OfficialCard = props => {
  console.log(props);
  console.log(props.official.address);
  return (
    <div className="official-card">
      <h3>OfficialCard here</h3>
      <p>{props.office.name}</p>
      <p>{props.office.divisionId}</p>

      {/* Some offices don't have levels or roles, so we need to check if they have them before trying to access them by index, or else it will result in an error. */}
      {props.office.levels ? <p>{props.office.levels[0]}</p> : <div></div>}
      {props.office.roles ? <p>{props.office.roles[0]}</p> : <div></div>}

      <p>{props.official.name}</p>
      <p>{props.official.party}</p>
      {props.official.photoUrl ? (
        <img src={props.official.photoUrl} width="200px" />
      ) : (
        <div></div>
      )}

      {/* Some officials don't have an address. */}
      {/* The address is an array holding a single object. */}
      {/* Some addresses have a line2 and line3 etc in addition to just a line1 (Andrew M. Cuomo) So we'll have to iterate through them somehow.*/}
      {props.official.address ? (
        <div>
          <p>{props.official.address[0].line1}</p>
          <p>
            {props.official.address[0].city}, {props.official.address[0].state}{" "}
            {props.official.address[0].zip}
          </p>
        </div>
      ) : (
        <div></div>
      )}

      {/* Officials will usually have one phone, url, and email */}
      {props.official.phones ? <p>{props.official.phones[0]}</p> : <div></div>}
      {props.official.urls ? (
        <a href={props.official.urls[0]}>{props.official.urls[0]}</a>
      ) : (
        <div></div>
      )}
      {props.official.emails ? <p>{props.official.emails[0]}</p> : <div></div>}

      {/* Officials can have anywhere from 0 to 3 channels! We will need to first see if they have any channels at all. If they do, we will then need to iterate through them to generate the elements. Ideally, we should be able to identify the domain of the channel, so that we can link to it directly. eg. https://www.facebook.com/newyorkstateag/ with the type is "Facebook" */}
      {/* {props.official.channels ? (
        <div>
          <p>
            {props.official.channels[0].type}: {props.official.channels[0].id}
          </p>
        </div>
      ) : (
        <div></div>
      )} */}
    </div>
  );
};

// StudentCard.propTypes = {
//   image: PropTypes.string.isRequired,
//   firstName: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
//   campus: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
//   buttonText: PropTypes.string.isRequired
// };

export default OfficialCard;
