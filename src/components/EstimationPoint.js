import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import store from '../redux/store'

import { updatePointEstimation } from '../redux/actions'

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

    selectPoint = () => {
        store.dispatch(updatePointEstimation(this.props.point))
        this.props.close()
    }

    render() {
        const { point, time, selected } = this.props
        const selectedContainer = selected
            ? styles.containerPointsSelected
            : null

        return (
            <View
                style={
                    this.state.isSmallScreen
                        ? styles.mobileContainer
                        : styles.container
                }
            >
                <View
                    style={[styles.pointsContainer, selectedContainer]}
                    onStartShouldSetResponderCapture={this.selectPoint}
                >
                    <Text
                        style={
                            selected
                                ? [styles.pointText, styles.pointTextSelected]
                                : styles.pointText
                        }
                    >
                        {point}
                    </Text>
                </View>
                <Text
                    style={
                        this.state.isSmallScreen
                            ? styles.textTimeMobile
                            : styles.textTime
                    }
                >
                    {time}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        alignItems: 'center',
    },
    mobileContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 4,
        alignItems: 'center',
    },
    pointsContainer: {
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        width: 26,
        height: 26,
        borderWidth: 1,
        borderColor: '#8A94A6',
        marginBottom: 5,
        ...Platform.select({
            web: {
                cursor: 'pointer',
            },
        }),
        marginTop: 4,
    },
    containerPointsSelected: {
        borderColor: '#0C66FF',
        backgroundColor: '#0D55CF',
    },
    pointText: {
        color: '#8A94A6',
        marginHorizontal: 5,
        alignSelf: 'center',
        fontSize: 12,
    },
    pointTextSelected: {
        color: 'white',
    },
    textTime: {
        color: 'white',
        fontSize: 8,
    },
    textTimeMobile: {
        color: 'white',
        fontSize: 12,
        marginLeft: 4,
    },
})
