import React from "react";
import {makeStore} from "../redux";
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import {checkServerSideCookie} from "../redux/authActions";

const MyApp = ({ Component, pageProps, store }) => {
    return (
        <React.Fragment>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </React.Fragment>
    );
};

MyApp.getInitialProps = async ({Component, ctx}) => {
    ctx.store.dispatch({ type: 'FOO', payload: 'foo' });
    ctx.store.dispatch(checkServerSideCookie(ctx));
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
}

export default withRedux(makeStore)(MyApp);