// Apps
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Alert, SafeAreaView, ScrollView, View} from "react-native";
import Dialog from "react-native-dialog"
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Style
import {s} from './App.style'

// Composants
import {Header} from "./components/Header/Header";
import {Card} from "./components/Card/Card";
import {useEffect, useState} from "react";
import {Footer} from "./components/Footer/Footer";
import {AddButton} from "./components/AddButton/AddButton";


let isFirstRender = true;
let isLoadUpdate = false
export default function App() {


    const [selectedTabName, setSelectedTabName] = useState("all")
    const [todoList, setTodoList] = useState([]);
    const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        loadTodoList()
    }, []);

    useEffect(() => {
        if (isLoadUpdate) {
            isLoadUpdate = false
        } else {
            if (!isFirstRender) {
                saveTodoList()
            } else {
                isFirstRender = false
            }
        }
    }, [todoList]);

    async function saveTodoList() {
        try {
            await AsyncStorage.setItem("@todolist", JSON.stringify(todoList))
        } catch (err) {
            alert("Erreur " + err)
        }
    }

    async function loadTodoList() {
        try {
            const stringifiedTodoList = await AsyncStorage.getItem("@todolist")
            if (stringifiedTodoList != null) {
                const parsedTodoList = JSON.parse(stringifiedTodoList)
                isLoadUpdate = true
                setTodoList(parsedTodoList)
            }
        } catch (err) {
            alert("Erreur " + err)
        }
    }

    /**
     * Filter by status
     * @returns {*[]}
     */
    function getFilteredList() {
        switch (selectedTabName) {
            case "all":
                return todoList
            case "inProgress":
                return todoList.filter(todo => !todo.isCompleted)
            case "done" :
                return todoList.filter(todo => todo.isCompleted)
        }
    }

    /**
     * Render the list of todo in the body
     * @returns {unknown[]}
     */
    function renderTodoList() {
        return getFilteredList().map((todo) => (
            <View style={s.cardItem} key={todo.id}>
                <Card onPress={updateTodo} onLongPress={deleteTodo} todo={todo}/>
            </View>
        ));
    }

    /**
     * Update Status
     * @param todo
     */
    function updateTodo(todo) {
        const updatedTodo = {
            ...todo,
            isCompleted: !todo.isCompleted
        }
        const indexToUpdate = todoList.findIndex((todo) => todo.id === updatedTodo.id)
        const updatedToDoList = [...todoList]
        updatedToDoList[indexToUpdate] = updatedTodo
        setTodoList(updatedToDoList)
    }

    /**
     * Delete a todo
     * @param todoToDelete
     */
    function deleteTodo(todoToDelete) {
        Alert.alert("Suppression", "Supprimer la tâche (" + todoToDelete.title + ") ?", [
            {
                text: "Supprimer",
                style: "destructive",
                onPress: () => {
                    setTodoList(todoList.filter(todo => todo.id !== todoToDelete.id))
                }
            },
            {
                text: "Annuler",
                style: "cancel"
            }
        ])
    }

    function showAddDialog() {
        setIsAddDialogVisible(true)
    }

    function addTodo() {
        const newTodo = {
            id: uuid.v4(),
            title: inputValue,
            isCompleted: false
        };
        setTodoList([...todoList, newTodo])
        setIsAddDialogVisible(false)
        setInputValue("")

    }

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView ed style={s.app}>
                    <View style={s.header}>
                        <Header></Header>
                    </View>
                    <View style={s.body}>
                        <ScrollView>
                            {renderTodoList()}
                        </ScrollView>
                    </View>
                    <AddButton onPress={showAddDialog}/>
                </SafeAreaView>
            </SafeAreaProvider>
            <View style={s.footer}>
                <Footer onPress={setSelectedTabName} selectedTabName={selectedTabName} todoList={todoList}/>
            </View>
            <Dialog.Container visible={isAddDialogVisible} onBackdropPress={() => setIsAddDialogVisible(false)}>
                <Dialog.Title>Créer une tâche</Dialog.Title>
                <Dialog.Description>Choisi un nom pour la nouvelle tâche</Dialog.Description>
                <Dialog.Input onChangeText={setInputValue}></Dialog.Input>
                <Dialog.Button disabled={inputValue.trim().length === 0} label={"Créer"} onPress={addTodo}>

                </Dialog.Button>
            </Dialog.Container>
        </>
    );
}

