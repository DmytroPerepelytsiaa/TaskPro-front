import { createFolderStructure } from 'eslint-plugin-project-structure';

export const folderStructureConfig = createFolderStructure({
  structureRoot: 'src',
  structure: [
    { ruleId: 'app_folder'},
    { ruleId: 'environments_folder' },
    { name: 'index.html' },
    { name: 'main.ts' },
    { name: 'styles.scss' },
  ],
  rules: {
    app_folder: {
      name: 'app',
      children: [
        { ruleId: 'pages_folder' },
        { ruleId: 'shared_folder'},
        { name: 'app.(component|config|routes).(ts|html|scss)' },
      ],
    },

    environments_folder: {
      name: 'environments',
      children: [
        { name: 'environment.ts' },
        { name: 'environment.prod.ts' },
      ]
    },

    pages_folder: {
      name: 'pages',
      children: [{ ruleId: 'page_module_folder' }],
    },
    
    shared_folder: {
      name: 'shared',
      children: [
        { ruleId: 'shared_module_folder' },
        { ruleId: 'validators_folder' },
        { ruleId: 'layout_folder' },
        { ruleId: 'shared_pipes_folder' },
        { ruleId: 'shared_constants_folder' },
      ],
    },

    page_module_folder: {
      name: '*',
      children: [
        { name: '{folder-name}-page.component.(ts|html|scss)' },
        { ruleId: 'components_folder' },
        { ruleId: 'directives_folder' },
        { ruleId: 'pipes_folder' },
        { ruleId: 'services_folder' },
        { ruleId: 'utils_folder' },
        { ruleId: 'models_folder' },
        { ruleId: 'constants_folder' },
        { ruleId: 'validators_folder' },
      ]
    },

    shared_module_folder: {
      name: '*',
      children: [
        { name: '{folder-name}.module.ts' },
        { name: 'index.ts' },
        { ruleId: 'components_folder' },
        { ruleId: 'directives_folder' },
        { ruleId: 'pipes_folder' },
        { ruleId: 'services_folder' },
        { ruleId: 'utils_folder' },
        { ruleId: 'models_folder' },
        { ruleId: 'constants_folder' },
        { ruleId: 'validators_folder' },
        { ruleId: 'guards_folder' },
        { ruleId: 'interceptors_folder' },
      ]
    },

    components_folder: {
      name: 'components',
      children: [
        { name: 'index.ts' },
        { ruleId: 'component_folder' },
      ]
    },

    component_folder: {
      name: '*',
      children: [
        { name: '{folder-name}.component.(ts|html|scss)' },
      ]
    },

    directives_folder: {
      name: 'directives',
      children: [
        { name: 'index.ts' },
        { ruleId: 'directive_folder' },
      ]
    },

    directive_folder: {
      name: '*',
      children: [
        { name: '{folder-name}.directive.ts' },
      ]
    },

    pipes_folder: {
      name: 'pipes',
      children: [
        { name: 'index.ts' },
        { ruleId: 'pipe_folder' },
      ]
    },

    pipe_folder: {
      name: '*',
      children: [
        { name: '{folder-name}.pipe.ts' },
      ]
    },

    services_folder: {
      name: 'services',
      children: [
        { name: 'index.ts' },
        { ruleId: 'service_folder' },
      ]
    },

    service_folder: {
      name: '*',
      children: [
        { name: '{folder-name}.service.ts' },
      ]
    },

    utils_folder: {
      name: 'utils',
      children: [
        { name: 'index.ts' },
        { ruleId: 'util_folder' },
      ]
    },

    util_folder: {
      name: '*',
      children: [
        { name: '{folder-name}.util.ts' },
      ]
    },

    validators_folder: {
      name: 'validators',
      children: [
        { name: 'index.ts' },
        { ruleId: 'validator_folder' },
      ]
    },

    validator_folder: {
      name: '*',
      children: [
        { name: '{folder-name}.validator.ts' },
      ]
    },

    guards_folder: {
      name: 'guards',
      children: [
        { name: 'index.ts' },
        { ruleId: 'guard_folder' },
      ]
    },

    guard_folder: {
      name: '*',
      children: [
        { name: '{folder-name}.guard.ts' },
      ]
    },

    constants_folder: {
      name: 'constants',
      children: [
        { name: 'index.ts' },
        { name: '*.const.ts' },
      ]
    },

    models_folder: {
      name: 'models',
      children: [
        { name: 'index.ts' },
        { name: '*.model.ts'}
      ]
    },

    interceptors_folder: {
      name: 'interceptors',
      children: [
        { name: 'index.ts' },
        { name: '*.interceptor.ts'}
      ]
    },

    layout_folder: {
      name: 'layout',
      children: [
        { name: '{folder-name}.component.(ts|html|scss)' },
      ]
    },

    shared_pipes_folder: {
      name: 'pipes',
      children: [
        { name: '*.pipe.ts' },
        { name: 'index.ts'},
      ]
    },

    shared_constants_folder: {
      name: 'constants',
      children: [
        { name: '*.const.ts' },
        { name: 'index.ts' },
      ]
    }
  }
});