import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flexDirection:"row",
        justifyContent:"space-evenly",
        paddingVertical: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity:  0.21,
        shadowRadius: 7.68,
        elevation: 10
    }
})