import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const COLORS = {
    // base colors
    primary: "#E1A208", // orange
    secondary: "#747D8C",   // gray

    // colors
    red:'red',
    green:'#0ceb0c',
    black: "#1E1F20",
    black2:'#222222',
    black3:'#333333',
    black4:'#4f4f4f',
    white: "#FFFFFF",
    blue:'#1976d2',
    text:'#4F4F4F',
    gray:'#d2d2d2',
    gray2:'#bdbdbd',
    gray3:'#828282',
    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',
    transparentPrimary: '#e1a20899'
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export default {
    COLORS,
    SIZES
}