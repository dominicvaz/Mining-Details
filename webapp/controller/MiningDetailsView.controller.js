sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (Controller, Filter, FilterOperator, Sorter) => {
    "use strict";

    return Controller.extend("app.dominicstevevazs08.controller.MiningDetailsView", {
        onInit() {
            let oRouter = this.getOwnerComponent().getRouter();
            let oRoute = oRouter.getRoute("RouteMiningDetailsView");
            oRoute.attachPatternMatched(this._onPatternMatched, this);
        },

        _onPatternMatched: function () {
            this._getData();
        },

        _getData: function () {
            let enititySet = `/MiningDataSet`;
            let oModel = this.getOwnerComponent().getModel();
            oModel.read(enititySet, {
                success: (oData, response) => {
                    var oModelData = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(oModelData, "MiningDetails");
                },
                error: () => { }
            })
        },
        onAllDetailsView: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteAllDetailsView")
        },
        onCreate: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteCreateView")
        },
        onSort: function () {
            if (!this.bDescending) {
                this.bDescending = false;
            }

            var oSorter = new Sorter("TypeMineral", this.bDescending);
            var oList = this.getView().byId("idListCtrl");
            var oBinding = oList.getBinding("items");
            oBinding.sort(oSorter);
            this.bDescending = !this.bDescending;
        },
        onSearch: function (oEvent) {
            var searchString = oEvent.getParameter("query") || oEvent.getParameter("newValue");
            var oType = new Filter("TypeMineral", FilterOperator.Contains, searchString);
            var oDesc = new Filter("LocationDesc", FilterOperator.Contains, searchString);
            var oLocId = new Filter("LocationId", FilterOperator.Contains, searchString);
            var aFilter = [oType, oDesc, oLocId];
            var mainFilter = new Filter({
                filters: aFilter,
                and: false
            });
            var oList = this.getView().byId("idListCtrl");
            var oBinding = oList.getBinding("items");
            oBinding.filter(mainFilter);
        },
        onItemSelect: function (oEvent) {
            var oList = oEvent.getParameter("listItem");
            let sPath = oList.getBindingContext("MiningDetails").getPath()
            let aItems = sPath.split("/");
            let id = aItems[aItems.length - 1];
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", {
                index: id
            });

        }









    });
});