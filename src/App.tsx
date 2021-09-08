import React, {useEffect, useState} from "react";
import styles from './App.styles';
import {css} from 'aphrodite/no-important';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import List from "./Components/List/List";
import ApplicationData from "./Components/ApplicationData/ApplicationData";
import {unique} from "./utils/arrayHelpers";
import {Data} from "./shared/types/Data";
import {sortByProperty} from "./utils/sortingHelpers";
import {convertToTreeStructure} from "./utils/dataStructureHelpers";

export type Dictionary<T> = Partial<{ [key: string]: T }>;

// Use recursive type for children
export interface NavigationData {
    title: string;
    children?: [NavigationData],
}

function App() {
    const [navigationData, setNavigationData] = useState<NavigationData[]>([]);
    const [filteredData, setFilteredData] = useState<Data[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
    const [maxSpend, setMaxSpend] = useState<number>(0);
    const [minSpend, setMinSpend] = useState<number>(0);
    const [currentSpend, setCurrentSpend] = useState<number>(0);

    const handleSliderChange = (val: number) => {
        if (val === 100) {
            return setCurrentSpend(maxSpend)
        }
        if (val === 0) {
            return setCurrentSpend(minSpend)
        }
        return setCurrentSpend(maxSpend * Number(`0.${val}`))
    }

    useEffect(() => {
        fetch('/data').then(res => {
            res.json().then((response: Data[]) => {
                    const navigationTree: Dictionary<NavigationData> = convertToTreeStructure(response);
                    setMaxSpend(Math.max.apply(Math, response.map((data: Data) => {
                        return data.spend;
                    })));
                    setMinSpend(Math.min.apply(Math, response.map((data: Data) =>  {
                        return data.spend;
                    })));
                    setCurrentSpend(Math.max.apply(Math, response.map((data: Data) =>  {
                        return data.spend;
                    })));
                    const navigationValues = Object.values(navigationTree) as NavigationData[];
                    setNavigationData(navigationValues.sort((a, b) => sortByProperty(a.title, b.title)));
                    setFilteredData(response);
                }
            );
        }).catch((err) => {
            // use a logger here to send to a logging system e.g. Kibana, New Relic
            console.error('Failed to fetch err', {err});
        })
    }, []);

    return (
        <div>
            <h1>Pharos Coding Exercise</h1>
            <div className={css(styles.container)}>
                <div className={css(styles.left)}>
                    <h2>Navigation</h2>
                    {navigationData.map((navItem: NavigationData, idx: number) =>
                        <div key={navItem.title}>
                            <List
                                id={`${navItem.title}- ${idx.toString()}`}
                                item={navItem}
                                selectedFilter={selectedFilter}
                                setSelectedFilter={setSelectedFilter}/>
                        </div>
                    )}
                    <h2>Filters</h2>
                    <span>spending</span>
                    <div className={css(styles.slider)}>
                        <Slider
                            onChange={handleSliderChange}
                            min={0}
                            defaultValue={100}
                            marks={{
                                0: minSpend,
                                25: maxSpend * 0.25,
                                50: maxSpend / 2,
                                75: maxSpend * 0.75,
                                100: maxSpend
                            }} step={null}/>
                    </div>
                </div>
                <div className={css(styles.sideBar)}>
                    {/* Add Pagination component / state to only load e.g 10 records at a time for performance */}
                    <ApplicationData
                        filteredData={filteredData}
                        selectedFilter={selectedFilter}
                        currentSpend={currentSpend}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
