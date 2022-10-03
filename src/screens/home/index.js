import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-virtualized-view';
import BackToTop from '../../component/BackToTop'
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage'

function Home({ navigation }) {
  const { setDataBlog } = usePage()
  const [position, setPosition] = useState()

  const [test, setTest] = useState([])
  const [loading, setLoading] = useState()
  const [pageCurrent, setPageCurrent] = useState(1)
  let body = JSON.stringify({
    "mod": "get_news_home",
    "page": pageCurrent,
  });

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'post',
      url: 'https://hungtan.demobcb.work/api/',
      data: body
    })
      .then((res) => {
        setTest(res?.data.data)
        setLoading(false)
        console.error('page', pageCurrent)

      })

  }, [pageCurrent])

  // loading
  const renderFooter = () => {
    return (loading &&
      <ActivityIndicator size='large' /> 
    )
  }
  // loadmore
  const handleLoadMore = () => {
    setPageCurrent(pageCurrent + 1)
    setLoading(true)
  }
  // const scrollTop = () => {
  //   setPosition((e) => e = 0)
  //   console.error(position)
  // }
  return (
    <>
      <ScrollView style={styles.container} onScroll={(event) => setPosition(event.nativeEvent.contentOffset.y)} >
        <FlatList
          data={test}
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
          listKey="listnewsss"
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndThreshold={0}
        />

        {/* <Panigation /> */}
      </ScrollView>
      {/* <TouchableOpacity style={styles.scrollTopButton} onPress={scrollTop}>
        <AntDesign name="upcircle" size={44} color={COLORS.primary} />
      </TouchableOpacity> */}
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
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
  scrollTopButton: {
    position: 'absolute',
    bottom: 60,
    right: 10
  },
});