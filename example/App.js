/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// @ts-check
/** @type {import("./react-native-barcode-mask/src/index")} */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RNCamera} from 'fleetback-react-native-camera';
import {
  BarcodeMaskWithOuterLayout,
  useBarcodeRead,
} from './react-native-barcode-mask/react-native-barcode-mask.esm';

const App = () => {
  const [barcodeReadCount, setBarcodeReadCount] = useState(0);
  const [barcodeReadAware, setBarcodeReadAware] = useState(false);
  const {
    barcodeRead,
    onBarcodeRead,
    onBarcodeFinderLayoutChange,
  } = useBarcodeRead(
    true,
    data => data,
    processed => {
      console.log(processed);
    },
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Button
            title={'Toggle Barcode Read Aware'}
            onPress={() => {
              setBarcodeReadAware(prev => !prev);
              // setBarcodeRead(false);
              setBarcodeReadCount(0);
            }}
          />
          <Text>{barcodeReadAware.toString()}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            title={'Reset Barcode Read'}
            onPress={() => {
              // setBarcodeRead(false);
            }}
          />
          <Text>{barcodeRead.toString()}</Text>
        </View>
        <Text>Barcode Read Count: {barcodeReadCount}</Text>
        <RNCamera
          androidCameraPermissionOptions={{
            title: 'permissionCamera',
            message: 'permissionCameraMessage',
            buttonPositive: 'ok',
            buttonNegative: 'cancel',
          }}
          style={styles.scanner}
          type={RNCamera.Constants.Type.back}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={onBarcodeRead}
          captureAudio={false}>
          <BarcodeMaskWithOuterLayout
            maskOpacity={0.5}
            width={'80%'}
            height={'80%'}
            onLayoutChange={onBarcodeFinderLayoutChange}
          />
        </RNCamera>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default App;
