import { useState, useEffect} from 'react';
import styled from 'styled-components';
import nasa_api from './nasa_api';
import Post from './Post';

function Main() {

  const [data, setData] = useState("");

  useEffect(() =>{
		Promise.all([
			nasa_api.get(`planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
		]).then(res => {
      setData(res[0].data);
    }) 
	},[]);

  return (
    <Wrapper>
      <Container>
        <Post data={data}/> 
      </Container>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  background-color: green;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 15px;
`
const Container = styled.div`
  display: flex;
  width = 80%;
  background-color: blue;
`