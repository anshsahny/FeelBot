import React, { useState, useEffect } from "react";

const UserList = props => {
    return (
        <div className="card">
            <h5 className="invert-color">Users</h5>
            <div className="scrollable">
                {/* map all users recieved from backend here */}
            </div>
        </div>
    )
}

export default UserList