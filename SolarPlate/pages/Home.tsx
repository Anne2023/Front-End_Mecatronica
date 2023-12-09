import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  View,
} from "react-native";
import LineChartComponent from "../Components/LineChartComponent";
import mockData from "../Mock/mockData.json";
import Grafico from "../Components/VisualGraph";
import SafetyMode from "../Components/safetyMode";

const windowWidth = Dimensions.get("window").width;

interface Record {
  id: number;
  sensort: number;
  servo_vertical: number;
  secury_mode: boolean;
  created_at: string;
}

const getLastTenRecords = (data: Record[]) => data.slice(0, 7);

export default function App() {
  const [showServoVertical, setShowServoVertical] = useState(true);
  const [data, setData] = useState(getLastTenRecords(mockData));
  const [chartComponentKey, setChartComponentKey] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState("lightblue");

  const chartTitle = showServoVertical ? "Servo Vertical" : "Tensão";
  const chartData = data.map((record) =>
    showServoVertical ? record.servo_vertical : record.sensort
  );
  const chartXData = data.map((record) => record.created_at);

  const toggleChart = () => {
    setShowServoVertical((prevShow) => !prevShow);
    fetchDataFromJson();
  };

  const fetchDataFromJson = () => {
    const newData = getLastTenRecords(mockData);
    setData(newData);
    setChartComponentKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    fetchDataFromJson();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchDataFromJson, 500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const hora = new Date().getHours();
    const isNoite = hora < 6 || hora >= 18;

    // Atualiza a cor de fundo com base no horário
    setBackgroundColor(isNoite ? "darkblue" : "lightblue");
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Monitoramento de Placa Solar</Text>
      </View>

      <View style={styles.headerContainer}>
        <Grafico />
      </View>

      <View style={styles.secondContainer}>
        <View style={styles.sectionContainer}>
          <LineChartComponent
            key={chartComponentKey}
            yAxisLabel={""}
            yAxisSuffix={showServoVertical ? "º" : "V"}
            chartTitle={chartTitle}
            data={chartData}
            chartXData={chartXData}
            chartStyle={styles.chartStyle}
            titleStyle={styles.chartTitleStyle}
          />

          <View style={styles.buttonContainer}>
            <SafetyMode/>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleChart}>
              <Text style={styles.toggleButtonText}>
                {showServoVertical ? "Observar Tensão" : "Observar Angulação"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: "relative",
  },
  header: {
    backgroundColor: "#f0f0f0",
    position: "relative",
    width: "100%",
    height: 100,
    bottom: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#3f51b5",
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 40,
  },
  headerContainer: {},
  secondContainer: {
    borderRadius: 10,
    paddingTop: 10,
    position: "absolute",
    zIndex: 1,
    top: 360,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  sectionContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 70,
    paddingHorizontal: 20,
    paddingTop: 30,
    height: 510,
    marginBottom: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 60
  },
  toggleButton: {
    backgroundColor: "lightblue",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3f51b5",
    justifyContent: "center",
    textAlign: "center",
    width: "auto",
  },
  infoContainer: {
    width: windowWidth,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  infoText: {
    color: "#333",
  },
  chartStyle: {
    backgroundColor: "#f0f0f0",
  },
  chartTitleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3f51b5",
  },
});
