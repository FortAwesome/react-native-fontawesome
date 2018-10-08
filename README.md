<a href="https://fontawesome.com">
  <img align="right" width="100" height="100" alt="Official Javascript Component" src="https://img.fortawesome.com/349cfdf6/official-javascript-component.svg">
</a>

# react-native-fontawesome

[![npm](https://img.shields.io/npm/v/@fortawesome/react-native-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/react-native-fontawesome)

> Font Awesome 5 React Native component using SVG with JS

<!-- toc -->

- [Introduction](#introduction)
    + [Upgrading Font Awesome?](#upgrading-font-awesome)
    + [Get started](#get-started)
    + [Learn about our new SVG implementation](#learn-about-our-new-svg-implementation)
- [Installation](#installation)
- [Add more styles or Pro icons](#add-more-styles-or-pro-icons)
- [or with Yarn](#or-with-yarn)
- [Frequent questions](#frequent-questions)
  * [How do I import the same icon from two different styles?](#how-do-i-import-the-same-icon-from-two-different-styles)
  * [I don't think tree-shaking is working; got any advice?](#i-dont-think-tree-shaking-is-working-got-any-advice)
- [How to Help](#how-to-help)
- [Contributors](#contributors)

<!-- tocstop -->

## Introduction

Hey there! We're glad you're here...

#### Upgrading Font Awesome?

If you've used Font Awesome in the past (version 4 or older) there are some
things that you should learn before you dive in.

> https://fontawesome.com/how-to-use/on-the-web/setup/upgrading-from-version-4

#### Get started

This package is for integrating with React Native. If you aren't using React Native then it's
not going to help you. Head over to our "Get Started" page for some guidance.

> https://fontawesome.com/how-to-use/on-the-web/setup/getting-started

#### Learn about our new SVG implementation

This package, under the hood, uses SVG with JS and the `@fortawesome/fontawesome-svg-core` library. This implementation differs drastically from
the web fonts implementation that was used in version 4 and older of Font Awesome. You might head over there to learn about how it works.

> https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core

## Installation

```
$ npm i --save react-native-svg # **
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/react-native-fontawesome
```

** `create-react-native-app` uses Expo, which bundles `reactive-native-svg`. So if you're using `create-reactive-native-app`
you shouldn't try to add `react-native-svg`. At the time of writing, `create-react-native-app` bundles
`react-native-svg` version 6, which does not include support for SVG features such as `Mask`. Therefore, this
component does not yet support `Mask`.

## Add more styles or Pro icons

Brands are separated into their own style and for customers upgrading from
version 4 to 5 we have a limited number of Regular icons available.

**Visit [fontawesome.com/icons](https://fontawesome.com/icons) to search for free and Pro icons**

```
$ npm i --save @fortawesome/free-brands-svg-icons
$ npm i --save @fortawesome/free-regular-svg-icons
```

If you are a [Font Awesome Pro](https://fontawesome.com/pro) subscriber you can install Pro packages; this requires [additional configuration](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers).

```
$ npm i --save @fortawesome/pro-solid-svg-icons
$ npm i --save @fortawesome/pro-regular-svg-icons
$ npm i --save @fortawesome/pro-light-svg-icons
```

## or with Yarn

```
$ yarn add @fortawesome/fontawesome-svg-core
$ yarn add @fortawesome/free-solid-svg-icons
$ yarn add @fortawesome/react-native-fontawesome
```

## Frequent questions

### How do I import the same icon from two different styles?

With ES modules and `import` statements we can rename:

```javascript
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel as fasFaStroopwafel } from '@fortawesome/pro-solid-svg-icons'
import { faStroopwafel as farFaStroopwafel } from '@fortawesome/pro-regular-svg-icons'

library.add(fasFaStroopwafel, farFaStroopwafel)
```

### I don't think tree-shaking is working; got any advice?

Check out our [docs here](https://fontawesome.com/how-to-use/with-the-api/other/tree-shaking).

## How to Help

Review the following docs before diving in:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

And then:

1.  Check the existing issues and see if you can help!

## Contributors

The Font Awesome team:

|                                                            | Name           | GitHub                                             |
| :--------------------------------------------------------: | -------------- | -------------------------------------------------- |
| <img src="https://github.com/supercodepoet.png?size=72" /> | Travis Chase   | [@supercodepoet](https://github.com/supercodepoet) |
|   <img src="https://github.com/robmadole.png?size=72" />   | Rob Madole     | [@robmadole](https://github.com/robmadole)         |
|  <img src="https://github.com/mlwilkerson.png?size=72" />  | Mike Wilkerson | [@mlwilkerson](https://github.com/mlwilkerson)     |
|     <img src="https://github.com/talbs.png?size=72" />     | Brian Talbot   | [@talbs](https://github.com/talbs)                 |

