import { defineConfig, mergeConfigs, presetAttributify, presetIcons, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import { unoConfig } from '@vue/devtools-ui/theme'

export default defineConfig(mergeConfigs([unoConfig, {
  transformers: [transformerVariantGroup(), transformerDirectives()],
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      prefix: ['i-', ''],
      collections: {},
      cdn: 'https://esm.sh/',
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  theme: {
    fontFamily: {
      'state-field': 'Roboto Mono, Menlo, Consolas, monospace',
    },
  },
  variants: [
    {
      name: '@active',
      match(matcher) {
        if (!matcher.startsWith('@active'))
          return matcher

        return {
          matcher: matcher.slice(8),
          selector: s => `${s}.active`,
        }
      },
    },
  ],
  shortcuts: [{
    // general
    'bg-base': 'bg-white dark:bg-black',
    'text-base': 'text-black dark:text-white',
    'bg-active': 'bg-gray:5',
    'border-base': 'border-gray/20',
    'transition-base': 'transition-all duration-200',

    // selective list
    'selectable-item': 'flex items-center px-2 py-1 rounded cursor-pointer hover:bg-primary-200 dark:(hover:bg-gray-800) @active:(text-white bg-primary-600 hover:(text-white bg-primary-600))',

    // state
    'string-state-type': 'text-#e74c3c dark:(text-#c41a16)',
    'literal-state-type': 'text-#03c dark:(text-#997fff)',
    'boolean-state-type': 'text-#27ae60 dark:(text-#abebc6)',
  }, [/^theme-card-(\w+)$/, $ => `p2 flex gap2 border border-base bg-base items-center rounded min-w-40 min-h-25 justify-center transition-all saturate-0 op50 shadow hover:(op100 bg-${$[1]}/10 text-${$[1]}6 saturate-100)`]],
  safelist: [
    'string-state-type',
    'literal-state-type',
    'boolean-state-type',
  ],
}])) as any