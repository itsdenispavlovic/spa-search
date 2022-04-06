import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const useSearchItems = () => {
    const [search, setSearch] = useState('');

    const defaultValues = ['A', 'B', 'C', 'D', 'E'];

    const [results, setResults] = useState<string[]>(defaultValues);
    const [apiResults, setApiResults] = useState<any[]>([]);

    const removeDuplicatesFunc = (arr: string[]): string[] => {
        return arr.filter((item, index) => arr.indexOf(item) === index);
    }

    const processData = useCallback((results: any, getItems = 5): string[] => {
        if(results) {
            const unsorted: string[] = results.map((item: any, idx: any) => item?.collectionName);
            const removeDuplicates: string[] = removeDuplicatesFunc(unsorted);

            const sortedList: string[] = removeDuplicates.sort();
            return sortedList.slice(0, getItems);
        } else {
            return [];
        }
    }, []);

    const onSearch = useCallback((event: any) => {
        setSearch(event.target.value);

        const currentValue = event.target.value;

        if(currentValue.length > 3) {
            axios.get(`https://itunes.apple.com/search?term=${currentValue}.`)
                .then(response => {
                    const results = response?.data?.results;

                    const collectionNames = processData(results);

                    let myArrayResults = [...collectionNames];

                    if(myArrayResults.length > 0) {
                        setApiResults(myArrayResults);
                    }
                });
        }
    }, [processData]);

    useEffect(() => {
        const intervalFirstId = setInterval(() => {
            if(apiResults.length > 0) {
                const firstElement = apiResults[0];
                setResults([...results, firstElement]);
                const newElements = apiResults.slice(1);
                setApiResults(newElements);
            }
        }, 1000);

        return () => clearInterval(intervalFirstId);
    }, [apiResults, results]);

    const handleResultItems = useCallback(() => {
        let myRes: any = [...results];

        myRes.push(myRes.shift());

        setResults(myRes);
    }, [results]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleResultItems();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [handleResultItems]);

    return {
        search,
        onSearch,
        results
    }
}