import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Course from '../components/Course/Course'

class CourseContainer extends Component {
  render () {
    let { courseName } = this.props.match.params
    let thisCourse = this.props.courses.find(
      item => (
        item.title === courseName
      )
    )
    let episode = thisCourse.episode.map((item, i) => (
      <Link to={`/${courseName}/${item}`} key={i} className='episode'>
        {item}
      </Link>
    ))

    return (
      <div>
        <Course src={thisCourse.post} episode={episode} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses
})

export default connect(mapStateToProps)(CourseContainer)
