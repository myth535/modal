import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'

import CurrentStoryPoint from './CurrentStoryPoint'
import StoryPointModal from './StoryPointModal'
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

        this.animatedScale = new Animated.Value(0)
        this.animatedMarginTop = new Animated.Value(-60)
        this.animatedOpacity = new Animated.Value(0)
    }

    updateState = () => {
        const globalState = store.getState()
        this.setState({
            modalVisibility: globalState.modalVisibility,
            isSmallScreen: globalState.isSmallScreen,
        })
    }

    close = () => {
        if (store.getState().modalVisibility) {
            this.modalAnimation(0, -60, 0, () =>
                store.dispatch(updateModalVisibility(false))
            )
        }
    }

    modalAnimation = (
        toValueScale,
        toValueMarginTop,
        toValueOpacity,
        callback
    ) => {
        const duration = 250
        Animated.parallel([
            Animated.timing(this.animatedScale, {
                toValue: toValueScale,
                duration,
            }),
            Animated.timing(this.animatedMarginTop, {
                toValue: toValueMarginTop,
                duration,
            }),
            Animated.timing(this.animatedOpacity, {
                toValue: toValueOpacity,
                duration,
            }),
        ]).start(callback)
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

    setResponder() {
        return true
    }

    render() {
        const { modalVisibility } = this.state
        const dataModalAnimation = {
            modalAnimation: this.modalAnimation,
            animatedScale: this.animatedScale,
            animatedMarginTop: this.animatedMarginTop,
            animatedOpacity: this.animatedOpacity,
        }

        return (
            <View
                style={styles.document}
                onStartShouldSetResponder={this.setResponder}
                onResponderRelease={this.close}
                onLayout={this.onLayoutChange}
            >
                <View style={styles.container}>
                    <CurrentStoryPoint
                        dataModalAnimation={dataModalAnimation}
                    />
                    {modalVisibility ? (
                        <StoryPointModal
                            dataModalAnimation={dataModalAnimation}
                        />
                    ) : null}
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
