import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CategoryBubble(props){
    return(
        <TouchableOpacity style={styles.bubbleContainer}>
            <View style={styles.bubble}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    bubbleContainer: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
    },
    bubble: {
        borderRadius: 25,
        height: '70%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'black',
        elevation: 2,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14
    }
})