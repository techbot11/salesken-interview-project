import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { flatMap } from "lodash";
import { connect } from "react-redux";
import MainLayout from "../../layout/MainLayout";
class AuthGuard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: true,
    };
  }

  componentDidMount() {
    this.setState({
      routes: flatMap(this.state.routes, (item) => {
        if (item.routes) {
          return [...item.routes];
        }
        return [item];
      }),
    });

    if (!this.state.authenticated) {
      this.redirectRoute(this.props);
    }
  }

  componentDidUpdate() {
    if (!this.state.authenticated) {
      this.redirectRoute(this.props);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.authenticated !== this.state.authenticated;
  }

  static getDerivedStateFromProps(props) {
    const { isLogin, user } = props;
    const authenticated = isLogin && !!user;
    debugger;
    return {
      authenticated,
    };
  }

  redirectRoute(props) {
    const { location, history } = props;
    const { pathname } = location;
    debugger;
    history.push({
      pathname: "/login",
      state: { redirectUrl: pathname },
    });
  }

  render() {
    let { routes } = this.props;
    const { authenticated,  } = this.state;

    return authenticated ? (
      <Fragment>
        <MainLayout routes={routes ?? []} />
      </Fragment>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.auth.isLogin,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(AuthGuard));
