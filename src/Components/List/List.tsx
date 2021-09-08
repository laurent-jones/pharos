import React, {useCallback, useState} from "react";
import {css} from "aphrodite/no-important";
import styles from './List.styles';
import {NavigationData} from "../../shared/types/NavigationData";

interface ListProps {
    id: string;
    selectedFilter: string[];
    item: NavigationData;
    setSelectedFilter(filters: string[]): void;
}

const List = ({id, selectedFilter, item, setSelectedFilter}: ListProps) => {
    const [showChildren, setShowChildren] = useState<boolean>(false);
    const handleClick = useCallback((e) => {
        setShowChildren(!showChildren);
        let selectedFilteredList = selectedFilter;

        if (selectedFilter.includes(item.title)) {
            const index = selectedFilteredList.indexOf(item.title);
            if (index > -1) {
                selectedFilteredList.splice(index, 1);
                return setSelectedFilter([...selectedFilteredList]);
            }
        }
        setSelectedFilter([...selectedFilteredList, item.title]);
    }, [showChildren, setShowChildren]);
    // generate real GUID for better reconciliation process
    let guid = 1;
    return (
        <div key={id}>
      <span
          data-testid={item.title}
          className={css(styles.titleContainer)} onClick={handleClick}>
        <h4 className={showChildren ? css(styles.activeChild) : css(styles.nonActiveChild)}>{item.title}</h4>
      </span>
            <div key={id} className={css(styles.listChildren)}>
                {showChildren && (item.children ?? []).map((navItem: NavigationData) =>
                    <List selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}
                          item={navItem} id={`${navItem.title}-${++guid}`}
                    />)}
            </div>
        </div>
    )
}

export default List;