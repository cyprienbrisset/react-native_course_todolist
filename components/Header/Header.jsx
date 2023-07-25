import { s } from "./Header.style"
import {Image, Text} from "react-native";

import logo from "../../assets/logo.png"


export function Header({}) {
	return (
		<>
		<Image style={s.img} source={logo} resizeMode={"contain"}/>
		<Text style={s.subtitle}>Tu as probablement un truc à faire</Text>
		</>
	)
}