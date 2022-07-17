import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';


export default function VideoWebView({ route, navigation }) {


    const [pageWidth, setPageWidth] = useState({width: '0%'})
    const [pageHeight, setPageHeight] = useState({height: '0%'})

    const { videoLink } = route.params;
    
    const jsCode =
        `setTimeout(function(){
            const element = document.querySelector('.embed-responsive-item').getAttribute('src'); 
            location.href = element
            window.ReactNativeWebView.postMessage('Data from webview');
        }, 5000);
        true;`

    const message = (data) => {
        setPageHeight({height: '100%'})
        setPageWidth({width: '100%'})
    }

    return(
        <View>
            <View style={{height: pageHeight.height, width: pageWidth.width, backgroundColor: 'black'}}>
                <WebView
                    source={{uri: videoLink}}
                    javaScriptEnabled={true}
                    injectedJavaScript={jsCode}
                    allowsFullscreenVideo={true}
                    onMessage={message}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    initialStyle: {
        width: '0%',
        height: '0%',
        backgroundColor: 'black'
    },
    redirectStyle: {
        width: '100%',
        height: '100%'
    }
})