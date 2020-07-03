import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import store from '../redux/store'

export default class CurrentStoryPoint extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pointEstimation: store.getState().pointEstimation,
            unsubscribe: store.subscribe(this.updateState),
        }
    }

    updateState = () => {
        this.setState({
            pointEstimation: store.getState().pointEstimation,
        })
    }

    componentWillUnmount() {
        this.state.unsubscribe()
    }

    setResponder() {
        return true
    }

    render() {
        return <View></View>
    }
}
