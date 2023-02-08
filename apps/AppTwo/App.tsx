import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {SharedBowlImage} from '@rn-monorepo/shared-image';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.text}>Shared bowl image component</Text>
        <SharedBowlImage width={150} height={150} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
});

export default App;
