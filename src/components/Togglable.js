import {useState, forwardRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {

    const [visibility, setVisibility] = useState(false)

    const hiddenWhenVisibilityIsTrue = {display: visibility ? 'none' : ''}
    const shownWhenVisibilityIsTrue = {display: visibility ? '' : 'none'}

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    return(
        <div>
            <div style={hiddenWhenVisibilityIsTrue}>
                <button onClick={toggleVisibility}>{props.labelTitle}</button>
            </div>
            <div style={shownWhenVisibilityIsTrue}>
                {props.children}
                <button onClick={toggleVisibility}>{props.closeLabelTitle}</button>                
            </div>
        </div>
        
    )
})

Togglable.propTypes = {
    labelTitle: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable"

export default Togglable;