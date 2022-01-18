import { useEffect, useState } from 'react';
import nasa_api from './nasa_api';

function Application() {
  const [data, setData] = useState("");

  useEffect(() =>{
		Promise.all([
			nasa_api.get(`planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
		]).then(res => setData(res[0].data));
	},[]);
  return <img src={data.url}></img>; 
}

export default Application;
