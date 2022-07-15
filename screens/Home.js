import React, { useState } from 'react'
import { StyleSheet, Animated, Text, ScrollView, View, TextInput, SafeAreaView, useWindowDimensions, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import CategoryBubble from '../components/CategoryBubble';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import MovieSlider from '../components/MoviesSlider';

export default function Home( Navigation ){

    const moveValue = useState(new Animated.Value(0))[0]
    const opacityValue = useState(new Animated.Value(1))[0]

    const [search, setSearch] = useState('');
    const [poster, setPoster] = useState([]);
    const [link, setLink] = useState('');


    const windowHeight = useWindowDimensions().height;
    const searchIcon = <Icon name='search-outline' size={30} color='white'/>

    const moveSearch = () => {
        Animated.timing(moveValue, {
            toValue: -250,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    const hideCategories = () => {
        Animated.timing(opacityValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    const getLink = async (link) => {
        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                pageLink: link 
            })
        };

        const response = await fetch('https://lavvr.pythonanywhere.com/megaplex', params)
        const data = response.json()
        setLink(data)
    }

    const getMovies = async () => {
        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                'request': 'Get.Posters',
                'search': search
            })
        };

        const response = await fetch('https://lavvr.pythonanywhere.com/megaplex', params)
        const data = response.json()
        setPoster(data.map((info => ({...info.data(), id: info.id}))))
    }

    return(
        <KeyboardAvoidingWrapper>
            <SafeAreaView style={{
                minHeight: Math.round(windowHeight) - 59,
            }}>
                <View style={styles.pageContainer}>
                    <View style={styles.searchContainer}>
                        <Animated.View style={{
                                backgroundColor: 'black',
                                height: '30%',
                                marginHorizontal: '10%',
                                borderRadius: 50,
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                flexDirection: 'row',
                                transform: [{translateY:
                                    moveValue}]
                        }}>
                            {searchIcon}
                            <TextInput  
                                style={styles.searchStyle} 
                                placeholder='Search Movies and TV' 
                                selectionColor='#ffd500' 
                                color='white' 
                                onFocus={() => {
                                    moveSearch();
                                    hideCategories();
                                }}
                                placeholderTextColor={'white'} 
                                onChangeText={text => setSearch(text)}
                                onSubmitEditing={getMovies}
                            />
                        </Animated.View>
                        <Animated.Text style={{textAlign: 'center', marginTop: '5%', color: 'white', opacity: opacityValue}}>Why Not Try...</Animated.Text>
                        <Animated.View style={{
                            height: '35%',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            opacity: opacityValue
                        }}>
                            <CategoryBubble title='Comedy' />
                            <CategoryBubble title='Animation' />
                            <CategoryBubble title='Zombies' />
                        </Animated.View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        height: '86%',
                        width: '100%',
                        top: 100,
                        zIndex: -5
                    }}>
                        <ScrollView 
                            showVerticalScrollIndicator={false} 
                            style={styles.scrollView} 
                            contentContainerStyle={{alignItems: 'center', flexGrow: 1, paddingBottom: 300}}
                        >
                            {poster.map((item, index) => {
                                return(
                                    <TouchableOpacity style={styles.posterContainer} onPress={getLink(poster.link)}>
                                        <Image style={{
                                            height: '100%',
                                            width: '100%'
                                            }} 
                                            source={poster.poster} 
                                            resizeMethod='resize' 
                                            resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingWrapper>
    );
}

const styles = StyleSheet.create({
    posterContainer: {
        borderWidth: 1,
        borderColor: 'blue',
        height: '30%',
        width: '30%',
        marginHorizontal: '1%',
        marginVertical: '5%'
    },
    pageContainer: {
        backgroundColor: '#070a0d',
        height: '100%',
        justifyContent: 'center',
    },
    searchContainer: {
        height: '30%',
        justifyContent: 'center'
    },
    searchStyle: {
        marginRight: 5,
        width: '75%' ,
        height: '90%',
        fontSize: 18
    },
})