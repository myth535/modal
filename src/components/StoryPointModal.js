import React from 'react'
import { View, StyleSheet, Text, Animated, Platform } from 'react-native'

import EstimationPoint from './EstimationPoint'
import { updateModalVisibility } from '../redux/actions'
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

    componentDidMount() {
        this.props.dataModalAnimation.modalAnimation(1, 20, 1)
    }

    componentWillUnmount() {
        this.state.unsubscribe()
    }

    updateState = () => {
        this.setState({
            isSmallScreen: store.getState().isSmallScreen,
        })
    }

    close = () => {
        this.props.dataModalAnimation.modalAnimation(0, -60, 0, () =>
            store.dispatch(updateModalVisibility(false))
        )
    }

    render() {
        const { dataModalAnimation } = this.props
        const state = store.getState()
        const { pointEstimation } = state
        const { isSmallScreen } = this.state

        return (
            <Animated.View
                style={[
                    isSmallScreen
                        ? styles.mobileModalContainer
                        : styles.modalContainer,
                    {
                        transform: [
                            { scale: dataModalAnimation.animatedScale },
                        ],
                        marginTop: dataModalAnimation.animatedMarginTop,
                        opacity: dataModalAnimation.animatedOpacity,
                    },
                ]}
                onStartShouldSetResponder={() => true}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headText}>Story Point Estimation</Text>
                    <Text
                        style={styles.closeButton}
                        onStartShouldSetResponderCapture={this.close}
                    >
                        X
                    </Text>
                </View>
                <Text style={styles.actionText}>
                    Select an estimation for your task
                </Text>
                <View
                    style={
                        isSmallScreen
                            ? styles.mobilePointsContainer
                            : styles.pointsContainer
                    }
                >
                    {estimationPointsData.map(estPoint => {
                        const selected =
                            estPoint.point === pointEstimation ? true : false
                        return (
                            <EstimationPoint
                                point={estPoint.point}
                                time={estPoint.time}
                                key={estPoint.point}
                                selected={selected}
                                close={this.close}
                            />
                        )
                    })}
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#091540',
        width: 340,
        height: 100,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    mobileModalContainer: {
        backgroundColor: '#091540',
        width: 200,
        height: 390,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    headerContainer: {
        flexDirection: 'row',
    },
    headText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    closeButton: {
        color: 'white',
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        fontSize: 11,
        ...Platform.select({
            web: {
                cursor: 'pointer',
            },
        }),
    },
    actionText: {
        color: 'white',
        fontSize: 10,
        textDecorationLine: 'underline',
        textDecorationColor: '#A16BFF',
    },
    pointsContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'center',
    },
    mobilePointsContainer: {
        flexDirection: 'column',
        marginTop: 5,
        justifyContent: 'center',
    },
})

export default StoryPointModal
