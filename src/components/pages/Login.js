import {useTheme} from "@emotion/react";
import React, {useEffect, useState} from 'react'
import {FaIdCard} from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import {useDataDispatch} from '../../hooks/context'
import {SETUP_USER} from '../DataContext'
import Button from '../elements/Button'
import Text from '../elements/Text'
import TextField from '../elements/TextField'
import Box from "../layouts/Box";
import Card from "../layouts/Card"
import Container from '../layouts/Container'
import Grid, {GridCell} from '../layouts/Grid'

const Login = () => {
  const [stuNum, setStuNum] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [protip, setProtip] = useState('')
  const theme = useTheme()

  const dispatch = useDataDispatch()
  const navigate = useNavigate()

  /**
   * @description generate a student number that starts with 21
   * @returns {string}
   */
  const generateStuNum = () => {
    let stuNum = "21"
    for (let i = 0; i < 7; i++) {
      stuNum += Math.floor(Math.random() * 10)
    }
    return stuNum
  }
  useEffect(() => {
    setStuNum(generateStuNum())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // check if student number and password are valid
    if (stuNum.length === 0 || pass !== 'mpilo') {
      setErr('Invalid student number or password')
      setProtip('Please enter student number and password')
    } else if (isNaN(stuNum) || stuNum.length !== 9 || stuNum.substring(0, 2) !== '21') {
      setErr('Invalid student number')
      setProtip('Student number usually 9 digit number starting with 21')
    } else {
      dispatch({
        type: SETUP_USER,
        payload: {
          stuNum
        }
      })
      setErr('')
      setProtip('')
      navigate('/', { replace: true })
    }
  }
  return (
    <Container maxWidth='lg' navPadding >
      <Grid justifyGrid={ "center" }>
        <GridCell colsMd={ 7 } colsLg={ 5 }>
          <Card maxWidth='sm'>
            <Text fWeight='700' fSize='x-large' tAlign='center'>Central Access</Text>
            <Box display={'flex'} justifyContent={'center'} marginTop={theme.sizes.gutters[3]}>
              <FaIdCard size={48}/>
            </Box>
            {err && <Text fWeight='500' fSize='small' tColor=' #FF5733' tAlign='center'>{err}</Text>}
            <form onSubmit={handleSubmit}>
              <div style={{marginTop: "1rem"}}>
                <TextField
                  id='studentNumber'
                  label='student number'
                  required
                  size='sm'
                  fullWidth
                  value={stuNum}
                  onChange={e => setStuNum(e.target.value) }
                  name="number" />
              </div>
              <div style={ { marginTop: "1rem" } }>
                <TextField
                  id='studentPassword'
                  type='password'
                  label='password'
                  name='password'
                  fullWidth
                  onChange={ (e) => setPass(e.target.value) }
                  value={ pass }
                  required />
              </div>
              <Button disabled={ stuNum.length < 1 || pass.length < 1 } size="sm" type='submit' rounded block style={ { margin: "1.75rem auto", boxSizing: "border-box" } }>Log In</Button>
            </form>
            { protip && <Text fWeight='500' fSize='small' tColor='dodgerblue' tAlign='center'>{ protip }</Text> }
          </Card>
        </GridCell>
      </Grid>
    </Container>
  )
}

export default Login
