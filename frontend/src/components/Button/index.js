import './Button.css'

const Button = (props) => {
    return (
    <button className="button">
        {props.children}
     </button>
    )
}

export { Button }