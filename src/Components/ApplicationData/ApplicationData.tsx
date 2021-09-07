import {css} from "aphrodite/no-important";
import styles from "../../App.styles";
import React from "react";
import {Data} from "../../App";

interface ApplicationDataProps {
    filteredData: Data[];
    selectedFilter: string[];
    currentSpend: number;
}

const ApplicationData = ({filteredData, selectedFilter, currentSpend}: ApplicationDataProps) => {
    return (<>
        {filteredData.filter(({BCAP1, BCAP2, BCAP3, spend}: Data) => {
            const result = [BCAP1, BCAP2, BCAP3] as string[];
            return (selectedFilter.length === 0 && currentSpend >= spend) || currentSpend >= spend && (selectedFilter).every((item: string) => result.includes(item))
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

export default ApplicationData