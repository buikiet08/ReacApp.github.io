import { SearchBar } from '@rneui/themed';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, StyleSheet, TouchableOpacity, View,Text, FlatList } from 'react-native';
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage';

function Search({ navigation}) {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [result, setResult] = useState(false)
    const {setDataBlog} = usePage()

    useEffect(() => {
        getData(search)
        onLoadMore({search,page})
    }, [page])
    const getData = async () => {
        const axios = require('axios')
        let value = JSON.stringify({
            "mod": "search",
            "keyword": search,
            "page": page
        });
        const config = {
            method: 'post',
            url: 'https://hungtan.demobcb.work/api/',
            data: value
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                setData(response.data?.data)
            })
            .catch(function (error) {
                setLoading(false)
                console.error(error)
            });
    }
    const onLoadMore = async () => {
        let axios = require('axios')
        let value = JSON.stringify({
            "mod": "search",
            "keyword": search,
            "page": page + 1
        });
        const config = {
            method: 'post',
            url: 'https://hungtan.demobcb.work/api/',
            data: value
        }
        await axios(config)
            .then(function (response) {
                setLoading(false)
                setData([...data, ...response.data?.data])
                setPage(...page, ...page + 1)
            })
            .catch(function (error) {
                setLoading(false)
                console.error(error)
            });
    }
    // loading
    const renderFooter = () => {
        return (loading ?
            <ActivityIndicator size='large' animating={true} /> : <Text style={{ color: COLORS.gray, textAlign: 'center', width: '100%', marginBottom: 30 }}>Không tìm thấy dữ liệu</Text>
        )
    }
    const handleSubmit = (value) => {
        setSearch(value)
        getData()
        setResult(true)
    }
    // --------------------------
    const onChange = (text) => {
        setSearch(text)
        setResult(false)
        setData(null)
    }

    const SearchPage = () => {
        return (
            <View style={{
                flex: 1,
                paddingVertical: 20,
                paddingHorizontal: 16
            }}>
                {search !== '' && <Text style={{ marginBottom: 10, }}>Kết quả tìm kiếm có ({data ? data.length : 0}) tin tức</Text>}
                {search !== '' &&
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) =>
                            <View style={styles.blogItem} key={item.id}>
                                <View style={styles.blogImage}>
                                    <Image source={{ uri: `${item.homeimgfile ? item.homeimgfile : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'}` }} style={{ width: '100%', height: 90 }} resizeMethod='resize' />
                                </View>
                                <TouchableOpacity style={styles.blogContent} onPress={() => {
                                    navigation.navigate('Detail')
                                    setDataBlog(item)
                                }}>
                                    <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                                    <Text style={styles.time}>{item.publtime}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => item.id}
                        listKey="search"
                        ListFooterComponent={renderFooter}
                        onEndReached={onLoadMore}
                        onEndReachedThreshold={0}
                    />
                }
            </View>
        )
    }
    return (
        <>
        <View style={styles.header}>
            <ImageBackground source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/008/141/217/small/panoramic-abstract-web-background-blue-gradient-vector.jpg' }}
                style={styles.background}>
                <View style={{ flex: 1 }}>
                    <SearchBar
                        containerStyle={{
                            backgroundColor: COLORS.white,
                            height: 48,
                            borderRadius: 30,
                            padding: 0,
                            overflow: 'hidden',
                        }}
                        inputContainerStyle={{ backgroundColor: 'white', borderRadius: 30, marginTop: -1 }}
                        inputStyle={{ borderColor: COLORS.white }}
                        showCancel={true}
                        placeholder="Tìm kiếm..."
                        value={search}
                        onChangeText={text => onChange(text)}
                        onSubmitEditing={handleSubmit}
                    />

                </View>
                <TouchableOpacity activeOpacity={0.6} style={{ marginLeft: 8 }} onPress={() => {
                    navigation.navigate('BottomTab')
                    setData([])
                    setPage(1)
                }}>
                    {/* <AntDesign name="close" size={24} color={COLORS.white} /> */}
                    <Text style={{ color: COLORS.white,fontWeight: 'bold',fontSize: 16 }}>Đóng</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
        {result && loading ? <ActivityIndicator size='small' animating={true} /> : <SearchPage />
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 80,
    },
    calender: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    calenderIcon: {
        width: 24,
        height: 24,
    },
    calenderText: {
        color: COLORS.white,
        fontSize: 16,
        marginLeft: 4
    },
    searchBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: "center",
    },
    background: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: null,
        height: null,
        paddingHorizontal: 16,
        paddingTop: 20
    },
    search: {
        marginRight: 16
    },
    modadAuth: {
    },
    btnLogin: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        overflow: 'hidden',
        color: COLORS.white,
        marginBottom: 20
    },
    btnRegister: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        overflow: 'hidden',
        color: COLORS.white,

    },
    blogItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        borderBottomStyle: 'solid'
    },
    blogImage: {
        width: '30%',
        borderRadius: 4,
        overflow: 'hidden',
    },
    blogContent: {
        paddingLeft: 8,
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 90
    },
    title: {
        fontSize: 17,
        lineHeight: 24,
        flex: 1
    },
    time: {
        color: COLORS.gray2,
    },
});
export default Search