sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/MessageBox",
], (Controller,JSONModel, Filter, FilterOperator, Sorter, MessageBox) => {
    "use strict";

    return Controller.extend("app.dominicstevevazs08.controller.AllDetailsView", {
        onInit() {
            let oRouter = this.getOwnerComponent().getRouter();
            let oRoute = oRouter.getRoute("RouteAllDetailsView");
            oRoute.attachPatternMatched(this._onPatternMatched, this);

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
       
        onToMiningDetails: function(){
            var oRouter= this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMiningDetailsView")
        },

        onFilter: function(){
            let aFilters=[]
            //let sLocId=this.getView().byId("idFilterLoc").getValue()
            let sDesc=this.getView().byId("idFilterDesc").getValue()
            //let sResAlocId=this.getView().byId("idFilterResAlloc").getValue()
            //let sTotCost=this.getView().byId("idFilterTotCost").getValue()
            //let sRepPoss=this.getView().byId("idFilterRepPoss").getValue()
            //let sDrills=this.getView().byId("idFilterDrills").getValue()
            let sType=this.getView().byId("idFilterType").getValue()
           
            if(sDesc){
                let filterName=new Filter("LocationDesc", FilterOperator.Contains,sDesc)
                aFilters.push(filterName)
            }
          
            if(sType){
                let filterName=new Filter("TypeMineral", FilterOperator.Contains,sType)
                aFilters.push(filterName)
            }

            let oTable=this.getView().byId("idMiningTab")
            let oBinding= oTable.getBinding("items")
                oBinding.filter(aFilters)

        },
        onSort: function () {
            if (!this.bDescending) {
                this.bDescending = false;
            }

            var oSorter = new Sorter("LocationId", this.bDescending);
            var oList = this.getView().byId("idMiningTab");
            var oBinding = oList.getBinding("items");
            oBinding.sort(oSorter);
            this.bDescending = !this.bDescending;
        }











    });
});