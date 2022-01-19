import styled from "styled-components";

function Post(props) {
  console.log(props.data)
  return (
    <Wrapper>
      <Container>
        <Header>
          <b>{props.data.copyright}</b>
          <a>{props.data.title}</a>
        </Header>
        <Image>
          <img src={props.data.url}></img>
        </Image>
        <Details>
          <a>{props.data.explanation}</a>
          <Date>
            <a>{props.data.date}</a>
          </Date>
        </Details>
      </Container>
    </Wrapper>
  );
}

export default Post;

const Wrapper = styled.div`
  
`

const Container = styled.div`
  max-width: 614px
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
  margin-bottom: 16px;
  padding: 0px 16px 0px;
`
const Date = styled.div `
  margin-top:4px
`