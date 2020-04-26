import Link from "next/link";
import Head from "next/head";
import {connect} from "react-redux";
import {deauthenticate} from "../redux/authActions";

const Layout = ({children, title, deauthenticate, isAuthenticated}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <ul>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    {!isAuthenticated && (
                        <li>
                            <Link href="/signin">
                                <a>Sign In</a>
                            </Link>
                        </li>
                    )}
                    {!isAuthenticated && (
                        <li>
                            <Link href="/signup">
                                <a>Sign Up</a>
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li onClick={deauthenticate}>
                            <a>Sign Out</a>
                        </li>
                    )}
                    <li>
                        <Link href="/profile">
                            <a>Profile</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="has-text-centered">
                {children}
            </div>
        </div>
    )
}

const mapStateToProps = ({authentication}) => {
    return{
        isAuthenticated: authentication.token
    }
}

export default connect(mapStateToProps, {deauthenticate})(Layout);