import React, { useState } from 'react'
import { StyleSheet, Animated, Text, ScrollView, View, TextInput, SafeAreaView, useWindowDimensions, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import CategoryBubble from '../components/CategoryBubble';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import MovieSlider from '../components/MoviesSlider';
import Movies from '../movies.json';

export default function Home({ navigation }){

    const [search, setSearch] = useState(''); 
    const [filteredDataSource, setFilteredDataSource] = useState(Movies);
    const [masterDataSource, setMasterDataSource] = useState(Movies);
 
     const searchIcon = <Icon name='search-outline' size={30} color='white'/>
 
     const searchFilteredFunction = (text) => {
        if(text) {
            const newData = masterDataSource.filter(function(item){
                const itemData = item.MovieTitle
                ? item.MovieTitle.toUpperCase()
                : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        }else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
     };

     const ItemView = ({ item }) => {
        return(
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => 
                navigation.navigate('WebView', {
                    videoLink: item.PageLink,
                })
            }>
                <ImageBackground style={{
                    height: 200,
                    width: 100,
                    marginHorizontal: 15
                    }} 
                    source={{uri: item.MoviePoster}} 
                    resizeMethod='resize' 
                    resizeMode='contain'
                >   
                    <Text numberOfLines={1} style={{color: 'white', width: '100%'}}>{item.MovieTitle}</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
     }

     const ItemSeparatorView = () => {
        return(
            <View 
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: 'white',
                }} 
            />
        );
     }

    return(
            <SafeAreaView>
                <View style={styles.pageContainer}>
                    <View style={styles.searchContainer}>
                        <View style={{
                                backgroundColor: 'black',
                                height: '100%',
                                borderRadius: 50,
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                flexDirection: 'row',
                        }}>
                            {searchIcon}
                            <TextInput  
                                style={styles.searchStyle} 
                                placeholder='Search Movies' 
                                selectionColor='#ffd500' 
                                color='white'
                                placeholderTextColor={'white'} 
                                value={search}
                                onChangeText={text => searchFilteredFunction(text)}
                            />
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        height: '86%',
                        width: '100%',
                        bottom: 10,
                    }}>
                        <FlatList
                            numColumns={3}
                            keyExtractor={(item) => item.PageLink}
                            data={filteredDataSource}
                            renderItem={ItemView}
                            ItemSeparatorComponent={ItemSeparatorView}
                        />
                    </View>
                </View>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    posterContainer: {
        borderWidth: 1,
        borderColor: 'blue',
        height: '10%',
        width: '30%',
        marginHorizontal: '1%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pageContainer: {
        backgroundColor: '#070a0d',
        height: '100%',
        justifyContent: 'center',
    },
    searchContainer: {
        height: '10%',
        width: '90%',
        justifyContent: 'center',
        position:'absolute',
        top: 10,
        alignSelf: 'center'
    },
    searchStyle: {
        marginRight: 5,
        width: '75%' ,
        height: '90%',
        fontSize: 18
    },
})