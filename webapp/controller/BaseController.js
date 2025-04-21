sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("app.dominicstevevazs08.controller.BaseController", {
        onInit() {
            
        },
        getRouter: function(){
            return this.getOwnerComponent().getRouter();
        }


    });
});