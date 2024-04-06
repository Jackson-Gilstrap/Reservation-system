import blueSky from "../assets/BlueSky.jpg";
import { useState, useEffect } from "react";
import LocationFinder from "../apis/LocationFinder";
import Reservation from "./Reservation";

const LocationPicker = () => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [location_id, setLocationID] = useState(null)
  const [width, setWidth] = useState("100");
  const [height, setHeight] = useState("100");
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  // on click needs to set variable to continue process hiding the location picker then showing the reservation however we still need to pass the location_id to the reservation
  const handleLocationClick = (location_id) => {
    setLocationID(location_id);
    setStep1(false);
    setStep2(true);
  };

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await LocationFinder.get("/");
        console.log(response);
        setLocationOptions(response.data.data.locations);
      } catch (err) {
        console.error(err.message);
      }
    };
    getLocations();
  }, []);

  return (
    <>
      {step1 ? (
        <div className="location-container">
          {locationOptions.map((location) => (
            <div
              className="location-card"
              key={location.location_id}
              onClick={() => handleLocationClick(location.location_id)}
            >
              <img
                src={blueSky}
                alt="location img"
                height={height}
                width={width}
              />
              <h3>{location.location_name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <Reservation location_id={location_id} />
      )}
    </>
  );
};

export default LocationPicker;
