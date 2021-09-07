import {render} from '@testing-library/react';
import ApplicationData from './ApplicationData';
import {StyleSheetTestUtils} from "aphrodite";

describe('ApplicationData', () => {
    beforeAll(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });
    const defaultProps = {
        filteredData: [{
            id: "app-7",
            name: "Application 7",
            spend: 20000,
            BCAP1: "Business Capability 1",
            BCAP2: "Business Capability 1.1",
            BCAP3: "Business Capability 1.1.2"
        },
            {
                id: "app-8",
                name: "Application 8",
                spend: 56205,
                BCAP1: "Business Capability 1",
                BCAP2: "Business Capability 1.2",
                BCAP3: "Business Capability 1.2.2"
            },
            {
                id: "app-9",
                name: "Application 9",
                spend: 64792,
                BCAP1: "Business Capability 2",
                BCAP2: "Business Capability 2.1",
                BCAP3: "Business Capability 2.1.1"
            },
            {
                id: "app-10",
                name: "Application 10",
                spend: 35651,
                BCAP1: "Business Capability 3",
                BCAP2: "Business Capability 3.2",
                BCAP3: "Business Capability 3.2.2"
            },],
        selectedFilter: [],
        currentSpend: 64792,
    }
    it('renders according to snapshot', async () => {
        const {asFragment} = render(<ApplicationData {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
    it('renders all items when no filter applied and within spend', async () => {
        const {queryByTestId} = render(<ApplicationData {...defaultProps} />);
        expect(queryByTestId('app-7')).toBeInTheDocument();
        expect(queryByTestId('app-8')).toBeInTheDocument();
        expect(queryByTestId('app-9')).toBeInTheDocument();
        expect(queryByTestId('app-10')).toBeInTheDocument();
    });
    it('renders correct number of items with one parent filter applied and within spend', async () => {
        const {queryByTestId} = render(<ApplicationData {...defaultProps} selectedFilter={['Business Capability 1']}/>);
        expect(queryByTestId('app-7')).toBeInTheDocument();
        expect(queryByTestId('app-8')).toBeInTheDocument();
        expect(queryByTestId('app-9')).not.toBeInTheDocument();
        expect(queryByTestId('app-10')).not.toBeInTheDocument();
    });
    it('renders correct number of items with one child filter applied and within spend', async () => {
        const {queryByTestId} = render(<ApplicationData {...defaultProps}
                                                        selectedFilter={['Business Capability 1.1']}/>);
        expect(queryByTestId('app-7')).toBeInTheDocument();
        expect(queryByTestId('app-8')).not.toBeInTheDocument();
        expect(queryByTestId('app-9')).not.toBeInTheDocument();
        expect(queryByTestId('app-10')).not.toBeInTheDocument();
    });
    it('renders correct number of items with multiple filters applied and within spend', async () => {
        const {queryByTestId} = render(<ApplicationData {...defaultProps}
                                                        selectedFilter={['Business Capability 1', 'Business Capability 1.1']}/>);
        expect(queryByTestId('app-7')).toBeInTheDocument();
        expect(queryByTestId('app-8')).not.toBeInTheDocument();
        expect(queryByTestId('app-9')).not.toBeInTheDocument();
        expect(queryByTestId('app-10')).not.toBeInTheDocument();
    });
    it('renders correct items when no filter applied but not within spend', async () => {
        const {queryByTestId} = render(<ApplicationData {...defaultProps} currentSpend={20000}/>);
        expect(queryByTestId('app-7')).toBeInTheDocument();
        expect(queryByTestId('app-8')).not.toBeInTheDocument();
        expect(queryByTestId('app-9')).not.toBeInTheDocument();
        expect(queryByTestId('app-10')).not.toBeInTheDocument();
    });
    it('renders correct items when navigation filter applied and within spend', async () => {
        const {queryByTestId} = render(<ApplicationData{...defaultProps} selectedFilter={['Business Capability 1']}
                                                       currentSpend={64792}/>);
        expect(queryByTestId('app-7')).toBeInTheDocument();
        expect(queryByTestId('app-8')).toBeInTheDocument();
        expect(queryByTestId('app-9')).not.toBeInTheDocument();
        expect(queryByTestId('app-10')).not.toBeInTheDocument();
    });
});