import { defineFeature, loadFeature } from 'jest-cucumber'
import React from 'react'
import renderSnapshot from 'react-test-renderer'

import StoryPointEstimation from '../../src/components/StoryPointEstimation'
import store from '../../src/redux/store'
import { updateModalVisibility, updatePointEstimation } from '../../src/redux/actions'

const feature = loadFeature('./__tests__/bdd/CloseModalClickingOutsideModal.feature')

defineFeature(feature, test => {
    test('Closing the modal clicking outside the modal', ({ given, when, then }) => {

        let instance
        let spyCloseAnimiation

        given("The current value of the points is 8 and I have the modal open", () => {

            store.dispatch(updatePointEstimation(8))
            store.dispatch(updateModalVisibility(true))

            const tree = renderSnapshot.create(
                <StoryPointEstimation />
            )

            instance = tree.getInstance()
            instance.modalAnimation = (
                toValueScale,
                toValueMarginTop,
                toValueOpacity,
                callback
            ) => {
                callback()
            }

            spyCloseAnimiation = jest.spyOn(instance, 'modalAnimation')
        })

        when('I click outside the modal', () => {
            instance.close()
        })

        then('The modal should be closed', () => {
            expect(spyCloseAnimiation).toBeCalled()
        })

        then('updateModalVisibility in the redux state should be false', () => {
            expect(store.getState().modalVisibility).toEqual(false)
        })

        then('The current value for points should will remain 8', () => {
            expect(store.getState().pointEstimation).toEqual(8)
        })
    })
})