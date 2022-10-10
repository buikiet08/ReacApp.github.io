import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from "react-hook-form";
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from "@rneui/themed";
import { COLORS } from '../../contains';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import infoUser from '../../servicer/userService';
import { usePage } from '../../hook/usePage';

function Login({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { setUser } = usePage()

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            let axios = require('axios')
            let body = JSON.stringify({
                "mod": "api_login_user",
                "username": data.username,
                "password": data.password,
            });
            const config = {
                method: 'post',
                url: 'https://hungtan.demobcb.work/users/register/',
                data: body
            }
            await axios(config)
                .then(function (response) {
                    console.log(response.data, 'vào')
                    if (response.data) {
                        console.log(response.data.token)
                        AsyncStorage.setItem('token', JSON.stringify(response.data.token))
                        const infoUser = async () => {
                            let token = await AsyncStorage.getItem('token');
                            token = JSON.parse(token)
                            if (token) {
                                let axios = require('axios')
                                let body = JSON.stringify({
                                    "mod": "get_info_user"
                                })
                                const config = {
                                    method: 'post',
                                    url: 'https://hungtan-hungnguyen.nghean.gov.vn/users/register/',
                                    headers: {
                                        Authorization: `bearer ${token}`
                                    },
                                    data: body
                                }
                                if (token) {
                                    return axios(config)
                                        .then(function (res) {
                                            AsyncStorage.setItem('user', JSON.stringify(res.data))
                                            setUser(res.data)
                                            setTimeout(
                                                function () {
                                                    navigation.replace("BottomTab", { replace: true })
                                                }, 1000
                                            );
                                            console.log(res.data, 'thông tin use')
                                        })
                                        .catch(function (error) {
                                            console.error(error)
                                        });
                                }
                            }
                        }
                        infoUser()

                    }
                    setErrorMessage(response?.data)
                })
                .catch(function (error) {
                    setLoading(false)
                    setErrorMessage(error.message)
                });
        }
        catch (error) {
            console.error(error.message)
            setErrorMessage(error.message)
        }
        finally {
            setLoading(false)
        }
        console.log(data)
    }
    return (
        <LinearGradient
            colors={['#097ead', '#097ead', '#0891ae']}
            style={styles.container}>
            <View style={styles.formContainer}>
                <Text h3 style={styles.title}>Đăng nhập</Text>
                {errorMessage && <View style={{ padding: 8, borderRadius: 4, marginBottom: 10, backgroundColor: COLORS.white }}>
                    <Text style={errorMessage.status === 0 ? { color: COLORS.red } : { color: COLORS.primary }}>{errorMessage.message}</Text>
                </View>}
                <View>
                    <View style={styles.formInput}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                minLength: 8
                            }}

                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    type="text"
                                    placeholder='Tên đăng nhập'
                                    placeholderTextColor={"#fff"}
                                />
                            )}
                            name="username"
                        />
                        {Object.keys(errors).length !== 0 &&
                            <Text style={styles.error}>
                                {errors.username?.type === 'required' && 'Vui lòng nhập tên đăng nhập'}
                                {errors.username?.type === 'minLength' && 'Vui lòng nhập tối thiểu 8 kí tự'}
                            </Text>
                        }
                    </View>

                    <View style={styles.formInput}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                maxLength: 32,
                                minLength: 6
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    type='password'
                                    placeholder='Mật khẩu'
                                    secureTextEntry={true}
                                    placeholderTextColor={"#fff"}
                                />
                            )}
                            name="password"
                        />
                        {Object.keys(errors).length !== 0 &&
                            <Text style={styles.error}>
                                {errors.password?.type === 'required' && 'Vui lòng nhập mật khẩu'}
                                {errors.password?.type === 'maxLength' && 'Nhập tối đa 32 kí tự'}
                                {errors.password?.type === 'minLength' && 'Nhập tối thiểu 6 kí tự'}
                            </Text>
                        }
                    </View>
                    <View style={styles.register}>
                        <Text style={{ color: COLORS.white, fontSize: 12 }}>bạn chưa có tài khoản ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{ color: COLORS.primary, marginLeft: 4, fontSize: 14, fontWeight: 'bold' }}>Đăng ký</Text></TouchableOpacity>
                    </View>
                    <Button
                        title="Đăng nhập"
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
                            marginBottom: 30,
                        }}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('BottomTab')} style={styles.bottom}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, marginLeft: 4, fontSize: 16, fontWeight: 'bold' }}>Trang chủ</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    formContainer: {
        width: 300
    },
    title: {
        color: COLORS.white,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    formInput: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        color: COLORS.white,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.white,
        borderStyle: 'solid',
        paddingHorizontal: 8
    },
    register: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottom: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 12,
        color: COLORS.red,
        marginTop: 8
    }
})

export default Login