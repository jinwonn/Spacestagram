import { useEffect, useState } from 'react';
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

  const parsedPosts = data.map((info)=> {
      return (
        <Post data={info}/>
      )
    }
  );

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