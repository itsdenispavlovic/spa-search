import React from 'react';
import {Box, TextField} from "@mui/material";
import {SearchItemProps} from "./types";
import {useSearchItems} from "./hooks";

const SearchItems = () => {

    const {
        search,
        onSearch,
        results
    } = useSearchItems();

    return (
        <Box
            display="flex"
            flexDirection='column'
            maxWidth={{ md: 500 }}
            flex={{ md: 1 }}
        >
            <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Search Band"
                value={search}
                onChange={onSearch}
            />
            <Box
                mt={2}
                border={'1px solid #000'}
                padding={2}
                pb={4}
                borderRadius={3}
                bgcolor={'#333'}
            >
                {results.map((item, idx) => <SearchItem key={idx} idx={idx} value={item}/>)}
            </Box>
        </Box>
    )
}

const SearchItem = ({ idx, value }: SearchItemProps) => {
    return (
        <Box
            mt={2}
            border={'1px solid #000'}
            padding={2}
            bgcolor={'#fff'}
            borderRadius={3}
        >
            {value}
        </Box>
    )
}

export default SearchItems;