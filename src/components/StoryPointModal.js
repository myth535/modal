import React from 'react'
import { View, StyleSheet, Text, Animated, Platform } from 'react-native'

import store from '../redux/store'

class StoryPointModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSmallScreen: store.getState().isSmallScreen,
            unsubscribe: store.subscribe(this.updateState),
        }
    }

    componentWillUnmount() {
        this.state.unsubscribe()
    }

    updateState = () => {
        this.setState({
            isSmallScreen: store.getState().isSmallScreen,
        })
    }

    render() {
        return <Animated.View></Animated.View>
    }
}
export default StoryPointModal
