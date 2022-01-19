import { useEffect, useState, useCallback, useRef, Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Post from './Post';
import GetData from '../hooks/getData';

import CircularProgress from '@mui/material/CircularProgress';

function Main() {
  
  const today = moment().format('YYYY-MM-DD');
  const twelveDaysAgo = (date) => {
    return moment(date).subtract(12, 'days').format('YYYY-MM-DD');
  };

  const [dates, setDates] = useState({empty:true});
  const [likes, setLikes] = useState({});
  const {loading, data } = GetData(dates);  

  useEffect(() =>{
    setDates({endDay: today, startDay: twelveDaysAgo(today)});
	},[today]);

  const observer = useRef();
  const lastPost = useCallback(
  (node) => {
    const setNewDays = (oldDates) => {
      const newDates = {};
  
      newDates.endDay = moment(oldDates.startDay).subtract(1, 'days').format('YYYY-MM-DD');
      newDates.startDay = twelveDaysAgo(newDates.endDay);
      
      return newDates;
    };

    if (loading) return;
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
  
  const parsedPosts = data.map((info, index)=> {
    let props = {
      key: info.date,
      data: info,
      liked: likes[info.date] ? true : false,
      onLike: onLike
    };

    if (info.type === "video") return //skip videos
    
    return <Post {...props} />
  });
  
  return (
    <Wrapper>
      <Container>
        {parsedPosts}
        <div ref={lastPost}></div>
        <LoadingWrapper>
          { loading && <CircularProgress/> }
        </LoadingWrapper>
      </Container>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  // background-color: green;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 15px;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width = 80%;
`
const LoadingWrapper = styled.div`
  height: 60px;
  display:flex;
  justify-content: center;
  align-items: center;
`
