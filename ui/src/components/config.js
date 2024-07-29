export const styleManager = {
  sectors: [
    {
      id: 'layout',
      name: 'Layout',
      properties: [
        {
          extend: 'display',
          type: 'select',
          options: [
            { id: 'none', label: 'None' },
            { id: 'inline', label: 'Inline' },
            { id: 'block', label: 'Block' },
            { id: 'inline-block', label: 'Inline block' },
            { id: 'flex', label: 'Flex' }
          ]
        },
        {
          extend: 'position',
          type: 'select',
          options: [
            { id: 'static', label: 'Static' },
            { id: 'relative', label: 'Relative' },
            { id: 'absolute', label: 'Absolute' },
            { id: 'fixed', label: 'Fixed' },
            { id: 'sticky', label: 'Sticky' }
          ]
        },
        {
          extend: 'flex-direction',
          name: 'Direction',
          type: 'radio',
          default: 'row',
          options: [
            {
              value: 'row',
              name: 'Row',
              className: 'icons-flex icon-dir-row',
              title: 'Row'
            },
            {
              value: 'row-reverse',
              name: 'Row reverse',
              className: 'icons-flex icon-dir-row-rev',
              title: 'Row reverse'
            },
            {
              value: 'column',
              name: 'Column',
              title: 'Column',
              className: 'icons-flex icon-dir-col'
            },
            {
              value: 'column-reverse',
              name: 'Column reverse',
              title: 'Column reverse',
              className: 'icons-flex icon-dir-col-rev'
            }
          ]
        },
        {
          extend: 'justify-content',
          type: 'radio',
          default: 'flex-start',
          options: [
            {
              value: 'flex-start',
              className: 'icons-flex icon-just-start',
              title: 'Start'
            },
            {
              value: 'flex-end',
              title: 'End',
              className: 'icons-flex icon-just-end'
            },
            {
              value: 'space-between',
              title: 'Space between',
              className: 'icons-flex icon-just-sp-bet'
            },
            {
              value: 'space-around',
              title: 'Space around',
              className: 'icons-flex icon-just-sp-ar'
            },
            {
              value: 'center',
              title: 'Center',
              className: 'icons-flex icon-just-sp-cent'
            }
          ]
        },
        {
          extend: 'align-items',
          type: 'radio',
          default: 'stretch',
          options: [
            {
              value: 'flex-start',
              title: 'Start',
              className: 'icons-flex icon-al-start'
            },
            {
              value: 'flex-end',
              title: 'End',
              className: 'icons-flex icon-al-end'
            },
            {
              value: 'stretch',
              title: 'Stretch',
              className: 'icons-flex icon-al-str'
            },
            {
              value: 'center',
              title: 'Center',
              className: 'icons-flex icon-al-center'
            }
          ]
        },
        {
          property: 'gap',
          type: 'composite',
          properties: [
            {
              property: 'row-gap',
              type: 'integer',
              units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
              min: 0,
              default: '0'
            },
            {
              property: 'column-gap',
              type: 'integer',
              units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
              min: 0,
              default: '0'
            }
          ]
        },
        { extend: 'flex-wrap' },
        { extend: 'align-content' },
        { extend: 'align-self' },
        { extend: 'order' },
        {
          property: 'flex',
          type: 'composite',
          properties: [
            { type: 'integer', property: 'flex-grow', default: '0', min: 0 },
            { type: 'integer', property: 'flex-shrink', default: '0', min: 0 },
            {
              type: 'integer',
              property: 'flex-basis',
              fixedValues: ['auto'],
              default: 'auto',
              units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
              min: 0
            }
          ]
        },
        'background'
      ]
    },
    {
      id: 'size',
      name: 'Size',
      properties: [
        { extend: 'width' },
        { extend: 'min-width' },
        { extend: 'max-width' },
        { extend: 'height' },
        { extend: 'min-height' },
        { extend: 'max-height' }
      ]
    },
    {
      id: 'space',
      name: 'Space',
      properties: [
        { extend: 'padding', detached: true },
        { extend: 'margin', detached: true }
      ]
    },
    {
      id: 'position',
      name: 'Position',
      properties: [
        { extend: 'top' },
        { extend: 'right' },
        { extend: 'bottom' },
        { extend: 'left' },
        { extend: 'z-index', type: 'integer', default: '0' }
      ]
    },
    {
      id: 'typography',
      name: 'Typography',
      properties: [
        { extend: 'font-family' },
        { extend: 'color' },
        { extend: 'font-size' },
        { extend: 'font-weight' },
        { extend: 'line-height', min: 0 },
        { extend: 'letter-spacing' },
        { extend: 'text-align' },
        {
          extend: 'text-decoration',
          type: 'select',
          default: 'none',
          options: [
            { id: 'none', label: 'None' },
            { id: 'underline', label: 'Underline' },
            { id: 'overline', label: 'Overline' },
            { id: 'line-through', label: 'Line through' }
          ]
        },
        {
          extend: 'text-transform',
          type: 'select',
          default: 'none',
          options: [
            { id: 'none', label: 'None' },
            { id: 'capitalize', label: 'Capitalize' },
            { id: 'uppercase', label: 'Uppercase' },
            { id: 'lowercase', label: 'Lowercase' }
          ]
        },
        {
          extend: 'direction',
          type: 'radio',
          default: 'ltr',
          options: [
            { id: 'ltr', label: 'LTR' },
            { id: 'rtl', label: 'RTL' }
          ]
        },
        {
          extend: 'white-space',
          type: 'select',
          default: 'normal',
          options: [
            { id: 'normal', label: 'Normal' },
            { id: 'nowrap', label: 'No wrap' },
            { id: 'pre', label: 'Pre' },
            { id: 'pre-wrap', label: 'Pre wrap' },
            { id: 'pre-line', label: 'Pre line' },
            { id: 'break-spaces', label: 'Break spaces' }
          ]
        }
      ]
    },
    {
      id: 'borders',
      name: 'Borders',
      properties: ['border-radius', { extend: 'border' }]
    },
    {
      id: 'effects',
      name: 'Effects',
      properties: [
        {
          property: 'opacity',
          type: 'integer',
          min: 0,
          max: 100,
          default: '100',
          units: ['%']
        },
        {
          property: 'mix-blend-mode',
          type: 'select',
          default: 'normal',
          options: [
            { id: 'normal', label: 'Normal' },
            { id: 'multiply', label: 'Multiply' },
            { id: 'screen', label: 'Screen' },
            { id: 'overlay', label: 'Overlay' },
            { id: 'darken', label: 'Darken' },
            { id: 'lighten', label: 'Lighten' },
            { id: 'color-dodge', label: 'Color dodge' },
            { id: 'color-burn', label: 'Color burn' },
            { id: 'hard-light', label: 'Hard light' },
            { id: 'soft-light', label: 'Soft light' },
            { id: 'difference', label: 'Difference' },
            { id: 'exclusion', label: 'Exclusion' },
            { id: 'hue', label: 'Hue' },
            { id: 'saturation', label: 'Saturation' },
            { id: 'color', label: 'Color' },
            { id: 'luminosity', label: 'Luminosity' }
          ]
        },
        { extend: 'cursor' },
        {
          property: 'overflow',
          type: 'composite',
          properties: [
            {
              property: 'overflow-x',
              type: 'select',
              units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
              options: [
                { id: 'visible' },
                { id: 'hidden' },
                { id: 'scroll' },
                { id: 'auto' }
              ],
              default: 'visible'
            },
            {
              property: 'overflow-y',
              type: 'select',
              units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
              options: [
                { id: 'visible' },
                { id: 'hidden' },
                { id: 'scroll' },
                { id: 'auto' }
              ],
              default: 'visible'
            }
          ]
        },
        { extend: 'box-shadow' },
        { extend: 'text-shadow' },
        {
          property: 'filter',
          type: 'stack',
          layerSeparator: ' ',
          properties: [
            {
              property: 'filter-name',
              type: 'select',
              default: 'blur',
              options: [
                {
                  id: 'blur',
                  label: 'Blur',
                  min: 0,
                  units: ['px', 'em', 'rem', 'vw', 'vh']
                },
                { id: 'brightness', label: 'Brightness', min: 0, units: ['%'] },
                { id: 'contrast', label: 'Contrast', min: 0, units: ['%'] },
                {
                  id: 'grayscale',
                  label: 'Grayscale',
                  min: 0,
                  max: 100,
                  units: ['%']
                },
                {
                  id: 'hue-rotate',
                  label: 'Hue rotate',
                  min: 0,
                  max: 360,
                  units: ['deg', 'rad', 'grad']
                },
                {
                  id: 'invert',
                  label: 'Invert',
                  min: 0,
                  max: 100,
                  units: ['%']
                },
                { id: 'saturate', label: 'Saturate', min: 0, units: ['%'] },
                { id: 'sepia', label: 'Sepia', min: 0, max: 100, units: ['%'] }
              ]
            },
            { property: 'filter-value', type: 'integer' }
          ]
        },
        {
          property: 'backdrop-filter',
          type: 'stack',
          layerSeparator: ' ',
          properties: [
            {
              property: 'backdrop-filter-name',
              type: 'select',
              default: 'blur',
              options: [
                {
                  id: 'blur',
                  label: 'Blur',
                  min: 0,
                  units: ['px', 'em', 'rem', 'vw', 'vh']
                },
                { id: 'brightness', label: 'Brightness', min: 0, units: ['%'] },
                { id: 'contrast', label: 'Contrast', min: 0, units: ['%'] },
                {
                  id: 'grayscale',
                  label: 'Grayscale',
                  min: 0,
                  max: 100,
                  units: ['%']
                },
                {
                  id: 'hue-rotate',
                  label: 'Hue rotate',
                  min: 0,
                  max: 360,
                  units: ['deg', 'rad', 'grad']
                },
                {
                  id: 'invert',
                  label: 'Invert',
                  min: 0,
                  max: 100,
                  units: ['%']
                },
                { id: 'saturate', label: 'Saturate', min: 0, units: ['%'] },
                { id: 'sepia', label: 'Sepia', min: 0, max: 100, units: ['%'] }
              ]
            },
            { property: 'backdrop-filter-value', type: 'integer' }
          ]
        },
        {
          property: 'transition',
          type: 'stack',
          properties: [
            {
              property: 'transition-property',
              type: 'select',
              default: 'opacity',
              options: [
                { id: 'width', label: 'Width' },
                { id: 'height', label: 'Height' },
                { id: 'min-width', label: 'Min Width' },
                { id: 'min-height', label: 'Min Height' },
                { id: 'max-width', label: 'Max Width' },
                { id: 'max-height', label: 'Max Height' },
                { id: 'padding', label: 'Padding' },
                { id: 'margin', label: 'Margin' },
                { id: 'color', label: 'Color' },
                { id: 'font-size', label: 'Font Size' },
                { id: 'line-height', label: 'Line Height' },
                { id: 'letter-height', label: 'Letter Height' },
                { id: 'border', label: 'Border' },
                { id: 'border-radius', label: 'Border Radius' },
                { id: 'background', label: 'Background' },
                { id: 'opacity', label: 'Opacity' },
                { id: 'box-shadow', label: 'Box Shadow' },
                { id: 'text-shadow', label: 'Text Shadow' },
                { id: 'filter', label: 'Filter' },
                { id: 'backdrop-filter', label: 'Backdrop Filter' },
                { id: 'transform', label: 'Transform' },
                { id: 'all', label: 'All' }
              ]
            },
            {
              property: 'transition-duration',
              type: 'integer',
              default: '1s',
              unit: 's',
              units: ['s', 'ms'],
              min: 0
            },
            {
              property: 'transition-timing-function',
              type: 'select',
              default: 'ease',
              options: [
                { id: 'ease', label: 'Ease' },
                { id: 'ease-in', label: 'Ease-In' },
                { id: 'ease-in-out', label: 'Ease-In-Out' },
                { id: 'ease-out', label: 'Ease-Out' },
                { id: 'linear', label: 'Linear' }
              ]
            },
            {
              property: 'transition-delay',
              type: 'integer',
              default: '0s',
              unit: 's',
              units: ['s', 'ms']
            }
          ]
        },
        {
          property: 'transform',
          type: 'stack',
          layerSeparator: ' ',
          properties: [
            {
              property: 'transform-name',
              type: 'select',
              default: 'translateX',
              options: [
                {
                  id: 'translateX',
                  label: 'Move X',
                  units: ['px', '%', 'em', 'rem', 'vw', 'vh']
                },
                {
                  id: 'translateY',
                  label: 'Move Y',
                  units: ['px', '%', 'em', 'rem', 'vw', 'vh']
                },
                {
                  id: 'translateZ',
                  label: 'Move Z',
                  units: ['px', '%', 'em', 'rem', 'vw', 'vh']
                },
                {
                  id: 'rotateX',
                  label: 'Rotate X',
                  units: ['deg', 'rad', 'grad']
                },
                {
                  id: 'rotateY',
                  label: 'Rotate Y',
                  units: ['deg', 'rad', 'grad']
                },
                {
                  id: 'rotateZ',
                  label: 'Rotate Z',
                  units: ['deg', 'rad', 'grad']
                },
                { id: 'scale', label: 'Scale', units: ['%'] },
                { id: 'scaleX', label: 'Scale X', units: ['%'] },
                { id: 'scaleY', label: 'Scale Y', units: ['%'] },
                { id: 'scaleZ', label: 'Scale Z', units: ['%'] },
                { id: 'skewX', label: 'Skew X', units: ['deg', 'rad', 'grad'] },
                { id: 'skewY', label: 'Skew Y', units: ['deg', 'rad', 'grad'] }
              ]
            },
            { property: 'transform-value', type: 'integer', default: '0' }
          ]
        },
        {
          property: 'transform-origin',
          type: 'composite',
          properties: [
            {
              property: 'transform-origin-x',
              type: 'integer',
              units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
              default: '50%'
            },
            {
              property: 'transform-origin-y',
              type: 'integer',
              units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
              default: '50%'
            }
          ]
        },
        {
          property: 'backface-visibility',
          type: 'radio',
          default: 'visible',
          options: [
            { id: 'visible', label: 'Visible' },
            { id: 'hidden', label: 'Hidden' }
          ]
        },
        {
          property: 'perspective',
          type: 'integer',
          min: 0,
          default: 'none',
          units: ['px', '%', 'em', 'rem', 'vw', 'vh']
        },
        {
          property: 'perspective-origin',
          type: 'composite',
          properties: [
            {
              property: 'perspective-origin-x',
              type: 'integer',
              units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
              default: '50%'
            },
            {
              property: 'perspective-origin-y',
              type: 'integer',
              units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
              default: '50%'
            }
          ]
        },
        {
          property: 'transform-style',
          type: 'radio',
          default: 'flat',
          options: [
            { id: 'flat', label: '2D' },
            { id: 'preserve-3d', label: '3D' }
          ]
        }
      ]
    }
  ]
}
