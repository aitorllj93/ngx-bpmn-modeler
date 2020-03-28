import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

export function loadPropertiesFromDescriptor(group, element, descriptor) {
  descriptor.types.forEach(
    (description) => {
      const types = [].concat(description.extends, descriptor.name);

      const options = description.properties.map(
        prop => ({
          id: prop.name,
          description: prop.description,
          label: prop.label,
          modelProperty: prop.name,
          type: prop.type,
          selectOptions: prop.selectOptions,
        })
      );

      const matches = types.some(type => is(element, type));

      if (!matches) {
        return;
      }

      options.forEach(
        option => {
          switch (option.type) {
            case 'Boolean':
              return group.entries.push(entryFactory.checkbox(option));
            case 'String':
            default:
              if (option.selectOptions) {
                return group.entries.push(entryFactory.selectBox(option));
              }
              return group.entries.push(entryFactory.textField(option));
          }
        }
      );
    }
  );
}
