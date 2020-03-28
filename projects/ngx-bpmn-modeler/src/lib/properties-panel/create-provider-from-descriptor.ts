import inherits from 'inherits';

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

import { createGeneralTabGroups } from './create-general-tab-groups';
import { loadPropertiesFromDescriptor } from './load-properties-from-descriptor';

// tslint:disable-next-line: no-unused-expression
export function createPropertiesProviderFromDescriptor(
  descriptor: any
) {

  const provider = function CustomPropertiesProvider(
    eventBus, bpmnFactory, canvas,
    elementRegistry, translate
  ) {

    PropertiesActivator.call(this, eventBus);

    this.getTabs = function(element) {

      const customGroup = {
        id: descriptor.id,
        label: descriptor.label,
        entries: []
      };

      loadPropertiesFromDescriptor(customGroup, element, descriptor);

      // Show general + custom tab
      return [
        {
          id: 'general',
          label: 'General',
          groups: createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
        },
        {
          id: descriptor.id,
          label: descriptor.label,
          groups: [
            customGroup
          ]
        }
      ];
    };
  };

  inherits(provider, PropertiesActivator);

  return provider;
}
