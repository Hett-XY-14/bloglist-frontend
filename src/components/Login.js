const Login = ({username, password, onUsernameChange, onPasswordChange, handleLogin}) =>  {
    return (
        <form onSubmit={handleLogin}>
            <label>username </label>
            <input type={'text'} name={'username-input'} value={username} onChange={onUsernameChange} ></input>
            <label>password </label>
            <input type={'password'} name={'password-input'} value={password} onChange={onPasswordChange} ></input>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login