sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], (Controller,JSONModel, Filter, FilterOperator, MessageBox, Fragment) => {
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

        onF4Help: function(oEvent) {

            this.inputField = oEvent.getSource().getId();
            let oModel=this.getView().getModel("MiningDetails")
            let aData=oModel.getProperty()
            let deepCopy=JSON.parse(JSON.stringify(aData))
            let oModelFrag=new JSONModel({newMiningSet:deepCopy})
       
            if(!this.oDialog){
                this.oDialog = Fragment.load({
                    fragmentName:"app.dominicstevevazs08.fragments.popUp",
                    controller:this
                }).then((dialog)=>{
                    this.oDialog = dialog;
                    this.getView().addDependent(this.oDialog)
                    this.getView().setModel(oModelFrag, "FragmentModel")
                    this.oDialog.open();
                })
            }else{
                this.oDialog.open();
            }
        },   

        onConfirmType:function(oEvent){
 
            let oSelectedItems = oEvent.getParameter("selectedItem");
            let sValue = oSelectedItems.getProperty("title");
            let onInput = sap.ui.getCore().byId(this.inputField);
            onInput.setValue(sValue);
  
        },
 
       

        
        onFilter: function(){
            let aFilters=[]
            let sLocId=this.getView().byId("idFilterLoc").getValue()
            let sDesc=this.getView().byId("idFilterDesc").getValue()
            let sResAlocId=this.getView().byId("idFilterResAlloc").getValue()
            let sTotCost=this.getView().byId("idFilterTotCost").getValue()
            let sRepPoss=this.getView().byId("idFilterRepPoss").getValue()
            let sDrills=this.getView().byId("idFilterDrills").getValue()
            let sType=this.getView().byId("idFilterType").getValue()
            if(sLocId){
                let filterName=new Filter("LocationId", FilterOperator.Contains,sLocId)
                aFilters.push(filterName)
            }
            if(sDesc){
                let filterName=new Filter("LocationDesc", FilterOperator.Contains,sDesc)
                aFilters.push(filterName)
            }
            if(sResAlocId){
                let filterName=new Filter("ResourceAllocated", FilterOperator.Contains,sResAlocId)
                aFilters.push(filterName)
            }
            if(sTotCost){
                let filterName=new Filter("TotalCost", FilterOperator.Contains,sTotCost)
                aFilters.push(filterName)
            }
            if(sRepPoss){
                let filterName=new Filter("RepPossMin", FilterOperator.Contains,sRepPoss)
                aFilters.push(filterName)
            }
            if(sDrills){
                let filterName=new Filter("NoOfDrills", FilterOperator.Contains,sDrills)
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
        onSumma: function(){

        }












    });
});