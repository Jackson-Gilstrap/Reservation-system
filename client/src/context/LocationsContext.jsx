import {useState, createContext} from "react";

export const LocationsContext = createContext();

export const LocationsContextProvider = props => {
    const [locations, setLocations] = useState([]);


    return (
        <LocationsContext.Provider value={{locations, setLocations}}>
            {props.children}
        </LocationsContext.Provider>
    )
}