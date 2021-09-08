import {Data} from "../shared/types/Data";
import {unique} from "./arrayHelpers";
import {NavigationData} from "../shared/types/NavigationData";
import {Dictionary} from "../shared/types/Dictionary";

export function convertToTreeStructure<T extends Data, U extends NavigationData>(data: T[]): Dictionary<U> {
    return data.reduce((acc, curr: T) => {
        if (!acc[curr.BCAP1]) {
            const getChildren = (bcap2title: string) =>
                data
                    .filter((data: T) => data.BCAP1 === curr.BCAP1 && bcap2title === data.BCAP2)
                    .map((filteredData: Data) => filteredData.BCAP3)
                    .filter(unique)
                    .sort()
                    .map((bcapTitle: string) => ({title: bcapTitle}));
            const sortedBCAP2 = data
                .filter((data: Data) => data.BCAP1 === curr.BCAP1)
                .map((filteredData: Data) => filteredData.BCAP2)
                .filter(unique)
                .sort()
                .map((bcapTitle: string) => ({title: bcapTitle, children: getChildren(bcapTitle)}));

            acc = {
                ...acc,
                [curr.BCAP1]: {title: curr.BCAP1, children: sortedBCAP2}
            } as Dictionary<U>;
        }
        return acc;
    }, {} as Dictionary<U>);
}