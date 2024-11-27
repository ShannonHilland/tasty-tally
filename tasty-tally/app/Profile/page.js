import Navbar from "../components/Navbar";
import ProfileForm from "./ProfileForm";
import userData from "./user_data";

export default function Profile() {
    const user = userData;
    return (
        <div>
            <Navbar />
            <ProfileForm user={user}/>
        </div>
    );
}