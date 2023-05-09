import React from "react";

const UserList = props => {
    return (
        <div className="card">
            <h5 className="invert-color">Users</h5>
            <div className="scrollable">
                {props.users && props.users.map((user, index) => {
                    return (<div key={index} className="invert-color">{user}</div>)
                })}
            </div>
        </div>
    )
}

export default UserList