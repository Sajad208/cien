import { useLocation } from "react-router-dom";
import Head from"../Headr/Headr"
import { Photo } from "../photoDes/Photo";
import "../photoDes/Photo.css"
import {Description } from"../description/dscription"
import "../MoreButtenPage/des.css"

const Des = () => {
  const location =useLocation();
  const item =location.state;
  return (
  <>
  <div className="countenr">
  <Head/>
  <Photo item={item}></Photo>
  < Description item={item}/>
  
 </div>
  </>
  );
}
export default Des;
