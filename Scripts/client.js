var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class HcmsAppLanguage {
            constructor(translateService, dbManager, hcmsLanguageChange) {
                this.translateService = translateService;
                this.dbManager = dbManager;
                this.hcmsLanguageChange = hcmsLanguageChange;
                this.restrict = 'E';
                this.scope = {};
                this.replace = true;
                this.template = `<ul class="header-dropdown-list hidden-xs ng-cloak">
                                    <li class="dropdown" dropdown>
                                        <a class="dropdown-toggle" data-toggle="dropdown" href>
                                            <img src="styles/img/blank.gif" class="flag flag-{{currentLanguage.LangShortName}}" alt="{{currentLanguage.LangShortName}}"> <span> {{currentLanguage.LangName}} </span>
                                            <i class="fa fa-angle-down"></i>
                                        </a>
                                        <ul class="dropdown-menu pull-right">
                                            <li ng-class="::{active: language==currentLanguage}" ng-repeat="language in languages">
                                                <a ng-click="selectLanguage(language)">
                                                    <img src="styles/img/blank.gif" class="flag flag-{{::language.LangShortName}}"
                                                         alt="{{::language.LangShortName}}"> {{::language.LangName}}
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                  </ul>`;
                this.link = (scope, element, $attrs) => {
                    var currentInfo = DataAccess.StartUp.CurrentLoginInfo;
                    scope.languages = [];
                    scope.currentLanguage = {};
                    this.hcmsLanguageChange.getLanguages((data) => {
                        scope.languages = data;
                        angular.forEach(data, function (value, key) {
                            if (value.LangId == currentInfo.Language.LangId) {
                                scope.currentLanguage = value;
                            }
                        });
                    });
                    scope.selectLanguage = (language) => {
                        scope.currentLanguage = language;
                        DataAccess.StartUp.ChangeLanguage(language, this.translateService);
                    };
                };
            }
            static Factory() {
                var directive = (translateService, dbManager, hcmsLanguageChange) => new HcmsAppLanguage(translateService, dbManager, hcmsLanguageChange);
                //directive's injection list
                directive.$inject = ["translateService", "dataManagerService", "hcmsLanguageChange"];
                return directive;
            }
        }
        DataAccess.HcmsAppLanguage = HcmsAppLanguage;
        DataAccess.hcmsDataAccess.directive('hcmsAppLanguage', HcmsAppLanguage.Factory());
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class HcmsLanguageChange {
            constructor(dbManager) {
                this.dbManager = dbManager;
                this.getLanguage = (key, callBack) => {
                    this.dbManager.Get('Lookups', 'GetDetails', "?table=SystemLanguages&id=" + key, (response) => {
                        if (callBack) {
                            callBack(response.data);
                        }
                    }, () => {
                        if (callBack) {
                            callBack([]);
                        }
                    });
                };
                this.getLanguages = (callBack) => {
                    this.dbManager.Get('Lookups', 'GetAll', "?table=SystemLanguages", (response) => {
                        //vm.subForms = response.data;
                        if (callBack) {
                            callBack(response.data);
                        }
                    }, () => {
                        if (callBack) {
                            callBack([]);
                        }
                    });
                };
            }
        }
        HcmsLanguageChange.$inject = ['dataManagerService'];
        DataAccess.HcmsLanguageChange = HcmsLanguageChange;
        //hcmsDataAccess.service('translateService', TranslateService);
        DataAccess.hcmsDataAccess.service('hcmsLanguageChange', ['dataManagerService', function (dataManagerService) {
                return new HcmsLanguageChange(dataManagerService);
            }]);
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceDayTypes {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.getAll = () => {
                    let quesryString = "";
                    return this.dbManager.GetPromise("AttendanceDayTypes", "GetAll", quesryString);
                };
            }
        }
        Forms.AttendanceDayTypes = AttendanceDayTypes;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        //export interface ISelectedViewSetup {
        //    viewSetup: Models.SystemFormView;
        //    viewFields: Models.SystemFormViewField[];
        //}
        class CancelEventArgs {
            constructor(data, cancel) {
                this.data = data;
                this.cancel = cancel;
            }
        }
        Forms.CancelEventArgs = CancelEventArgs;
        class CancelEventData {
            constructor() {
                this.handlers = [];
                this.expose = () => {
                    return this;
                };
            }
            addHandler(handler) {
                this.handlers.push(handler);
            }
            RemoveHandler(handler) {
                this.handlers = this.handlers.filter(h => h !== handler);
            }
            trigger(e) {
                if (this.handlers.length > 0)
                    this.handlers.slice(0).forEach(h => h(e));
            }
        }
        Forms.CancelEventData = CancelEventData;
        class EventArgs {
            constructor(data) {
                this.data = data;
            }
        }
        Forms.EventArgs = EventArgs;
        class EventData {
            constructor() {
                this.handlers = [];
                this.expose = () => {
                    return this;
                };
            }
            addHandler(handler) {
                this.handlers.push(handler);
            }
            RemoveHandler(handler) {
                this.handlers = this.handlers.filter(h => h !== handler);
            }
            trigger(e) {
                if (this.handlers.length > 0)
                    this.handlers.slice(0).forEach(h => h(e));
            }
        }
        Forms.EventData = EventData;
        class BaseFormManager {
            constructor(translator, dbManager, formId) {
                this.translator = translator;
                this.dbManager = dbManager;
                //Events
                this.onAdding = new CancelEventData();
                this.onUpdating = new CancelEventData();
                this.onDeleting = new CancelEventData();
                this.onAdded = new EventData();
                this.onUpdated = new EventData();
                this.onDeleted = new EventData();
                this.onEditClicked = new EventData();
                this.onCreateNewClicked = new EventData();
                //===============
                this.onSelectClicked = new EventData();
                this.displayCreateNewTemplate = false;
                this.displayEditTemplate = false;
                this.displayDetailsTemplate = false;
                this.dataList = [];
                this.dataItem = {};
                this.selectedViewSetup = new HCMS.Models.CreateView();
                this.translateText = (text, viewId, param) => {
                    return this.translator.Translate(text, viewId, param);
                };
                //Click Edit Link 
                this.editClicked = (item) => {
                    var currentObject = this;
                    currentObject.selectedViewSetup = currentObject.FormSetup.MyForm.EditView;
                    var id = currentObject.GetIdValue(item);
                    currentObject.FormData.GetDataItem(id, (data) => {
                        currentObject.dataItem = data;
                        currentObject.DisplayEditView();
                        //onEditClicked
                        var e = new EventArgs(data);
                        currentObject.onEditClicked.trigger(e);
                        //currentObject.generalFormService.setSelectedParent(generalForm.getKeyField(), generalForm.dataItem);
                    });
                };
                this.deleteClicked = (item) => {
                    //onDeleting
                    var cancel = false;
                    var cancelE = new CancelEventArgs(item, cancel);
                    this.onDeleting.trigger(cancelE);
                    if (cancelE.cancel == true)
                        return;
                    //----
                    //var currentObject = this;
                    this.selectedViewSetup = this.FormSetup.MyForm.EditView;
                    var id = this.GetIdValue(item);
                    var currentEditId = this.GetIdValue(this.dataItem);
                    this.FormData.DeleteData(id, item, () => {
                        if (currentEditId === id) {
                            this.DisplayIndexView();
                        }
                        //onDeleted
                        var e = new EventArgs(item);
                        this.onDeleted.trigger(e);
                        //currentObject.getDataList();
                    });
                };
                this.selectClicked = (item) => {
                    var currentObject = this;
                    currentObject.selectedViewSetup = currentObject.FormSetup.MyForm.EditView;
                    var id = currentObject.GetIdValue(item);
                    currentObject.FormData.GetDataItem(id, function (data) {
                        currentObject.dataItem = data;
                        currentObject.DisplayEditView();
                        //onSelectClicked
                        var e = new EventArgs(data);
                        currentObject.onSelectClicked.trigger(e);
                    });
                };
                this.saveItem = (valid) => {
                    this.FormData.dataItem = this.dataItem;
                    if (this.displayCreateNewTemplate === true) {
                        //onAdding
                        var cancel = false;
                        var cancelE = new CancelEventArgs(this.dataItem, cancel);
                        this.onAdding.trigger(cancelE);
                        if (cancelE.cancel == true)
                            return;
                        //----
                        this.FormData.AddData(valid, (data) => {
                            //this.FormData.GetDataList((data) => {
                            //    this.dataList = data;
                            //onAdded
                            var e = new EventArgs(data);
                            this.onAdded.trigger(e);
                            //});
                        });
                    }
                    else {
                        //onUpdating
                        var cancel = false;
                        var cancelE = new CancelEventArgs(this.dataItem, cancel);
                        this.onUpdating.trigger(cancelE);
                        if (cancelE.cancel == true)
                            return;
                        //----
                        var id = this.GetIdValue(this.dataItem);
                        this.FormData.UpdateData(valid, id, () => {
                            //this.FormData.GetDataList((data) => {
                            //    this.dataList = data;
                            //onUpdated
                            var e = new EventArgs(this.dataItem);
                            this.onUpdated.trigger(e);
                            //});
                        });
                    }
                };
                //set login Info
                var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                //if (currentInfo == null) {
                //    currentInfo = new DataAccess.CurrentLoginInfo(dbManager);
                //    var currentUser = angular.fromJson(sessionStorage['user']);
                //    currentInfo.SetLoginInfo({ UserId: currentUser.userId, LangId: currentUser.langId, DatabaseProfileId: currentUser.databaseProfileId, CompanyId: currentUser.companyId });
                //    DataAccess.StartUp.SetCurrentLoginInfo(currentInfo);
                //}
                this.smartAlert = new HCMS.Controls.SmartAlert();
                //set parameters
                this.formId = formId; //$stateParams["formId"];
                //this.apiController = $stateParams["apiController"];
                this.selectedViewSetup.ViewId = 0;
                this.FormSetup = new Forms.BaseFormSetup(translator, dbManager, currentInfo.User.UserId, this.formId);
                this.grid = this.FormSetup.MyForm.IndexView.GridSetup.MyGrid;
            }
            get OnAdding() { return this.onAdding.expose(); }
            get OnUpdating() { return this.onUpdating.expose(); }
            get OnDeleting() { return this.onDeleting.expose(); }
            get OnAdded() { return this.onAdded.expose(); }
            get OnUpdated() { return this.onUpdated.expose(); }
            get OnDeleted() { return this.onDeleted.expose(); }
            get OnEditClicked() { return this.onEditClicked.expose(); }
            get OnCreateNewClicked() { return this.onCreateNewClicked.expose(); }
            get OnSelectClicked() { return this.onSelectClicked.expose(); }
            getIdFieldName(viewFields) {
                //set primaryField to gridOptions Object to access in every row
                for (var prop in viewFields) {
                    if (viewFields[prop].IsPrimary === true) {
                        return viewFields[prop].FieldName;
                    }
                }
                return '';
            }
            GetIdValue(rowData, view) {
                if (view == null) {
                    view = this.selectedViewSetup;
                }
                return rowData[this.getIdFieldName(view.ViewFields)];
            }
            //Click CreateNew Link
            DisplayAddView(callback) {
                this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                this.displayCreateNewTemplate = true;
                this.displayEditTemplate = false;
                this.displayDetailsTemplate = false;
                this.FormData.GetDataItem("0", (data) => {
                    this.dataItem = data;
                    var viewId = this.selectedViewSetup.ViewId;
                    var codeField = this.selectedViewSetup.TableCodeField;
                    if (!HCMS.DataAccess.Utility.IsNull(codeField)) {
                        if (codeField !== "") {
                            this.selectedViewSetup.GetNewCode(viewId, (data) => {
                                this.dataItem[codeField] = data;
                                if (angular.isDefined(callback) && callback != null) {
                                    callback();
                                }
                            });
                        }
                    }
                    else {
                        if (angular.isDefined(callback) && callback != null) {
                            callback();
                        }
                    }
                    //onCreateNewClicked
                    var e = new EventArgs(data);
                    this.onCreateNewClicked.trigger(e);
                    //currentObject.generalFormService.setSelectedParent(generalForm.getKeyField(), generalForm.dataItem);
                });
            }
            ;
            //Click Edit Link 
            DisplayEditView(callback) {
                this.selectedViewSetup = this.FormSetup.MyForm.EditView;
                this.displayCreateNewTemplate = false;
                this.displayEditTemplate = true;
                this.displayDetailsTemplate = false;
                if (angular.isDefined(callback) && callback != null) {
                    callback();
                }
            }
            ;
            //Click Details Link 
            DisplayDetailsView(callback) {
                this.selectedViewSetup = this.FormSetup.MyForm.DetailsView;
                this.displayCreateNewTemplate = false;
                this.displayEditTemplate = false;
                this.displayDetailsTemplate = true;
                if (angular.isDefined(callback) && callback != null) {
                    callback();
                }
            }
            ;
            //Click Index Link 
            DisplayIndexView(callback) {
                this.displayCreateNewTemplate = false;
                this.displayEditTemplate = false;
                if (angular.isDefined(callback) && callback != null) {
                    callback();
                }
            }
            ;
        }
        Forms.BaseFormManager = BaseFormManager;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class BaseSubFormManager extends Forms.BaseFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope.formId);
                this.onSubFormLoaded = new Forms.EventData();
                this.getDataByParent = (callback) => {
                    if (this.GetDataByParentId !== null) {
                        this.GetDataByParentId(callback);
                    }
                };
                this.beforeAdd = (e) => {
                    this.dataItem[this.parentIdFieldName] = this.parentItem[this.parentIdFieldName];
                };
                this.scope = scope;
                this.parentIdFieldName = scope.parentIdFieldName;
                this.parentItem = scope.parentItem;
                //this.loadData();
                this.FormSetup.LoadForm((form) => __awaiter(this, void 0, void 0, function* () {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.editClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    yield this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    //this.GetDataByParentId();
                    this.getDataByParent();
                    setTimeout(() => {
                        var e = new Forms.EventArgs(form);
                        this.onSubFormLoaded.trigger(e);
                    }, 500);
                }));
                this.scope.$watch(() => this.scope.parentItem[this.scope.parentIdFieldName], (newValue, oldValue) => {
                    if (oldValue !== newValue) {
                        this.parentItem[this.scope.parentIdFieldName] = newValue;
                        this.dataItem = {};
                        this.dataList = [];
                        if (this.GetDataByParentId !== null) {
                            this.GetDataByParentId();
                        }
                    }
                });
                this.scope.$watch(() => this.scope.parentIdFieldName, (newValue, oldValue) => {
                    if (oldValue !== newValue) {
                        this.parentIdFieldName = newValue;
                    }
                });
                this.OnAdding.addHandler(this.beforeAdd);
                this.OnAdded.addHandler(() => {
                    this.GetDataByParentId((data) => {
                        if (this.FormSetup.MyForm.HideViewAfterSave) {
                            this.indexItemView();
                        }
                    });
                });
                this.OnUpdated.addHandler(() => {
                    this.GetDataByParentId((data) => {
                        if (this.FormSetup.MyForm.HideViewAfterSave) {
                            this.indexItemView();
                        }
                    });
                });
                this.OnDeleted.addHandler(() => {
                    this.GetDataByParentId();
                });
            }
            get OnSubFormLoaded() { return this.onSubFormLoaded.expose(); }
            addItemView(callBack) {
                this.DisplayAddView(callBack);
            }
            editItemView() {
                this.DisplayEditView();
            }
            displayItemView() {
                this.DisplayDetailsView();
            }
            indexItemView() {
                this.DisplayIndexView();
            }
        }
        Forms.BaseSubFormManager = BaseSubFormManager;
        //hcmsForms.controller('profileContactsController', profileContactsController);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EditAttendanceHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedAttendanceProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = { selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.EditAttendanceHome = EditAttendanceHome;
        Forms.hcmsForms.controller('editAttendanceHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EditAttendanceHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EditAttendanceTransaction extends Forms.BaseSubFormManager {
            //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.header = {
                    fromDate: {
                        value: null,
                        options: { DataTypeName: 'date', ControlTypeName: 'date' }
                    },
                    toDate: {
                        value: null,
                        options: { DataTypeName: 'date', ControlTypeName: 'date' }
                    }
                };
                this.saveModifiedData = (valid) => {
                    if (!valid)
                        return;
                    try {
                        let result = this.dbManager.PostPromise("EmpAttendanceTransactions", "SaveDataEdit", "", this.dataList);
                        this.smartAlert.Alert("Saved Successfully");
                    }
                    catch (ex) {
                        this.smartAlert.Error(ex);
                    }
                };
                this.displayAttendanceTransData = () => __awaiter(this, void 0, void 0, function* () {
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    let fromDate = this.header.fromDate.value;
                    let toDate = this.header.toDate.value;
                    if (!HCMS.Validations.DateValidations.isDate(fromDate) || !HCMS.Validations.DateValidations.isDate(toDate)) {
                        return;
                    }
                    let empAssignmentId = this.parentItem['EmpAssignmentId'];
                    if (empAssignmentId === undefined || empAssignmentId === null) {
                        return;
                    }
                    fromDate = fromDate.toUTCString(); // HCMS.Validations.DateValidations.toDate(fromDate);
                    toDate = toDate.toUTCString(); // HCMS.Validations.DateValidations.toDate(toDate);
                    let queryString = `?empAssignmentId=${empAssignmentId}&fromDate=${fromDate}&toDate=${toDate}`;
                    let result = yield this.dbManager.GetPromise("EmpAttendanceTransactions", "GetDataForEdit", queryString);
                    this.dataList = result.data;
                });
                this.setEmpTimeSetter = () => {
                    let inFields = this.grid.gridColumnDefs.filter(function (o) { return o.field === "EmpTimeIn"; });
                    if (inFields.length > 0) {
                        for (var item of inFields) {
                            item.valueSetter = this.inValueSetter;
                        }
                    }
                    let outFields = this.grid.gridColumnDefs.filter(function (o) { return o.field === "EmpTimeOut"; });
                    if (outFields.length > 0) {
                        for (var item of outFields) {
                            item.valueSetter = this.outValueSetter;
                        }
                    }
                };
                this.inValueSetter = (params) => {
                    var newValue = params.newValue;
                    newValue = this.getFormattedTime(newValue);
                    var data = params.data;
                    var oldValue = data.EmpTimeIn;
                    if (oldValue === undefined || oldValue === null) {
                        oldValue = "";
                    }
                    if (oldValue !== newValue) {
                        data.IsModified = true;
                        data.EmpTimeIn = newValue;
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                this.outValueSetter = (params) => {
                    var newValue = params.newValue;
                    newValue = this.getFormattedTime(newValue);
                    var data = params.data;
                    var oldValue = data.EmpTimeOut;
                    if (oldValue === undefined || oldValue === null) {
                        oldValue = "";
                    }
                    if (oldValue !== newValue) {
                        data.IsModified = true;
                        data.EmpTimeOut = newValue;
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                this.getFormattedTime = (time) => {
                    if (time !== undefined && time !== null && time !== "") {
                        let splitStr = time.split(":");
                        let h = '00';
                        let m = '00';
                        let s = '00';
                        if (splitStr.length > 0) {
                            h = splitStr[0];
                            h = HCMS.Validations.CommonValidations.pad(h, 2);
                        }
                        if (splitStr.length > 1) {
                            m = splitStr[1];
                            m = HCMS.Validations.CommonValidations.pad(m, 2);
                        }
                        if (splitStr.length > 2) {
                            s = splitStr[2];
                            s = HCMS.Validations.CommonValidations.pad(s, 2);
                        }
                        time = `${h}:${m}:${s}`;
                    }
                    return time;
                };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                };
                this.grid.gridOptions['onGridReady'] = (params) => {
                    params.api.sizeColumnsToFit();
                };
                this.FormSetup.MyForm.IndexView.GridSetup.OnColumnOptionsLoaded.addHandler(() => {
                    this.setEmpTimeSetter();
                });
            }
        }
        Forms.EditAttendanceTransaction = EditAttendanceTransaction;
        Forms.hcmsForms.controller('editAttendanceTranController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EditAttendanceTransaction(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceCalculationPeriod {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.controllerName = "AttendanceCalculationPeriod";
                this.getCalculationPeriodByMonth = (calculationPeriodId, year, month) => {
                    if (calculationPeriodId === null || year === null || month === null)
                        return;
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&year=${year}&month=${month}`;
                    return this.dbManager.GetPromise(this.controllerName, "GetCalculationPeriodByMonth", quesryString);
                };
            }
        }
        Forms.AttendanceCalculationPeriod = AttendanceCalculationPeriod;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceMonthlyCalculation {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.controllerName = "AttendanceMonthlyDeduction";
                this.calculateMonthlyAttendance = (attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise(this.controllerName, "CalculateMonthlyAttendance", quesryString, empAssignmentIds);
                };
            }
        }
        Forms.AttendanceMonthlyCalculation = AttendanceMonthlyCalculation;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceDailyImportDay {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.getImportDayData = (fromDate, toDate, empAssignmentIds) => {
                    let queryString = `?fromDate=${fromDate}&toDate=${toDate}`;
                    return this.dbManager.PostPromise("AttendanceCalc", "GetImportData", queryString, empAssignmentIds);
                };
                this.CalcImportDay = (fromDate, toDate, empAssignmentIds) => {
                    let queryString = `?fromDate=${fromDate}&toDate=${toDate}`;
                    return this.dbManager.PostPromise("AttendanceCalc", "ImportAttendance", queryString, empAssignmentIds);
                };
                var importDayGridColumnDefs = [
                    { headerName: this.translator.Translate("EmployeeCode"), field: "EmployeeCode" },
                    { headerName: this.translator.Translate("ProfileName"), field: "ProfileName" },
                    { headerName: this.translator.Translate("TransactionDate"), field: "TransactionDate", template: "<p>{{data.TransactionDate | date:'dd/MM/yyyy'}}</p>" },
                    { headerName: this.translator.Translate("EmpTimeIn"), field: "EmpTimeIn" },
                    { headerName: this.translator.Translate("EmpTimeOut"), field: "EmpTimeOut" }
                ];
                this.importDayGrid = {
                    gridOptions: {
                        rowData: [],
                        rowSelection: 'multiple',
                        suppressRowClickSelection: true,
                        columnDefs: importDayGridColumnDefs,
                        getRowStyle: (params) => {
                            if (params.data && params.data.IsModified === true) {
                                return { background: "silver" };
                            }
                        }
                    },
                    gridColumnDefs: importDayGridColumnDefs,
                };
            }
        }
        Forms.AttendanceDailyImportDay = AttendanceDailyImportDay;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceDailyCloseDay {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.dayTypes = [];
                this.datTypeId = -1;
                this.isExternalFilterPresent = () => {
                    // if datTypeId is not 0, then we are filtering
                    return this.datTypeId != -1;
                };
                this.doesExternalFilterPass = (node) => {
                    return node.data.AttendanceDayTypeId == this.datTypeId;
                };
                this.dayTypeFilterChanged = (newValue) => {
                    this.datTypeId = newValue;
                    this.closeDayGrid.gridOptions.api.onFilterChanged();
                };
                this.applyAttendanceDayTypesColor = () => __awaiter(this, void 0, void 0, function* () {
                    var result = yield this.attendanceDayTypes.getAll();
                    this.dayTypes = result.data;
                    this.closeDayGrid.gridOptions.getRowStyle = (params) => {
                        return { background: this.getDayTypeBackColor(result.data, params.data.AttendanceDayTypeId) };
                    };
                });
                this.getDayTypeBackColor = (dayTypeList, attendanceDayTypeId) => {
                    for (var i = 0; i < dayTypeList.length; ++i) {
                        if (dayTypeList[i] !== undefined && dayTypeList[i].AttendanceDayTypeId === attendanceDayTypeId) {
                            return dayTypeList[i].AttendanceDayTypeColor;
                        }
                    }
                };
                this.getCloseDayData = (fromDate, toDate, empAssignmentIds) => {
                    let queryString = `?fromDate=${fromDate}&toDate=${toDate}`;
                    return this.dbManager.PostPromise("AttendanceCalc", "GetCloseDayData", queryString, empAssignmentIds);
                };
                this.CalcCloseDay = (fromDate, toDate, empAssignmentIds) => {
                    let queryString = `?fromDate=${fromDate}&toDate=${toDate}`;
                    return this.dbManager.PostPromise("AttendanceCalc", "CloseDayAttendance", queryString, empAssignmentIds);
                };
                this.attendanceDayTypes = new Forms.AttendanceDayTypes(dbManager, translator);
                var closeDayGridColumnDefs = [
                    { headerName: this.translator.Translate("EmployeeCode"), field: "EmployeeCode", headerCheckboxSelection: true, checkboxSelection: true },
                    { headerName: this.translator.Translate("ProfileName"), field: "ProfileName" },
                    { headerName: this.translator.Translate("AttendanceDate"), field: "AttendanceDate", template: "<p>{{data.AttendanceDate | date:'dd/MM/yyyy'}}</p>" },
                    { headerName: this.translator.Translate("CalendarDayTypeName"), field: "CalendarDayTypeName" },
                    { headerName: this.translator.Translate("AttendanceDayTypeId"), field: "AttendanceDayTypeId", hidden: true },
                    { headerName: this.translator.Translate("AttendanceDayTypeName"), field: "AttendanceDayTypeName" },
                    { headerName: this.translator.Translate("CalendarName"), field: "CalendarName" },
                    { headerName: this.translator.Translate("LocationName"), field: "LocationName" },
                    { headerName: this.translator.Translate("WorkingMinutes"), field: "WorkingMinutes" },
                    { headerName: this.translator.Translate("OverTime"), field: "OverTime" },
                    { headerName: this.translator.Translate("MorningOverTime"), field: "MorningOverTime" },
                    { headerName: this.translator.Translate("EveningOverTime"), field: "EveningOverTime" },
                    { headerName: this.translator.Translate("LateTime"), field: "LateTime" },
                    { headerName: this.translator.Translate("EarlyLeaveTime"), field: "EarlyLeaveTime" },
                    { headerName: this.translator.Translate("StatusName"), field: "StatusName" },
                ];
                this.closeDayGrid = {
                    gridOptions: {
                        rowData: [],
                        rowSelection: 'multiple',
                        suppressRowClickSelection: true,
                        columnDefs: closeDayGridColumnDefs,
                        animateRows: true,
                        enableFilter: true,
                        isExternalFilterPresent: this.isExternalFilterPresent,
                        doesExternalFilterPass: this.doesExternalFilterPass
                    },
                    gridColumnDefs: closeDayGridColumnDefs,
                };
                this.applyAttendanceDayTypesColor();
            }
        }
        Forms.AttendanceDailyCloseDay = AttendanceDailyCloseDay;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceMonthlySalary {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.getMonthlySalaryData = (attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "GetMonthlySalary", quesryString, empAssignmentIds);
                };
                this.postMonthlySalaryData = (attendanceYear, attendanceMonth, calculationPeriodId, MonthlyDeductionIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "PostMonthlySalary", quesryString, MonthlyDeductionIds);
                };
                this.unPostMonthlySalaryData = (attendanceYear, attendanceMonth, calculationPeriodId, MonthlyDeductionIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "UnPostMonthlySalary", quesryString, MonthlyDeductionIds);
                };
                var salaryGridColumnDefs = [
                    { headerName: this.translator.Translate("EmployeeCode"), field: "EmployeeCode", headerCheckboxSelection: true, checkboxSelection: true },
                    { headerName: this.translator.Translate("ProfileName"), field: "ProfileName" },
                    { headerName: this.translator.Translate("RuleTypeName"), field: "RuleTypeName" },
                    { headerName: this.translator.Translate("AttendanceYear"), field: "AttendanceYear" },
                    { headerName: this.translator.Translate("AttendanceMonth"), field: "AttendanceMonth" },
                    { headerName: this.translator.Translate("DeductionValue"), field: "DeductionValue" },
                    { headerName: this.translator.Translate("PostedValue"), field: "PostedValue" },
                    { headerName: this.translator.Translate("DeductionStatusName"), field: "DeductionStatusName" }
                ];
                this.salaryGrid = {
                    gridOptions: {
                        rowData: [],
                        rowSelection: 'multiple',
                        suppressRowClickSelection: true,
                        columnDefs: salaryGridColumnDefs,
                        //isRowSelectable: function (rowNode) {
                        //    return rowNode.data ? rowNode.data.DeductionStatusId !== 4 : false;
                        //},
                        getRowStyle: HCMS.Forms.ImportCloseDayAttendance.getPostedStyle
                    },
                    gridColumnDefs: salaryGridColumnDefs
                };
            }
        }
        Forms.AttendanceMonthlySalary = AttendanceMonthlySalary;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceMonthlyVacations {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.getMonthlyVacationData = (attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "GetMonthlyVacations", quesryString, empAssignmentIds);
                };
                this.postMonthlyVacationData = (attendanceYear, attendanceMonth, calculationPeriodId, MonthlyDeductionIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "PostMonthlyVacations", quesryString, MonthlyDeductionIds);
                };
                this.unPostMonthlyVacationData = (attendanceYear, attendanceMonth, calculationPeriodId, MonthlyDeductionIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "UnPostMonthlyVacations", quesryString, MonthlyDeductionIds);
                };
                var vacationGridColumnDefs = [
                    { headerName: this.translator.Translate("EmployeeCode"), field: "EmployeeCode", headerCheckboxSelection: true, checkboxSelection: true },
                    { headerName: this.translator.Translate("ProfileName"), field: "ProfileName" },
                    { headerName: this.translator.Translate("RuleTypeName"), field: "RuleTypeName" },
                    { headerName: this.translator.Translate("AttendanceYear"), field: "AttendanceYear" },
                    { headerName: this.translator.Translate("AttendanceMonth"), field: "AttendanceMonth" },
                    { headerName: this.translator.Translate("DeductionValue"), field: "DeductionValue" },
                    { headerName: this.translator.Translate("PostedValue"), field: "PostedValue" },
                    { headerName: this.translator.Translate("DeductionStatusName"), field: "DeductionStatusName" }
                ];
                this.vacationGrid = {
                    gridOptions: {
                        rowData: [],
                        rowSelection: 'multiple',
                        suppressRowClickSelection: true,
                        columnDefs: vacationGridColumnDefs,
                        //isRowSelectable: function (rowNode) {
                        //    return rowNode.data ? rowNode.data.DeductionStatusId !== 4 : false;
                        //},
                        getRowStyle: HCMS.Forms.ImportCloseDayAttendance.getPostedStyle
                    },
                    gridColumnDefs: vacationGridColumnDefs
                };
            }
        }
        Forms.AttendanceMonthlyVacations = AttendanceMonthlyVacations;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceMonthlyPenalties {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.getMonthlyPenaltyData = (attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "GetMonthlyPenalties", quesryString, empAssignmentIds);
                };
                this.postMonthlyPenaltyData = (attendanceYear, attendanceMonth, calculationPeriodId, monthlyDeductionIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "PostMonthlyPenalties", quesryString, monthlyDeductionIds);
                };
                this.unPostMonthlyPenaltyData = (attendanceYear, attendanceMonth, calculationPeriodId, monthlyDeductionIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "UnPostMonthlyPenalties", quesryString, monthlyDeductionIds);
                };
                var penaltyGridColumnDefs = [
                    { headerName: this.translator.Translate("EmployeeCode"), field: "EmployeeCode", headerCheckboxSelection: true, checkboxSelection: true },
                    { headerName: this.translator.Translate("ProfileName"), field: "ProfileName" },
                    { headerName: this.translator.Translate("RuleTypeName"), field: "RuleTypeName" },
                    { headerName: this.translator.Translate("AttendanceYear"), field: "AttendanceYear" },
                    { headerName: this.translator.Translate("AttendanceMonth"), field: "AttendanceMonth" },
                    { headerName: this.translator.Translate("DeductionValue"), field: "DeductionValue" },
                    { headerName: this.translator.Translate("PostedValue"), field: "PostedValue" },
                    { headerName: this.translator.Translate("DeductionStatusName"), field: "DeductionStatusName" }
                ];
                this.penaltyGrid = {
                    gridOptions: {
                        rowData: [],
                        rowSelection: 'multiple',
                        suppressRowClickSelection: true,
                        columnDefs: penaltyGridColumnDefs,
                        //isRowSelectable: function (rowNode) {
                        //    return rowNode.data ? rowNode.data.DeductionStatusId !== 4 : false;
                        //},
                        getRowStyle: HCMS.Forms.ImportCloseDayAttendance.getPostedStyle
                    },
                    gridColumnDefs: penaltyGridColumnDefs
                };
            }
        }
        Forms.AttendanceMonthlyPenalties = AttendanceMonthlyPenalties;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceMonthlyAttendance {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.getMonthlyAttendanceData = (attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "GetMonthlyAttendance", quesryString, empAssignmentIds);
                };
                this.postMonthlyAttendanceData = (attendanceYear, attendanceMonth, calculationPeriodId, monthlyDeductionIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "PostMonthlyAttendance", quesryString, monthlyDeductionIds);
                };
                this.unPostMonthlyAttendanceData = (attendanceYear, attendanceMonth, calculationPeriodId, monthlyDeductionIds) => {
                    let quesryString = `?calculationPeriodId=${calculationPeriodId}&attendanceYear=${attendanceYear}&attendanceMonth=${attendanceMonth}`;
                    return this.dbManager.PostPromise("AttendanceMonthlyDeduction", "UnPostMonthlyAttendance", quesryString, monthlyDeductionIds);
                };
                var attGridColumnDefs = [
                    { headerName: this.translator.Translate("EmployeeCode"), field: "EmployeeCode", headerCheckboxSelection: true, checkboxSelection: true },
                    { headerName: this.translator.Translate("ProfileName"), field: "ProfileName" },
                    { headerName: this.translator.Translate("RuleTypeName"), field: "RuleTypeName" },
                    { headerName: this.translator.Translate("AttendanceYear"), field: "AttendanceYear" },
                    { headerName: this.translator.Translate("AttendanceMonth"), field: "AttendanceMonth" },
                    { headerName: this.translator.Translate("DeductionValue"), field: "DeductionValue" },
                    { headerName: this.translator.Translate("PostedValue"), field: "PostedValue" },
                    { headerName: this.translator.Translate("DeductionStatusName"), field: "DeductionStatusName" }
                ];
                this.attendanceGrid = {
                    gridOptions: {
                        rowData: [],
                        rowSelection: 'multiple',
                        suppressRowClickSelection: true,
                        columnDefs: attGridColumnDefs,
                        //isRowSelectable: function (rowNode) {
                        //    return rowNode.data ? rowNode.data.DeductionStatusId !== 4 : false;
                        //},
                        getRowStyle: HCMS.Forms.ImportCloseDayAttendance.getPostedStyle
                    },
                    gridColumnDefs: attGridColumnDefs
                };
            }
        }
        Forms.AttendanceMonthlyAttendance = AttendanceMonthlyAttendance;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceDailyVacations {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.getDailyVacationData = (fromDate, toDate, empAssignmentIds) => {
                    let quesryString = `?fromDate=${fromDate}&toDate=${toDate}`;
                    return this.dbManager.PostPromise("AttendanceDailyDeduction", "GetDailyVacations", quesryString, empAssignmentIds);
                };
                this.postDailyVacationData = (dailyDeductionIds) => {
                    let quesryString = '';
                    return this.dbManager.PostPromise("AttendanceDailyDeduction", "PostDailyVacations", quesryString, dailyDeductionIds);
                };
                this.unPostDailyVacationData = (dailyDeductionIds) => {
                    let quesryString = '';
                    return this.dbManager.PostPromise("AttendanceDailyDeduction", "UnPostDailyVacations", quesryString, dailyDeductionIds);
                };
                var vacationGridColumnDefs = [
                    { headerName: this.translator.Translate("EmployeeCode"), field: "EmployeeCode", headerCheckboxSelection: true, checkboxSelection: true },
                    { headerName: this.translator.Translate("ProfileName"), field: "ProfileName" },
                    { headerName: this.translator.Translate("RuleTypeName"), field: "RuleTypeName" },
                    { headerName: this.translator.Translate("DeductionDate"), field: "DeductionDate", template: "<p>{{data.DeductionDate | date:'dd/MM/yyyy'}}</p>" },
                    { headerName: this.translator.Translate("BalanceCategoryName"), field: "BalanceCategoryName" },
                    { headerName: this.translator.Translate("DeductionValue"), field: "DeductionValue" },
                    { headerName: this.translator.Translate("PostedValue"), field: "PostedValue" },
                    { headerName: this.translator.Translate("DeductionStatusName"), field: "DeductionStatusName" }
                ];
                this.vacationGrid = {
                    gridOptions: {
                        rowData: [],
                        rowSelection: 'multiple',
                        suppressRowClickSelection: true,
                        columnDefs: vacationGridColumnDefs,
                        //isRowSelectable: function (rowNode) {
                        //    return rowNode.data ? rowNode.data.DeductionStatusId !== 4 : false;
                        //}, 
                        getRowStyle: HCMS.Forms.ImportCloseDayAttendance.getPostedStyle
                    },
                    gridColumnDefs: vacationGridColumnDefs
                };
            }
        }
        Forms.AttendanceDailyVacations = AttendanceDailyVacations;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceDailyPenalties {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.getDailyPenaltyData = (fromDate, toDate, empAssignmentIds) => {
                    let quesryString = `?fromDate=${fromDate}&toDate=${toDate}`;
                    return this.dbManager.PostPromise("AttendanceDailyDeduction", "GetDailyPenalties", quesryString, empAssignmentIds);
                };
                this.postDailyPenaltyData = (dailyDeductionIds) => {
                    let quesryString = '';
                    return this.dbManager.PostPromise("AttendanceDailyDeduction", "PostDailyPenalties", quesryString, dailyDeductionIds);
                };
                this.unPostDailyPenaltyData = (dailyDeductionIds) => {
                    let quesryString = '';
                    return this.dbManager.PostPromise("AttendanceDailyDeduction", "UnPostDailyPenalties", quesryString, dailyDeductionIds);
                };
                var penaltyGridColumnDefs = [
                    { headerName: this.translator.Translate("EmployeeCode"), field: "EmployeeCode", headerCheckboxSelection: true, checkboxSelection: true },
                    { headerName: this.translator.Translate("ProfileName"), field: "ProfileName" },
                    { headerName: this.translator.Translate("RuleTypeName"), field: "RuleTypeName" },
                    { headerName: this.translator.Translate("DeductionDate"), field: "DeductionDate", template: "<p>{{data.DeductionDate | date:'dd/MM/yyyy'}}</p>" },
                    { headerName: this.translator.Translate("PenaltyName"), field: "PenaltyName" },
                    { headerName: this.translator.Translate("DeductionValue"), field: "DeductionValue" },
                    { headerName: this.translator.Translate("PostedValue"), field: "PostedValue" },
                    { headerName: this.translator.Translate("DeductionStatusName"), field: "DeductionStatusName" }
                ];
                this.penaltyGrid = {
                    gridOptions: {
                        rowData: [],
                        rowSelection: 'multiple',
                        suppressRowClickSelection: true,
                        columnDefs: penaltyGridColumnDefs,
                        //isRowSelectable: function (rowNode) {
                        //    return rowNode.data ? rowNode.data.DeductionStatusId !== 4 : false;
                        //},
                        getRowStyle: HCMS.Forms.ImportCloseDayAttendance.getPostedStyle
                    },
                    gridColumnDefs: penaltyGridColumnDefs
                };
            }
        }
        Forms.AttendanceDailyPenalties = AttendanceDailyPenalties;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceDailyAttendance {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                //private selectPostedRows = () => {
                //    this.attendanceGrid.gridOptions.api.forEachNode(function (node) {
                //        if (node.data.DeductionStatusId === 4) {
                //            node.setSelected(true);
                //        }
                //    });
                //}
                this.getDailyAttendanceData = (fromDate, toDate, empAssignmentIds) => {
                    let quesryString = `?fromDate=${fromDate}&toDate=${toDate}`;
                    return this.dbManager.PostPromise("AttendanceDailyDeduction", "GetDailyAttendance", quesryString, empAssignmentIds);
                };
                this.postDailyAttendanceData = (dailyDeductionIds) => {
                    let quesryString = '';
                    return this.dbManager.PostPromise("AttendanceDailyDeduction", "PostDailyAttendance", quesryString, dailyDeductionIds);
                };
                this.unPostDailyAttendanceData = (dailyDeductionIds) => {
                    let quesryString = '';
                    return this.dbManager.PostPromise("AttendanceDailyDeduction", "UnPostDailyAttendance", quesryString, dailyDeductionIds);
                };
                var attGridColumnDefs = [
                    { headerName: this.translator.Translate("EmployeeCode"), field: "EmployeeCode", headerCheckboxSelection: true, checkboxSelection: true },
                    { headerName: this.translator.Translate("ProfileName"), field: "ProfileName" },
                    { headerName: this.translator.Translate("RuleTypeName"), field: "RuleTypeName" },
                    { headerName: this.translator.Translate("DeductionDate"), field: "DeductionDate", template: "<p>{{data.DeductionDate | date:'dd/MM/yyyy'}}</p>" },
                    { headerName: this.translator.Translate("AttendanceTypeName"), field: "AttendanceTypeName" },
                    { headerName: this.translator.Translate("DeductionValue"), field: "DeductionValue" },
                    { headerName: this.translator.Translate("PostedValue"), field: "PostedValue" },
                    { headerName: this.translator.Translate("DeductionStatusName"), field: "DeductionStatusName" }
                ];
                this.attendanceGrid = {
                    gridOptions: {
                        rowData: [],
                        rowSelection: 'multiple',
                        suppressRowClickSelection: true,
                        columnDefs: attGridColumnDefs,
                        //isRowSelectable: function (rowNode) {
                        //    return rowNode.data ? rowNode.data.DeductionStatusId !== 4 : false;
                        //},
                        getRowStyle: HCMS.Forms.ImportCloseDayAttendance.getPostedStyle
                        //if (params.node.rowIndex % 2 === 0) {
                        //    return { background: 'red' }
                        //}
                        //onGridReady: () => {
                        //    this.selectPostedRows();
                        //},
                    },
                    gridColumnDefs: attGridColumnDefs,
                };
            }
        }
        Forms.AttendanceDailyAttendance = AttendanceDailyAttendance;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class ImportCloseDayAttendance extends Forms.BaseFormManager {
            //private dayTypes: Array<any> = [];
            constructor(translateService, dbManager, $filter, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.translateService = translateService;
                this.$onInit = () => { };
                this.runStatus = false;
                this.stopStatus = false;
                this.showProgressStatus = false;
                this.displayDataStatus = false;
                //private importGrid: any = { gridOptions: {}, gridColumnDefs: [] };
                //private closeGrid: any = { gridOptions: {}, gridColumnDefs: [] };
                this.importData = [];
                this.closeData = [];
                this.progressId = 0;
                this.progressTypeId = 4;
                //private applyIsModifiedColor = () => {
                //    this.importGrid.gridOptions.getRowStyle = (params) => {
                //        if (params.data && params.data.IsModified === true) {
                //            return { background: "silver" };
                //        }
                //    }
                //}
                //private applyAttendanceDayTypesColor = async () => {
                //    var result = await this.attendanceDayTypes.getAll();
                //    this.dayTypes = result.data;
                //    this.grid.gridOptions.getRowStyle = (params) => {
                //        return { background: this.getDayTypeBackColor(result.data, params.data.AttendanceDayTypeId) };
                //    }
                //}
                //private getDayTypeBackColor = (dayTypeList, attendanceDayTypeId) => {
                //    for (var i = 0; i < dayTypeList.length; ++i) {
                //        if (dayTypeList[i] !== undefined && dayTypeList[i].AttendanceDayTypeId === attendanceDayTypeId) {
                //            return dayTypeList[i].AttendanceDayTypeColor;
                //        }
                //    }
                //}
                this.yearMonthPeriodChanged = (year, month, calculationPeriodId) => __awaiter(this, void 0, void 0, function* () {
                    if (year > 0 && month > 0 && calculationPeriodId > 0) {
                        let result = yield this.attendanceCalculationPeriod.getCalculationPeriodByMonth(calculationPeriodId, year, month);
                        this.dataItem.FromDate = result.data.fromDate;
                        this.dataItem.ToDate = result.data.toDate;
                    }
                });
                this.calculationPeriodChanged = (calculationPeriodId) => __awaiter(this, void 0, void 0, function* () {
                    const year = this.dataItem.PayrollYear;
                    const month = this.dataItem.PayrollMonth;
                    this.yearMonthPeriodChanged(year, month, calculationPeriodId);
                });
                this.yearChanged = (year) => __awaiter(this, void 0, void 0, function* () {
                    const calculationPeriodId = this.dataItem.CalculationPeriodId;
                    const month = this.dataItem.PayrollMonth;
                    this.yearMonthPeriodChanged(year, month, calculationPeriodId);
                });
                this.monthChanged = (month) => __awaiter(this, void 0, void 0, function* () {
                    const calculationPeriodId = this.dataItem.CalculationPeriodId;
                    const year = this.dataItem.PayrollYear;
                    this.yearMonthPeriodChanged(year, month, calculationPeriodId);
                });
                this.run = (valid) => __awaiter(this, void 0, void 0, function* () {
                    if (valid) {
                        this.progressCalcOptions.api.setProgressTypeId(Forms.ProgressTypes.ImportAttendance);
                        let progressBar = new Forms.SystemProgressBar(this.dbManager, this.translateService);
                        let progressResult = yield progressBar.getByProgressId(Forms.ProgressTypes.ImportAttendance);
                        this.progressId = progressResult.data.ProgressId;
                        this.progressCalcOptions.api.setProgressId(this.progressId);
                        this.progressCalcOptions.api.checkIfProgressRunning(this.progressCalcOptions.api.startProgress(() => {
                            this.showModal();
                            this.disableRun();
                        }), () => __awaiter(this, void 0, void 0, function* () {
                            this.progressCalcOptions.api.setProgressTypeId(Forms.ProgressTypes.CloseDayAttendance);
                            let progressBar = new Forms.SystemProgressBar(this.dbManager, this.translateService);
                            let progressResult = yield progressBar.getByProgressId(Forms.ProgressTypes.CloseDayAttendance);
                            this.progressId = progressResult.data.ProgressId;
                            this.progressCalcOptions.api.setProgressId(this.progressId);
                            this.progressCalcOptions.api.checkIfProgressRunning(this.progressCalcOptions.api.startProgress(() => {
                                this.showModal();
                                this.disableRun();
                            }), this.startCalc);
                        }));
                    }
                });
                this.startCalc = () => __awaiter(this, void 0, void 0, function* () {
                    let fromDate = this.getFromDate();
                    let toDate = this.getToDate();
                    var empAssignmentIds = this.getEmpAssignmentIds();
                    let importResult = yield this.importDayCalc(fromDate, toDate, empAssignmentIds);
                    let closeResult = yield this.closeDayCalc(fromDate, toDate, empAssignmentIds);
                });
                this.importDayCalc = (fromDate, toDate, empAssignmentIds) => __awaiter(this, void 0, void 0, function* () {
                    if (this.useImport !== true) {
                        return;
                    }
                    this.progressCalcOptions.api.setProgressTypeId(Forms.ProgressTypes.ImportAttendance);
                    try {
                        let progressBar = new Forms.SystemProgressBar(this.dbManager, this.translateService);
                        let progressResult = yield progressBar.getByProgressId(Forms.ProgressTypes.ImportAttendance);
                        this.progressId = progressResult.data.ProgressId;
                        this.progressCalcOptions.api.setProgressId(this.progressId);
                        this.progressCalcOptions.api.startProgress(() => __awaiter(this, void 0, void 0, function* () {
                            this.showModal();
                            this.disableRun();
                            let closeResult = yield this.dailyImportDay.CalcImportDay(fromDate, toDate, empAssignmentIds);
                            if (this.useCloseDay !== true) {
                                this.stopCalc();
                            }
                        }));
                    }
                    catch (err) {
                        this.stopCalc();
                    }
                });
                this.closeDayCalc = (fromDate, toDate, empAssignmentIds) => __awaiter(this, void 0, void 0, function* () {
                    if (this.useCloseDay !== true) {
                        this.stopCalc();
                        return;
                    }
                    this.progressCalcOptions.api.setProgressTypeId(Forms.ProgressTypes.CloseDayAttendance);
                    try {
                        let progressBar = new Forms.SystemProgressBar(this.dbManager, this.translateService);
                        let progressResult = yield progressBar.getByProgressId(Forms.ProgressTypes.CloseDayAttendance);
                        this.progressId = progressResult.data.ProgressId;
                        this.progressCalcOptions.api.setProgressId(this.progressId);
                        this.progressCalcOptions.api.startProgress(() => __awaiter(this, void 0, void 0, function* () {
                            this.showModal();
                            this.disableRun();
                            let closeResult = yield this.dailyCloseDay.CalcCloseDay(fromDate, toDate, empAssignmentIds);
                            this.stopCalc();
                        }));
                    }
                    catch (err) {
                        this.stopCalc();
                    }
                });
                this.showModal = () => {
                    $('#importCloseAttendanceModal').modal('show');
                };
                this.hideModal = () => {
                    $('#importCloseAttendanceModal').modal('hide');
                };
                this.stopCalc = () => {
                    this.progressCalcOptions.api.stopProgress(() => {
                        this.hideModal();
                        this.enableRun();
                    });
                };
                this.showProgress = () => {
                    this.progressCalcOptions.api.checkIfProgressRunning(() => {
                        this.showModal();
                        this.disableRun();
                    }, null);
                };
                this.enableRun = () => {
                    this.runStatus = true;
                    this.stopStatus = false;
                    this.showProgressStatus = false;
                    this.displayDataStatus = true;
                };
                this.disableRun = () => {
                    this.runStatus = false;
                    this.stopStatus = true;
                    this.showProgressStatus = true;
                    this.displayDataStatus = false;
                };
                this.getFromDate = () => {
                    let fromDate = this.dataItem.FromDate;
                    return fromDate.toUTCString();
                };
                this.getToDate = () => {
                    let toDate = this.dataItem.ToDate;
                    return toDate.toUTCString();
                };
                this.getEmpAssignmentIds = () => {
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    return empAssignmentIds;
                };
                // Display All Daily
                this.displayAllDailyData = () => __awaiter(this, void 0, void 0, function* () {
                    //var queryString = this.getCommonQueryString();
                    let fromDate = this.getFromDate();
                    let toDate = this.getToDate();
                    var empAssignmentIds = this.getEmpAssignmentIds();
                    let importResult = yield this.dailyImportDay.getImportDayData(fromDate, toDate, empAssignmentIds);
                    this.importData = importResult.data;
                    let closeResult = yield this.dailyCloseDay.getCloseDayData(fromDate, toDate, empAssignmentIds);
                    this.dataList = closeResult.data;
                    let dailyAttendanceResult = yield this.dailyAttendance.getDailyAttendanceData(fromDate, toDate, empAssignmentIds);
                    this.dailyData.attendanceDataList = dailyAttendanceResult.data;
                    let dailyPenaltyResult = yield this.dailyPenalties.getDailyPenaltyData(fromDate, toDate, empAssignmentIds);
                    this.dailyData.penaltyDataList = dailyPenaltyResult.data;
                    let dailyVacationResult = yield this.dailyVacations.getDailyVacationData(fromDate, toDate, empAssignmentIds);
                    this.dailyData.vacationDataList = dailyVacationResult.data;
                });
                // Daily ImportDay
                this.displayImportData = () => __awaiter(this, void 0, void 0, function* () {
                    let fromDate = this.getFromDate();
                    let toDate = this.getToDate();
                    var empAssignmentIds = this.getEmpAssignmentIds();
                    let importResult = yield this.dailyImportDay.getImportDayData(fromDate, toDate, empAssignmentIds);
                    this.importData = importResult.data;
                });
                // Daily CloseDay
                this.displayCloseData = () => __awaiter(this, void 0, void 0, function* () {
                    let fromDate = this.getFromDate();
                    let toDate = this.getToDate();
                    var empAssignmentIds = this.getEmpAssignmentIds();
                    let closeResult = yield this.dailyCloseDay.getCloseDayData(fromDate, toDate, empAssignmentIds);
                    this.dataList = closeResult.data;
                });
                // Daily Attendance
                this.displayAttendanceData = () => __awaiter(this, void 0, void 0, function* () {
                    let fromDate = this.dataItem.FromDate;
                    let toDate = this.dataItem.ToDate;
                    fromDate = fromDate.toUTCString();
                    toDate = toDate.toUTCString();
                    let empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    let result = yield this.dailyAttendance.getDailyAttendanceData(fromDate, toDate, empAssignmentIds);
                    this.dailyData.attendanceDataList = result.data;
                });
                this.postAttendanceData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.dailyAttendance.attendanceGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ DailyDeductionId }) => DailyDeductionId);
                    if (selectedRows.length > 0) {
                        var result = yield this.dailyAttendance.postDailyAttendanceData(selectedIds);
                        this.displayAttendanceData();
                    }
                });
                this.unPostAttendanceData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.dailyVacations.vacationGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ DailyDeductionId }) => DailyDeductionId);
                    if (selectedRows.length > 0) {
                        var result = yield this.dailyPenalties.unPostDailyPenaltyData(selectedIds);
                        this.displayAttendanceData();
                    }
                });
                // DailyPenalty
                this.displayPenaltyData = () => __awaiter(this, void 0, void 0, function* () {
                    let fromDate = this.dataItem.FromDate;
                    let toDate = this.dataItem.ToDate;
                    fromDate = fromDate.toUTCString();
                    toDate = toDate.toUTCString();
                    let empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    let result = yield this.dailyPenalties.getDailyPenaltyData(fromDate, toDate, empAssignmentIds);
                    this.dailyData.penaltyDataList = result.data;
                });
                this.postPenaltyData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.dailyPenalties.penaltyGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ DailyDeductionId }) => DailyDeductionId);
                    if (selectedRows.length > 0) {
                        var result = yield this.dailyPenalties.postDailyPenaltyData(selectedIds);
                        this.displayPenaltyData();
                    }
                });
                this.unPostPenaltyData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.dailyVacations.vacationGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ DailyDeductionId }) => DailyDeductionId);
                    if (selectedRows.length > 0) {
                        var result = yield this.dailyPenalties.unPostDailyPenaltyData(selectedIds);
                        this.displayPenaltyData();
                    }
                });
                // DailyVacation
                this.displayVacationData = () => __awaiter(this, void 0, void 0, function* () {
                    let fromDate = this.dataItem.FromDate;
                    let toDate = this.dataItem.ToDate;
                    fromDate = fromDate.toUTCString();
                    toDate = toDate.toUTCString();
                    let empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    let result = yield this.dailyVacations.getDailyVacationData(fromDate, toDate, empAssignmentIds);
                    this.dailyData.vacationDataList = result.data;
                });
                this.postVacationData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.dailyVacations.vacationGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ DailyDeductionId }) => DailyDeductionId);
                    if (selectedRows.length > 0) {
                        var result = yield this.dailyVacations.postDailyVacationData(selectedIds);
                        this.displayVacationData();
                    }
                });
                this.unPostVacationData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.dailyVacations.vacationGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ DailyDeductionId }) => DailyDeductionId);
                    if (selectedRows.length > 0) {
                        var result = yield this.dailyVacations.unPostDailyVacationData(selectedIds);
                        this.displayVacationData();
                    }
                });
                //Monthly Calculation
                this.calculateMonthlyAttendance = (isValid) => __awaiter(this, void 0, void 0, function* () {
                    if (!isValid)
                        return;
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    var result = yield this.attendanceMonthlyCalculation.calculateMonthlyAttendance(attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds);
                    let data = result.data;
                });
                // Display All Monthly
                this.displayAllMonthlyData = () => __awaiter(this, void 0, void 0, function* () {
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    let monthlyAttendanceResult = yield this.monthlyAttendance.getMonthlyAttendanceData(attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds);
                    this.monthlyData.attendanceDataList = monthlyAttendanceResult.data;
                    let monthlyPenaltyResult = yield this.monthlyPenalties.getMonthlyPenaltyData(attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds);
                    this.monthlyData.penaltyDataList = monthlyPenaltyResult.data;
                    let monthlyVacationResult = yield this.monthlyVacations.getMonthlyVacationData(attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds);
                    this.monthlyData.vacationDataList = monthlyVacationResult.data;
                    let monthlySalaryResult = yield this.monthlySalary.getMonthlySalaryData(attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds);
                    this.monthlyData.salaryDataList = monthlySalaryResult.data;
                });
                // Monthly Attendance
                this.displayMonthlyAttendanceData = () => __awaiter(this, void 0, void 0, function* () {
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    let result = yield this.monthlyAttendance.getMonthlyAttendanceData(attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds);
                    this.monthlyData.attendanceDataList = result.data;
                });
                this.postMonthlyAttendanceData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.monthlyAttendance.attendanceGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ MonthlyDeductionId }) => MonthlyDeductionId);
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    if (selectedRows.length > 0) {
                        var result = yield this.monthlyAttendance.postMonthlyAttendanceData(attendanceYear, attendanceMonth, calculationPeriodId, selectedIds);
                        this.displayMonthlyAttendanceData();
                    }
                });
                this.unPostMonthlyAttendanceData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.monthlyAttendance.attendanceGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ MonthlyDeductionId }) => MonthlyDeductionId);
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    if (selectedRows.length > 0) {
                        var result = yield this.monthlyAttendance.unPostMonthlyAttendanceData(attendanceYear, attendanceMonth, calculationPeriodId, selectedIds);
                        this.displayMonthlyAttendanceData();
                    }
                });
                // MonthlyPenalty
                this.displayMonthlyPenaltyData = () => __awaiter(this, void 0, void 0, function* () {
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    let result = yield this.monthlyPenalties.getMonthlyPenaltyData(attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds);
                    this.monthlyData.penaltyDataList = result.data;
                });
                this.postMonthlyPenaltyData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.monthlyPenalties.penaltyGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ MonthlyDeductionId }) => MonthlyDeductionId);
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    if (selectedRows.length > 0) {
                        var result = yield this.monthlyPenalties.postMonthlyPenaltyData(attendanceYear, attendanceMonth, calculationPeriodId, selectedIds);
                        this.displayMonthlyPenaltyData();
                    }
                });
                this.unPostMonthlyPenaltyData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.monthlyPenalties.penaltyGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ MonthlyDeductionId }) => MonthlyDeductionId);
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    if (selectedRows.length > 0) {
                        var result = yield this.monthlyPenalties.unPostMonthlyPenaltyData(attendanceYear, attendanceMonth, calculationPeriodId, selectedIds);
                        this.displayMonthlyPenaltyData();
                    }
                });
                // MonthlyVacation
                this.displayMonthlyVacationData = () => __awaiter(this, void 0, void 0, function* () {
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    let result = yield this.monthlyVacations.getMonthlyVacationData(attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds);
                    this.monthlyData.vacationDataList = result.data;
                });
                this.postMonthlyVacationData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.monthlyVacations.vacationGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ MonthlyDeductionId }) => MonthlyDeductionId);
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    if (selectedRows.length > 0) {
                        var result = yield this.monthlyVacations.postMonthlyVacationData(attendanceYear, attendanceMonth, calculationPeriodId, selectedIds);
                        this.displayMonthlyVacationData();
                    }
                });
                this.unPostMonthlyVacationData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.monthlyVacations.vacationGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ MonthlyDeductionId }) => MonthlyDeductionId);
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    if (selectedRows.length > 0) {
                        var result = yield this.monthlyVacations.unPostMonthlyVacationData(attendanceYear, attendanceMonth, calculationPeriodId, selectedIds);
                        this.displayMonthlyVacationData();
                    }
                });
                // MonthlySalary
                this.displayMonthlySalaryData = () => __awaiter(this, void 0, void 0, function* () {
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    let result = yield this.monthlySalary.getMonthlySalaryData(attendanceYear, attendanceMonth, calculationPeriodId, empAssignmentIds);
                    this.monthlyData.salaryDataList = result.data;
                });
                this.postMonthlySalaryData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.monthlySalary.salaryGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ MonthlyDeductionId }) => MonthlyDeductionId);
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    if (selectedRows.length > 0) {
                        var result = yield this.monthlySalary.postMonthlySalaryData(attendanceYear, attendanceMonth, calculationPeriodId, selectedIds);
                        this.displayMonthlySalaryData();
                    }
                });
                this.unPostMonthlySalaryData = () => __awaiter(this, void 0, void 0, function* () {
                    var selectedRows = this.monthlySalary.salaryGrid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ MonthlyDeductionId }) => MonthlyDeductionId);
                    let attendanceYear = this.dataItem.PayrollYear;
                    let attendanceMonth = this.dataItem.PayrollMonth;
                    let calculationPeriodId = this.dataItem.CalculationPeriodId;
                    if (selectedRows.length > 0) {
                        var result = yield this.monthlySalary.unPostMonthlySalaryData(attendanceYear, attendanceMonth, calculationPeriodId, selectedIds);
                        this.displayMonthlySalaryData();
                    }
                });
                this.dailyImportDay = new Forms.AttendanceDailyImportDay(dbManager, translateService);
                this.dailyCloseDay = new Forms.AttendanceDailyCloseDay(dbManager, translateService);
                this.dailyAttendance = new Forms.AttendanceDailyAttendance(dbManager, translateService);
                this.dailyPenalties = new Forms.AttendanceDailyPenalties(dbManager, translateService);
                this.dailyVacations = new Forms.AttendanceDailyVacations(dbManager, translateService);
                this.monthlyAttendance = new Forms.AttendanceMonthlyAttendance(dbManager, translateService);
                this.monthlyPenalties = new Forms.AttendanceMonthlyPenalties(dbManager, translateService);
                this.monthlyVacations = new Forms.AttendanceMonthlyVacations(dbManager, translateService);
                this.monthlySalary = new Forms.AttendanceMonthlySalary(dbManager, translateService);
                this.attendanceCalculationPeriod = new Forms.AttendanceCalculationPeriod(dbManager, translateService);
                this.attendanceMonthlyCalculation = new Forms.AttendanceMonthlyCalculation(dbManager, translateService);
                //this.attendanceDayTypes = new AttendanceDayTypes(dbManager, translateService);
                this.calculationPeriodChangeEvent = {
                    defaultAction: this.calculationPeriodChanged
                };
                this.yearChangeEvent = {
                    defaultAction: this.yearChanged
                };
                this.monthChangeEvent = {
                    defaultAction: this.monthChanged
                };
                this.dailyData = { attendanceDataList: [], penaltyDataList: [], vacationDataList: [], importDayDataList: [], closeDayDataList: [] };
                this.monthlyData = { attendanceDataList: [], penaltyDataList: [], vacationDataList: [], salaryDataList: [] };
                this.dataItem.EmpAssignmentId = null;
                this.filter = $filter;
                this.dataItem = {};
                this.progressCalcOptions = { progressTitle: "Import & Close Attendance" };
                //this.dbManager.Get("SystemProgress", "GetByProgressTypeId", "?progressTypeId=4", (result) => {
                //    this.progressId = result.data.ProgressId;
                //})
                //var importGridColumnDefs = [
                //    { headerName: "EmployeeCode", field: "EmployeeCode" },
                //    { headerName: "ProfileName", field: "ProfileName" },
                //    { headerName: "TransactionDate", field: "TransactionDate", template: "<p>{{data.TransactionDate | date:'dd/MM/yyyy'}}</p>" },
                //    { headerName: "EmpTimeIn", field: "EmpTimeIn" },
                //    { headerName: "EmpTimeOut", field: "EmpTimeOut" }
                //];
                //this.importGrid = {
                //    gridOptions: {
                //        rowData: this.importData,
                //        columnDefs: importGridColumnDefs
                //    },
                //    gridColumnDefs: importGridColumnDefs
                //};
                //this.applyIsModifiedColor();
                //this.applyAttendanceDayTypesColor();
                this.FormSetup.LoadForm((form) => {
                    this.headerViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    //this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    //this.FormSetup.MyForm.IndexView.Load();
                });
            }
        }
        ImportCloseDayAttendance.getPostedStyle = (params) => {
            if (params.data && params.data.DeductionStatusId === 4) {
                return { background: "silver", 'border-bottom': "0.2px solid silver" };
            }
            else {
                return { background: "white", 'border-bottom': "0.2px solid silver" };
            }
        };
        Forms.ImportCloseDayAttendance = ImportCloseDayAttendance;
        Forms.hcmsForms.controller('importCloseDayAttendanceController', ['translateService', 'dataManagerService', '$filter', '$scope', '$stateParams', function (translateService, dataManagerService, $filter, $scope, $stateParams) {
                return new ImportCloseDayAttendance(translateService, dataManagerService, $filter, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EntityService {
            constructor(apiControllerName) {
                this.apiControllerName = apiControllerName;
                this.Add = (queryString, entity) => {
                    return this.dbManager.PostPromise(this.apiControllerName, "Post", queryString, entity);
                };
                this.Update = (queryString, entity) => {
                    return this.dbManager.PutPromise(this.apiControllerName, "Put", queryString, entity);
                };
                this.Delete = (queryString, entity) => {
                    return this.dbManager.PutPromise(this.apiControllerName, "Delete", queryString, entity);
                };
                this.Get = (queryString) => {
                    return this.dbManager.GetPromise(this.apiControllerName, "GetById", queryString);
                };
                this.GetAll = (queryString) => {
                    return this.dbManager.GetPromise(this.apiControllerName, "GetAll", queryString);
                };
                this.dbManager = new HCMS.DataAccess.DataManagerService();
            }
        }
        Forms.EntityService = EntityService;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class ExcelHeaderService {
            constructor(dbManager) {
                this.$onInit = () => { };
                this.RefNo = 0;
                this.FileName = "";
            }
            ;
        }
        Forms.ExcelHeaderService = ExcelHeaderService;
        Forms.hcmsForms.controller('excelHeaderService', ['dataManagerService', function (dataManagerService) {
                return new ExcelHeaderService(dataManagerService);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../forms/baseforms/baseform/baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class ExcelHeader extends Forms.BaseFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                super(translateService, dbManager, scope.tab.MenuItem.FormId);
                this.scope = scope;
                this.$onInit = () => { };
                this.xlsOptions = { data: [], fileName: "", onChanged: null, onClick: null };
                this.RefNo = 0;
                this.FileName = "";
                this.LoadFromExcel = () => __awaiter(this, void 0, void 0, function* () {
                    //this.dbManager.Post(this.FormSetup.MyForm.FormController, "GetList", "", data, (result) => {
                    //    this.dataList = result.data;
                    //}, (result) => {
                    //    this.smartALert.Error(result.data);
                    //})
                    if (this.RefNo <= 0) {
                        this.smartALert.Warning("Please enter Reference No");
                        return false;
                    }
                    //this.FileName = (this.xlsOptions.fileName == null || this.xlsOptions.fileName == "" ? "text" : this.xlsOptions.fileName);
                    this.FileName = this.xlsOptions.fileName;
                    var data = this.xlsOptions.data;
                    if (this.FileName == null || this.FileName == "" || data == null || data.length <= 0) {
                        this.smartALert.Warning("Please select file for upload.");
                        return false;
                    }
                    var queryString = "?refNo=" + this.RefNo + "&fileName=" + this.FileName;
                    //if (data == null || data.length <= 0) return false;
                    var postResult = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "SaveList", queryString, data);
                    this.getList();
                });
                this.clearSelectedFile = (e) => {
                    e.wrap('<form>').closest('form').get(0).reset();
                    e.unwrap();
                    //// Prevent form submission
                    //e.stopPropagation();
                    //e.preventDefault();
                };
                this.getList = () => __awaiter(this, void 0, void 0, function* () {
                    var queryString = "?refNo=" + this.RefNo;
                    var result = yield this.dbManager.GetPromise(this.FormSetup.MyForm.FormController, "GetList", queryString);
                    this.dataList = result.data;
                });
                this.createNew = () => __awaiter(this, void 0, void 0, function* () {
                    this.dataList = [];
                    var result = yield this.dbManager.GetPromise(this.FormSetup.MyForm.FormController, "GetMaxRefNo", "");
                    this.RefNo = result.data;
                });
                this.loadByRefNo = () => __awaiter(this, void 0, void 0, function* () {
                    if (this.RefNo <= 0) {
                        this.smartALert.Warning("Please enter Reference No");
                        return false;
                    }
                    this.getList();
                });
                this.postItemList = () => __awaiter(this, void 0, void 0, function* () {
                    var queryString = "?refNo=" + this.RefNo;
                    var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ RefId }) => RefId);
                    if (selectedRows.length > 0) {
                        var result = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "PostList", queryString, selectedIds);
                        //var result2 = await this.getList();
                        this.smartALert.Alert("Records has been posted successfully");
                        this.getList();
                    }
                    else {
                        this.smartALert.Warning("You must select record(s) to post.");
                    }
                });
                this.unPostItemList = () => __awaiter(this, void 0, void 0, function* () {
                    this.smartALert.Confirm("are you sure to delete these items", "", () => __awaiter(this, void 0, void 0, function* () {
                        var queryString = "?refNo=" + this.RefNo;
                        var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                        let selectedIds = selectedRows.map(({ RefId }) => RefId);
                        if (selectedRows.length > 0) {
                            var result = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "UnPostList", queryString, selectedIds);
                            //var result2 = await this.getList();
                            this.smartALert.Alert("Records has been posted successfully");
                            this.getList();
                        }
                        else {
                            this.smartALert.Warning("You must select record(s) to unpost.");
                        }
                        //for (let entry of selectedRows) {
                        //    var index = this.dataList.indexOf(entry);
                        //    this.dataList.splice(index, 1);
                        //}
                    }));
                });
                //private saveItemList = (valid) => {
                //    if (this.xlsOptions.data !== null) {
                //        // var data = JSON.parse(this.xlsOptions.data.toString());
                //        var data = this.dataList;// JSON.stringify(this.xlsOptions.data);
                //        this.dbManager.Post(this.FormSetup.MyForm.FormController, "SaveList", "", data, (result) => {
                //            this.smartALert.Alert("Saved Successfully");
                //        }, (result) => {
                //            this.smartALert.Error(result.data);
                //        })
                //    }
                //}
                this.deleteClicked = (item) => {
                    this.smartALert.Confirm("are you sure to delete this item", "", () => {
                        var index = this.dataList.indexOf(item);
                        this.dataList.splice(index, 1);
                    });
                };
                this.deleteSelectedRows = () => {
                    this.smartALert.Confirm("are you sure to delete this item", "", () => {
                        var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                        for (let entry of selectedRows) {
                            var index = this.dataList.indexOf(entry);
                            this.dataList.splice(index, 1);
                        }
                    });
                };
                this.smartALert = new HCMS.Controls.SmartAlert();
                this.FormSetup.LoadForm((form) => {
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    this.FormSetup.MyForm.IndexView.Load();
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.createNew();
                });
                this.xlsOptions.onClick = this.clearSelectedFile;
                //this.xlsOptions.onChanged = this.emportDataChanged;
            }
            ;
        }
        Forms.ExcelHeader = ExcelHeader;
        Forms.hcmsForms.controller('uploadExcelHeader', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new ExcelHeader(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class CreatedTransByMonth {
            constructor(translateService, dbManager, scope, $stateParams) {
                this.translateService = translateService;
                this.dbManager = dbManager;
                this.$onInit = () => { };
                this.getSalaryData = (year, month) => __awaiter(this, void 0, void 0, function* () {
                    var result = yield this.dbManager.GetPromise("CreatedTransactionsChart", "GetCreatedTransactionsByMonth", "?year=" + year + "&month=" + month);
                    this.chartOptions.setRowData(result.data);
                });
                this.chartOptions = {
                    title: this.translateService.Translate("Total Transactions"),
                    colFields: [
                        { headerName: this.translateService.Translate('Week'), fieldName: 'TransWeekName' },
                        { headerName: this.translateService.Translate('Vacations'), fieldName: 'Vacations' },
                        { headerName: this.translateService.Translate('Missions'), fieldName: 'Missions' },
                        { headerName: this.translateService.Translate('Permissions'), fieldName: 'Permissions' },
                        { headerName: this.translateService.Translate('Penalties'), fieldName: 'Penalties' },
                        { headerName: this.translateService.Translate('Loans'), fieldName: 'Loans' }
                    ],
                    rowData: []
                };
                this.getSalaryData(2017, 11);
            }
        }
        Forms.CreatedTransByMonth = CreatedTransByMonth;
        Forms.hcmsForms.controller('createdTransByMonth', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new CreatedTransByMonth(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class TotalSalaryChartByYear {
            constructor(translateService, dbManager, scope, $stateParams) {
                this.translateService = translateService;
                this.dbManager = dbManager;
                this.$onInit = () => { };
                this.getSalaryData = (year) => __awaiter(this, void 0, void 0, function* () {
                    var result = yield this.dbManager.GetPromise("SalaryChart", "GetTotalSalaryByYear", "?year=" + year);
                    this.chartOptions.setRowData(result.data);
                });
                this.chartOptions = {
                    title: this.translateService.Translate("Total Salary"),
                    colFields: [
                        { headerName: this.translateService.Translate('Month'), fieldName: 'PayrollMonthName' },
                        { headerName: this.translateService.Translate('Earning'), fieldName: 'TotalEarning' },
                        { headerName: this.translateService.Translate('Deduction'), fieldName: 'TotalDeduction' },
                        { headerName: this.translateService.Translate('NetSalary'), fieldName: 'NetSalary' }
                    ],
                    rowData: []
                };
                this.getSalaryData(2017);
            }
        }
        Forms.TotalSalaryChartByYear = TotalSalaryChartByYear;
        Forms.hcmsForms.controller('totalSalaryChartByYear', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new TotalSalaryChartByYear(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class HcmsHighChart {
            constructor(dbManager, timeout) {
                this.dbManager = dbManager;
                this.timeout = timeout;
                this.restrict = 'E';
                this.scope = {
                    hcOptions: "=?",
                    hcEvents: "=?"
                };
                this.template = `
  <div class="col-sm-12 well">
    <div class="row">
        <div class="col-sm-6">
            <table class="highchart table table-hover table-bordered" data-highchart-table data-graph-container=".. .. .highchart-container33" data-graph-type="column">
                <caption>{{::hcOptions.title}}</caption>
                <thead>
                    <tr>
                        <th ng-repeat="header in hcOptions.colFields">{{::header.headerName}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="item in hcOptions.rowData">
                        <td ng-repeat="col in hcOptions.colFields">{{::item[col.fieldName]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-sm-6">
             <div class="highchart-container33"></div>
        </div>
  </div>
 </div>
`;
                this.link = (scope, element, attrs) => {
                    scope.hcOptions.setRowData = (data) => {
                        scope.hcOptions.rowData = data;
                        this.timeout(() => {
                            var table = $(element).find('table')[0];
                            $(table).highchartTable();
                        });
                    };
                };
            }
            static Factory() {
                var directive = (dbManager, $timeout) => new HcmsHighChart(dbManager, $timeout);
                directive.$inject = ["dataManagerService", "$timeout"];
                return directive;
            }
        }
        Forms.HcmsHighChart = HcmsHighChart;
        Forms.hcmsForms.directive('hcmsHighChart', HcmsHighChart.Factory());
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class HcmsPieChart {
            constructor(dbManager, timeout) {
                this.dbManager = dbManager;
                this.timeout = timeout;
                this.restrict = 'E';
                this.scope = {
                    hcOptions: "=?",
                    hcEvents: "=?"
                };
                this.template = `
               <canvas height="120" ></canvas>
            `;
                this.link = (scope, element, attrs) => {
                    var pieOptions = {
                        //Boolean - Whether we should show a stroke on each segment
                        segmentShowStroke: true,
                        //String - The colour of each segment stroke
                        segmentStrokeColor: "#fff",
                        //Number - The width of each segment stroke
                        segmentStrokeWidth: 2,
                        //Number - Amount of animation steps
                        animationSteps: 100,
                        //String - types of animation
                        animationEasing: "easeOutBounce",
                        //Boolean - Whether we animate the rotation of the Doughnut
                        animateRotate: true,
                        //Boolean - Whether we animate scaling the Doughnut from the centre
                        animateScale: false,
                        //Boolean - Re-draw chart on page resize
                        responsive: true,
                        //String - A legend template
                        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
                    };
                    var pieData;
                    scope.hcOptions.setRowData = (data) => {
                        let opt = scope.hcOptions;
                        for (let entry of data) {
                            pieData.push({ value: data[opt.valueField], label: data[opt.labelField], color: getRandomColor(), highlight: getRandomColor() });
                        }
                        this.timeout(() => {
                            var canvas = $(element).find('canvas')[0];
                            var ctx = $(canvas).getContext("2d");
                            var myNewChart = new Chart(ctx).Pie(pieData, pieOptions);
                        });
                    };
                    var getRandomColor = () => {
                        var letters = '0123456789ABCDEF';
                        var color = '#';
                        for (var i = 0; i < 6; i++) {
                            color += letters[Math.floor(Math.random() * 16)];
                        }
                        return color;
                    };
                };
            }
            static Factory() {
                var directive = (dbManager, $timeout) => new HcmsPieChart(dbManager, $timeout);
                directive.$inject = ["dataManagerService", "$timeout"];
                return directive;
            }
        }
        Forms.HcmsPieChart = HcmsPieChart;
        Forms.hcmsForms.directive('hcmsPieChart', HcmsPieChart.Factory());
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class TotalSalaryPieChart {
            constructor(dbManager, timeout) {
                this.dbManager = dbManager;
                this.timeout = timeout;
                this.restrict = 'E';
                this.scope = {
                    hcOptions: "=?",
                };
                this.template = `
                <hcms-pie-chart hc-options=="pieChartOptions"> </hcms-pie-chart>
            `;
                this.link = (scope, element, attrs) => {
                    scope.pieChartOptions = { valueField: "NetSalary", labelField: "PayrollMonthName" };
                    var pieData;
                    var getSalaryData = (year) => __awaiter(this, void 0, void 0, function* () {
                        var result = yield this.dbManager.GetPromise("SalaryChart", "GetTotalSalaryByYear", "?year=" + year);
                        scope.pieChartOptions.setRowData(result.data);
                    });
                    scope.hcOptions.setYear = (year) => {
                        getSalaryData(year);
                    };
                };
            }
            static Factory() {
                var directive = (dbManager, $timeout) => new TotalSalaryPieChart(dbManager, $timeout);
                directive.$inject = ["dataManagerService", "$timeout"];
                return directive;
            }
        }
        Forms.TotalSalaryPieChart = TotalSalaryPieChart;
        Forms.hcmsForms.directive('totalSalaryPieChart', TotalSalaryPieChart.Factory());
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
window.agGrid.initialiseAgGridWithAngular1(angular);
var app;
(function (app) {
    var hcms;
    (function (hcms) {
        //"use strict";
        hcms.appHCMS = angular.module("app.hcms", ['ngFileUpload', 'ui.router', 'ui.bootstrap', 'ae-datetimepicker', 'angularMoment', 'pascalprecht.translate', 'angular-loading-bar', 'ui.router.tabs', 'agGrid', 'HCMS.DataAccess', 'HCMS.Controls', 'HCMS.Forms', 'HCMS.Menus', 'HCMS.Validations']);
        function $translateUrlLoader($q, $http) {
            'use strict';
            return function (options) {
                if (!options || !options.url) {
                    throw new Error('Couldn\'t use urlLoader since no url is given!');
                }
                var requestParams = {};
                requestParams[options.queryParameter || 'langId'] = options.key;
                return $http(angular.extend({
                    url: options.url,
                    params: requestParams,
                    method: 'GET'
                }, options.$http))
                    .then(function (result) {
                    return result.data;
                }, function () {
                    return $q.reject(options.key);
                });
                //var queryString = "?langId=" + options.key;
                //return appService.get("Dictionary", 'GetAll', queryString, function (response) {
                //    return response.data;
                //}, null);
            };
        }
        $translateUrlLoader['displayName'] = '$translateUrlLoader';
        hcms.appHCMS.factory('$translateUrlLoader', $translateUrlLoader);
        window.$stateProviderRef = null;
        hcms.appHCMS.config(function ($locationProvider, $stateProvider, $translateProvider, $httpProvider) {
            window.$stateProviderRef = $stateProvider;
            $locationProvider.html5Mode(true);
            //$locationProvider.hashPrefix('!').html5Mode({
            //    enabled: true,
            //    requireBase: false
            //});
            $stateProvider
                .state('login', {
                url: '/login',
                views: {
                    root: {
                        //templateUrl: 'app_hcms/login/views/login.html',
                        templateUrl: 'app_hebs/hcms/login/views/login.html',
                        controller: 'loginController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    title: 'Login',
                    htmlId: 'extr-page'
                },
                resolve: {
                    srcipts: function (lazyScript) {
                        return lazyScript.register([
                            'build/vendor.ui.js'
                        ]);
                    }
                }
            })
                .state('app.generalReport', {
                url: '/app/generalReport/:reportId/:apiController',
                views: {
                    "content@app": {
                        templateUrl: 'app_hebs/hcms/reports/views/generalReportView.html',
                        controller: 'generalReportController',
                        controllerAs: 'generalReport',
                    }
                },
            })
                .state('app.reportViewer', {
                url: '/app/reportViewer/:formId/:apiController',
                views: {
                    "content@app": {
                        templateUrl: 'app_hcms/reports/views/reportViewer.html',
                        controller: 'reportViewerController',
                        controllerAs: 'reportView',
                    }
                },
            })
                .state('app.tabs', {
                url: '/app/tabs',
                abstract: true,
                views: {
                    "content@app": {
                        templateUrl: 'app_hebs/menus/menuTabs.html',
                        controller: 'menuTabsController',
                        controllerAs: 'menuTabs',
                    }
                }
            });
            var url = window.appConfig.webApiUrl + '/Dictionary/GetAll';
            $translateProvider.useUrlLoader(url);
            $translateProvider.preferredLanguage('0');
            var interceptor = function (loginInfo, $q, $location) {
                return {
                    request: function (config) {
                        // var currentUser = loginInfo.getCurrentUser();
                        var currentUser = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                        if (currentUser != null) {
                            config.headers['Authorization'] = 'Bearer ' + currentUser.access_token;
                        }
                        return config;
                    },
                    responseError: function (rejection) {
                        if (rejection.status === 401) {
                            $location.path('/login');
                            //$state.go("login");
                            return $q.reject(rejection);
                        }
                        if (rejection.status === 403) {
                            $location.path('/unauthorized');
                            //$state.go("unauthorized");
                            return $q.reject(rejection);
                        }
                        return $q.reject(rejection);
                    }
                };
            };
            var params = ['$q', '$location'];
            interceptor.$inject = params;
            $httpProvider.interceptors.push(interceptor);
        });
        hcms.appHCMS.run(['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);
        hcms.appHCMS.run(function ($rootScope, $state, $http) {
            $rootScope.$on('$stateChangeStart', function (evt, to, params) {
                var currentUser = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                if (to.name !== "login") {
                    // redirect to login page if not logged in and trying to access a restricted page
                    var restrictedPage = false; // $.inArray($location.path(), ['/login', '/register']) === -1;
                    var loggedIn = currentUser;
                    if (restrictedPage || !loggedIn) {
                        evt.preventDefault();
                        $state.go('login');
                    }
                }
                //var currentUser = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                //if (to.name !== "login") {
                //    // redirect to login page if not logged in and trying to access a restricted page
                //    var restrictedPage = false; // $.inArray($location.path(), ['/login', '/register']) === -1;
                //    var loggedIn = currentUser;
                //    if (restrictedPage || !loggedIn) {
                //        evt.preventDefault();
                //        $state.go('login');
                //    }
                //}
            });
        });
        hcms.appHCMS.run(['$window', '$q', function ($window, $q) {
                $window['Promise'] = $q;
            }]);
    })(hcms = app.hcms || (app.hcms = {}));
})(app || (app = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class Login {
            constructor(state, accountService) {
                this.state = state;
                this.accountService = accountService;
                this.$onInit = () => { };
                //public selectedProfile: SelectedProfile;
                this.account = {
                    username: '',
                    password: '',
                    databaseProfileId: null,
                    companyId: null,
                    langId: null
                };
                this.message = "";
                //private changeLanguage = (langId) => {
                //    this.dbManager.Get('Lookups', 'GetDetails', "?table=SystemLanguages&id=" + langId, function (result) {
                //        var lang = result.data;
                //        var info: HCMS.DataAccess.ICurrentLoginInfo;
                //    }, null);
                //}
                this.login = (valid) => {
                    if (valid !== true) {
                        return false;
                    }
                    this.accountService.login(this.account).then((data) => {
                        //this.changeLanguage(this.account.langId);
                        this.state.go("app.home");
                    }, (error) => {
                        this.message = error.error_description;
                    });
                };
            }
        }
        Forms.Login = Login;
        Forms.hcmsForms.controller('loginController', ['$state', 'accountService', function ($state, accountService) {
                return new Login($state, accountService);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        //"use strict";
        DataAccess.hcmsDataAccess = angular.module("HCMS.DataAccess", []);
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class TranslateService {
            constructor($filter, $translate) {
                //translate
                this.Translate = (text, viewId, ParamValue) => {
                    let trans = this.filter('translate');
                    if (DataAccess.Utility.IsNull(viewId)) {
                        var textView = text + '-' + viewId;
                        var resultText = trans(textView);
                        if (resultText === textView) {
                            return trans(text);
                        }
                        else {
                            return resultText;
                        }
                    }
                    return trans(text);
                };
                this.AE = (arabicText, englishText) => {
                    let isALter = DataAccess.StartUp.CurrentLoginInfo.Language.LangAlter;
                    if (isALter) {
                        return arabicText;
                    }
                    else {
                        return englishText;
                    }
                };
                this.Use = (langId) => {
                    this.translate.use(langId.toString());
                };
                this.filter = $filter;
                this.translate = $translate;
            }
        }
        TranslateService.$inject = ['$filter', '$translate'];
        DataAccess.TranslateService = TranslateService;
        //hcmsDataAccess.service('translateService', TranslateService);
        DataAccess.hcmsDataAccess.service('translateService', ['$filter', '$translate', function ($filter, $translate) {
                return new TranslateService($filter, $translate);
            }]);
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class DataManagerService {
            constructor($http) {
                this.$http = $http;
                //GetByUrl
                this.GetByUrl = (routingUrl, success, fail, always) => {
                    let fullUrl = DataAccess.StartUp.apiUrl.concat('/').concat(routingUrl);
                    this.$http.get(fullUrl).then(function (result) {
                        if (success != null) {
                            success(result);
                        }
                    }, function (result) {
                        if (fail != null) {
                            fail(result);
                        }
                    }, function (result) {
                        if (always != null) {
                            always(result);
                        }
                    });
                };
                //get
                this.Get = (controllerName, actionName, queryString, success, fail, always) => {
                    let url = this.getUrl(controllerName, actionName, queryString);
                    this.$http.get(url).then(function (result) {
                        if (success != null) {
                            success(result);
                        }
                    }, function (result) {
                        if (fail != null) {
                            fail(result);
                        }
                    }, function (result) {
                        if (always != null) {
                            always(result);
                        }
                    });
                };
                //post
                this.Post = (controllerName, actionName, queryString, data, success, fail) => {
                    let url = this.getUrl(controllerName, actionName, queryString);
                    this.$http.post(url, data)
                        .then(function (result) {
                        if (success != null) {
                            success(result);
                        }
                    }, function (result) {
                        if (fail != null) {
                            fail(result);
                        }
                    }, function (result) {
                        //if (always != null) {
                        //    always(result);
                        //}
                    });
                };
                //put
                this.Put = (controllerName, actionName, queryString, data, success, fail, always) => {
                    let url = this.getUrl(controllerName, actionName, queryString);
                    this.$http.put(url, data)
                        .then(function (result) {
                        if (success != null) {
                            success(result);
                        }
                    }, function (result) {
                        if (fail != null) {
                            fail(result);
                        }
                    }, function (result) {
                        if (always != null) {
                            always(result);
                        }
                    });
                };
                //delete
                this.Delete = (controllerName, actionName, queryString, success, fail, always) => {
                    let url = this.getUrl(controllerName, actionName, queryString);
                    this.$http.delete(url)
                        .then(function (result) {
                        if (success != null) {
                            success(result);
                        }
                    }, function (result) {
                        if (fail != null) {
                            fail(result);
                        }
                    }, function (result) {
                        if (always != null) {
                            always(result);
                        }
                    });
                };
                //get Promise
                this.GetPromise = (controllerName, actionName, queryString) => {
                    let url = this.getUrl(controllerName, actionName, queryString);
                    return this.$http.get(url);
                };
                //post Promise
                this.PostPromise = (controllerName, actionName, queryString, data) => {
                    let url = this.getUrl(controllerName, actionName, queryString);
                    return this.$http.post(url, data);
                };
                //put Promise
                this.PutPromise = (controllerName, actionName, queryString, data) => {
                    let url = this.getUrl(controllerName, actionName, queryString);
                    return this.$http.put(url, data);
                };
                //delete Promise
                this.DeletePromise = (controllerName, actionName, queryString) => {
                    let url = this.getUrl(controllerName, actionName, queryString);
                    return this.$http.delete(url);
                };
            }
            //getUrl
            getUrl(controllerName, actionName, queryString) {
                let url = DataAccess.StartUp.apiUrl.concat('/').concat(controllerName).concat('/')
                    .concat(actionName).concat(queryString == null ? '' : queryString);
                return url;
            }
        }
        DataManagerService.$inject = ['$http'];
        DataAccess.DataManagerService = DataManagerService;
        //hcmsDataAccess.service("dataManagerService", DataManagerService);
        DataAccess.hcmsDataAccess.service('dataManagerService', ['$http', function ($http) {
                return new DataManagerService($http);
            }]);
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class StartUp {
            static SetCurrentLoginInfo(info) {
                StartUp._CurrentLoginInfo = info;
            }
            static get CurrentLoginInfo() {
                var loginInfo = StartUp._CurrentLoginInfo;
                if (loginInfo == null) {
                    loginInfo = angular.fromJson(sessionStorage.getItem("hcmsCurrentLoginInfo"));
                    StartUp._CurrentLoginInfo = loginInfo;
                }
                return loginInfo;
            }
        }
        StartUp.apiUrl = window['appConfig'].webApiUrl;
        StartUp.reportsUrl = window['appConfig'].webReportsUrl;
        StartUp.apiRootUrl = window['appConfig'].webUrl;
        StartUp._CurrentLoginInfo = null;
        StartUp.ChangeLanguage = (language, translator) => {
            var loginInfo = StartUp.CurrentLoginInfo;
            loginInfo.Language = language;
            translator.Use(loginInfo.Language.LangId);
            var rtl = (loginInfo.Language.LangDirection.toLowerCase() == 'rtl');
            var $root = $('body');
            $root.toggleClass('smart-rtl', rtl);
        };
        DataAccess.StartUp = StartUp;
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class Company {
            constructor(dbManager, companyId) {
                this.dbManager = dbManager;
                this.CompanyId = 0;
                this.CompanyCode = "";
                this.CompanyName = "";
                this.CompanyName_ = "";
                this.DecimalScale = 2;
                this.CompanyId = companyId;
            }
            Load() {
                return __awaiter(this, void 0, void 0, function* () {
                    var currentObject = this;
                    var queryString = '?id=' + this.CompanyId;
                    yield this.dbManager.Get('LoginCompany', 'GetDetails', queryString, function (result) {
                        DataAccess.Utility.CopyObject(currentObject, result.data);
                    });
                });
            }
        }
        DataAccess.Company = Company;
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class CurrentLoginInfo {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.access_token = "";
            }
            SetLoginInfo(currentLoginInfoIDs) {
                return __awaiter(this, void 0, void 0, function* () {
                    this.User = new DataAccess.User(this.dbManager, currentLoginInfoIDs.UserId);
                    this.Language = new DataAccess.Language(this.dbManager, currentLoginInfoIDs.LangId);
                    this.Company = new DataAccess.Company(this.dbManager, currentLoginInfoIDs.CompanyId);
                    this.DatabaseProfile = new DataAccess.DatabaseProfile(this.dbManager, currentLoginInfoIDs.DatabaseProfileId);
                    this.access_token = currentLoginInfoIDs.access_token;
                    DataAccess.StartUp.SetCurrentLoginInfo(this);
                    this.Language.Load((lng) => {
                        // this.changeDirection(this.Language.LangDirection);
                        DataAccess.StartUp.ChangeLanguage(lng, this.translator);
                    });
                    this.translator.Use(this.Language.LangId);
                    yield this.User.Load();
                    yield this.Company.Load();
                    yield this.DatabaseProfile.Load();
                    sessionStorage.setItem("hcmsCurrentLoginInfo", angular.toJson(this));
                });
            }
        }
        CurrentLoginInfo.$inject = ['dataManagerService'];
        DataAccess.CurrentLoginInfo = CurrentLoginInfo;
        //hcmsDataAccess.service('currentLoginInfo', ['dataManagerService', function (dataManagerService: HCMS.DataAccess.DataManagerService, translateService: HCMS.DataAccess.TranslateService) {
        //    return new CurrentLoginInfo(dataManagerService, translateService);
        //}]);
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class DatabaseProfile {
            constructor(dbManager, databaseProfileId) {
                this.dbManager = dbManager;
                this.DatabaseProfileId = 0;
                this.DatabaseProfileName = "";
                this.DatabaseProfileId = databaseProfileId;
            }
            Load() {
                var currentObject = this;
                var queryString = '?id=' + this.DatabaseProfileId;
                this.dbManager.Get('DatabaseProfile', 'GetDetails', queryString, function (result) {
                    DataAccess.Utility.CopyObject(currentObject, result.data);
                });
            }
        }
        DataAccess.DatabaseProfile = DatabaseProfile;
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class Language {
            constructor(dbManager, langId) {
                this.dbManager = dbManager;
                this.LangId = 0;
                this.LangName = "";
                this.LangShortName = "";
                this.LangAlter = false;
                this.LangDirection = "ltr";
                this.LangId = langId;
            }
            Load(callBack) {
                var currentObject = this;
                var queryString = '?id=' + this.LangId;
                this.dbManager.Get('LoginLanguage', 'GetDetails', queryString, function (result) {
                    DataAccess.Utility.CopyObject(currentObject, result.data);
                    if (callBack !== null) {
                        callBack(currentObject);
                    }
                });
            }
        }
        DataAccess.Language = Language;
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class User {
            constructor(dbManager, userId) {
                this.dbManager = dbManager;
                this.UserId = 0;
                this.UserName = "";
                this.UserId = userId;
            }
            Load() {
                return __awaiter(this, void 0, void 0, function* () {
                    var currentObject = this;
                    var queryString = '?table=Users&id=' + this.UserId;
                    yield this.dbManager.Get('Lookups', 'GetDetails', queryString, function (result) {
                        DataAccess.Utility.CopyObject(currentObject, result.data);
                    });
                });
            }
        }
        DataAccess.User = User;
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
//interface Object {
//    CopyFrom(obj: any): void;
//}
//Object.prototype.CopyFrom = function (obj: any) {
//    for (var attribut in obj) {
//        if (typeof obj[attribut] === "object") {
//            this[attribut].CopyFrom(obj[attribut]);
//        } else {
//            this[attribut] = obj[attribut];
//        }
//    }
//}
var HCMS;
(function (HCMS) {
    var DataAccess;
    (function (DataAccess) {
        class Utility {
            static IsNull(data) {
                return (angular.isUndefined(data) || (data === null));
            }
            static IsDate(data) {
                var isValid = true;
                if (Object.prototype.toString.call(data) === "[object Date]") {
                    // it is a date
                    if (isNaN(data)) {
                        // date is not valid
                        isValid = false;
                    }
                    else {
                        // date is valid
                        isValid = true;
                    }
                }
                else {
                    // not a date
                    isValid = false;
                }
                return (isValid && data !== null);
            }
            //static Clone(obj: any): any {
            //    var cloneObj = new (<any>obj.constructor());
            //    for (var attribut in obj) {
            //        if (typeof obj[attribut] === "object") {
            //            cloneObj[attribut] = this.Clone(obj[attribut]);
            //        } else {
            //            cloneObj[attribut] = obj[attribut];
            //        }
            //    }
            //    return cloneObj;
            //}
            static CopyObject(destinationObject, sourceObject) {
                angular.forEach(sourceObject, (value, key) => {
                    if (destinationObject.hasOwnProperty(key)) {
                        destinationObject[key] = sourceObject[key];
                    }
                });
            }
            static CopyData(source) {
                return angular.copy(source);
            }
        }
        DataAccess.Utility = Utility;
    })(DataAccess = HCMS.DataAccess || (HCMS.DataAccess = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../dataaccess/module.ts" />
/// <reference path="../dataaccess/services/translate.ts" />
/// <reference path="../dataaccess/services/datamanager.ts" />
/// <reference path="../dataaccess/startup/startup.ts" />
/// <reference path="../dataaccess/startup/company.ts" />
/// <reference path="../dataaccess/startup/currentlogininfo.ts" />
/// <reference path="../dataaccess/startup/databaseprofile.ts" />
/// <reference path="../dataaccess/startup/language.ts" />
/// <reference path="../dataaccess/startup/user.ts" />
/// <reference path="../dataaccess/startup/utility.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        "use strict";
        Forms.hcmsForms = angular.module("HCMS.Forms", ['ui.router', 'HCMS.Controls', 'HCMS.DataAccess', 'HCMS.Authentication']);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../module.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class IFramAutoResize {
            constructor() {
                this.restrict = 'A';
                this.link = (scope, element, $attrs) => {
                    element.on('load', function () {
                        /* Set the dimensions here,
                           I think that you were trying to do something like this: */
                        var iFrameHeight = element[0]["contentWindow"].document.body.scrollHeight + 'px';
                        var iFrameWidth = '100%';
                        element.css('width', iFrameWidth);
                        element.css('height', iFrameHeight);
                    });
                };
            }
            static Factory() {
                var directive = () => new IFramAutoResize();
                ////directive's injection list
                //directive.$inject = ["translateService", "dataManagerService"];
                return directive;
            }
        }
        Forms.IFramAutoResize = IFramAutoResize;
        Forms.hcmsForms.directive('iframeAutoResize', IFramAutoResize.Factory());
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class CommonForm {
            //static $inject = ['translateService'];
            constructor(translateService) {
                this.translateService = translateService;
                this.TranslateText = (text, viewId, params) => {
                    return this.translateService.Translate(text, viewId, params);
                };
            }
        }
        Forms.CommonForm = CommonForm;
        ////hcmsForms.controller('commonFormController', CommonFormController);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../baseforms/baseform/commonform.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class BaseReportSetup {
            constructor(filter, translator, dbManager, reportId) {
                this.filter = filter;
                this.translator = translator;
                this.dbManager = dbManager;
                this.reportId = reportId;
                this.title = "";
                this.objectSecurity = { hiddenId: 0, readonlyId: 1, showId: 2 };
                this.reportSetup = {};
                this.operatorsData = [];
                this.selectedGroupByItems = [];
                this.selectedGroupByObject = [];
                this.selectedOrderByItems = [];
                this.selectedOrderByObject = [];
                this.translateText = (text, reportId, params) => {
                    return this.translator.Translate(text, reportId, params);
                };
                this.getCommonParams = () => {
                    return '?userId=' + HCMS.DataAccess.StartUp.CurrentLoginInfo.User.UserId
                        + '&langId=' + HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangId
                        + '&companyId=' + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                };
                //get report Setup
                this.getReportSetup = (callback) => {
                    var queryString = this.getCommonParams() + '&reportId=' + this.reportId; //'?table=' + baseReport.indexViewSetup.viewSetup.TableName;
                    this.dbManager.Get('ReportForm', 'GetAllReportSetup', queryString, (response) => {
                        this.reportSetup = response.data;
                        if (angular.isDefined(callback) && callback != null) {
                            callback(response.data);
                        }
                    }, null);
                };
                // get Operators
                this.getControlsOperators = (callback) => {
                    this.dbManager.Get("ReportForm", "GetAllControlsOperators", "", (response) => {
                        this.operatorsData = response.data;
                        if (angular.isDefined(callback) && callback != null) {
                            callback(response.data);
                        }
                    }, function (result) {
                        //appService.alert(result);
                    });
                };
                // get Id Field Name
                this.getIdFieldName = (viewFields) => {
                    //set primaryField to gridOptions Object to access in every row
                    for (var prop in viewFields) {
                        if (viewFields[prop].IsPrimary === true) {
                            return viewFields[prop].FieldName;
                        }
                    }
                    return '';
                };
                this.getFieldsAsObjects = (viewFields) => {
                    if (viewFields == null)
                        return null;
                    var result = {};
                    var arr = viewFields;
                    for (var i = 0; i < arr.length; ++i) {
                        var obj = arr[i];
                        //for (var prop in arr[i]) {
                        //    obj[prop] = arr[i][prop];
                        //}
                        result[arr[i]["FieldName"]] = obj;
                    }
                    return result;
                };
                this.addPropertiesToFields = (viewFields, arrObjectSecurity) => {
                    if (viewFields == null)
                        return null;
                    var result = {};
                    var arr = viewFields;
                    for (var i = 0; i < arr.length; ++i) {
                        var obj = arr[i];
                        var securityId = this.getSecurity(obj['ControlId'], arrObjectSecurity);
                        obj.IsHidden = obj.IsHidden || (securityId === this.objectSecurity.hiddenId);
                        obj.IsReadOnly = obj.IsReadOnly || (securityId === this.objectSecurity.readonlyId);
                    }
                    return arr;
                };
                // apply securiy on controls
                this.getSecurity = (controlId, arrSecurity) => {
                    var arrSec = arrSecurity;
                    var myObjects = this.filter(arrSec, { ObjectId: controlId });
                    if (myObjects.length > 0)
                        return myObjects[0]["ObjectSecurityId"];
                    else
                        return this.objectSecurity.showId;
                };
            }
        }
        Forms.BaseReportSetup = BaseReportSetup;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
///// <reference path="../../../forms/module.ts" />
//module HCMS.Forms {
//    export class Chart {
//        $onInit = () => { };
//        private chartData: { labels: Array<any>, seriesName: Array<string>, data: any, colors: Array<any> } = { labels: null, seriesName: null, data: null, colors: null };
//        constructor(translateService: DataAccess.TranslateService, private dbManager: DataAccess.DataManagerService, scope: any, $stateParams: any) {
//            this.getChart(1);
//        }
//        private getChart = (chartId: number) => {
//            this.dbManager.Get("Chart", "GetChart", "?chartId=" + chartId, (result) => {
//                this.chartData.labels = result.data.Labels;
//                this.chartData.seriesName = result.data.SeriesName;
//                this.chartData.data = result.data.data;
//                this.chartData.colors = ['#45b7cd', '#ff6384'];
//            }, null, null)
//        }
//    }
//    hcmsForms.config(function (ChartJsProvider) {
//        ChartJsProvider.setOptions({ colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
//    }).controller('chartController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
//        return new Chart(translateService, dataManagerService, $scope, $stateParams);
//    }]);
//} 
/// <reference path="../../../../forms/module.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class OrgChart {
            constructor(translateService, dbManager, scope, $stateParams) {
                this.dbManager = dbManager;
                this.$onInit = () => { };
                this.orgChart = { treeOptions: null };
                this.formId = 0;
                this.formId = scope.tab.MenuItem.FormId; // $stateParams.formId;
                var currentLogin = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                this.orgChart.treeOptions = {
                    formId: this.formId, userId: currentLogin.User.UserId, langId: currentLogin.Language.LangId,
                    companyId: currentLogin.Company.CompanyId, treeId: 2, valueField: 'TreeNodeId', textField: 'content'
                };
            }
        }
        Forms.OrgChart = OrgChart;
        Forms.hcmsForms.controller('unitOrgChartController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new OrgChart(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpChangeSalaryTransaction extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.itemsList = [];
                this.itemDateOptions = {};
                this.payItemOptions = {};
                this.AddViewClicked = (callback) => {
                    //this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    //this.displayCreateNewTemplate = true;
                    //this.displayEditTemplate = false
                    //this.displayDetailsTemplate = false;
                    this.displayAssignmentInfo();
                    this.displayAssigmentPayItems();
                };
                this.displayData = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, (response) => {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
                this.displayAssignmentInfo = () => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetEmpAssignmentInfo', queryString, (response) => {
                        var dta = response.data;
                        currentObject.dataItem.UnitId = dta.UnitId;
                        currentObject.dataItem.PositionId = dta.PositionId;
                        currentObject.dataItem.PayrollGroupID = dta.PayrollGroupID;
                        currentObject.dataItem.LocationId = dta.LocationId;
                        currentObject.dataItem.JobId = dta.JobId;
                        currentObject.dataItem.GradeId = dta.GradeId;
                        currentObject.dataItem.CurrencyId = dta.CurrencyId;
                        currentObject.dataItem.CostCenterId = dta.CostCenterId;
                        currentObject.dataItem.ContractTypeId = dta.ContractTypeId;
                    }, null);
                };
                this.displayAssigmentPayItems = () => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetAssignmentBasicItems', queryString, (response) => {
                        currentObject.itemsList = response.data;
                    }, null);
                };
                this.displayChangeSalaryPayItems = () => {
                    var currentObject = this;
                    let empPayrollChangeSalaryId = 0;
                    if (currentObject.dataItem !== null) {
                        empPayrollChangeSalaryId = currentObject.dataItem.EmpPayrollChangeSalaryId;
                    }
                    var queryString = currentObject.FormData.getCommonParams() + '&changeSalaryId=' + empPayrollChangeSalaryId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetChangeDetails', queryString, (response) => {
                        currentObject.itemsList = response.data;
                    }, null);
                };
                this.newValueChanged = (item) => {
                    if (item.PayItemOldValue == null || item.PayItemOldValue == 0) {
                        item.PayItemPercentage = item.PayItemNewValue / 100;
                    }
                    else {
                        item.PayItemPercentage = (item.PayItemNewValue - item.PayItemOldValue) / item.PayItemOldValue; // , HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.DecimalScale);
                    }
                };
                this.addPayItem = () => {
                    if (this.selectedPayItem !== null) {
                        this.itemsList.push({ PayItemId: this.selectedPayItem.PayItemId, PayItemCode: this.selectedPayItem.PayItemCode, PayItemName: this.selectedPayItem.PayItemName, PayItemOldValue: 0, PayItemNewValue: 0, PayItemPercentage: 0, IsRetroActive: 0, RetroActiveValidDate: null });
                    }
                };
                this.payItemChangeEvent = {
                    selectedItemChanged: (item) => {
                        this.selectedPayItem = item;
                    }
                };
                this.decimals = HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.DecimalScale;
                this.payItemOptions = { DropDownId: 81, SelectDisplayValue: 'PayItemId', SelectDisplayName: 'PayItemName', SelectDisplayName_: 'PayItemName_' };
                // GetDataByParentId
                this.GetDataByParentId = this.displayData;
                this.displayCreateNewTemplate;
                //let gridOptions = { singleClickEdit: true };
                //let gridColumnDefs = [
                //    //{ headerName: scope.selectText, width: 50, cellRenderer: selectCell, suppressMenu: true, suppressSorting: true },
                //    { field: 'PayItemCode', hide: false, controlTypeName: 'text', headerName: this.translateText('PayItemCode') },
                //    { field: 'PayItemName', hide: false, controlTypeName: 'text', headerName: this.translateText('PayItemName') },
                //    { field: 'PayItemOldValue', hide: false, controlTypeName: 'number', headerName: this.translateText('PayItemOldValue') },
                //    { field: 'PayItemNewValue', hide: false, editable: true, controlTypeName: 'number', headerName: this.translateText('PayItemNewValue') },
                //    { field: 'PayItemPercentage', hide: false, controlTypeName: 'number', headerName: this.translateText('PayItemPercentage') },
                //    { field: 'IsRetroActive', hide: false, controlTypeName: 'check', headerName: this.translateText('IsRetroActive') },
                //    { field: 'RetroActiveValidDate', hide: false, controlTypeName: 'date', headerName: this.translateText('RetroActiveValidDate') }
                //];
                //this.itemsGrid = { name: 'itemsGrid', gridOptions: gridOptions, gridColumnDefs: gridColumnDefs };
                this.OnAdding.addHandler((e) => {
                    this.dataItem.ChangeSalaryDetailsList = this.itemsList;
                });
                this.OnCreateNewClicked.addHandler(this.AddViewClicked);
                this.OnEditClicked.addHandler(this.displayChangeSalaryPayItems);
            }
        }
        Forms.EmpChangeSalaryTransaction = EmpChangeSalaryTransaction;
        Forms.hcmsForms.controller('empChangeSalaryTransactionController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpChangeSalaryTransaction(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpChangeSalaryTransHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('empChangeSalarySelectedProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = { selectCallback: this.selectClicked, indexController: this };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.EmpChangeSalaryTransHome = EmpChangeSalaryTransHome;
        Forms.hcmsForms.controller('empChangeSalaryTransHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpChangeSalaryTransHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpPaymentMethod extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.EmpPaymentMethod = EmpPaymentMethod;
        Forms.hcmsForms.controller('empPaymentMethodController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpPaymentMethod(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpPaymentMethodHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedEmpPaymentMethod');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = { selectCallback: this.selectClicked, indexController: this };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.EmpPaymentMethodHome = EmpPaymentMethodHome;
        Forms.hcmsForms.controller('empPaymentMethodHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpPaymentMethodHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpBasicItemTransaction extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.EmpBasicItemTransaction = EmpBasicItemTransaction;
        Forms.hcmsForms.controller('empBasicItemTransactionController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpBasicItemTransaction(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpBasicItemTransHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedEmpBasicItemProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = { selectCallback: this.selectClicked, indexController: this };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.EmpBasicItemTransHome = EmpBasicItemTransHome;
        Forms.hcmsForms.controller('empBasicItemTransHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpBasicItemTransHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpPayrollVariableItemTransaction extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.EmpPayrollVariableItemTransaction = EmpPayrollVariableItemTransaction;
        Forms.hcmsForms.controller('empPayrollVariableItemTransactionController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpPayrollVariableItemTransaction(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpPayrollVariableItemTransHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedEmpPayrollVariableItemTransactionProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = { selectCallback: this.selectClicked, indexController: this };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.EmpPayrollVariableItemTransHome = EmpPayrollVariableItemTransHome;
        Forms.hcmsForms.controller('empPayrollVariableItemTransHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpPayrollVariableItemTransHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class excelHeadersHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                //public listOptions: any = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.dataItem = item;
                    this.activeTabIndex = 1;
                    // this.activateTab('selectedexcelHeader');
                };
                //public activateTab(tab) {
                //    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
                //};
                this.addNewClicked = () => {
                    //this.dataItem = {};
                    this.dataItem.RefNo = undefined;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedexcelHeader');
                };
                // this.listOptions = { selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                    //this.FormSetup.MyForm.IndexView.EditCallback = this.selectClicked;
                    //  this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.FormSetup.MyForm.LoadSubForms();
                });
            }
        }
        Forms.excelHeadersHome = excelHeadersHome;
        Forms.hcmsForms.controller('excelHeadersHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new excelHeadersHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class UploadPayrollVariableItemsHome extends Forms.excelHeadersHome {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope, $stateParams);
                this.$onInit = () => { };
                this.selectClicked = (item) => {
                    this.dataItem = item;
                    //this.activateTab('selectedexcelMonthlySettlHeader');
                    this.activeTabIndex = 1;
                };
                this.addNewClicked = () => {
                    //this.dataItem = {};
                    this.dataItem.RefNo = undefined;
                    this.activeTabIndex = 1;
                };
            }
        }
        Forms.UploadPayrollVariableItemsHome = UploadPayrollVariableItemsHome;
        Forms.hcmsForms.controller('uploadPayrollVariableItemsHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new UploadPayrollVariableItemsHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
        class UploadPayrollVariableItems extends Forms.BaseFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                super(translateService, dbManager, scope.formId);
                this.scope = scope;
                this.$onInit = () => { };
                this.xlsOptions = { data: [], fileName: "", onChanged: null, onClick: null };
                this.RefNo = 0;
                this.FileName = "";
                this.LoadFromExcel = () => __awaiter(this, void 0, void 0, function* () {
                    //this.dbManager.Post(this.FormSetup.MyForm.FormController, "GetList", "", data, (result) => {
                    //    this.dataList = result.data;
                    //}, (result) => {
                    //    this.smartALert.Error(result.data);
                    //})
                    if (this.RefNo <= 0) {
                        this.smartALert.Warning("Please enter Reference No");
                        return false;
                    }
                    //this.FileName = (this.xlsOptions.fileName == null || this.xlsOptions.fileName == "" ? "text" : this.xlsOptions.fileName);
                    this.FileName = this.xlsOptions.fileName;
                    var data = this.xlsOptions.data;
                    if (this.FileName == null || this.FileName == "" || data == null || data.length <= 0) {
                        this.smartALert.Warning("Please select file for upload.");
                        return false;
                    }
                    var queryString = "?refNo=" + this.RefNo + "&fileName=" + this.FileName;
                    //if (data == null || data.length <= 0) return false;
                    var postResult = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "SaveList", queryString, data);
                    this.getList();
                });
                this.clearSelectedFile = (e) => {
                    e.wrap('<form>').closest('form').get(0).reset();
                    e.unwrap();
                    //// Prevent form submission
                    //e.stopPropagation();
                    //e.preventDefault();
                };
                this.getList = () => __awaiter(this, void 0, void 0, function* () {
                    var queryString = "?refNo=" + this.RefNo;
                    var result = yield this.dbManager.GetPromise(this.FormSetup.MyForm.FormController, "GetList", queryString);
                    this.dataList = result.data;
                });
                this.createNew = () => __awaiter(this, void 0, void 0, function* () {
                    this.dataList = [];
                    var result = yield this.dbManager.GetPromise(this.FormSetup.MyForm.FormController, "GetMaxRefNo", "");
                    this.RefNo = result.data;
                });
                this.loadByRefNo = () => __awaiter(this, void 0, void 0, function* () {
                    if (this.RefNo <= 0) {
                        this.smartALert.Warning("Please enter Reference No");
                        return false;
                    }
                    this.getList();
                });
                this.postItemList = () => __awaiter(this, void 0, void 0, function* () {
                    var queryString = "?refNo=" + this.RefNo;
                    var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ RefId }) => RefId);
                    if (selectedRows.length > 0) {
                        var result = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "PostList", queryString, selectedIds);
                        //var result2 = await this.getList();
                        this.smartALert.Alert("Records has been posted successfully");
                        this.getList();
                    }
                    else {
                        this.smartALert.Warning("You must select record(s) to post.");
                    }
                });
                this.unPostItemList = () => __awaiter(this, void 0, void 0, function* () {
                    this.smartALert.Confirm("are you sure to delete these items", "", () => __awaiter(this, void 0, void 0, function* () {
                        var queryString = "?refNo=" + this.RefNo;
                        var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                        let selectedIds = selectedRows.map(({ RefId }) => RefId);
                        if (selectedRows.length > 0) {
                            var result = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "UnPostList", queryString, selectedIds);
                            //var result2 = await this.getList();
                            this.smartALert.Alert("Records has been posted successfully");
                            this.getList();
                        }
                        else {
                            this.smartALert.Warning("You must select record(s) to unpost.");
                        }
                        //for (let entry of selectedRows) {
                        //    var index = this.dataList.indexOf(entry);
                        //    this.dataList.splice(index, 1);
                        //}
                    }));
                });
                this.deleteRefNo = () => __awaiter(this, void 0, void 0, function* () {
                    this.smartALert.Confirm("are you sure to delete these items", "", () => __awaiter(this, void 0, void 0, function* () {
                        var queryString = "?refNo=" + this.RefNo;
                        var result = yield this.dbManager.DeletePromise(this.FormSetup.MyForm.FormController, "Delete", queryString);
                        var message = new HCMS.Controls.messageHandler();
                        message.MessageConfirmation(result.data, "Deleted Successfuly");
                        this.loadByRefNo();
                    }));
                });
                //private saveItemList = (valid) => {
                //    if (this.xlsOptions.data !== null) {
                //        // var data = JSON.parse(this.xlsOptions.data.toString());
                //        var data = this.dataList;// JSON.stringify(this.xlsOptions.data);
                //        this.dbManager.Post(this.FormSetup.MyForm.FormController, "SaveList", "", data, (result) => {
                //            this.smartALert.Alert("Saved Successfully");
                //        }, (result) => {
                //            this.smartALert.Error(result.data);
                //        })
                //    }
                //}
                this.deleteClicked = (item) => {
                    this.smartALert.Confirm("are you sure to delete this item", "", () => {
                        var index = this.dataList.indexOf(item);
                        this.dataList.splice(index, 1);
                    });
                };
                this.deleteSelectedRows = () => {
                    this.smartALert.Confirm("are you sure to delete this item", "", () => {
                        var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                        for (let entry of selectedRows) {
                            var index = this.dataList.indexOf(entry);
                            this.dataList.splice(index, 1);
                        }
                    });
                };
                this.smartALert = new HCMS.Controls.SmartAlert();
                this.FormSetup.LoadForm((form) => {
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    this.FormSetup.MyForm.IndexView.Load();
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.scope.$watch(() => this.scope.parentItem.RefNo, (newValue, oldValue) => {
                        if (oldValue !== newValue) {
                            if (newValue !== undefined) {
                                this.RefNo = Number.parseInt(newValue);
                                this.RefNo = this.RefNo;
                                this.loadByRefNo();
                            }
                            else {
                                this.createNew();
                            }
                        }
                    });
                    //this.createNew();
                    //  this.RefNo = ExcelHeader.selectedProfile
                });
                this.xlsOptions.onClick = this.clearSelectedFile;
                //this.xlsOptions.onChanged = this.emportDataChanged;
            }
            ;
        }
        Forms.UploadPayrollVariableItems = UploadPayrollVariableItems;
        Forms.hcmsForms.controller('uploadPayrollVariableItemsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new UploadPayrollVariableItems(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class stopSal extends Forms.BaseSubFormManager {
            //private loanTransGrid: Grid
            //private loanTransactions: [];
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.stopSal = stopSal;
        Forms.hcmsForms.controller('stopSalController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new stopSal(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class stopSalHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedVacationProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = {
                    selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false
                };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.stopSalHome = stopSalHome;
        Forms.hcmsForms.controller('stopSalHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new stopSalHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class loanSettlement extends Forms.BaseSubFormManager {
            //private loanTransGrid: Grid
            //private loanTransactions: [];
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
                this.displayPostPonRange = false;
                this.displaySetllmentAmount = false;
                this.empLoan = {};
                this.loanTransOptions = {};
                this.closeLoanSettlement = (callback) => {
                    var queryString = "?empLoanSettlementId=" + this.dataItem.EmpLoanSettlementId;
                    this.dbManager.Post("EmpLoanSettlement", "CloseTransaction", queryString, null, (result) => {
                        if (callback != null)
                            callback(result.data);
                        var message = new HCMS.Controls.messageHandler();
                        message.MessageConfirmation(result.data, "Closed Successfuly");
                    });
                };
                //Event empLoanId Changed
                this.empLoanIdChanged = (item) => {
                    this.dataItem.OriginalFromYear = item.FromYear;
                    this.dataItem.OriginalFromMonth = item.FromMonth;
                    this.dataItem.RemainingAmount = item.LoanRemainingAmount;
                    this.globalRemaining = item.LoanRemainingAmount;
                    this.dataItem.LoanTotalPaidAmount = item.LoanTotalPaidAmount;
                    this.dataItem.LoanAmount = item.LoanAmount;
                };
                this.getEmpLoans = (empAssignmentId) => {
                    if (HCMS.Validations.CommonValidations.isNull(empAssignmentId))
                        return;
                    let queryString = "?&empAssignmentId=" + empAssignmentId;
                    this.dbManager.Get(this.FormSetup.MyForm.FormController, 'GetEmpLoans', queryString, (response) => {
                        this.loanTransOptions.api.setItemsList(response.data);
                    }, null);
                };
                //Event SystemLoanSettlementTypeId Changed
                this.SystemLoanSettlementTypeIdChanged = (systemLoanSettlementTypeId) => {
                    this.CheckSysemLoanSettlemntType(systemLoanSettlementTypeId);
                };
                //Event SettlmentAmount Changed
                this.SettlementAmountChanged = (settlementAmount) => {
                    this.CheckSettlementAmountChanged(settlementAmount);
                };
                // set Transaction Events
                //this.LoanFromDateEvents = { defaultAction: this.fromDateChanged };
                //this.LoanToDateEvents = { defaultAction: this.toDateChanged };
                //this.LoanDaysEvents = { defaultAction: this.daysChanged };
                //this.LoanPartDateEvents = { defaultAction: this.partDateChanged };
                this.empLoanIdEvents = { selectedItemChanged: this.empLoanIdChanged };
                this.systemLoansettlementType = { defaultAction: this.SystemLoanSettlementTypeIdChanged };
                this.settlementAmountEvents = { defaultAction: this.SettlementAmountChanged };
                this.loanTransOptions = { ControlTypeName: 'select', DropDownId: 0, SelectDisplayValue: 'EmpLoanId', SelectDisplayName: 'LoanDetails', SelectDisplayName_: 'LoanDetails_' };
                //this.loanTransGrid.gridOptions
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
                this.OnEditClicked.addHandler(() => {
                    this.getEmpLoans(this.dataItem.EmpAssignmentId);
                });
                this.OnCreateNewClicked.addHandler(() => {
                    this.getEmpLoans(this.parentItem[this.parentIdFieldName]);
                });
            }
            CloseSettlementTransaction() {
                this.closeLoanSettlement((data) => {
                    //this.handleCloseButton();
                });
            }
            CheckSysemLoanSettlemntType(systemLoanSettlementTypeId) {
                if (HCMS.Validations.CommonValidations.isNull(systemLoanSettlementTypeId))
                    return;
                if (systemLoanSettlementTypeId == 2) {
                    this.displaySetllmentAmount = true;
                    this.displayPostPonRange = false;
                    this.dataItem.SettlementAmount = this.dataItem.RemainingAmount;
                    this.dataItem.RemainingAmount = this.globalRemaining - this.dataItem.SettlementAmount;
                }
                else if (systemLoanSettlementTypeId == 3) {
                    this.displaySetllmentAmount = false;
                    this.displayPostPonRange = true;
                    this.dataItem.SettlementAmount = 0;
                }
            }
            CheckSettlementAmountChanged(settlementAmount) {
                if (HCMS.Validations.CommonValidations.isNull(settlementAmount))
                    return;
                this.dataItem.RemainingAmount = this.globalRemaining - settlementAmount;
                //if (this.dataItem.SystemLoanSettlementTypeId = 2 && settlementAmount < this.empLoan.LoanRemainingAmount) //Fukk Setllemtnt
                //{
                //    //Show Error Message
                //}
            }
        }
        Forms.loanSettlement = loanSettlement;
        Forms.hcmsForms.controller('loanSettlementController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new loanSettlement(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class LoanSettlementHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedVacationProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = {
                    selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false
                };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.LoanSettlementHome = LoanSettlementHome;
        Forms.hcmsForms.controller('loanSettlementHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new LoanSettlementHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class LoanPostTransaction extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, timeout, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.runStatus = false;
                this.stopStatus = false;
                this.showProgressStatus = false;
                this.displayDataStatus = false;
                this.gridOptions = {};
                this.run = (valid) => {
                    if (valid) {
                        this.progressCalcOptions.checkIfProgressRunning(this.progressCalcOptions.startProgress(() => {
                            this.showModal();
                            this.disableRun();
                        }), this.startCalc);
                    }
                };
                this.startCalc = () => {
                    var queryString = "?formId=" + 0;
                    queryString += "&userId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.User.UserId;
                    queryString += "&langId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + this.dataItem.PayrollGroupId;
                    queryString += "&payrollRunNo=" + this.dataItem.RunNo;
                    queryString += "&payrollYear=" + this.dataItem.PayrollYear;
                    queryString += "&payrollMonth=" + this.dataItem.PayrollMonth;
                    this.progressCalcOptions.startProgress(() => {
                        this.showModal();
                        this.disableRun();
                    });
                    this.dbManager.Post("LoanPost", "Run", queryString, this.dataItem.LoanId, (response) => {
                        this.progressCalcOptions.stopProgress(() => {
                            this.hideModal();
                            this.enableRun();
                            this.getCalculatedData();
                        });
                    }, (response) => {
                        this.stopCalc();
                    });
                };
                this.showModal = () => {
                    $('#loanPostModal').modal('show');
                };
                this.hideModal = () => {
                    $('#loanPostModal').modal('hide');
                };
                this.stopCalc = () => {
                    this.progressCalcOptions.stopProgress(() => {
                        this.hideModal();
                        this.enableRun();
                    });
                };
                this.showProgress = () => {
                    this.progressCalcOptions.checkIfProgressRunning(() => {
                        this.showModal();
                        this.disableRun();
                    }, null);
                };
                this.enableRun = () => {
                    this.runStatus = true;
                    this.stopStatus = false;
                    this.showProgressStatus = false;
                    this.displayDataStatus = true;
                };
                this.disableRun = () => {
                    this.runStatus = false;
                    this.stopStatus = true;
                    this.showProgressStatus = true;
                    this.displayDataStatus = false;
                };
                this.getCalculatedData = () => {
                    var queryString = "?formId=" + 0;
                    queryString += "&userId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.User.UserId;
                    queryString += "&langId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + this.dataItem.PayrollGroupId;
                    queryString += "&payrollRunNo=" + this.dataItem.RunNo;
                    queryString += "&payrollYear=" + this.dataItem.PayrollYear;
                    queryString += "&payrollMonth=" + this.dataItem.PayrollMonth;
                    this.dbManager.Post("LoanPost", "GetCalculatedEmployees", queryString, this.dataItem.LoanId, (response) => {
                        this.dataList = response.data;
                    }, (response) => {
                    });
                };
                this.gridColumns = [
                    { field: 'ProfileCode', hide: false, controlTypeName: 'text', headerName: this.translateText('ProfileCode') },
                    { field: 'ProfileName', hide: false, controlTypeName: 'text', headerName: this.translateText('ProfileName') },
                    { field: 'LoanName', hide: false, controlTypeName: 'text', headerName: this.translateText('LoanName') },
                    { field: 'InstallmentAmount', hide: false, controlTypeName: 'number', headerName: this.translateText('InstallmentAmount') }
                ];
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.profileId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.profileId))
                        currentObject.profileId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&profileId=' + currentObject.profileId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByProfileId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
                this.gridOptions = { SelectButton: false, EditButton: false, DeleteButton: false, enableQuickFilter: true, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === 'rtl' ? true : false };
                this.gridOptions.columnDefs = this.gridColumns;
                this.gridOptions.rowData = this.dataList;
                timeout(() => {
                    this.progressCalcOptions.checkIfProgressRunning(() => {
                        this.progressCalcOptions.startProgress(() => {
                            this.showModal();
                            this.disableRun();
                        });
                    }, null);
                }, 2000);
            }
        }
        Forms.LoanPostTransaction = LoanPostTransaction;
        Forms.hcmsForms.controller('loanPostTransactionController', ['translateService', 'dataManagerService', '$scope', '$timeout', '$stateParams', function (translateService, dataManagerService, $scope, $timeout, $stateParams) {
                return new LoanPostTransaction(translateService, dataManagerService, $scope, $timeout, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class LoanTransaction extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
                this.displayTimeRange = false;
                this.LoanTransactionRule = {};
                this.loanTransactions = [];
                this.getEmpLoanInstallments = (empLoanId) => {
                    if (HCMS.Validations.CommonValidations.isNull(empLoanId))
                        return;
                    var queryString = '?empLoanId=' + empLoanId;
                    this.dbManager.Get(this.FormSetup.MyForm.FormController, 'GetEmpLoanInstallments', queryString, (response) => {
                        this.loanTransactions = response.data;
                    }, null);
                };
                //Event loanId Changed
                this.loanIdChanged = (loanId) => {
                };
                //check Loan Installment Number By LoanAmountChanged
                this.checkLoanAmountCahnged = (loanAmount) => {
                    if (loanAmount != null) {
                        this.dataItem.LoanInstalmentNumber = loanAmount / this.dataItem.LoanInstalmentAmount;
                    }
                };
                //check Loan Installment Amount By LoanInstallmentNumberChanged
                this.checkLoanInstallmentAmount = (installmentAmount) => {
                    if (installmentAmount > 0) {
                        this.dataItem.LoanInstalmentNumber = Math.ceil(this.dataItem.LoanAmount / installmentAmount);
                    }
                };
                //check Loan Installment Amount By LoanInstallmentNumberChanged
                this.checkLoanInstallmentNumber = (installmentNumber) => {
                    if (installmentNumber > 0) {
                        this.dataItem.LoanInstalmentAmount = this.dataItem.LoanAmount / installmentNumber;
                    }
                };
                // set Transaction Events
                this.loanIdEvents = { defaultAction: this.loanIdChanged };
                this.LoanAmountEvents = { defaultAction: this.checkLoanAmountCahnged };
                this.LoanInstallmentAmountEvents = { defaultAction: this.checkLoanInstallmentAmount };
                this.LoanInstallmentNumberEvents = { defaultAction: this.checkLoanInstallmentNumber };
                var loanTransGridColumnDefs = [
                    { headerName: "PayrollYear", field: "PayrollYear" },
                    { headerName: "PayrollMonth", field: "PayrollMonth" },
                    { headerName: "PayrollRunName", field: "PayrollRunName" },
                    { headerName: "EmpLoanSettlementCode", field: "EmpLoanSettlementCode" },
                    { headerName: "InstallmentAmount", field: "InstallmentAmount" }
                ];
                this.loanTransGrid = {
                    name: 'loanTransGrid',
                    gridOptions: {
                        rowData: this.loanTransactions,
                        columnDefs: loanTransGridColumnDefs
                    },
                    gridColumnDefs: loanTransGridColumnDefs
                };
                this.OnEditClicked.addHandler(() => {
                    this.getEmpLoanInstallments(this.dataItem.EmpLoanId);
                });
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.LoanTransaction = LoanTransaction;
        Forms.hcmsForms.controller('loanTransactionController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new LoanTransaction(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class LoanTransactionHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedLoanTransactionProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = { selectCallback: this.selectClicked, indexController: this };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.LoanTransactionHome = LoanTransactionHome;
        Forms.hcmsForms.controller('loanTransHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new LoanTransactionHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        //interface IEmpPayrollHeader {
        //    EmpPayrollHeaderId: number;
        //    EmpAssignmentId: number;
        //    PayrollYear: number;
        //    PayrollMonth: number;
        //    PayrollRunId: number;
        //    PayrollGroupId: number;
        //}
        class EmpPayrollHeader {
            constructor() {
                this.EmpPayrollHeaderId = 0;
                this.EmpAssignmentId = 0;
                this.PayrollYear = 0;
                this.PayrollMonth = 0;
                this.PayrollRunId = 0;
                this.PayrollGroupId = 0;
            }
        }
        Forms.EmpPayrollHeader = EmpPayrollHeader;
        class PayrollCalcSalary extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $filter, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                this.runStatus = false;
                this.stopStatus = false;
                this.showProgressStatus = false;
                this.displayDataStatus = false;
                this.payrollGroup = {};
                this.progressId = 0;
                this.progressTypeId = 2;
                this.salaryHeaderData = [];
                this.earningGrid = { gridOptions: {}, gridColumnDefs: [] };
                this.deductionGrid = { gridOptions: {}, gridColumnDefs: [] };
                this.salaryEarningData = [];
                this.salaryDeductionData = [];
                this.selectedAssignments = [];
                this.selectedHeaderData = {};
                this.totalRunSalary = {
                    totalEarning: 0, totalDeduction: 0, totalNet: 0
                };
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedHeaderData = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('salaryDetailsData');
                    this.displaySalaryDetailsData();
                };
                //public activateTab(tab) {
                //    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
                //};
                this.run = (valid) => {
                    if (valid) {
                        this.progressCalcOptions.api.checkIfProgressRunning(this.progressCalcOptions.api.startProgress(() => {
                            this.showModal();
                            this.disableRun();
                        }), this.startCalc);
                    }
                };
                this.startCalc = () => {
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                        //let idString = this.dataItem.EmpAssignmentId as string;
                        //let ids = idString.split(',');
                        //if (ids.length > 0) {
                        //    for (let id of ids) {
                        //        empAssignmentIds.push(parseInt(id));
                        //    }
                        //}
                    }
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&userId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.User.UserId;
                    queryString += "&langId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + this.dataItem.PayrollGroupId;
                    queryString += "&payrollRunId=" + this.dataItem.PayrollRunId;
                    queryString += "&payrollYear=" + this.dataItem.PayrollYear;
                    queryString += "&payrollMonth=" + this.dataItem.PayrollMonth;
                    this.progressCalcOptions.api.startProgress(() => {
                        this.showModal();
                        this.disableRun();
                    });
                    this.dbManager.Post("PayrollCalcSalary", "Run", queryString, empAssignmentIds, (response) => {
                        this.stopCalc();
                    }, (response) => {
                        this.stopCalc();
                    });
                };
                this.showModal = () => {
                    $('#payrollCalcSalaryModal').modal('show');
                };
                this.hideModal = () => {
                    $('#payrollCalcSalaryModal').modal('hide');
                };
                this.stopCalc = () => {
                    this.progressCalcOptions.api.stopProgress(() => {
                        this.hideModal();
                        this.enableRun();
                    });
                };
                this.showProgress = () => {
                    this.progressCalcOptions.api.checkIfProgressRunning(() => {
                        this.showModal();
                        this.disableRun();
                    }, null);
                };
                this.enableRun = () => {
                    this.runStatus = true;
                    this.stopStatus = false;
                    this.showProgressStatus = false;
                    this.displayDataStatus = true;
                };
                this.disableRun = () => {
                    this.runStatus = false;
                    this.stopStatus = true;
                    this.showProgressStatus = true;
                    this.displayDataStatus = false;
                };
                this.displaySalaryData = () => {
                    this.displaySalaryHeaderData();
                    this.displaySalaryDetailsData();
                };
                this.displaySalaryHeaderData = () => {
                    var yer = this.dataItem.PayrollYear;
                    var mon = this.dataItem.PayrollMonth;
                    var runId = this.dataItem.PayrollRunId;
                    var groupId = this.dataItem.PayrollGroupId;
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + groupId;
                    queryString += "&payrollRunId=" + runId;
                    queryString += "&payrollYear=" + yer;
                    queryString += "&payrollMonth=" + mon;
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                        //let idString = this.dataItem.EmpAssignmentId as string;
                        //let ids = idString.split(',');
                        //if (ids.length > 0) {
                        //    for (let id of ids) {
                        //        empAssignmentIds.push(parseInt(id));
                        //    }
                        //}
                    }
                    this.dbManager.Post("PayrollCalcSalary", "GetSalaryHeaderData", queryString, empAssignmentIds, (result) => {
                        this.salaryHeaderData = result.data;
                        this.activeTabIndex = 0;
                        // this.activateTab('salaryHeaderData');
                    });
                };
                this.displaySalaryDetailsData = () => {
                    if (this.selectedHeaderData == null || this.selectedHeaderData.EmpAssignmentId == undefined || this.selectedHeaderData.EmpAssignmentId == null || this.selectedHeaderData.EmpAssignmentId === 0) {
                        return;
                    }
                    var yer = this.dataItem.PayrollYear;
                    var mon = this.dataItem.PayrollMonth;
                    var runId = this.dataItem.PayrollRunId;
                    var groupId = this.dataItem.PayrollGroupId;
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + groupId;
                    queryString += "&payrollRunId=" + runId;
                    queryString += "&payrollYear=" + yer;
                    queryString += "&payrollMonth=" + mon;
                    var empAssignments = 'empAssignmentIds=' + this.selectedHeaderData.EmpAssignmentId;
                    //if (this.selectedHeaderData.EmpAssignmentId != null && this.selectedHeaderData.EmpAssignmentId.length > 0) {
                    //    empAssignments = this.selectedHeaderData.EmpAssignmentId.map(item => 'empAssignmentIds=' + item.EmpAssignmentId).join('&');
                    //}
                    queryString += "&" + empAssignments;
                    this.dbManager.Get("PayrollCalcSalary", "GetSalaryDetailsData", queryString, (result) => {
                        var salaryFilter = this.filter('filter');
                        var orderFilter = this.filter('orderBy');
                        var data = result.data;
                        //order data by Item code
                        data = orderFilter(data, (item) => { return item.PayItemCode; }, false /*Reverse=false*/);
                        ;
                        //filter to get Earning Items
                        this.salaryEarningData = salaryFilter(data, (entry) => {
                            return entry.Amount > 0;
                        }, true);
                        //filter to get Deduction Items
                        this.salaryDeductionData = salaryFilter(data, (entry) => {
                            return entry.Amount < 0;
                        }, true);
                        this.DisplayTotalSalary(this.selectedHeaderData);
                    });
                };
                this.DisplayTotalSalary = (item) => {
                    this.totalRunSalary.totalEarning = (item.TotalEarning == null ? 0 : item.TotalEarning);
                    this.totalRunSalary.totalDeduction = (item.TotalDeduction == null ? 0 : item.TotalDeduction);
                    this.totalRunSalary.totalNet = (item.NetSalary == null ? 0 : item.NetSalary);
                };
                this.getPayrollGroup = (payrollGroupId) => {
                    if (HCMS.Validations.CommonValidations.isNull(payrollGroupId))
                        return;
                    var queryString = '?payrollGroupId=' + payrollGroupId;
                    this.dbManager.Get("PayrollGroup", 'GetByPayrollGroupId', queryString, (response) => {
                        this.payrollGroup = response.data;
                        this.dataItem.PayrollYear = this.payrollGroup.CurrentYear;
                        this.dataItem.PayrollMonth = this.payrollGroup.CurrentMonth;
                        this.dataItem.PayrollRunId = this.payrollGroup.CurrentRunId;
                        //  this.isPartDay(this.vacationRule.IsDayFraction);
                    }, null);
                };
                // set Transaction Events
                this.payrollGroupIdEvents = { defaultAction: this.getPayrollGroup };
                this.filter = $filter;
                this.progressCalcOptions = { progressTitle: "Payroll Calc Salary" };
                this.dbManager.Get("SystemProgress", "GetByProgressTypeId", "?progressTypeId=2", (result) => {
                    this.progressId = result.data.ProgressId;
                });
                //this.listOptions = { selectCallback: this.selectClicked, indexController: this };
                //this.selectedProfile = {};
                this.dataItem = {};
                var earningGridColumnDefs = [
                    { headerName: "PayItemCode", field: "PayItemCode" },
                    { headerName: "PayItemName", field: "PayItemName" },
                    { headerName: "Amount", field: "Amount" }
                ];
                var deductionGridColumnDefs = [
                    { headerName: "PayItemCode", field: "PayItemCode", suppressFilter: true },
                    { headerName: "PayItemName", field: "PayItemName", suppressFilter: true },
                    { headerName: "Amount", field: "Amount", suppressFilter: true }
                ];
                this.earningGrid = {
                    gridOptions: {
                        rowData: this.salaryEarningData,
                        columnDefs: earningGridColumnDefs
                    },
                    gridColumnDefs: earningGridColumnDefs
                };
                this.deductionGrid = {
                    gridOptions: {
                        rowData: this.salaryDeductionData,
                        columnDefs: deductionGridColumnDefs
                    },
                    gridColumnDefs: deductionGridColumnDefs
                };
                //this.columnDefs = [
                //    { headerName: "PayItemCode", field: "PayItemCode", suppressFilter: true },
                //    { headerName: "PayItemName", field: "PayItemName", suppressFilter: true},
                //    {
                //        headerName: "ProfileName", field: "ProfileName", rowGroup: true, hide: true, filter: 'text'
                //    },
                //    {
                //        headerName: "EmployeeCode", field: "EmployeeCode", rowGroup: true, hide: true, filter: 'text'
                //    },
                //    { headerName: "Amount", field: "Amount", aggFunc: 'sum', suppressFilter: true, enableValue: true }
                //];
                //        this.gridOptions = {
                //    columnDefs: this.columnDefs,
                //    rowData: this.salaryHeaderData,
                //    animateRows: true,
                //    enableRangeSelection: true,
                //    enableSorting: true,
                //    enableFilter: true
                //};
                //this.grid.gridOptions.selectCallback = this.selectClicked;
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    //this.grid.gridColumnDefs = columnDefs;
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    //this.grid.gridOptions.suppressAutoSize = true;
                    this.FormSetup.MyForm.IndexView.Load();
                });
            }
        }
        Forms.PayrollCalcSalary = PayrollCalcSalary;
        Forms.hcmsForms.controller('payrollCalcSalaryController', ['translateService', 'dataManagerService', '$filter', '$scope', '$stateParams', function (translateService, dataManagerService, $filter, $scope, $stateParams) {
                return new PayrollCalcSalary(translateService, dataManagerService, $filter, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class payrollCloseCalcSalary extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $filter, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                this.runStatus = false;
                this.stopStatus = false;
                this.showProgressStatus = false;
                this.displayDataStatus = false;
                this.progressId = 0;
                //  private payrollTransTypeIdEvents: IPayrollTransEvent;
                this.PayrollSalaryHeaderData = [];
                this.PayrollSalaryIsClosed = false;
                this.gridOptions = {};
                //Event year Changed   
                this.payrollYearChanged = (payrollYear) => {
                    this.dataItem.PayrollYear = payrollYear;
                    this.handleCloseButton();
                };
                //Event Month Changed   
                this.payrollMonthChanged = (payrollMonth) => {
                    this.dataItem.PayrollMonth = payrollMonth;
                    this.handleCloseButton();
                };
                //Event RunId Changed   
                this.payrollRunIdChanged = (runId) => {
                    this.dataItem.PayrollRunId = runId;
                    this.handleCloseButton();
                };
                //Event PayrollGroup Changed   
                this.payrollPayrollGroupIdChanged = (payrollGroupId) => {
                    this.dataItem.PayrollGroupId = payrollGroupId;
                    this.handleCloseButton();
                };
                this.showModal = () => {
                    $('#payrollCalcTransModal').modal('show');
                };
                this.hideModal = () => {
                    $('#payrollCalcTransModal').modal('hide');
                };
                this.openPayrollSalaryPeriod = (callback) => {
                    var yer = this.dataItem.PayrollYear;
                    var mon = this.dataItem.PayrollMonth;
                    var runId = this.dataItem.PayrollRunId;
                    var groupId = this.dataItem.PayrollGroupId;
                    //var transactionTypeId = this.dataItem.PayrollSalaryTypeId;
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + groupId;
                    queryString += "&payrollRunId=" + runId;
                    queryString += "&payrollYear=" + yer;
                    queryString += "&payrollMonth=" + mon;
                    this.dbManager.Post("PayrollCloseCalcSalary", "OpenPayrollSalaryPeriod", queryString, null, (result) => {
                        if (callback != null)
                            callback(result.data);
                    });
                };
                this.closePayrollSalaryPeriod = (callback) => {
                    var yer = this.dataItem.PayrollYear;
                    var mon = this.dataItem.PayrollMonth;
                    var runId = this.dataItem.PayrollRunId;
                    var groupId = this.dataItem.PayrollGroupId;
                    //  var transactionTypeId = this.dataItem.PayrollSalaryTypeId;
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + groupId;
                    queryString += "&payrollRunId=" + runId;
                    queryString += "&payrollYear=" + yer;
                    queryString += "&payrollMonth=" + mon;
                    this.dbManager.Post("PayrollCloseCalcSalary", "ClosePayrollSalaryPeriod", queryString, null, (result) => {
                        if (callback != null)
                            callback(result.data);
                    });
                };
                this.displayPayrollSalaryHeaderData = () => {
                    //var yer = this.dataItem.PayrollYear;
                    //var mon = this.dataItem.PayrollMonth;
                    //var runId = this.dataItem.PayrollRunId;
                    //var groupId = this.dataItem.PayrollGroupId;
                    //var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    // var queryString = "?companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    this.dbManager.Get("PayrollCloseCalcSalary", "GetAllSalaryClose", "", (result) => {
                        this.PayrollSalaryHeaderData = result.data;
                        // this.activateTab('PayrollSalaryHeaderData');
                    });
                };
                this.IsClosed = (callback) => {
                    if (HCMS.Validations.CommonValidations.isNull(this.dataItem.PayrollYear))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(this.dataItem.PayrollMonth))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(this.dataItem.PayrollRunId))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(this.dataItem.PayrollGroupId))
                        return;
                    var yer = this.dataItem.PayrollYear;
                    var mon = this.dataItem.PayrollMonth;
                    var runId = this.dataItem.PayrollRunId;
                    var groupId = this.dataItem.PayrollGroupId;
                    // var transactionTypeId = this.dataItem.PayrollSalaryTypeId;
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + groupId;
                    queryString += "&payrollRunId=" + runId;
                    queryString += "&payrollYear=" + yer;
                    queryString += "&payrollMonth=" + mon;
                    // queryString += "&transactionTypeId=" + transactionTypeId;
                    this.dbManager.Get("PayrollCloseCalcSalary", "GetPayrollSalaryPeriodIsClosed", queryString, (result) => {
                        this.PayrollSalaryIsClosed = result.data;
                        if (callback != null)
                            callback(result.data);
                    });
                };
                // set Transaction Events
                this.payrollTransYearEvents = { defaultAction: this.payrollYearChanged };
                this.payrollTransMonthEvents = { defaultAction: this.payrollMonthChanged };
                this.payrollTransRunIdEvents = { defaultAction: this.payrollRunIdChanged };
                this.payrollTransPayrollGroupIdEvents = { defaultAction: this.payrollPayrollGroupIdChanged };
                //  this.payrollTransTypeIdEvents = { defaultAction: this.payrollTransTypeIdChanged };
                this.filter = $filter;
                this.progressCalcOptions = { progressTitle: "Payroll Calc Transactions" };
                this.progressId = 3;
                this.dataItem = {};
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    //this.grid.gridColumnDefs = columnDefs;
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    this.displayPayrollSalaryData();
                    this.FormSetup.MyForm.IndexView.Load();
                });
                this.handleCloseButton();
                //this.gridOptions = { SelectButton: false, EditButton: false, DeleteButton: false, enableQuickFilter: true, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === 'rtl' ? true : false };
                //this.gridOptions.columnDefs = this.gridColumns;
                //this.gridOptions.rowData = this.dataList;
                //timeout(() => {
                //    this.progressCalcOptions.api.checkIfProgressRunning(() => {
                //        this.progressCalcOptions.api.startProgress(() => {
                //            this.showModal();
                //            this.disableRun();
                //        })
                //    }, null);
                //}, 2000);
            }
            openPayrollSalary() {
                this.openPayrollSalaryPeriod((data) => {
                    this.handleCloseButton();
                    this.displayPayrollSalaryData();
                });
            }
            closePayrollSalary() {
                this.closePayrollSalaryPeriod((data) => {
                    this.handleCloseButton();
                    this.displayPayrollSalaryData();
                });
            }
            displayPayrollSalaryData() {
                this.displayPayrollSalaryHeaderData();
            }
            handleCloseButton() {
                this.IsClosed((data) => {
                    if (data === true) {
                        var closeBtn = document.getElementById("closeBtn");
                        closeBtn.disabled = true;
                        var openBtn = document.getElementById("openBtn");
                        openBtn.disabled = false;
                        //var runBtn = <HTMLInputElement>document.getElementById("runBtn");
                        //runBtn.disabled = true;
                    }
                    else {
                        var closeBtn = document.getElementById("closeBtn");
                        closeBtn.disabled = false;
                        var openBtn = document.getElementById("openBtn");
                        openBtn.disabled = true;
                        //var runBtn = <HTMLInputElement>document.getElementById("runBtn");
                        //runBtn.disabled = false;
                    }
                });
                //  this.displayPayrollSalaryData();
            }
            activateTab(tab) {
                $('.nav-tabs a[href="#' + tab + '"]').tab('show');
            }
            ;
        }
        Forms.payrollCloseCalcSalary = payrollCloseCalcSalary;
        Forms.hcmsForms.controller('payrollCloseCalcSalaryController', ['translateService', 'dataManagerService', '$filter', '$scope', '$stateParams', function (translateService, dataManagerService, $filter, $scope, $stateParams) {
                return new payrollCloseCalcSalary(translateService, dataManagerService, $filter, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class PayrollCalcTransaction extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $filter, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                this.runStatus = false;
                this.stopStatus = false;
                this.showProgressStatus = false;
                this.displayDataStatus = false;
                this.progressId = 0;
                this.progressTypeId = 3;
                this.payrollTransactionHeaderData = [];
                this.payrollTransactionIsClosed = false;
                this.gridOptions = {};
                this.detailsGrid = { gridOptions: {}, gridColumnDefs: [] };
                this.detailsData = [];
                this.selectedHeaderData = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedHeaderData = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('payrollTransactionDetailsData');
                    this.displayDetailsData();
                };
                //public activateTab(tab) {
                //    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
                //};
                //Event year Changed   
                this.payrollYearChanged = (payrollYear) => {
                    this.dataItem.PayrollYear = payrollYear;
                    this.handleCloseButton();
                };
                //Event Month Changed   
                this.payrollMonthChanged = (payrollMonth) => {
                    this.dataItem.PayrollMonth = payrollMonth;
                    this.handleCloseButton();
                };
                //Event RunId Changed   
                this.payrollRunIdChanged = (runId) => {
                    this.dataItem.PayrollRunId = runId;
                    this.handleCloseButton();
                };
                //Event PayrollGroup Changed   
                this.payrollPayrollGroupIdChanged = (payrollGroupId) => {
                    this.dataItem.PayrollGroupId = payrollGroupId;
                    this.handleCloseButton();
                };
                //Event PayrollGroup Changed   
                this.payrollTransTypeIdChanged = (transactionTypeId) => {
                    this.dataItem.PayrollTransactionTypeId = transactionTypeId;
                    this.handleCloseButton();
                };
                this.run = (valid) => {
                    if (valid) {
                        this.progressCalcOptions.api.checkIfProgressRunning(this.progressCalcOptions.api.startProgress(() => {
                            this.showModal();
                            this.disableRun();
                        }), this.startCalc);
                    }
                };
                this.startCalc = () => {
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    ;
                    //queryString += "&userId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.User.UserId;
                    //queryString += "&langId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + this.dataItem.PayrollGroupId;
                    queryString += "&payrollRunId=" + this.dataItem.PayrollRunId;
                    queryString += "&payrollYear=" + this.dataItem.PayrollYear;
                    queryString += "&payrollMonth=" + this.dataItem.PayrollMonth;
                    queryString += "&transactionTypeId=" + this.dataItem.PayrollTransactionTypeId;
                    this.progressCalcOptions.api.startProgress(() => {
                        this.showModal();
                        this.disableRun();
                    });
                    // this.dbManager.Post("PayrollCalcTransaction", "Run", queryString, empAssignmentIds, (response) => {
                    this.dbManager.Post("PayrollCalcTransaction", "Run", queryString, empAssignmentIds, (response) => {
                        this.stopCalc();
                        this.displayPayrollTransactionData();
                    }, (response) => {
                        this.stopCalc();
                    });
                };
                this.showModal = () => {
                    $('#payrollCalcTransModal').modal('show');
                };
                this.hideModal = () => {
                    $('#payrollCalcTransModal').modal('hide');
                };
                this.stopCalc = () => {
                    this.progressCalcOptions.api.stopProgress(() => {
                        this.hideModal();
                        this.enableRun();
                    });
                };
                this.showProgress = () => {
                    this.progressCalcOptions.api.checkIfProgressRunning(() => {
                        this.showModal();
                        this.disableRun();
                    }, null);
                };
                this.enableRun = () => {
                    this.runStatus = true;
                    this.stopStatus = false;
                    this.showProgressStatus = false;
                    this.displayDataStatus = true;
                };
                this.disableRun = () => {
                    this.runStatus = false;
                    this.stopStatus = true;
                    this.showProgressStatus = true;
                    this.displayDataStatus = false;
                };
                this.displayPayrollTransactionHeaderData = () => {
                    var yer = this.dataItem.PayrollYear;
                    var mon = this.dataItem.PayrollMonth;
                    var runId = this.dataItem.PayrollRunId;
                    var groupId = this.dataItem.PayrollGroupId;
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + groupId;
                    queryString += "&payrollRunId=" + runId;
                    queryString += "&payrollYear=" + yer;
                    queryString += "&payrollMonth=" + mon;
                    queryString += "&transactionTypeId=" + this.dataItem.PayrollTransactionTypeId;
                    var empAssignmentIds = [];
                    if (this.dataItem.EmpAssignmentId.length > 0) {
                        empAssignmentIds = this.dataItem.EmpAssignmentId;
                    }
                    this.dbManager.Post("PayrollCalcTransaction", "GetPayrollTransHeaderData", queryString, empAssignmentIds, (result) => {
                        this.payrollTransactionHeaderData = result.data;
                        // this.activateTab('payrollTransactionHeaderData');
                        this.activeTabIndex = 0;
                    });
                };
                this.displayDetailsData = () => {
                    if (this.selectedHeaderData == null || this.selectedHeaderData.EmpAssignmentId == undefined || this.selectedHeaderData.EmpAssignmentId == null || this.selectedHeaderData.EmpAssignmentId === 0) {
                        return;
                    }
                    var yer = this.dataItem.PayrollYear;
                    var mon = this.dataItem.PayrollMonth;
                    var runId = this.dataItem.PayrollRunId;
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollRunId=" + runId;
                    queryString += "&payrollYear=" + yer;
                    queryString += "&payrollMonth=" + mon;
                    queryString += "&transactionTypeId=" + this.dataItem.PayrollTransactionTypeId;
                    var empAssignments = 'empAssignmentId=' + this.selectedHeaderData.EmpAssignmentId;
                    //if (this.selectedHeaderData.EmpAssignmentId != null && this.selectedHeaderData.EmpAssignmentId.length > 0) {
                    //    empAssignments = this.selectedHeaderData.EmpAssignmentId.map(item => 'empAssignmentIds=' + item.EmpAssignmentId).join('&');
                    //}
                    queryString += "&" + empAssignments;
                    this.dbManager.Get("PayrollCalcTransaction", "GetPayrollTransDetailsData", queryString, (result) => {
                        this.detailsData = result.data;
                    });
                };
                this.openPayrollTransactionPeriod = (callback) => {
                    var yer = this.dataItem.PayrollYear;
                    var mon = this.dataItem.PayrollMonth;
                    var runId = this.dataItem.PayrollRunId;
                    var groupId = this.dataItem.PayrollGroupId;
                    var transactionTypeId = this.dataItem.PayrollTransactionTypeId;
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + groupId;
                    queryString += "&payrollRunId=" + runId;
                    queryString += "&payrollYear=" + yer;
                    queryString += "&payrollMonth=" + mon;
                    queryString += "&transactionTypeId=" + transactionTypeId;
                    this.dbManager.Post("PayrollCalcTransaction", "OpenPayrollTransactionPeriod", queryString, null, (result) => {
                        if (callback != null)
                            callback(result.data);
                    });
                };
                this.closePayrollTransactionPeriod = (callback) => {
                    var yer = this.dataItem.PayrollYear;
                    var mon = this.dataItem.PayrollMonth;
                    var runId = this.dataItem.PayrollRunId;
                    var groupId = this.dataItem.PayrollGroupId;
                    var transactionTypeId = this.dataItem.PayrollTransactionTypeId;
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + groupId;
                    queryString += "&payrollRunId=" + runId;
                    queryString += "&payrollYear=" + yer;
                    queryString += "&payrollMonth=" + mon;
                    queryString += "&transactionTypeId=" + transactionTypeId;
                    this.dbManager.Post("PayrollCalcTransaction", "ClosePayrollTransactionPeriod", queryString, null, (result) => {
                        if (callback != null)
                            callback(result.data);
                    });
                };
                this.IsClosed = (callback) => {
                    if (HCMS.Validations.CommonValidations.isNull(this.dataItem.PayrollYear))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(this.dataItem.PayrollMonth))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(this.dataItem.PayrollRunId))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(this.dataItem.PayrollGroupId))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(this.dataItem.PayrollTransactionTypeId))
                        return;
                    var yer = this.dataItem.PayrollYear;
                    var mon = this.dataItem.PayrollMonth;
                    var runId = this.dataItem.PayrollRunId;
                    var groupId = this.dataItem.PayrollGroupId;
                    var transactionTypeId = this.dataItem.PayrollTransactionTypeId;
                    var queryString = "?formId=" + this.FormSetup.MyForm.FormId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&payrollGroupId=" + groupId;
                    queryString += "&payrollRunId=" + runId;
                    queryString += "&payrollYear=" + yer;
                    queryString += "&payrollMonth=" + mon;
                    queryString += "&transactionTypeId=" + transactionTypeId;
                    this.dbManager.Get("PayrollCalcTransaction", "GetPayrollTransactionPeriodIsClosed", queryString, (result) => {
                        this.payrollTransactionIsClosed = result.data;
                        if (callback != null)
                            callback(result.data);
                    });
                };
                // set Transaction Events
                this.payrollTransYearEvents = { defaultAction: this.payrollYearChanged };
                this.payrollTransMonthEvents = { defaultAction: this.payrollMonthChanged };
                this.payrollTransRunIdEvents = { defaultAction: this.payrollRunIdChanged };
                this.payrollTransPayrollGroupIdEvents = { defaultAction: this.payrollPayrollGroupIdChanged };
                this.payrollTransTypeIdEvents = { defaultAction: this.payrollTransTypeIdChanged };
                this.filter = $filter;
                this.progressCalcOptions = { progressTitle: "Payroll Calc Transactions" };
                this.dbManager.Get("SystemProgress", "GetByProgressTypeId", "?progressTypeId=3", (result) => {
                    this.progressId = result.data.ProgressId;
                });
                this.dataItem = {};
                var detailsGridColumnDefs = [
                    { headerName: "PayItemCode", field: "PayItemCode" },
                    { headerName: "PayItemName", field: "PayItemName" },
                    { headerName: "InputAmount", field: "InputAmount" },
                ];
                this.detailsGrid = {
                    gridOptions: {
                        rowData: this.detailsData,
                        columnDefs: detailsGridColumnDefs
                    },
                    gridColumnDefs: detailsGridColumnDefs
                };
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    //this.grid.gridColumnDefs = columnDefs;
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    this.createViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.IndexView.Load();
                    this.FormSetup.MyForm.CreateView.Load();
                });
                this.handleCloseButton();
            }
            openPayrollTransaction() {
                this.openPayrollTransactionPeriod((data) => {
                    this.handleCloseButton();
                });
            }
            closePayrollTransaction() {
                this.closePayrollTransactionPeriod((data) => {
                    this.handleCloseButton();
                });
            }
            displayPayrollTransactionData() {
                this.displayPayrollTransactionHeaderData();
            }
            handleCloseButton() {
                this.IsClosed((data) => {
                    if (data === true) {
                        var closeBtn = document.getElementById("closeBtn");
                        closeBtn.disabled = true;
                        var openBtn = document.getElementById("openBtn");
                        openBtn.disabled = false;
                        var runBtn = document.getElementById("runBtn");
                        runBtn.disabled = true;
                    }
                    else {
                        var closeBtn = document.getElementById("closeBtn");
                        closeBtn.disabled = false;
                        var openBtn = document.getElementById("openBtn");
                        openBtn.disabled = true;
                        var runBtn = document.getElementById("runBtn");
                        runBtn.disabled = false;
                    }
                });
            }
        }
        Forms.PayrollCalcTransaction = PayrollCalcTransaction;
        Forms.hcmsForms.controller('payrollCalcTransactionController', ['translateService', 'dataManagerService', '$filter', '$scope', '$stateParams', function (translateService, dataManagerService, $filter, $scope, $stateParams) {
                return new PayrollCalcTransaction(translateService, dataManagerService, $filter, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class PermissionTransaction extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                //Event FromTime Changed   
                this.fromTimeChanged = (fromTime) => {
                    if (!HCMS.Validations.CommonValidations.isNull(this.dataItem.Duration)) {
                        var FromDateTime = HCMS.Validations.DateValidations.toDateTime(fromTime);
                        this.dataItem.ToTime = HCMS.Validations.DateValidations.timeAddHours(FromDateTime, this.dataItem.Duration);
                    }
                };
                //Event ToTime Changed   
                this.toTimeChanged = (toTime) => {
                    //var Totime = toTime.getHours() + ":" + toTime.getMinutes() + ":" + toTime.getSeconds();
                    var ToDateTime = HCMS.Validations.DateValidations.toDateTime(toTime);
                    var FromDateTime = HCMS.Validations.DateValidations.toDateTime(this.dataItem.FromTime);
                    this.dataItem.Duration = HCMS.Validations.DateValidations.dateDiffHours(FromDateTime, ToDateTime);
                };
                // Event DurationChanged
                this.durationChanged = (duration) => {
                    if (!HCMS.Validations.CommonValidations.isNull(duration)) {
                        // var FromDateTime = HCMS.Validations.DateValidations.toDateTime(this.dataItem.FromTime);
                        var FromDateTime = HCMS.Validations.DateValidations.toDateTime(this.dataItem.FromTime);
                        this.dataItem.ToTime = HCMS.Validations.DateValidations.timeAddHours(FromDateTime, duration);
                    }
                };
                //set TransactionEvents
                this.permisionFromtimeEvents = { defaultAction: this.fromTimeChanged };
                this.permisionTotimeEvents = { defaultAction: this.toTimeChanged };
                this.permisionDurationEvents = { defaultAction: this.durationChanged };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.PermissionTransaction = PermissionTransaction;
        Forms.hcmsForms.controller('permissionTransactionController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new PermissionTransaction(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class PermissionTransHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedPermissionProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = { selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.PermissionTransHome = PermissionTransHome;
        Forms.hcmsForms.controller('permissionTransHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new PermissionTransHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EndOfServiceTransHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedEndOfServiceProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = {
                    selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false
                };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.EndOfServiceTransHome = EndOfServiceTransHome;
        Forms.hcmsForms.controller('endOfServiceTransHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EndOfServiceTransHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EndOfServiceTransaction extends Forms.BaseSubFormManager {
            // private vacationFromDateEvents: IEndOfServiceTransEvent;
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
                this.displayTimeRange = false;
                this.vacationRule = {};
                this.empEndOfServiceIsClosed = false;
                //Event fromDate Changed   
                this.fromDateChanged = (fromDate) => {
                    fromDate = HCMS.Validations.DateValidations.toUtcDate(fromDate);
                    this.setFromToDateChanged(fromDate, this.dataItem.EmpEndOfServiceDate);
                    //this.getVacationBalance(this.dataItem.VacationId, this.empAssignmentId, this.dataItem.EmpVacationId, fromDate)
                };
                //Event toDate Changed 
                this.toDateChanged = (toDate) => {
                    toDate = HCMS.Validations.DateValidations.toUtcDate(toDate);
                    this.setFromToDateChanged(this.dataItem.EndOfServiceNoticeDate, toDate);
                };
                //set fromDate or toDate Changed
                this.setFromToDateChanged = (fromDate, toDate) => {
                    if (!HCMS.Validations.DateValidations.isDate(fromDate) || !HCMS.Validations.DateValidations.isDate(toDate)) {
                        return;
                    }
                    this.dataItem.EndOfServiceNoticeDays = HCMS.Validations.DateValidations.dateDiffDays(fromDate, toDate) + 1;
                };
                //Event days Changed
                this.daysChanged = (days) => {
                    var fromDate = this.dataItem.EndOfServiceNoticeDate;
                    var toDate = this.dataItem.EmpEndOfServiceDate;
                    if (!HCMS.Validations.DateValidations.isDate(fromDate) && !HCMS.Validations.DateValidations.isDate(toDate)) {
                        return;
                    }
                    if (HCMS.Validations.DateValidations.isDate(fromDate)) {
                        if (days < 1)
                            var d = HCMS.Validations.DateValidations.dateAddDays(fromDate, days);
                        else
                            var d = HCMS.Validations.DateValidations.dateAddDays(fromDate, days - 1);
                        this.dataItem.EmpEndOfServiceDate = HCMS.Validations.DateValidations.toUtcDate(d);
                    }
                };
                this.closeEmployee = () => {
                    this.smartAlert.Confirm("Are you sure you want to deactivate Employee?", "", () => {
                        var empEndOfServiceId = this.dataItem.EmpEndOfServiceId;
                        var queryString = "?empEndOfServiceId=" + empEndOfServiceId;
                        this.dbManager.Post("EndOfService", "CloseEmployee", queryString, null, (result) => {
                            this.GetDataByParentId();
                            this.IsClosed();
                        });
                    });
                };
                this.openEmployee = () => {
                    this.smartAlert.Confirm("Are you sure you want to activate Employee?", "", () => {
                        var empEndOfServiceId = this.dataItem.EmpEndOfServiceId;
                        var queryString = "?empEndOfServiceId=" + empEndOfServiceId;
                        this.dbManager.Post("EndOfService", "OpenEmployee", queryString, null, (result) => {
                            this.GetDataByParentId();
                            this.IsClosed();
                        });
                    });
                };
                this.IsClosed = (callback) => {
                    var empEndOfServiceId = this.dataItem.EmpEndOfServiceId;
                    var queryString = "?empEndOfServiceId=" + empEndOfServiceId;
                    this.dbManager.Get("EndOfService", "GetEmpEndOfServiceIsClosed", queryString, (result) => {
                        this.empEndOfServiceIsClosed = result.data;
                        this.dataItem.IsClose = this.empEndOfServiceIsClosed;
                        if (callback != null)
                            callback(result.data);
                    });
                };
                // set Transaction Events
                this.endOfServiceNoticeDateEvents = { defaultAction: this.fromDateChanged };
                this.empEndOfServiceDateEvents = { defaultAction: this.toDateChanged };
                this.endOfServiceNoticeDaysEvents = { defaultAction: this.daysChanged };
                //  this.vacationFromDateEvents = { defaultAction: this.fromDateChanged };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
                this.OnCreateNewClicked.addHandler(() => {
                    this.dataItem.EndOfServiceNoticeDays = 0;
                });
                this.OnEditClicked.addHandler(() => {
                    this.IsClosed();
                });
            }
        }
        Forms.EndOfServiceTransaction = EndOfServiceTransaction;
        Forms.hcmsForms.controller('endOfServiceTransactionController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EndOfServiceTransaction(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class PenaltyTransaction extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                //set penalty actions by changing PenaltyDate  
                this.penaltyDateChanged = (penaltyDate) => {
                    this.setPenaltyActions(this.dataItem.PenaltyId, penaltyDate);
                };
                //set penalty actions by changing penaltyId 
                this.penaltyIdChanged = (penaltyId) => {
                    this.setPenaltyActions(penaltyId, this.dataItem.EmpPenaltyDate);
                };
                // setPenaltyActions
                this.setPenaltyActions = (penaltyId, penaltyDate) => {
                    if (HCMS.Validations.CommonValidations.isNull(penaltyId)) {
                        return;
                    }
                    var empAssignmentId = this.empAssignmentId;
                    if (HCMS.Validations.CommonValidations.isNull(empAssignmentId))
                        return;
                    if (!HCMS.Validations.DateValidations.isDate(penaltyDate)) {
                        //penaltyDate = new Date(2000, 1, 1, 12, 0, 0, 0)
                        return;
                    }
                    penaltyDate = penaltyDate.toJSON();
                    var queryString = '?empAssignmentId=' + empAssignmentId + '&penaltyId=' + penaltyId + '&penaltyDate=' + penaltyDate;
                    this.dbManager.Get(this.FormSetup.MyForm.FormController, 'GetPenaltyActions', queryString, (response) => {
                        var result = response.data[0];
                        this.dataItem.PenaltyUnitId = result.PenaltyUnitId;
                        this.dataItem.PenaltyActionId = result.PenaltyActionId;
                        this.dataItem.PenaltyAmount = result.PenaltyAmount;
                        this.dataItem.RepetitionNumber = result.RepetitionNumber;
                    }, null);
                };
                // set Transaction Events
                this.penaltyIdEvents = { defaultAction: this.penaltyIdChanged };
                this.penaltyDateEvents = { defaultAction: this.penaltyDateChanged };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.PenaltyTransaction = PenaltyTransaction;
        Forms.hcmsForms.controller('penaltyTransactionController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new PenaltyTransaction(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class PenaltyTransHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedPenaltyProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = { selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.PenaltyTransHome = PenaltyTransHome;
        Forms.hcmsForms.controller('penaltyTransHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new PenaltyTransHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class MissionTransaction extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.displayTimeRange = true;
                //Event fromDate Changed   
                this.fromDateChanged = (fromDate) => {
                    fromDate = HCMS.Validations.DateValidations.toUtcDate(fromDate);
                    this.setFromToDateChanged(fromDate, this.dataItem.MissionToDate);
                };
                //Event toDate Changed 
                this.toDateChanged = (toDate) => {
                    toDate = HCMS.Validations.DateValidations.toUtcDate(toDate);
                    this.setFromToDateChanged(this.dataItem.MissionFromDate, toDate);
                };
                //set fromDate or toDate Changed
                this.setFromToDateChanged = (fromDate, toDate) => {
                    if (!HCMS.Validations.DateValidations.isDate(fromDate) || !HCMS.Validations.DateValidations.isDate(toDate)) {
                        return;
                    }
                    this.dataItem.MissionDays = HCMS.Validations.DateValidations.dateDiffDays(fromDate, toDate) + 1;
                    this.dataItem.MissionPartDate = toDate;
                };
                //Event Missiondays Changed
                this.missionDaysChanged = (missionDays) => {
                    var fromDate = this.dataItem.MissionFromDate;
                    var toDate = this.dataItem.MissionToDate;
                    if (!HCMS.Validations.DateValidations.isDate(fromDate) && !HCMS.Validations.DateValidations.isDate(toDate)) {
                        return;
                    }
                    if (HCMS.Validations.DateValidations.isDate(fromDate)) {
                        var d = HCMS.Validations.DateValidations.dateAddDays(fromDate, missionDays - 1);
                        this.dataItem.MissionToDate = HCMS.Validations.DateValidations.toUtcDate(d);
                    }
                };
                //Event FromTime Changed   
                this.fromTimeChanged = (fromTime) => {
                    if (!HCMS.Validations.CommonValidations.isNull(this.dataItem.Duration)) {
                        var FromDateTime = HCMS.Validations.DateValidations.toDateTime(fromTime);
                        this.dataItem.MissionToTime = HCMS.Validations.DateValidations.timeAddHours(FromDateTime, this.dataItem.Duration);
                    }
                };
                //Event ToTime Changed
                this.toTimeChanged = (toTime) => {
                    //var Totime = toTime.getHours() + ":" + toTime.getMinutes() + ":" + toTime.getSeconds();
                    var ToDateTime = HCMS.Validations.DateValidations.toDateTime(toTime);
                    var FromDateTime = HCMS.Validations.DateValidations.toDateTime(this.dataItem.MissionFromTime);
                    this.dataItem.Duration = HCMS.Validations.DateValidations.dateDiffHours(FromDateTime, ToDateTime);
                };
                // Event DurationChanged
                this.durationChanged = (duration) => {
                    if (!HCMS.Validations.CommonValidations.isNull(duration)) {
                        // var FromDateTime = HCMS.Validations.DateValidations.toDateTime(this.dataItem.MissionFromTime);
                        var FromDateTime = HCMS.Validations.DateValidations.toDateTime(this.dataItem.MissionFromTime);
                        this.dataItem.MissionToTime = HCMS.Validations.DateValidations.timeAddHours(FromDateTime, duration);
                    }
                };
                //Event ISFullDay True
                this.isFullDayChanged = (isFullDay) => {
                    if (!HCMS.Validations.CommonValidations.isNull(isFullDay) && isFullDay == true) {
                        this.displayTimeRange = false;
                        //Reset values of fromtime and to time
                        this.dataItem.MissionFromTime = null;
                        this.dataItem.MissionToTime = null;
                        this.dataItem.Duration = null;
                        //this.dataItem.MissionPartDate = null;
                    }
                    else
                        this.displayTimeRange = true;
                };
                //set TransactionEvents
                this.missionFromtimeEvents = { defaultAction: this.fromTimeChanged };
                this.missionTotimeEvents = { defaultAction: this.toTimeChanged };
                this.missionDurationEvents = { defaultAction: this.durationChanged };
                this.missionIsFullDayEvents = { defaultAction: this.isFullDayChanged };
                this.missionDaysEvents = { defaultAction: this.missionDaysChanged };
                this.missionFromDateEvents = { defaultAction: this.fromDateChanged };
                this.missionToDateEvents = { defaultAction: this.toDateChanged };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.MissionTransaction = MissionTransaction;
        Forms.hcmsForms.controller('missionTransactionController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new MissionTransaction(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class MissionTransHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedMissionProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = { selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.MissionTransHome = MissionTransHome;
        Forms.hcmsForms.controller('missionTransHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new MissionTransHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpAssignmentTabsController {
            constructor(translateService, dbManager, scope, $stateParams) {
                this.$onInit = () => { };
                this.stackTabOptions = {};
                //inherit BaseFormManager
                //set login Info
                this.scope = scope;
                this.parentIdFieldName = 'EmpAssignmentId';
                this.parentItem = scope.parentItem;
                var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                //if (currentInfo == null) {
                //    currentInfo = new DataAccess.CurrentLoginInfo(dbManager);
                //    var currentUser = angular.fromJson(sessionStorage['user']);
                //    currentInfo.SetLoginInfo({ UserId: currentUser.userId, LangId: currentUser.langId, DatabaseProfileId: currentUser.databaseProfileId, CompanyId: currentUser.companyId });
                //    DataAccess.StartUp.SetCurrentLoginInfo(currentInfo);
                //}
                this.FormSetup = new Forms.BaseFormSetup(translateService, dbManager, currentInfo.User.UserId, scope.formId);
                this.FormSetup.LoadForm();
                this.scope.$watch(() => this.scope.parentItem, (newValue, oldValue) => {
                    if (oldValue !== newValue) {
                        this.parentItem = newValue;
                        this.stackTabOptions.api.activateFirstTab();
                    }
                });
            }
        }
        Forms.EmpAssignmentTabsController = EmpAssignmentTabsController;
        // hcmsForms.controller('personalDataTabsController', PersonalDataTabsController);
        Forms.hcmsForms.controller('empAssignmentTabsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpAssignmentTabsController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpAssignmentSubFormController extends Forms.BaseSubFormManager {
            //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    var empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(empAssignmentId))
                        empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&EmpAssignmentId=' + empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.EmpAssignmentSubFormController = EmpAssignmentSubFormController;
        // hcmsForms.controller('profileSubFormController', ProfileSubFormController);
        Forms.hcmsForms.controller('empAssignmentSubFormController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpAssignmentSubFormController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class EmpAssignmentController extends Forms.BaseSubFormManager {
            //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.addNewClick = () => {
                    this.addItemView(() => {
                        this.dataItem.EmpStatusId = 1;
                    });
                };
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    var profileId = currentObject.parentItem["ProfileId"];
                    if (angular.isUndefined(profileId))
                        profileId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&profileId=' + profileId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByProfileId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
                this.OnAdded.addHandler((result) => {
                    setTimeout(() => {
                        this.parentItem.EmpAssignmentId = result.data.Result;
                    }, 200);
                });
                this.OnEditClicked.addHandler((result) => {
                    setTimeout(() => {
                        this.parentItem.EmpAssignmentId = result.data.EmpAssignmentId;
                    }, 200);
                });
                this.OnAdding.addHandler((result) => {
                    this.dataItem.ProfileId = this.parentItem.ProfileId;
                });
                scope.$watch(() => scope.parentItem.ProfileId, (newValue, oldValue) => {
                    if (oldValue !== newValue) {
                        this.parentItem.ProfileId = newValue;
                        this.dataItem = {};
                        this.dataList = [];
                        if (this.GetDataByParentId !== null) {
                            this.GetDataByParentId();
                        }
                    }
                });
            }
        }
        Forms.EmpAssignmentController = EmpAssignmentController;
        // hcmsForms.controller('profileSubFormController', ProfileSubFormController);
        Forms.hcmsForms.controller('empAssignmentController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new EmpAssignmentController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class VacationTransaction extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
                this.displayTimeRange = false;
                this.vacationRule = {};
                //setDisplayTimeRang
                this.setDisplayTimeRang = (partDate) => {
                    if (HCMS.Validations.DateValidations.isDate(partDate)) {
                        this.displayTimeRange = true;
                    }
                    else {
                        this.displayTimeRange = false;
                    }
                };
                // is VactionRule Allow PArt Day
                this.isPartDay = (isPartDay) => {
                    if (isPartDay) {
                        this.displayTimeRange = true;
                    }
                    else {
                        this.displayTimeRange = false;
                    }
                };
                ////get data by parentId
                //private getDataByEmployeeId = () => {
                //    if (angular.isUndefined(this.empAssignmentId)) this.empAssignmentId = 0;
                //    var queryString = this.FormData.getCommonParams() + '&empAssignmentId=' + this.empAssignmentId;
                //    this.dbManager.Get(this.FormSetup.MyForm.FormController, 'GetByAssignmentId', queryString,  (response)=> {
                //        this.dataList = response.data;
                //    }, null);
                //}
                //get getVacationRule
                this.getVacationRule = (vacationId) => {
                    if (HCMS.Validations.CommonValidations.isNull(vacationId))
                        return;
                    var queryString = this.FormData.getCommonParams() + '&vacationId=' + vacationId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    this.dbManager.Get(this.FormSetup.MyForm.FormController, 'GetRule', queryString, (response) => {
                        this.vacationRule = response.data;
                        this.isPartDay(this.vacationRule.IsDayFraction);
                    }, null);
                };
                //get Balance
                this.getVacationBalance = (vacationId, empAssignmentId, empVacationId, asOfDate) => {
                    if (HCMS.Validations.CommonValidations.isNull(vacationId))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(empAssignmentId))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(asOfDate))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(empVacationId))
                        empVacationId = 0;
                    var queryString = this.FormData.getCommonParams() + '&vacationId=' + vacationId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&empAssignmentId=" + empAssignmentId;
                    queryString += "&asOfDate=" + HCMS.Validations.DateValidations.toDate(asOfDate);
                    queryString += "&empVacationId=" + empVacationId;
                    this.dbManager.Get(this.FormSetup.MyForm.FormController, 'GetBalance', queryString, (response) => {
                        this.dataItem.VacationBalance = response.data;
                        this.checkConsumedDays(this.dataItem.VacationFromDate, this.dataItem.VacationToDate, this.dataItem.VacationDays);
                    }, null);
                };
                //get Actuall Consumed
                this.getActuallConsumed = (vacationId, empAssignmentId, empVacationId, fromDate, toDate, partDate, days) => {
                    if (HCMS.Validations.CommonValidations.isNull(vacationId))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(empAssignmentId))
                        return;
                    if (!HCMS.Validations.DateValidations.isDate(fromDate))
                        return;
                    if (!HCMS.Validations.DateValidations.isDate(toDate))
                        return;
                    if (!HCMS.Validations.DateValidations.isDate(partDate))
                        return;
                    if (HCMS.Validations.CommonValidations.isNull(empVacationId))
                        empVacationId = 0;
                    if (HCMS.Validations.CommonValidations.isNull(days))
                        days = 0;
                    var queryString = this.FormData.getCommonParams() + '&vacationId=' + vacationId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&empAssignmentId=" + empAssignmentId;
                    queryString += "&fromDate=" + HCMS.Validations.DateValidations.toDate(fromDate);
                    queryString += "&toDate=" + HCMS.Validations.DateValidations.toDate(toDate);
                    queryString += "&partDate=" + HCMS.Validations.DateValidations.toDate(partDate);
                    queryString += "&empVacationId=" + empVacationId;
                    queryString += "&vacationDays=" + days;
                    this.dbManager.Get(this.FormSetup.MyForm.FormController, 'GetConsumed', queryString, (response) => {
                        this.dataItem.VacationConsumed = response.data;
                        this.dataItem.VacationRemaining = this.dataItem.VacationBalance - this.dataItem.VacationConsumed;
                    }, null);
                };
                //check Consumed Days
                this.checkConsumedDays = (fromDate, toDate, days) => {
                    this.getActuallConsumed(this.dataItem.VacationId, this.empAssignmentId, this.dataItem.EmpVacationId, fromDate, toDate, this.dataItem.partDate, days);
                };
                //set Return Date
                this.setReturnDate = (toDate) => {
                    this.dataItem.VacationReturn = HCMS.Validations.DateValidations.dateAddDays(toDate, 1);
                };
                //Event fromDate Changed   
                this.fromDateChanged = (fromDate) => {
                    fromDate = HCMS.Validations.DateValidations.toUtcDate(fromDate);
                    this.setFromToDateChanged(fromDate, this.dataItem.VacationToDate);
                    this.getVacationBalance(this.dataItem.VacationId, this.empAssignmentId, this.dataItem.EmpVacationId, fromDate);
                };
                //Event toDate Changed 
                this.toDateChanged = (toDate) => {
                    toDate = HCMS.Validations.DateValidations.toUtcDate(toDate);
                    this.setFromToDateChanged(this.dataItem.VacationFromDate, toDate);
                };
                //set fromDate or toDate Changed
                this.setFromToDateChanged = (fromDate, toDate) => {
                    if (!HCMS.Validations.DateValidations.isDate(fromDate) || !HCMS.Validations.DateValidations.isDate(toDate)) {
                        return;
                    }
                    this.dataItem.VacationDays = HCMS.Validations.DateValidations.dateDiffDays(fromDate, toDate) + 1;
                    this.setReturnDate(toDate);
                    //this.dataItem.VacationFromDate = fromDate;
                    //this.dataItem.VacationToDate = toDate;
                    this.checkConsumedDays(fromDate, toDate, this.dataItem.VacationDays);
                };
                //Event days Changed
                this.daysChanged = (days) => {
                    var fromDate = this.dataItem.VacationFromDate;
                    var toDate = this.dataItem.VacationToDate;
                    if (!HCMS.Validations.DateValidations.isDate(fromDate) && !HCMS.Validations.DateValidations.isDate(toDate)) {
                        return;
                    }
                    if (HCMS.Validations.DateValidations.isDate(fromDate)) {
                        if (days < 1)
                            var d = HCMS.Validations.DateValidations.dateAddDays(fromDate, days);
                        else
                            var d = HCMS.Validations.DateValidations.dateAddDays(fromDate, days - 1);
                        this.dataItem.VacationToDate = HCMS.Validations.DateValidations.toUtcDate(d);
                    }
                    this.setReturnDate(this.dataItem.VacationToDate);
                    this.checkConsumedDays(fromDate, this.dataItem.VacationToDate, days);
                };
                //Event partDate Changed
                this.partDateChanged = (partDate) => {
                    this.setDisplayTimeRang(partDate);
                };
                // Event fromTime Changed
                this.fromTimeChanged = (fromTime) => {
                };
                // Event toTime Changed
                this.toTimeChanged = (toTime) => {
                };
                //Event vacationId Changed
                this.vacationIdChanged = (vacationId) => {
                    var empAssignmentId = this.empAssignmentId;
                    var fromDate = this.dataItem.VacationFromDate;
                    var toDate = this.dataItem.VacationToDate;
                    this.getVacationBalance(vacationId, empAssignmentId, this.dataItem.EmpVacationId, toDate);
                    this.checkConsumedDays(fromDate, toDate, this.dataItem.VacationDays);
                    this.getVacationRule(vacationId);
                };
                // set Transaction Events
                this.vacationFromDateEvents = { defaultAction: this.fromDateChanged };
                this.vacationToDateEvents = { defaultAction: this.toDateChanged };
                this.vacationDaysEvents = { defaultAction: this.daysChanged };
                this.vacationPartDateEvents = { defaultAction: this.partDateChanged };
                this.vacationFromTimeEvents = { defaultAction: this.fromTimeChanged };
                this.vacationToTimeEvents = { defaultAction: this.toTimeChanged };
                this.vacationIdEvents = { defaultAction: this.vacationIdChanged };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.empAssignmentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.empAssignmentId))
                        currentObject.empAssignmentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&empAssignmentId=' + currentObject.empAssignmentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByEmpAssignmentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.VacationTransaction = VacationTransaction;
        Forms.hcmsForms.controller('vacationTransactionController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new VacationTransaction(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class VacationTransHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.listOptions = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedVacationProfile');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.listOptions = {
                    selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false
                };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                });
            }
        }
        Forms.VacationTransHome = VacationTransHome;
        Forms.hcmsForms.controller('vacationTransHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new VacationTransHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class UploadEmpVacationDueAdjustmentHome extends Forms.excelHeadersHome {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope, $stateParams);
                this.$onInit = () => { };
                this.selectClicked = (item) => {
                    this.dataItem = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedexcelVacDueAdjHeader');
                };
                this.addNewClicked = () => {
                    //this.dataItem = {};
                    this.dataItem.RefNo = undefined;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedexcelVacDueAdjHeader');
                };
            }
        }
        Forms.UploadEmpVacationDueAdjustmentHome = UploadEmpVacationDueAdjustmentHome;
        Forms.hcmsForms.controller('uploadEmpVacationDueAdjustmentHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new UploadEmpVacationDueAdjustmentHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
        class UploadEmpVacationDueAdjustment extends Forms.BaseFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                super(translateService, dbManager, scope.formId);
                this.scope = scope;
                this.$onInit = () => { };
                this.xlsOptions = { data: [], fileName: "", onChanged: null, onClick: null };
                this.RefNo = 0;
                this.FileName = "";
                this.LoadFromExcel = () => __awaiter(this, void 0, void 0, function* () {
                    //this.dbManager.Post(this.FormSetup.MyForm.FormController, "GetList", "", data, (result) => {
                    //    this.dataList = result.data;
                    //}, (result) => {
                    //    this.smartALert.Error(result.data);
                    //})
                    if (this.RefNo <= 0) {
                        this.smartALert.Warning("Please enter Reference No");
                        return false;
                    }
                    //this.FileName = (this.xlsOptions.fileName == null || this.xlsOptions.fileName == "" ? "text" : this.xlsOptions.fileName);
                    this.FileName = this.xlsOptions.fileName;
                    var data = this.xlsOptions.data;
                    if (this.FileName == null || this.FileName == "" || data == null || data.length <= 0) {
                        this.smartALert.Warning("Please select file for upload.");
                        return false;
                    }
                    var queryString = "?refNo=" + this.RefNo + "&fileName=" + this.FileName;
                    //if (data == null || data.length <= 0) return false;
                    var postResult = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "SaveList", queryString, data);
                    this.getList();
                });
                this.clearSelectedFile = (e) => {
                    e.wrap('<form>').closest('form').get(0).reset();
                    e.unwrap();
                    //// Prevent form submission
                    //e.stopPropagation();
                    //e.preventDefault();
                };
                this.getList = () => __awaiter(this, void 0, void 0, function* () {
                    var queryString = "?refNo=" + this.RefNo;
                    var result = yield this.dbManager.GetPromise(this.FormSetup.MyForm.FormController, "GetList", queryString);
                    this.dataList = result.data;
                });
                this.createNew = () => __awaiter(this, void 0, void 0, function* () {
                    this.dataList = [];
                    var result = yield this.dbManager.GetPromise(this.FormSetup.MyForm.FormController, "GetMaxRefNo", "");
                    this.RefNo = result.data;
                });
                this.loadByRefNo = () => __awaiter(this, void 0, void 0, function* () {
                    if (this.RefNo <= 0) {
                        this.smartALert.Warning("Please enter Reference No");
                        return false;
                    }
                    this.getList();
                });
                this.postItemList = () => __awaiter(this, void 0, void 0, function* () {
                    var queryString = "?refNo=" + this.RefNo;
                    var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ RefId }) => RefId);
                    if (selectedRows.length > 0) {
                        var result = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "PostList", queryString, selectedIds);
                        //var result2 = await this.getList();
                        this.smartALert.Alert("Records has been posted successfully");
                        this.getList();
                    }
                    else {
                        this.smartALert.Warning("You must select record(s) to post.");
                    }
                });
                this.unPostItemList = () => __awaiter(this, void 0, void 0, function* () {
                    this.smartALert.Confirm("are you sure to delete these items", "", () => __awaiter(this, void 0, void 0, function* () {
                        var queryString = "?refNo=" + this.RefNo;
                        var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                        let selectedIds = selectedRows.map(({ RefId }) => RefId);
                        if (selectedRows.length > 0) {
                            var result = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "UnPostList", queryString, selectedIds);
                            //var result2 = await this.getList();
                            this.smartALert.Alert("Records has been posted successfully");
                            this.getList();
                        }
                        else {
                            this.smartALert.Warning("You must select record(s) to unpost.");
                        }
                        //for (let entry of selectedRows) {
                        //    var index = this.dataList.indexOf(entry);
                        //    this.dataList.splice(index, 1);
                        //}
                    }));
                });
                this.deleteRefNo = () => __awaiter(this, void 0, void 0, function* () {
                    this.smartALert.Confirm("are you sure to delete these items", "", () => __awaiter(this, void 0, void 0, function* () {
                        var queryString = "?refNo=" + this.RefNo;
                        var result = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "Delete", queryString, null);
                        var message = new HCMS.Controls.messageHandler();
                        message.MessageConfirmation(result.data, "Deleted Successfuly");
                        this.loadByRefNo();
                    }));
                });
                //private saveItemList = (valid) => {
                //    if (this.xlsOptions.data !== null) {
                //        // var data = JSON.parse(this.xlsOptions.data.toString());
                //        var data = this.dataList;// JSON.stringify(this.xlsOptions.data);
                //        this.dbManager.Post(this.FormSetup.MyForm.FormController, "SaveList", "", data, (result) => {
                //            this.smartALert.Alert("Saved Successfully");
                //        }, (result) => {
                //            this.smartALert.Error(result.data);
                //        })
                //    }
                //}
                this.deleteClicked = (item) => {
                    this.smartALert.Confirm("are you sure to delete this item", "", () => {
                        var index = this.dataList.indexOf(item);
                        this.dataList.splice(index, 1);
                    });
                };
                this.deleteSelectedRows = () => {
                    this.smartALert.Confirm("are you sure to delete this item", "", () => {
                        var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                        for (let entry of selectedRows) {
                            var index = this.dataList.indexOf(entry);
                            this.dataList.splice(index, 1);
                        }
                    });
                };
                this.smartALert = new HCMS.Controls.SmartAlert();
                this.FormSetup.LoadForm((form) => {
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    this.FormSetup.MyForm.IndexView.Load();
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.scope.$watch(() => this.scope.parentItem.RefNo, (newValue, oldValue) => {
                        if (oldValue !== newValue) {
                            if (newValue !== undefined) {
                                this.RefNo = Number.parseInt(newValue);
                                this.RefNo = this.RefNo;
                                this.loadByRefNo();
                            }
                            else {
                                this.createNew();
                            }
                        }
                    });
                    //this.createNew();
                    //  this.RefNo = ExcelHeader.selectedProfile
                });
                this.xlsOptions.onClick = this.clearSelectedFile;
                //this.xlsOptions.onChanged = this.emportDataChanged;
            }
            ;
        }
        Forms.UploadEmpVacationDueAdjustment = UploadEmpVacationDueAdjustment;
        Forms.hcmsForms.controller('uploadEmpVacationDueAdjustmentController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new UploadEmpVacationDueAdjustment(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class UploadEmpVacationsHome extends Forms.excelHeadersHome {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope, $stateParams);
                this.$onInit = () => { };
                this.selectClicked = (item) => {
                    this.dataItem = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedexcelVacTransHeader');
                };
                this.addNewClicked = () => {
                    //this.dataItem = {};
                    this.dataItem.RefNo = undefined;
                    this.activeTabIndex = 1;
                    // this.activateTab('selectedexcelVacTransHeader');
                };
            }
        }
        Forms.UploadEmpVacationsHome = UploadEmpVacationsHome;
        Forms.hcmsForms.controller('uploadEmpVacationsHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new UploadEmpVacationsHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
        class UploadEmpVacations extends Forms.BaseFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                super(translateService, dbManager, scope.formId);
                this.scope = scope;
                this.$onInit = () => { };
                this.xlsOptions = { data: [], fileName: "", onChanged: null, onClick: null };
                this.RefNo = 0;
                this.FileName = "";
                this.LoadFromExcel = () => __awaiter(this, void 0, void 0, function* () {
                    //this.dbManager.Post(this.FormSetup.MyForm.FormController, "GetList", "", data, (result) => {
                    //    this.dataList = result.data;
                    //}, (result) => {
                    //    this.smartALert.Error(result.data);
                    //})
                    if (this.RefNo <= 0) {
                        this.smartALert.Warning("Please enter Reference No");
                        return false;
                    }
                    //this.FileName = (this.xlsOptions.fileName == null || this.xlsOptions.fileName == "" ? "text" : this.xlsOptions.fileName);
                    this.FileName = this.xlsOptions.fileName;
                    var data = this.xlsOptions.data;
                    if (this.FileName == null || this.FileName == "" || data == null || data.length <= 0) {
                        this.smartALert.Warning("Please select file for upload.");
                        return false;
                    }
                    var queryString = "?refNo=" + this.RefNo + "&fileName=" + this.FileName;
                    //if (data == null || data.length <= 0) return false;
                    var postResult = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "SaveList", queryString, data);
                    this.getList();
                });
                this.clearSelectedFile = (e) => {
                    e.wrap('<form>').closest('form').get(0).reset();
                    e.unwrap();
                    //// Prevent form submission
                    //e.stopPropagation();
                    //e.preventDefault();
                };
                this.getList = () => __awaiter(this, void 0, void 0, function* () {
                    var queryString = "?refNo=" + this.RefNo;
                    var result = yield this.dbManager.GetPromise(this.FormSetup.MyForm.FormController, "GetList", queryString);
                    this.dataList = result.data;
                });
                this.createNew = () => __awaiter(this, void 0, void 0, function* () {
                    this.dataList = [];
                    var result = yield this.dbManager.GetPromise(this.FormSetup.MyForm.FormController, "GetMaxRefNo", "");
                    this.RefNo = result.data;
                });
                this.loadByRefNo = () => __awaiter(this, void 0, void 0, function* () {
                    if (this.RefNo <= 0) {
                        this.smartALert.Warning("Please enter Reference No");
                        return false;
                    }
                    this.getList();
                });
                this.postItemList = () => __awaiter(this, void 0, void 0, function* () {
                    var queryString = "?refNo=" + this.RefNo;
                    var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                    let selectedIds = selectedRows.map(({ RefId }) => RefId);
                    if (selectedRows.length > 0) {
                        var result = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "PostList", queryString, selectedIds);
                        //var result2 = await this.getList();
                        this.smartALert.Alert("Records has been posted successfully");
                        this.getList();
                    }
                    else {
                        this.smartALert.Warning("You must select record(s) to post.");
                    }
                });
                this.unPostItemList = () => __awaiter(this, void 0, void 0, function* () {
                    this.smartALert.Confirm("are you sure to delete these items", "", () => __awaiter(this, void 0, void 0, function* () {
                        var queryString = "?refNo=" + this.RefNo;
                        var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                        let selectedIds = selectedRows.map(({ RefId }) => RefId);
                        if (selectedRows.length > 0) {
                            var result = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "UnPostList", queryString, selectedIds);
                            //var result2 = await this.getList();
                            this.smartALert.Alert("Records has been posted successfully");
                            this.getList();
                        }
                        else {
                            this.smartALert.Warning("You must select record(s) to unpost.");
                        }
                        //for (let entry of selectedRows) {
                        //    var index = this.dataList.indexOf(entry);
                        //    this.dataList.splice(index, 1);
                        //}
                    }));
                });
                this.deleteRefNo = () => __awaiter(this, void 0, void 0, function* () {
                    this.smartALert.Confirm("are you sure to delete these items", "", () => __awaiter(this, void 0, void 0, function* () {
                        var queryString = "?refNo=" + this.RefNo;
                        var result = yield this.dbManager.PostPromise(this.FormSetup.MyForm.FormController, "Delete", queryString, null);
                        var message = new HCMS.Controls.messageHandler();
                        message.MessageConfirmation(result.data, "Deleted Successfuly");
                        this.loadByRefNo();
                    }));
                });
                //private saveItemList = (valid) => {
                //    if (this.xlsOptions.data !== null) {
                //        // var data = JSON.parse(this.xlsOptions.data.toString());
                //        var data = this.dataList;// JSON.stringify(this.xlsOptions.data);
                //        this.dbManager.Post(this.FormSetup.MyForm.FormController, "SaveList", "", data, (result) => {
                //            this.smartALert.Alert("Saved Successfully");
                //        }, (result) => {
                //            this.smartALert.Error(result.data);
                //        })
                //    }
                //}
                this.deleteClicked = (item) => {
                    this.smartALert.Confirm("are you sure to delete this item", "", () => {
                        var index = this.dataList.indexOf(item);
                        this.dataList.splice(index, 1);
                    });
                };
                this.deleteSelectedRows = () => {
                    this.smartALert.Confirm("are you sure to delete this item", "", () => {
                        var selectedRows = this.grid.gridOptions.api.getSelectedRows();
                        for (let entry of selectedRows) {
                            var index = this.dataList.indexOf(entry);
                            this.dataList.splice(index, 1);
                        }
                    });
                };
                this.smartALert = new HCMS.Controls.SmartAlert();
                this.FormSetup.LoadForm((form) => {
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    this.FormSetup.MyForm.IndexView.Load();
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.scope.$watch(() => this.scope.parentItem.RefNo, (newValue, oldValue) => {
                        if (oldValue !== newValue) {
                            if (newValue !== undefined) {
                                this.RefNo = Number.parseInt(newValue);
                                this.RefNo = this.RefNo;
                                this.loadByRefNo();
                            }
                            else {
                                this.createNew();
                            }
                        }
                    });
                    //this.createNew();
                    //  this.RefNo = ExcelHeader.selectedProfile
                });
                this.xlsOptions.onClick = this.clearSelectedFile;
                //this.xlsOptions.onChanged = this.emportDataChanged;
            }
            ;
        }
        Forms.UploadEmpVacations = UploadEmpVacations;
        Forms.hcmsForms.controller('uploadEmpVacationsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new UploadEmpVacations(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class GeneralReportForm extends Forms.BaseReportSetup {
            constructor(sce, filter, translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(filter, translateService, dbManager, $scope.tab.MenuItem.ReportId);
                this.sce = sce;
                this.$onInit = () => { };
                //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
                this.iFrameSource = "";
                this.activeTabIndex = 0;
                this.activaTab = (index) => {
                    $('.nav-tabs a:first').tab('show');
                };
                this.reportTabClick = (index) => {
                    $('.nav-tabs a[href="#general-report-tab-r' + index + '"]').tab('show');
                };
                this.resizeIframe = (iframe) => {
                    var iFrameHeight = iframe.contentWindow.document.body.scrollHeight + 'px';
                    var iFrameWidth = '100%';
                    iframe.css('width', iFrameWidth);
                    iframe.css('height', iFrameHeight);
                };
                this.copyOptions = (source, operator) => {
                    var options;
                    options = HCMS.DataAccess.Utility.CopyData(source);
                    options.IsReadOnly = (operator !== "BETWEEN");
                    return options;
                };
                this.print = (valid) => {
                    if (valid == false)
                        return;
                    this.reportSetup.FilterSelect = this.getSelectedGroupBy();
                    this.reportSetup.FilterOrderBy = this.getSelectedOrderBy();
                    var data = this.reportSetup; //{ report: generalReport.reportSetup.report, reportTabs: generalReport.reportSetup.reportTabs }
                    var queryString = this.getCommonParams();
                    this.dbManager.Post("ReportForm", "Print", queryString, data, (response) => {
                        var result = response.data;
                        if (result.Success == true) {
                            ////result.ReportViewerId
                            //window.open("/Reports/RDLViewer.aspx?ViewerId=" + result.ReportViewerId, "_blank");
                            var reportsUrl = HCMS.DataAccess.StartUp.reportsUrl + "/RDLViewer.aspx?ViewerId=" + result.ReportViewerId;
                            this.iFrameSource = this.sce.trustAsResourceUrl(reportsUrl);
                            window.open(reportsUrl, "_blank");
                        }
                    }, (result) => {
                        this.smartAlert.Alert(result);
                    });
                };
                this.getSelectedGroupBy = () => {
                    var str = "";
                    var data = this.selectedGroupByObject;
                    var count = 1;
                    angular.forEach(data, (value, key) => {
                        if (count <= 7) {
                            //var result = $filter('filter')(generalReport.selectedGroupByItems, { ReportOrderById: value.id })[0];
                            var result = $.grep(this.selectedGroupByItems, function (e) { return e.ReportGroupById == value.id; })[0];
                            str += "," + result.ValueField + " as GroupLevel" + count;
                            str += "," + result.DescriptionField + " as GroupName" + count;
                        }
                        count += 1;
                    });
                    for (var i = count; i <= 7; i++) {
                        str += ",0 as GroupLevel" + i;
                        str += ",'' as GroupName" + i;
                    }
                    return str;
                };
                this.addGroupByItem = (item) => {
                    this.selectedGroupByItems.push(item);
                    $('#reportGroupByDiv ol').trigger('change');
                    var index = this.reportSetup.ReportGroupBy.indexOf(item);
                    this.reportSetup.ReportGroupBy.splice(index, 1);
                };
                this.removeGroupByItem = (item) => {
                    this.reportSetup.ReportGroupBy.push(item);
                    var index = this.selectedGroupByItems.indexOf(item);
                    this.selectedGroupByItems.splice(index, 1);
                    $('#reportGroupByDiv ol').trigger('change');
                };
                this.getSelectedOrderBy = () => {
                    var str = "";
                    var data = this.selectedOrderByObject;
                    angular.forEach(data, (value, key) => {
                        var result = $.grep(this.selectedOrderByItems, function (e) { return e.ReportOrderById == value.id; })[0];
                        str += result.FieldName + " " + (HCMS.Validations.CommonValidations.isNull(result.Direction) || result.Direction == false ? "asc" : "desc");
                        str += ",";
                    });
                    str = str.slice(0, -1);
                    return str;
                };
                this.addOrderByItem = (item) => {
                    this.selectedOrderByItems.push(item);
                    $('#reportOrderByDiv ol').trigger('change');
                    var index = this.reportSetup.ReportOrderBy.indexOf(item);
                    this.reportSetup.ReportOrderBy.splice(index, 1);
                };
                this.removeOrderByItem = (item) => {
                    this.reportSetup.ReportOrderBy.push(item);
                    var index = this.selectedOrderByItems.indexOf(item);
                    this.selectedOrderByItems.splice(index, 1);
                    $('#reportOrderByDiv ol').trigger('change');
                };
                this.smartAlert = new HCMS.Controls.SmartAlert();
                this.getReportSetup((data) => {
                    this.title = this.translateText(data.ReportName);
                    this.reportSetup.ReportDecimalScale = HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.DecimalScale;
                    $(document).ready(() => {
                        if (this.reportSetup.ReportFields.length > 0) {
                            this.activeTabIndex = 0;
                            //this.activaTab(0);
                        }
                        else {
                            setTimeout(() => {
                                this.activeTabIndex = 1;
                                //this.activaTab(1);
                            }, 500);
                        }
                        this.reportSetup.ReportFields2 = HCMS.DataAccess.Utility.CopyData(this.reportSetup.ReportFields);
                        for (let entry of this.reportSetup.ReportFields) {
                            entry.IsRequired = entry.IsRequired || entry.IsParameter;
                            entry.FieldDescription = this.translateText(entry.FieldName, this.reportId);
                            entry.FieldOptions2 = HCMS.DataAccess.Utility.CopyData(entry);
                            entry.FieldOptions2.IsRequired = function () { return (entry.IsRequired || entry.IsParameter) && entry.ReportOperator == 'BETWEEN'; };
                        }
                        for (let entry of this.reportSetup.ReportTabs) {
                            for (let subEntry of entry.ReportTabFields) {
                                subEntry.IsRequired = subEntry.IsRequired || subEntry.IsParameter;
                                subEntry.FieldDescription = this.translateText(subEntry.FieldName, this.reportId);
                            }
                        }
                        for (let entry of this.reportSetup.ReportTabs) {
                            for (let subEntry of entry.ReportTabFields) {
                                subEntry.IsRequired = subEntry.IsRequired || subEntry.IsParameter;
                                subEntry.FieldDescription = this.translateText(subEntry.FieldName, this.reportId);
                                subEntry.FieldOptions2 = HCMS.DataAccess.Utility.CopyData(subEntry);
                                subEntry.FieldOptions2.IsRequired = function () { return (subEntry.IsRequired || subEntry.IsParameter) && subEntry.ReportOperator == 'BETWEEN'; };
                            }
                        }
                    });
                });
                this.getControlsOperators();
            }
        }
        Forms.GeneralReportForm = GeneralReportForm;
        Forms.hcmsForms.controller('generalReportController', ['$sce', '$filter', 'translateService', 'dataManagerService', '$scope', '$stateParams', function ($sce, $filter, translateService, dataManagerService, $scope, $stateParams) {
                return new GeneralReportForm($sce, $filter, translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AllOrgUnits extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                this.indexItemView = () => {
                    this.DisplayIndexView();
                };
                //this.loadData();
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.editClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                    //this.OnAdding.addHandler(this.beforeAdd);
                });
            }
            addItemView() {
                this.DisplayAddView(() => {
                    this.FormData.GetDataItem("0", (data) => {
                        this.dataItem = data;
                    });
                    var viewId = this.selectedViewSetup.ViewId;
                    var codeField = this.selectedViewSetup.TableCodeField;
                    if (!HCMS.DataAccess.Utility.IsNull(codeField)) {
                        if (codeField !== "") {
                            this.selectedViewSetup.GetNewCode(viewId, function (data) {
                                this.dataItem[codeField] = data;
                            });
                        }
                    }
                });
            }
            editItemView() {
                this.DisplayEditView();
            }
            displayItemView() {
                this.DisplayDetailsView();
            }
        }
        Forms.AllOrgUnits = AllOrgUnits;
        //hcmsForms.controller('generalFormSetupController', GeneralFormSetup);
        Forms.hcmsForms.controller('allOrgUnitsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new Forms.GeneralFormSetup(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AllPositions extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                this.indexItemView = () => {
                    this.DisplayIndexView();
                };
                //this.loadData();
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.editClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                    //this.OnAdding.addHandler(this.beforeAdd);
                });
            }
            addItemView() {
                this.DisplayAddView(() => {
                    this.FormData.GetDataItem("0", (data) => {
                        this.dataItem = data;
                    });
                    var viewId = this.selectedViewSetup.ViewId;
                    var codeField = this.selectedViewSetup.TableCodeField;
                    if (!HCMS.DataAccess.Utility.IsNull(codeField)) {
                        if (codeField !== "") {
                            this.selectedViewSetup.GetNewCode(viewId, function (data) {
                                this.dataItem[codeField] = data;
                            });
                        }
                    }
                });
            }
            editItemView() {
                this.DisplayEditView();
            }
            displayItemView() {
                this.DisplayDetailsView();
            }
        }
        Forms.AllPositions = AllPositions;
        //hcmsForms.controller('generalFormSetupController', GeneralFormSetup);
        Forms.hcmsForms.controller('allPositionsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new Forms.GeneralFormSetup(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AllJobs extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                this.indexItemView = () => {
                    this.DisplayIndexView();
                };
                //this.loadData();
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.editClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                    //this.OnAdding.addHandler(this.beforeAdd);
                });
            }
            addItemView() {
                this.DisplayAddView(() => {
                    this.FormData.GetDataItem("0", (data) => {
                        this.dataItem = data;
                    });
                    var viewId = this.selectedViewSetup.ViewId;
                    var codeField = this.selectedViewSetup.TableCodeField;
                    if (!HCMS.DataAccess.Utility.IsNull(codeField)) {
                        if (codeField !== "") {
                            this.selectedViewSetup.GetNewCode(viewId, function (data) {
                                this.dataItem[codeField] = data;
                            });
                        }
                    }
                });
            }
            editItemView() {
                this.DisplayEditView();
            }
            displayItemView() {
                this.DisplayDetailsView();
            }
        }
        Forms.AllJobs = AllJobs;
        //hcmsForms.controller('generalFormSetupController', GeneralFormSetup);
        Forms.hcmsForms.controller('allJobsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new Forms.GeneralFormSetup(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class InsuranceRulesJoinItems extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.insuranceRuleId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.insuranceRuleId))
                        currentObject.insuranceRuleId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&insuranceRuleId=' + currentObject.insuranceRuleId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByParentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.InsuranceRulesJoinItems = InsuranceRulesJoinItems;
        Forms.hcmsForms.controller('insuranceRulesJoinItemsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new InsuranceRulesJoinItems(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class InsuranceRulesHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                //public listOptions: any = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.selectClicked = (item) => {
                    this.dataItem = item;
                    this.selectedProfile = item;
                    this.activateTab('selectedInsuranceRule');
                    this.navTabOptions.api.activateFirstTab();
                };
                this.addNewClicked = () => {
                    this.DisplayAddView((data) => {
                        this.selectedProfile = data;
                        this.activateTab('selectedInsuranceRule');
                        this.navTabOptions.api.activateFirstTab();
                    });
                };
                // this.listOptions = { selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.selectClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.DisplayIndexView();
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.DisplayIndexView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                });
            }
            activateTab(tab) {
                $('.nav-tabs a[href="#' + tab + '"]').tab('show');
            }
            ;
        }
        Forms.InsuranceRulesHome = InsuranceRulesHome;
        Forms.hcmsForms.controller('insuranceRulesHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new InsuranceRulesHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../baseforms/baseform/baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class GeneralFormSetup extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                this.indexItemView = () => {
                    this.DisplayIndexView();
                };
                //this.loadData();
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.editClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            if (this.FormSetup.MyForm.HideViewAfterSave) {
                                this.indexItemView();
                            }
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            if (this.FormSetup.MyForm.HideViewAfterSave) {
                                this.indexItemView();
                            }
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                    //this.OnAdding.addHandler(this.beforeAdd);
                });
            }
            addItemView() {
                this.DisplayAddView(() => {
                    this.FormData.GetDataItem("0", (data) => {
                        this.dataItem = data;
                    });
                    var viewId = this.selectedViewSetup.ViewId;
                    var codeField = this.selectedViewSetup.TableCodeField;
                    if (!HCMS.DataAccess.Utility.IsNull(codeField)) {
                        if (codeField !== "") {
                            this.selectedViewSetup.GetNewCode(viewId, function (data) {
                                this.dataItem[codeField] = data;
                            });
                        }
                    }
                });
            }
            editItemView() {
                this.DisplayEditView();
            }
            displayItemView() {
                this.DisplayDetailsView();
            }
        }
        Forms.GeneralFormSetup = GeneralFormSetup;
        //hcmsForms.controller('generalFormSetupController', GeneralFormSetup);
        Forms.hcmsForms.controller('generalFormSetupController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new GeneralFormSetup(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
/// <reference path="../../../../../forms/generalforms/generalform.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class PayItem extends Forms.GeneralFormSetup {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                //Event fromDate Changed   
                this.payItemsCalcMethodChanged = (methodId) => {
                    if (methodId == 3) {
                        //Enhable Based on Iem
                        this.selectedViewSetup.ViewFieldsObject["PayBasedOnGroup"].IsReadOnly = true;
                        this.selectedViewSetup.ViewFieldsObject["PayBasedOnItem"].IsReadOnly = true;
                        this.selectedViewSetup.ViewFieldsObject["FormulaId"].IsReadOnly = false;
                    }
                    else if (methodId == 1) {
                        //Enhable Based on Group
                        this.selectedViewSetup.ViewFieldsObject["PayBasedOnGroup"].IsReadOnly = true;
                        this.selectedViewSetup.ViewFieldsObject["PayBasedOnItem"].IsReadOnly = false;
                        this.selectedViewSetup.ViewFieldsObject["FormulaId"].IsReadOnly = true;
                    }
                    else if (methodId == 2) {
                        this.selectedViewSetup.ViewFieldsObject["PayBasedOnGroup"].IsReadOnly = true;
                        this.selectedViewSetup.ViewFieldsObject["PayBasedOnItem"].IsReadOnly = true;
                        this.selectedViewSetup.ViewFieldsObject["FormulaId"].IsReadOnly = false;
                    }
                };
                // set Transaction Events
                this.payItemsCalcMethodEvents = { defaultAction: this.payItemsCalcMethodChanged };
            }
        }
        Forms.PayItem = PayItem;
        Forms.hcmsForms.controller('payItemController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new PayItem(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class TaxRulesHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                //public listOptions: any = { selectCallback: null, indexController: null };
                this.selectedProfile = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.dataItem = item;
                    this.selectedProfile = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedtaxRule');
                    this.navTabOptions.api.activateFirstTab();
                };
                //public activateTab(tab) {
                //    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
                //};
                this.addNewClicked = () => {
                    this.DisplayAddView((data) => {
                        this.selectedProfile = data;
                        this.activeTabIndex = 1;
                        //this.activateTab('selectedtaxRule');
                        this.navTabOptions.api.activateFirstTab();
                    });
                };
                // this.listOptions = { selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false };
                this.selectedProfile = {};
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.selectClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.DisplayIndexView();
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.DisplayIndexView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                });
            }
        }
        Forms.TaxRulesHome = TaxRulesHome;
        Forms.hcmsForms.controller('taxRulesHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new TaxRulesHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class TaxRulesRates extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.taxRuleId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.taxRuleId))
                        currentObject.taxRuleId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&taxRuleId=' + currentObject.taxRuleId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByParentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.TaxRulesRates = TaxRulesRates;
        Forms.hcmsForms.controller('taxRulesRatesController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new TaxRulesRates(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceGroupDetails extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
                this.header = {
                    fromDate: {
                        value: null,
                        options: { DataTypeName: 'date', ControlTypeName: 'date', IsRequired: 1 }
                    },
                    toDate: {
                        value: null,
                        options: { DataTypeName: 'date', ControlTypeName: 'date', IsRequired: 1 }
                    },
                    attendanceTemplate: {
                        value: null,
                        DropDownId: 132,
                        //ControlTypeName:'select',
                        //DataTypeName:'int',
                        IsRequired: 1,
                        SelectDisplayValue: 'AttendanceTemplateId',
                        SelectDisplayName: 'AttendanceTemplateName',
                        SelectDisplayName_: 'AttendanceTemplateName_'
                    }
                };
                this.generateByTemplate = () => __awaiter(this, void 0, void 0, function* () {
                    let fromDate = this.header.fromDate.value;
                    let toDate = this.header.toDate.value;
                    let attendanceTemplateId = this.header.attendanceTemplate.value;
                    if (!HCMS.Validations.DateValidations.isDate(fromDate) || !HCMS.Validations.DateValidations.isDate(toDate)) {
                        return;
                    }
                    fromDate = fromDate.toUTCString(); // HCMS.Validations.DateValidations.toDate(fromDate);
                    toDate = toDate.toUTCString(); // HCMS.Validations.DateValidations.toDate(toDate);
                    let queryString = `?attendanceTemplateId=${attendanceTemplateId}&attendanceGroupId=${this.attendanceGroupId}&fromDate=${fromDate}&toDate=${toDate}`;
                    let result = yield this.dbManager.GetPromise("AttendanceGroupDetails", "GetGenerateByTemplate", queryString);
                    this.RefreshGrid();
                });
                // GetDataByParentId
                this.GetDataByParentId = this.RefreshGrid;
            }
            RefreshGrid(callBack) {
                var currentObject = this;
                currentObject.attendanceGroupId = currentObject.parentItem[currentObject.parentIdFieldName];
                if (angular.isUndefined(currentObject.attendanceGroupId))
                    currentObject.attendanceGroupId = 0;
                var queryString = currentObject.FormData.getCommonParams() + '&attendanceGroupId=' + currentObject.attendanceGroupId;
                this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByParentId', queryString, function (response) {
                    currentObject.dataList = response.data;
                    if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                        callBack(response.data);
                    }
                }, null);
            }
        }
        Forms.AttendanceGroupDetails = AttendanceGroupDetails;
        Forms.hcmsForms.controller('attendanceGroupDetailsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new AttendanceGroupDetails(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceGroupsHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.dataItem = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedAttendanceGroup');
                    this.navTabOptions.api.activateFirstTab();
                };
                //public activateTab(tab) {
                //    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
                //};
                this.addNewClicked = () => {
                    this.DisplayAddView((data) => {
                        this.activeTabIndex = 1;
                        //this.activateTab('selectedAttendanceGroup');
                        this.navTabOptions.api.activateFirstTab();
                    });
                };
                // this.listOptions = { selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false };
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.selectClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.DisplayIndexView();
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.DisplayIndexView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                });
            }
        }
        Forms.AttendanceGroupsHome = AttendanceGroupsHome;
        Forms.hcmsForms.controller('attendanceGroupsHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new AttendanceGroupsHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceTemplatesHome extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //private selectedHeaderView: Models.SystemFormView = new Models.EditView();
                this.navTabOptions = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    this.dataItem = item;
                    this.activeTabIndex = 1;
                    //this.activateTab('selectedAttendanceTemplate');
                    this.navTabOptions.api.activateFirstTab();
                };
                //public activateTab(tab) {
                //    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
                //};
                this.addNewClicked = () => {
                    this.DisplayAddView((data) => {
                        this.activeTabIndex = 1;
                        //this.activateTab('selectedAttendanceTemplate');
                        this.navTabOptions.api.activateFirstTab();
                    });
                };
                // this.listOptions = { selectCallback: this.selectClicked, indexController: this, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false };
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.selectClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.DisplayIndexView();
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.DisplayIndexView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                });
            }
        }
        Forms.AttendanceTemplatesHome = AttendanceTemplatesHome;
        Forms.hcmsForms.controller('attendanceTemplatesHomeController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new AttendanceTemplatesHome(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AttendanceTemplateDetails extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                // GetDataByParentId
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    currentObject.attendanceTemplateId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(currentObject.attendanceTemplateId))
                        currentObject.attendanceTemplateId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&attendanceTemplateId=' + currentObject.attendanceTemplateId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByParentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.AttendanceTemplateDetails = AttendanceTemplateDetails;
        Forms.hcmsForms.controller('attendanceTemplateDetailsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new AttendanceTemplateDetails(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class LoanRuleController extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                this.indexItemView = () => {
                    this.DisplayIndexView();
                };
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.editClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                    //this.OnAdding.addHandler(this.beforeAdd);
                });
            }
            addItemView() {
                this.DisplayAddView(() => {
                    this.FormData.GetDataItem("0", (data) => {
                        this.dataItem = data;
                    });
                    var viewId = this.selectedViewSetup.ViewId;
                    var codeField = this.selectedViewSetup.TableCodeField;
                    if (!HCMS.DataAccess.Utility.IsNull(codeField)) {
                        if (codeField !== "") {
                            this.selectedViewSetup.GetNewCode(viewId, function (data) {
                                this.dataItem[codeField] = data;
                            });
                        }
                    }
                });
            }
            editItemView() {
                this.DisplayEditView();
            }
            displayItemView() {
                this.DisplayDetailsView();
            }
        }
        Forms.LoanRuleController = LoanRuleController;
        Forms.hcmsForms.controller('loanRuleController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new LoanRuleController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class VacationRule extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                this.indexItemView = () => {
                    this.DisplayIndexView();
                };
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.editClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                    //this.OnAdding.addHandler(this.beforeAdd);
                });
            }
            addItemView() {
                this.DisplayAddView(() => {
                    this.FormData.GetDataItem("0", (data) => {
                        this.dataItem = data;
                    });
                    var viewId = this.selectedViewSetup.ViewId;
                    var codeField = this.selectedViewSetup.TableCodeField;
                    if (!HCMS.DataAccess.Utility.IsNull(codeField)) {
                        if (codeField !== "") {
                            this.selectedViewSetup.GetNewCode(viewId, function (data) {
                                this.dataItem[codeField] = data;
                            });
                        }
                    }
                });
            }
            editItemView() {
                this.DisplayEditView();
            }
            displayItemView() {
                this.DisplayDetailsView();
            }
        }
        Forms.VacationRule = VacationRule;
        Forms.hcmsForms.controller('vacationRuleController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new VacationRule(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class PenaltySetup extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
                this.navTabOptions = {};
                this.afterEditClicked = (data) => {
                    this.navTabOptions.api.activateFirstTab();
                };
                this.indexItemView = () => {
                    this.DisplayIndexView();
                };
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.EditCallback = this.editClicked;
                    this.FormSetup.MyForm.IndexView.DeleteCallback = this.deleteClicked;
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.CreateView;
                    this.FormSetup.MyForm.EditView.CallbackOnLoad = (view) => {
                        this.parentIdFieldName = this.getIdFieldName(view.ViewFields);
                    };
                    this.FormSetup.MyForm.CreateView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormSetup.MyForm.IndexView.Load();
                    //this.FormSetup.MyForm.IndexView.SelectCallback = this.se;
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdded.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnUpdated.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.indexItemView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                    this.OnEditClicked.addHandler(this.afterEditClicked);
                    //this.OnAdding.addHandler(this.beforeAdd);
                });
            }
            addItemView() {
                this.DisplayAddView(() => {
                    this.FormData.GetDataItem("0", (data) => {
                        this.dataItem = data;
                    });
                    var viewId = this.selectedViewSetup.ViewId;
                    var codeField = this.selectedViewSetup.TableCodeField;
                    if (!HCMS.DataAccess.Utility.IsNull(codeField)) {
                        if (codeField !== "") {
                            this.selectedViewSetup.GetNewCode(viewId, function (data) {
                                this.dataItem[codeField] = data;
                            });
                        }
                    }
                });
            }
            editItemView() {
                this.DisplayEditView();
            }
            displayItemView() {
                this.DisplayDetailsView();
            }
        }
        Forms.PenaltySetup = PenaltySetup;
        Forms.hcmsForms.controller('penaltySetupController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new PenaltySetup(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../../../forms/baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class PenaltySetupDetails extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    var parentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(parentId))
                        parentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&parentId=' + parentId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByParentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.PenaltySetupDetails = PenaltySetupDetails;
        // hcmsForms.controller('profileSubFormController', ProfileSubFormController);
        Forms.hcmsForms.controller('penaltySetupDetailsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new PenaltySetupDetails(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class SystemProgressBar {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.getByProgressId = (progressId) => {
                    return this.dbManager.GetPromise("SystemProgress", "GetByProgressTypeId", "?progressTypeId=" + progressId);
                };
            }
        }
        Forms.SystemProgressBar = SystemProgressBar;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        let ProgressTypes;
        (function (ProgressTypes) {
            ProgressTypes[ProgressTypes["Loan"] = 1] = "Loan";
            ProgressTypes[ProgressTypes["CalcSalary"] = 2] = "CalcSalary";
            ProgressTypes[ProgressTypes["CalcSalaryTransaction"] = 3] = "CalcSalaryTransaction";
            ProgressTypes[ProgressTypes["ImportAttendance"] = 4] = "ImportAttendance";
            ProgressTypes[ProgressTypes["CloseDayAttendance"] = 5] = "CloseDayAttendance";
        })(ProgressTypes = Forms.ProgressTypes || (Forms.ProgressTypes = {}));
        class SystemProgressType {
            constructor(dbManager, translator) {
                this.dbManager = dbManager;
                this.translator = translator;
                this.getBy = () => {
                    let quesryString = "";
                    return this.dbManager.GetPromise("AttendanceDayTypes", "GetAll", quesryString);
                };
            }
        }
        Forms.SystemProgressType = SystemProgressType;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Menus;
    (function (Menus) {
        class HomeMenus {
            constructor(translateService, dbManager, menuTabsService, $state, $filter, $scope, $timeout) {
                this.translateService = translateService;
                this.dbManager = dbManager;
                this.menuTabsService = menuTabsService;
                this.$onInit = () => { };
                this.orgMenus = [];
                this.allMenus = [];
                this.filteredMenus = [];
                this.selectedRoot = { MenuId: -1, ParentId: -1 };
                //translate Menus
                this.translate = (text) => {
                    return this.translateService.Translate('menu-' + text);
                };
                //Get All Cuurent User Menus
                this.getMenus = () => {
                    var currentLoginInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                    if (currentLoginInfo == null)
                        return;
                    var queryString = '?userId=' + currentLoginInfo.User.UserId + ' &langId=' + currentLoginInfo.Language.LangId;
                    this.dbManager.Get("HomeMenus", 'GetAll', queryString, (result) => {
                        this.allMenus = result.data;
                        this.orgMenus = this.allMenus.slice(); // copy all menus
                        this.translateService.Use(currentLoginInfo.Language.LangId);
                    }, function (result) {
                        var alrt = new HCMS.Controls.SmartAlert();
                        alrt.Alert("Can not load menus.");
                    }, null);
                };
                // open Menu in a Tab
                this.openMenu = (menu) => {
                    //sysMenus.selectedMenu = menu
                    //sysMenus.selectedMenu.children = getChildMenus(menu.MenuId)
                    if (angular.isString(menu.StateName)) {
                        var params = { apiController: null, reportId: null, formId: null };
                        if (!HCMS.Validations.CommonValidations.isNull(menu.ReportId)) {
                            params.reportId = menu.ReportId;
                        }
                        if (!HCMS.Validations.CommonValidations.isNull(menu.FormId)) {
                            params.formId = menu.FormId;
                        }
                        if (angular.isDefined(menu.FormController))
                            params.apiController = menu.FormController;
                        this.menuTabsService.AddMenuTab(menu, params);
                        //$state.go(menu.StateName, params);
                        this.state.go("app.tabs.subtabs");
                    }
                };
                this.setSelectedRoot = (menu) => {
                    this.selectedRoot = menu;
                };
                this.getParentMenus = () => {
                    var orderBy = this.filter('orderBy');
                    var children = [];
                    if (this.orgMenus != undefined) {
                        children = this.filter('filter')(this.orgMenus, { ParentId: null }, true);
                    }
                    if (children.length > 0) {
                        return orderBy(children, function (item) { return parseInt(item.MenuOrder); }, false /*Reverse=false*/);
                    }
                    return [];
                };
                this.getChildMenus = (menuId) => {
                    if (angular.isUndefined(menuId) || menuId == '')
                        menuId = null;
                    var orderBy = this.filter('orderBy');
                    var children = [];
                    if (this.allMenus != undefined) {
                        children = this.filter('filter')(this.allMenus, { ParentId: menuId }, true);
                    }
                    if (children.length > 0) {
                        return orderBy(children, function (item) { return parseInt(item.MenuOrder); }, false /*Reverse=false*/);
                    }
                    return [];
                };
                ////filterMenus
                //private filterMenus = (menuId) => {
                //    this.filteredMenus = $(this.orgMenus).filter(function (i, n) { return n.MenuId === menuId });
                //    this.addChildMenus(menuId);
                //    setTimeout(function () {
                //        this.allMenus = [];
                //        this.allMenus = this.filteredMenus.slice();
                //    }, 0);
                //}
                this.addChildMenus = (menuId) => {
                    if (angular.isUndefined(menuId) || menuId == null || menuId == '')
                        return;
                    var orderBy = this.filter('orderBy');
                    var children = [];
                    if (this.orgMenus != undefined) {
                        children = this.filter('filter')(this.orgMenus, { ParentId: menuId }, true);
                        Array.prototype.push.apply(this.filteredMenus, children);
                        //iterate children
                        angular.forEach(children, (value, key) => {
                            this.addChildMenus(value.MenuId);
                        });
                    }
                };
                //================ Create Routing States for config
                this.setStates = (data) => {
                    var state = {
                        "url": "/subtabs",
                        //reloadOnSearch: false,
                        //reload: false,
                        "views": {}
                    };
                    angular.forEach(data, function (value, key) {
                        var viewName = "view" + value.MenuId; //+ "@app";
                        state.views[viewName] = {
                            templateUrl: value.StartView,
                            controller: value.JsController,
                            controllerAs: value.JsControllerAS
                        };
                    });
                    window['$stateProviderRef'].state("app.tabs.subtabs", state);
                    //window['$urlRouter'].sync();
                    //window['$urlRouter'].listen();
                    //$state.go("home");
                };
                this.state = $state;
                this.filter = $filter;
                this.getMenus();
                menuTabsService.ClearMenuTabs();
                //================ Create Routing States for config
                var rootState = this.state; // for test    $rootScope.$state;
                if (!rootState.href("app.tabs.subtabs")) {
                    this.dbManager.Get("MenuStates", 'GetMenuStates', "", (result) => {
                        var states = [];
                        states = result.data;
                        this.setStates(states);
                    }, (result) => {
                        // this.states = [];
                    }, null);
                }
            }
        }
        Menus.HomeMenus = HomeMenus;
        Menus.hcmsMenus.controller('homeMenusController', ['translateService', 'dataManagerService', 'menuTabsService', '$state', '$filter', '$scope', '$timeout', function (translateService, dataManagerService, menuTabsService, $state, $filter, $scope, $timeout) {
                return new HomeMenus(translateService, dataManagerService, menuTabsService, $state, $filter, $scope, $timeout);
            }]);
    })(Menus = HCMS.Menus || (HCMS.Menus = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../module.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class DynamicForm {
            constructor(translateService, dbManager, $compile, templateRequest) {
                this.restrict = 'E';
                this.scope = { 'formId': "=", 'formTemplateUrl': "=", 'parentIdFieldName': "=?", 'parentItem': "=?", 'controllerName': "@", 'controllerAs': "@" };
                //public controller: string = "@";
                //public name: string = "@controllerName";
                //public controllerAs: string = "dynamicForm";
                this.priority = 0;
                this.link = (scope, element, attrs) => {
                    var currentObject = this;
                    this.templateRequest(scope.formTemplateUrl).then(function (html) {
                        var template = angular.element(html);
                        var controllerStr = "";
                        if (!HCMS.Validations.CommonValidations.isNull(scope.controllerName) && scope.controllerName !== "") {
                            controllerStr = "ng-controller='" + scope.controllerName + " as " + scope.controllerAs + "'";
                        }
                        var div = angular.element("<div " + controllerStr + " ></div>");
                        div.append(template);
                        element.append(div);
                        currentObject.compiler(div)(scope);
                    });
                };
                this.translateService = translateService;
                this.dbManager = dbManager;
                this.templateRequest = templateRequest;
                this.compiler = $compile;
            }
            static Factory() {
                var directive = (translateService, dbManager, compile, templateRequest) => new DynamicForm(translateService, dbManager, compile, templateRequest);
                //directive's injection list
                directive.$inject = ["translateService", "dataManagerService", "$compile", "$templateRequest"];
                return directive;
            }
        }
        Forms.DynamicForm = DynamicForm;
        Forms.hcmsForms.directive('hcmsDynamicForm', DynamicForm.Factory());
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../baseforms/baseform/basesubformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class GeneralSubFormController extends Forms.BaseSubFormManager {
            //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    var parentId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(parentId))
                        parentId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&parentId=' + parentId;
                    queryString += "&companyId=" + HCMS.DataAccess.StartUp.CurrentLoginInfo.Company.CompanyId;
                    queryString += "&tableName=" + this.FormSetup.MyForm.EditView.TableName;
                    queryString += "&joinField=" + currentObject.parentIdFieldName;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByParentId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.GeneralSubFormController = GeneralSubFormController;
        // hcmsForms.controller('generalSubFormController', GeneralSubFormController);
        Forms.hcmsForms.controller('generalSubFormController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new GeneralSubFormController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class LogOut {
            //public selectedProfile: SelectedProfile;
            constructor(state) {
                this.state = state;
                this.$onInit = () => { };
                this.logout = () => {
                    HCMS.DataAccess.StartUp.SetCurrentLoginInfo(null);
                    sessionStorage.clear();
                    localStorage.clear();
                    var $body = $('body');
                    $body.removeClass("smart-rtl");
                    //window['$stateProviderRef']. 
                    this.state.go('login');
                };
            }
        }
        Forms.LogOut = LogOut;
        Forms.hcmsForms.controller('logoutController', ['$state', function ($state) {
                return new LogOut($state);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../forms/baseforms/baseform/baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AllApplicants extends Forms.BaseFormManager {
            constructor(translateService, dbManager, $scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, $scope.tab.MenuItem.FormId);
                this.$onInit = () => { };
                // static $inject = ['translateService', 'dataManagerService','$scope', '$stateParams'];
                //private formId: number;
                //private apiController: string;
                //public selectedApplicant: selectedApplicant;
                this.selectedHeaderView = new HCMS.Models.EditView();
                this.selectClicked = (item) => {
                    //var currentObject = this;
                    this.selectedHeaderView = this.FormSetup.MyForm.EditView;
                    var id = this.GetIdValue(item, this.selectedHeaderView);
                    this.FormData.GetDataItem(id, (data) => {
                        this.dataItem = data;
                        this.DisplayEditView();
                        //Selected Applicant not profile like html file
                        this.activateTab('selectedApplicant');
                        //currentObject.DisplayIndexView();
                    });
                };
                //this.selectedApplicant = selectedApplicantService;
                //this.selectedHeaderView.ViewId = 0;
                this.selectedHeaderView = this.FormSetup.MyForm.EditView;
                // this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                //this.loadData();
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    this.FormSetup.MyForm.IndexView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                });
            }
            activateTab(tab) {
                //$('.nav-tabs a').removeClass("active");
                //$('.nav-tabs a[href="#' + tab + '"]').addClass("active");
                //$('.nav-tabs a[href="#' + tab + '"]').show();
                $('.nav-tabs a[href="#' + tab + '"]').tab('show');
            }
            ;
            addNewClicked() {
                //var currentObject = this;
                //$scope.active = 1; //set the index of the profile tab
                this.FormData.GetDataItem("0", (data) => {
                    this.dataItem = data;
                    this.DisplayAddView();
                    //Selected Applicant not profile like html file
                    this.activateTab('selectedApplicant');
                });
            }
        }
        Forms.AllApplicants = AllApplicants;
        // hcmsForms.controller('AllApplicantsNewController', AllApplicants);
        Forms.hcmsForms.controller('allApplicantsNewController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new AllApplicants(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class ApplicantPhotoController extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, Upload, scope, $stateParams) {
                //inherit BaseSubFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.Upload = Upload;
                this.$onInit = () => { };
                this.errorMsg = "";
                //empPhoto.selectedProfile = profileService.getSelectedProfile();
                //var currentUser = loginInfo.getCurrentUser();
                this.setEmployeePhoto = (photo) => {
                    if (photo === null || photo == "") {
                        this.picFile = "/styles/img/noProfile.png";
                    }
                    else {
                        this.picFile = "data:image/jpeg;base64," + photo;
                    }
                };
                this.clearPhoto = () => {
                    this.picFile = "/styles/img/noProfile.png";
                };
                this.isCleared = () => {
                    return this.picFile == "/styles/img/noProfile.png";
                };
                this.isNewProfile = () => {
                    if (this.parentItem !== undefined) {
                        var profileId = this.parentItem[this.parentIdFieldName];
                        return profileId == null || profileId == 0;
                    }
                    return false;
                };
                this.getCommonParams = () => {
                    return '?userId=' + HCMS.DataAccess.StartUp.CurrentLoginInfo.User.UserId + '&langId=' + HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangId;
                };
                this.getPhoto = (id) => {
                    var queryString = this.getCommonParams() + '&id=' + id;
                    this.dbManager.Get('ApplicantPhotos', 'GetDetails', queryString, (response) => {
                        this.dataItem = response.data;
                        if (response.data !== null) {
                            this.setEmployeePhoto(this.dataItem.Photo);
                        }
                        else
                            this.setEmployeePhoto(null);
                    }, null);
                };
                //scope.$watch(function () {
                //    return profileService.getSelectedProfile();
                //},
                //    function (newVal, oldVal) {
                //        var profileId = 0;
                //        if (angular.isDefined(newVal) && newVal !== null) {
                //            empPhoto.selectedProfile = newVal;
                //            if (angular.isDefined(newVal.ProfileId)) {
                //                profileId = newVal.ProfileId;
                //            }
                //        }
                //        if (angular.isUndefined(profileId)) profileId = 0;
                //        empPhoto.getPhoto(profileId);
                //    }, true);
                this.uploadPic = (file) => {
                    var profileId = this.parentItem[this.parentIdFieldName];
                    let url = HCMS.DataAccess.StartUp.apiUrl + "/ApplicantPhotos/PostPhoto";
                    this.Upload.upload({
                        url: url,
                        data: { Photo: file, ProfileId: profileId, UserId: HCMS.DataAccess.StartUp.CurrentLoginInfo.User.UserId }
                    }).then((resp) => {
                        file.result = resp.data;
                        //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    }, (resp) => {
                        if (resp.status > 0)
                            this.errorMsg = resp.status + ': ' + resp.data;
                        //console.log('Error status: ' + resp.status);
                    }, (evt) => {
                        file.progress = Math.min(100, parseInt((100.0 * evt.loaded / evt.total).toString()));
                        //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                };
                //this.GetDataByParentCallBack = this.GetByParentCallBack;
                this.GetDataByParentId = (callBack) => {
                    if (this.parentItem === undefined)
                        return;
                    //var currentObject = this;
                    var profileId = this.parentItem[this.parentIdFieldName];
                    if (angular.isUndefined(profileId))
                        profileId = 0;
                    //var queryString = currentObject.FormData.getCommonParams() + '&profileId=' + profileId;
                    //this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByProfileId', queryString, function (response) {
                    //    currentObject.dataList = response.data;
                    //    if (response.data.length > 0) {
                    //        currentObject.dataItem = response.data[0];
                    //    } else {
                    //        currentObject.dataItem = {};
                    //    }
                    //    if (!DataAccess.Utility.IsNull(callBack)) {
                    //        callBack(response.data);
                    //    }
                    //}, null);
                    var queryString = this.getCommonParams() + '&id=' + profileId;
                    this.dbManager.Get('ApplicantPhotos', 'GetDetails', queryString, (response) => {
                        this.dataItem = response.data;
                        if (response.data !== null) {
                            this.setEmployeePhoto(this.dataItem.Photo);
                        }
                        else
                            this.setEmployeePhoto(null);
                    }, null);
                };
            }
        }
        Forms.ApplicantPhotoController = ApplicantPhotoController;
        // hcmsForms.controller('profilePhotoController', ProfilePhotoController);
        Forms.hcmsForms.controller('applicantPhotoController', ['translateService', 'dataManagerService', 'Upload', '$scope', '$stateParams', function (translateService, dataManagerService, Upload, $scope, $stateParams) {
                return new ApplicantPhotoController(translateService, dataManagerService, Upload, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class ApplicantPersonalDataTabsController {
            constructor(translateService, dbManager, scope, $stateParams) {
                this.$onInit = () => { };
                //inherit BaseFormManager
                //set login Info
                this.scope = scope;
                this.parentIdFieldName = scope.parentIdFieldName;
                this.parentItem = scope.parentItem;
                var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                //if (currentInfo == null) {
                //    currentInfo = new DataAccess.CurrentLoginInfo(dbManager);
                //    var currentUser = angular.fromJson(sessionStorage['user']);
                //    currentInfo.SetLoginInfo({ UserId: currentUser.userId, LangId: currentUser.langId, DatabaseProfileId: currentUser.databaseProfileId, CompanyId: currentUser.companyId });
                //    DataAccess.StartUp.SetCurrentLoginInfo(currentInfo);
                //}
                this.FormSetup = new Forms.BaseFormSetup(translateService, dbManager, currentInfo.User.UserId, scope.formId);
                this.FormSetup.LoadForm();
                this.scope.$watch(() => this.scope.parentItem, (newValue, oldValue) => {
                    if (oldValue !== newValue) {
                        this.parentItem = newValue;
                    }
                });
            }
        }
        Forms.ApplicantPersonalDataTabsController = ApplicantPersonalDataTabsController;
        // hcmsForms.controller('personalDataTabsController', PersonalDataTabsController);
        Forms.hcmsForms.controller('applicantPersonalDataTabsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new ApplicantPersonalDataTabsController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class ApplicantPersonalDataController extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseSubFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                //this.GetDataByParentCallBack = this.GetByParentCallBack;
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    var profileId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(profileId))
                        profileId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&profileId=' + profileId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByProfileId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (response.data.length > 0) {
                            currentObject.dataItem = response.data[0];
                        }
                        else {
                            currentObject.dataItem = {};
                        }
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        ApplicantPersonalDataController.$inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
        Forms.ApplicantPersonalDataController = ApplicantPersonalDataController;
        //hcmsForms.controller('profilePersonalDataController', ProfilePersonalDataController);
        Forms.hcmsForms.controller('applicantPersonalDataController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new ApplicantPersonalDataController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class ApplicantSubFormController extends Forms.BaseSubFormManager {
            //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    var profileId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(profileId))
                        profileId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&profileId=' + profileId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByProfileId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.ApplicantSubFormController = ApplicantSubFormController;
        // hcmsForms.controller('profileSubFormController', ProfileSubFormController);
        Forms.hcmsForms.controller('applicantSubFormController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new ApplicantSubFormController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class ProfilePhotoController extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, Upload, scope, $stateParams) {
                //inherit BaseSubFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.Upload = Upload;
                this.$onInit = () => { };
                this.errorMsg = "";
                //empPhoto.selectedProfile = profileService.getSelectedProfile();
                //var currentUser = loginInfo.getCurrentUser();
                this.setEmployeePhoto = (photo) => {
                    if (photo === null || photo == "") {
                        this.picFile = "/styles/img/noProfile.png";
                    }
                    else {
                        this.picFile = "data:image/jpeg;base64," + photo;
                    }
                };
                this.clearPhoto = () => {
                    this.picFile = "/styles/img/noProfile.png";
                };
                this.isCleared = () => {
                    return this.picFile == "/styles/img/noProfile.png";
                };
                this.isNewProfile = () => {
                    if (this.parentItem !== undefined) {
                        var profileId = this.parentItem[this.parentIdFieldName];
                        return profileId == null || profileId == 0;
                    }
                    return false;
                };
                this.getCommonParams = () => {
                    return '?userId=' + HCMS.DataAccess.StartUp.CurrentLoginInfo.User.UserId + '&langId=' + HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangId;
                };
                this.getPhoto = (id) => {
                    var queryString = this.getCommonParams() + '&id=' + id;
                    this.dbManager.Get('EmpPhotos', 'GetDetails', queryString, (response) => {
                        this.dataItem = response.data;
                        if (response.data !== null) {
                            this.setEmployeePhoto(this.dataItem.Photo);
                        }
                        else
                            this.setEmployeePhoto(null);
                    }, null);
                };
                //scope.$watch(function () {
                //    return profileService.getSelectedProfile();
                //},
                //    function (newVal, oldVal) {
                //        var profileId = 0;
                //        if (angular.isDefined(newVal) && newVal !== null) {
                //            empPhoto.selectedProfile = newVal;
                //            if (angular.isDefined(newVal.ProfileId)) {
                //                profileId = newVal.ProfileId;
                //            }
                //        }
                //        if (angular.isUndefined(profileId)) profileId = 0;
                //        empPhoto.getPhoto(profileId);
                //    }, true);
                this.uploadPic = (file) => {
                    var profileId = this.parentItem[this.parentIdFieldName];
                    let url = HCMS.DataAccess.StartUp.apiUrl + "/EmpPhotos/PostPhoto";
                    this.Upload.upload({
                        url: url,
                        data: { Photo: file, ProfileId: profileId, UserId: HCMS.DataAccess.StartUp.CurrentLoginInfo.User.UserId }
                    }).then((resp) => {
                        file.result = resp.data;
                        //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    }, (resp) => {
                        if (resp.status > 0)
                            this.errorMsg = resp.status + ': ' + resp.data;
                        //console.log('Error status: ' + resp.status);
                    }, (evt) => {
                        file.progress = Math.min(100, parseInt((100.0 * evt.loaded / evt.total).toString()));
                        //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                };
                //this.GetDataByParentCallBack = this.GetByParentCallBack;
                this.GetDataByParentId = (callBack) => {
                    if (this.parentItem === undefined)
                        return;
                    //var currentObject = this;
                    var profileId = this.parentItem[this.parentIdFieldName];
                    if (angular.isUndefined(profileId))
                        profileId = 0;
                    //var queryString = currentObject.FormData.getCommonParams() + '&profileId=' + profileId;
                    //this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByProfileId', queryString, function (response) {
                    //    currentObject.dataList = response.data;
                    //    if (response.data.length > 0) {
                    //        currentObject.dataItem = response.data[0];
                    //    } else {
                    //        currentObject.dataItem = {};
                    //    }
                    //    if (!DataAccess.Utility.IsNull(callBack)) {
                    //        callBack(response.data);
                    //    }
                    //}, null);
                    var queryString = this.getCommonParams() + '&id=' + profileId;
                    this.dbManager.Get('EmpPhotos', 'GetDetails', queryString, (response) => {
                        this.dataItem = response.data;
                        if (response.data !== null) {
                            this.setEmployeePhoto(this.dataItem.Photo);
                        }
                        else
                            this.setEmployeePhoto(null);
                    }, null);
                };
            }
        }
        Forms.ProfilePhotoController = ProfilePhotoController;
        // hcmsForms.controller('profilePhotoController', ProfilePhotoController);
        Forms.hcmsForms.controller('profilePhotoController', ['translateService', 'dataManagerService', 'Upload', '$scope', '$stateParams', function (translateService, dataManagerService, Upload, $scope, $stateParams) {
                return new ProfilePhotoController(translateService, dataManagerService, Upload, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class ProfileSubFormController extends Forms.BaseSubFormManager {
            //static $inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    var profileId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(profileId))
                        profileId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&profileId=' + profileId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByProfileId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
            }
        }
        Forms.ProfileSubFormController = ProfileSubFormController;
        // hcmsForms.controller('profileSubFormController', ProfileSubFormController);
        Forms.hcmsForms.controller('profileSubFormController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new ProfileSubFormController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class PersonalDataTabsController {
            constructor(translateService, dbManager, scope, $stateParams) {
                this.$onInit = () => { };
                this.stackTabOptions = {};
                //inherit BaseFormManager
                //set login Info
                this.scope = scope;
                this.parentIdFieldName = scope.parentIdFieldName;
                this.parentItem = scope.parentItem;
                var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                //if (currentInfo == null) {
                //    currentInfo = new DataAccess.CurrentLoginInfo(dbManager);
                //    var currentUser = angular.fromJson(sessionStorage['user']);
                //    currentInfo.SetLoginInfo({ UserId: currentUser.userId, LangId: currentUser.langId, DatabaseProfileId: currentUser.databaseProfileId, CompanyId: currentUser.companyId });
                //    DataAccess.StartUp.SetCurrentLoginInfo(currentInfo);
                //}
                this.FormSetup = new Forms.BaseFormSetup(translateService, dbManager, currentInfo.User.UserId, scope.formId);
                this.FormSetup.LoadForm();
                this.scope.$watch(() => this.scope.parentItem, (newValue, oldValue) => {
                    if (oldValue !== newValue) {
                        this.parentItem = newValue;
                        this.stackTabOptions.api.activateFirstTab();
                    }
                });
            }
        }
        Forms.PersonalDataTabsController = PersonalDataTabsController;
        // hcmsForms.controller('personalDataTabsController', PersonalDataTabsController);
        Forms.hcmsForms.controller('personalDataTabsController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new PersonalDataTabsController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class ProfilePersonalDataController extends Forms.BaseSubFormManager {
            constructor(translateService, dbManager, scope, $stateParams) {
                //inherit BaseSubFormManager
                super(translateService, dbManager, scope, $stateParams);
                this.$onInit = () => { };
                this.DisplayEditView();
                this.GetDataByParentId = (callBack) => {
                    var currentObject = this;
                    var profileId = currentObject.parentItem[currentObject.parentIdFieldName];
                    if (angular.isUndefined(profileId))
                        profileId = 0;
                    var queryString = currentObject.FormData.getCommonParams() + '&profileId=' + profileId;
                    this.dbManager.Get(currentObject.FormSetup.MyForm.FormController, 'GetByProfileId', queryString, function (response) {
                        currentObject.dataList = response.data;
                        if (response.data.length > 0) {
                            currentObject.dataItem = response.data[0];
                        }
                        else {
                            currentObject.dataItem = {};
                        }
                        if (!HCMS.DataAccess.Utility.IsNull(callBack)) {
                            callBack(response.data);
                        }
                    }, null);
                };
                //this.OnUpdating.addHandler((e?: CancelEventArgs) => {
                //    this.FormData.dataItem = this.dataItem;
                //})
            }
        }
        ProfilePersonalDataController.$inject = ['translateService', 'dataManagerService', '$scope', '$stateParams'];
        Forms.ProfilePersonalDataController = ProfilePersonalDataController;
        //hcmsForms.controller('profilePersonalDataController', ProfilePersonalDataController);
        Forms.hcmsForms.controller('profilePersonalDataController', ['translateService', 'dataManagerService', '$scope', '$stateParams', function (translateService, dataManagerService, $scope, $stateParams) {
                return new ProfilePersonalDataController(translateService, dataManagerService, $scope, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../dataaccess/module.ts" />
/// <reference path="../dataaccess/startup/startup.ts" />
/// <reference path="../dataaccess/startup/company.ts" />
/// <reference path="../dataaccess/startup/currentlogininfo.ts" />
/// <reference path="../dataaccess/startup/databaseprofile.ts" />
/// <reference path="../dataaccess/startup/language.ts" />
/// <reference path="../dataaccess/startup/startup.ts" />
/// <reference path="../dataaccess/startup/user.ts" />
/// <reference path="../dataaccess/startup/utility.ts" />
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../dataaccess/module.ts" />
/// <reference path="../dataaccess/startup/startup.ts" />
/// <reference path="../dataaccess/services/datamanager.ts" />
/// <reference path="../dataaccess/services/translate.ts" />
/// <reference path="../dataaccess/startup/utility.ts" />
/// <reference path="../dataaccess/startup/currentlogininfo.ts" />
/// <reference path="../dataaccess/startup/databaseprofile.ts" />
/// <reference path="../dataaccess/startup/language.ts" />
/// <reference path="../dataaccess/startup/company.ts" />
/// <reference path="../dataaccess/startup/user.ts" />
var HCMS;
(function (HCMS) {
    var Menus;
    (function (Menus) {
        "use strict";
        Menus.hcmsMenus = angular.module("HCMS.Menus", ['HCMS.DataAccess']);
    })(Menus = HCMS.Menus || (HCMS.Menus = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Menus;
    (function (Menus) {
        class MenuTabsService {
            constructor() {
                this.menuTabs = [];
                this.AddMenuTab = (menuItem, params) => {
                    var index = this.menuTabs.length + 1;
                    this.menuTabs.push({ MenuItem: menuItem, MenuParams: params, active: false });
                };
                this.RemoveMenuTab = (menuTab) => {
                    var index = this.menuTabs.indexOf(menuTab);
                    this.menuTabs.splice(index, 1);
                };
                this.GetMenuTabs = () => {
                    return this.menuTabs;
                };
                this.ClearMenuTabs = () => {
                    this.menuTabs = [];
                };
            }
        }
        Menus.MenuTabsService = MenuTabsService;
        //hcmsMenus.service("menuTabsService", MenuTabsService);
        Menus.hcmsMenus.service('menuTabsService', function () {
            return new MenuTabsService();
        });
    })(Menus = HCMS.Menus || (HCMS.Menus = {}));
})(HCMS || (HCMS = {}));
/// <reference path="menutabsservice.ts" />
var HCMS;
(function (HCMS) {
    var Menus;
    (function (Menus) {
        class MenuTabsController {
            constructor(translateService, dbManager, menuTabsService, $state, $scope, $timeout) {
                this.$onInit = () => { };
                this.tabs = [];
                // translate Function
                this.translateText = (text, viewId) => {
                    return this.translateService.Translate(text, viewId);
                };
                this.addToMenuTabs = (_tabs) => {
                    if (_tabs == undefined)
                        return;
                    var tab = _tabs[_tabs.length - 1];
                    if (tab !== undefined) {
                        this.tabs.push(tab);
                        this.timeout(() => {
                            this.activeTabIndex = this.tabs.length - 1;
                        }, 1000);
                        //tab.active = true;
                        //this.tabs.push({ heading: tab.MenuItem.MenuName, route: tab.MenuItem.StateName + tab.MenuItem.MenuId, params: tab.MenuParams });
                    }
                };
                this.closeTab = (index) => {
                    this.tabs.splice(index, 1);
                };
                this.translateService = translateService;
                this.dbManager = dbManager;
                this.menuTabsService = menuTabsService;
                this.state = $state;
                this.scope = $scope;
                this.timeout = $timeout;
                this.tabs = [];
                this.activeTabIndex = 0;
                //scope.$state = this.$state;
                // check current Login Info
                var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                //if (currentInfo == null) {
                //    currentInfo = new DataAccess.CurrentLoginInfo(this.dbManager);
                //    var currentUser = angular.fromJson(sessionStorage['user']);
                //    currentInfo.SetLoginInfo({ UserId: currentUser.userId, LangId: currentUser.langId, DatabaseProfileId: currentUser.databaseProfileId, CompanyId: currentUser.companyId });
                //    DataAccess.StartUp.SetCurrentLoginInfo(currentInfo);
                //}
                //this.tabs = this.menuTabsService.GetMenuTabs();
                this.addToMenuTabs(this.menuTabsService.GetMenuTabs());
                this.scope.$watch(() => this.menuTabsService.GetMenuTabs(), (newValue, oldValue) => {
                    if (oldValue !== newValue) {
                        //this.tabs = newValue;
                        //this.activeTabIndex = this.tabs.length - 1;
                        this.addToMenuTabs(newValue);
                        //scope.addToMenuTabs(newValue);
                    }
                }, true);
            }
        }
        Menus.MenuTabsController = MenuTabsController;
        //hcmsMenus.controller('menuTabsController', MenuTabsController);
        Menus.hcmsMenus.controller('menuTabsController', ['translateService', 'dataManagerService', 'menuTabsService', '$state', '$scope', '$timeout', function (translateService, dataManagerService, menuTabsService, $state, $scope, $timeout) {
                return new MenuTabsController(translateService, dataManagerService, menuTabsService, $state, $scope, $timeout);
            }]);
    })(Menus = HCMS.Menus || (HCMS.Menus = {}));
})(HCMS || (HCMS = {}));
///// <reference path="menutabsservice.ts" />
//module HCMS.Menus {
//    export class MenuNavTabs implements ng.IDirective {
//        public restrict = 'E';
//        public scope: any = {};// { 'setAddMenuFn': "&?" };
//        public priority = 0;
//        public templateUrl: string = "app_hebs/menus/menuTabs.html";
//        private translateService: DataAccess.TranslateService;
//        private dbManager: DataAccess.DataManagerService;
//        private menuTabsService: MenuTabsService;
//        constructor(translateService: DataAccess.TranslateService, dbManager: DataAccess.DataManagerService, menuTabsService: MenuTabsService, private $state: any) {
//            this.translateService = translateService;
//            this.dbManager = dbManager;
//            this.menuTabsService = menuTabsService;
//        }
//        link: ng.IDirectiveLinkFn = (scope: any, element: JQuery, $attrs: ng.IAttributes) => {
//            scope.menuTabs = [];
//            scope.$state = this.$state;
//            // check current Login Info
//            var currentInfo: DataAccess.ICurrentLoginInfo = DataAccess.StartUp.CurrentLoginInfo;
//            if (currentInfo == null) {
//                currentInfo = new DataAccess.CurrentLoginInfo(this.dbManager);
//                var currentUser = angular.fromJson(sessionStorage['user']);
//                currentInfo.SetLoginInfo({ UserId: currentUser.userId, LangId: currentUser.langId, DatabaseProfileId: currentUser.databaseProfileId, CompanyId: currentUser.companyId });
//                DataAccess.StartUp.SetCurrentLoginInfo(currentInfo);
//            }
//            // translate Function
//            scope.translateText = (text: string, viewId?: any) => {
//                return this.translateService.Translate(text, viewId);
//            }
//            scope.$watch(() => this.menuTabsService.GetMenuTabs(),
//                (newValue: Array<IMenuTab>, oldValue: Array<IMenuTab>) => {
//                    if (oldValue !== newValue) {
//                        scope.menuTabs = newValue;
//                        //scope.addToMenuTabs(newValue);
//                    }
//                }, true);
//            scope.addToMenuTabs = (tabs: Array<IMenuTab>) => {
//                if (tabs == undefined) return;
//                var tab = tabs[tabs.length - 1];
//                if (tab !== undefined) {
//                    //scope.menuTabs.push(tab);
//                    scope.menuTabs.push({ heading: tab.MenuItem.MenuName, route: tab.MenuItem.StateName + tab.MenuItem.MenuId, params: tab.MenuParams });
//                }
//            }
//            scope.go = (menu: IMenuTab) => {
//                this.$state.go(menu.MenuItem.StateName + menu.MenuItem.MenuId, menu.MenuParams);
//            };
//            scope.getState = (menu: IMenuTab) => {
//                var params = "";
//                if (menu.MenuParams != undefined) {
//                    angular.forEach(menu.MenuParams, (value, key) => {
//                        params += key + ":'" + menu.MenuParams[key] + "',";
//                    });
//                }
//                params = params.substr(0, params.length - 1);
//                var stateName = menu.MenuItem.StateName + menu.MenuItem.MenuId;
//                if (params != "") {
//                    stateName += "({" + params + "})";
//                }
//                return stateName;
//            };
//            //scope.active = (menu: IMenuTab) => {
//            //    return this.$state.is(menu.MenuItem.StateName);
//            //};
//            //scope.$on("$stateChangeSuccess", () => {
//            //    scope.menuTabs.forEach(function (tab) {
//            //        tab.active = scope.active(tab);
//            //    });
//            //});
//        }
//        static Factory(): ng.IDirectiveFactory {
//            var directive: ng.IDirectiveFactory =
//                (translateService: DataAccess.TranslateService, dbManager: DataAccess.DataManagerService, menuTabsService: MenuTabsService, $state: any) => new MenuNavTabs(translateService, dbManager, menuTabsService, $state);
//            //directive's injection list
//            directive.$inject = ["translateService", "dataManagerService", "menuTabsService", "$state"];
//            return directive;
//        }
//    }
//    hcmsMenus.directive('menuNavTabs', MenuNavTabs.Factory());
//} 
var HCMS;
(function (HCMS) {
    var Authentication;
    (function (Authentication) {
        //"use strict";
        Authentication.hcmsAuthentication = angular.module("HCMS.Authentication", ['HCMS.DataAccess']);
    })(Authentication = HCMS.Authentication || (HCMS.Authentication = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Authentication;
    (function (Authentication) {
        class AccountService {
            constructor($http, $q, dbManager, translator) {
                this.$http = $http;
                this.$q = $q;
                this.dbManager = dbManager;
                this.translator = translator;
                //     var fac = {};
                //var serviceBasePath = window.appConfig.webUrl;
                this.login = (user) => {
                    var serviceBasePath = HCMS.DataAccess.StartUp.apiRootUrl;
                    var obj = { 'username': user.username, 'password': user.password, 'databaseProfileId': user.databaseProfileId, 'companyId': user.companyId, 'langId': user.langId };
                    Object['toparams'] = function ObjectsToParams(obj) {
                        var p = [];
                        for (var key in obj) {
                            p.push(key + '=' + encodeURIComponent(obj[key]));
                        }
                        return p.join('&');
                    };
                    var defer = this.$q.defer();
                    this.$http({
                        method: 'post',
                        url: serviceBasePath + "/token",
                        data: 'grant_type=password&' + Object['toparams'](obj),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then((response) => {
                        defer.resolve(response.data);
                        var data = response.data;
                        var info = new HCMS.DataAccess.CurrentLoginInfo(this.dbManager, this.translator);
                        info.SetLoginInfo({ UserId: data.userId, LangId: data.langId, DatabaseProfileId: data.databaseProfileId, CompanyId: data.companyId, access_token: data.access_token });
                    }, (error) => {
                        defer.reject(error.data);
                    });
                    return defer.promise;
                };
                this.logout = () => {
                    var info = new HCMS.DataAccess.CurrentLoginInfo(this.dbManager, this.translator);
                    HCMS.DataAccess.StartUp.SetCurrentLoginInfo(info);
                };
            }
        }
        AccountService.$inject = ['$http'];
        Authentication.AccountService = AccountService;
        //hcmsDataAccess.service("dataManagerService", DataManagerService);
        Authentication.hcmsAuthentication.service('accountService', ['$http', '$q', 'dataManagerService', 'translateService', function ($http, $q, dataManagerService, translator) {
                return new AccountService($http, $q, dataManagerService, translator);
            }]);
    })(Authentication = HCMS.Authentication || (HCMS.Authentication = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsApplySecurity {
            constructor() {
                this.restrict = 'A';
                this.scope = {
                    hcmsApplySecurity: '='
                };
                this.link = (scope, element, attrs) => {
                    var viewOption = scope.hcmsApplySecurity;
                    var securityOption = { ObjectSecurityId: 2 }; //0 show, 1 hide,2 disabled
                    var applyViewOptions = function (callback) {
                        if (viewOption.IsHidden) {
                            element.css({
                                display: 'none'
                            });
                        }
                        if (viewOption.IsReadOnly) {
                            element.attr('disabled', 'disabled');
                            $(element).find("input[type='text']").children().attr("readonly", "readonly");
                            $(element).find("!input[type='text']").children().attr("disabled", "disabled");
                        }
                    };
                    var applySecurity = function (viewOption) {
                        if (viewOption.IsHidden) {
                            return;
                        }
                        switch (securityOption.ObjectSecurityId) {
                            case 1:
                                element.css({
                                    display: 'none'
                                });
                                break;
                            case 2:
                                element.attr('disabled', 'disabled');
                                $(element).find("*").children().attr("disabled", "disabled");
                                break;
                            default:
                            case 0:
                                element.css({
                                    display: 'block'
                                });
                                //$(element).removeAttr('disabled');
                                break;
                        }
                    };
                };
            }
            static Factory() {
                var directive = () => new HcmsApplySecurity();
                //directive.$inject = ["translateService","dataManagerService"];
                return directive;
            }
        }
        Controls.HcmsApplySecurity = HcmsApplySecurity;
        Controls.hcmsControls.directive('hcmsApplySecurity', HcmsApplySecurity.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        Controls.hcmsControls.filter('hcmspercentage', ['$filter', function ($filter) {
                return function (input, decimals) {
                    return $filter('number')(input * 100, decimals) + '%';
                };
            }]);
        Controls.hcmsControls.filter('hcmsnumber', ['$filter', function ($filter) {
                return function (input, decimals) {
                    return $filter('number')(input, decimals);
                };
            }]);
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class genericEditor {
            constructor($rootScope, $compile, translateService) {
                this.restrict = 'E';
                this.scope = {
                    hcOptions: '=',
                    ngModel: "=",
                    hcText: "@?",
                    hcEvents: "=?",
                    hcDontLoadData: "=?"
                };
                this.priority = 0;
                this.link = (scope, element, $attrs) => {
                    scope.$watch('hcOptions', function (value) {
                        if (value != null) {
                            addControl();
                        }
                    });
                    var compile = this.compiler;
                    function addControl() {
                        var template = '<hcms-text name="inputControl" ng-model="ngModel" hc-options="hcOptions" hc-events="hcEvents"></hcms-text>';
                        switch (scope.hcOptions.ControlTypeName) {
                            case "comment":
                            case "notes":
                                template = '<hcms-comment name= "inputControl" ng-model="ngModel" hc-options="hcOptions" hc-events="hcEvents"> </hcms-comment>';
                                break;
                            case "date":
                                template = '<hcms-date name= "inputControl" ng-model="ngModel" hc-options="hcOptions" hc-events="hcEvents"> </hcms-date>';
                                break;
                            case "time":
                                template = '<hcms-time name= "inputControl" ng-model="ngModel" hc-options="hcOptions" hc-events="hcEvents"> </hcms-time>';
                                break;
                            case "int":
                                template = '<hcms-number name= "inputControl" ng-model="ngModel" hc-options="hcOptions" hc-events="hcEvents"> </hcms-number>';
                                break;
                            case "number":
                                template = '<hcms-number name= "inputControl" ng-model="ngModel" hc-options="hcOptions" hc-events="hcEvents"> </hcms-number>';
                                break;
                            case "email":
                                template = '<hcms-email name= "inputControl" ng-model="ngModel" hc-options="hcOptions" hc-events="hcEvents"> </hcms-email>';
                                break;
                            case "checkbox":
                            case "check":
                                template = '<hcms-check name= "inputControl" ng-model="ngModel" hc-options="hcOptions" hc-text="{{hcText}}" hc-events="hcEvents"> </hcms-check>';
                                break;
                            case "radiobox":
                            case "radio":
                                template = '<hcms-radio name= "inputControl" ng-model="ngModel" hc-options="hcOptions" hc-events="hcEvents"> </hcms-radio>';
                                break;
                            case "month":
                                template = '<hcms-month name= "inputControl" ng-model="ngModel"  hc-options="hcOptions" hc-events="hcEvents"> </hcms-month>';
                                break;
                            case "year":
                                template = '<hcms-year name= "inputControl" ng-model="ngModel"  hc-options="hcOptions" hc-events="hcEvents"> </hcms-year>';
                                break;
                            case "select":
                                //template = '<hcms-multi-select name= "inputControl" ng-model="ngModel"  hc-options="hcOptions" hc-events="hcEvents"> </hcms-multi-select>';
                                template = '<hcms-select name= "inputControl" ng-model="ngModel"  hc-options="hcOptions" hc-events="hcEvents" hc-dont-load-data="hcDontLoadData"> </hcms-select>';
                                break;
                            case "multiselect":
                                template = '<hcms-multi-select name= "inputControl" ng-model="ngModel"  hc-options="hcOptions" hc-events="hcEvents" hc-dont-load-data="hcDontLoadData"> </hcms-multi-select>';
                                break;
                            case "tree":
                            case "report-tree":
                                template = '<hcms-tree name= "inputControl" ng-model="ngModel"  hc-options="hcOptions" hc-events="hcEvents"> </hcms-tree>';
                                break;
                            case "file":
                                template = '<hcms-file name= "inputControl" ng-model="ngModel"  hc-options="hcOptions" hc-events="hcEvents"> </hcms-file>';
                                break;
                            default:
                        }
                        element.html(template);
                        compile(element.contents())(scope);
                    }
                };
                this.compiler = $compile;
                this.translateService = translateService;
                this.rootScope = $rootScope;
                // this.scope.hcmsTranslator = '=';
            }
            // to register directive 
            static Factory() {
                var directive = ($rootScope, $compile, translateService) => new genericEditor($rootScope, $compile, translateService);
                //directive's injection list
                directive.$inject = ["$rootScope", "$compile", "translateService"];
                return directive;
            }
        }
        Controls.genericEditor = genericEditor;
        Controls.hcmsControls.directive('hcmsGeneric', genericEditor.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class CheckBox {
            constructor() {
                this.require = "^ngModel";
                this.restrict = 'AE';
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcText: "@",
                    hcEvents: "=?"
                };
                this.template = function (element, attrs) {
                    return '<div  class="checkbox" data-page-id="{{hcOptions.ViewId}}" data-object-id="{{hcOptions.ControlId}}" ><label><input type="checkbox"  ng-model="ngModel" ng-change="hcEvents.defaultAction(ngModel)"   ng-required="{{hcOptions.IsRequired}}"' + Controls.getSecurityString() + ' /> {{hcText}} </label></div>';
                };
            }
            static Factory() {
                var directive = () => new CheckBox();
                return directive;
            }
        }
        Controls.CheckBox = CheckBox;
        Controls.hcmsControls.directive('hcmsCheck', CheckBox.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsDate {
            constructor(moment) {
                this.moment = moment;
                this.restrict = 'AE';
                this.require = "^ngModel";
                this.scope = {
                    hcOptions: "=?",
                    ngModel: "=",
                    hcEvents: "=?"
                };
                this.template = function (element, attrs) {
                    var result = '<div class="input-group" data-page-id="{{hcOptions.ViewId}}" data-object-id="{{hcOptions.ControlId}}"' + Controls.getSecurityString() + ' >';
                    result += '<input type="text" class="form-control input-sm"   uib-datepicker-popup="{{dateFormat}}" ng-model-options="{allowInvalid:false}" is-open="popup2.opened" close-text="Close" datepicker-options="dateOptions" ng-model="ngModel"  ng-change="dataChanged(ngModel)"  ng-required="{{hcOptions.IsRequired}}" ng-readonly="{{hcOptions.IsReadOnly}}" ng-pattern="{{hcOptions.Pattern}}" ng-value="{{hcOptions.DefaultValue}}"  />';
                    result += '<span class="input-group-btn" ng-hide="{{hcOptions.IsReadOnly}}">';
                    result += '<button type="button" class="btn btn-xs btn-default" ng-click="open2()"><i class="glyphicon glyphicon-calendar"></i></button>';
                    result += '</span>';
                    result += '</div>';
                    return result;
                };
                this.unboundLink = (scope, element, attrs, ngModelController) => {
                    scope.dateFormat = "dd/MM/yyyy";
                    scope.dateOptions = {
                        //dateDisabled: disabled,
                        showWeeks: false,
                        formatYear: 'yyyy',
                        maxDate: (angular.isDate(scope.hcOptions.DateMaxValue) ? new Date(scope.hcOptions.DateMaxValue) : null),
                        minDate: (angular.isDate(scope.hcOptions.DateMinValue) ? new Date(scope.hcOptions.DateMinValue) : null),
                        startingDay: 6,
                    };
                    // Disable weekend selection
                    function disabled(data) {
                        var date = data.date, mode = data.mode;
                        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                    }
                    scope.open2 = function () {
                        scope.popup2.opened = true;
                    };
                    scope.popup2 = {
                        opened: false
                    };
                    scope.dataChanged = (data) => {
                        if (HCMS.Validations.CommonValidations.isNull(data))
                            return;
                        ngModelController.$modelValue = getRightDate(data);
                        scope.ngModel = ngModelController.$modelValue;
                        if (scope.hcEvents && scope.hcEvents.defaultAction)
                            scope.hcEvents.defaultAction(data);
                    };
                    var toView = function (val) {
                        //if (typeof val === "string") {
                        //    val = new Date(val);
                        //}
                        return val;
                    };
                    var getRightDate = (data) => {
                        if (HCMS.Validations.CommonValidations.isNull(data) || isNaN(data))
                            return null;
                        else {
                            var dateString;
                            if (typeof data === "string")
                                dateString = data;
                            else
                                dateString = HCMS.Validations.DateValidations.dateToJsonString(data);
                            var d = new Date(dateString);
                            return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                        }
                    };
                    ngModelController.$parsers.push((data) => {
                        //View -> Model
                        return getRightDate(data);
                    });
                    //ngModelController.$formatters.push((data) => {
                    //    //Model -> View
                    //    if (HCMS.Validations.CommonValidations.isNull(data))
                    //        return data;
                    //    else {
                    //        var dateString: string;
                    //        if (typeof data === "string")
                    //            dateString = data;
                    //        else
                    //            dateString = HCMS.Validations.DateValidations.DateToJsonString(data);
                    //        var d = new Date(dateString);
                    //        //return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                    //        return this.moment(d, 'DD/MM/YYYY').utc().toISOString();
                    //    }
                    //});
                    scope.$watch('ngModel', function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            var dateString;
                            if (typeof newValue === "string") {
                                dateString = newValue;
                                //else
                                //    dateString = HCMS.Validations.DateValidations.DateToJsonString(newValue);
                                var d = new Date(dateString);
                                scope.ngModel = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                            }
                        }
                    });
                };
                this.link = this.unboundLink.bind(this);
            }
            static Factory() {
                var directive = (moment) => new HcmsDate(moment);
                directive.$inject = ["moment"];
                return directive;
            }
        }
        Controls.HcmsDate = HcmsDate;
        Controls.hcmsControls.directive('hcmsDate', HcmsDate.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        //export class HcmsSelect implements ng.IDirective {
        //    public restrict = 'AE';
        //    public require: string = "^ngModel";
        //    public scope: any = {
        //        hcOptions: "=",
        //        ngModel: "=",
        //        hcApiUrl: "=?",
        //        hcEvents: "=?"
        //    }
        //    constructor(public dbManager: DataAccess.DataManagerService, public compiler: ng.ICompileService) {
        //    }
        //    link: ng.IDirectiveLinkFn = (scope: any, element: JQuery, attrs: ng.IAttributes) => {
        //        scope.items = [];
        //        var valueMemeber = scope.hcOptions.SelectDisplayValue;
        //        var displayMember = scope.hcOptions.SelectDisplayName;
        //        var searchParams = scope.hcOptions.SelectSearchFields;
        //        var htmlData = scope.hcOptions.SelectHtmlData;
        //        var searchParamsStr = '{';
        //        searchParamsStr += valueMemeber + ': $select.search,';
        //        searchParamsStr += displayMember + ': $select.search,';
        //        if (angular.isString(searchParams)) {
        //            var searchArray = searchParams.split(",");
        //            angular.forEach(searchArray, function (value, key) {
        //                searchParamsStr += value + ': $select.search,';
        //            });
        //        }
        //        scope.onSelected = function (item, selected) {
        //            if (scope.hcEvents && scope.hcEvents.defaultAction) {
        //                scope.hcEvents.defaultAction(item, selected);
        //            }
        //        };
        //        searchParamsStr += '}';
        //        var template = '<select class="form-control"   ng-model="ngModel"  ng-options="item.' + valueMemeber + ' as item.' + displayMember + ' for item in items"  select2  ng-change="hcEvents.defaultAction(ngModel)"  ng-required="{{hcOptions.IsRequired}}" ng-disabled="{{hcOptions.IsReadOnly}}" ng-hide="{{hcOptions.IsHidden}}"><option value=""></option></select>';
        //        element.html(template);
        //        this.compiler(element.contents())(scope);
        //        //scope.items = [{ id: 1, name: 'Eid' }, { id: 2, name: 'Ahmed' }, { id: 3, name: 'Morsy' }, { id: 4, name: 'Mohamedeen' }, { id: 5, name: 'test5' }, { id: 6, name: 'test6' }]; 
        //        scope.clear = function ($event) {
        //            $event.stopPropagation();
        //            scope.ngModel = undefined;
        //        };
        //        if (angular.isString(scope.hcApiUrl)) {
        //            // var url = appConfig.webApiUrl + scope.hcApiUrl;
        //            this.dbManager.GetByUrl(scope.hcApiUrl, function (result) {
        //                scope.items = result.data;
        //            })
        //        }
        //        else {
        //            if (angular.isString(scope.hcOptions.SelectApiUrl)) {
        //                this.dbManager.GetByUrl(scope.hcOptions.SelectApiUrl, function (result) {
        //                    scope.items = result.data;
        //                })
        //            }
        //        }
        //    }
        //    static Factory(): ng.IDirectiveFactory {
        //        var directive: ng.IDirectiveFactory =
        //            (dbManager: DataAccess.DataManagerService, compiler: ng.ICompileService) => new HcmsSelect(dbManager, compiler);
        //        directive.$inject = ["dataManagerService", "$compile"];
        //        return directive;
        //    }
        //}
        //hcmsControls.directive('hcmsSelect', HcmsSelect.Factory());
        class HcmsSelect {
            constructor(dbManager, compiler) {
                this.dbManager = dbManager;
                this.compiler = compiler;
                this.restrict = 'AE';
                this.require = "^ngModel";
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcApiUrl: "=?",
                    hcEvents: "=?",
                    hcDontLoadData: "=?"
                };
                this.link = (scope, element, attrs) => {
                    scope.items = [];
                    var valueMemeber = scope.hcOptions.SelectDisplayValue;
                    var displayMember = scope.hcOptions.SelectDisplayName;
                    if (HCMS.DataAccess.StartUp != null) {
                        if (!HCMS.Validations.CommonValidations.isNull(HCMS.DataAccess.StartUp.CurrentLoginInfo)) {
                            displayMember = HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection == 'rtl' ? scope.hcOptions.SelectDisplayName_ : scope.hcOptions.SelectDisplayName;
                        }
                    }
                    //var defaultvalue = scope.hcOptions.DefaultValue;
                    //scope.filterField = '';
                    var setApiFunctions = () => {
                        if (scope.hcOptions == null) {
                            scope.hcOptions = {};
                        }
                        scope.hcOptions.api = {};
                        scope.hcOptions.api.setItemsList = setItemsList;
                    };
                    var setItemsList = (data, callBack) => {
                        scope.items = data;
                        if (callBack != null && angular.isDefined(callBack)) {
                            callBack(data);
                        }
                    };
                    // var filter: string = "";
                    var template = '<select class="form-control"  select2  ng-model="ngModel"  ng-options="item.' + valueMemeber + ' as item.' + displayMember + ' for item in items"  ng-change="selectChanged(ngModel)"  ng-required="{{hcOptions.IsRequired}}" ng-disabled="{{hcOptions.IsReadOnly}}" ng-hide="{{hcOptions.IsHidden}}"><option value="">...</option></select>';
                    element.html(template);
                    this.compiler(element.contents())(scope);
                    scope.hcOptions.reload = () => {
                        scope.fillData("");
                    };
                    //scope.$watch('scope.filterField', (newValue, oldValue) => {
                    //    if (newValue != null && newValue != oldValue) {
                    //        scope.fillData(newValue);
                    //    }
                    //});
                    scope.selectChanged = (value) => {
                        if (scope.hcEvents) {
                            if (scope.hcEvents.defaultAction !== undefined && scope.hcEvents.defaultAction !== null)
                                scope.hcEvents.defaultAction(value);
                            if (scope.hcEvents.selectedItemChanged !== undefined && scope.hcEvents.selectedItemChanged !== null) {
                                let item = scope.items.find(x => x[scope.hcOptions.SelectDisplayValue] == value);
                                scope.hcEvents.selectedItemChanged(item);
                            }
                        }
                    };
                    scope.fillData = (filter) => {
                        if (!angular.isString(scope.hcApiUrl)) {
                            scope.hcApiUrl = "Lookups/GetData/?dropDownId=" + scope.hcOptions.DropDownId;
                        }
                        //if (!HCMS.Validations.CommonValidations.isNull(filter) && filter != '') {
                        //    scope.hcApiUrl += "&filter=" + filter;
                        //}
                        this.dbManager.GetByUrl(scope.hcApiUrl, function (result) {
                            scope.items = result.data;
                            if (scope.hcOptions.DefaultValue && scope.hcOptions.DefaultValue !== null && scope.hcOptions.DefaultValue !== "") {
                                scope.ngModel = eval(scope.hcOptions.DefaultValue);
                            }
                        });
                    };
                    if (scope.hcDontLoadData !== true) {
                        scope.fillData("");
                    }
                    setApiFunctions();
                };
            }
            static Factory() {
                var directive = (dbManager, compiler) => new HcmsSelect(dbManager, compiler);
                directive.$inject = ["dataManagerService", "$compile"];
                return directive;
            }
        }
        Controls.HcmsSelect = HcmsSelect;
        Controls.hcmsControls.directive('hcmsSelect', HcmsSelect.Factory());
        class HcmsSelect2 {
            constructor(compiler) {
                this.compiler = compiler;
                this.restrict = 'A';
                this.require = "^ngModel";
                this.scope = {
                    'ngModel': '='
                };
                this.link = (scope, element, attrs) => {
                    var direction = 'ltr';
                    if (HCMS.DataAccess.StartUp.CurrentLoginInfo !== null && HCMS.DataAccess.StartUp.CurrentLoginInfo.Language !== undefined && HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection !== undefined) {
                        direction = HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection;
                        scope.$watch(() => {
                            return HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection;
                        }, function (newValue, oldValue) {
                            direction = newValue;
                            element.select2({
                                width: '100%',
                                dir: direction
                            });
                        });
                    }
                    element.select2({
                        width: '100%',
                        dir: direction
                    });
                    scope.$watch('ngModel', (newValue, oldValue) => {
                        setTimeout(function () {
                            element.select2({
                                width: '100%',
                                dir: direction
                            }).val(newValue);
                        });
                    });
                };
            }
            static Factory() {
                var directive = (compiler) => new HcmsSelect2(compiler);
                directive.$inject = ["$compile"];
                return directive;
            }
        }
        Controls.HcmsSelect2 = HcmsSelect2;
        Controls.hcmsControls.directive('select2', HcmsSelect2.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsEmail {
            constructor() {
                this.require = "^ngModel";
                this.restrict = 'AE';
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcEvents: "=?"
                };
                this.template = function (element, attrs) {
                    return '<input type="email" class="form-control input-xs" placeholder="someone@example.com" ng-model="ngModel"' + Controls.ngHcmsOptions() + ' ng-change="hcEvents.defaultAction(ngModel)" />';
                };
            }
            static Factory() {
                var directive = () => new HcmsEmail();
                return directive;
            }
        }
        Controls.HcmsEmail = HcmsEmail;
        Controls.hcmsControls.directive('hcmsEmail', HcmsEmail.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class hcmsFile {
            constructor() {
                this.require = "^ngModel";
                this.restrict = 'AE';
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcEvents: "@?"
                };
                this.template = function (element, attrs) {
                    return '<input type="file" class="form-control input-xs" ng-model="ngModel"  ' + Controls.ngHcmsOptions() + ' ng-change="hcEvents.defaultAction(ngModel)" />';
                };
            }
            static Factory() {
                var directive = () => new Controls.CheckBox();
                return directive;
            }
        }
        Controls.hcmsFile = hcmsFile;
        Controls.hcmsControls.directive('hcmsFile', hcmsFile.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsComment {
            constructor() {
                this.require = "^ngModel";
                this.restrict = 'AE';
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcEvents: "=?"
                };
                this.template = '<textarea  ng-model="ngModel" class="form-control" rows="3" ' + Controls.ngHcmsOptions() + ' ng-change="hcEvents.defaultAction(ngModel)" ></textarea>';
            }
            static Factory() {
                var directive = () => new HcmsComment();
                return directive;
            }
        }
        Controls.HcmsComment = HcmsComment;
        Controls.hcmsControls.directive('hcmsComment', HcmsComment.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsMultiSelect {
            constructor(dbManager, compiler, timeout) {
                this.dbManager = dbManager;
                this.compiler = compiler;
                this.timeout = timeout;
                this.restrict = 'AE';
                this.require = "^ngModel";
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcApiUrl: "=?",
                    hcEvents: "=?",
                    hcDontLoadData: "=?"
                };
                this.link = (scope, element, attrs) => {
                    scope.items = [];
                    var valueMemeber = scope.hcOptions.SelectDisplayValue;
                    var displayMember = scope.hcOptions.SelectDisplayName;
                    if (HCMS.DataAccess.StartUp != null) {
                        if (!HCMS.Validations.CommonValidations.isNull(HCMS.DataAccess.StartUp.CurrentLoginInfo)) {
                            displayMember = HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection == 'rtl' ? scope.hcOptions.SelectDisplayName_ : scope.hcOptions.SelectDisplayName;
                        }
                    }
                    var template = '<select multiple="multiple" multiple-select ng-multiple="true" ng-model="ngModel"  ng-options="item.' + valueMemeber + ' as item.' + displayMember + ' for item in items"     ng-change="hcEvents.defaultAction(ngModel)"  ng-required="{{hcOptions.IsRequired}}" ng-disabled="{{hcOptions.IsReadOnly}}" ng-hide="{{hcOptions.IsHidden}}"></select>';
                    element.html(template);
                    this.compiler(element.contents())(scope);
                    //scope.clear = ($event) => {
                    //    $event.stopPropagation();
                    //    scope.ngModel = undefined;
                    //};
                    scope.hcOptions.reload = () => {
                        if (!angular.isString(scope.hcApiUrl)) {
                            scope.hcApiUrl = "Lookups/GetData/?dropDownId=" + scope.hcOptions.DropDownId;
                        }
                        this.dbManager.GetByUrl(scope.hcApiUrl, success);
                        //if (angular.isString(scope.hcApiUrl)) {
                        //    this.dbManager.GetByUrl(scope.hcApiUrl, success);
                        //}
                        //else {
                        //    if (angular.isString(scope.hcOptions.SelectApiUrl)) {
                        //        this.dbManager.GetByUrl(scope.hcOptions.SelectApiUrl, success);
                        //    }
                        //}
                    };
                    var success = (result) => {
                        scope.items = result.data;
                        this.timeout(() => {
                            $(element).children('select').multipleSelect({
                                width: '100%',
                                filter: true
                            });
                            if (scope.hcOptions.DefaultValue && scope.hcOptions.DefaultValue !== null && scope.hcOptions.DefaultValue !== "") {
                                scope.ngModel = eval(scope.hcOptions.DefaultValue);
                            }
                        }, 200);
                    };
                    if (scope.hcDontLoadData !== true) {
                        scope.hcOptions.reload();
                    }
                };
            }
            static Factory() {
                var directive = (dbManager, compiler, timeout) => new HcmsMultiSelect(dbManager, compiler, timeout);
                directive.$inject = ["dataManagerService", "$compile", "$timeout"];
                return directive;
            }
        }
        Controls.HcmsMultiSelect = HcmsMultiSelect;
        Controls.hcmsControls.directive('hcmsMultiSelect', HcmsMultiSelect.Factory());
        class MultipleSelect {
            constructor(compiler, timeout) {
                this.compiler = compiler;
                this.timeout = timeout;
                this.restrict = 'A';
                this.transclude = true;
                this.require = "^ngModel";
                this.scope = {
                    ngModel: '='
                };
                this.link = (scope, element, attrs, controller, transcluder) => {
                    this.timeout(() => {
                        transcluder((clone) => {
                            element.append(clone);
                            $(element).multipleSelect({
                                width: '100%',
                                filter: true
                            });
                        });
                        scope.toggle = () => {
                        };
                    }, 200);
                };
            }
            static Factory() {
                var directive = (compiler, timeout) => new MultipleSelect(compiler, timeout);
                directive.$inject = ["$compile", "$timeout"];
                return directive;
            }
        }
        Controls.MultipleSelect = MultipleSelect;
        Controls.hcmsControls.directive('multipleSelect', MultipleSelect.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsNumber {
            constructor() {
                this.require = "^ngModel";
                this.restrict = 'AE';
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcEvents: "=?"
                };
                this.template = '<input type="number"  step="0.1" class="form-control input-xs" ng-min="{{hcOptions.NumberMinValue}}" ng-max="{{hcOptions.NumberMaxValue}}" ng-model="ngModel"' + Controls.ngHcmsOptions() + ' ng-change="hcEvents.defaultAction(ngModel)" />';
            }
            static Factory() {
                var directive = () => new HcmsNumber();
                return directive;
            }
        }
        Controls.HcmsNumber = HcmsNumber;
        Controls.hcmsControls.directive('hcmsNumber', HcmsNumber.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsProgressBar {
            constructor(translator, dbManager, compiler, timeout, filter, interval) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.compiler = compiler;
                this.timeout = timeout;
                this.filter = filter;
                this.interval = interval;
                this.restrict = 'AE';
                this.template = `
<div class="row" >
    <div class="col-sm-12">
        <div class="row">
            <div class="col-sm-4">
                StartTime : {{hcOptions.formatedStartTime}}
            </div>
            <div class="col-sm-4">
                Duration : {{hcOptions.formatedDuration}}
            </div>
            <div class="col-sm-4">
                Remaining Time : {{hcOptions.formatedRemainingTime}}
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <uib-progressbar max="hcOptions.progressMax" value="hcOptions.progressValue" class="progress-striped active" type="{{progressType}}">
                    <span style="color:black; white-space:nowrap;">
                        {{hcOptions.progressValue}} / {{hcOptions.progressMax}}     Percent: {{hcOptions.progressPercent}}
                    </span>
                </uib-progressbar>
            </div>
        </div>
    </div>
</div>
`;
                this.scope = {
                    hcOptions: "=",
                    hcEvents: "=?",
                    progressId: "="
                };
                this.compile = (element, attrs) => {
                    return {
                        pre: (scope, element, attrs) => {
                            if (scope.hcOptions == null) {
                                scope.hcOptions = {};
                            }
                            scope.translateText = (text) => {
                                return this.translator.Translate(text);
                            };
                            var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                            //scope.$watch('progressId', (newValue, oldValue) => {
                            //    setApiFunctions();
                            //});
                            //scope.$watch('hcOptions', (newValue, oldValue) => {
                            //    setApiFunctions();
                            //});
                            var setApiFunctions = () => {
                                if (scope.hcOptions == null) {
                                    scope.hcOptions = {};
                                }
                                scope.hcOptions.api = {};
                                scope.hcOptions.api.startProgress = startProgress;
                                scope.hcOptions.api.stopProgress = stopProgress;
                                scope.hcOptions.api.checkIfProgressRunning = checkIfProgressRunning;
                                scope.hcOptions.api.setProgressId = setProgressId;
                            };
                            var getCommonParams = function () {
                                return "&userId=" + currentInfo.User.UserId + "&langId=" + currentInfo.Language.LangId + "&companyId=" + currentInfo.Company.CompanyId;
                            };
                            var getProgressData = (callback) => {
                                if (HCMS.Validations.CommonValidations.isNull(scope.progressId) || (scope.progressId == 0)) {
                                    return;
                                }
                                var queryString = '?progressId=' + scope.progressId + getCommonParams();
                                this.dbManager.Get('SystemProgress', 'GetByProgressId', queryString, (response) => {
                                    setProgressOptions(response.data);
                                    if (response.data.ProgressCalcStatusId == -1) {
                                        scope.hcOptions.stopProgress();
                                    }
                                    else {
                                        if (callback != null) {
                                            callback();
                                        }
                                    }
                                }, function (response) {
                                    console.log(response.data);
                                });
                            };
                            var setProgressOptions = (progressData) => {
                                scope.hcOptions.progressValue = progressData.ProgressValue;
                                scope.hcOptions.progressMax = progressData.ProgressMax;
                                if (scope.hcOptions.progressValue == scope.hcOptions.progressMax)
                                    stopInterval();
                            };
                            var setProgressId = (progressId, callBack) => {
                                scope.progressId = progressId;
                                if (callBack != null && angular.isDefined(callBack)) {
                                    callBack();
                                }
                            };
                            var startProgress = (callBack) => {
                                scope.hcOptions.startTime = new Date();
                                scope.hcOptions.formatedStartTime = this.filter('date')(new Date(), 'HH:mm:ss');
                                stopInterval();
                                startInterval();
                                if (callBack != null && angular.isDefined(callBack)) {
                                    callBack();
                                }
                            };
                            var stopProgress = (callBack) => {
                                if (HCMS.Validations.CommonValidations.isNull(scope.progressId) || (scope.progressId == 0)) {
                                    return;
                                }
                                var queryString = '?progressId=' + scope.progressId + "&userId=" + currentInfo.User.UserId + "&companyId=" + currentInfo.Company.CompanyId;
                                this.dbManager.Post('SystemProgress', 'StopProgress', queryString, null, function () {
                                    stopInterval();
                                    if (callBack != null && angular.isDefined(callBack)) {
                                        callBack();
                                    }
                                });
                                //$timeout.cancel(tick);
                            };
                            var progressInterval;
                            var startInterval = () => {
                                progressInterval = this.interval(() => {
                                    getProgressData(() => {
                                        calculatePercent();
                                        calculateTime();
                                    });
                                }, 1000);
                            };
                            var stopInterval = () => {
                                if (!HCMS.Validations.CommonValidations.isNull(progressInterval)) {
                                    this.interval.cancel(progressInterval);
                                    progressInterval = undefined;
                                }
                            };
                            scope.$on('$destroy', function () {
                                stopInterval();
                            });
                            var checkIfProgressRunning = (runningCallBack, notRunningCallBack) => {
                                if (HCMS.Validations.CommonValidations.isNull(scope.progressId) || (scope.progressId == 0)) {
                                    return;
                                }
                                var queryString = '?progressId=' + scope.progressId + "&userId=" + currentInfo.User.UserId + "&companyId=" + currentInfo.Company.CompanyId;
                                this.dbManager.Get('SystemProgress', 'IsProgressRunning', queryString, function (response) {
                                    if (response.data.RunningStatus > 0) {
                                        if (runningCallBack != null && angular.isDefined(runningCallBack)) {
                                            runningCallBack();
                                        }
                                    }
                                    else {
                                        if (notRunningCallBack != null && angular.isDefined(notRunningCallBack)) {
                                            notRunningCallBack();
                                        }
                                    }
                                }, function (response) {
                                    console.log(response.data);
                                });
                                //$timeout.cancel(tick);
                            };
                            var calculatePercent = function () {
                                scope.hcOptions.progressPercent = scope.hcOptions.progressValue / scope.hcOptions.progressMax * 100;
                                scope.hcOptions.progressPercent = Math.floor(scope.hcOptions.progressPercent);
                                var value = scope.hcOptions.progressPercent;
                                var type;
                                if (value < 25) {
                                    type = 'danger';
                                }
                                else if (value < 50) {
                                    type = 'warning';
                                }
                                else if (value < 75) {
                                    type = 'info';
                                }
                                else {
                                    type = 'success';
                                }
                                scope.progressType = type;
                            };
                            var calculateTime = () => {
                                if (HCMS.Validations.CommonValidations.isNull(scope.hcOptions.progressValue) || scope.hcOptions.progressValue == 0) {
                                    return;
                                }
                                var currentTime = new Date();
                                scope.hcOptions.durationSeconds = HCMS.Validations.DateValidations.dateDiffSeconds(scope.hcOptions.startTime, currentTime);
                                scope.hcOptions.formatedDuration = getFormatedDuration(scope.hcOptions.durationSeconds);
                                scope.hcOptions.formatedRemainingTime = getFormatedRemainingTime(scope.hcOptions.startTime, scope.hcOptions.progressValue, scope.hcOptions.progressMax);
                            };
                            var getFormatedDuration = function (seconds) {
                                var minutes = Math.floor(seconds / 60);
                                var hours = Math.floor(minutes / 60);
                                var days = Math.floor(hours / 24);
                                var duration = "";
                                if (days > 0) {
                                    duration += "Days:" + days + "  ";
                                }
                                hours = hours - (days * 24);
                                if (hours > 0) {
                                    duration += pad(hours, 2);
                                }
                                else {
                                    duration += pad(0, 2);
                                }
                                minutes = minutes - (hours * 60) - (days * 24 * 60);
                                if (minutes > 0) {
                                    duration += ":" + pad(minutes, 2);
                                }
                                else {
                                    duration += ":" + pad(0, 2);
                                }
                                seconds = seconds - (minutes * 60) - (hours * 60 * 60) - (days * 24 * 60 * 60);
                                seconds = Math.floor(seconds);
                                if (seconds > 0) {
                                    duration += ":" + pad(seconds, 2);
                                }
                                else {
                                    duration += ":" + pad(0, 2);
                                }
                                return duration;
                            };
                            function pad(num, size) {
                                var s = num + "";
                                while (s.length < size)
                                    s = "0" + s;
                                return s;
                            }
                            var getFormatedRemainingTime = (startTime, currentCount, maxCount) => {
                                var currentTime = new Date();
                                var seconds = HCMS.Validations.DateValidations.dateDiffSeconds(startTime, currentTime);
                                var remainingCount = maxCount - currentCount;
                                var remainingSeconds = remainingCount * seconds / currentCount;
                                var formated = getFormatedDuration(remainingSeconds);
                                return formated;
                            };
                            setApiFunctions();
                        },
                        post: (scope, element, attrs) => { }
                    };
                };
            }
            //link: ng.IDirectiveLinkFn = (scope: any, element: JQuery, attrs: ng.IAttributes) => {
            //}
            static Factory() {
                var directive = (translator, dbManager, compiler, timeout, filter, interval) => new HcmsProgressBar(translator, dbManager, compiler, timeout, filter, interval);
                directive.$inject = ["translateService", "dataManagerService", "$compile", "$timeout", "$filter", "$interval"];
                return directive;
            }
        }
        Controls.HcmsProgressBar = HcmsProgressBar;
        Controls.hcmsControls.directive('hcmsProgressBar', HcmsProgressBar.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsProgressCalc {
            constructor(translator, dbManager, progressTypeService, compiler, timeout, filter, interval) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.progressTypeService = progressTypeService;
                this.compiler = compiler;
                this.timeout = timeout;
                this.filter = filter;
                this.interval = interval;
                this.restrict = 'AE';
                this.template = `
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                ×
            </button>
            <h4 class="modal-title">{{hcOptions.progressTitle}}</h4>
        </div>
        <div class="modal-body">
            <div>
                <hcms-progress-bar progress-id="progressId" hc-options="progressOptions"></hcms-progress-bar>
            </div>
            <smart-grid options="errorGridOptions" column-defs="errorGridColumns" data="errorLogData"></smart-grid>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
                Close
            </button>
        </div>
    </div> 
</div> 
`;
                this.scope = {
                    hcOptions: "=",
                    title: "=?",
                    progressId: "=",
                    progressTypeId: "=?"
                };
                this.compile = (element, attrs) => {
                    return {
                        pre: (scope, element, attrs) => {
                            let progressTypeId = scope.progressTypeId;
                            if (scope.hcOptions == null) {
                                scope.hcOptions = {};
                            }
                            if (scope.progress == null)
                                scope.progress = { progressOptions: {} };
                            if (scope.progressOptions == null) {
                                scope.progressOptions = {};
                            }
                            scope.translateText = (text) => {
                                return this.translator.Translate(text);
                            };
                            //var currentInfo: DataAccess.ICurrentLoginInfo = DataAccess.StartUp.CurrentLoginInfo;
                            var setApiFunctions = () => {
                                if (scope.hcOptions == null) {
                                    scope.hcOptions = {};
                                }
                                scope.hcOptions.api = {};
                                scope.hcOptions.api.startProgress = startProgress;
                                scope.hcOptions.api.stopProgress = stopProgress;
                                scope.hcOptions.api.checkIfProgressRunning = checkIfProgressRunning;
                                scope.hcOptions.api.setProgressId = setProgressId;
                                scope.hcOptions.api.setProgressTypeId = setProgressTypeId;
                                if (scope.progressOptions == null) {
                                    scope.progressOptions = {};
                                    scope.progressOptions.progressValue = 0;
                                    scope.progressOptions.progressMax = 1;
                                }
                            };
                            //var getCommonParams = function () {
                            //    return "&userId=" + currentInfo.User.UserId + "&langId=" + currentInfo.Language.LangId + "&companyId=" + currentInfo.Company.CompanyId;
                            //}
                            var errorGridColumns = this.progressTypeService.getColumns(progressTypeId);
                            scope.errorLogData = [];
                            var initGrid = () => {
                                if (scope.errorGridOptions == null) {
                                    scope.errorGridOptions = {};
                                    scope.errorGridOptions = { SelectButton: false, EditButton: false, DeleteButton: false, enableQuickFilter: true, enableRtl: HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection.toLowerCase() === 'rtl' ? true : false };
                                    scope.errorGridOptions.rowData = scope.errorLogData;
                                    scope.errorGridOptions.columnDefs = errorGridColumns;
                                }
                            };
                            var getErrorLogData = () => __awaiter(this, void 0, void 0, function* () {
                                if (HCMS.Validations.CommonValidations.isNull(scope.progressId) || (scope.progressId == 0)) {
                                    return;
                                }
                                var result = yield this.progressTypeService.getErrorLogData(progressTypeId, scope.progressId);
                                scope.errorLogData = result.data;
                            });
                            //[
                            //    { field: 'ErrorNumber', hide: false, controlTypeName: 'text', headerName: scope.translateText('ErrorNumber') },
                            //    { field: 'ErrorMessager', hide: false, controlTypeName: 'text', headerName: scope.translateText('ErrorMessager') },
                            //    { field: 'ProfileCode', hide: false, controlTypeName: 'text', headerName: scope.translateText('ProfileCode') },
                            //    { field: 'RunNo', hide: false, controlTypeName: 'text', headerName: scope.translateText('RunNo') },
                            //    { field: 'PayrollMonth', hide: false, controlTypeName: 'text', headerName: scope.translateText('PayrollMonth') },
                            //    { field: 'PayrollYear', hide: false, controlTypeName: 'text', headerName: scope.translateText('PayrollYear') }
                            //]
                            var startProgress = (callBack) => {
                                scope.progressOptions.api.startProgress(() => {
                                    stopInterval();
                                    startInterval();
                                    if (callBack != null && angular.isDefined(callBack)) {
                                        callBack();
                                    }
                                });
                            };
                            var setProgressId = (progressId, callBack) => {
                                scope.progressId = progressId;
                                scope.progressOptions.api.setProgressId(progressId, callBack);
                            };
                            var setProgressTypeId = (progressTypeId, callBack) => {
                                scope.progressTypeId = progressTypeId;
                                if (callBack != null && angular.isDefined(callBack)) {
                                    callBack();
                                }
                            };
                            var stopProgress = (callBack) => {
                                stopInterval();
                                scope.progressOptions.api.stopProgress(() => {
                                    if (callBack != null && angular.isDefined(callBack)) {
                                        callBack();
                                    }
                                });
                            };
                            var progressInterval;
                            var startInterval = () => {
                                progressInterval = this.interval(() => {
                                    getErrorLogData();
                                }, 1000);
                            };
                            var stopInterval = (callBack) => {
                                if (!HCMS.Validations.CommonValidations.isNull(progressInterval)) {
                                    this.interval.cancel(progressInterval);
                                    progressInterval = undefined;
                                }
                            };
                            var checkIfProgressRunning = (runningCallBack, notRunningCallBack) => {
                                scope.progressOptions.api.checkIfProgressRunning(runningCallBack, notRunningCallBack);
                            };
                            scope.$on('$destroy', () => {
                                stopInterval();
                            });
                            setApiFunctions();
                            initGrid();
                        },
                        post: (scope, element, attrs) => {
                        }
                    };
                };
            }
            //link: ng.IDirectiveLinkFn = (scope: any, element: JQuery, attrs: ng.IAttributes) => {
            //}
            static Factory() {
                var directive = (translator, dbManager, progressTypeService, compiler, timeout, filter, interval) => new HcmsProgressCalc(translator, dbManager, progressTypeService, compiler, timeout, filter, interval);
                directive.$inject = ["translateService", "dataManagerService", "progressTypeService", "$compile", "$timeout", "$filter", "$interval"];
                return directive;
            }
        }
        Controls.HcmsProgressCalc = HcmsProgressCalc;
        Controls.hcmsControls.directive('hcmsProgressCalc', HcmsProgressCalc.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        Controls.ProgressTypes = {
            LoanPostCalculation: {
                controllerName: 'PayrollErrorLog',
                columns: [
                    { field: 'ErrorNumber', hide: false, controlTypeName: 'text' },
                    { field: 'ErrorMessage', hide: false, controlTypeName: 'text' },
                    { field: 'EmployeeCode', hide: false, controlTypeName: 'text' },
                    { field: 'ProfileName', hide: false, controlTypeName: 'text' },
                    { field: 'PayrollRunName', hide: false, controlTypeName: 'text' },
                    { field: 'PayrollMonth', hide: false, controlTypeName: 'text' },
                    { field: 'PayrollYear', hide: false, controlTypeName: 'text' }
                ]
            },
            PayrollSalaryCalculation: {
                controllerName: 'PayrollErrorLog',
                columns: [
                    { field: 'ErrorNumber', hide: false, controlTypeName: 'text' },
                    { field: 'ErrorMessage', hide: false, controlTypeName: 'text' },
                    { field: 'EmployeeCode', hide: false, controlTypeName: 'text' },
                    { field: 'ProfileName', hide: false, controlTypeName: 'text' },
                    { field: 'PayrollRunName', hide: false, controlTypeName: 'text' },
                    { field: 'PayrollMonth', hide: false, controlTypeName: 'text' },
                    { field: 'PayrollYear', hide: false, controlTypeName: 'text' }
                ]
            },
            PayrollTransactionCalculation: {
                controllerName: 'PayrollTransactionErrorLog',
                columns: [
                    { field: 'ErrorNumber', hide: false, controlTypeName: 'text' },
                    { field: 'ErrorMessage', hide: false, controlTypeName: 'text' },
                    { field: 'EmployeeCode', hide: false, controlTypeName: 'text' },
                    { field: 'ProfileName', hide: false, controlTypeName: 'text' },
                    { field: 'PayrollTransactionTypeName', hide: false, controlTypeName: 'text' },
                    { field: 'PayrollRunName', hide: false, controlTypeName: 'text' },
                    { field: 'PayrollMonth', hide: false, controlTypeName: 'text' },
                    { field: 'PayrollYear', hide: false, controlTypeName: 'text' }
                ]
            },
            AttendanceCalculation: {
                controllerName: 'AttendanceErrorLog',
                columns: [
                    { field: 'ErrorNumber', hide: false, controlTypeName: 'text' },
                    { field: 'ErrorMessage', hide: false, controlTypeName: 'text' },
                    { field: 'EmployeeCode', hide: false, controlTypeName: 'text' },
                    { field: 'ProfileName', hide: false, controlTypeName: 'text' },
                    { field: 'AttendanceDate', hide: false, controlTypeName: 'date', template: "<p>{{data.AttendanceDate | date:'dd/MM/yyyy'}}</p>" },
                ]
            }
        };
        class ProgressTypeService {
            constructor(dbManager, translateService) {
                this.dbManager = dbManager;
                this.translateService = translateService;
                this.getCommonParams = function () {
                    return "&userId=" + this.currentInfo.User.UserId + "&langId=" + this.currentInfo.Language.LangId + "&companyId=" + this.currentInfo.Company.CompanyId;
                };
                this.getProgressType = (progressTypeId) => {
                    let progressType;
                    switch (progressTypeId) {
                        case 1:// Loan Post  Not used
                            progressType = Controls.ProgressTypes.LoanPostCalculation;
                            break;
                        case 2:// Payroll Salary
                            progressType = Controls.ProgressTypes.PayrollSalaryCalculation;
                            break;
                        case 3:// Payroll Transactions
                            progressType = Controls.ProgressTypes.PayrollTransactionCalculation;
                            break;
                        case 4: // Attendance Calculation
                        case 5:
                            progressType = Controls.ProgressTypes.AttendanceCalculation;
                            break;
                        case 6:
                            break;
                        default:
                            progressType = Controls.ProgressTypes.PayrollSalaryCalculation;
                            break;
                    }
                    return progressType;
                };
                this.getColumns = (progressTypeId) => {
                    let progressType = this.getProgressType(progressTypeId);
                    if (progressType === null || progressType === undefined)
                        return null;
                    let columns = progressType.columns;
                    for (let entry of columns) {
                        entry.headerName = this.translateService.Translate(entry.field);
                    }
                    return columns;
                };
                this.getErrorLogData = (progressTypeId, progressId) => {
                    if (HCMS.Validations.CommonValidations.isNull(progressId) || (progressId == 0)) {
                        return;
                    }
                    let progressType = this.getProgressType(progressTypeId);
                    if (progressType === null || progressType === undefined)
                        return null;
                    var queryString = '?progressId=' + progressId + this.getCommonParams();
                    return this.dbManager.GetPromise(progressType.controllerName, 'GetByProgressId', queryString);
                };
                this.currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
            }
        }
        ProgressTypeService.$inject = ['dataManagerService', 'translateService'];
        Controls.ProgressTypeService = ProgressTypeService;
        Controls.hcmsControls.service('progressTypeService', ['dataManagerService', 'translateService', function (dataManagerService, translateService) {
                return new ProgressTypeService(dataManagerService, translateService);
            }]);
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsRadio {
            constructor() {
                this.require = "^ngModel";
                this.restrict = 'AE';
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcEvents: "=?"
                };
                this.template = '<input type="radio" class="form-control"  data-page-id="{{hcOptions.ViewId}}" data-object-id="{{hcOptions.ControlId}}"  ng-model="ngModel" ng-change="hcEvents.defaultAction(ngModel)"  ng-required="{{hcOptions.IsRequired}}"' + Controls.getSecurityString() + ' />';
            }
            static Factory() {
                var directive = () => new HcmsRadio();
                return directive;
            }
        }
        Controls.HcmsRadio = HcmsRadio;
        Controls.hcmsControls.directive('hcmsRadio', HcmsRadio.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsMonth {
            constructor(dbManager, compiler) {
                this.dbManager = dbManager;
                this.compiler = compiler;
                this.restrict = 'AE';
                this.require = "^ngModel";
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcEvents: "=?"
                };
                this.link = (scope, element, attrs) => {
                    scope.items = [];
                    var valueMemeber = "monthValue";
                    var displayMember = "monthName";
                    var searchParams = "monthValue";
                    scope.onSelected = function (item, selected) {
                        if (scope.hcEvents && scope.hcEvents.defaultAction) {
                            scope.hcEvents.defaultAction(item, selected);
                        }
                    };
                    function fillMonths() {
                        var currentMonth = 0;
                        scope.items = [];
                        for (var i = 1; i < 13; i++) {
                            currentMonth += 1;
                            scope.items.push({ monthValue: currentMonth, monthName: currentMonth });
                        }
                        if (scope.hcOptions.DefaultValue && scope.hcOptions.DefaultValue !== null && scope.hcOptions.DefaultValue !== "") {
                            scope.ngModel = eval(scope.hcOptions.DefaultValue);
                        }
                        else {
                            scope.ngModel = new Date().getMonth() + 1;
                        }
                    }
                    fillMonths();
                    var template = '<select class="form-control"   ng-model="ngModel"  ng-options="item.' + valueMemeber + ' as item.' + displayMember + ' for item in items"  select2  ng-change="hcEvents.defaultAction(ngModel)"  ng-required="{{hcOptions.IsRequired}}" ng-disabled="{{hcOptions.IsReadOnly}}" ng-hide="{{hcOptions.IsHidden}}"><option value=""></option></select>';
                    element.html(template);
                    this.compiler(element.contents())(scope);
                    //scope.items = [{ id: 1, name: 'Eid' }, { id: 2, name: 'Ahmed' }, { id: 3, name: 'Morsy' }, { id: 4, name: 'Mohamedeen' }, { id: 5, name: 'test5' }, { id: 6, name: 'test6' }]; 
                    scope.clear = function ($event) {
                        $event.stopPropagation();
                        scope.ngModel = undefined;
                    };
                };
            }
            static Factory() {
                var directive = (dbManager, compiler) => new HcmsMonth(dbManager, compiler);
                directive.$inject = ["dataManagerService", "$compile"];
                return directive;
            }
        }
        Controls.HcmsMonth = HcmsMonth;
        Controls.hcmsControls.directive('hcmsMonth', HcmsMonth.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsYear {
            constructor(dbManager, compiler) {
                this.dbManager = dbManager;
                this.compiler = compiler;
                this.restrict = 'AE';
                this.require = "^ngModel";
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcYearCount: "=?",
                    hcEvents: "=?"
                };
                this.link = (scope, element, attrs) => {
                    scope.items = [];
                    var valueMemeber = "yearValue";
                    var displayMember = "yearName";
                    var searchParams = "yearValue";
                    scope.onSelected = function (item, selected) {
                        if (scope.hcEvents && scope.hcEvents.defaultAction) {
                            scope.hcEvents.defaultAction(item, selected);
                        }
                    };
                    function fillYears() {
                        scope.items = [];
                        if (HCMS.Validations.CommonValidations.isNull(scope.hcYearCount)) {
                            scope.hcYearCount = 20;
                        }
                        var yearStart = scope.hcYearCount * -1;
                        var currentYear = new Date().getFullYear() + yearStart;
                        for (var i = yearStart; i < scope.hcYearCount; i++) {
                            currentYear += 1;
                            scope.items.push({ yearValue: currentYear, yearName: currentYear });
                        }
                        if (scope.hcOptions.DefaultValue && scope.hcOptions.DefaultValue !== null && scope.hcOptions.DefaultValue !== "") {
                            scope.ngModel = eval(scope.hcOptions.DefaultValue);
                        }
                        else {
                            scope.ngModel = new Date().getFullYear();
                        }
                    }
                    fillYears();
                    var template = '<select class="form-control"   ng-model="ngModel"  ng-options="item.' + valueMemeber + ' as item.' + displayMember + ' for item in items"  select2  ng-change="hcEvents.defaultAction(ngModel)"  ng-required="{{hcOptions.IsRequired}}" ng-disabled="{{hcOptions.IsReadOnly}}" ng-hide="{{hcOptions.IsHidden}}"><option value=""></option></select>';
                    element.html(template);
                    this.compiler(element.contents())(scope);
                    //scope.items = [{ id: 1, name: 'Eid' }, { id: 2, name: 'Ahmed' }, { id: 3, name: 'Morsy' }, { id: 4, name: 'Mohamedeen' }, { id: 5, name: 'test5' }, { id: 6, name: 'test6' }]; 
                    scope.clear = function ($event) {
                        $event.stopPropagation();
                        scope.ngModel = undefined;
                    };
                };
            }
            static Factory() {
                var directive = (dbManager, compiler) => new HcmsYear(dbManager, compiler);
                directive.$inject = ["dataManagerService", "$compile"];
                return directive;
            }
        }
        Controls.HcmsYear = HcmsYear;
        Controls.hcmsControls.directive('hcmsYear', HcmsYear.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsText {
            constructor() {
                this.require = "^ngModel";
                this.restrict = 'AE';
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcEvents: "=?"
                };
                this.template = '<input type="text" class="form-control input-xs" ng-model="ngModel"  ' + Controls.ngHcmsOptions() + ' ng-change="hcEvents.defaultAction(ngModel)" />';
            }
            static Factory() {
                var directive = () => new HcmsText();
                return directive;
            }
        }
        Controls.HcmsText = HcmsText;
        Controls.hcmsControls.directive('hcmsText', HcmsText.Factory());
        //hcmsControls.component('hcmsText', {
        //    template: '<input type="text" class="form-control input-xs" ng-model="$ctrl.ngModel" ng-change="$ctrl.hcEvents.defaultAction($ctrl.ngModel)" />',
        //    bindings: {
        //        hcOptions: "=",
        //        ngModel: "=",
        //        hcEvents: "=",
        //    },
        //    controller: HcmsText
        //});
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsTime {
            constructor() {
                this.require = "^ngModel";
                this.restrict = 'AE';
                // public replace = true;
                this.scope = {
                    hcOptions: "=",
                    hcEvents: "=?"
                };
                //public template: string = '<input type="time" class="form-control input-xs" ng-model="ngModel"  ' + ngHcmsOptions() + ' ng-change="hcEvents.defaultAction(ngModel)" />';
                this.template = '<div uib-timepicker ng-model="mytime"   hour-step="1" minute-step="1" show-seconds="false" show-meridian="false" ng-change="timeChanged(mytime)" ></div>';
                this.unboundLink = (scope, element, attrs, ngModelController) => {
                    ngModelController.$formatters.push(function (modelValue) {
                        if (!HCMS.Validations.CommonValidations.isNull(modelValue)) {
                            var alltime = modelValue.split(':');
                            if (alltime.length > 2) {
                                var time = {
                                    h: parseInt(alltime[0]),
                                    m: parseInt(alltime[1]),
                                    s: parseInt(alltime[2])
                                };
                                time.s = 0;
                                return { mytime: new Date(2000, 1, 1, time.h, time.m, time.s, 0) };
                            }
                            else
                                return { mytime: null };
                        }
                        else
                            return { mytime: null };
                    });
                    ngModelController.$render = function () {
                        scope.mytime = ngModelController.$viewValue.mytime;
                    };
                    scope.$watch('mytime', function () {
                        ngModelController.$setViewValue({ mytime: scope.mytime });
                    });
                    ngModelController.$parsers.push(function (viewValue) {
                        if (!HCMS.Validations.CommonValidations.isNull(viewValue) && !HCMS.Validations.CommonValidations.isNull(viewValue.mytime)) {
                            // use ("100" + viewValue.mytime.getHours()).slice(-2) to  put zero leading if number less than 10.
                            return ("100" + viewValue.mytime.getHours()).slice(-2) + ':' + ("100" + viewValue.mytime.getMinutes()).slice(-2) + ":" + ("100" + viewValue.mytime.getSeconds()).slice(-2);
                        }
                        else
                            return null;
                    });
                    scope.timeChanged = (data) => {
                        if (scope.hcEvents && scope.hcEvents.defaultAction) {
                            var currentDate = null;
                            if (!HCMS.Validations.CommonValidations.isNull(data) && !HCMS.Validations.CommonValidations.isNull(data)) {
                                // use ("100" + viewValue.mytime.getHours()).slice(-2) to  put zero leading if number less than 10.
                                currentDate = ("100" + data.getHours()).slice(-2) + ':' + ("100" + data.getMinutes()).slice(-2) + ":" + ("100" + data.getSeconds()).slice(-2);
                            }
                            scope.hcEvents.defaultAction(currentDate);
                        }
                    };
                };
                this.link = this.unboundLink.bind(this);
            }
            static Factory() {
                var directive = () => new HcmsTime();
                return directive;
            }
        }
        Controls.HcmsTime = HcmsTime;
        Controls.hcmsControls.directive('hcmsTime', HcmsTime.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        //"use strict";
        Controls.hcmsControls = angular.module("HCMS.Controls", ['HCMS.DataAccess', 'HCMS.Validations']);
        function getSecurityString() {
            return 'ng-hide="{{hcOptions.IsHidden}}" ng-readonly="{{hcOptions.IsReadOnly}}" ng-disabled="{{hcOptions.IsReadOnly}}" ';
        }
        Controls.getSecurityString = getSecurityString;
        function ngHcmsOptions() {
            return ' data-page-id="{{hcOptions.ViewId}}" data-object-id="{{hcOptions.ControlId}}"   ng-required="{{hcOptions.IsRequired}}"  ng-minlength="{{hcOptions.MinLength}}" ng-maxlength="{{hcOptions.MaxLength}}" ng-pattern="{{hcOptions.Pattern}}" ng-value="{{hcOptions.DefaultValue}}" ' + getSecurityString();
        }
        Controls.ngHcmsOptions = ngHcmsOptions;
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsColorpicker {
            constructor() {
                this.restrict = 'A';
                this.scope = {};
                this.link = (scope, element, attrs) => {
                    var currentObject = this;
                };
                this.compile = (tElement, tAttributes) => {
                    tElement.removeAttr('hcms-colorpicker data-hcms-colorpicker');
                    var aOptions = tElement.pick(tAttributes, ['']);
                    var options = {
                        format: "hex",
                        colorSelectors: {
                            'black': '#000000',
                            'white': '#ffffff',
                            'red': '#FF0000',
                            'default': '#777777',
                            'primary': '#337ab7',
                            'success': '#5cb85c',
                            'info': '#5bc0de',
                            'warning': '#f0ad4e',
                            'danger': '#d9534f'
                        }
                    };
                    //var options= _.extend(aOptions, {});
                    tElement.colorpicker(options);
                };
            }
            static Factory() {
                var directive = () => new HcmsColorpicker();
                return directive;
            }
        }
        Controls.HcmsColorpicker = HcmsColorpicker;
        Controls.hcmsControls.directive('hcmsColorpicker', HcmsColorpicker.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class EmpDefaultAssignmentList {
            constructor(translator, dbManager, $timeOut) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.$timeOut = $timeOut;
                this.restrict = 'AE';
                this.scope = {
                    options: '='
                };
                this.template = function () {
                    return `
<smart-grid id="grd" name="grid.name" data="assignmentList" options="options" column-defs="grid.columns" style="height:500px;"></smart-grid>
`;
                };
                this.link = (scope, element, attrs) => {
                    scope.grid = { name: 'listGrid' };
                    scope.options.SelectButton = true;
                    scope.options.EditButton = false;
                    scope.options.DeleteButton = false;
                    scope.options.enableQuickFilter = true;
                    //scope.currentLanguage = loginInfo.getCurrentLanguage();
                    var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                    scope.translateText = (text) => {
                        return this.translator.Translate(text);
                    };
                    scope.selectText = ""; //scope.translateText('Select');
                    //scope.columns = null;
                    scope.grid.columns = [
                        { headerName: scope.selectText, width: 50, cellRenderer: selectCell, suppressMenu: true, suppressSorting: true, suppressSizeToFit: true },
                        { field: 'EmployeeCode', hide: false, controlTypeName: 'text', headerName: scope.translateText('EmployeeCode') },
                        { field: 'ProfileName', hide: false, controlTypeName: 'text', headerName: scope.translateText('ProfileName') },
                        { field: 'ProfileName_', hide: false, controlTypeName: 'text', headerName: scope.translateText('ProfileName_') }
                    ];
                    function selectCell(params) {
                        var selectCallback = params.api.gridCore.gridOptions.selectCallback;
                        if (selectCallback) {
                            var elem = document.createElement("span");
                            elem.innerHTML = '<a class="btn btn-xs btn-primary"><span class="fa fa-hand-pointer-o center-block"></span></a>';
                            elem.addEventListener("click", function () { selectCallback(params.data); });
                            return elem;
                        }
                    }
                    var getEmpDataList = () => {
                        var queryString = '?userId=' + currentInfo.User.UserId + '&langId=' + currentInfo.Language.LangId;
                        this.dbManager.Get("Profile", 'GetDefaultAssignmentList', queryString, function (response) {
                            scope.assignmentList = response.data;
                        }, function () {
                            scope.assignmentList = null;
                        });
                    };
                    getEmpDataList();
                };
            }
            static Factory() {
                var directive = (translator, dbManager, $timeout) => new EmpDefaultAssignmentList(translator, dbManager, $timeout);
                directive.$inject = ["translateService", "dataManagerService", "$timeout"];
                return directive;
            }
        }
        Controls.EmpDefaultAssignmentList = EmpDefaultAssignmentList;
        Controls.hcmsControls.directive('empDefaultAssignemntList', EmpDefaultAssignmentList.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsTree {
            constructor(translator, dbManager, compiler, timeout, ivhTreeviewOptions, ivhTreeviewBfs, ivhTreeviewMgr) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.compiler = compiler;
                this.timeout = timeout;
                this.ivhTreeviewOptions = ivhTreeviewOptions;
                this.ivhTreeviewBfs = ivhTreeviewBfs;
                this.ivhTreeviewMgr = ivhTreeviewMgr;
                this.restrict = 'AE';
                this.require = "^ngModel";
                this.scope = {
                    hcOptions: "=",
                    ngModel: "=",
                    hcApiUrl: "=?",
                    hcEvents: "=?"
                };
                this.link = (scope, element, attrs) => {
                    scope.treeData = [];
                    var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                    var commonParams = function () {
                        return '?userId=' + currentInfo.User.UserId
                            + '&langId=' + currentInfo.Language.LangId
                            + '&companyId=' + currentInfo.Company.CompanyId
                            + '&treeId=' + scope.hcOptions.TreeId;
                    };
                    this.dbManager.Get('TreeView', 'GetGeneralTree', commonParams(), function (result) {
                        scope.treeData = result.data;
                    }, null);
                    var opts = {};
                    opts.idAttribute = "'TreeNodeId'";
                    opts.labelAttribute = "'content'";
                    opts.childrenAttribute = "'children'";
                    //opts.selectedAttribute === 'ngModel'
                    opts.useCheckboxes = true;
                    // to know options only
                    function options() {
                        //get selected node
                        var selectedNodes = [];
                        this.ivhTreeviewBfs(element, function (node) {
                            if (node.selected) {
                                selectedNodes.push(node);
                            }
                        });
                        //deselect All nodes
                        this.ivhTreeviewMgr.deselectAll(scope.treeData);
                        //select All nodes
                        this.ivhTreeviewMgr.selectAll(scope.treeData);
                        // more options..........
                    }
                    var template = ' <div  ivh-treeview="treeData"';
                    template += 'ivh-treeview-id-attribute="' + opts.idAttribute + '"';
                    template += 'ivh-treeview-label-attribute="' + opts.labelAttribute + '"';
                    template += 'ivh-treeview-children-attribute="' + opts.childrenAttribute + '"';
                    template += 'ivh-treeview-use-checkboxes="' + opts.useCheckboxes + '"';
                    //template+='ivh-treeview-selected-attribute="' + isSelected + '"';
                    template += 'ivh-treeview-on-cb-change="changeCallback(ivhNode)"';
                    template += ">";
                    element.html(template);
                    this.compiler(element.contents())(scope);
                    scope.changeCallback = function (node) {
                        if (scope.hcOptions.SelectOneOnly) {
                            this.ivhTreeviewMgr.deselectAll(scope.treeData);
                            this.ivhTreeviewMgr.selectEach(scope.treeData, node);
                        }
                        var selectedNodes = [];
                        this.ivhTreeviewBfs(scope.treeData, function (node) {
                            if (node.selected) {
                                selectedNodes.push(node);
                            }
                        });
                        scope.ngModel = selectedNodes.join(',');
                    };
                };
            }
            static Factory() {
                var directive = (translator, dbManager, compiler, timeout, ivhTreeviewOptions, ivhTreeviewBfs, ivhTreeviewMgr) => new HcmsTree(translator, dbManager, compiler, timeout, ivhTreeviewOptions, ivhTreeviewBfs, ivhTreeviewMgr);
                directive.$inject = ["translateService", "dataManagerService", "$compile", "$timeout", "ivhTreeviewOptions", "ivhTreeviewBfs", "ivhTreeviewMgr"];
                return directive;
            }
        }
        Controls.HcmsTree = HcmsTree;
        Controls.hcmsControls.directive('hcmsTree', HcmsTree.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class ImportFromExcel {
            constructor() {
                this.restrict = 'AE';
                this.scope = {
                    xlsOptions: "="
                };
                this.link = (scope, element, attrs) => {
                    element.on('click', (clickEvent) => {
                        if (scope.xlsOptions.onClick) {
                            scope.xlsOptions.onClick(element);
                        }
                    });
                    element.on('change', (changeEvent) => {
                        scope.xlsOptions.fileName = changeEvent.target.files[0].name;
                        var reader = new FileReader();
                        var xls = window.XLSX;
                        reader.onload = (e) => {
                            /* read workbook */
                            var bstr = e.target.result;
                            var workbook = xls.read(bstr, { type: 'binary' });
                            var first_sheet_name = workbook.SheetNames[0];
                            var dataObjects = xls.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);
                            scope.xlsOptions.data = dataObjects;
                            if (scope.xlsOptions.onChanged != null) {
                                scope.xlsOptions.onChanged(dataObjects);
                            }
                        };
                        reader.readAsBinaryString(changeEvent.target.files[0]);
                    });
                };
            }
            static Factory() {
                var directive = () => new ImportFromExcel();
                return directive;
            }
        }
        Controls.ImportFromExcel = ImportFromExcel;
        Controls.hcmsControls.directive('importFromExcel', ImportFromExcel.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class HcmsOrgChart {
            constructor(translator, dbManager) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.restrict = 'A';
                this.scope = {
                    treeOptions: '='
                };
                this.link = (scope, element, attrs) => {
                    scope.data = {};
                    var getTree = () => {
                        var queryString = '?userId=' + scope.treeOptions.userId + '&formId=' + scope.treeOptions.formId;
                        queryString += '&treeId=' + scope.treeOptions.treeId + '&langId=' + scope.treeOptions.langId;
                        queryString += '&companyId=' + scope.treeOptions.companyId;
                        this.dbManager.Get("TreeView", 'GetOrgChart', queryString, function (result) {
                            scope.data = result.data;
                            $(element).orgchart({
                                'data': scope.data,
                                'nodeId': "TreeNodeId",
                                'nodeTitle': 'title',
                                'nodeContent': 'content',
                                'exportButton': true,
                                'exportFilename': 'MyOrgChart',
                                //'zoom': true,
                                //'pan': true,
                                'draggable': true,
                                'depth': 2
                            });
                        }, function (result) {
                            // this..alert("Can not load tree.");
                        }, null);
                    };
                    getTree();
                    //scope.$watch( 'treeOptions.treeId' , (newValue, oldValue) => {
                    //    if (!HCMS.Validations.CommonValidations.isNull(newValue) && newValue !== oldValue) {
                    //        getTree();
                    //    }
                    //})
                    //var dataUrl = appConfig.webApiUrl + "/TreeView/GetOrgChart/" + queryString;
                };
            }
            static Factory() {
                var directive = (translator, dbManager) => new HcmsOrgChart(translator, dbManager);
                directive.$inject = ["translateService", "dataManagerService"];
                return directive;
            }
        }
        Controls.HcmsOrgChart = HcmsOrgChart;
        Controls.hcmsControls.directive('hcmsOrgChart', HcmsOrgChart.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class EmpAssignmentInfo {
            constructor(translator, dbManager) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.restrict = 'AE';
                this.scope = {
                    assignmentId: "=",
                };
                //        < div class= "table table-striped" >
                //        <div class="row">
                //        <div class="col-sm-12"> 
                //        <h1>{{translateText('EmployeeInformation') }
                //} </h1>
                //    < /div>       
                //    < /div>
                //    < div class="row" >
                //        <div class="col-sm-2" >
                //            <b>{{translateText('EmployeeNo') }}</b> 
                //                < /div>
                //                < div class="col-sm-10" >
                //                    {{employeeInfo.EmployeeCode }}
                //</div>
                //    < /div>
                //    < div class="row" >
                //        <div class="col-sm-2" >
                //            <b>{{translateText('EmployeeName') }}</b>
                //                < /div>
                //                < div class="col-sm-10" >
                //                    {{employeeInfo.ProfileName }}
                //</div>
                //    < /div>
                //    < div class="row" >
                //        <div class="col-sm-2" >
                //            <b>{{translateText('EmployeeName_') }}</b> 
                //                < /div>
                //                < div class="col-sm-10" >
                //                    {{employeeInfo.ProfileName_ }}
                //</div>
                //    < /div>
                //    < /div>
                //        public template: string = ` <div class="employee-card">
                // <img src='{{picFile}}' class="employee-card-img"/>
                //<div class="employee-card-body">
                //<h4>
                //    <i>{{employeeInfo.EmployeeCode}}</i> <strong>{{employeeInfo.getEmployeeName()}}</strong>
                //</h4>
                //<p><b>{{'EmpHireDate' | translate}}: <strong>{{employeeInfo.EmpHireDate | date:"dd/MM/yyyy"}}</strong></p>
                //<p><b>{{'WorkExperience' | translate}}: <strong>{{employeeInfo.WorkExperience}}</strong></p>
                //<p><b>{{'UnitName' | translate}}: </b><i> {{employeeInfo.UnitCode}}</i> <strong>{{employeeInfo.getUnitName()}}</strong></p>
                //<p><b>{{'JobName' | translate}}: </b><i> {{employeeInfo.JobCode}}</i> <strong>{{employeeInfo.getJobName()}}</strong></p>
                //</div>
                //            </div>`; 
                this.template = ` <div class="employee-card">
 <img src='{{picFile}}' class="employee-card-img"/>
<div class="employee-card-body">
     <div class="form-group  row">
            <div class="col-sm-2"><b>{{'EmployeeCode' | translate}}</b></div>
            <div class="col-sm-4">{{employeeInfo.EmployeeCode}}</div>
            <div class="col-sm-1"><b>{{'ProfileName' | translate}}</b></div>
            <div class="col-sm-5">{{employeeInfo.getEmployeeName()}}</div>
      
    </div>
     <div class="form-group  row">
            <div class="col-sm-2"><b>{{'EmpHireDate' | translate}}</b></div>
            <div class="col-sm-4">{{employeeInfo.EmpHireDate | date:"dd/MM/yyyy"}}</div>
            <div class="col-sm-1"><b>{{'UnitName' | translate}}</b></div>
            <div class="col-sm-5">{{employeeInfo.getUnitName()}}</div>
      
    </div>
     <div class="form-group  row">
            <div class="col-sm-2"><b>{{'WorkExperience' | translate}}</b></div>
            <div class="col-sm-4">{{employeeInfo.WorkExperience}}</div>
            <div class="col-sm-1"><b>{{'JobName' | translate}}</b></div>
            <div class="col-sm-5">{{employeeInfo.getJobName()}}</div>
      
    </div>

</div>

            </div>`;
                this.link = (scope, element, attrs) => {
                    //scope.currentLanguage = loginInfo.getCurrentLanguage();
                    var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                    scope.employeeInfo = {};
                    scope.$watch('assignmentId', function (value) {
                        if (value != null) {
                            getEmpData(value);
                        }
                    });
                    scope.translateText = (text) => {
                        return this.translator.Translate(text);
                    };
                    var getEmpData = (assignmentId) => {
                        var queryString = '?empAssignmentId=' + assignmentId + '&userId=' + currentInfo.User.UserId + '&langId=' + currentInfo.Language.LangId;
                        this.dbManager.Get("Profile", 'GetAssignmentInfo', queryString, function (response) {
                            scope.employeeInfo = response.data;
                            scope.employeeInfo.getEmployeeName = () => {
                                if (HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection == "rtl") {
                                    return scope.employeeInfo.ProfileName_;
                                }
                                else {
                                    return scope.employeeInfo.ProfileName;
                                }
                            };
                            scope.employeeInfo.getUnitName = () => {
                                if (HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection == "rtl") {
                                    return scope.employeeInfo.UnitName_;
                                }
                                else {
                                    return scope.employeeInfo.UnitName;
                                }
                            };
                            scope.employeeInfo.getJobName = () => {
                                if (HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection == "rtl") {
                                    return scope.employeeInfo.JobName_;
                                }
                                else {
                                    return scope.employeeInfo.JobName;
                                }
                            };
                            scope.setEmployeePhoto(scope.employeeInfo.Photo);
                        }, function () {
                            scope.employeeInfo = {};
                        });
                    };
                    scope.setEmployeePhoto = (photo) => {
                        if (photo === null || photo == "") {
                            scope.picFile = "/styles/img/noProfile.png";
                        }
                        else {
                            scope.picFile = "data:image/jpeg;base64," + photo;
                        }
                    };
                };
            }
            static Factory() {
                var directive = (translator, dbManager) => new EmpAssignmentInfo(translator, dbManager);
                directive.$inject = ["translateService", "dataManagerService"];
                return directive;
            }
        }
        Controls.EmpAssignmentInfo = EmpAssignmentInfo;
        Controls.hcmsControls.directive('empAssignmentInfo', EmpAssignmentInfo.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class ProfileInfo {
            constructor(translator, dbManager) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.restrict = 'AE';
                this.scope = {
                    profileId: "=",
                };
                this.template = `<div >
 
               <div class="table">
    <div class="row">
        <div class="col-sm-12"> 
            <h1>{{translateText('EmployeeInformation')}}</h1>
        </div>       
    </div>
    <div class="row">
        <div class="col-sm-2">
           <b>{{translateText('EmployeeNo')}}</b> 
        </div>
        <div class="col-sm-10">
            {{employeeInfo.ProfileCode}}
        </div>
    </div>
    <div class="row">
        <div class="col-sm-2">
           <b>{{translateText('EmployeeName')}}</b>
        </div>
        <div class="col-sm-10">
            {{employeeInfo.ProfileName}}
        </div>
    </div>
    <div class="row">
        <div class="col-sm-2">
          <b>{{translateText('EmployeeName_')}}</b> 
        </div>
        <div class="col-sm-10">
            {{employeeInfo.ProfileName_}}
        </div>
    </div>
</div>

            </div>`;
                this.link = (scope, element, attrs) => {
                    //scope.currentLanguage = loginInfo.getCurrentLanguage();
                    var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                    scope.employeeInfo = {};
                    scope.$watch('profileId', function (value) {
                        if (value != null) {
                            getEmpData(value);
                        }
                    });
                    scope.translateText = (text) => {
                        return this.translator.Translate(text);
                    };
                    var getEmpData = (profileId) => {
                        var queryString = '?profileId=' + profileId + '&userId=' + currentInfo.User.UserId + '&langId=' + currentInfo.Language.LangId;
                        this.dbManager.Get("Profile", 'GetProfileInfo', queryString, function (response) {
                            scope.employeeInfo = response.data;
                        }, function () {
                            scope.employeeInfo = null;
                        });
                    };
                };
            }
            static Factory() {
                var directive = (translator, dbManager) => new ProfileInfo(translator, dbManager);
                directive.$inject = ["translateService", "dataManagerService"];
                return directive;
            }
        }
        Controls.ProfileInfo = ProfileInfo;
        Controls.hcmsControls.directive('profileInfo', ProfileInfo.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class ProfileList {
            constructor(translator, dbManager, $timeOut) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.$timeOut = $timeOut;
                this.restrict = 'AE';
                this.scope = {
                    options: '='
                };
                this.template = function () {
                    return `
<smart-grid id="grd" name="grid.name" data="profileList" options="options" column-defs="grid.columns" style="height:500px;"></smart-grid>
`;
                };
                this.link = (scope, element, attrs) => {
                    var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                    scope.grid = { name: 'listGrid' };
                    scope.options.SelectButton = true;
                    scope.options.EditButton = false;
                    scope.options.DeleteButton = false;
                    scope.options.enableQuickFilter = true;
                    scope.options.enableRtl = currentInfo.Language.LangDirection === "rtl" ? true : false;
                    //scope.currentLanguage = loginInfo.getCurrentLanguage();
                    scope.translateText = (text) => {
                        return this.translator.Translate(text);
                    };
                    scope.selectText = ""; // scope.translateText('Select');
                    //scope.columns = null;
                    scope.grid.columns = [
                        { headerName: scope.selectText, width: 50, cellRenderer: selectCell, suppressMenu: true, suppressSorting: true, suppressSizeToFit: true },
                        { field: 'ProfileCode', hide: false, controlTypeName: 'text', headerName: scope.translateText('ProfileCode') },
                        { field: 'ProfileName', hide: false, controlTypeName: 'text', headerName: scope.translateText('ProfileName') },
                        { field: 'ProfileName_', hide: false, controlTypeName: 'text', headerName: scope.translateText('ProfileName_') }
                    ];
                    function selectCell(params) {
                        var selectCallback = params.api.gridCore.gridOptions.selectCallback;
                        if (selectCallback) {
                            var elem = document.createElement("span");
                            elem.innerHTML = '<a class="btn btn-xs btn-primary"><span class="fa fa-hand-pointer-o center-block"></span></a>';
                            elem.addEventListener("click", function () { selectCallback(params.data); });
                            return elem;
                        }
                    }
                    var getEmpDataList = () => {
                        var queryString = '?userId=' + currentInfo.User.UserId + '&langId=' + currentInfo.Language.LangId;
                        this.dbManager.Get("Profile", 'GetProfileList', queryString, function (response) {
                            scope.profileList = response.data;
                        }, function () {
                            scope.profileList = null;
                        });
                    };
                    getEmpDataList();
                };
            }
            static Factory() {
                var directive = (translator, dbManager, $timeout) => new ProfileList(translator, dbManager, $timeout);
                directive.$inject = ["translateService", "dataManagerService", "$timeout"];
                return directive;
            }
        }
        Controls.ProfileList = ProfileList;
        Controls.hcmsControls.directive('profileList', ProfileList.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class SmartGrid {
            //class = "ag-fresh"  class="ag-bootstrap"
            constructor() {
                this.restrict = 'E';
                this.scope = {
                    options: "=",
                    data: "=",
                    columnDefs: "=?",
                    hideCommonSearch: "=?"
                };
                this.template = `
<div>
    <div>
        <input placeholder="Filter..." type="text" ng-model="searchFilter" ng-change="onFilterChanged(searchFilter)" />
        <!--<button style="margin-left: 20px;" onclick="onPrintQuickFilterTexts(this.value)">Print Quick Filter Texts</button>-->
    </div>
    <div ag-grid="options" style="height: 400px;" class="ag-theme-fresh"></div>
</div>
`;
                this.compile = (element, attrs) => {
                    return {
                        pre: (scope, element, attrs) => {
                            if (scope.options == null) {
                                scope.options = {};
                                scope.options.rowData = [];
                                scope.options.columnDefs = [];
                            }
                            scope.options.enableFilter = true;
                            scope.options.enableSorting = true;
                            scope.options.showToolPanel = false;
                            //scope.options.suppressEnterprise = true;
                            // scope.options.rowGroupPanelShow='always', // on of ['always','onlyWhenGrouping']
                            //scope.options.rowGroupPanelShow = 'onlyWhenGrouping'; // on of ['always','onlyWhenGrouping']
                            //scope.options.pivotPanelShow = "onlyWhenPivoting";
                            scope.options.enableColResize = true;
                            scope.options.angularCompileRows = true;
                            scope.options.angularCompileHeaders = true;
                            //scope.options.paginationPageSize = 10;
                            //scope.options.pagination = true;
                            //scope.options.paginationAutoPageSize = true;
                            scope.options.enableRtl = HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false;
                            //scope.options.onGridReady = function (params) {
                            //    scope.api = params.api;
                            //    //scope.options.api.setRowData(scope.data);
                            //    //scope.options.api.setColumnDefs(scope.columnDefs);
                            //}
                            scope.options.components = {
                                datePicker: Controls.getDatePicker(),
                                timePicker: Controls.getTimePicker()
                            };
                            scope.$watch(function () {
                                return HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangId;
                            }, function (newVal, oldVal) {
                                if (newVal.LangId !== oldVal.LangId) {
                                    if (newVal.LangId == 2) {
                                        scope.options.enableRtl = true;
                                    }
                                    else {
                                        scope.options.enableRtl = false;
                                    }
                                    scope.options.api.refreshInMemoryRowModel();
                                    scope.options.api.refreshView();
                                    scope.options.api.refreshHeader();
                                }
                            }, true);
                            scope.options.onModelUpdated = function () {
                                if (scope.options.rowData != null) {
                                    var model = scope.options.api.getModel();
                                    var totalRows = scope.options.rowData.length;
                                    var processedRows = model.getRowCount();
                                    scope.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
                                }
                            };
                            if (scope.options.columnDefs == null) {
                                scope.options.columnDefs = [];
                            }
                            scope.columns = filterColumns(scope.options.columnDefs);
                            scope.itemsByPage = 10;
                            scope.$watchCollection('data', function (value) {
                                if (value != null) {
                                    if (scope.options.api) {
                                        setTimeout(() => {
                                            scope.options.api.setRowData(value);
                                            // scope.options.api.sizeColumnsToFit();
                                        }, 0);
                                    }
                                }
                            });
                            scope.$watchCollection('columnDefs', function (value) {
                                if (value != null) {
                                    scope.columns = filterColumns(value);
                                    if (scope.options.api) {
                                        setTimeout(() => {
                                            scope.options.api.setColumnDefs(value);
                                            //autoSizeAll();
                                            //scope.options.api.sizeColumnsToFit();
                                        }, 0);
                                    }
                                }
                            });
                            function autoSizeAll() {
                                var allColumnIds = [];
                                scope.options.columnApi.getAllColumns().forEach(function (column) {
                                    allColumnIds.push(column.colId);
                                });
                                scope.options.columnApi.autoSizeColumns(allColumnIds);
                            }
                            function filterColumns(allColumns) {
                                return allColumns.filter(function (column) {
                                    return !column.hide;
                                });
                            }
                            function onFilterChanged(value) {
                                scope.options.api.setQuickFilter(value);
                            }
                            function onPrintQuickFilterTexts() {
                                scope.options.api.forEachNode(function (rowNode, index) {
                                    console.log('Row ' + index + ' quick filter text is ' + rowNode.quickFilterAggregateText);
                                });
                            }
                            scope.onFilterChanged = onFilterChanged;
                            scope.onPrintQuickFilterTexts = onPrintQuickFilterTexts;
                        },
                        post: (scope, element, attrs) => {
                        }
                    };
                };
                this.link = (scope, element, attrs) => {
                };
            }
            static Factory() {
                var directive = () => new SmartGrid();
                return directive;
            }
        }
        Controls.SmartGrid = SmartGrid;
        Controls.hcmsControls.directive('smartGrid', SmartGrid.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        //export class Datepicker {
        //    public eInput: any;
        //    // gets called once before the renderer is used
        //    public init = (params) => {
        //        // create the cell
        //        this.eInput = document.createElement('input');
        //        this.eInput.value = params.value;
        //        // https://jqueryui.com/datepicker/
        //        $(this.eInput).datepicker({
        //            dateFormat: 'dd/mm/yy'
        //        });
        //    };
        //    // gets called once when grid ready to insert the element
        //    public getGui = () => {
        //        return this.eInput;
        //    };
        //    // focus and select can be done after the gui is attached
        //    public afterGuiAttached = () => {
        //        this.eInput.focus();
        //        this.eInput.select();
        //    };
        //    // returns the new value after editing
        //    public getValue = () => {
        //        return this.eInput.value;
        //    };
        //    // any cleanup we need to be done here
        //    public destroy = () => {
        //        // but this example is simple, no cleanup, we could
        //        // even leave this method out as it's optional
        //    };
        //    // if true, then this editor will appear in a popup
        //    public isPopup = () => {
        //        // and we could leave this method out also, false is the default
        //        return false;
        //    };
        //}
        //export class Timepicker {
        //    public eInput: any;
        //    // gets called once before the renderer is used
        //    public init = (params) => {
        //        // create the cell
        //        this.eInput = document.createElement('input');
        //        this.eInput.value = params.value;
        //        // https://jqueryui.com/datepicker/
        //        $(this.eInput).timepicker({
        //            timeFormat: 'HH:mm:ss'
        //        });
        //    };
        //    // gets called once when grid ready to insert the element
        //    public getGui = () => {
        //        return this.eInput;
        //    };
        //    // focus and select can be done after the gui is attached
        //    public afterGuiAttached = () => {
        //        this.eInput.focus();
        //        this.eInput.select();
        //    };
        //    // returns the new value after editing
        //    public getValue = () => {
        //        return this.eInput.value;
        //    };
        //    // any cleanup we need to be done here
        //    public destroy = () => {
        //        // but this example is simple, no cleanup, we could
        //        // even leave this method out as it's optional
        //    };
        //    // if true, then this editor will appear in a popup
        //    public isPopup = () => {
        //        // and we could leave this method out also, false is the default
        //        return false;
        //    };
        //}
        function getDatePicker() {
            function Datepicker() { }
            Datepicker.prototype.init = function (params) {
                this.eInput = document.createElement("input");
                this.eInput.value = params.value;
                $(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
            };
            Datepicker.prototype.getGui = function () {
                return this.eInput;
            };
            Datepicker.prototype.afterGuiAttached = function () {
                this.eInput.focus();
                this.eInput.select();
            };
            Datepicker.prototype.getValue = function () {
                return this.eInput.value;
            };
            Datepicker.prototype.destroy = function () { };
            Datepicker.prototype.isPopup = function () {
                return false;
            };
            return Datepicker;
        }
        Controls.getDatePicker = getDatePicker;
        function getTimePicker() {
            function Timepicker() { }
            Timepicker.prototype.init = (params) => {
                this.eInput = document.createElement("input");
                this.eInput.value = params.value;
                $(this.eInput).timepicker({
                    minuteStep: 1,
                    //template: 'modal',
                    //appendWidgetTo: 'body',
                    showSeconds: true,
                    showMeridian: false,
                    defaultTime: false
                });
            };
            Timepicker.prototype.getGui = () => {
                return this.eInput;
            };
            Timepicker.prototype.afterGuiAttached = () => {
                this.eInput.focus();
                this.eInput.select();
            };
            Timepicker.prototype.getValue = () => {
                return this.eInput.value;
            };
            Timepicker.prototype.destroy = () => { };
            Timepicker.prototype.isPopup = () => {
                return false;
            };
            return Timepicker;
        }
        Controls.getTimePicker = getTimePicker;
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
/// <reference path="module.ts" />
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        // item translator
        class TranslateDirective {
            constructor($rootScope, $compile, translateService) {
                this.restrict = 'A';
                this.scope = { 'hcmsTranslator': "=", "hcmsViewId": "=?" };
                this.priority = 0;
                this.link = (scope, element, $attrs) => {
                    var translationChangeOccurred = () => {
                        var originalText = scope.hcmsTranslator;
                        var viewId = scope.hcmsViewId;
                        if (viewId == null || viewId == undefined) {
                            var parentViewElement = element.closest("[hcms-view-id]");
                            viewId = parentViewElement.attr("hcms-view-id");
                        }
                        //var originalTooltip = attrs['tooltip'];
                        //let trans: any = this.filter('translate');
                        element.text(this.translateService.Translate(originalText, viewId));
                    };
                    translationChangeOccurred();
                    this.rootScope.$on('$translateChangeSuccess', translationChangeOccurred);
                };
                this.compiler = $compile;
                this.translateService = translateService;
                this.rootScope = $rootScope;
                // this.scope.hcmsTranslator = '=';
            }
            static Factory() {
                var directive = ($rootScope, $compile, translateService) => new TranslateDirective($rootScope, $compile, translateService);
                //directive's injection list
                directive.$inject = ["$rootScope", "$compile", "translateService"];
                return directive;
            }
        }
        Controls.TranslateDirective = TranslateDirective;
        Controls.hcmsControls.directive('hcmsTranslator', TranslateDirective.Factory());
        // form Translator
        class FormTranslateDirective {
            constructor($rootScope, $compile, translateService) {
                this.restrict = 'A';
                this.scope = { "hcmsViewId": "=?" };
                this.priority = 0;
                this.link = (scope, element, $attrs) => {
                    var translationChangeOccurred = () => {
                        var originalText = scope.hcmsTranslator;
                        var viewId = scope.hcmsViewId;
                        var translator = this.translateService;
                        $(element).find('label').each(function () {
                            this.innerHTML = translator.Translate(this.textContent, viewId);
                        });
                    };
                    translationChangeOccurred();
                    this.rootScope.$on('$translateChangeSuccess', translationChangeOccurred);
                };
                this.compiler = $compile;
                this.translateService = translateService;
                this.rootScope = $rootScope;
                // this.scope.hcmsTranslator = '=';
            }
            static Factory() {
                var directive = ($rootScope, $compile, translateService) => new FormTranslateDirective($rootScope, $compile, translateService);
                //directive's injection list
                directive.$inject = ["$rootScope", "$compile", "translateService"];
                return directive;
            }
        }
        Controls.FormTranslateDirective = FormTranslateDirective;
        Controls.hcmsControls.directive('hcmsFormTranslator', FormTranslateDirective.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
/// <reference path="commonform.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class BaseFormSetup extends Forms.CommonForm {
            constructor(translator, dbManager, userId, formId) {
                super(translator);
                this.dbManager = dbManager;
                this.formId = formId;
                this.LoadForm = (callback) => {
                    this.MyForm.Load(callback);
                };
                this.LoadSubForms = (callback) => {
                    this.MyForm.LoadSubForms(callback);
                };
                this.MyForm = new HCMS.Models.Form(translator, this.dbManager, userId, formId);
            }
        }
        Forms.BaseFormSetup = BaseFormSetup;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="commonform.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class BaseFormData extends Forms.CommonForm {
            constructor(translateService, dbManager, form) {
                super(translateService);
                this.dbManager = dbManager;
                this.dataItem = {};
                this.dataList = [];
                //private getIdFieldName(viewFields: Models.SystemFormViewField[]): string {
                //    //set primaryField to gridOptions Object to access in every row
                //    for (var prop in viewFields) {
                //        if (viewFields[prop].IsPrimary === true) {
                //            return viewFields[prop].FieldName;
                //        }
                //    }
                //    return '';
                //}
                //private getIdValue(viewFields: Models.SystemFormViewField[], rowData: any): any {
                //    return rowData[this.getIdFieldName(viewFields)];
                //}
                this.MessageConfirmation = (data, successMessge) => {
                    var systemResult = data.SystemMessage;
                    //if (!HCMS.Validations.CommonValidations.isNull(data) && HCMS.Validations.CommonValidations.isNull(systemResult)) {
                    //    this.smartAlert.Error(data);
                    //}else
                    var result = true;
                    if (!HCMS.Validations.CommonValidations.isNull(systemResult)
                        && data.IsErrorMessage == false) {
                        this.smartAlert.Alert(successMessge);
                        result = true;
                    }
                    else {
                        if (systemResult.IsPreventMessage == true) {
                            this.smartAlert.Error(systemResult.SystemMessage.MessageComment, systemResult.SystemMessage.MessageCode); // Error Alert
                            result = false;
                        }
                        else {
                            this.smartAlert.Warning(systemResult.SystemMessage.MessageComment, systemResult.SystemMessage.MessageCode); // Warning Alert
                            this.smartAlert.Alert(successMessge);
                            result = true;
                        }
                    }
                    return result;
                };
                this.UpdateData = (valid, id, callback) => {
                    if (valid == false)
                        return;
                    if (this.MyForm.FormId == 0) {
                        return;
                    }
                    //var id = currentObject.getIdValue(viewFields, currentObject.dataItem);
                    var queryString = this.getCommonParams() + '&id=' + id;
                    this.dbManager.Put(this.MyForm.FormController, 'PutData', queryString, this.dataItem, (result) => {
                        //vm.dataItem = {};
                        //currentObject.dataItem = {};
                        var isValid = this.MessageConfirmation(result.data, "Saved Successfully");
                        if (isValid) {
                            if (angular.isDefined(callback) && callback != null) {
                                callback(result.data);
                            }
                        }
                    }, (result) => {
                        throw result;
                    });
                };
                //add New Data
                this.AddData = (valid, callback) => {
                    if (valid == false)
                        return;
                    if (this.MyForm.FormId == 0) {
                        return;
                    }
                    var queryString = this.getCommonParams();
                    this.dbManager.Post(this.MyForm.FormController, 'PostData', queryString, (this.dataItem), (result) => {
                        //currentObject.dataItem = {};
                        var isValid = this.MessageConfirmation(result.data, "Saved Successfully");
                        if (isValid) {
                            if (angular.isDefined(callback) && callback != null) {
                                callback(result.data);
                            }
                        }
                    }, (result) => {
                        throw result;
                    });
                };
                this.DeleteData = (id, item, callback) => {
                    this.smartAlert.Confirm("Are you sure you want to delete", "", () => {
                        var queryString = this.getCommonParams() + '&id=' + id;
                        this.dbManager.Delete(this.MyForm.FormController, 'DeleteData', queryString, (result) => {
                            this.dataList.splice(this.dataList.indexOf(item), 1);
                            var isValid = this.MessageConfirmation(result.data, "Record has been deleted successfully");
                            if (isValid) {
                                if (angular.isDefined(callback) && callback != null) {
                                    callback(result.data);
                                }
                            }
                        }, (result) => {
                            throw result;
                        });
                    });
                };
                this.smartAlert = new HCMS.Controls.SmartAlert();
                this.MyForm = form;
            }
            getCommonParams() {
                return '?formId=' + this.MyForm.FormId + '&userId=' + HCMS.DataAccess.StartUp.CurrentLoginInfo.User.UserId + '&langId=' + HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangId;
            }
            ;
            GetDataItem(id, callback) {
                var currentObject = this;
                var queryString = currentObject.getCommonParams() + '&id=' + id;
                this.dbManager.Get(currentObject.MyForm.FormController, 'GetDetails', queryString, (response) => {
                    currentObject.dataItem = response.data; // vm.formatItemData(response.data);
                    if (!HCMS.DataAccess.Utility.IsNull(callback)) {
                        callback(response.data);
                    }
                }, null);
            }
            ;
            GetDataList(callback) {
                var currentObject = this;
                if (currentObject.MyForm.FormId == 0) {
                    return;
                }
                var queryString = currentObject.getCommonParams();
                this.dbManager.Get(currentObject.MyForm.FormController, 'GetAll', queryString, (response) => {
                    currentObject.dataList = response.data; // vm.formatItemData(response.data);
                    if (!HCMS.DataAccess.Utility.IsNull(callback)) {
                        callback(response.data);
                    }
                }, null);
            }
            ;
        }
        Forms.BaseFormData = BaseFormData;
        //hcmsForms.controller('baseFormController', BaseFormSetup);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class BaseGrid {
        }
        Forms.BaseGrid = BaseGrid;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class Grid {
            constructor() {
                this.name = "listGrid";
                this.gridOptions = {};
                this.gridColumnDefs = [];
                //vm.grid = { name: 'listGrid', gridOptions: { enableRtl: appService.getDirection() === 'rtl' ? true : false }, gridColumnDefs: [] };
            }
        }
        Forms.Grid = Grid;
        class BaseGridSetup {
            constructor(translator, dbManager) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.onColumnOptionsLoaded = new Forms.EventData();
                this.onGridOptionsLoaded = new Forms.EventData();
                this.LoadColumnOptions = (view, callBack) => {
                    if (view.ViewId == 0)
                        return;
                    this.MyView = view;
                    var currentObject = this;
                    currentObject.defaultColumnOptions = [];
                    this.dbManager.Get('GeneralFormSetup', 'GetGridDefaultColumnsOptions', "", function (result) {
                        for (var i = 0; i < result.data.length; ++i) {
                            if (result.data[i] !== undefined) {
                                var option = new HCMS.Models.GridColumnOption();
                                HCMS.DataAccess.Utility.CopyObject(option, result.data[i]);
                                currentObject.defaultColumnOptions.push(option);
                            }
                        }
                        currentObject.LoadViewColumnOptions(callBack);
                    });
                };
                this.SetColumnDefinitions = () => {
                    //this.MyGrid.gridColumnDefs = [];
                    var defaultColumnDefs = this.getDefaultColumnDefs();
                    //add select Button
                    this.addSelectButton(this.MyGrid.gridColumnDefs);
                    //add edit Button
                    this.addEditButton(this.MyGrid.gridColumnDefs);
                    //add delete Button
                    this.addDeleteButton(this.MyGrid.gridColumnDefs);
                    if (this.MyView.ViewFields != null && this.MyView.ViewFields.length > 0) {
                        for (var item of this.MyView.ViewFields) {
                            var columnObj = jQuery.extend(true, {}, defaultColumnDefs);
                            if (!HCMS.DataAccess.Utility.IsNull(this.viewColumnOptions)) {
                                var gridColumnOptions = this.viewColumnOptions.filter(function (o) { return o.FieldId === item.ViewFieldId; });
                                for (var f = 0; f < gridColumnOptions.length; f++) {
                                    var optionResult = this.getRightValue(gridColumnOptions[f].ColumnOptionValue);
                                    columnObj[gridColumnOptions[f].ColumnOptionName] = optionResult;
                                }
                            }
                            columnObj.hide = item.IsHidden;
                            columnObj.controlTypeName = item.ControlTypeName;
                            //Set FieldName
                            columnObj.field = item.FieldName;
                            //set header Name
                            columnObj.headerName = (item.DefaultDisplayText == null) ? item.FieldName : item.DefaultDisplayText;
                            ;
                            //set Template
                            columnObj.template = this.getGridControlTemplate(columnObj);
                            columnObj.headerValueGetter = this.getHeaderName;
                            this.MyGrid.gridColumnDefs.push(columnObj);
                        }
                    }
                };
                //Select handler==   
                this.selectCell = (params) => {
                    //var selectCallback = params.api.gridCore.gridOptions.selectCallback;
                    var selectCallback = this.MyView.SelectCallback;
                    var elem = document.createElement("span");
                    //  elem.innerHTML = '<a href="#">{{"Select" | translate }}</a>';
                    elem.innerHTML = '<a class="btn btn-xs btn-primary"><span class="fa fa-hand-pointer-o center-block"></span></a>';
                    if (selectCallback) {
                        elem.addEventListener("click", function () { selectCallback(params.data); });
                    }
                    return elem;
                };
                //edit handler== 
                this.editCell = (params) => {
                    //var editCallback = params.api.gridCore.gridOptions.editCallback;
                    var editCallback = this.MyView.EditCallback;
                    var elem = document.createElement("span");
                    //elem.innerHTML = '<a href="#">{{"Edit" | translate }}</a>';
                    elem.innerHTML = '<a class="btn btn-xs btn-primary"><span class="fa fa-pencil center-block"></span></a>';
                    if (editCallback) {
                        elem.addEventListener("click", function () { editCallback(params.data); });
                    }
                    return elem;
                };
                //delete handler== 
                this.deleteCell = (params) => {
                    //var deleteCallback = params.api.gridCore.gridOptions.deleteCallback;
                    var deleteCallback = this.MyView.DeleteCallback;
                    var elem = document.createElement("span");
                    //elem.innerHTML = '<a href="#">{{"Delete" | translate }}</a>';
                    elem.innerHTML = '<a class="btn btn-xs btn-danger"><span class="fa fa-times center-block"></span></a>';
                    if (deleteCallback) {
                        elem.addEventListener("click", function () { deleteCallback(params.data); });
                    }
                    return elem;
                };
                //get column name used by ag-grid to render column header name
                this.getHeaderName = (params) => {
                    return this.translator.Translate(params.colDef.headerName);
                };
                this.getRightValue = function (value) {
                    var result = value;
                    switch (result) {
                        case "":
                            result = null;
                            break;
                        case "false":
                            result = false;
                            break;
                        case "true":
                            result = true;
                            break;
                        default:
                    }
                    return result;
                };
                this.getGridControlTemplate = function (gridColumn) {
                    var result = null;
                    switch (gridColumn.controlTypeName) {
                        case "":
                            result = null;
                            break;
                        case "check":
                        case "checkbox":
                            result = "<input type='checkbox' ng-model='data." + gridColumn.field + "' ng-disabled='" + !(gridColumn.editable) + "' />";
                            break;
                        case "datetime":
                        case "date":
                            result = "<p>{{data." + gridColumn.field + " | date:'dd/MM/yyyy'}}</p>";
                            break;
                        default:
                    }
                    return result;
                };
                this.MyGrid = new Grid();
                this.MyGrid.gridOptions["enableRtl"] = HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection === "rtl" ? true : false;
                //this.LoadGridOptions();
            }
            get OnColumnOptionsLoaded() { return this.onColumnOptionsLoaded.expose(); }
            get OnGridOptionsLoaded() { return this.onGridOptionsLoaded.expose(); }
            LoadGridOptions(view, callbak) {
                if (view.ViewId == 0)
                    return;
                this.MyView = view;
                var currentObject = this;
                this.dbManager.Get('GeneralFormSetup', 'GetGridOptions', "", (result) => {
                    for (var i = 0; i < result.data.length; ++i) {
                        if (result.data[i] !== undefined) {
                            var option = new HCMS.Models.GridOption();
                            HCMS.DataAccess.Utility.CopyObject(option, result.data[i]);
                            currentObject.MyGrid.gridOptions[option.GridOptionName] = option.GridOptionDefaultValue;
                        }
                    }
                    this.LoadViewGridOptions(callbak);
                });
            }
            LoadViewGridOptions(callBack) {
                var currentObject = this;
                //currentObject.MyGrid.gridOptions['viewFields'] = view.ViewFields;
                var queryString = "?viewId=" + currentObject.MyView.ViewId;
                this.dbManager.Get('GeneralFormSetup', 'GetViewGridOptions', queryString, (result) => {
                    for (var i = 0; i < result.data.length; ++i) {
                        if (result.data[i] !== undefined) {
                            var option = new HCMS.Models.GridOption();
                            HCMS.DataAccess.Utility.CopyObject(option, result.data[i]);
                            currentObject.MyGrid.gridOptions[option.GridOptionName] = option.GridOptionValue;
                        }
                    }
                    //onGridOptionsLoaded
                    var e = new Forms.EventArgs(currentObject.MyGrid.gridOptions);
                    this.onGridOptionsLoaded.trigger(e);
                });
            }
            LoadViewColumnOptions(callBack) {
                var currentObject = this;
                if (currentObject.MyView.ViewId == 0)
                    return;
                currentObject.viewColumnOptions = [];
                var queryString = '?viewId=' + currentObject.MyView.ViewId;
                this.dbManager.Get('GeneralFormSetup', 'GetGridViewColumnsOptions', queryString, (result) => {
                    for (var i = 0; i < result.data.length; ++i) {
                        if (result.data[i] !== undefined) {
                            var option = new HCMS.Models.GridColumnOption();
                            HCMS.DataAccess.Utility.CopyObject(option, result.data[i]);
                            currentObject.viewColumnOptions.push(option);
                        }
                    }
                    if (callBack != null) {
                        callBack();
                    }
                    //onColumnOptionsLoaded
                    var e = new Forms.EventArgs(currentObject.viewColumnOptions);
                    this.onColumnOptionsLoaded.trigger(e);
                });
            }
            //Add select button
            addSelectButton(resultColumns) {
                var currentObject = this;
                if (this.MyView.SelectButton) {
                    resultColumns.push({ headerName: "", headerValueGetter: currentObject.getHeaderName, width: 50, cellRenderer: currentObject.selectCell, suppressMenu: true, suppressSorting: true, suppressSizeToFit: true });
                }
            }
            //Add edit button
            addEditButton(resultColumns) {
                var currentObject = this;
                if (this.MyView.EditButton) {
                    resultColumns.push({ headerName: "", headerValueGetter: currentObject.getHeaderName, width: 50, cellRenderer: currentObject.editCell, suppressMenu: true, suppressSorting: true, suppressSizeToFit: true });
                }
            }
            //Add delete button
            addDeleteButton(resultColumns) {
                var currentObject = this;
                if (this.MyView.DeleteButton) {
                    resultColumns.push({ headerName: "", headerValueGetter: currentObject.getHeaderName, width: 50, cellRenderer: currentObject.deleteCell, suppressMenu: true, suppressSorting: true, suppressSizeToFit: true });
                }
            }
            getDefaultColumnDefs() {
                var columnsDefs = {};
                for (var item of this.defaultColumnOptions) {
                    columnsDefs[item.ColumnOptionName] = item.ColumnOptionValue;
                }
                return columnsDefs;
            }
        }
        Forms.BaseGridSetup = BaseGridSetup;
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../module.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class FormNavTabs {
            constructor(translateService, dbManager) {
                this.restrict = 'E';
                this.scope = { 'formId': "=", 'parentIdFieldName': "=?", 'parentItem': "=?", 'hcOptions': "=?" };
                this.priority = 0;
                this.templateUrl = "app_hebs/forms/baseDirectives/views/formNavTabsDirective.html";
                this.link = (scope, element, $attrs) => {
                    //var translateText: (text: string, viewId?: any) => any;
                    var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                    //if (currentInfo == null) {
                    //    currentInfo = new DataAccess.CurrentLoginInfo(this.dbManager);
                    //    var currentUser = angular.fromJson(sessionStorage['user']);
                    //    currentInfo.SetLoginInfo({ UserId: currentUser.userId, LangId: currentUser.langId, DatabaseProfileId: currentUser.databaseProfileId, CompanyId: currentUser.companyId });
                    //    DataAccess.StartUp.SetCurrentLoginInfo(currentInfo);
                    //}
                    if (HCMS.Validations.CommonValidations.isNull(scope.hcOptions)) {
                        scope.hcOptions = {};
                    }
                    scope.hcOptions.api = { activateFirstTab: activateFirstTab };
                    scope.FormSetup = new Forms.BaseFormSetup(this.translateService, this.dbManager, currentInfo.User.UserId, scope.formId);
                    scope.FormSetup.LoadSubForms();
                    function activateFirstTab() {
                        scope.activeFormIndex = 0;
                        //if (!HCMS.Validations.CommonValidations.isNull(scope.formId))
                        //    $('.nav-tabs a[href="#subNavFormTab-r' + scope.formId + '-0"]').tab('show');
                    }
                    ;
                    scope.translateText = (text, viewId) => {
                        return this.translateService.Translate(text, viewId);
                    };
                };
                this.translateService = translateService;
                this.dbManager = dbManager;
            }
            static Factory() {
                var directive = (translateService, dbManager) => new FormNavTabs(translateService, dbManager);
                //directive's injection list
                directive.$inject = ["translateService", "dataManagerService"];
                return directive;
            }
        }
        Forms.FormNavTabs = FormNavTabs;
        Forms.hcmsForms.directive('formNavTabs', FormNavTabs.Factory());
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../module.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class FormStackTabs {
            constructor(translateService, dbManager) {
                this.restrict = 'E';
                this.scope = { 'formId': "=", 'parentIdFieldName': "=?", 'parentItem': "=?", 'hcOptions': "=?" };
                this.priority = 0;
                this.templateUrl = "app_hebs/forms/baseDirectives/views/formStackTabsDirective.html";
                this.link = (scope, element, $attrs) => {
                    //var translateText: (text: string, viewId?: any) => any;
                    var currentInfo = HCMS.DataAccess.StartUp.CurrentLoginInfo;
                    //if (currentInfo == null) {
                    //    currentInfo = new DataAccess.CurrentLoginInfo(this.dbManager);
                    //    var currentUser = angular.fromJson(sessionStorage['user']);
                    //    currentInfo.SetLoginInfo({ UserId: currentUser.userId, LangId: currentUser.langId, DatabaseProfileId: currentUser.databaseProfileId, CompanyId: currentUser.companyId });
                    //    DataAccess.StartUp.SetCurrentLoginInfo(currentInfo);
                    //}
                    if (HCMS.Validations.CommonValidations.isNull(scope.hcOptions)) {
                        scope.hcOptions = {};
                    }
                    scope.hcOptions.api = { activateFirstTab: activateFirstTab };
                    scope.FormSetup = new Forms.BaseFormSetup(this.translateService, this.dbManager, currentInfo.User.UserId, scope.formId);
                    scope.FormSetup.LoadSubForms();
                    function activateFirstTab() {
                        scope.activeFormIndex = 0;
                        //if (!HCMS.Validations.CommonValidations.isNull(scope.formId))
                        //    $('.nav-tabs a[href="#subFormTab-r' + scope.formId + '-0"]').tab('show');
                    }
                    ;
                    scope.translateText = (text, viewId) => {
                        return this.translateService.Translate(text, viewId);
                    };
                };
                this.translateService = translateService;
                this.dbManager = dbManager;
            }
            static Factory() {
                var directive = (translateService, dbManager) => new FormStackTabs(translateService, dbManager);
                //directive's injection list
                directive.$inject = ["translateService", "dataManagerService"];
                return directive;
            }
        }
        Forms.FormStackTabs = FormStackTabs;
        Forms.hcmsForms.directive('formStackTabs', FormStackTabs.Factory());
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../forms/baseforms/baseform/baseformmanager.ts" />
var HCMS;
(function (HCMS) {
    var Forms;
    (function (Forms) {
        class AllProfiles extends Forms.BaseFormManager {
            constructor(translateService, dbManager, scope, timeout, $stateParams) {
                //inherit BaseFormManager
                super(translateService, dbManager, scope.tab.MenuItem.FormId);
                this.scope = scope;
                this.timeout = timeout;
                this.$onInit = () => { };
                // static $inject = ['translateService', 'dataManagerService','$scope', '$stateParams'];
                //private formId: number;
                //private apiController: string;
                //public selectedProfile: SelectedProfile;
                this.selectedHeaderView = new HCMS.Models.EditView();
                this.navTabOptions = {};
                this.activeTabIndex = 0;
                this.selectClicked = (item) => {
                    //var currentObject = this;
                    this.selectedHeaderView = this.FormSetup.MyForm.EditView;
                    var id = this.GetIdValue(item, this.selectedHeaderView);
                    this.FormData.GetDataItem(id, (data) => {
                        this.dataItem = data;
                        this.dbManager.Get(this.FormSetup.MyForm.FormController, "GetDefaultAssignmentByProfileId", `?formId=${this.formId}&profileID=${this.dataItem.ProfileId}`, (result) => {
                            this.dataItem.EmpAssignmentId = (result.data != null ? result.data.EmpAssignmentId : 0);
                            this.DisplayEditView();
                            this.activeTabIndex = 1;
                            // this.activateTab('selectedProfile');
                            this.navTabOptions.api.activateFirstTab();
                            //currentObject.DisplayIndexView();
                        });
                    });
                };
                this.getFullName = () => {
                    HCMS.Validations.CommonValidations.isNull("");
                    this.dataItem.ProfileName_ = HCMS.Validations.CommonValidations.isNullReplace(this.dataItem.ProfileFirstName_, '') + ' ' + HCMS.Validations.CommonValidations.isNullReplace(this.dataItem.ProfileSecondName_, '') + ' ' + HCMS.Validations.CommonValidations.isNullReplace(this.dataItem.ProfileThirdName_, '') + ' ' + HCMS.Validations.CommonValidations.isNullReplace(this.dataItem.ProfileFourthName_, '');
                    this.dataItem.ProfileName = HCMS.Validations.CommonValidations.isNullReplace(this.dataItem.ProfileFirstName, '') + ' ' + HCMS.Validations.CommonValidations.isNullReplace(this.dataItem.ProfileSecondName, '') + ' ' + HCMS.Validations.CommonValidations.isNullReplace(this.dataItem.ProfileThirdName, '') + ' ' + HCMS.Validations.CommonValidations.isNullReplace(this.dataItem.ProfileFourthName, '');
                    //this.dataItem.ProfileName = this.dataItem.ProfileFirstName + ' ' + this.dataItem.ProfileSecondName + ' ' + this.dataItem.ProfileThirdName + ' ' + this.dataItem.ProfileFourthName;
                    if (HCMS.DataAccess.StartUp.CurrentLoginInfo.Language.LangDirection == "rtl") {
                        return this.dataItem.ProfileName_;
                    }
                    else {
                        return this.dataItem.ProfileName;
                    }
                };
                //this.selectedProfile = selectedProfileService;
                //this.selectedHeaderView.ViewId = 0;
                this.selectedHeaderView = this.FormSetup.MyForm.EditView;
                // this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                //this.loadData();
                this.FormSetup.LoadForm((form) => {
                    this.FormSetup.MyForm.IndexView.SelectCallback = this.selectClicked;
                    this.selectedViewSetup = this.FormSetup.MyForm.IndexView;
                    this.FormSetup.MyForm.IndexView.Load();
                    this.FormSetup.MyForm.EditView.Load();
                    this.FormData = new Forms.BaseFormData(translateService, dbManager, form);
                    this.dataItem = this.FormData.dataItem;
                    this.FormData.GetDataList(() => {
                        this.dataList = this.FormData.dataList;
                    });
                    this.OnAdding.addHandler(() => {
                        // set profileTypeId=1 means Employee
                        this.dataItem.ProfileTypeId = 1;
                    });
                    this.OnUpdating.addHandler(() => {
                        // set profileTypeId=1 means Employee
                        this.dataItem.ProfileTypeId = 1;
                    });
                    this.OnAdded.addHandler((result) => {
                        this.timeout(() => {
                            this.dataItem.ProfileId = result.data.Result[0];
                        });
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            this.DisplayEditView();
                            this.navTabOptions.api.activateFirstTab();
                        });
                    });
                    this.OnUpdated.addHandler((result) => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                            //this.DisplayIndexView();
                        });
                    });
                    this.OnDeleted.addHandler(() => {
                        this.FormData.GetDataList((data) => {
                            this.dataList = data;
                        });
                    });
                });
            }
            addNewClicked() {
                //var currentObject = this;
                //$scope.active = 1; //set the index of the profile tab
                this.FormData.GetDataItem("0", (data) => {
                    this.dataItem = data;
                    this.DisplayAddView();
                    this.activeTabIndex = 1;
                    // this.activateTab('selectedProfile');
                });
            }
        }
        Forms.AllProfiles = AllProfiles;
        // hcmsForms.controller('allProfilesNewController', AllProfiles);
        Forms.hcmsForms.controller('allProfilesNewController', ['translateService', 'dataManagerService', '$scope', '$timeout', '$stateParams', function (translateService, dataManagerService, $scope, $timeout, $stateParams) {
                return new AllProfiles(translateService, dataManagerService, $scope, $timeout, $stateParams);
            }]);
    })(Forms = HCMS.Forms || (HCMS.Forms = {}));
})(HCMS || (HCMS = {}));
//module HCMS.Forms {
//    export class SelectedProfile {
//        private _currentProfile: any = null;
//        //constructor(profile?: any) {
//        //    this._currentProfile = profile;
//        //}
//        public SetCurrentProfile(profile: any) {
//            this._currentProfile = profile;
//        }
//        public get CurrentProfile(): any {
//            return this._currentProfile;
//        }
//    }
//    hcmsForms.service("selectedProfileService", SelectedProfile);
//} 
var HCMS;
(function (HCMS) {
    var Models;
    (function (Models) {
        class GridColumnOption {
            constructor() {
                this.ViewId = 0;
                this.FieldId = 0;
                this.ColumnOptionId = 0;
                this.ColumnOptionName = "";
                this.ColumnOptionValue = "";
            }
        }
        Models.GridColumnOption = GridColumnOption;
    })(Models = HCMS.Models || (HCMS.Models = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Models;
    (function (Models) {
        class GridOption {
            constructor() {
                this.ViewId = 0;
                this.GridOptionId = 0;
                this.GridOptionName = "";
                this.GridOptionValue = "";
                this.GridOptionDefaultValue = "";
            }
        }
        Models.GridOption = GridOption;
    })(Models = HCMS.Models || (HCMS.Models = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Models;
    (function (Models) {
        class SystemFormViewField {
            constructor() {
                this.ViewFieldId = 0;
                this.ViewId = 0;
                this.FieldName = "";
                this.DataTypeName = "";
                this.ControlTypeName = "";
                this.IsPrimary = false;
                this.NumberMinValue = 0;
                this.NumberMaxValue = 0;
                this.MinLength = 0;
                this.MaxLength = 0;
                this.Pattern = "";
                this.Placeholder = "";
                this.DateMinValue = null;
                this.DateMaxValue = null;
                this.DefaultValue = "";
                this.IsRequired = false;
                this.FieldOrder = 0;
                this.IsHidden = false;
                this.DefaultDisplayText = "";
                this.IsReadOnly = false;
                this.IsIdentity = false;
                this.SelectQuery = "";
                this.SelectApiUrl = "";
                this.SelectDisplayName = "";
                this.SelectDisplayName_ = "";
                this.SelectDisplayValue = "";
                this.SelectSearchFields = "";
                this.SelectHtmlData = "";
                this.TableSelect = "";
                this.TableFrom = "";
                this.TableWhere = "";
                this.TableGroupBy = "";
                this.TableOrderBy = "";
                this.DropDownId = 0;
                this.FilterField = "";
                this.FilterExpression = "";
            }
        }
        Models.SystemFormViewField = SystemFormViewField;
    })(Models = HCMS.Models || (HCMS.Models = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Models;
    (function (Models) {
        class Form {
            constructor(translator, dbManager, userId, formId) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.userId = userId;
                this.FormId = 0;
                this.ParentFormId = 0;
                this.FormOrder = 0;
                this.FormName = "";
                this.FormName_ = "";
                this.FormController = "";
                this.JsController = "";
                this.JsControllerAs = "";
                this.StartView = "";
                this.CodeSetupId = 0;
                this.HideViewAfterSave = false;
                this.DontAutoCodeWhenSave = false;
                this.Disabled = false;
                this.StartDate = undefined;
                this.EndDate = undefined;
                this.IndexView = undefined;
                this.CreateView = undefined;
                this.EditView = undefined;
                this.DetailsView = undefined;
                this.SubForms = [];
                this.FormId = formId;
                this.IndexView = new Models.IndexView(this.translator, dbManager, userId, formId);
                this.CreateView = new Models.CreateView(this.translator, dbManager, userId, formId);
                this.EditView = new Models.EditView(this.translator, dbManager, userId, formId);
                this.DetailsView = new Models.DetailsView(this.translator, dbManager, userId, formId);
            }
            //public LoadA() {
            //    var currentForm = this;
            //    var queryString = '?formId=' + this.FormId + '&userId=' + this.userId;
            //    return new Promise<Form>((resolve, reject) => {
            //        this.dbManager.Get('GeneralFormSetup', 'GetFormSetup', queryString, function (result) {
            //            angular.forEach(result.data, (value, key) => {
            //                if (currentForm.hasOwnProperty(key)) {
            //                    currentForm[key] = result.data[key];
            //                }
            //            });
            //            resolve(currentForm);
            //        }, function (err) {
            //            reject(err);
            //        });
            //    });
            //}
            Load(callback) {
                var currentForm = this;
                if (currentForm.FormId == 0) {
                    return;
                }
                var queryString = '?formId=' + currentForm.FormId + '&userId=' + currentForm.userId;
                this.dbManager.Get('GeneralFormSetup', 'GetFormSetup', queryString, function (result) {
                    angular.forEach(result.data, (value, key) => {
                        if (currentForm.hasOwnProperty(key)) {
                            currentForm[key] = result.data[key];
                        }
                    });
                    //currentForm.LoadSubForms(callback);
                    //currentForm.CopyFrom(result.data);
                    if (callback != null) {
                        callback(currentForm);
                    }
                });
            }
            LoadSubForms(callback) {
                var currentForm = this;
                if (HCMS.Validations.CommonValidations.isNull(currentForm.FormId) || currentForm.FormId == 0) {
                    return;
                }
                var queryString = '?formId=' + currentForm.FormId + '&userId=' + currentForm.userId;
                this.dbManager.Get('GeneralFormSetup', 'GetSubForms', queryString, function (result) {
                    let forms = result.data;
                    // iterate forms
                    for (let entry of forms) {
                        let form = new Form(currentForm.translator, currentForm.dbManager, currentForm.userId, currentForm.FormId);
                        //iterate form properties
                        angular.forEach(entry, (value, key) => {
                            if (form.hasOwnProperty(key)) {
                                form[key] = entry[key];
                            }
                        });
                        currentForm.SubForms.push(form);
                    }
                });
                if (callback != null) {
                    callback(currentForm);
                }
            }
        }
        Models.Form = Form;
    })(Models = HCMS.Models || (HCMS.Models = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Models;
    (function (Models) {
        class SystemFormView {
            constructor(translator, dbManager, userId, formId, viewTypeId) {
                this.translator = translator;
                this.dbManager = dbManager;
                this.userId = userId;
                this.ViewId = 0;
                this.FormId = 0;
                this.ViewTypeId = Models.ViewType.Index;
                this.SelectButton = false;
                this.CreateButton = false;
                this.EditButton = false;
                this.SaveButton = false;
                this.DeleteButton = false;
                this.CancelButton = false;
                this.TableName = "";
                this.TableCodeField = "";
                this.SelectQuery = "";
                this.FromQuery = "";
                this.WhereQuery = "";
                this.OrderByQuery = "";
                this.GroupByQuery = "";
                this.StartDate = null;
                this.EndDate = null;
                this.Disabled = false;
                this.EditLink = "";
                this.DeleteLink = "";
                this.CreateLink = "";
                this._viewFields = [];
                this.ViewFieldsObject = {};
                this.addViewField = (viewField) => {
                    this._viewFields.push(viewField);
                    this.ViewFieldsObject[viewField.FieldName] = viewField;
                };
                this.ConvertFieldsAsObjects = (viewFields) => {
                    if (viewFields == null)
                        return null;
                    var result = {};
                    var arr = viewFields;
                    for (var i = 0; i < arr.length; ++i) {
                        var obj = arr[i];
                        //for (var prop in arr[i]) {
                        //    obj[prop] = arr[i][prop];
                        //}
                        result[arr[i].FieldName] = obj;
                    }
                    return result;
                };
                this.Load = () => __awaiter(this, void 0, void 0, function* () {
                    if (this.FormId == 0) {
                        return;
                    }
                    var queryString = '?formId=' + this.FormId + '&viewTypeId=' + this.ViewTypeId + '&userId=' + this.userId;
                    let result = yield this.dbManager.GetPromise('GeneralFormSetup', 'GetViewSetup', queryString);
                    HCMS.DataAccess.Utility.CopyObject(this, result.data);
                    yield this.loadFields(this.ViewId);
                });
                this.loadFields = (viewId) => __awaiter(this, void 0, void 0, function* () {
                    if (viewId == 0)
                        return;
                    // let fields: SystemFormViewField[]=[];
                    var queryString = '?viewId=' + viewId + '&userId=' + this.userId;
                    let result = yield this.dbManager.GetPromise('GeneralFormSetup', 'GetViewFields', queryString);
                    if (result.data != null) {
                        for (var i = 0; i < result.data.length; ++i) {
                            if (result.data[i] !== undefined) {
                                var field = new Models.SystemFormViewField();
                                HCMS.DataAccess.Utility.CopyObject(field, result.data[i]);
                                this.addViewField(field);
                            }
                        }
                    }
                    if (this.CallbackOnLoad != null) {
                        this.CallbackOnLoad(this);
                    }
                });
                this.FormId = formId;
                this.ViewTypeId = viewTypeId;
            }
            get ViewFields() {
                return this._viewFields;
            }
            GetNewCode(viewId, callback) {
                if (viewId == 0)
                    return;
                var currentObject = this;
                var queryString = '?viewId=' + viewId;
                currentObject.dbManager.Get('CodeSetup', "GetNewCode", queryString, function (response) {
                    if (callback != null) {
                        callback(response.data);
                    }
                }, null);
            }
            ;
        }
        Models.SystemFormView = SystemFormView;
        class IndexView extends SystemFormView {
            constructor(translator, dbManager, userId, formId) {
                super(translator, dbManager, userId, formId, Models.ViewType.Index);
                this.GridSetup = new HCMS.Forms.BaseGridSetup(translator, dbManager);
            }
            CallbackOnLoad(view) {
                var _view = view;
                this.GridSetup.LoadGridOptions(_view);
                this.GridSetup.LoadColumnOptions(view, () => {
                    this.GridSetup.SetColumnDefinitions();
                });
            }
        }
        Models.IndexView = IndexView;
        class CreateView extends SystemFormView {
            constructor(translator, dbManager, userId, formId) {
                super(translator, dbManager, userId, formId, Models.ViewType.Edit);
            }
            CallbackOnLoad(view) {
            }
        }
        Models.CreateView = CreateView;
        class EditView extends SystemFormView {
            constructor(translator, dbManager, userId, formId) {
                super(translator, dbManager, userId, formId, Models.ViewType.Edit);
            }
            CallbackOnLoad(view) {
            }
        }
        Models.EditView = EditView;
        class DetailsView extends SystemFormView {
            constructor(translator, dbManager, userId, formId) {
                super(translator, dbManager, userId, formId, Models.ViewType.Details);
            }
            CallbackOnLoad(view) {
            }
        }
        Models.DetailsView = DetailsView;
    })(Models = HCMS.Models || (HCMS.Models = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Models;
    (function (Models) {
        let ViewType;
        (function (ViewType) {
            ViewType[ViewType["All"] = 0] = "All";
            ViewType[ViewType["Index"] = 1] = "Index";
            ViewType[ViewType["Details"] = 2] = "Details";
            ViewType[ViewType["Edit"] = 3] = "Edit";
        })(ViewType = Models.ViewType || (Models.ViewType = {}));
    })(Models = HCMS.Models || (HCMS.Models = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class SmartAlert {
            constructor() {
                this.warningCounter = 0;
                this.Alert = (message, title) => {
                    if (title == null) {
                        title = window['appConfig'].applicationName;
                    }
                    $['smallBox']({
                        title: message,
                        content: "<i class='fa fa-clock-o'></i> <i>" + title + "</i>",
                        color: "#5F895F",
                        iconSmall: "fa fa-check bounce animated",
                        timeout: 8000
                    });
                    // window.alert(message);
                };
                this.Warning = (message, title) => {
                    if (title == null) {
                        title = window['appConfig'].applicationName;
                    }
                    $['bigBox']({
                        title: title,
                        content: message,
                        // color: "#FF8A65",
                        color: "#C79121",
                        icon: "fa fa-warning shake animated",
                        number: ++this.warningCounter,
                        timeout: 10000
                    });
                };
                this.Error = (message, title) => {
                    if (title == null) {
                        title = window['appConfig'].applicationName;
                    }
                    $['bigBox']({
                        title: title,
                        content: message,
                        color: "#C46A69",
                        icon: "fa fa-warning shake animated",
                        number: ++this.warningCounter,
                        timeout: 10000
                    });
                };
                this.Confirm = (message, title, yesCallBack, noCallBack) => {
                    $['SmartMessageBox']({
                        title: title,
                        content: message,
                        buttons: '[No][Yes]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "Yes") {
                            if (yesCallBack != null) {
                                yesCallBack();
                            }
                            return true;
                        }
                        if (ButtonPressed === "No") {
                            if (noCallBack != null) {
                                noCallBack();
                            }
                            return false;
                        }
                    });
                };
            }
        }
        Controls.SmartAlert = SmartAlert;
        //hcmsUtilities.service('smartAlertService', function () {
        //    return new SmartAlert();
        //});
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        // form Translator
        class OnFinishRender {
            //public scope: any = {};
            constructor($timeout) {
                this.$timeout = $timeout;
                this.restrict = 'A';
                this.link = (scope, element, attr) => {
                    if (scope.$last === true) {
                        this.$timeout(() => {
                            scope.$emit(attr.onFinishRender);
                        });
                    }
                };
            }
            static Factory() {
                var directive = ($timeout) => new OnFinishRender($timeout);
                //directive's injection list
                directive.$inject = ["$timeout"];
                return directive;
            }
        }
        Controls.OnFinishRender = OnFinishRender;
        Controls.hcmsControls.directive('onFinishRender', OnFinishRender.Factory());
        class OnWidgetFinishRender {
            //public scope: any = {};
            constructor($timeout) {
                this.$timeout = $timeout;
                this.restrict = 'A';
                this.link = (scope, element, attr) => {
                    element.attr("id", attr.onWidgetFinishRender);
                    if (scope.$last === true) {
                        $['enableJarvisWidgets'] = true;
                        this.$timeout(window.setup_widgets_desktop, 100);
                    }
                };
            }
            static Factory() {
                var directive = ($timeout) => new OnWidgetFinishRender($timeout);
                //directive's injection list
                directive.$inject = ["$timeout"];
                return directive;
            }
        }
        Controls.OnWidgetFinishRender = OnWidgetFinishRender;
        Controls.hcmsControls.directive('onWidgetFinishRender', OnWidgetFinishRender.Factory());
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Validations;
    (function (Validations) {
        class CommonValidations {
        }
        CommonValidations.isNull = (data) => {
            return (angular.isUndefined(data) || (data === null));
        };
        CommonValidations.isNullReplace = (data, replace) => {
            if (HCMS.Validations.CommonValidations.isNull(data))
                return replace;
            return data;
        };
        CommonValidations.pad = (num, size) => {
            var s = num + "";
            while (s.length < size)
                s = "0" + s;
            return s;
        };
        Validations.CommonValidations = CommonValidations;
    })(Validations = HCMS.Validations || (HCMS.Validations = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Validations;
    (function (Validations) {
        class DateValidations {
        }
        DateValidations.isDate = (date) => {
            var isValid = true;
            if (Object.prototype.toString.call(date) === "[object Date]") {
                // it is a date
                if (isNaN(date)) {
                    // date is not valid
                    isValid = false;
                }
                else {
                    // date is valid
                    isValid = true;
                }
            }
            else {
                // not a date
                isValid = false;
            }
            return (isValid && date !== null);
        };
        DateValidations.toDate = (date) => {
            return JSON.stringify(date);
        };
        DateValidations.toUtcDate = (date) => {
            if (HCMS.Validations.DateValidations.isDate(date))
                return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            else
                return date;
        };
        DateValidations.toUTCTime = (time) => {
            return new time(time.UtC(time.Hours(), time.Minutes()));
        };
        DateValidations.toDateTime = (inTime) => {
            if (!HCMS.Validations.CommonValidations.isNull(inTime)) {
                var alltime = inTime.split(':');
                if (alltime.length > 2) {
                    var time = {
                        h: parseInt(alltime[0]),
                        m: parseInt(alltime[1]),
                        s: parseInt(alltime[2])
                    };
                    return new Date(2000, 1, 1, time.h, time.m, time.s, 0);
                }
                else
                    return null;
            }
            else
                return null;
        };
        DateValidations.timeAddHours = (fromTime, hours) => {
            //  var fromDateTime = DateValidations.toDateTime(fromTime);
            var newDateTime = new Date(fromTime);
            newDateTime.setHours(fromTime.getHours() + hours);
            return newDateTime.getHours() + ":" + newDateTime.getMinutes() + ":" + newDateTime.getSeconds();
        };
        DateValidations.dateToJsonString = (date) => {
            if (DateValidations.isDate(date)) {
                return date.toJSON();
            }
            return date.tostring();
        };
        DateValidations.dateDiffDays = (fromDate, toDate) => {
            var timeDiff = Math.abs(fromDate.getTime() - toDate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return diffDays;
        };
        DateValidations.dateDiffHours = (fromDate, toDate) => {
            var timeDiff = Math.abs(fromDate.getTime() - toDate.getTime());
            var diffMinutes = Math.ceil(timeDiff / (1000 * 60 * 60));
            return diffMinutes;
        };
        DateValidations.dateDiffMinutes = (fromDate, toDate) => {
            var timeDiff = Math.abs(fromDate.getTime() - toDate.getTime());
            var diffMinutes = Math.ceil(timeDiff / (1000 * 60));
            return diffMinutes;
        };
        DateValidations.dateDiffSeconds = (fromDate, toDate) => {
            var timeDiff = Math.abs(fromDate.getTime() - toDate.getTime());
            var diffSeconds = Math.ceil(timeDiff / (1000));
            return diffSeconds;
        };
        DateValidations.dateAddDays = (fromDate, days) => {
            var result = new Date(fromDate);
            result.setDate(result.getDate() + days);
            return result;
        };
        Validations.DateValidations = DateValidations;
    })(Validations = HCMS.Validations || (HCMS.Validations = {}));
})(HCMS || (HCMS = {}));
var HCMS;
(function (HCMS) {
    var Controls;
    (function (Controls) {
        class messageHandler {
            constructor() {
                this.MessageConfirmation = (data, successMessge) => {
                    var systemResult = data.SystemMessage;
                    //if (!HCMS.Validations.CommonValidations.isNull(data) && HCMS.Validations.CommonValidations.isNull(systemResult)) {
                    //    this.smartAlert.Error(data);
                    //}else
                    var result = true;
                    if (!HCMS.Validations.CommonValidations.isNull(systemResult)
                        && data.IsErrorMessage == false) {
                        this.smartAlert.Alert(successMessge);
                        result = true;
                    }
                    else {
                        if (systemResult.IsPreventMessage == true) {
                            this.smartAlert.Error(systemResult.SystemMessage.MessageComment, systemResult.SystemMessage.MessageCode); // Error Alert
                            result = false;
                        }
                        else {
                            this.smartAlert.Warning(systemResult.SystemMessage.MessageComment, systemResult.SystemMessage.MessageCode); // Warning Alert
                            this.smartAlert.Alert(successMessge);
                            result = true;
                        }
                    }
                    return result;
                };
                this.smartAlert = new HCMS.Controls.SmartAlert();
            }
        }
        Controls.messageHandler = messageHandler;
    })(Controls = HCMS.Controls || (HCMS.Controls = {}));
})(HCMS || (HCMS = {}));
/// <reference path="../../../scripts/typings/angularjs/angular.d.ts" />
var HCMS;
(function (HCMS) {
    var Validations;
    (function (Validations) {
        //"use strict";
        Validations.hcmsValidations = angular.module("HCMS.Validations", []);
    })(Validations = HCMS.Validations || (HCMS.Validations = {}));
})(HCMS || (HCMS = {}));
//# sourceMappingURL=client.js.map