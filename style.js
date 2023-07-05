import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#3f3e41",
    },
    scrollViewContainer: {
      flexGrow: 1,
    },
    labelValueContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    tasksWrapper: {
      flex: 1,
      justifyContent: "space-between",
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: "#fff",
    },
    infoList: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    listItem: {
      marginBottom: 10,
    },
    infoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
      backgroundColor: "#525154",
      padding: 10,
      borderRadius: 10,
    },
    infoItem: {
      alignItems: "center",
      paddingHorizontal: 10,
    },
    infoLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#e3e3e3",
    },
    infoValue: {
      fontSize: 16,
      color: "#e3e3e3",
    },
    dividerLine: {
      width: 1,
      backgroundColor: "#e3e3e3",
    },
    resetButton: {
      alignSelf: "center",
      marginBottom: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: "#333333",
      borderRadius: 5,
    },
    resetButtonText: {
      fontSize: 16,
      color: "red",
    },
    taskContainer: {
      marginTop: 20,
      marginHorizontal: -20,
      paddingHorizontal: 20,
      backgroundColor: "#f2f2f2",
      borderRadius: 10,
      paddingVertical: 10,
    },
    task: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      marginTop: 10,
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 20,
      elevation: 3, // Add elevation for shadow (Android)
      shadowColor: "#000", // Add shadow color (iOS)
      shadowOffset: { width: 0, height: 2 }, // Add shadow offset (iOS)
      shadowOpacity: 0.2, // Add shadow opacity (iOS)
      shadowRadius: 2, // Add shadow radius (iOS)
    },
    taskIcon: {
      marginRight: 15,
    },
    checkmarkImage: {
      width: 54,
      height: 52,
      tintColor: "green",
    },
    placeholderImage: {
      width: 54,
      height: 52,
      tintColor: "#000",
      opacity: 1,
    },
    taskText: {
      fontSize: 16,
      color: "#000",
      flex: 1,
    },
  });

export default styles;