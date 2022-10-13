import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import url from '../../config/api';
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage';

function Info({ navigation }) {
    const {  watch, control, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            full_name: '',
        }
    });
    const [loading, setLoading] = useState(false)
    // const [date, setDate] = useState();
    const { user, setUser } = usePage()
    const [value, setValue] = useState('')
    const handleChange = (text) => {
        setValue(text)
    }
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = (data) => {
        console.error(data,'vào')

        // let token = await AsyncStorage.getItem('token');

        // try {
        //     let axios = require('axios')
        //     let body = JSON.stringify({
        //         "mod": "api_register_user",
        //         "full_name": data.full_name,
        //     });
        //     const config = {
        //         method: 'post',
        //         url: `${url}users/register/`,
        //         data: body
        //     }
        //     await axios(config)
        //         .then(function (response) {
        //             setLoading(true)
        //             console.log(response.data, 'vào')
        //             if (response.data) {
        //                 let body = JSON.stringify({
        //                     "mod": "get_info_user"
        //                 })
        //                 const config = {
        //                     method: 'post',
        //                     url: `${url}users/register/`,
        //                     headers: {
        //                         Authorization: `bearer ${token}`
        //                     },
        //                     data: body
        //                 }
        //                 if (token) {
        //                     return axios(config)
        //                         .then(function (res) {
        //                             const user = AsyncStorage.getItem('user', JSON.stringify(res.data))
        //                             if (user) {
        //                                 setUser(res.data)
        //                             }
        //                         })
        //                         .catch(function (error) {
        //                             console.error(error)
        //                         });
        //                 }
        //             }
        //             setErrorMessage(response.data)
        //         })
        //         .catch(function (error) {
        //             setLoading(false)
        //             setErrorMessage(error.data.message)
        //         });
        // }
        // catch (error) {
        //     console.error(error.message)
        //     setErrorMessage(error.message)
        // }
        // finally {
        //     setLoading(false)
        // }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Thông tin tài khoản</Text>
                <View style={{ width: 24 }}></View>
            </View>
            <View style={styles.content}>
                <View style={styles.formInput}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            minLength: 8
                        }}

                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.formItem}>
                                <Text style={{ width: 100, fontWeight: 'bold' }}>Họ và tên :</Text>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    type="text"
                                    defaultValue={user?.data?.first_name}
                                    placeholderTextColor={"#fff"}
                                />
                            </View>
                        )}
                        name="full_name"
                    />
                    {Object.keys(errors).length !== 0 &&
                        <Text style={styles.error}>
                            {errors.full_name?.type === 'required' && 'Họ và tên không được để trống'}
                            {errors.full_name?.type === 'minLength' && 'Vui lòng nhập tối thiểu 8 kí tự'}
                        </Text>
                    }
                </View>
                {/* <View style={styles.formInput}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            minLength: 10,
                            partent: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
                        }}

                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.formItem}>
                                <Text style={{ width: 100, fontWeight: 'bold' }}>Số điện thoại :</Text>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Số điện thoại'
                                    keyboardType="numeric"
                                    placeholderTextColor={COLORS.gray}
                                />
                            </View>
                        )}
                        name="phone"
                    />
                    {Object.keys(errors).length !== 0 &&
                        <Text style={styles.error}>
                            {errors.phone?.type === 'required' && 'Số điện thoại không được để trống'}
                            {errors.phone?.type === 'minLength' && 'Vui lòng nhập tối thiểu 10 số'}
                            {errors.phone?.type === 'partent' && 'Số điện thoại chưa đúng định dạng'}
                        </Text>
                    }
                </View>
                <View style={styles.formInput}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        }}

                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.formItem}>
                                <Text style={{ width: 100, fontWeight: 'bold' }}>Email :</Text>
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='Email'
                                    placeholderTextColor={COLORS.gray}
                                />
                            </View>
                        )}
                        name="email"
                    />
                    {Object.keys(errors).length !== 0 &&
                        <Text style={styles.error}>
                            {errors.email?.type === 'required' && 'Email không được để trống'}
                            {errors.email?.type === 'partent' && 'Email chưa đúng định dạng'}
                        </Text>
                    }
                </View>
                <View style={styles.formInput}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.formItem}>
                                <Text style={{ width: 100, fontWeight: 'bold' }}>Ngày sinh :</Text>

                                <TextInput
                                    placeholder="Nhập ngày sinh"
                                    style={styles.input}
                                    type="datetime"
                                    options={{
                                        format: 'DD-MM-YYYY'
                                    }}
                                    value={value}
                                    onChange={handleChange}
                                />
                            </View>
                        )}
                        name="birthday"
                    />
                </View> */}
                <View styles={styles.btnBottom}>
                    <Button
                        title="Cập nhật thông tin"
                        loading={false}
                        disabled={loading ? true : false}
                        loadingProps={{ size: 'small', color: 'white' }}
                        buttonStyle={{
                            backgroundColor: COLORS.primary,
                            borderRadius: 5,
                            padding: 20
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                        containerStyle={{
                            height: 'auto',
                            width: '100%',
                            marginBottom: 20,
                        }}
                        onPress={handleSubmit(onSubmit)}
                    />
                    <Button
                        title="Đăng xuất"
                        loading={false}
                        disabled={loading ? true : false}
                        loadingProps={{ size: 'small', color: 'white' }}
                        buttonStyle={{
                            backgroundColor: COLORS.gray,
                            borderRadius: 5,
                            padding: 20
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                        containerStyle={{
                            height: 'auto',
                            width: '100%',
                        }}
                        onPress={() => {
                            AsyncStorage.removeItem('user')
                            AsyncStorage.removeItem('token')
                            setUser(null)
                            navigation.replace('Login')
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 30,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.gray,
        borderBottomStyle: 'solid'
    },
    content: {
        padding: 16
    },
    formInput: {
        marginBottom: 20,
    },
    formItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        flex: 1,
        height: 50,
        color: COLORS.black,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderStyle: 'solid',
        paddingHorizontal: 8
    },
    btnBottom: {
        marginTop: 20
    }
})
export default Info