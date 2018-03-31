import React from 'react';

// Components
import MasterList from './MasterList';
import Detail from './Detail';

// Styles
import style from "../styles/app.scss";

// Mock data
import listData from '../data/list';
import detailDatap01 from '../data/p01';
import detailDatap02 from '../data/p02';
import detailDatap03 from '../data/p03';
import detailDatap04 from '../data/p04';
import detailDatap05 from '../data/p05';

// Font awesome
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeSolids from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(FontAwesomeSolids);

export default class App extends React.Component {

    constructor(props) {
        console.log('App constructor()', props);
        super(props);
        
        this.state = {
            currentId: 'p01'
        };

        this.dataMap = {
            'p01': detailDatap01,
            'p02': detailDatap02,
            'p03': detailDatap03,
            'p04': detailDatap04,
            'p05': detailDatap05
        };

        this.go = this.go.bind(this);
    }

    render() {
        return (
            <div id="app">
                <MasterList data={listData} current={this.state.currentId} go={this.go} />
                <Detail data={this.dataMap[this.state.currentId]} />
            </div>
        );
    }

    go(newId) {
        if (this.state.currentId !== newId) {
            this.setState({
                currentId: newId
            });
        }
    }

}
