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

const List: React.FC<ListProps> = (props: ListProps) => {
    console.log('rendering', props.id);
    const [showChildren, setShowChildren] = useState<boolean>(false);
    const handleClick = useCallback((e) => {
        // e.stopPropagation();
        setShowChildren(!showChildren);
        let selectedFilteredList = props.selectedFilter;

        if (props.selectedFilter.includes(props.item.title)) {
            const index = selectedFilteredList.indexOf(props.item.title);
            if (index > -1) {
                selectedFilteredList.splice(index, 1);
                return props.setSelectedFilter([...selectedFilteredList]);
            }
        }
        props.setSelectedFilter([...selectedFilteredList, props.item.title]);
    }, [showChildren, setShowChildren]);
    // generate real GUID for better reconciliation process
    let guid = 1;
    return (
        <div key={props.id}>
      <span
          data-testid={props.item.title}
          className={css(styles.titleContainer)} onClick={handleClick}>
        <h4 className={showChildren ? css(styles.activeChild) : css(styles.nonActiveChild)}>{props.item.title}</h4>
      </span>
            <div key={props.id} className={css(styles.listChildren)}>
                {showChildren && (props.item.children ?? []).map((navItem: NavigationData) =>
                    <List selectedFilter={props.selectedFilter} setSelectedFilter={props.setSelectedFilter}
                          item={navItem} id={`${navItem.title}-${++guid}`}
                    />)}
            </div>
        </div>
    )
}

export default List;