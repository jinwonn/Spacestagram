import styled from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grow } from "@mui/material";

function Post(props) {
  return (
    <Wrapper>
      <Grow in={props.data ? true : false}>
        <Container>
          <Header>
            <b>{props.data.copyright ? props.data.copyright : "Unknown" }</b>
            <p>{props.data.title}</p>
          </Header>
          <Image>
            <img src={props.data.url} alt=""></img>
          </Image>
          <ActionButtons>
            {props.liked === false ? 
              <FavoriteBorderIcon onClick={() =>{ props.onLike(true, props.data.date)}}/> :
              <LikedWrapper>
                <FavoriteIcon onClick={() =>{ props.onLike(false, props.data.date)}}/>
              </LikedWrapper> 
            }
          </ActionButtons>
          <Details>
            <p>{props.data.explanation}</p>
          </Details>
          <Date>
            <time>{props.data.date}</time>
          </Date>
        </Container>
      </Grow>
    </Wrapper>
  );
}

export default Post;

const Wrapper = styled.div`
`

const Container = styled.div`
  background-color: white;
  max-width: 614px;
  border: 1px solid rgba(219,219,219);
  margin-bottom: 24px
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 16px 14px;
  font-size: 14px;
`
const Image = styled.div`
  margin-bottom: 4px;
  img {
    width: 100%
  }
`
const Details = styled.div`
  font-size 14px;
  margin-bottom:4px;
  padding: 0px 16px 0px;
  `

  const Date = styled.div`
  font-size 14px;
  margin-bottom: 16px;
  padding: 0px 16px 0px;
`

const ActionButtons = styled.div`
  display: flex;
  // justify-content: space-between;
  padding: 6px 16px 8px;
  height: 25px
`

const LikedWrapper = styled.div `
  color: red;
`