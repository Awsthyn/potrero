import React, { useState } from 'react'
import { connect } from 'react-redux'
import Card from "./MatchCard"

export const ClassAssignationCard = ({option, id, onClick}) => {
    const rangeTimes = option.disponibleTime.map(e => {
        let auxArray = []
        let start = e[0] % 1 === 0 ? String(e[0]) + ":00" : String(e[0]).substring(0,2) + ":30"
        let end = e[1] % 1 === 0 ? String(e[1]) + ":00" : String(e[1]).substring(0,2) + ":30"
        auxArray.push([start,end])
        return auxArray
    })

    return (
        option.disponibleTime.map((e,i) => <Card key={"CardParent" + id + i} onClick={onClick} option={option} id={'Op'+id+i} data={e}/>)
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassAssignationCard)
