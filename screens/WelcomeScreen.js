import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  // to keep thing simple, will do a request to get a protected message data, not in util folder.
  const [fetchedMessage, setIsFetchedMessage] = useState("");
  const authContext = useContext(AuthContext);
  const token = authContext.token;

  useEffect(() => {
    axios
      .get(
        "https://expensetracker-react-nat-5fce1-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=" +
          token
      )
      .then((response) => setIsFetchedMessage(response.data));
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
