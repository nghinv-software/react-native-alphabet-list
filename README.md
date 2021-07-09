# @nghinv/react-native-alphabet-list

React Native Alphabet List Component use reanimated 2 library

---

[![CircleCI](https://circleci.com/gh/nghinv-software/react-native-alphabet-list.svg?style=svg)](https://circleci.com/gh/nghinv-software/react-native-alphabet-list)
[![Version][version-badge]][package]
[![MIT License][license-badge]][license]
[![All Contributors][all-contributors-badge]][all-contributors]
[![PRs Welcome][prs-welcome-badge]][prs-welcome]

<p align="center">
<img src="./assets/demo.gif" width="300"/>
</p>

## Installation

```sh
yarn add @nghinv/react-native-alphabet-list
```

or 

```sh
npm install @nghinv/react-native-alphabet-list
```

## Usage

```js
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AlphabetList from '@nghinv/react-native-alphabet-list';
import { Alphabet } from '@nghinv/react-native-alphabet-list/utils';
import { CharType, ItemType } from '@nghinv/react-native-alphabet-list/types';

const DATA: Array<{ name: string, key: CharType }> = [];

Alphabet.forEach(char => {
  const random = Math.round(8 * Math.random());
  if (random > 0) {
    for (let i = 0; i < random; i++) {
      const contact = `${char.toLocaleUpperCase()} - Contact ${i + 1}`;
      DATA.push({
        name: contact,
        key: char as CharType,
      });
    }
  }
});

function App() {
  const renderItem = ({ item }: ItemType) => {
    return (
      <View style={styles.viewContent}>
        <Text style={styles.txtContent}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AlphabetList
        data={DATA}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  viewContent: {
    paddingRight: 16,
    paddingLeft: 40,
    marginBottom: 24,
  },
  txtContent: {
    fontSize: 16,
    color: 'white',
  },
});

export default App;
```

# Property

| Property | Type | Default | Description |
|----------|:----:|:-------:|-------------|
| data | `Array<{ key: string, [key string]: any }>` | `undefined` |  |
| renderHeader | `(header: string) => React.ReactNode` | `undefined` |  |
| renderItem | `({ item, index }) => React.ReactNode` | `undefined` |
| showAllHeader | `boolean` | `false` |  |
| trackSize | `number` | `18` |  |
| trackColor | `string` | `white` |  |
| charHeight | `number` | `20` |  |
| trackScale | `number` | `1.5` |  |
| lineWidth | `number` | `20` |  |
| trackScale | `number` | `1.5` |  |
| textColorActive | `string` | `tomato` |  |
| textInactiveColor | `string` | `white` |  |
| headerTitleColor | `string` | `white` |  |
| charStyle | `TextStyle` | `undefined` |  |
| headerTitleStyle | `TextStyle` | `undefined` |  |
| headerStyle | `ViewStyle` | `undefined` |  |

[version-badge]: https://img.shields.io/npm/v/@nghinv/react-native-alphabet-list.svg?style=flat-square
[package]: https://www.npmjs.com/package/@nghinv/react-native-alphabet-list
[license-badge]: https://img.shields.io/npm/l/@nghinv/react-native-alphabet-list.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[all-contributors-badge]: https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square
[all-contributors]: #contributors
[prs-welcome-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs-welcome]: http://makeapullrequest.com
