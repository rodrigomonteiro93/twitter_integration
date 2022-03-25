import React from "react";
import "./index.css";

function GridTweetsCard (props) {
    const item = props.item;
    const d = new Date(item.updatedAt);
    const date = d.toLocaleDateString();
    const id = item.id;

    return (
        <>
        <div key={id} className="card">
        <div className="d-flex direction-column">
            <div>
                <strong>{props.status ? 'Aprovado' : 'Aguardando aprovação'}</strong>
                <span>{date}</span>
                <p>
                    {item.text}
                </p>
            </div>
            <footer className="d-flex">
                <button onClick={props.handleApprove.bind(this, id)}>
                    Aprovar
                </button>
                <button className="delete" onClick={props.handleReprove.bind(this, id)}>
                    Reprovar
                </button>
            </footer>
        </div>
        </div>
        </>
    )
}

export default GridTweetsCard;