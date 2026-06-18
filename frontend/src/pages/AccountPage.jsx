import { useParams } from "react-router-dom";

function AccountPage() {
    const {id}=useParams();
    return ( 
        <div>
{id}
        </div>
     );
}

export default AccountPage;