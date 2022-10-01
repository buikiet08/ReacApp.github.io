import { AntDesign } from '@expo/vector-icons'
import { Button } from '@rneui/themed'
import { useForm } from "react-hook-form";
import React from 'react'
import { View } from 'react-native'
import { COLORS } from '../contains'

function Panigation() {
    const { handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center', marginVertical:20, marginBottom:40}}>
            <Button
                loading={false}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                    backgroundColor: COLORS.gray,
                    borderRadius: 4,
                    padding: 8,
                    marginHorizontal:4
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                onPress={handleSubmit(onSubmit)}
            ><AntDesign name="left" size={21} color={COLORS.white} /></Button>
            <Button
                title='1'
                loading={false}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                    backgroundColor: COLORS.gray,
                    borderRadius: 4,
                    padding: 8,
                    marginHorizontal:4
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                onPress={handleSubmit(onSubmit)}
            />
            <Button
                title='2'
                loading={false}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                    backgroundColor: COLORS.gray,
                    borderRadius: 4,
                    padding: 8,
                    marginHorizontal:4
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                onPress={handleSubmit(onSubmit)}
            />
            <Button
                loading={false}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                    backgroundColor: COLORS.gray,
                    borderRadius: 4,
                    padding: 8,
                    marginHorizontal:4
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 16 }}
                onPress={handleSubmit(onSubmit)}
            ><AntDesign name="right" size={21} color={COLORS.white} /></Button>
        </View>
    )
}

export default Panigation