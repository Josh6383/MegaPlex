import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function MovieSlider(props, { Navigation }){

    //OnPress brings up page with more info on the movie
    const moreInfo = () => {
        
    }

    return(
        <View style={styles.pageContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>kkk</Text>
            </View>
            <ScrollView 
            showsHorizontalScrollIndicator={false} 
            style={styles.scrollView} 
            contentContainerStyle={{flexGrow: 1, alignItems: "center"}}>
            {props.poster.map((posters, index) => {
            return(
                <TouchableOpacity style={{width: 100, marginHorizontal: 5}}>
                    <Image style={styles.moviePoster} source={{uri: posters.url}} resizeMethod='resize' resizeMode='contain' />
                </TouchableOpacity>
                );
            })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        borderWidth:5,
        borderColor: 'red'
    },
    scrollView: {
        height: '100%',
    },
    titleContainer: {
        width: '40%',
        height: '20%',
        justifyContent: 'flex-start',
    },
    title: {
        marginLeft: '5%',
        color: 'white',
        fontSize: 35
    },
    posterContainer: {
        flexGrow: 1,
        width: '100%',
        height: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    scrollContainer: {
        height: '80%',
        width: '100%',
        overflow: 'hidden',
    },
    posterContainer: {
        width: '30%',
        height: '90%',
        marginHorizontal: '1%'
    },
    moviePoster: {
        height: '100%',
        width: '100%',
    },
})