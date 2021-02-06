import React from 'react';
import {View, Text, Button, StyleSheet, StatusBar, ScrollView} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class EventsListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  async componentDidMount () {

    try {
      const response = await fetch('https://facebook.github.io/react-native/movies.json');
      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        dataSource: responseJson.movies,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        /*<SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#009387" />
        <ScrollView>
          <View style={styles.container}>
          <Text>EventsList Screen.</Text>
          <Button
          title="Click Here"
          //onPress={() => navigation.navigate("Home")}
          />
        </View>
        </ScrollView>
      </SafeAreaView>*/
    
          <View style={styles.container}>
            <ActivityIndicator/>
            
          </View>
        )
      } else {
        let movies = this.state.dataSource.map((val, key) =>{
        return <View key={key} style={styles.item}>
                  <Text onPress={() => this.props.navigation.navigate("Home")}>{val.title}</Text>
                </View>
        });

        return (
          <View style={styles.container}>
            {movies}

          </View>
        );
      }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
      flex: 1,
      alignSelf: 'stretch',
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
    }
});