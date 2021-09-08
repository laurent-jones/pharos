import {css} from "aphrodite/no-important";
import React from "react";
import {Data} from "../../shared/types/Data";
import styles from './ApplicationData.styles';

interface ApplicationDataProps {
    filteredData: Data[];
    selectedFilter: string[];
    currentSpend: number;
}

const ApplicationData = ({filteredData, selectedFilter, currentSpend}: ApplicationDataProps) => {
    return (<>
        {filteredData.filter(({BCAP1, BCAP2, BCAP3, spend}: Data) => {
            const result = [BCAP1, BCAP2, BCAP3] as string[];
            const hasNoFilterAndWithinCurrentSpend = (selectedFilter.length === 0 && currentSpend >= spend);
            const isIncludedInFilterAndwithinCurrentSpend = currentSpend >= spend && (selectedFilter).every((item: string) => result.includes(item));
            return hasNoFilterAndWithinCurrentSpend || isIncludedInFilterAndwithinCurrentSpend
        }).map(({id, name, BCAP1, BCAP2, BCAP3, spend}: Data) =>
            <div data-testid={id} key={id} className={css(styles.filteredData)}>
                <span>{name}</span>
                {/* Left these in to help show filtering on UI */}
                <span>{BCAP1}</span>
                <span>{BCAP2}</span>
                <span>{BCAP3}</span>
                <span>Total spend: ${spend}</span>
            </div>)
        }
    </>)
};

export default ApplicationData;