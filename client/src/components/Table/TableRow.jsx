import React from "react";

function TableRow(props) {
	const { style } = props;

	return (
		<tr className="table-row">
			{props.values.map((element, i) => (
				<td key={i} style={style}>
					{element}
				</td>
			))}
		</tr>
	);
}

export default TableRow;
