import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'

import CurrentStoryPoint from './CurrentStoryPoint'
import StoryPointModal from './StoryPointModal'
import { setResponsiveEvent } from '../redux/actions'
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
        const { modalVisibility } = this.state

        return (
            <View
                style={styles.document}
                onStartShouldSetResponder={this.setResponder}
                onResponderRelease={this.close}
                onLayout={this.onLayoutChange}
            >
                <View style={styles.container}>
                    <CurrentStoryPoint />
                    {modalVisibility ? <StoryPointModal /> : null}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    document: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
        marginTop: 100,
        transform: [{ scale: 1.2 }],
    },
})

export default StoryPointEstimation
