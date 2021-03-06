import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamList from "./streams/StreamList"
import StreamCreate from "./streams/StreamCreate"
import StreamDelete from "./streams/StreamDelete"
import StreamEdit from "./streams/StreamEdit"
import StreamShow from "./streams/StreamShow"
import Header from "./Header";
import history from "../history"

//good template for your app 380

const App = () => {
  return (
    <div className="ui container">
      <Router history={ history }>
        <Header />

        {/* <Switch /> => show only first route with can find */ }
        <Switch>
          <Route path="/" exact component={ StreamList } />
          <Route path="/streams/new" exact component={ StreamCreate } />
          <Route path="/streams/delete/:id" exact component={ StreamDelete } />
          <Route path="/streams/edit/:id" exact component={ StreamEdit } />
          <Route path="/streams/:id" exact component={ StreamShow } />
        </Switch>
      </Router>
    </div>
  )
}


export default App;