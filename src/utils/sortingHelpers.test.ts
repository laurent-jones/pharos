import {sortByProperty} from "./sortingHelpers";

describe('sorting helpers', () => {
    describe('sortByProperty', () => {
        it('should sort by given property', () => {
            expect([{title: '1'}, {title: '3'}, {title: '2'}].sort((a, b) =>
                sortByProperty(a.title, b.title))).toEqual([{title: '1'}, {title: '2'}, {title: '3'}]);
        })
    })
})