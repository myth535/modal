import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { updateModalVisibility } from '../redux/actions'
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

    showOptions = () => {
        const state = store.getState()

        if (state.modalVisibility) {
            this.props.dataModalAnimation.modalAnimation(0, -60, 0, () =>
                store.dispatch(updateModalVisibility(false))
            )
        } else {
            store.dispatch(updateModalVisibility(true))
        }
    }

    render() {
        return (
            <View
                style={styles.buttonContainer}
                onStartShouldSetResponder={this.setResponder}
                onResponderRelease={this.showOptions}
            >
                <View style={styles.pointsContainer}>
                    <Text style={styles.pointText}>
                        {this.state.pointEstimation}
                    </Text>
                </View>
                <Text style={styles.textLabel}>Points</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#E7ECEF',
        borderRadius: 60,
        width: Platform.OS === 'android' ? 80 : 60,
        paddingHorizontal: 2,
        padding: 3,
        ...Platform.select({
            web: {
                cursor: 'pointer',
            },
        }),
    },
    pointsContainer: {
        borderRadius: 60,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: Platform.OS === 'android' ? 22 : 13,
        height: Platform.OS === 'android' ? 22 : 13,
        borderWidth: 1,
        borderColor: '#8A94A6',
    },
    pointText: {
        color: '#8A94A6',
        marginHorizontal: 5,
        alignSelf: 'center',
        fontSize: Platform.OS === 'android' ? 8 : 8,
    },

    textLabel: {
        color: '#8A94A6',
        fontSize: Platform.OS === 'android' ? 14 : 10,
    },
})
