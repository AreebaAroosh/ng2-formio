"use strict";
var _this = this;
var forms_1 = require('@angular/forms');
var columns_1 = require('./columns');
var bootstrap_templates_1 = require('../../templates/bootstrap.templates');
var index_1 = require('../index');
var formio_components_component_1 = require('../../formio-components.component');
var formio_component_component_1 = require('../../formio-component.component');
var formio_events_1 = require('../../formio.events');
var input_1 = require('../../fixtures/fields/input');
describe('ColumnsComponent', function () {
    beforeEach(function () {
        index_1.RegisterComponents(bootstrap_templates_1.FORMIO_BOOTSTRAP);
        _this.form = new forms_1.FormGroup({});
        _this.events = new formio_events_1.FormioEvents();
    });
    var getSettings = function (overrides) {
        var settings = {
            "input": false,
            "columns": [{
                    "components": [input_1.INPUT('textfield', 'text', 'firstName', 'First Name')]
                }, {
                    "components": [input_1.INPUT('textfield', 'text', 'lastName', 'Last Name')]
                }],
            "type": "columns",
            "conditional": {
                "show": "",
                "when": null,
                "eq": ""
            }
        };
        Object.assign(settings, overrides);
        return settings;
    };
    it('Should create the columns control.', function () {
        var settings = getSettings({});
        var container = new columns_1.ColumnsComponent(_this.form, settings, _this.events);
        var index = 0;
        // Iterate through each column and create the component.
        settings.columns.forEach(function (column) {
            var components = new formio_components_component_1.FormioComponentsComponent();
            components.components = column.components;
            components.form = _this.form;
            column.components.forEach(function (comp) {
                index++;
                var component = new formio_component_component_1.FormioComponentComponent(_this.events);
                component.component = comp;
                component.form = _this.form;
                component.ngOnInit();
                component.form.controls[comp.key]['setValue']('Test' + index);
                component.form.controls[comp.key]['markAsDirty']();
            });
        });
        expect(_this.form.value).toEqual({ firstName: 'Test1', lastName: 'Test2' });
    });
});
//# sourceMappingURL=columns.spec.js.map