import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import DatePicker from 'react-native-datepicker';
import { COLORS } from '../../contains'
import { usePage } from '../../hook/usePage';

function Info({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState();
    const { user, setUser } = usePage()
    console.log(user)
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
                                    value={value}
                                    type="text"
                                    defaultValue={user.data.first_name}
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
                <View style={styles.formInput}>
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
                        rules={{
                            required: true,
                            minLength: 10
                        }}

                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.formItem}>
                                <Text style={{ width: 100, fontWeight: 'bold' }}>Ngày sinh :</Text>
                                <DatePicker
                                    style={styles.input}
                                    date={date}
                                    mode="date"
                                    placeholder="Ngày sinh"
                                    format="DD/MM/YYYY"
                                    minDate="01-01-1900"
                                    maxDate="01-01-2000"
                                    confirmBtnText="Xác nhận"
                                    cancelBtnText="Thoát"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            right: -5,
                                            top: 4,
                                            marginLeft: 0,
                                        },
                                        dateInput: {
                                            borderColor: "gray",
                                            alignItems: "flex-start",
                                            borderWidth:0,
                                            height:50,
                                        },
                                        placeholderText: {
                                            fontSize: 17,
                                            color: COLORS.gray
                                        },
                                        dateText: {
                                            fontSize: 14,
                                        }
                                    }}
                                    onDateChange={(date) => {
                                        // setDate(date);
                                    }}
                                />
                            </View>
                        )}
                        name="birthday"
                    />
                    {Object.keys(errors).length !== 0 &&
                        <Text style={styles.error}>
                            {errors.birthday?.type === 'required' && 'Ngày sinh không được để trống'}
                            {errors.birthday?.type === 'minLength' && 'Vui lòng nhập tối thiểu 10 số'}
                        </Text>
                    }
                </View>
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
                    // onPress={handleSubmit(onSubmit)}
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
        justifyContent:'center'
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