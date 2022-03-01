import {useTheme} from "@emotion/react";
import styled from "@emotion/styled";
import React, {useEffect} from 'react';
import {FaEarlybirds} from "react-icons/fa";
import {Link} from "react-router-dom";
import Button from "../elements/Button";
import Box from "../layouts/Box";

const Styled404Msg = styled.div`
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
  font-size: xx-large;
  white-space: nowrap;
  font-weight: 900;
`

const Styled404 = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  #bg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;

    path {
      width: 100%;
    }

    & .waves-elem-1 {
      fill: transparent;
      -webkit-transition: fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s;
      transition: fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s;
    }

    &.active .waves-elem-1 {
      fill: ${({theme}) => theme.palette.info.main};
    }

    & .waves-elem-2 {
      fill: transparent;
      -webkit-transition: fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1s;
      transition: fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1s;
    }

    &.active .waves-elem-2 {
      fill: ${({theme}) => theme.palette.info.dark};;
    }

    & .waves-elem-3 {
      fill: transparent;
      -webkit-transition: fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.2000000000000002s;
      transition: fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.2000000000000002s;
    }

    &.active .waves-elem-3 {
      fill: ${({theme}) => theme.palette.info.light};;
    }

    & .waves-elem-4 {
      fill: transparent;
      -webkit-transition: fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.4000000000000001s;
      transition: fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.4000000000000001s;
    }

    &.active .waves-elem-4 {
      fill: ${({theme}) => theme.palette.info.dark};;
    }

    & .waves-elem-5 {
      fill: transparent;
      -webkit-transition: fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.6s;
      transition: fill 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.6s;
    }

    &.active .waves-elem-5 {
      fill: rgb(198, 35, 104);
    }
  }
`

const Page404 = () => {
  const theme = useTheme()

  useEffect(() => {
    const elem = document.querySelector('div #bg')
    setTimeout(() => {
      elem.classList.add('active')
    }, 0)
  }, [])

  return (
    <Styled404>
      <Styled404Msg>
        <Box display={'flex'} justifyContent={'center'}>
          <FaEarlybirds size={72}/>
        </Box>
        404 Not Found
        <Box display={'flex'} justifyContent={'center'} marginTop={theme.sizes.gutters[4]}>
          <Link to={'/'}>
            <Button gradient elevation={2} rounded>take me home</Button>
          </Link>
        </Box>
      </Styled404Msg>
      <Box position='fixed' bottom={'0'} left={'0'} right={'0'} height={'300px'}>
        <svg id='bg' preserveAspectRatio={'none'} viewBox="0 0 1440 200" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path fill={theme.palette.info.main} className='waves-elem-1'
                d="M0 11.6695L34.4 24.1528C68.8 36.5195 137.6 61.4862 206.08 70.5862C274.72 79.6862 342.88 73.1529 411.52 53.3195C480 33.4862 548.8 0.352831 617.28 0.00283063C685.92 -0.347169 754.08 31.8529 822.72 45.1529C891.2 58.3362 960 52.5028 1028.48 54.8362C1097.12 57.1695 1165.28 67.6695 1233.92 63.3528C1302.4 59.1528 1371.2 40.0195 1405.6 30.5695L1440 21.0028V217.003H1405.6C1371.2 217.003 1302.4 217.003 1233.92 217.003C1165.28 217.003 1097.12 217.003 1028.48 217.003C960 217.003 891.2 217.003 822.72 217.003C754.08 217.003 685.92 217.003 617.28 217.003C548.8 217.003 480 217.003 411.52 217.003C342.88 217.003 274.72 217.003 206.08 217.003C137.6 217.003 68.8 217.003 34.4 217.003H0V11.6695Z"/>
          <path fill={theme.palette.info.dark} className='waves-elem-2'
                d="M0 134.836L34.4 134.336C68.8 133.836 137.6 132.836 206.08 121.636C274.72 110.536 342.88 89.1362 411.52 77.8362C480 66.5362 548.8 65.1362 617.28 76.8362C685.92 88.5362 754.08 113.136 822.72 122.336C891.2 131.536 960 125.136 1028.48 120.636C1097.12 116.136 1165.28 113.536 1233.92 104.336C1302.4 95.1362 1371.2 79.5362 1405.6 71.6362L1440 63.8362V216.836H1405.6C1371.2 216.836 1302.4 216.836 1233.92 216.836C1165.28 216.836 1097.12 216.836 1028.48 216.836C960 216.836 891.2 216.836 822.72 216.836C754.08 216.836 685.92 216.836 617.28 216.836C548.8 216.836 480 216.836 411.52 216.836C342.88 216.836 274.72 216.836 206.08 216.836C137.6 216.836 68.8 216.836 34.4 216.836H0V134.836Z"/>
          <path fill={theme.palette.info.light} className='waves-elem-3'
                d="M0 123.669L34.4 116.669C68.8 109.669 137.6 95.6694 206.08 90.1861C274.72 84.8194 342.88 87.8527 411.52 94.5027C480 101.153 548.8 111.186 617.28 112.819C685.92 114.336 754.08 79.5861 822.72 77.8361C891.2 76.0861 946.08 134.336 1028.48 106.753C1097.12 106.169 1165.28 101.503 1233.92 99.4028C1302.4 97.1861 1371.2 97.6527 1405.6 97.7694L1440 98.0027V217.003H1405.6C1371.2 217.003 1302.4 217.003 1233.92 217.003C1165.28 217.003 1097.12 217.003 1028.48 217.003C960 217.003 891.2 217.003 822.72 217.003C754.08 217.003 685.92 217.003 617.28 217.003C548.8 217.003 480 217.003 411.52 217.003C342.88 217.003 274.72 217.003 206.08 217.003C137.6 217.003 68.8 217.003 34.4 217.003H0V123.669Z"/>
          <path fill={theme.palette.info.dark} className='waves-elem-4'
                d="M0 147.003L34.4 149.336C68.8 151.669 137.6 156.336 206.08 160.419C274.72 164.503 342.88 168.003 411.52 165.436C480 162.986 548.8 154.353 617.28 155.753C685.92 157.153 754.08 168.353 822.72 170.919C891.2 173.486 960 167.186 1028.48 159.486C1097.12 151.669 1165.28 142.336 1233.92 144.903C1302.4 147.353 1371.2 161.819 1405.6 168.936L1440 176.169V217.003H1405.6C1371.2 217.003 1302.4 217.003 1233.92 217.003C1165.28 217.003 1097.12 217.003 1028.48 217.003C960 217.003 891.2 217.003 822.72 217.003C754.08 217.003 685.92 217.003 617.28 217.003C548.8 217.003 480 217.003 411.52 217.003C342.88 217.003 274.72 217.003 206.08 217.003C137.6 217.003 68.8 217.003 34.4 217.003H0V147.003Z"/>
        </svg>
      </Box>
    </Styled404>
  );
};

export default Page404;