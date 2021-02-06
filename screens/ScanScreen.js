import React from 'react';
import {Linking, Text, TouchableOpacity, Alert} from 'react-native';
import QRCodeScanner from "react-native-qrcode-scanner";

export default class ScanScreen extends React.Component{

  ifScaned= e=>{
    Linking.openURL(e.data).catch(err=>
      Alert.alert("Invalid QRCode", e.data));
  }

  render(){
    return(
      <QRCodeScanner
      containerStyle={{backgroundColor:"#FFF"}}
      onRead={this.ifScaned}
      reactivate ={true}
      permissionDialogMessage="Nedd Persmission To Access Camera"
      reactivateTimeout={10}
      showMarker={true}
      markerStyle={{borderColor:"#FFF", borderRadius:10}}
      bottomContent={
        <TouchableOpacity>
          <Text style={{fontSize:21, color:'rgb(0,122,255)'}}> Scan QR Code</Text>
        </TouchableOpacity>
      }></QRCodeScanner>
    )
  }

}