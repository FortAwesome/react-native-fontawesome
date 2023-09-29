import { inspect } from 'util'
import * as fontawesome from '@fortawesome/fontawesome-svg-core'
import FontAwesomeIcon, { DEFAULT_SIZE } from '../FontAwesomeIcon'
import { coreHasFeature, REFERENCE_ICON_USING_STRING, REFERENCE_ICON_BY_STYLE, ICON_ALIASES } from '../__fixtures__/helpers'
import React from 'react'
import renderer from 'react-test-renderer'
import { StyleSheet } from 'react-native'
import { get } from 'lodash'

jest.spyOn(React, 'createElement')

const faCoffee = {
  prefix: 'fas',
  iconName: 'coffee',
  icon: [
    640,
    512,
    ['coffee-alias'],
    'f001',
    'M1z'
  ]
}

const faCircle = {
  prefix: 'fas',
  iconName: 'circle',
  icon: [
    640,
    512,
    [],
    'f002',
    'M2z'
  ]
}

const faSquare = {
  prefix: 'far',
  iconName: 'square',
  icon: [
    640,
    512,
    [],
    'f003',
    'M3z'
  ]
}

const faAcorn = {
  prefix: 'fad',
  iconName: 'acorn',
  icon: [
    640,
    512,
    [],
    'f004',
    ['M4z']
  ]
}

const faBeer = {
  prefix: 'fal',
  iconName: 'beer',
  icon: [
    640,
    512,
    [],
    'f005',
    ['M5z']
  ]
}

const BLUE = '0000ff'
const PURPLE = '800080'
const RED = 'ff0000'

function rgbToHex (r, g, b) {
  return [r, g, b]
    .map((c) => {
      const hex = c.toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    })
    .join('')
}

function decimalToHex (decimal) {
  return decimal.toString(16).slice(2, 8)
}

// react-native-svg changed the way it uses the `fill` attribute across versions. Older versions
// return [_, r, g, b, _] (where 0 <= {r,g,b} <= 1), while other versions return arrays, and even
// scalar values... We, much like the Borg, will adapt.
function getActualFillColorHex (element) {
  const fillProp = element.props.fill

  if (!Array.isArray(fillProp)) {
    // rn-svg v11 use a simple sclar value, representing the decimal value of the color
    // @link https://github.com/react-native-community/react-native-svg/blob/v11.0.1/__tests__/__snapshots__/css.test.tsx.snap
    // https://github.com/react-native-community/react-native-svg/blob/v12.1.0/__tests__/__snapshots__/css.test.tsx.snap#L158
    return decimalToHex(fillProp)
  } else if (fillProp.length === 5) {
    // rn-svg <= v8 return an array [_, r, g, b, _], where {rgb} are in the range of {0,1}
    // @note no links provided because rn-svg didn't include any tests in those versions
    return rgbToHex(fillProp[1] * 255, fillProp[2] * 255, fillProp[3] * 255)
  } else if (fillProp.length === 2) {
    // rn-svg v9, and v10 return an array with shape [_, DECIMAL_COLOR]
    // @link https://github.com/react-native-community/react-native-svg/blob/v9.14.0/__tests__/__snapshots__/css.test.tsx.snap#L159
    // @link https://github.com/react-native-community/react-native-svg/blob/v10.1.0/__tests__/__snapshots__/css.test.tsx.snap#L159
    return decimalToHex(fillProp[1])
  }

  return null
}

afterEach(() => {
  fontawesome.library.reset()
})

describe('snapshots', () => {
  test('renders with icon specified as array from the library', () => {
    fontawesome.library.add(faCoffee)

    const tree = renderer.create(<FontAwesomeIcon icon={ ['fas', 'coffee'] } />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('renders with icon object prop', () => {
    const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('renders with mask and transform', () => {
    const tree = renderer.create(<FontAwesomeIcon icon={ faCircle } mask={ faCoffee } maskId="m1" transform="shrink-9 right-4" />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('renders transform equivalently when assigning prop as string or object', () => {
    const firstTree = renderer.create(<FontAwesomeIcon icon={ faCoffee } transform="shrink-9 right-4" />).toJSON()
    expect(firstTree).toMatchSnapshot()

    const secondTree = renderer.create(<FontAwesomeIcon icon={ faCoffee } transform={fontawesome.parse.transform('shrink-9 right-4')} />).toJSON()
    expect(secondTree).toMatchObject(firstTree)
  })
})

describe('when icon prop', () => {
  beforeEach(() => {
    fontawesome.library.add(faCoffee, faCircle, faSquare, faAcorn)
  })

  function r (icon) {
    return renderer.create(<FontAwesomeIcon icon={icon} />).toJSON()
  }

  test('is an object not in the library', () => expect(r(faBeer)).toMatchIcon(faBeer))

  if (coreHasFeature(REFERENCE_ICON_USING_STRING)) {
    test('is a simple string', () => expect(r('coffee')).toMatchIcon(faCoffee))
    test('is prefixed with fa-', () => expect(r('fa-coffee')).toMatchIcon(faCoffee))
    test('includes a long style', () => expect(r('fa-duotone fa-acorn')).toMatchIcon(faAcorn))
  }

  if (coreHasFeature(REFERENCE_ICON_BY_STYLE)) {
    test('is an array with style name', () => expect(r(['regular', 'square'])).toMatchIcon(faSquare))
    test('is an array with fa- prefixed style name', () => expect(r(['fa-regular', 'square'])).toMatchIcon(faSquare))
    test('is an array with both fa- prefixed', () => expect(r(['fa-regular', 'fa-square'])).toMatchIcon(faSquare))
  }

  if (coreHasFeature(ICON_ALIASES)) {
    test('is an alias', () => expect(r('coffee-alias')).toMatchIcon(faCoffee))
  }
})

describe('when color', () => {
  describe('is given in StyleSheet and NO color prop', () => {
    test('it assigns StyleSheet color to fill and removes style.color', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      })

      const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } style={ styles.icon }/>).toJSON()

      expect(StyleSheet.flatten(tree.props.style)).not.toHaveProperty('color')
      expect(getActualFillColorHex(tree.children[0].children[0])).toEqual(BLUE)
    })

    describe('is given along with other style properties', () => {
      test('the non-color style properties are passed through, though the color style property is not', () => {
        const styles = StyleSheet.create({
          icon: {
            color: 'blue',
            backgroundColor: 'yellow'
          }
        })

        const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } style={ styles.icon }/>).toJSON()

        expect(StyleSheet.flatten(tree.props.style)).not.toHaveProperty('color')
        expect(StyleSheet.flatten(tree.props.style)).toHaveProperty('backgroundColor')
        expect(getActualFillColorHex(tree.children[0].children[0])).toEqual(BLUE)
      })
    })
  })

  describe('is given and NO style.color is given', () => {
    test('it renders with given color prop', () => {
      const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } color={ 'purple' }/>).toJSON()

      expect(getActualFillColorHex(tree.children[0].children[0])).toEqual(PURPLE)
    })
  })

  describe('is specified both by a color prop AND StyleSheet', () => {
    test('the color prop overrides style.color', () => {
      const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } color={ 'blue' } style={{ color: 'red' }}/>).toJSON()

      expect(getActualFillColorHex(tree.children[0].children[0])).toEqual(BLUE)
    })
  })
})

describe('when size', () => {
  describe('is ommitted', () => {
    test('it uses the default', () => {
      const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } />).toJSON()

      expect(tree.props.height).toEqual(DEFAULT_SIZE)
      expect(tree.props.width).toEqual(DEFAULT_SIZE)
    })
  })

  describe('is specified', () => {
    test('it gets used', () => {
      const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } size={ 32 } />).toJSON()

      expect(tree.props.height).toEqual(32)
      expect(tree.props.width).toEqual(32)
    })
  })

  describe('when deprecated width or height are used', () => {
    test('an error is thrown', () => {
      expect(() => {
        FontAwesomeIcon({ icon: faCoffee, style: {}, height: 16, width: 16 })
      }).toThrow(/deprecated/)
    })
  })
})

describe('when extra props are given', () => {
  test('they are ommitted from what we give RNSVG', () => {
    const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } color="purple" foo="bar" />).toJSON()

    expect(tree.props).not.toHaveProperty('foo')
  })
})

describe('focusable attribute', () => {
  test('is never used to render elements', () => {
    renderer.create(<FontAwesomeIcon icon={faCoffee} />).toJSON()

    React.createElement.mock.calls
      .map(([_c, attrs, _children]) => attrs)
      .filter((attrs) => 'focusable' in attrs)
      .forEach(({ focusable }) => {
        expect(focusable).toEqual(false)
      })
  })
})

describe('when style is given an array and not an object', () => {
  test('it applies all', () => {
    const styles = StyleSheet.create({
      s1: {
        padding: 1
      },
      s2: {
        backgroundColor: 'yellow'
      }
    })

    const tree = renderer.create(<FontAwesomeIcon icon={ faCoffee } style={[styles.s1, styles.s2]} />).toJSON()
    const all = StyleSheet.flatten(tree.props.style)

    expect(all).toHaveProperty('padding')
    expect(all).toHaveProperty('backgroundColor')
  })
})

describe('with a duotone icon', () => {
  describe('when NO secondary color or opacity are given', () => {
    test('it uses the primary color at 40% opacity as the secondary color', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      })
      const tree = renderer.create(<FontAwesomeIcon icon={ faAcorn } style={ styles.icon }/>).toJSON()
      const primaryLayer = tree.children[0].children[0].children[1]
      const secondaryLayer = tree.children[0].children[0].children[0]

      expect(getActualFillColorHex(primaryLayer)).toEqual(BLUE)
      expect(secondaryLayer.props.fillOpacity).toEqual(0.4)
    })
  })

  describe('when secondary opacity was given, but NO secondary color is given', () => {
    test('it use the primary color with the secondary opacity given', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      })
      const tree = renderer.create(<FontAwesomeIcon icon={ faAcorn } style={ styles.icon } secondaryOpacity={ 0.123 } />).toJSON()
      const primaryLayer = tree.children[0].children[0].children[1]
      const secondaryLayer = tree.children[0].children[0].children[0]

      expect(getActualFillColorHex(primaryLayer)).toEqual(BLUE)
      expect(secondaryLayer.props.fillOpacity).toEqual(0.123)
    })
  })

  describe('when secondary color is given, but no secondary opacity', () => {
    test('it uses the given secondary color, with opacity set to 0.4', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      })
      const tree = renderer.create(<FontAwesomeIcon icon={ faAcorn } style={ styles.icon } secondaryColor={ 'red' } />).toJSON()
      const secondaryLayer = tree.children[0].children[0].children[0]

      expect(getActualFillColorHex(secondaryLayer)).toEqual(RED)
      expect(secondaryLayer.props.fillOpacity).toEqual(0.4)
    })
  })

  describe('when secondary color and secondary opacity are given', () => {
    test('it uses both the given secondary color and opacity', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue'
        }
      })
      const tree = renderer.create(<FontAwesomeIcon icon={ faAcorn } style={ styles.icon } secondaryColor={ 'red' } secondaryOpacity={ 0.123 } />).toJSON()
      const secondaryLayer = tree.children[0].children[0].children[0]

      expect(getActualFillColorHex(secondaryLayer)).toEqual(RED)
      expect(secondaryLayer.props.fillOpacity).toEqual(0.123)
    })
  })
})

expect.extend({
  toMatchIcon (receivedIcon, expectedIcon) {
    const find = (tree) => {
      if (
        get(tree, ['props', 'd']) === expectedIcon.icon[4] ||
        (Array.isArray(expectedIcon.icon[4]) && expectedIcon.icon[4].includes(get(tree, ['props', 'd'])))
      ) {
        return tree
      }

      if (Array.isArray(tree.children)) {
        for (const child of tree.children) {
          if (find(child)) return child
        }
      }

      return null
    }

    if (find(receivedIcon)) {
      return {
        message: () => `expected icon not to match ${expectedIcon.iconName}`,
        pass: true
      }
    } else {
      return {
        message: () => `expected icon to match ${expectedIcon.iconName}: ${inspect(receivedIcon, { depth: 10 })}`,
        pass: false
      }
    }
  }
})
