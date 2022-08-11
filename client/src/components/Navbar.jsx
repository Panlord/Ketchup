import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <NavDiv>
      <Link to='/'><NavLink>Home</NavLink></Link>
      <Link to='/about'><NavLink>About</NavLink></Link>
      <Link to='/games'><NavLink>Games</NavLink></Link>
    </NavDiv>
  );
}

const NavDiv = styled.div`
  position: absolute;
  top: 0%;
  background-color: #d7d7d5;
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const NavLink = styled.span`
  font-size: 18px;
  color: black;
  &:hover {
    cursor: pointer
  }
`;

export default Navbar;