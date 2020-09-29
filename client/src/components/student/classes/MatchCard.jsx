import React, { } from 'react'
import { connect } from 'react-redux'
import ChooseHour from "./ChooseHour"

export const MatchCard = ({option, friendlyData, id, data, params, onClick}) => {
    let start = data[0] % 1 === 0 ? String(data[0]) + ":00" : String(data[0]).substring(0,2) + ":30"
    let end = data[1] % 1 === 0 ? String(data[1]) + ":00" : String(data[1]).substring(0,2) + ":30"
    return (
        <div className="form-group">
        <input
            type="radio"
            //className={style}
            name="options"
            //onClick={e => onClick(e.target.checked)}
            defaultChecked= {false}
            hidden
            id={`radio${id}`}
        />
        <label data-toggle="modal" data-target={"#hourModal" + id} className="d-flex flex-row align-items-center justify-content-between text-left card shadow ml-4 mb-2 pt-2 pl-3" style={{width: "90vw"}} htmlFor={`radio${id}`} >
            <h5 style={{width:"35vw"}}>{option.user.firstName + " " + option.user.lastName}</h5>
            <h5 style={{width:"25vw"}}>{option.nameWeekDay}</h5>
            <h5 style={{width:"10vw"}} className="mr-2">{`${start}  -  ${end}`}</h5>
        </label>
        <ChooseHour nameWeekDay={option.nameWeekDay} userData={{id: option.user.id, name: option.user.firstName + " " + option.user.lastName}} friendlyData={friendlyData} hours={data} id={id}/>
    </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchCard)
