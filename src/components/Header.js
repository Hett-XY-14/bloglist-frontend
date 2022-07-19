const logo = require('../assets/b-logo-square.png')
const Header = () => {
    return (
        <div className="header-container">
            <img src={logo} alt="Blog collector logo" id='logo'></img><span id='logo-legend'>log collector</span>
        </div>
    ) 
}

export default Header;
