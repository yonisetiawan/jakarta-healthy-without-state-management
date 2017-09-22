// import liraries
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'native-base';
import { Actions as NavigationActions } from 'react-native-router-flux';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  AppEventsLogger
} = FBSDK;

// create a component
class MainScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loginStatus: false,
    }
  }

  analiticsTesting(){
    AppEventsLogger.logEvent('Testing')
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.boxIcon}>
          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.lineTop} />
          </View>
          <Text style={styles.titleIcon}>Cari Jakarta</Text>
          <Text style={styles.mainIcon}>Sehat</Text>
          <View style={styles.lineBot} />
        </View>

          {this.state.loginStatus
          ?
          <View style={styles.boxButton}>
            <Button
              onPress={() => NavigationActions.fetchlist({ paramKey: 'rsumum' })}
              style={{
                backgroundColor: '#028090',
                margin: 15
              }} full>
              <Text style={{color: '#fff'}}>Rs Umum</Text>
            </Button>

            <Button
              onPress={() => NavigationActions.fetchlist({ paramKey: 'rskhusus' })}
              style={{
                backgroundColor: '#02C39A',
                margin: 15
              }} full>
              <Text style={{color: '#fff'}}>Rs Khusus</Text>
            </Button>

            <Button
              onPress={() => NavigationActions.fetchlist({ paramKey: 'puskesmas' })}
              style={{
                backgroundColor: '#00A896',
                margin: 15
              }} full>
              <Text style={{color: '#fff'}}>Puskesmas</Text>
            </Button>
          </View>
           : <Text></Text>
          }

          <Button
            onPress={() => this.analiticsTesting}
            style={{
              backgroundColor: '#028090',
              margin: 15
            }} full>
            <Text style={{color: '#fff'}}>Button Analitics</Text>
          </Button>

        <View>
          <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login cancel")
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    {/*alert(data.accessToken.toString())*/}
                    this.setState({loginStatus: true})

                  }
                )
              }
            }
          }
          onLogoutFinished={() =>
            this.setState({loginStatus: false})
          }/>
        </View>

      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 25
  },
  boxIcon: {
    marginTop: 120,
    padding: 10
  },
  titleIcon: {
    fontSize: 24,
    color: '#05668D'
  },
  mainIcon: {
    fontSize: 64,
    marginTop: -18,
    color: '#05668D'
  },
  lineTop: {
    borderTopColor: '#05668D',
    borderTopWidth: 3,
    width: 100
  },
  lineBot: {
    borderBottomColor: '#05668D',
    borderBottomWidth: 3,
    width: 100
  },
  boxButton: {
    width: '100%',
    marginTop: 27
  }
});

// make this component available to the app
export default MainScreen;
