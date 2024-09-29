import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const TotalChants = () => {
  // Fetching number from Redux store
  const totalChantsFromStore = 23562558;
  const [totalChants, setTotalChants] = useState(0);

  useEffect(() => {
    // Update state with value from Redux store
    setTotalChants(totalChantsFromStore);
  }, [totalChantsFromStore]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Chants</Text>
      <View style={styles.chantsContainer}>
        <Text style={styles.chantsText}>{totalChants}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7B1B1B", // Dark red color for the label
    marginBottom: 8,
  },
  chantsContainer: {
    backgroundColor: "#FFF", // White background
    borderColor: "#7B1B1B", // Dark red border
    borderWidth: 2,
    borderRadius: 50, // Rounded edges
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
    minWidth: 200,
  },
  chantsText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000", // Black color for the text
  },
});

export default TotalChants;
