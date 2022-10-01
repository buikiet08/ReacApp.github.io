import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { useForm, Controller } from "react-hook-form";
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from "@rneui/themed";
import { COLORS } from '../../contains';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

function Register({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            full_name:'',
            username: '',
            password: ''
        }
    });
    const onSubmit = data => console.log(data);
    return (
        <LinearGradient
            colors={['#097ead', '#097ead', '#0891ae']}
            style={styles.container}>
            <View style={styles.formContainer}>
                <Text h3 style={styles.title}>Đăng ký</Text>
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
                    
                    <Button
                        title="Đăng ký"
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
        width: 280
    },
    title: {
        color: COLORS.white,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    formInput:{
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
        marginTop:8
    }
})

export default Register