/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import GoogleMapReact from "google-map-react";
// import { Icon } from "@iconify/react";
// import locationIcon from "@iconify/icons-mdi/map-marker";
// import "./MapWithMarker.css";

// const location = {
//     address: "1600 Amphitheatre Parkway, Mountain View, california.",
//     lat: 37.42216,
//     lng: -122.08427,
//   };

//   const LocationPin = ({ text }) => (
//     <div className="pin">
//       <Icon icon={locationIcon} className="pin-icon" />
//       <p className="pin-text">{text}</p>
//     </div>
//   );

// const MapWithMarker = () => {
//     return (
//       <div className="map">
//         <h2 className="map-h2">Come Visit Us At Our Campus</h2>
//         <div className="google-map">
//           <GoogleMapReact
//             bootstrapURLKeys={{ key: "AIzaSyANM-S8csQhiY7y2RGmzCD1PDN0dIxFzlY" }}
//             defaultCenter={location}
//             defaultZoom={17}>
//             <LocationPin
//               lat={location.lat}
//               lng={location.lng}
//               text={location.address}
//             />
//           </GoogleMapReact>
//         </div>
//       </div>
//     );
//   };

//   export default MapWithMarker;
import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import Modal from "react-modal";
import "./MapWithMarker.css";

const MapWithMarker = () => {  
    
    const [defaultLocation, setDefaultLocation] = useState({ });      
    const [location, setLocation] = useState(defaultLocation);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newLocation, setNewLocation] = useState({
        address: "",
        lat: "",
        lng: "",
    });
    
    useEffect(() => {
        Modal.setAppElement("#root"); 
      }, []);
    
  useEffect(() => {
    const fetchDefaultLocation = () => {
      const storedLocation = localStorage.getItem('savedLocation');
      if (storedLocation) {
        console.log(JSON.parse(storedLocation));
        setDefaultLocation(JSON.parse(storedLocation));
      } else {
        setDefaultLocation({
          address: "1600 Amphitheatre Parkway, Mountain View, California",
          lat: 37.42216,
          lng: -122.08427,
        });
      }
    };
    fetchDefaultLocation();
  }, []);

  useEffect(() => {
    setLocation(defaultLocation);
  }, [defaultLocation]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation({ ...newLocation, [name]: value });
  };

  const handleAddLocation = () => {
    const { address, lat, lng } = newLocation;
    console.log(newLocation)
    setLocation({
      address,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });
    const updatedLocation = {
        address,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
    
      localStorage.setItem('savedLocation', JSON.stringify(updatedLocation));
    closeModal();
  };

  const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );

  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyANM-S8csQhiY7y2RGmzCD1PDN0dIxFzlY" }}
          center={{ lat: location.lat, lng: location.lng }}
          defaultZoom={17}
        >
          <LocationPin
           key={`${location.lat}-${location.lng}`}
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
      <button onClick={openModal}>Change Location</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Change Location Modal"
      >
        <h2>Enter New Location Details</h2>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={newLocation.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Latitude:
          <input
            type="number"
            name="lat"
            value={newLocation.lat}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            name="lng"
            value={newLocation.lng}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleAddLocation}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default MapWithMarker;
