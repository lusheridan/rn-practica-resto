import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from './components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from './components/ResultsList';

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();
    
    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price;
        });
    };

    return (
        <>
            <SearchBar 
            term={term} 
            onTermChange={setTerm}
            onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text> {errorMessage} </Text> : null}
            {/* <Text style={styles.textResult}> We have found {results.length} results </Text> */}
            <ScrollView>
                <ResultsList results={filterResultsByPrice('$')}title="Cost Effective"/>
                <ResultsList results={filterResultsByPrice('$$')}title="Bit Pricier"/>
                <ResultsList results={filterResultsByPrice('$$$')}title="Big Spender"/>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    textResult: {
        marginLeft: 10,
        fontSize: 20,
    }
});

export default SearchScreen;