
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { getScreenshot } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";

export const Map = (props) => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false)

  const handleCaptureClick = async () => {
    const cnvs = document.getElementsByTagName('canvas')
    const img = cnvs[0].toDataURL();
    setClicked(true)
    dispatch(getScreenshot(img))
  };

  const API_ACCESS_TOKEN = "pk.eyJ1IjoidGhlc2Fhc2NvIiwiYSI6ImNreXg1YXV6YTBmY2gydnAzYzZrMnZoNjgifQ.yMtrPRgR0kFTtOPI-HDecA";

  useEffect(() => {
    if (!isLoaded) {
      mapboxgl.accessToken = API_ACCESS_TOKEN;
      const map = new mapboxgl.Map(
        {
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [-79.4512, 43.6568],
          zoom: 8,
          preserveDrawingBuffer: true
        },
        []
      );

      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        })
      );
    }
    setIsLoaded(true);
  }, [isLoaded]);

  return (
    <>
      <div id={props.id} />
      {clicked && <Modal />}
      <button onClick={handleCaptureClick} >
        <h1>
         📸 take Screenshot
        </h1>
      </button>
    </>
  )
};