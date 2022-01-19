import { useState, useEffect, useCallback} from 'react';
import nasa_api from '../components/nasa_api';


function GetData(dates) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = useCallback(()=>{
    const startDay = dates.startDay;
    const endDay = dates.endDay;
    const count = dates.count;

    let url = `planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`;
    
    if (startDay) url += `&start_date=${startDay}`; 
    if (endDay) url += `&end_date=${endDay}`; 
    if (count) url += `&count=${count}`;

    Promise.all([
      nasa_api.get(url),
      setLoading(true)
		]).then(res => {
      const reversedData = res[0].data.reverse();
      setData((prev) => {
        return [...new Set([...prev, ...reversedData])];
      })
      setLoading(false);
    }) 
  }, [dates]);

  useEffect(() => {
    getData(dates);
  }, [dates, getData]);

  return {loading, data};
}

export default GetData;


