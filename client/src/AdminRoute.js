import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

    const AdminRoute = (props) => {
        const { component: Component , sessionUser, ...rest } = props

        return(
            <Route {...rest} render={( props ) => {
                return(
                    sessionUser && (sessionUser.state === 'admin')
                    ? <Component {...props} />
                    : <Redirect to = '/' />)
                }
            }/>)
    }

    function mapStateToProps(state) {
    	return {
            sessionUser: state.sessions.sessionUser
    	};
    }

    function mapDispatchToProps(dispatch){
        return {}
    }

    export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute)
