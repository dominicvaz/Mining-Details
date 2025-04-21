sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "./BaseController",
     "sap/m/MessageBox"
 ], (Controller, BaseController, MessageBox) => {
     "use strict";
 
     return Controller.extend("app.dominicstevevazs08.controller.DetailView", {
         onInit() {
            
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
            let oRoute = oRouter.getRoute("RouteDetail");
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
        onDelete:function(oEvent){
            let oContext=oEvent.getSource().getBindingContext("MiningDetails").getObject()
            MessageBox.confirm("Are you sure?", {
                onClose:(choice)=>{
                    if(choice==='OK'){
                    this._onDeleteCall(oContext)
                    }
                }
            })
        },
        _onDeleteCall:function(parm){
            let key1= parm.LocationId
            let key2= parm.LocationDesc
            let key3= parm.ResourceAllocated
            key2=key2.replace(/ /g, "%20");
            key3=key3.replace(/ /g, "%20");
    
            let oModel=this.getOwnerComponent().getModel();
            let entity="/MiningDataSet(LocationId='"+key1+"',LocationDesc='"+key2+"',ResourceAllocated='"+key3+"')"
            oModel.remove(entity,{
                success:(resp)=>{
                    MessageBox.success("Record Deleted", {
                        onClose:function(){
                            var oRouter= this.getOwnerComponent().getRouter()
                            oRouter.navTo("RouteMiningDetailsView", {}, true)
                        }.bind(this)
                    })
                },
                error:(err)=>{
                    MessageBox.error("Deletion failed")
                }
            })
        },
        onUpdate: function(oEvent) {
            let oContext = oEvent.getSource().getBindingContext("MiningDetails").getObject();
            console.log("Context object:", oContext)
            this._onUpdateCall(oContext);
        },
        
        _onUpdateCall: function(parm) {
            let key1 = parm.LocationId;
            let key2 = parm.LocationDesc
            let key3 = parm.ResourceAllocated
            key2=key2.replace(/ /g, "%20");
            key3=key3.replace(/ /g, "%20");
        
            let oModel = this.getOwnerComponent().getModel();
            let entity = "/MiningDataSet(LocationId='" + key1 + "',LocationDesc='" + key2 + "',ResourceAllocated='" + key3 + "')";
    

            let updatedData = {
                TotalCost: parm.TotalCost,
                RepPossMin: parm.RepPossMin,
                NoOfDrills: parm.NoOfDrills,
                TypeMineral: parm.TypeMineral
            };
            console.log("Payload being sent:", updatedData);
            oModel.update(entity, updatedData, {
                method: "PATCH",
                success: (resp) => {
                    MessageBox.success("Record Updated", {
                        onClose: function() {
                            var oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("RouteMiningDetailsView", {}, true);
                        }.bind(this)
                    });
                },
                error: (err) => {
                    MessageBox.error("Update failed");
                }
            });
        },
        
         onToMining: function(){
             var oRouter=this.getOwnerComponent().getRouter()
             oRouter.navTo("RouteMiningDetailsView")
         },
        
    


    });
}); 