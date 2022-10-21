import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, RefreshControl, ScrollView, LogBox, BackHandler } from 'react-native'
import { WebView } from 'react-native-webview';
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage';

function Event() {
    const { setIsEvent } = usePage()
    const [refreshing, setRefreshing] = useState(false);
    const [onWebviewScroll, setOnWebviewScroll] = useState(true);
    const [onLoading, setOnLoading] = useState(false)

    const webViewRef = useRef(null);
    const listNews = useRef(null)
    console.log(listNews)
    LogBox.ignoreAllLogs()

    useEffect(() => {
        const backAction = () => {
            if (webViewRef.current?.startUrl == 'https://hungtan-hungnguyen.nghean.gov.vn/chuong-trinh-ocop/') {
                BackHandler.exitApp();
            }
            webViewRef.current?.goBack()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        webViewRef.current?.reload()
        setRefreshing(false)
    }, []);

    const onPressRetry = () => {
        webViewRef.current?.reload()
    }
    const scrollTop = () => {
        webViewRef.current.injectJavaScript(`
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      })
    `);
    }
    const uri = 'https://hungtan-hungnguyen.nghean.gov.vn/chuong-trinh-ocop/'

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    setIsEvent(false)
                }}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black4} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>Chương trình OCOP</Text>
            </View>
            <ScrollView
                ref={listNews}
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        enabled={Platform.OS === "ios" ? true : onWebviewScroll} />
                }>
                <WebView
                    ref={webViewRef}
                    source={{ uri: uri }}
                    originWhitelist={['*']}
                    onLoadStart={() => { setOnLoading(true) }}
                    onLoadEnd={() => { setOnLoading(false) }}
                    renderError={(error, code, desc) =>
                        <View style={styles.error}>
                            <Text style={styles.error_title}>Đã xảy ra lỗi!</Text>
                            <Text style={styles.error_content}>Không thể kết nối đến máy chủ!</Text>
                            <TouchableOpacity
                                style={styles.button_retry}
                                onPress={onPressRetry}>
                                <Text style={styles.button_retry_text}>Thử lại</Text>
                            </TouchableOpacity>
                        </View>} />
                {onLoading &&
                    <View style={styles.loading_container}>
                        <View style={styles.loading_middle}>
                            <ActivityIndicator size={'small'} animating={true} color="#000" style={styles.loading} />
                        </View>
                    </View>
                }
            </ScrollView>
            <TouchableOpacity style={styles.scrollTopButton} onPress={scrollTop}>
                <AntDesign name="upcircle" size={36} color={COLORS.primary} />
            </TouchableOpacity>
        </>
    )
}

export default Event

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16
    },
    container: {
        flex: 1, 
        height:'100%'
    },
    scrollTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 10
    },
});