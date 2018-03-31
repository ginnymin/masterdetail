import React from 'react';

export default class ToggleButton extends React.Component {

    constructor(props) {
        console.log('ToggleButton constructor()', props);
        super(props);
    }

    render() {
        return (
            <div className="toggle-button">
                {
                    this.props.data.map(button => {
                        let selected = (button.selected) ? 'selected' : '';
                        return(<button className={selected} type={button.type} onClick={() => { this.props.toggle(button.type); }}>{button.label}</button>);
                    })
                }
            </div>
        );
    }

}
