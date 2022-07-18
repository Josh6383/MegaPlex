import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';


export default function VideoWebView({ route, navigation }) {


    const [pageWidth, setPageWidth] = useState({width: '0%'})
    const [pageHeight, setPageHeight] = useState({height: '0%'})

    const { videoLink, headerTitle } = route.params;
    
    const jsCode =
        `setTimeout(function(){
            const element = document.querySelector('.embed-responsive-item').getAttribute('src'); 
            location.href = element;
            setTimeout(function(){window.ReactNativeWebView.postMessage('Data from webview');})
        }, 5000);
        true;`

    const message = (data) => {
        setPageHeight({height: '100%'})
        setPageWidth({width: '100%'})
    }

    useEffect(() => {

        navigation.setOptions({ title: headerTitle })

    }, [])

    return(
        <WebView
            style={{width: pageWidth.width, height: pageHeight.height, backgroundColor: 'white'}}
            source={{uri: videoLink}}
            javaScriptEnabled={true}
            injectedJavaScript={jsCode}
            allowsFullscreenVideo={true}
            onMessage={message}
        />
    );
}