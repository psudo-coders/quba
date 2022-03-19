import React from "react";

function TableHeadRow(props) {
	return (
		<tr className="table-row">
			{props.values.map((element, i) => (
				<th key={i}>{element}</th>
			))}
		</tr>
	);
}

export default TableHeadRow;
