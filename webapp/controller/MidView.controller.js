sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "./BaseController",
     "sap/m/MessageBox"
 ], (Controller, BaseController, MessageBox) => {
     "use strict";
 
     return Controller.extend("app.dominicstevevazs08.controller.MidView", {
         onInit() {
            
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
            let oRoute = oRouter.getRoute("RouteMidView");
           oRoute.attachPatternMatched(this._onPatternMatched, this);

         }, 

         onRouteMatched: function(oEvent){
            let index=oEvent.getParameter("arguments").index;
            let sPath= "MiningDetails>/" + index;
            let oView=this.getView();
            oView.bindElement(sPath);

         },
         _onPatternMatched: function() {
            this._getData();
        },


         _getData:function(){
            let enititySet = `/MiningDataSet`;
            let oModel = this.getOwnerComponent().getModel();
            oModel.read(enititySet, {
                success: (oData, response) => {
                    var oModelData = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(oModelData, "MiningDetails");
                },
                error: () => {}
            })
        },
        
         onDetailView: function(oEvent) {
            let index = this.getView().getBindingContext("MiningDetails").getPath().split("/")[1];
             this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                indexup: index
            });
        },
        onToMining: function(){
            var oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteMiningDetailsView")
        },




    });
}); 