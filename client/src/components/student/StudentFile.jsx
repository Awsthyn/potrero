import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getStudentDetail} from '../../redux/actions/student'

export const StudentFile = ({getStudentDetail, studentDetail}) => {

    useEffect(()=>{
    const url = window.location.href
    const ubication = url.lastIndexOf('/')    
        getStudentDetail(url.slice(ubication + 1))
    },[getStudentDetail])

    return (
        <div>
        {studentDetail.firstName}    
        </div>
    )
}

const mapStateToProps = (state) => ({
    studentDetail: state.students.studentDetail
})

const mapDispatchToProps = dispatch => {
    return {
        getStudentDetail: (id) => dispatch(getStudentDetail(id))
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentFile)
