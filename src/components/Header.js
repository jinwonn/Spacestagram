import React from 'react';
import styled from 'styled-components';
import RocketIcon from '@mui/icons-material/Rocket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

function Header() {
  return (
    <Wrapper>
      <LogoWrapper>
        <IconButton>
          <RocketIcon/>
        </IconButton>
      </LogoWrapper>
      <TitleWrapper>
        <div>Spacestagram</div>
      </TitleWrapper>
      <NavWrapper>
        <IconButton>
          <FavoriteIcon/>
        </IconButton>
      </NavWrapper>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 12px 4px 4px 16px;
  background-color: white;
  colour: black;
  border-bottom: 1px solid rgba(219,219,219);
`

const LogoWrapper = styled.div`
  .MuiSvgIcon-root {
    color: black;
    font-size: 32px;
    crusor: pointer;
  }
`
const TitleWrapper = styled.div`
  display: flex;
  height 48px;
  min-width: 123px;
  align-items: center;
  justify-content: center;

  div {
    text-decoration: none;
    font-weight: 700;
    font-size: 25px;
  }
`

const NavWrapper = styled.div``