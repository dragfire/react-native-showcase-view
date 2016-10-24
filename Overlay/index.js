import React, {Component, PropTypes} from 'react'
import {View, Text, Animated, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'

import Pulse from '../Pulse'

const {width, height} = Dimensions.get('window');

export default class Overlay extends Component {
    static defaultProps = {
        description: PropTypes.string,
        x          : 10,
        y          : 10,
        onOk       : PropTypes.func.isRequired
    }

    static propTypes = {
        description: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this.state       = {
            circles: []
        };
        this.counter     = 1;
        this.setInterval = null;
    }

    componentDidMount() {
        this.setCircleInterval();
    }

    setCircleInterval() {
        this.setInterval = setInterval(this.addCircle.bind(this), 2000);
        this.addCircle();
    }

    addCircle() {
        this.setState({circles: [...this.state.circles, this.counter]});
        this.counter++;
    }

    render() {
        const {description, dX, dY, onOk} = this.props;
        return (
            <View style={styles.container}>
                {this.state.circles.map(circle => <Pulse key={circle} {...this.props}/>)}
                <View style={styles.description}>
                    <Text style={[styles.label, {top: dY}]}>{description}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={onOk}>
                    <View >
                        <Text style={styles.click}>Ok, Got it.</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container  : {
        flex           : 1,
        zIndex         : 1,
        position       : "absolute",
        left           : 0,
        right          : 0,
        bottom         : 0,
        top            : 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)"
    },
    label      : {
        color   : 'white',
        fontSize: 18
    },
    click      : {
        color   : 'white',
        fontSize: 16
    },
    description: {
        position      : 'absolute',
        width         : width,
        justifyContent: 'center',
        alignItems    : 'center'
    },
    button     : {
        position       : "absolute",
        bottom         : 10,
        right          : 10,
        width          : 120,
        height         : 40,
        backgroundColor: '#00bb6e',
        alignItems     : "center",
        justifyContent : "center"
    }
});
