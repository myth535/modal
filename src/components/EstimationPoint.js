import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import store from '../redux/store'

export default class EstimationPoint extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSmallScreen: store.getState().isSmallScreen,
            unsubscribe: store.subscribe(this.updateState),
        }
    }

    updateState = () => {
        this.setState({
            isSmallScreen: store.getState().isSmallScreen,
        })
    }

    componentWillUnmount() {
        this.state.unsubscribe()
    }

    render() {
        return <View></View>
    }
}
