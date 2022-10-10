import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from "react-hook-form";
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from "@rneui/themed";
import { COLORS } from '../../contains';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

function Register({ navigation }) {
    const { watch, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            full_name: '',
            username: '',
            password: '',
            re_password: ''
        }
    });

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    const onSubmit = async (data) => {
        try {
            let axios = require('axios')
            let body = JSON.stringify({
                "mod": "api_register_user",
                "full_name": data.full_name,
                "username": data.username,
                "password": data.password,
                "re_password": data.re_password,
            });
            const config = {
                method: 'post',
                url: 'https://hungtan-hungnguyen.nghean.gov.vn/users/register/',
                data: body
            }
            await axios(config)
                .then(function (response) {
                    setLoading(true)
                    console.log(response.data, 'vào')
                    if (response.data) {
                        AsyncStorage.setItem('token', JSON.stringify(response.data))
                        setTimeout(
                            function () {
                                navigation.replace("Login", { replace: true })
                            }, 1000
                        );
                    }
                    setErrorMessage(response.data)
                })
                .catch(function (error) {
                    setLoading(false)
                    setErrorMessage(error.data.message)
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
                <Text h3 style={styles.title}>Đăng ký</Text>
                {errorMessage && <View style={{padding:8, borderRadius:4,marginBottom:10,backgroundColor:COLORS.white}}>
                    <Text style={{color: errorMessage.status === 0 ? COLORS.red : COLORS.primary}}>{errorMessage.message}</Text>    
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
                                    placeholder='Họ và tên'
                                    placeholderTextColor={"#fff"}
                                />
                            )}
                            name="full_name"
                        />
                        {Object.keys(errors).length !== 0 &&
                            <Text style={styles.error}>
                                {errors.full_name?.type === 'required' && 'Vui lòng nhập họ và tên'}
                                {errors.full_name?.type === 'minLength' && 'Vui lòng nhập tối thiểu 8 kí tự'}
                            </Text>
                        }
                    </View>
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

                    <View style={styles.formInput}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                validate: (val) => {
                                    if (watch('password') != val) {
                                        return "Your passwords do no match";
                                    }
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    type='password'
                                    secureTextEntry={true}
                                    placeholder='Nhập lại mật khẩu'
                                    placeholderTextColor={"#fff"}
                                />
                            )}
                            name="re_password"
                        />
                        {Object.keys(errors).length !== 0 &&
                            <Text style={styles.error}>
                                {errors.re_password?.type === 'required' && 'Vui lòng nhập mật khẩu'}
                                {errors.re_password?.type === 'validate' && 'Mật khẩu nhập lại không đúng'}
                            </Text>
                        }
                    </View>

                    <Button
                        title="Đăng ký"
                        disabled={loading ? true : false}
                        loading={false}
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
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.bottom}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, marginLeft: 4, fontSize: 16, fontWeight: 'bold' }}>Đăng nhập</Text>
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

export default Register