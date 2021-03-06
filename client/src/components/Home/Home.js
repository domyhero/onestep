import React from 'react'
import CourseList from '../../containers/CourseListContainer'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styled from 'styled-components'

const HomeWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #B2EBF2;
  text-align: center;
`

export default () => (
  <HomeWrap>
    <Header />
    <CourseList />
    <Footer />
  </HomeWrap>
)
