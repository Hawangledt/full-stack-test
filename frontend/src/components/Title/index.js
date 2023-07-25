import './Title.css'

function Title(props) {
    return (
        <div className="title">
            <h2>{props.children}</h2>
        </div>
    )
}

export { Title }
