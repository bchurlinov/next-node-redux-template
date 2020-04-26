import {useEffect} from "react";
import {connect} from "react-redux";
import Layout from "../components/Layout";
import {reauthenticate, getProfile, updateProfile} from "../redux/authActions";

const Profile = ({profile, getProfile, updateProfile}) => {

    useEffect(() => {
        getProfile();
    }, []);

    const update = () => {
        updateProfile()
    }

    return (
        <Layout title="Profile Page">
            <h1>Profile Page</h1> <br/>
            <h2>My e-mail is : {profile && profile.email}</h2>
            <p>My Name is: {profile && profile.firstName}</p>
            <button onClick={update}>Update my name</button>
        </Layout>
    )
}

const mapStateToProps = ({authentication}) => {
    return {
        profile: authentication.profile
    }
}

export default connect(mapStateToProps, {reauthenticate, getProfile, updateProfile})(Profile);