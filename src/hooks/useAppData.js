import { useEffect, useState, useCallback, useRef } from 'react';
import moment from 'moment';
import GetData from '../hooks/getData';
import usePersistedState from '../hooks/usePersistedState';

export default function useAppData(){
  const today = moment().format('YYYY-MM-DD');
  const twelveDaysAgo = (date) => {
    return moment(date).subtract(12, 'days').format('YYYY-MM-DD');
  };

  const [dates, setDates] = useState({empty:true}); //tracks which dates were most recently used to call from API
  const [likes, setLikes] = usePersistedState("localLikes", {}); //tracks which posts are liked and saves into localStorage along with app state
  const {loading, data } = GetData(dates); //loading state for when awaiting API response

  useEffect(() =>{
    setDates({endDay: today, startDay: twelveDaysAgo(today)});
	},[today]);

  const observer = useRef();
  const lastPost = useCallback( //function to call when observer has reached the above reference to set dates state with new dates
  (node) => {
    const setNewDays = (oldDates) => { //calculate 12 days from the last date in state
      const newDates = {};
  
      newDates.endDay = moment(oldDates.startDay).subtract(1, 'days').format('YYYY-MM-DD');
      newDates.startDay = twelveDaysAgo(newDates.endDay);
      
      return newDates;
    };

    if (loading) return; // prevents setting new dates while API is currently being called
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDates(setNewDays(dates));
      }
    });
    if (node) observer.current.observe(node);
  },
  [loading, dates]
  );

  const onLike = (like, post) => {
    if (like) {
      setLikes({...likes, [post]: true});
      return;
    }
    setLikes({...likes, [post]: false});
  };

  return {data, likes, loading, lastPost, onLike}
}
