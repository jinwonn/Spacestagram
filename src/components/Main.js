import { useEffect, useState, useCallback, useRef, Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Post from './Post';
import GetData from '../hooks/getData';


function Main() {
  
  const today = moment().format('YYYY-MM-DD');
  const twelveDaysAgo = (date) => {
    return moment(date).subtract(12, 'days').format('YYYY-MM-DD');
  };

  const [dates, setDates] = useState({});
  const {loading, data } = GetData(dates);  

  useEffect(() =>{
    setDates({endDay: today, startDay: twelveDaysAgo(today)});
	},[today]);

  const setNewDays = (oldDates) => {
    const newDates = {};

    newDates.endDay = moment(oldDates.startDay).subtract(1, 'days').format('YYYY-MM-DD');
    newDates.startDay = twelveDaysAgo(newDates.endDay);
    
    return newDates;
  };

  const observer = useRef();
  const lastPost = useCallback(
  (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("triggering");
        setDates(setNewDays(dates));
      }
    });
    if (node) observer.current.observe(node);
  },
  [loading]
  );
  
  const parsedPosts = data.map((info, index)=> {
    let props = {
      key: info.date,
      data: info
    };
    
    if (index === data.length - 2) {
      return (
        <Fragment>
          <Post {...props} />
          <div ref={lastPost}></div>
        </Fragment>
      )
    };
    
    return <Post {...props} />
  });
  
  return (
    <Wrapper>
      <Container>
        {parsedPosts}
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
  flex-direction: column;
  width = 80%;
  // background-color: blue;
`