import React, {Component} from 'react';

import Header from "./components/Header/Header.jsx";
import Tree from "./components/MainTree/MainTree.jsx";
import mock from "./mock.js";
export default class App extends Component {
    render() {
        return (
            <div style={{height: '100%'}}>
                <Header/>
                <Tree nodes={mock}/>
            </div>
        );
    }
}
        