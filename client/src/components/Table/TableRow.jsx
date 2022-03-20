import React from "react";

function TableRow(props) {
    const { style, onClick } = props;

    return (
        <tr className="table-row" onClick={onClick}>
            {props.values.map((element, i) => (
                <td key={i} style={style}>
                    {element}
                </td>
            ))}
        </tr>
    );
}

export default TableRow;
