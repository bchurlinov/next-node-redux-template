import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {authenticate} from "../redux/authActions";
import Layout from "../components/Layout";
import Router from "next/router";

const SignIn = ({authenticate, token}) => {
    const [inputs, setInputs] = useState({email: "bojan@hotmail.com", password: "sauron1985"});

    const handleSubmit = event => {
        event.preventDefault();
        authenticate({email: "bojan@gmail.com", password: "sauron1985"});
    }

    const redirectToLogin = res => {
        if (res) {
            res.writeHead(302, {Location: '/login'})
            res.end()
            res.finished = true
        } else {
            Router.push('/login')
        }
    }


    return(
        <Layout title="Sign In">
            <h3>Sign In</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={inputs.email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        required
                        value={inputs.password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </Layout>
    )
}

SignIn.getInitialProps = ctx => {
    if(ctx.req && ctx.req.cookies.token){
        ctx.res.redirect("/")
    }
}


export default connect(state => state, {authenticate})(SignIn);