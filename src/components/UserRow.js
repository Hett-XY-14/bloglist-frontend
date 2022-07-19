const UserRow = ({user, userPhoto, handleLogout}) => {
    return (
        <div className="user-row-container">
            <img src={userPhoto} alt={"User profile"} id="user-photo"></img>
            { user === null ? null : `${user.name} logged-in` }
            <button onClick={handleLogout} className="negative-button" id="logout-button"> Logout </button>
        </div>
    )
}

export default UserRow