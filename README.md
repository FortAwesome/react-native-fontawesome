<a href="https://fontawesome.com">
  <img align="right" width="100" height="100" alt="Official Javascript Component" src="https://img.fortawesome.com/349cfdf6/official-javascript-component.svg">
</a>

# react-native-fontawesome

[![npm](https://img.shields.io/npm/v/@fortawesome/react-native-fontawesome.svg?style=flat-square)](https://www.npmjs.com/package/@fortawesome/react-native-fontawesome)

> Font Awesome React Native component using SVG with JS

<!-- toc -->

- [Introduction](#introduction)
    + [Upgrading Font Awesome?](#upgrading-font-awesome)
    + [Get started](#get-started)
    + [Learn about our new SVG implementation](#learn-about-our-new-svg-implementation)
- [Installation](#installation)
- [Add more styles or Pro icons](#add-more-styles-or-pro-icons)
- [or with Yarn](#or-with-yarn)
- [Usage](#usage)
  * [Explicit Import](#explicit-import)
  * [Build a Library to Reference Icons Throughout Your App More Conveniently](#build-a-library-to-reference-icons-throughout-your-app-more-conveniently)
  * [Color](#color)
    + [Color Prop](#color-prop)
    + [Change Color with a StyleSheet](#color-stylesheet-property)
  * [Size](#size)
- [Features](#features)
  * [Duotone](#duotone)
  * [Masking](#masking)
  * [Power Transforms](#power-transforms)
- [Frequent questions](#frequent-questions)
  * [How do I import the same icon from two different styles?](#how-do-i-import-the-same-icon-from-two-different-styles)
  * [I don't think tree-shaking is working; got any advice?](#i-dont-think-tree-shaking-is-working-got-any-advice)
- [How to Help](#how-to-help)
- [Contributors](#contributors)

<!-- tocstop -->

## Introduction

Hey there! We're glad you're here...

#### Upgrading Font Awesome?

If you've used Font Awesome in the past (version 5 or older) there are some
things that you should learn before you dive in.

> https://fontawesome.com/v6/docs/web/setup/upgrade/

#### Get started

This package is for integrating with React Native. If you aren't using React Native then it's
not going to help you. Head over to our "Get Started" page for some guidance.

> https://fontawesome.com/v6/docs/web/setup/quick-start

#### Learn about our new SVG implementation

This package, under the hood, uses SVG with JS and the `@fortawesome/fontawesome-svg-core` library. This implementation differs drastically from
the web fonts implementation that was used in version 4 and older of Font Awesome. You might head over there to learn about how it works.

> https://fontawesome.com/v6/docs/web/dig-deeper/svg-core

## Installation

```
$ npm i --save react-native-svg # **
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/react-native-fontawesome
```

** `create-react-native-app` uses Expo, which bundles `react-native-svg`. So if you're using `create-react-native-app`
you shouldn't try to add `react-native-svg`. At the time of writing, `create-react-native-app` bundles
`react-native-svg` version 6, which does not include support for SVG features such as `Mask`. In order to make use of `Mask`, make sure your dependencies have `react-native-svg` 7. The example app in this repo demonstrates.

If you are using a bare react-native-cli project, run the following command to complete the setup on iOS.

```
$ cd ios && pod install
```

## Add more styles or Pro icons

Brands are separated into their own style and for customers upgrading from
version 4 to 5 we have a limited number of Regular icons available.

**Visit [fontawesome.com/icons](https://fontawesome.com/icons) to search for free and Pro icons**

```
$ npm i --save @fortawesome/free-brands-svg-icons
$ npm i --save @fortawesome/free-regular-svg-icons
```

If you are a [Font Awesome Pro](https://fontawesome.com/pro) subscriber you can install Pro packages; this requires [additional configuration](https://fontawesome.com/v6/docs/web/setup/packages).

```
$ npm i --save @fortawesome/pro-solid-svg-icons
$ npm i --save @fortawesome/pro-regular-svg-icons
$ npm i --save @fortawesome/pro-light-svg-icons
```

If you'd like to use Duotone icons, you'll need to add Duotone package:

```
$ npm i --save @fortawesome/pro-duotone-svg-icons
```


## or with Yarn

```
$ yarn add @fortawesome/fontawesome-svg-core
$ yarn add @fortawesome/free-solid-svg-icons
$ yarn add @fortawesome/react-native-fontawesome
```

## Usage

You can use Font Awesome icons in your React Native components as simply as this:

```javascript
<FontAwesomeIcon icon="mug-saucer" />
```

That simple usage is made possible when you add the `"mug-saucer"` icon, to the
_library_.

This is one of the two ways you can use Font Awesome with React Native. We'll
summarize both ways briefly and then get into the details of each below.

1.  **Explicit Import**

    Allows icons to be subsetted, optimizing your final bundle. Only the icons
    you import are included in the bundle. However, explicitly importing icons
    into each of many components in your app might become tedious, so you may
    want to build a library.

2.  **Build a Library**

    Explicitly import icons just once in some init module. Then add them to the
    library. Then reference any of them by icon name as a string from any
    component. No need to import the icons into each component once they're in
    the library.

### Explicit Import

For this example, we'll also reference the `@fortawesome/free-solid-svg-icons`
module, so make sure you've added it to the project as well:

```
$ npm i --save @fortawesome/free-solid-svg-icons
```

or

```
$ yarn add @fortawesome/free-solid-svg-icons
```

Now, a simple React Native component might look like this:

```javascript
import React, { Component } from 'react'
import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <FontAwesomeIcon icon={ faMugSaucer } />
      </View>
    )
  }
}
```

Notice that the `faMugSaucer` icon is imported from
`@fortawesome/free-solid-svg-icons/faMugSaucer` as an object and then provided to the
`icon` prop as an object.

Explicitly importing icons like this allows us to subset Font Awesome's
thousands of icons to include only those you use in your final bundled file.

### Build a Library to Reference Icons Throughout Your App More Conveniently

You probably want to use our icons in more than one component in your app,
right?

But with explicit importing, it could become tedious to import into each of
your app's components every icon you want to reference in that component.

So, add them to the _library_. Do this setup once in some initializing module
of your app, adding all of the icons you'll use in your app's React components.

Suppose `App.js` initializes my app, including the library. For this example,
we'll add two individual icons, `faSquareCheck` and `faMugSaucer`. We also add all
of the brands in `@fortawesome/free-brands-svg-icons`. This example would
illustrate the benefits of building a library even more clearly if it involved
fifty or a hundred icons, but we'll keep the example brief and leave it to your
imagination as to how this might scale up with lots of icons.

Don't forget to add `@fortawesome/free-brands-svg-icons`:

```
$ npm i --save @fortawesome/free-brands-svg-icons
```

or

```
$ yarn add @fortawesome/free-brands-svg-icons
```

In `App.js`, where our app is initialized:

```javascript
// ...
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faMugEmpty } from '@fortawesome/free-solid-svg-icons/faMugEmpty'

library.add(fab, faSquareCheck, faMugSaucer)
```

OK, so what's happening here?

In our call to <span style="white-space:nowrap;">`library.add()`</span> we're passing

- `fab`: which represents _all_ of the brand icons in
  <span style="white-space:nowrap;">`@fortawesome/free-brands-svg-icons`</span>.
  So any of the brand icons in that package may be referenced by icon name
  as a string anywhere else in our app.
  For example: `"apple"`, `"microsoft"`, or `"google"`.
- `faSquareCheck` and `faMugSaucer`: Adding each of these icons individually
  allows us to refer to them throughout our app by their icon string names,
  `"square-check"` and `"mug-saucer"`, respectively.

Now, suppose you also have React Native components `Beverage` and `Gadget` in your app.
You don't have to re-import your icons into them. Just import the `FontAwesomeIcon`
component, and when you use it, supply the icon prop an icon name as a string.

We'll make `Beverage.js` a functional component:

```javascript
import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export const Beverage = () => (
  <View>
    <FontAwesomeIcon icon="square-check" />
    <Text>Favorite beverage: </Text><FontAwesomeIcon icon="mug-saucer" />
  </View>
)
```

There's one another piece of magic that's happening in the background when
providing icon names as strings like this: the `fas` prefix (for Font Awesome
Solid) is being inferred as the default. Later, we'll look at what that means
and how we can do something different than the default.

Now suppose `Gadget.js` looks like this:

```javascript
import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export const Gadget = () => (
  <View>
    <FontAwesomeIcon icon="square-check" />
    <Text>Popular gadgets come from vendors like:</Text>
    <FontAwesomeIcon icon={['fab', 'apple']} />
    <FontAwesomeIcon icon={['fab', 'microsoft']} />
    <FontAwesomeIcon icon={['fab', 'google']} />
  </View>
)
```

Notice:

- We used the `"square-check"` icon name again in this component, though we
  didn't have to explicitly import it into this component. With one explicit import of
  that icon in `App.js`, and adding it to the library, we've managed to use
  it by name in multiple components.
- We used the `"apple"`, `"microsoft"`, and `"google"` brand icons, which were
  never explicitly _individually_ imported, but they're available to us by
  name as strings because `fab` was added to our library in `App.js`, and
  `fab` includes all of those icons.
- We added the `fab` prefix to reference those brand icons.

Adding a prefix—and the syntax we used to do it—are new. So what's
going on here?

First, recall when we introduced `<FontAwesomeIcon icon="mug-saucer"/>` and learned
that a prefix of `fas` was being added to `"mug-saucer"` by default.

The `"square-check"` icon is getting a default prefix of `fas` here too, which
is what we want, because that icon also lives in the
`@fortawesome/free-solid-svg-icons` package.

However, the `"apple"`, `"microsoft"`, and `"google"` brand icons live in the
package `@fortawesome/free-brands-svg-icons`. So we need to specify a
different prefix for them—not the default `fas`, but `fab`, for Font Awesome
_Brand_.

When specifying a prefix with an icon name, both are given as strings.

Now, what about that syntax?

The `icon` prop expects a single object:

- It could be an icon object, like `{faMugSaucer}`.
- It could a string object, like `"mug-saucer"`.
  (The curly braces around a string object supplied to a prop are optional,
  so we've omitted them.)
- Or it could be an `Array` of strings, where the first element is a prefix,
  and the second element is the icon name: `{["fab", "apple"]}`

### Color

Priority: The color prop takes priority over setting color via StyleSheet. So if you end up with both set,
the prop wins.

In fact, when provided a style object (suppose you've declared other style properties other
than `color`), if the color prop has been specified, then any color property on the style object is removed
 before the style object is passed through to the underlying SVG rendering library. This is to avoid ambiguity.

Using the color prop should be preferred over using the StyleSheet.

#### Color Prop

```javascript
  <FontAwesomeIcon icon={ faMugSaucer } color={ 'red' } />
```

#### Color StyleSheet property

To set the color of an icon, provide a `StyleSheet` like this:

```javascript
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'

type Props = {}

const style = StyleSheet.create({
  icon: {
    color: 'blue'
  }
})

export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <FontAwesomeIcon icon={ faMugSaucer } style={ style.icon } />
      </View>
    )
  }
}
```

### Size

Default: 16

To adjust the size, use the `size` prop:

```javascript
<FontAwesomeIcon icon={ faMugSaucer } size={ 32 } />
```

Note: the `height` and `width` props have been deprecated.

## Features

### Duotone

```javascript
<FontAwesomeIcon icon="mug-saucer" color="blue" secondaryColor="red" secondaryOpacity={ 0.4 } />
```

You can specify the color and opacity for Duotone's secondary layer using the `secondaryColor` and `secondaryOpacity` props. Note that these are optional, and will simply default to using your primary color at 40% opacity.

### Masking

```javascript
<FontAwesomeIcon icon="mug-saucer" mask={['far', 'circle']} />
```

[More on masking...](https://fontawesome.com/v6/docs/web/style/mask#contentHeader)

### Power Transforms

```javascript
<FontAwesomeIcon icon="arrows-up-down-left-right" transform="shrink-6 left-4" />
<FontAwesomeIcon icon="arrow-right" transform={{ rotate: 42 }} />
```

[More on power transforms...](https://fontawesome.com/v6/docs/web/style/power-transform#contentHeader)

## Frequent questions

### How do I import the same icon from two different styles?

With ES modules and `import` statements we can rename:

```javascript
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel as fasFaStroopwafel } from '@fortawesome/pro-solid-svg-icons/faStroopwafel'
import { faStroopwafel as farFaStroopwafel } from '@fortawesome/pro-regular-svg-icons/faStroopwafel'

library.add(fasFaStroopwafel, farFaStroopwafel)
```

### I don't think tree-shaking is working; got any advice?

Check out our [docs here](https://fontawesome.com/v6/docs/apis/javascript/tree-shaking).

If you find that your build times are taking forever, check the way that you are importing icons.

In past versions of `react-native-fontawesome` we've documented importing icons like this:

```javascript
import { faStroopwafel } from '@fortawesome/pro-solid-svg-icons'
```

This can cause build times for your project to skyrocket because React Native is trying to tree shake. The Font Awesome
packages are so large that we _highly_ recommend that you avoid this.

Instead, use "deep imports" by default.

```javascript
import { faStroopwafel } from '@fortawesome/pro-solid-svg-icons/faStroopwafel' // <- notice the additional module here?
```

By directly importing from the `faStroopwafel.js` module there is no additional work that tree shaking needs to do in order to
reduce your bundle size.

## How to Help

Review the following docs before diving in:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

And then:

1.  Check the existing issues and see if you can help!

## Contributors

Community:

| Name              | GitHub                                                    |
| ----------------- | --------------------------------------------------------- |
| Dizy              | [@dizy](https://github.com/dizy)                          |
| David Martin      | [@iamdavidmartin](https://github.com/iamdavidmartin)      |
| Jeremey           | [@puremana](https://github.com/puremana)                  |
| Michael Schonfeld | [@schonfeld](https://github.com/schonfeld)                |
| Ádám Gólya        | [@golya](https://github.com/golya)                        |
| Font Awesome Team | [@FortAwesome](https://github.com/orgs/FortAwesome/people)|
