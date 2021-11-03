import React, { useEffect } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import moonIcon from '../../assets/images/icon-moon.svg';
import sunIcon from '../../assets/images/icon-sun.svg';
import avatar from '../../assets/images/avatar.svg';

const Navbar = ({ theme, setTheme }) => {
  useEffect(() => {
    const colorTheme = JSON.parse(localStorage.getItem('color-theme'));

    return !colorTheme
      ? localStorage.setItem('color-theme', JSON.stringify(theme))
      : setTheme(colorTheme);
  }, [setTheme, theme]);

  return (
    <StyledNav>
      <div className="logo-wrapper">
        <div className="bottom"></div>
        <img src={logo} alt="logo" />
      </div>

      <div className="theme-avatar-wrapper">
        <div className="top">
          {theme === 'lightTheme' && (
            <button
              onClick={() => {
                setTheme('darkTheme');
                localStorage.setItem(
                  'color-theme',
                  JSON.stringify('darkTheme')
                );
              }}
            >
              <img src={moonIcon} alt="moon" />
            </button>
          )}

          {theme === 'darkTheme' && (
            <button
              onClick={() => {
                setTheme('lightTheme');
                localStorage.setItem(
                  'color-theme',
                  JSON.stringify('lightTheme')
                );
              }}
            >
              <img src={sunIcon} alt="sun" />
            </button>
          )}
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
  z-index: 10;

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

      button {
        background: none;
        border: none;
        cursor: pointer;
        display: grid;
        place-items: center;

        &:focus {
          outline: 2px dashed #ffffff;
        }
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

  @media (max-width: 1024px) {
    top: 0;
    height: 90px;
    width: 100%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    flex-direction: row;
    align-items: initial;

    .logo-wrapper {
      height: 100%;
      width: 90px;
      border-top-right-radius: 20px;
    }

    .theme-avatar-wrapper {
      height: 100%;
      width: 180px;
      display: flex;

      .top,
      .bottom {
        height: 100%;
        flex: 0.5;
      }

      .top {
        border-bottom: 0;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }

  @media (max-width: 320px) {
    height: 80px;

    .logo-wrapper {
      width: 80px;
    }

    .theme-avatar-wrapper {
      width: 170px;
    }
  }
`;
