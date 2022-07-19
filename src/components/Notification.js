const Notification = ({message, type}) => {
    return (
        <div id={type}>
            <h2>{message}</h2>
        </div>
    )
}

export default Notification