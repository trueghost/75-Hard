import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './style.js';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";

export default function App() {
  const [taskItems, setTaskItems] = useState([
    { label: "Drink 4 Litres (1 gallon) of Water", completed: false, logo: require("./assets/drink.png") },
    { label: "Proper Diet (Nutrient-Rich Choices)", completed: false, logo: require("./assets/eat.png") },
    { label: "Workout 1 \n(Light Workout 15min/above)", completed: false, logo: require("./assets/weight1.png") },
    { label: "Workout 2 \n(Outdoor Workout 45min/above)", completed: false, logo: require("./assets/weight2.png") },
    { label: "Learn Something / Read \n(Skill Development)", completed: false, logo: require("./assets/book.png") },
    { label: "No Alcohol / Unhealthy Temptations", completed: false, logo: require("./assets/no-cig.png") },
    { label: "Take a Picture of Yourself", completed: false, logo: require("./assets/camera.png") },
  ]);

  const [dayTracker, setDayTracker] = useState(0);
  const [bestTry, setBestTry] = useState(0);
  const [failCount, setFailCount] = useState(0);

  useEffect(() => {
    const loadTaskItems = async () => {
      try {
        const savedTaskItems = await AsyncStorage.getItem("taskItems");
        if (savedTaskItems) {
          setTaskItems(JSON.parse(savedTaskItems));
          console.log("Task items loaded successfully");
          checkDayCompletion(JSON.parse(savedTaskItems)); // Call checkDayCompletion when task items are loaded
        }
      } catch (error) {
        console.log("Error loading task items:", error);
      }
    };
  
    loadTaskItems();
  }, []);
  
  useEffect(() => {
    const loadBestTryAndFailCount = async () => {
      try {
        const savedBestTry = await AsyncStorage.getItem("bestTry");
        if (savedBestTry) {
          setBestTry(parseInt(savedBestTry));
          console.log("Best try loaded successfully");
        }
      } catch (error) {
        console.log("Error loading best try:", error);
      }
  
      try {
        const savedFailCount = await AsyncStorage.getItem("failCount");
        if (savedFailCount) {
          setFailCount(parseInt(savedFailCount));
          console.log("Fail count loaded successfully");
        }
      } catch (error) {
        console.log("Error loading fail count:", error);
      }
    };
  
    loadBestTryAndFailCount();
  }, []);  

  useEffect(() => {
    const saveTaskItems = async () => {
      try {
        await AsyncStorage.setItem("taskItems", JSON.stringify(taskItems));
        console.log("Task items saved successfully");
      } catch (error) {
        console.log("Error saving task items:", error);
      }
    };

    saveTaskItems();
  }, [taskItems]);

  useEffect(() => {
    const loadDayTracker = async () => {
      try {
        const savedDayTracker = await AsyncStorage.getItem("dayTracker");
        if (savedDayTracker !== null) {
          setDayTracker(parseInt(savedDayTracker));
          console.log("Day tracker loaded successfully");
        }
      } catch (error) {
        console.log("Error loading day tracker:", error);
      }
    };

    loadDayTracker();
  }, []);

  useEffect(() => {
    const saveDayTracker = async () => {
      try {
        await AsyncStorage.setItem("dayTracker", dayTracker.toString());
        console.log("Day tracker saved successfully");
      } catch (error) {
        console.log("Error saving day tracker:", error);
      }
    };

    saveDayTracker();
  }, [dayTracker])

  useEffect(() => {
    const loadFailCount = async () => {
      try {
        const savedFailCount = await AsyncStorage.getItem("failCount");
        if (savedFailCount !== null) {
          setFailCount(parseInt(savedFailCount));
          console.log("Fail count loaded successfully");
        }
      } catch (error) {
        console.log("Error loading fail count:", error);
      }
    };

    loadFailCount();
  }, []);

  useEffect(() => {
    const saveBestTry = async () => {
      try {
        await AsyncStorage.setItem("bestTry", bestTry.toString());
        console.log("Best try saved successfully");
      } catch (error) {
        console.log("Error saving best try:", error);
      }
    };

    saveBestTry();
  }, [bestTry]);

  const handleTaskCompletion = async (index) => {
    if (taskItems[index].completed) {
      return; // Task is already completed, do not prompt again
    }

    Alert.alert("Task Completion", "Did you complete this task?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await completeTask(index);
        },
      },
    ]);
  };

  const completeTask = async (index) => {
    const taskCopy = [...taskItems];
    taskCopy[index].completed = true;
    setTaskItems(taskCopy);
    await checkDayCompletion(taskCopy); // Call checkDayCompletion after completing a task
  };

  const checkDayCompletion = async (taskList) => {
    const allTasksCompleted = taskList.every((task) => task.completed);
    if (allTasksCompleted) {
      setDayTracker((prevDay) => prevDay + 1);
      resetTasks();
      if (dayTracker + 1 > bestTry) {
        setBestTry((prevBestTry) => prevBestTry + 1);
      }
    }
  };

  const handleResetConfirmation = () => {
    Alert.alert(
      "Reset 75 Hard",
      "Are you sure you want to reset your progress?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => handleReset() },
      ]
    );
  };

  const resetTasks = async () => {
    const taskCopy = taskItems.map((task) => ({ ...task, completed: false }));
    setTaskItems(taskCopy);
  };

  const handleReset = async () => {
    setDayTracker(0);
    resetTasks();
  
    const updatedFailCount = failCount + 1;
    console.log("Updated fail count:", updatedFailCount);
    
    try {
      await AsyncStorage.setItem("failCount", updatedFailCount.toString());
      console.log("Fail count saved successfully");
      setFailCount(updatedFailCount); // Update the state after saving to AsyncStorage
    } catch (error) {
      console.log("Error saving fail count:", error);
    }
  
    await AsyncStorage.removeItem("taskItems");
    await AsyncStorage.removeItem("dayTracker");
  };  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.title}>75 Hard</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <View style={styles.labelValueContainer}>
                <Text style={styles.infoLabel}>Current day:</Text>
                <Text style={styles.infoValue}> {dayTracker}</Text>
              </View>
            </View>
            <View style={styles.dividerLine} />
            <View style={styles.infoItem}>
              <View style={styles.labelValueContainer}>
                <Text style={styles.infoLabel}>Fails:</Text>
                <Text style={styles.infoValue}> {failCount}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.labelValueContainer}>
                <Text style={styles.infoLabel}>Best try:</Text>
                <Text style={styles.infoValue}> {bestTry}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={handleResetConfirmation} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <View style={styles.taskContainer}>
            {taskItems.map((task, index) => (
              <TouchableOpacity
                key={index}
                style={styles.task}
                onPress={() => handleTaskCompletion(index)}
              >
                <View style={styles.taskIcon}>
                  {task.completed ? (
                    <Image
                      source={task.logo}
                      style={[styles.checkmarkImage, { tintColor: "green" }]}
                    />
                  ) : (
                    <Image source={task.logo} style={styles.placeholderImage} />
                  )}
                </View>
                <Text style={styles.taskText}>{task.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}