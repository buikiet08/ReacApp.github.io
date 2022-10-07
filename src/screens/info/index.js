import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { useForm } from 'react-hook-form';
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../contains'

function Info({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Thông tin tài khoản</Text>
                <View style={{ width: 24 }}></View>
            </View>
            <View style={styles.formInput}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: 8
                    }}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.formItem}>
                            <Text style={{width:100}}>Họ và tên :</Text>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                type="text"
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
                        minLength: 10
                    }}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.formItem}>
                            <Text style={{width:100}}>Số điện thoại :</Text>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
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
                            <Text style={{width:100}}>Email :</Text>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={COLORS.gray}
                            />
                        </View>
                    )}
                    name="email"
                />
                {Object.keys(errors).length !== 0 &&
                    <Text style={styles.error}>
                        {errors.email?.type === 'required' && 'Email không được để trống'}
                        {errors.email?.type === 'minLength' && 'Vui lòng nhập tối thiểu 10 số'}
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
                            <Text style={{width:100}}>Ngày sinh :</Text>
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={COLORS.gray}
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
})
export default Info