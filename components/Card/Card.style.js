import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    card:{
        backgroundColor: "white",
        flexDirection: "row",
        height:115,
        borderRadius: 13,
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
   },
    text: {
        fontSize:25
    },
    img: {
        height:25,
        width:25

    }
})