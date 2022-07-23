const Notification = ({message, type}) => {
    console.log(message)
    
    return (
        message === "" ? null :
        <div id={type}>
            <h2>{message}</h2>
        </div>
    )
}

export default Notification