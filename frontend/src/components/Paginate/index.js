import React from "react"
import { useApp } from "../../hooks"
import "./Paginate.css"

function Paginate({current, maxPages}) {
    const {count, setCount} = useApp()
    let items = []
    let leftSide = count - 2
    if (leftSide <= 0) leftSide = 1
    let rightSide = count + 2
    if (rightSide > maxPages) rightSide = maxPages
    for (let number = leftSide; number <= rightSide; number++) {
        items.push(
            <div key={number} className={
                (number === count ? 'round-effect active' : 'round-effect')
            } onClick={() => { setCount(number) }}>
            {number}
            </div>,
        )
    }
    const nextPage = () => {
        if (count < maxPages) {
            setCount(count + 1)
        }
    }

    const prevPage = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const paginationRender = (
        <div className="paginate-container">
            <div className="paginate">
                <div> Current Page: {count} </div>
        
                <div className="paginate-ctn">
                    <div onClick={prevPage} className="round-effect"> &lsaquo; </div>
                    {items}
                    <div onClick={nextPage} className="round-effect"> &rsaquo; </div>
                </div>
            </div>
        </div>
    )
    return (paginationRender)
}

export { Paginate }