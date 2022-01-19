import styled from 'styled-components';
import Post from './Post';
import useAppData from '../hooks/useAppData';

import CircularProgress from '@mui/material/CircularProgress';

function Main() {
  const {data, likes, loading, lastPost, onLike} = useAppData();

  const parsedPosts = data.map((info)=> {
    let props = {
      key: info.date,
      data: info,
      liked: likes[info.date] ? true : false,
      onLike: onLike
    };

    if (info.media_type === "video") return //skip videos
    
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
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  // margin-top: 15px;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width = 80%;
  padding-top: 15px;
`
const LoadingWrapper = styled.div`
  height: 60px;
  display:flex;
  justify-content: center;
  align-items: center;
`
