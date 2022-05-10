import { useSearchParams } from "react-router-dom";

function VolcanoDetails() {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    return(
        <div>
            <h1>Volcano Details</h1>
            <p>Name: {name}</p>
        </div>
    );
}

export default VolcanoDetails;