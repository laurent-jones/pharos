import {unique} from "./arrayHelpers";

describe('array helpers', () => {
    describe('unique', () => {
        it('should filter in only unique values', () => {
            expect(['1', '1', '1', '2', '2', '3', '3'].filter(unique)).toEqual(['1', '2', '3']);
        })
    })
})