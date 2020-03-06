# Developing React Native Fontawesome

## Tasks

The following commands are available through `npm run`

| Command | Purpose                               |
| ------- | ------------------------------------- |
| dist    | Transpile code into `dist/`, to be checked in so the GitHub repo can be sourced directly from a `package.json` file |
| test    | Run tests                             |

## Set up Development Environment (iOS)

Use guidelines in the [React Native](https://facebook.github.io/react-native/docs/getting-started) development docs
to get your environment set up in your OS. For Mac OS X, that would look like: 

1. `brew install node` # if you don't already have node 8.3 or later
1. `brew install watchman` # watches filesystem for changes 
1. `npm install -g react-native-cli` # react-native CLI
1. [Install XCode](https://facebook.github.io/react-native/docs/getting-started#xcode), probably from the App Store. Make sure it's version 9.4 or later. Also set up the XCode Command Line
   Tools.
1. clone this repo

## Launch the Example App

In the `examples/Hello` subdirectory, the following script commands are available:

| Command | Purpose                               |
| ------- | ------------------------------------- |
| start   | Start JavaScript bundler, listening on a port |
| ios     | Build the ios XCode project (requires XCode set up) |
| android | Build the Android project |
| start-with-cache-reset | Useful when after modifying JavaScript modules, something isn't resolving that you're pretty sure should be there |
| clean | clean out build cache. Useful when the build isn't working and you're pretty sure it should be |

In one terminal tab:
1. `cd examples/Hello`
1. `npm install`
1. `npm run start`

This will get the JavaScript bundler running and listening for connections from a device or iOS Simulator.

In another terminal tab:
1 `cd examples/Hello`
1. `react-native link react-native-svg` # to link the native components in the ios project  
1. `npm run ios`

This will build the project via XCode, launch the iOS Simulator, and when the project builds successfully,
install the app into the Simulator and have it connect to the JavaScript bundler. When it's all built and loaded,
it will render the view for the example app--with Font Awesome icons.

### Dealing with Flaky Build Problems

Seems like things don't always go smoothly and you have to [use some hackery](https://github.com/facebook/react-native/issues/21490#issuecomment-427280927) to get the build unjammed.

Try this:
1. shutdown any instances of the bundler you have running.
1. `npm run clean`
1. `npm run start-with-cache-reset` # from the examples/Hello directory

From another terminal tab:
1. `npm run ios`

## Update Example App to Use a Newer Version of this Component

For now, we're just using the GitHub repo as our source for development versions. This means that when you want to
test changes to the component using the example app, you'll have to push the component changes to a development branch
and then update the `package.json` of the example app to pull the component from that branch.

Here's the step-by-step: 

1. make changes to this component
1. `npm run dist` # to transpile via babel into `dist/`
1. `git commit` # whatever changes you're trying to commit
1. `git push origin my-dev` # to whatever topic branch you're working on, say "my-dev"
1. Modify `examples/Hello/package.json` and find the line that looks like this:
`"@fortawesome/react-native-fontawesome": "^0.0.1"`
And change it to something like this:
`"@fortawesome/react-native-fontawesome": "https://github.com/FortAwesome/react-native-fontawesome#my-dev"`
1. `npm update` or `yarn upgrade` # insist that packages be updated, in this case, that the code from the GitHub branch be pulled down into node_modules 
1. Launch the Example App using the instructions above.

## Releasing a new version

<a name="release"></a>

1. Edit `package.json` and update the version number
1. Add new contributors to the `contributors` section
1. Update the `README.md` and add any contributors
1. Update the `CHANGELOG.md`
1. `npm run dist`
1. `npm run test`
1. `npm publish`
1. `npm pack`
1. `CLOUDSMITH_API_KEY=API_TOKEN cloudsmith upload npm fortawesome/fontawesome-pro ./fortawesome-react-native-fontawesome-VERSION.tgz`
1. `git add . && git commit -m 'Release VERSION'`
1. `git push`
1. Create a [new release](https://github.com/FortAwesome/react-native-fontawesome/releases/new) with `CHANGELOG` details
