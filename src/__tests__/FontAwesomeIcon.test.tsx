import { inspect } from 'util';
import * as fontawesome from '@fortawesome/fontawesome-svg-core';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import FontAwesomeIcon, { DEFAULT_SIZE } from '../FontAwesomeIcon';
import {
  coreHasFeature,
  REFERENCE_ICON_USING_STRING,
  REFERENCE_ICON_BY_STYLE,
  ICON_ALIASES,
} from './__fixtures__/helpers';
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import type { ReactTestRenderer } from 'react-test-renderer';
import { StyleSheet } from 'react-native';
import { get } from 'lodash';

jest.spyOn(React, 'createElement');

// Helper function for React 19 compatibility - create component inside act(), call toJSON outside
function createComponent(element: React.ReactElement): ReactTestRenderer {
  let component!: ReactTestRenderer;
  act(() => {
    component = renderer.create(element);
  });
  return component;
}

const faCoffee: IconDefinition = {
  prefix: 'fas',
  iconName: 'coffee' as fontawesome.IconName,
  icon: [640, 512, ['coffee-alias'], 'f001', 'M1z'],
};

const faCircle: IconDefinition = {
  prefix: 'fas',
  iconName: 'circle' as fontawesome.IconName,
  icon: [640, 512, [], 'f002', 'M2z'],
};

const faSquare: IconDefinition = {
  prefix: 'far',
  iconName: 'square' as fontawesome.IconName,
  icon: [640, 512, [], 'f003', 'M3z'],
};

const faAcorn: IconDefinition = {
  prefix: 'fad',
  iconName: 'acorn' as fontawesome.IconName,
  icon: [640, 512, [], 'f004', ['M4z']],
};

const faBeer: IconDefinition = {
  prefix: 'fal',
  iconName: 'beer' as fontawesome.IconName,
  icon: [640, 512, [], 'f005', ['M5z']],
};

const BLUE = '0000ff';
const PURPLE = '800080';
const RED = 'ff0000';

function rgbToHex(r: number, g: number, b: number): string {
  return [r, g, b]
    .map((c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('');
}

function decimalToHex(decimal: number): string {
  return decimal.toString(16).substr(2, 6);
}

// react-native-svg changed the way it uses the `fill` attribute across versions. Older versions
// return [_, r, g, b, _] (where 0 <= {r,g,b} <= 1), while other versions return arrays, and even
// scalar values... We, much like the Borg, will adapt.

function getActualFillColorHex(element: any): string | null {
  const fillProp = element.props.fill;

  // rn-svg v15+ returns an object with { type: 0, payload: ARGB_DECIMAL }
  // The payload is an ARGB value like 0xFF0000FF (alpha=255, red=0, green=0, blue=255)
  if (
    fillProp &&
    typeof fillProp === 'object' &&
    'payload' in fillProp &&
    typeof fillProp.payload === 'number'
  ) {
    // Extract RGB from ARGB (ignore alpha)
    /* eslint-disable no-bitwise */
    const argb = fillProp.payload;
    const r = (argb >> 16) & 0xff;
    const g = (argb >> 8) & 0xff;
    const b = argb & 0xff;
    /* eslint-enable no-bitwise */
    return rgbToHex(r, g, b);
  }

  if (!Array.isArray(fillProp)) {
    // rn-svg v11 use a simple sclar value, representing the decimal value of the color
    // @link https://github.com/react-native-community/react-native-svg/blob/v11.0.1/__tests__/__snapshots__/css.test.tsx.snap
    // https://github.com/react-native-community/react-native-svg/blob/v12.1.0/__tests__/__snapshots__/css.test.tsx.snap#L158
    return decimalToHex(fillProp);
  } else if (fillProp.length === 5) {
    // rn-svg <= v8 return an array [_, r, g, b, _], where {rgb} are in the range of {0,1}
    // @note no links provided because rn-svg didn't include any tests in those versions
    return rgbToHex(fillProp[1] * 255, fillProp[2] * 255, fillProp[3] * 255);
  } else if (fillProp.length === 2) {
    // rn-svg v9, and v10 return an array with shape [_, DECIMAL_COLOR]
    // @link https://github.com/react-native-community/react-native-svg/blob/v9.14.0/__tests__/__snapshots__/css.test.tsx.snap#L159
    // @link https://github.com/react-native-community/react-native-svg/blob/v10.1.0/__tests__/__snapshots__/css.test.tsx.snap#L159
    return decimalToHex(fillProp[1]);
  }

  return null;
}

afterEach(() => {
  fontawesome.library.reset();
});

describe('snapshots', () => {
  test('renders with icon specified as array from the library', () => {
    fontawesome.library.add(faCoffee);

    const tree = createComponent(
      <FontAwesomeIcon icon={['fas', 'coffee']} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('renders with icon object prop', () => {
    const tree = createComponent(<FontAwesomeIcon icon={faCoffee} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('renders with mask and transform', () => {
    const tree = createComponent(
      <FontAwesomeIcon
        icon={faCircle}
        mask={faCoffee}
        maskId="m1"
        transform="shrink-9 right-4"
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('renders transform equivalently when assigning prop as string or object', () => {
    const firstTree = createComponent(
      <FontAwesomeIcon icon={faCoffee} transform="shrink-9 right-4" />
    ).toJSON();
    expect(firstTree).toMatchSnapshot();

    const secondTree = createComponent(
      <FontAwesomeIcon
        icon={faCoffee}
        transform={fontawesome.parse.transform('shrink-9 right-4')}
      />
    ).toJSON();
    expect(secondTree).toMatchObject(firstTree as object);
  });
});

describe('using defaultProps', () => {
  const UNDEFINED_DEFAULT_PROPS = {
    icon: undefined,
    mask: undefined,
    maskId: undefined,
    transform: undefined,
    style: undefined,
    color: undefined,
    secondaryColor: undefined,
    secondaryOpacity: undefined,
    size: undefined,
  };

  test('undefined props passed', () => {
    expect(() =>
      createComponent(
        <FontAwesomeIcon {...UNDEFINED_DEFAULT_PROPS} icon={faCoffee} />
      ).toJSON()
    ).not.toThrow(TypeError);
  });
});

describe('when icon prop', () => {
  beforeEach(() => {
    fontawesome.library.add(faCoffee, faCircle, faSquare, faAcorn);
  });

  function r(icon: any) {
    return createComponent(<FontAwesomeIcon icon={icon} />).toJSON();
  }

  test('is an object not in the library', () =>
    expect(r(faBeer)).toMatchIcon(faBeer));

  if (coreHasFeature(REFERENCE_ICON_USING_STRING)) {
    test('is a simple string', () => expect(r('coffee')).toMatchIcon(faCoffee));
    test('is prefixed with fa-', () =>
      expect(r('fa-coffee')).toMatchIcon(faCoffee));
    test('includes a long style', () =>
      expect(r('fa-duotone fa-acorn')).toMatchIcon(faAcorn));
  }

  if (coreHasFeature(REFERENCE_ICON_BY_STYLE)) {
    test('is an array with style name', () =>
      expect(r(['regular', 'square'])).toMatchIcon(faSquare));
    test('is an array with fa- prefixed style name', () =>
      expect(r(['fa-regular', 'square'])).toMatchIcon(faSquare));
    test('is an array with both fa- prefixed', () =>
      expect(r(['fa-regular', 'fa-square'])).toMatchIcon(faSquare));
  }

  if (coreHasFeature(ICON_ALIASES)) {
    test('is an alias', () => expect(r('coffee-alias')).toMatchIcon(faCoffee));
  }
});

describe('when color', () => {
  describe('is given in StyleSheet and NO color prop', () => {
    test('it assigns StyleSheet color to fill and removes style.color', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue',
        },
      });

      const tree = createComponent(
        <FontAwesomeIcon icon={faCoffee} style={styles.icon} />
      ).toJSON() as any;

      expect(StyleSheet.flatten(tree.props.style)).not.toHaveProperty('color');
      expect(getActualFillColorHex(tree.children[0].children[0])).toEqual(BLUE);
    });

    describe('is given along with other style properties', () => {
      test('the non-color style properties are passed through, though the color style property is not', () => {
        const styles = StyleSheet.create({
          icon: {
            color: 'blue',
            backgroundColor: 'yellow',
          },
        });

        const tree = createComponent(
          <FontAwesomeIcon icon={faCoffee} style={styles.icon} />
        ).toJSON() as any;

        expect(StyleSheet.flatten(tree.props.style)).not.toHaveProperty(
          'color'
        );
        expect(StyleSheet.flatten(tree.props.style)).toHaveProperty(
          'backgroundColor'
        );
        expect(getActualFillColorHex(tree.children[0].children[0])).toEqual(
          BLUE
        );
      });
    });
  });

  describe('is given and NO style.color is given', () => {
    test('it renders with given color prop', () => {
      const tree = createComponent(
        <FontAwesomeIcon icon={faCoffee} color={'purple'} />
      ).toJSON() as any;

      expect(getActualFillColorHex(tree.children[0].children[0])).toEqual(
        PURPLE
      );
    });
  });

  describe('is specified both by a color prop AND StyleSheet', () => {
    test('the color prop overrides style.color', () => {
      const tree = createComponent(
        <FontAwesomeIcon
          icon={faCoffee}
          color={'blue'}
          style={{ color: 'red' }}
        />
      ).toJSON() as any;

      expect(getActualFillColorHex(tree.children[0].children[0])).toEqual(BLUE);
    });
  });
});

describe('when size', () => {
  describe('is ommitted', () => {
    test('it uses the default', () => {
      const tree = createComponent(
        <FontAwesomeIcon icon={faCoffee} />
      ).toJSON() as any;

      expect(tree.props.height).toEqual(DEFAULT_SIZE);
      expect(tree.props.width).toEqual(DEFAULT_SIZE);
    });
  });

  describe('is specified', () => {
    test('it gets used', () => {
      const tree = createComponent(
        <FontAwesomeIcon icon={faCoffee} size={32} />
      ).toJSON() as any;

      expect(tree.props.height).toEqual(32);
      expect(tree.props.width).toEqual(32);
    });
  });

  describe('when deprecated width or height are used', () => {
    test('an error is thrown', () => {
      expect(() => {
        FontAwesomeIcon({ icon: faCoffee, style: {}, height: 16, width: 16 });
      }).toThrow(/deprecated/);
    });
  });
});

describe('when extra props are given', () => {
  test('they are ommitted from what we give RNSVG', () => {
    const tree = createComponent(
      <FontAwesomeIcon
        icon={faCoffee}
        color="purple"
        // @ts-expect-error testing extra props
        foo="bar"
      />
    ).toJSON() as any;

    expect(tree.props).not.toHaveProperty('foo');
  });
});

describe('focusable attribute', () => {
  test('is never used to render elements', () => {
    createComponent(<FontAwesomeIcon icon={faCoffee} />).toJSON();

    (React.createElement as jest.Mock).mock.calls

      .map(([_c, attrs, _children]: any) => attrs)

      .filter((attrs: any) => attrs && 'focusable' in attrs)

      .forEach(({ focusable }: any) => {
        expect(focusable).toEqual(false);
      });
  });
});

describe('when style is given an array and not an object', () => {
  test('it applies all', () => {
    const styles = StyleSheet.create({
      s1: {
        padding: 1,
      },
      s2: {
        backgroundColor: 'yellow',
      },
    });

    const tree = createComponent(
      <FontAwesomeIcon icon={faCoffee} style={[styles.s1, styles.s2]} />
    ).toJSON() as any;
    const all = StyleSheet.flatten(tree.props.style);

    expect(all).toHaveProperty('padding');
    expect(all).toHaveProperty('backgroundColor');
  });
});

describe('with a duotone icon', () => {
  describe('when NO secondary color or opacity are given', () => {
    test('it uses the primary color at 40% opacity as the secondary color', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue',
        },
      });

      const tree = createComponent(
        <FontAwesomeIcon icon={faAcorn} style={styles.icon} />
      ).toJSON() as any;
      const primaryLayer = tree.children[0].children[0].children[1];
      const secondaryLayer = tree.children[0].children[0].children[0];

      expect(getActualFillColorHex(primaryLayer)).toEqual(BLUE);
      expect(secondaryLayer.props.fillOpacity).toEqual(0.4);
    });
  });

  describe('when secondary opacity was given, but NO secondary color is given', () => {
    test('it use the primary color with the secondary opacity given', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue',
        },
      });

      const tree = createComponent(
        <FontAwesomeIcon
          icon={faAcorn}
          style={styles.icon}
          secondaryOpacity={0.123}
        />
      ).toJSON() as any;
      const primaryLayer = tree.children[0].children[0].children[1];
      const secondaryLayer = tree.children[0].children[0].children[0];

      expect(getActualFillColorHex(primaryLayer)).toEqual(BLUE);
      expect(secondaryLayer.props.fillOpacity).toEqual(0.123);
    });
  });

  describe('when secondary color is given, but no secondary opacity', () => {
    test('it uses the given secondary color, with opacity set to 0.4', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue',
        },
      });

      const tree = createComponent(
        <FontAwesomeIcon
          icon={faAcorn}
          style={styles.icon}
          secondaryColor={'red'}
        />
      ).toJSON() as any;
      const secondaryLayer = tree.children[0].children[0].children[0];

      expect(getActualFillColorHex(secondaryLayer)).toEqual(RED);
      expect(secondaryLayer.props.fillOpacity).toEqual(0.4);
    });
  });

  describe('when secondary color and secondary opacity are given', () => {
    test('it uses both the given secondary color and opacity', () => {
      const styles = StyleSheet.create({
        icon: {
          color: 'blue',
        },
      });

      const tree = createComponent(
        <FontAwesomeIcon
          icon={faAcorn}
          style={styles.icon}
          secondaryColor={'red'}
          secondaryOpacity={0.123}
        />
      ).toJSON() as any;
      const secondaryLayer = tree.children[0].children[0].children[0];

      expect(getActualFillColorHex(secondaryLayer)).toEqual(RED);
      expect(secondaryLayer.props.fillOpacity).toEqual(0.123);
    });
  });
});

describe('viewBox expansion for FA7 overflow icons', () => {
  // react-native-svg parses viewBox string into separate numeric props:
  // minX, minY, vbWidth, vbHeight
  // We test these parsed values to verify the viewBox expansion

  // T010: viewBox expansion subtracts 32 from minY
  test('expands viewBox by subtracting 32 from minY', () => {
    const tree = createComponent(
      <FontAwesomeIcon icon={faCoffee} />
    ).toJSON() as any;

    // faCoffee has viewBox "0 0 640 512"
    // After expansion: "0 -32 640 576"
    // react-native-svg parses this into minY=-32
    expect(tree.props.minY).toEqual(-32);
  });

  // T011: viewBox expansion adds 64 to height
  test('expands viewBox by adding 64 to height', () => {
    const tree = createComponent(
      <FontAwesomeIcon icon={faCoffee} />
    ).toJSON() as any;

    // faCoffee original height: 512
    // After expansion: 512 + 64 = 576
    expect(tree.props.vbHeight).toEqual(576);
  });

  // T012: viewBox expansion preserves minX unchanged
  test('preserves minX unchanged', () => {
    const tree = createComponent(
      <FontAwesomeIcon icon={faCoffee} />
    ).toJSON() as any;

    // minX should remain 0 (unchanged)
    expect(tree.props.minX).toEqual(0);
  });

  // T013: viewBox expansion preserves width unchanged
  test('preserves width unchanged', () => {
    const tree = createComponent(
      <FontAwesomeIcon icon={faCoffee} />
    ).toJSON() as any;

    // width should remain 640 (unchanged)
    expect(tree.props.vbWidth).toEqual(640);
  });

  // T014: viewBox expansion handles icons with different heights correctly
  test('handles icons with different heights correctly', () => {
    // Create an icon with different dimensions
    // Note: fontawesome-svg-core generates viewBox from icon array [width, height, ...]
    const faIconWithDifferentHeight: IconDefinition = {
      prefix: 'fas',
      iconName: 'tall-icon' as fontawesome.IconName,
      // icon array: [width, height, aliases, unicode, pathData]
      icon: [512, 532, [], 'f999', 'M1z'],
    };

    const tree = createComponent(
      <FontAwesomeIcon icon={faIconWithDifferentHeight} />
    ).toJSON() as any;

    // minY: 0 - 32 = -32
    // height: 532 + 64 = 596
    expect(tree.props.minY).toEqual(-32);
    expect(tree.props.vbHeight).toEqual(596);
  });

  // T015: viewBox expansion handles rendering gracefully
  test('renders correctly with expanded viewBox', () => {
    // This test ensures the component still renders with viewBox processing
    const tree = createComponent(
      <FontAwesomeIcon icon={faCoffee} />
    ).toJSON() as any;

    expect(tree).not.toBeNull();
    // Verify all viewBox-related props are present and numeric
    expect(typeof tree.props.minX).toEqual('number');
    expect(typeof tree.props.minY).toEqual('number');
    expect(typeof tree.props.vbWidth).toEqual('number');
    expect(typeof tree.props.vbHeight).toEqual('number');
  });
});

// Custom matcher declaration
declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchIcon(expectedIcon: any): R;
    }
  }
}

expect.extend({
  toMatchIcon(receivedIcon: any, expectedIcon: any) {
    const find = (tree: any): any => {
      if (
        get(tree, ['props', 'd']) === expectedIcon.icon[4] ||
        (Array.isArray(expectedIcon.icon[4]) &&
          expectedIcon.icon[4].includes(get(tree, ['props', 'd'])))
      ) {
        return tree;
      }

      if (Array.isArray(tree.children)) {
        for (const child of tree.children) {
          if (find(child)) return child;
        }
      }

      return null;
    };

    if (find(receivedIcon)) {
      return {
        message: () => `expected icon not to match ${expectedIcon.iconName}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected icon to match ${expectedIcon.iconName}: ${inspect(receivedIcon, { depth: 10 })}`,
        pass: false,
      };
    }
  },
});
