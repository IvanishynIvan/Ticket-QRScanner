import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import {View, Text, Button, StyleSheet, ScrollView } from 'react-native';


export default class CheckListScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        dataSource: null,
      }
    }
  
    async componentDidMount () {
      try {
        const response = await fetch('https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON');
        const responseJson = await response.json();
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      } catch (error) {
        console.log(error);
      }
    }
  
    render() {
      if (this.state.isLoading) {
        return (
      
            <View style={styles.container}>
              <ActivityIndicator/>
              
            </View>
          )
        } else {
          let director = this.state.dataSource.map((val, key) =>{
          return <View key={key} style={styles.item}>
                    <Text style={{ fontSize: 18 }}>{val.Director}</Text>
                  </View>
          });

          return (
            <ScrollView>
                <View style={styles.container}>
                    {director}
                </View>
            </ScrollView>
          );
        }
        
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
      flex: 1,
      alignSelf: 'stretch',
      margin: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
    }
});
