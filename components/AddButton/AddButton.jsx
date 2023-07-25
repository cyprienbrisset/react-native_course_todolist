import { s } from "./AddButton.style"
import {Text, TouchableOpacity} from "react-native";

export function AddButton({onPress}) {
	return (
		<TouchableOpacity style={s.button} onPress={onPress}>
			<Text style={s.text}>+ Ajouter une tâche</Text>
		</TouchableOpacity>
	)
}