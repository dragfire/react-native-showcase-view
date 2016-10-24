import React, {Component, PropTypes} from 'react'
import {View, Text, Dimensions} from 'react-native'

import Overlay from './Overlay'

const {width, height} = Dimensions.get("window");

export default class Showcase extends Component {

    static propTypes = {
        components: PropTypes.array,
        dX        : PropTypes.number,
        dY        : PropTypes.number,
        x         : PropTypes.number,
        y         : PropTypes.number
    }

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            counter   : 0,
            components: this.props.components || [{}]
        };

        this.onOk    = this.onOk.bind(this);
        this.current = this.current.bind(this);
    }

    componentWillMount() {
        console.log("Mount");
        // /this.current();
    }

    componentDidMount() {
        //this.current();
    }

    componentWillReceiveProps(props) {
        //console.log("PROPS:", props, props.components.length);
        this.setState({components: props.components, length: props.components.length}, ()=> {
            this.current();
        });
    }

    current() {
        // console.log("Current:", this.props, this.state)
        if (this.state.components) {
            let curr = this.state.components[this.state.counter];
            console.log(curr);
            // console.log(typeof this.state.components, this.state.components, this.state.components[1]);
            this.setState({
                counter: ++this.state.counter,
                current: {
                    dY         : curr.py > height / 3 ? curr.py - height / 4 : curr.py + height / 4,
                    width      : curr.px + curr.width / 2,
                    height     : curr.py + curr.height / 2,
                    description: curr.description
                }
            });
        }
    }

    onOk() {
        console.log("onOk Pressed");
        if (this.state.length !== this.state.counter) {
            this.current();
        } else {
            this.setState({counter: 0}, ()=> {
                this.current();
            });
        }
    }

    render() {
        let OLay = null;

        if (this.state.current) {
            OLay = <Overlay
                description={this.state.current.description}
                dY={this.state.current.dY}
                x={this.state.current.width}
                y={this.state.current.height}
                onOk={this.onOk}
            />
        }
        return OLay;
    }
}
