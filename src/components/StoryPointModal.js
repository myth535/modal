import React from 'react'
import { View, StyleSheet, Text, Animated, Platform } from 'react-native'

import store from '../redux/store'

const estimationPointsData = [
    { point: 0, time: '10 min' },
    { point: 1, time: '30 min' },
    { point: 2, time: '1-2 hours' },
    { point: 3, time: 'Half day' },
    { point: 5, time: '1 day' },
    { point: 8, time: '1.5 days' },
    { point: 13, time: '2 days' },
    { point: 21, time: '3 days' },
]

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
