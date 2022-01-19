import { useState, useEffect} from 'react';
import styled from 'styled-components';
import nasa_api from './nasa_api';
import Post from './Post';
import moment from 'moment';

function Main() {

  const [data, setData] = useState([]);

  const today = moment().format('YYYY-MM-DD');
  
  const twelveDaysAgo = (date) => {
    return moment(date).subtract(12, 'days').format('YYYY-MM-DD');
  };
  
  const newDay = twelveDaysAgo(today);
  

  useEffect(() =>{
		Promise.all([
      nasa_api.get(`planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${newDay}`)
		]).then(res => {
      setData(res[0].data);
    }) 
	},[]);

  const parsedPosts = data.map((info)=> {
      return (
        <Post data={info}/>
      )
    }
  );

  console.log(parsedPosts);
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
  width = 80%;
  // background-color: blue;
`