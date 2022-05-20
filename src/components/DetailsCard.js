import { Table } from "reactstrap";

function DetailsCard(props) {
    
    const getLabel = (prop_name) => {
        let label = prop_name.replace(prop_name[0], prop_name[0].toUpperCase());
        let underScoreIndex = label.indexOf('_');
        if (underScoreIndex >= 0) {
            label = label.replace(prop_name[underScoreIndex + 1], prop_name[underScoreIndex + 1].toUpperCase());
        }
        label = label.replace('_', ' ');
        return (label)
    };

    return (
        <Table
            id={props.id}
            className="table"
        >
            <tbody>
                {Object.entries(props.volcano).map(([key, value]) => {
                    return (
                        <tr key={`tr-${key}`}>
                            <td key={`${key}-name`} className="property-name">{getLabel(key)}</td>
                            <td key={`${key}-value`} className="property-value">{value}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
     );
}

export default DetailsCard;