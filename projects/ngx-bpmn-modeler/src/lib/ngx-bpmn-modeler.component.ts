import { Component, OnInit, ViewChild, ElementRef, NgZone, forwardRef, Input, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import minimapModule from 'diagram-js-minimap';

import { createPropertiesProviderFromDescriptor } from './properties-panel';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-bpmn-modeler',
  template: `
    <div [ngClass]="wrapperClass">
      <div [ngClass]="containerClass" #containerRef></div>
      <div [ngClass]="propertiesClass" #propertiesRef></div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxBpmnModelerComponent),
      multi: true
    }
  ]
})
export class NgxBpmnModelerComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @Input() propertiesProvider;
  @Input() propertiesDescriptor;
  @Input() additionalModules = [];

  @Input() wrapperClass = '';
  @Input() containerClass = '';
  @Input() propertiesClass = '';

  @Input() disabled = false;

  @ViewChild('containerRef', { static: true }) containerRef: ElementRef;
  @ViewChild('propertiesRef', { static: true }) propertiesRef: ElementRef;

  private modeler: BpmnModeler;

  private _value = '';

  constructor(
    private zone: NgZone,
  ) {}

  ngOnInit() {
    const modules = [
      propertiesPanelModule,
      minimapModule,
    ].concat(this.additionalModules);

    if (!this.propertiesDescriptor) {
      this.propertiesDescriptor = {
        id: 'app',
        name: 'App',
        label: 'App Properties',
        prefix: 'app',
        uri: 'http://localhost:4200',
        xml: {
          tagAlias: 'lowerCase'
        },
        associations: [],
        types: []
      };
    }

    if (!this.propertiesProvider && this.propertiesDescriptor) {
      this.propertiesProvider = createPropertiesProviderFromDescriptor(this.propertiesDescriptor);
    }

    if (this.propertiesProvider) {
      modules.push({
        __init__: [ 'propertiesProvider' ],
        propertiesProvider: [ 'type', this.propertiesProvider ]
      });
    }

    const extensions: any = {};

    if (this.propertiesDescriptor) {
      extensions.custom = this.propertiesDescriptor;
    }

    this.modeler = new BpmnModeler({
      container: this.containerRef.nativeElement,
      propertiesPanel: {
        parent: this.propertiesRef.nativeElement,
      },
      additionalModules: modules,
      moddleExtensions: extensions
    });

    this.modeler.get('eventBus').on('commandStack.changed', () => this.saveDiagram());
  }

  ngAfterViewInit() {
    this.openDiagram(this._value);
  }

  onChange = (value: any) => {};

  onTouched = () => {};

  get value(): any {
    return this._value;
  }

  // Allows Angular to update the model.
  // Update the model and changes needed for the view here.
  writeValue(value: any): void {
    if (value !== this._value) {
      this.openDiagram(value);
    }
    this._value = value;
    this.onChange(this.value);
  }

  // Allows Angular to register a function to call when the model changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  createNewDiagram() {
    this.openDiagram();
  }

  openDiagram(xml?: string) {
    return this.zone.run(
      () => xml ?
        this.modeler.importXML(xml, err => this.onImport(err)) :
        this.modeler.createDiagram(err => this.onImport(err))
    );
  }

  saveSVG() {
    this.modeler.saveSVG();
  }

  saveDiagram() {
    this.modeler.saveXML({ format: true }, (err, xml) => {
      this._value = xml;
      this.writeValue(xml);
    });
  }

  onImport(err?: Error) {
    if (err) {
      return console.error('could not import BPMN 2.0 diagram', err);
    }
  }
}
