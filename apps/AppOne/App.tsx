import React from 'react';
import {SafeAreaView, ScrollView,} from 'react-native';
import {ContainerFastImage} from "@vytal/vytal-container-tools";
import {ContainerTypeId} from "@vytal/vytal-container-tools/types";

const App = () => {

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ContainerFastImage
          width={100}
          height={100}
          containerTypeId={ContainerTypeId.Ctr1250mlBowl}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
