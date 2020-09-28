import React, { } from 'react'
import { connect } from 'react-redux'
import ChooseHour from "./ChooseHour"

export const MatchCard = ({option, friendlyData, id, data, params, onClick}) => {
    let start = data[0] % 1 === 0 ? String(data[0]) + ":00" : String(data[0]).substring(0,2) + ":30"
    let end = data[1] % 1 === 0 ? String(data[1]) + ":00" : String(data[1]).substring(0,2) + ":30"
    console.log(friendlyData)
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
        <label data-toggle="modal" data-target={"#hourModal" + id} style={{ height: "250px", width: "200px" }} htmlFor={`radio${id}`} className="d-flex flex-column wrap justify-content-between rounded shadow form-check-label mr-3" >
            <h5 className="mt-4">{option.user.firstName + " " + option.user.lastName}</h5>
            <h5>{option.nameWeekDay}</h5>
            <h5 className="mb-4">{`${start}  -  ${end}`}</h5>
        </label>
        <ChooseHour userData={option.user.firstName + " " + option.user.lastName} friendlyData={friendlyData} hours={data} id={id}/>
    </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchCard)
