sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "./BaseController",
    "sap/m/MessageBox"
], (Controller, BaseController, MessageBox) => {
    "use strict";

    return Controller.extend("app.dominicstevevazs08.controller.CreateView", {
        onInit() {
        },

        onToMining: function(){
            var oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteMiningDetailsView")
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
                            var oRouter= that.getOwnerComponent().getRouter()
                            oRouter.navTo("RouteMiningDetailsView", {}, true)
                            oLocId.setValue("")
                            oLocDesc.setValue("")
                            oResAlloc.setValue("")
                            oTotCost.setValue("")
                            oRepPoss.setValue("")
                            oDrills.setValue("")
                            oType.setValue("")
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