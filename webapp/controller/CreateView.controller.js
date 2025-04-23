sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "./BaseController",
   "../Validator/validator",
    "sap/m/MessageBox"
], (Controller, BaseController,validator, MessageBox) => {
    "use strict";

    return Controller.extend("app.dominicstevevazs08.controller.CreateView", {
        onInit() {
            let oView = this.getView();
            let fieldIds = ["idLocIdCr", "idLocDescCr", "idResAllocCr", "idTotcostCr", "idRepPossCr", "idDrillsCr", "idTypeCr"];
 
            fieldIds.forEach(fieldId => {
                oView.byId(fieldId).attachChange(this.onSetNone, this);
            });
        },

        onToMining: function(){
            var oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteMiningDetailsView")
        },
        onSetNone:function(oEvent){
            oEvent.getSource().setValueState("None")
        },
        _clearFields: function () {
            let oView = this.getView();
            ["idLocIdCr", "idLocDescCr", "idResAllocCr", "idTotcostCr", "idRepPossCr", "idDrillsCr", "idTypeCr"].forEach(fieldId => {
                oView.byId(fieldId).setValue("");
                oView.byId(fieldId).setValueState("None");
            });
        },
       
        onSubmit: function(){

            //PAYLOAD
            let oLocId = this.getView().byId("idLocIdCr");
            let oLocDesc = this.getView().byId("idLocDescCr");
            let oResAlloc = this.getView().byId("idResAllocCr");
            let oTotCost = this.getView().byId("idTotcostCr");
            let oRepPoss = this.getView().byId("idRepPossCr");
            let oDrills = this.getView().byId("idDrillsCr");
            let oType = this.getView().byId("idTypeCr");
        
            let sLocId = oLocId.getValue();
            let sLocDesc = oLocDesc.getValue();
            let sResAlloc = oResAlloc.getValue();
            let sTotCost = oTotCost.getValue();
            let sRepPoss = oRepPoss.getValue();
            let sDrills = oDrills.getValue();
            let sType = oType.getValue();

            let fields = [
                {id:"idLocIdCr", value:sLocId},
                {id:"idLocDescCr", value:sLocDesc},
                {id:"idResAllocCr", value:sResAlloc},
                {id:"idTotcostCr", value:sTotCost},
                {id:"idRepPossCr", value:sRepPoss},
                {id:"idDrillsCr", value:sDrills},
                {id:"idTypeCr", value:sType}
            ]

            let validationResult = validator.validateFields(fields);
            if (validationResult !== true) {
               validationResult.forEach(fieldId => {
                   this.getView().byId(fieldId).setValueState("Error");
               });
               return;
           }
        
            let payload= {
                "LocationId": sLocId,
                "LocationDesc": sLocDesc,
                "ResourceAllocated": sResAlloc,
                "TotalCost": sTotCost,
                "RepPossMin": sRepPoss,
                "NoOfDrills": sDrills,
                "TypeMineral": sType
            };
            //objects of the input field
            let oModel=this.getOwnerComponent().getModel()
            let entity="/MiningDataSet"

            var that= this
            oModel.create(entity, payload,{
                success:function(response){
                    MessageBox.success("record inserted",{
                        onClose:function(){
                            that._clearFields();
                            var oRouter= that.getOwnerComponent().getRouter()
                            oRouter.navTo("RouteMiningDetailsView", {}, true)
                           
                        }.bind(this)
                    })
                },
                error:function(error){
                    MessageBox.error("record failed")
                }
            })
            //1. get the model
            //2. we need the entity
            //3. method(theEntity, payload{succ, error})
        },
       





    });
});