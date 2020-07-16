import { defineFeature, loadFeature } from 'jest-cucumber'
import React from 'react'
import renderSnapshot from 'react-test-renderer'

import StoryPointModal from '../../src/components/StoryPointModal'
import store from '../../src/redux/store'
import { updateModalVisibility, updatePointEstimation } from '../../src/redux/actions'

const feature = loadFeature('./__tests__/bdd/CloseModalClickingCloseButton.feature')

defineFeature(feature, test => {
    test('Closing the modal clicking the close button', ({ given, when, then }) => {

        let dataModalAnimation
        let instance

        given("The current value for points is 13 and I have open a modal and the modal have a button for close it", () => {

            store.dispatch(updatePointEstimation(13))            

            dataModalAnimation = {
                modalAnimation: jest.fn(() => { store.dispatch(updateModalVisibility(!store.getState().modalVisibility)) }),
                animatedScale: 2,
                animatedMarginTop: 80,
                animatedOpacity: 1,
            }

            const tree = renderSnapshot.create(
                <StoryPointModal dataModalAnimation={dataModalAnimation} />
            )

            instance = tree.getInstance()
        })

        when('I click the close button', () => {
            instance.close()
        })

        then('The modal should be closed', () => {
            //The function run twice, first when the component was mounted and again before the component would be unmount 
            expect(dataModalAnimation.modalAnimation.mock.calls.length).toBe(2)
        })

        then('updateModalVisibility in the redux state should be false', () => {
            expect(store.getState().modalVisibility).toEqual(false)
        })

        then('The current value for points should will remain 13', () => {
            expect(store.getState().pointEstimation).toEqual(13)
        })
    })
})