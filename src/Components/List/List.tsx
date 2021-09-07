import React, {useCallback, useState} from "react";
import {NavigationData} from "../../App";

interface ListProps {
    selectedfilter: string[];
    item: NavigationData;
    setSelectedFilter(filters: string[]): void;
}

const List: React.FC<ListProps> = (props: ListProps) => {
    const [showChildren, setShowChildren] = useState<boolean>(false);
    const handleClick = useCallback(() => {
        setShowChildren(!showChildren);
        let selectedFilteredList = props.selectedfilter;

        if (props.selectedfilter.includes(props.item.title)) {
            const index = selectedFilteredList.indexOf(props.item.title);
            if (index > -1) {
                selectedFilteredList.splice(index, 1);
                return props.setSelectedFilter([...selectedFilteredList]);
            }
        }
        props.setSelectedFilter([...selectedFilteredList, props.item.title]);
    }, [showChildren, setShowChildren]);
    return (
        <div>
      <span style={{
          cursor: 'pointer',
      }} onClick={handleClick}>
        <h4 style={{fontWeight: showChildren ? 'bold' : 'normal'}}>{props.item.title}</h4>
      </span>
            <div style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                left: 25,
                borderLeft: '1px solid',
                paddingLeft: 15
            }}>
                {showChildren && (props.item.children ?? []).map((node: any) =>
                    <List selectedfilter={props.selectedfilter} setSelectedFilter={props.setSelectedFilter}
                          item={node}/>)}
            </div>
        </div>
    )
}

export default List;