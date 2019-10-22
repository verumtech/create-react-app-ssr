/**
 * Copyright (c) 2019-present Verum Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      // Expo preset
      require('babel-preset-expo').default,
    ],
    plugins: [
      // Support for styled components
      require('babel-plugin-styled-components').default,
    ],
  };
};
