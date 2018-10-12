import * as fontawesome from '@fortawesome/fontawesome-svg-core'
import FontAwesomeIcon from '../FontAwesomeIcon'
import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet } from 'react-native'

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

test('renders correctly', () => {
  const tree = renderer.create(<FontAwesomeIcon height={10} width={10} icon={ ['fas', 'coffee'] } />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly with default height and width', () => {
  const tree = renderer.create(<FontAwesomeIcon icon={ ['fas', 'coffee'] } />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders with icon object prop', () => {
  const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders with style prop setting color', () => {
  const styles = StyleSheet.create({
    icon: {
      color: 'blue'
    }
  })
  const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } style={ styles.icon }/>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders with mask and transform', () => {
  const tree = renderer.create(<FontAwesomeIcon icon={ faCircle } mask={ faCoffee } transform="shrink-9 right-4" />).toJSON()
  // modify the clipPath and mask identifiers to be fixed, so they aren't regenerated each time and thus
  // our snapshot will remain stable across test runs
  const maskId = "mask-1"
  const clipId = "clip-1"

  // clip id
  tree.children[0].children[0].props.name = clipId
  tree.children[1].props.clipPath = clipId

  // mask id
  tree.children[0].children[1].props.name = maskId
  tree.children[1].props.mask = maskId

  expect(tree).toMatchSnapshot()
})

test('renders transform equivalently when assigning prop as string or object', () => {
  const firstTree = renderer.create(<FontAwesomeIcon icon={ faCoffee } transform="shrink-9 right-4" />).toJSON()
  expect(firstTree).toMatchSnapshot()

  const secondTree = renderer.create(<FontAwesomeIcon icon={ faCoffee } transform={fontawesome.parse.transform("shrink-9 right-4")} />).toJSON()
  expect(secondTree).toMatchObject(firstTree)
})
