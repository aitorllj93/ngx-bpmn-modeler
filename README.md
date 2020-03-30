
# ngx-bpmn-modeler

[![npm](https://img.shields.io/npm/v/ngx-bpmn-modeler)](https://www.npmjs.com/package/ngx-bpmn-modeler)

Angular [bpmn-js](https://bpmn.io/toolkit/bpmn-js/) component with Custom Properties Panel Support.

Implements `ControlValueAccesor`.

[Demo](https://d3v0ps.github.io/ngx-bpmn-modeler)


## Getting Started

### 1. Install packages
```sh
# bpmn-js dependencies
npm i bpmn-js bpmn-js-properties-panel diagram-js-minimap
# this package
npm i ngx-bpmn-modeler
```

### 2. Include bpmn-js stylesheets

```scss
@import '~bpmn-js/dist/assets/diagram-js';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
@import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
@import '~diagram-js-minimap/assets/diagram-js-minimap';
```

### 3. Import Module
```typescript
import { NgxBpmnModelerModule } from 'ngx-bpmn-modeler';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    NgxBpmnModelerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### 4. Include the component

```html
<ngx-bpmn-modeler [(ngModel)]="xmlModel">
</ngx-bpmn-modeler>
```

## Inputs

| name | description |
| ---- | ----------- |
| wrapperClass | Wrapper element custom CSS Class |
| containerClass | Container element custom CSS Class |
| propertiesClass | Properties Panel element custom CSS Class |
| propertiesProvider | Your custom Properties Provider. [See bpmn-js properties panel extension](https://github.com/bpmn-io/bpmn-js-examples/tree/master/properties-panel-extension) |
| propertiesDescriptor | Your custom Properties Descriptor. [See bpmn-js properties panel extension](https://github.com/bpmn-io/bpmn-js-examples/tree/master/properties-panel-extension) |
| additionalModules | Additional BPMN-js modules. |

## Tips

### Adding Custom Properties

You can see how at [bpmn-js examples](https://github.com/bpmn-io/bpmn-js-examples/tree/master/properties-panel-extension)

If your customizations are simple, you can omit `PropertiesProvider` by adding some extra fields to your `PropertiesDescriptor`.

```typescript
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
  ]
}
```
