import axios from "axios";

// ACTION TYPES
const GET_OFFICIAL = "GET_OFFICIAL";
const GET_OFFICIALS = "GET_OFFICIALS";
const GET_PHOTO = "GET_PHOTO";

// ACTION CREATORS
/* ** move api keys out ** */

const getOfficial = official => {
  return {
    type: GET_OFFICIAL,
    payload: official
  };
};

const getOfficials = officials => {
  return {
    type: GET_OFFICIALS,
    payload: officials
  };
};

const getPhoto = photo => {
  return {
    type: GET_PHOTO,
    payload: photo
  };
};

// THUNK CREATORS
export const getOfficialsThunk = address => async dispatch => {
  // console.log(address);
  try {
    // Query the api for the officials associated with the given address
    const { data } = await axios.get(
      `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M&address=${address.city}-${address.state}-${address.zip}`
    );
    console.log("canteloupe", data);
    dispatch(getOfficials(data));
  } catch (error) {
    console.log("Error in getOfficialsThunk:", error);
  }
};






/* 
ocd-division/country:us
ocd-division/country:us/state:ny
ocd-division/country:us/state:ny/county:new_york
ocd-division/country:us/state:ny/place:new_york
more?

president/ VP:
ocd-division/country:us

Senator/Governor/Lieutenant Governor:
ocd-division/country:us/state:ny

New York City Comptroller/New York Public Advocate/Mayor
ocd-division/country:us/state:ny/place:new_york

Manhattan District Attorney/New York Manhattan Borough President
ocd-division/country:us/state:ny/county:new_york

NY Attorney General/NY State Comptroller
ocd-division/country:us/state:ny
 
-index of the rep in the array (defaults to 0)
*/
// index should be based on this api call:
// https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M&address=NY
// because the index will not be useful if the api call varies

/* 
  Information that should be passed into the thunk:
  -state: 'NY', 'CA', etc
*/

export const getOfficialThunk = (state, index = 0) => async dispatch => {
  try {

    let url = `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M&address=${state}`
    /* 
    if (placeOrCounty) {
      url = `https://www.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3A${state}%2F${placeOrCounty}%3A${placeOrCountyName}?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M`
    }
    else {
      url = `https://www.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3A${state}?key=AIzaSyCzgqBJLDzmJQo5Cj7PVBKr7DS8fdH-c8M`
    }  */

    // Get the official
    const {data} = await axios.get(url)
    console.log('DATA: ', data.officials[index])
    dispatch(getOfficial(data.officials[index]))

  } catch (error) {
    console.log("Error in getOfficialThunk:", error)
  }
}







// see if there is a faster way to get the id
// senate only?
export const getPhotoThunk = (first, last, state) => async dispatch => {
  try {
    // get small list of local officials
    const { data } = await axios.get(
      `https://api.propublica.org/congress/v1/members/senate/${state}/current.json`,
      {
        headers: {
          "X-API-Key": "5nyWHyGLejmxUBanKJgsUjLedZa1IpLHIDxJVTr3"
        }
      }
    );
    // look for the official with the given name
    const person = data.results.find(
      person => person.first_name === first && person.last_name === last
    );
    // use the id to find their photo
    if (person) {
      const photo = `https://theunitedstates.io/images/congress/225x275/${person.id}.jpg`;
      dispatch(getPhoto(photo));
    } else {
      // if -1, the official was not found. Supply a default photo
    }
  } catch (error) {
    console.log("Error in getPhotoThunk:", error);
  }
};

const initialState = {};

// REDUCER
const officialReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OFFICIALS:
      // create a new object, copy over everything from state, then add the new officials data that was fetched
      return {
        ...state,
        officials: action.payload
      };
    case GET_OFFICIAL:
      // create a new object, copy over everything from state, then add the new officials data that was fetched
      return {
        ...state,
        official: action.payload
      };
    case GET_PHOTO:
      return {
        ...state,
        photo: action.payload
      };
    default:
      return state;
  }
};

export default officialReducer;