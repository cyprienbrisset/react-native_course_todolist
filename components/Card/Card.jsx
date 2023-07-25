import {Image, Text, TouchableOpacity} from "react-native";

import { s } from "./Card.style"
import check from '../../assets/check.png'

export function Card({todo, onPress, onLongPress}) {
	return (
		<TouchableOpacity style={s.card} onPress={() => onPress(todo)} onLongPress={() => onLongPress(todo)}>
			<Text style={[s.text, todo.isCompleted && {textDecorationLine: "line-through"}]}>{todo.title}</Text>
			{ todo.isCompleted  && <Image style={s.img} source={check}/>}
		</TouchableOpacity>
	)
}