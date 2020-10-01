# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

---

## [0.2.6](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.2.6) - 2020-10-01

### Fixed

- Removed dependence on React Native for Web's ViewPropTypes #72

---

## [0.2.5](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.2.5) - 2020-05-14

### Added

- Support for Duotone icons #59

---

## [0.2.4](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.2.4) - 2020-04-27

### Fixed

- Loosen peerDependencies versions to allow newer react-native and react-native-svg packages

---

## [0.2.3](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.2.3) - 2020-03-06

### Fixed

- Support arrays in style property #28 #40 #46

---

## [0.2.2](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.2.2) - 2020-02-17

### Fixed

- Add index.d.ts to the package.json files

---

## [0.2.1](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.2.1) - 2020-02-06

### Fixed

- Convert 'focusable' attribute to boolean from string #42

## [0.2.0](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.2.0) - 2019-12-13

### Added

- TypeScript definition file #17

### Changed

- Loosened peer dependencies to prevent incorrect version warnings

## [0.1.0](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.1.0) - 2019-01-07

### Changed

- Add color prop
  -- Delete color property on style object after resolving the fill color to avoid ambiguity
  -- Remove any fill="currentColor" attributes returned by fontawesome-svg-core

- Add size prop
  -- Deprecate height and width props

## [0.0.4](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.0.4) - 2018-10-13

### Changed

- Internal clean-up, leveraging recent developments in react-native-svg

## [0.0.3](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.0.3) - 2018-10-11

### Added

- Add support for masking and power transforms

## [0.0.2](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.0.2) - 2018-10-11

### Added

- Add style prop with initial special-case support for setting icon color

- Re-initialize example app to allow for using it with `react-native-svg` 7.x

## [0.0.1](https://github.com/FortAwesome/react-native-fontawesome/releases/tag/0.0.1) - 2018-10-08

### Added

- Initial, minimal implementation, based on [@fortawesome/react-fontawesome](https://github.com/FortAwesome/react-fontawesome/)
