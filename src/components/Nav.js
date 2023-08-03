import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Nav = () => {
  
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  
  const initialUserData = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData'))
  : {}
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        if( pathname === '/') {
          navigate('/main')
        }
      } else {
        navigate('/')
      }
    })
  }, [auth, navigate, pathname])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  }
  
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`)
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      setUserData(result.user)
      localStorage.setItem('userData', JSON.stringify(result.user))
    })
    .catch(error => {
      console.log(error)
    })  
  }

  const handleLogOut = () => {
    signOut(auth)
    .then(() => {
      setUserData({})
      navigate('/')
    })
    .catch(error => {
      alert(error.message)
    })
  }

  return (
    <NavWrapper show={show}>
      <Logo>
        <img alt="Disney Plus Logo" src="/images/logo.svg" onClick={() => (window.location.href="/")}/>
      </Logo>

      {pathname === "/"
        ? (<Login onClick={handleAuth}>Login</Login>)
        :
          <>
            <Input 
              value={searchValue}
              onChange={handleChange}
              className='nav__input'
              type='text'
              placeholder='원하는 영화명을 입력해주세요.'
            />

            <SignOut>
              <UserImg src='https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295430_1280.png' alt={userData.displayName} />
              <DropDown><span onClick={handleLogOut}>Sign Out</span></DropDown>
            </SignOut>
          </>
      }
    </NavWrapper>
  )
}

export default Nav

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? '#090B13' : 'transparent'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margi-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`

const Input = styled.input`
  width: 200px;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`

const UserImg = styled.img`
  border: 1px solid white;
  border-radius: 50%;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rba(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`

const SignOut = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`