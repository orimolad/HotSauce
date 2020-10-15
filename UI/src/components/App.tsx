import * as React from "react";
import { hot } from "react-hot-loader";
import {CheckboxBasic} from "./CheckBoxSpicyLevel"


const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";




class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <h1>Organic and Locally Sourced Hot Stuff</h1>
        <p>What spicy level are you?</p>
        <CheckboxBasic/>
        
        <img src={reactLogo.default} height="480" />
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
