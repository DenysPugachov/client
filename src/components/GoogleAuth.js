import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions"


class GoogleAuth extends Component {

  componentDidMount() {

    //load additional code for googleOAuth2 lib;
    window.gapi.load("client:auth2", () => {

      //initialize authentication client with my clientId
      window.gapi.client.init({

        clientId: "963005944381-j4gv2l7inkgt194g96k5ucacdj22hmfl.apps.googleusercontent.com",

        //ask users scop of email;
        scope: "email",

      }).then(() => {
        // initialize googleAuth obj;
        this.auth = window.gapi.auth2.getAuthInstance();

        //update current auth status on first initialization ( isSignedIn.get() || null );
        this.onAuthChange(this.auth.isSignedIn.get());

        //That takes a boolean value. listen() passes true to this function when the user signs in, and false when the user signs out.
        //https://developers.google.com/identity/sign-in/web/reference#googleauthissignedinlistenlistener
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    })
  }

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };


  renderAuthBtn() {
    switch (this.props.isSignedIn) {
      case null:
        return <div>I don't now Auth status</div>;

      case true:
        return <button
          className="ui red google button"
          onClick={ this.onSignOutClick }
        >
          <i className="google icon" />
          Sign Out
          </button>;

      case false:
        return <button
          className="ui green google button"
          onClick={ this.onSignInClick }
        >
          <i className="google icon" />
        Sign In with Google
        </button>;

      default:
    };
  }

  render() {
    return <div>{ this.renderAuthBtn() }</div>
  };
}


const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};


export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);