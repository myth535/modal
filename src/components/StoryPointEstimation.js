import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'

import { updateModalVisibility, setResponsiveEvent } from '../redux/actions'
import store from '../redux/store'

const smallWidthBreakpoint = 408
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

    onLayoutChange = event => {
        const width = event.nativeEvent.layout.width
        const { isSmallScreen } = this.state

        if (width < smallWidthBreakpoint && !isSmallScreen) {
            store.dispatch(setResponsiveEvent(true))
        } else if (width > smallWidthBreakpoint && isSmallScreen) {
            store.dispatch(setResponsiveEvent(false))
        }
    }

    render() {
        return <View onLayout={this.onLayoutChange}></View>
    }
}

export default StoryPointEstimation
