import * as fontawesome from '@fortawesome/fontawesome-svg-core'
import FontAwesomeIcon from '../FontAwesomeIcon'
import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet } from 'react-native'
import { find } from 'lodash'

const faCoffee = {
  prefix: 'fas',
  iconName: 'coffee',
  icon: [
    640,
    512,
    [],
    'f0f4',
    'M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z'
  ]
}

const faCircle = {
  prefix: 'fas',
  iconName: 'circle',
  icon: [
    640,
    512,
    [],
    'f0f4',
    'M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z'
  ]
}

fontawesome.library.add(faCoffee, faCircle)

test('renders with icon specified as array', () => {
  const tree = renderer.create(<FontAwesomeIcon icon={ ['fas', 'coffee'] } />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders with icon object prop', () => {
  const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders with mask and transform', () => {
  const tree = renderer.create(<FontAwesomeIcon icon={ faCircle } mask={ faCoffee } transform="shrink-9 right-4" />).toJSON()
  // modify the clipPath and mask identifiers to be fixed, so they aren't regenerated each time and thus
  // our snapshot will remain stable across test runs
  const maskId = "mask-1"
  const clipId = "clip-1"

  // clip id
  tree.children[0].children[0].children[0].props.name = clipId
  tree.children[0].children[1].props.clipPath = clipId

  // mask id
  tree.children[0].children[0].children[1].props.name = maskId
  tree.children[0].children[1].props.mask = maskId

  // remove the clipPath prop, if present, to normalize the shape across versions of react-native-svg.
  // in version ^7.1.2, there was a clipRule prop here. in version ^8.0.8 there's not.
  // normalizing this lets us match more fuzzily and have this same test work in both version scenarios.
  tree.children[0].children[1].props = { ...tree.children[0].children[1].props, clipRule: undefined }

  expect(tree).toMatchSnapshot()
})

test('renders transform equivalently when assigning prop as string or object', () => {
  const firstTree = renderer.create(<FontAwesomeIcon icon={ faCoffee } transform="shrink-9 right-4" />).toJSON()
  expect(firstTree).toMatchSnapshot()

  const secondTree = renderer.create(<FontAwesomeIcon icon={ faCoffee } transform={fontawesome.parse.transform("shrink-9 right-4")} />).toJSON()
  expect(secondTree).toMatchObject(firstTree)
})

describe('color', () => {
  describe('when color is given in StyleSheet and NO color prop', () => {
    test('renders with StyleSheet color', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      })
      const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } style={ styles.icon }/>).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
  describe('when color prop is given and NO style.color is given', () => {
    test('renders with color given in color prop', () => {
      const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } color={ 'purple' }/>).toJSON()
      expect(tree.props.fill).toEqual('purple')
      expect(tree.props.tintColor).toBeUndefined()
      const path = tree.children[0].children.find(c => c.type === 'RNSVGPath')
      expect(path.fill).toBeUndefined()
    })
  })
  describe('when color is specified both by a color prop AND StyleSheet', () => {
    test('color prop overrides style.color', () => {
      const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } color={ 'blue' } style={{ color: 'red' }}/>).toJSON()
      expect(tree.props.fill).toEqual('blue')
      expect(tree.props.tintColor).toBeUndefined()
      const path = tree.children[0].children.find(c => c.type === 'RNSVGPath')
      expect(path.fill).toBeUndefined()
    })
  })
})

describe('size', () => {
  describe('when no size, width, or height props are specified', () => {
    test('default size is assigned', () => {
      const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } />).toJSON()
      expect(tree.props.height).toEqual(16)
      expect(tree.props.width).toEqual(16)
    })
  })
  describe('when only a size prop is specified', () => {
    test('the given size is assigned', () => {
      const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } size={ 32 } />).toJSON()
      expect(tree.props.height).toEqual(32)
      expect(tree.props.width).toEqual(32)
    })
  })
  describe('deprecated scenarios', () => {
    const originalWarningFunc = console.warn

    const warnings = []

    const warningListener = warning => {
      const re = new RegExp('^DEPRECATION')
      if(warning.match(re)) {
        warnings.push(warning)
      } else {
        throw new Error(`Unexpected Warning: ${warning}`)
      }
    }

    beforeEach(() => {
      console.warn = jest.fn( warningListener )
      warnings.length = 0
    })

    afterEach(() => {
      console.warn = originalWarningFunc
    })

    describe('when height or width props are specified without a size prop', () => {
      test('the specified height and width are assigned and a deprecation warning is emitted', () => {
        const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } height={ 32 } width={ 32 } />).toJSON()
        expect(tree.props.height).toEqual(32)
        expect(tree.props.width).toEqual(32)
        expect(warnings.length).toEqual(1)
      })
    })

    describe('when height or width props are specified WITH a size prop', () => {
      test('the size prop overrides the height and width props', () => {
        const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } size={ 64 } height={ 32 } width={ 32 } />).toJSON()
        expect(tree.props.height).toEqual(64)
        expect(tree.props.width).toEqual(64)
        expect(warnings.length).toEqual(1)
      })
    })
  })
})


