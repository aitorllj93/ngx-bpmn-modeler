import { moduleMetadata } from '@storybook/angular';
import { object } from '@storybook/addon-knobs';
import { NgxBpmnModelerModule } from 'projects/ngx-bpmn-modeler/src/public-api';

const myCustomPropertiesDescriptor = {
  id: 'world',
  name: 'World',
  label: 'World Properties',
  prefix: 'world',
  uri: 'http://world',
  xml: {
    tagAlias: 'lowerCase'
  },
  associations: [],
  types: [
    {
      name: 'CustomizedProcess',
      extends: [
        'bpmn:Process'
      ],
      properties: [
        {
          name: 'description',
          description: 'Description of the process',
          label : 'Description',
          isAttr: true,
          type: 'String'
        }
      ]
    },
    {
      name: 'CustomizedSequenceFlow',
      extends: [
        'bpmn:SequenceFlow'
      ],
      properties: [
        {
          name: 'description',
          description: 'Description of the sequence',
          label : 'Description',
          isAttr: true,
          type: 'String'
        }
      ]
    },
    {
      name: 'CustomizedStartEvent',
      extends: [
        'bpmn:StartEvent'
      ],
      properties: [
        {
          name: 'startEventDescription',
          description: 'Description of the start event',
          label : 'startEventDescription',
          isAttr: true,
          type: 'String'
        }
      ]
    },
    {
      name: 'CustomizedEvent',
      extends: [
        'bpmn:Event'
      ],
      properties: [
        {
          name: 'description',
          description: 'Description of the event',
          label : 'Description',
          isAttr: true,
          type: 'String'
        }
      ]
    },
  ]
};

export default {
  title: 'ngx-bpmn-modeler',
  decorators: [
    moduleMetadata({
      imports: [NgxBpmnModelerModule],
    }),
  ],
};

export const BPMNModeler = () => ({
  template: `
    <ngx-bpmn-modeler [(ngModel)]="xmlModel"
      wrapperClass="demo-wrapper"
      containerClass="demo-container"
      propertiesClass="demo-properties">
    </ngx-bpmn-modeler>
  `,
  props: {
    ngModel: object('Model', null)
  },
});

BPMNModeler.story = {
  name: 'Initial Example',
};

export const BPMNCustomPropertiesPanel = () => ({
  template: `
    <ngx-bpmn-modeler [(ngModel)]="xmlModel"
      [propertiesDescriptor]="propertiesDescriptor"
      wrapperClass="demo-wrapper"
      containerClass="demo-container"
      propertiesClass="demo-properties">
    </ngx-bpmn-modeler>
  `,
  props: {
    ngModel: object('Model', null),
    propertiesDescriptor: object('Properties Descriptor', myCustomPropertiesDescriptor)
  },

});

BPMNCustomPropertiesPanel.story = {
  name: 'Custom Properties Panel',
};
