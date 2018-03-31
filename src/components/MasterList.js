import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class MasterList extends React.Component {

    constructor(props) {
        console.log('MasterList constructor()', props);
        super(props);
        this.state = {
            expanded: false
        };
        this.toggleExpand = this.toggleExpand.bind(this);
    }

    render() {
        return (
            <div id="masterlist">
                <h2>Dashboard</h2>
                <FontAwesomeIcon icon="bars" className="expand" onClick={this.toggleExpand} />
                <ul className={(this.state.expanded) ? "expanded" : ""}>
                    {
                        this.props.data.map((person) => {
                            return (
                                <li key={person.id} className={(person.id === this.props.current) ? "selected" : ""} onClick={() => { this.props.go(person.id); }}>
                                    <FontAwesomeIcon icon="user" className="icon" />
                                    <span className="name">{person.name}</span>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }

    toggleExpand() {
        this.setState({
            expanded: (this.state.expanded) ? false : true
        });
    }

}
