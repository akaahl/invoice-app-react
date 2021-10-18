import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import moonIcon from "../../assets/images/icon-moon.svg";
import avatar from "../../assets/images/avatar.svg";

const Navbar = () => {
  return (
    <StyledNav>
      <div className="logo-wrapper">
        <div className="bottom"></div>
        <img src={logo} alt="logo" />
      </div>

      <div className="theme-avatar-wrapper">
        <div className="top">
          <img src={moonIcon} alt="moon" />
        </div>

        <div className="bottom">
          <img src={avatar} alt="user avatar" />
        </div>
      </div>
    </StyledNav>
  );
};

export default Navbar;

const StyledNav = styled.nav`
  position: fixed;
  left: 0;
  height: 100vh;
  width: 105px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #373b53;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .logo-wrapper {
    position: relative;
    width: 100%;
    height: 100px;
    background-color: #7c5dfa;
    border-bottom-right-radius: 20px;

    .bottom {
      position: relative;
      top: 50%;
      height: 50%;
      background-color: #9277ff;
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 40px;
      width: 40px;
    }
  }

  .theme-avatar-wrapper {
    height: 180px;
    width: 100%;

    .top {
      height: 50%;
      display: grid;
      place-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);

      img {
        cursor: pointer;
      }
    }

    .bottom {
      height: 50%;
      display: grid;
      place-items: center;

      img {
        height: 50px;
        width: 50px;
      }
    }
  }
`;
