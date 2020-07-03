import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'

import { updateModalVisibility, setResponsiveEvent } from '../redux/actions'
import store from '../redux/store'

class StoryPointEstimation extends React.Component {
    constructor(props) {
        super(props)

        const globalState = store.getState()
        this.state = {
            modalVisibility: globalState.modalVisibility,
            isSmallScreen: globalState.isSmallScreen,
            unsubscribe: store.subscribe(this.updateState),
        }
    }

    updateState = () => {
        const globalState = store.getState()
        this.setState({
            modalVisibility: globalState.modalVisibility,
            isSmallScreen: globalState.isSmallScreen,
        })
    }

    componentWillUnmount() {
        this.state.unsubscribe()
    }

    render() {
        return <View></View>
    }
}

export default StoryPointEstimation
