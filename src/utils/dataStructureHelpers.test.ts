import {convertToTreeStructure} from "./dataStructureHelpers";

describe('data structure helpers', () => {
    describe('convertToTreeStructure', () => {
        it('should convert flat list to tree structure', () => {
            const flatData = [{
                id: "app-32",
                name: "Application 32",
                spend: 28839,
                BCAP1: "Business Capability 3",
                BCAP2: "Business Capability 3.3",
                BCAP3: "Business Capability 3.3.2"
            }, {
                id: "app-33",
                name: "Application 33",
                spend: 67481,
                BCAP1: "Business Capability 1",
                BCAP2: "Business Capability 1.2",
                BCAP3: "Business Capability 1.2.3"
            }, {
                id: "app-34",
                name: "Application 34",
                spend: 4847,
                BCAP1: "Business Capability 2",
                BCAP2: "Business Capability 2.1",
                BCAP3: "Business Capability 2.1.3"
            }];
            expect(convertToTreeStructure(flatData)).toEqual({
                'Business Capability 3': {
                    title: "Business Capability 3",
                    children: [
                        {
                            title: "Business Capability 3.3",
                            children: [
                                {
                                    title: "Business Capability 3.3.2"
                                }
                            ]
                        }
                    ]
                },
                'Business Capability 1': {
                    title: "Business Capability 1",
                    children: [
                        {
                            title: "Business Capability 1.2",
                            children: [
                                {
                                    title: "Business Capability 1.2.3"
                                }
                            ]
                        }
                    ]
                },
                'Business Capability 2': {
                    title: "Business Capability 2",
                    children: [
                        {
                            title: "Business Capability 2.1",
                            children: [
                                {
                                    title: "Business Capability 2.1.3"
                                }
                            ]
                        }
                    ]
                }
            })
        })
    })
})