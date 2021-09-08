import {render} from '@testing-library/react';
import List from './List';
import {StyleSheetTestUtils} from "aphrodite";

describe('List', () => {
    beforeAll(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });
    const defaultProps = {
        setSelectedFilter: jest.fn(),
        selectedFilter: [],
        item: {
            id: 'Business Capability 1',
            title: "Business Capability 1",
            children: [{
                title: "Business Capability 1.1",
                children: [{
                    title: "Business Capability 1.1.2",
                }]
            }],
        },
    } as any;
    it('renders according to snapshot', async () => {
        const {asFragment} = render(<List {...defaultProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
    it('renders parent item only when parent is not clicked', async () => {
        const {queryByTestId} = render(<List {...defaultProps} />);
        expect(queryByTestId('Business Capability 1')).toBeInTheDocument();
        expect(queryByTestId('Business Capability 1.1')).not.toBeInTheDocument();
        expect(queryByTestId('Business Capability 1.1.2')).not.toBeInTheDocument();
    });
    it('renders first child item when parent is clicked', async () => {
        const {queryByTestId} = render(<List {...defaultProps} />);
        queryByTestId('Business Capability 1')?.click();
        expect(queryByTestId('Business Capability 1')).toBeInTheDocument();
        expect(queryByTestId('Business Capability 1.1')).toBeInTheDocument();
        expect(queryByTestId('Business Capability 1.1.2')).not.toBeInTheDocument();
    });
    it('renders last child item when child is clicked', async () => {
        const {getByTestId, queryByTestId} = render(<List {...defaultProps} />);
        queryByTestId('Business Capability 1')?.click();
        queryByTestId('Business Capability 1.1')?.click();
        expect(queryByTestId('Business Capability 1')).toBeInTheDocument();
        expect(queryByTestId('Business Capability 1.1')).toBeInTheDocument();
        expect(queryByTestId('Business Capability 1.1.2')).toBeInTheDocument();
    });
    it('collapses navigation for each open child when clicked', async () => {
        const {getByTestId, queryByTestId} = render(<List {...defaultProps} />);
        queryByTestId('Business Capability 1')?.click();
        queryByTestId('Business Capability 1.1')?.click();
        expect(queryByTestId('Business Capability 1')).toBeInTheDocument();
        expect(queryByTestId('Business Capability 1.1')).toBeInTheDocument();
        expect(queryByTestId('Business Capability 1.1.2')).toBeInTheDocument();
        queryByTestId('Business Capability 1.1')?.click();
        expect(queryByTestId('Business Capability 1.1.2')).not.toBeInTheDocument();
        queryByTestId('Business Capability 1')?.click();
        expect(queryByTestId('Business Capability 1.1')).not.toBeInTheDocument();
        expect(queryByTestId('Business Capability 1')).toBeInTheDocument();
    });
});