import {Platform, StatusBar, StyleSheet} from "react-native";

export const s = StyleSheet.create({
    app:{
        flex: 1,
        backgroundColor: "#F9F9F9",
        padding:10,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    cardItem: {
      marginBottom:20
    },
    header: {
        flex:1
    },
    body: {
        flex:5
    },
    footer:{
        backgroundColor: "white",
    }
})
