import React, {Component} from "react";
import Layout from "../components/Layout";
import {connect} from "react-redux";
import {getPosts} from "../redux/fooActions";
import Router from "next/router";
import "../assets/styles/main.scss";

class Index extends Component {

    static getInitialProps = async (ctx) => {
        await ctx.store.dispatch(getPosts())
        return {
            custom: "custom"
        }
    }

    goToLogin = () => {
        Router.push("/signin")
    }

    render() {
        const {custom, foo} = this.props;

        return (
            <Layout title="Home Page">
               <h1>This is the home Page</h1>
                <button onClick={this.goToLogin}>Got to login</button>
            </Layout>
        )
    }
}

export default connect(state => state, {getPosts})(Index);