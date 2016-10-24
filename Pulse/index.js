import React from 'react';
import {View, StyleSheet, Animated, Easing, Dimensions} from 'react-native';

export default class Pulse extends React.Component {
    constructor(props) {
        super(props);

        this.anim = new Animated.Value(0);
    }

    static defaultProps = {
        interval             : 2000,
        size                 : 100,
        pulseMaxSize         : 250,
        avatarBackgroundColor: 'white',
        pressInValue         : 0.8,
        pressDuration        : 150,
        pressInEasing        : Easing.in,
        pressOutEasing       : Easing.in,
        borderColor          : '#D8335B',
        backgroundColor      : '#ED225B55',
        x                    : 0,
        y                    : 0
    }

    componentDidMount() {
        Animated.timing(this.anim, {
            toValue : 1,
            duration: 2000,
            easing  : Easing.in,
        }).start();
    }

    render() {
        const {size, pulseMaxSize, borderColor, backgroundColor, x, y} = this.props;

        //console.log(this.props)

        return (
            <View style={[styles.circleWrapper, {
                width     : pulseMaxSize,
                height    : pulseMaxSize,
                marginLeft: -pulseMaxSize / 2,
                marginTop : -pulseMaxSize / 2,
            }, {left: x, top: y}]}>
                <Animated.View
                    style={[styles.circle, {
                        borderColor,
                        backgroundColor,
                        width       : this.anim.interpolate({
                            inputRange : [0, 1],
                            outputRange: [size, pulseMaxSize]
                        }),
                        height      : this.anim.interpolate({
                            inputRange : [0, 1],
                            outputRange: [size, pulseMaxSize]
                        }),
                        borderRadius: pulseMaxSize / 2,
                        opacity     : this.anim.interpolate({
                            inputRange : [0, 1],
                            outputRange: [1, 0]
                        })
                    }]}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    circleWrapper: {
        justifyContent: 'center',
        alignItems    : 'center',
        position      : 'absolute'
    },
    circle       : {
        borderWidth: 4 * StyleSheet.hairlineWidth,
    },
});