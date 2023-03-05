import PropTypes from 'prop-types'

const Login = ({username, password, onUsernameChange, onPasswordChange, handleLogin}) =>  {
    return (
        <>
            <h2 className="subtitle">Log in to Blog Collector</h2>
            <form onSubmit={handleLogin}>
                <label>username </label>
                <input type={'text'} name={'username-input'} value={username} onChange={onUsernameChange} ></input>
                <label>password </label>
                <input type={'password'} name={'password-input'} value={password} onChange={onPasswordChange} ></input>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
}

export default Login