import './Card.css'

function Card({value, name, tag, abv, ibu, img}) {
    return (
        <div key={value} className="listOfCards">
            <div className="card">
                <div className="cardTop">
                    <img alt="Beer Example" src={img} />
                </div>
                <div className="cardBottom">
                    <h3>{name}</h3>
                    <p/>
                    <h5>{tag}</h5>
                    <p/>
                    <h5>ABV: {abv}</h5>
                    <h5>IBU: {ibu}</h5>
                </div>
            </div>
        </div>
    )
}

export { Card }