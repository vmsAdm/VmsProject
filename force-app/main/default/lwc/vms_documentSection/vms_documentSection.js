import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
import getDocuments from '@salesforce/apex/vms_documentSectionCls.getDocuments';
import saveUpdateFile from '@salesforce/apex/vms_documentSectionCls.saveUpdateFile';
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import DOCUMENT_TYPE from "@salesforce/schema/ContentVersion.Document_Type__c";
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const column = [
    { label: "Title", fieldName: "Title", sortable: true, },
    { label: "Document Type", fieldName: "Document_Type__c", sortable: false, hideDefaultActions: true },
    {
        label: 'Download',
        fieldName: "VersionDataUrl",
        type: 'url',
        cellAttributes: { iconName: 'utility:download' },
        typeAttributes: { label: 'Download' },
        sortable: false,
        hideDefaultActions: true,
    },
    {
        label: 'Preview',
        type: 'button-icon',
        typeAttributes: {
            label: 'Preview',
            name: 'Preview',
            title: 'Preview',
            iconName: 'utility:document_preview',
            iconPosition: 'left',
        },
        hideDefaultActions: true,
    },
    {
        type: "button",
        typeAttributes: {
            label: 'Update',
            name: 'Update',
            title: 'Update',
            iconPosition: 'left',
            iconName: 'utility:record_update',
            variant: 'Brand'
        },
        hideDefaultActions: true,
    },
]

export default class Vms_documentSection extends NavigationMixin(LightningElement) {

    @api recordId;
    columns = column;
    dataSet = {};
    isModalOpen = false;
    updateFileRecord = {};
    documnetOptions;
    oldDocumentRecordId;
    uploadedFiles = {};
    wiredResult;
    isLoaded = false;
    FileName = '';


    @wire(getDocuments, { recordId: '$recordId' })
    documents(result) {
        this.wiredResult = result;
        const { data, error } = result;
        if (data) {
            this.dataSet = data;
        }
        if (error) {
            console.error('Error: ' + JSON.stringify(error));
        }
    }

    get isTableShow(){
        return (Object.keys(this.dataSet).length == 0) ? false : true;
    }

    onrowactionHandler(event) {
        const row = event.detail.row;
        const ContentDocumentId = row.ContentDocumentId;
        const actionName = event.detail.action.name;
        console.log('actionName-->' + actionName);
        console.log('ContentDocumentId-->' + ContentDocumentId);


        switch (actionName) {
            case 'Preview':
                this[NavigationMixin.Navigate]({
                    type: 'standard__namedPage',
                    attributes: {
                        pageName: 'filePreview'
                    },
                    state: {
                        selectedRecordId: ContentDocumentId
                    }
                })
                break;
            case 'Update':
                this.handleUpdate(row);
                break;
        }
    }

    handleUpdate(row) {
        this.updateFileRecord = {};
        this.FileName = '';
        this.isModalOpen = true;
        console.log('row is--' + JSON.stringify(row));
        this.updateFileRecord = {
            'Document_Type__c': row.Document_Type__c,
            'Description': row.Description,
            'oldRecordId':row.Id,
        };
        this.oldDocumentRecordId = row.ContentDocumentId
    }

    handleChange(event) {
        // console.log('updateFileRecord---' + JSON.stringify(this.updateFileRecord));
        const datafieldName = event.target.fieldName;
        this.updateFileRecord[datafieldName] = event.target.value;
        //console.log('updateFileRecord handleChange---' + JSON.stringify(this.updateFileRecord));
    }

    handleAddDocument() {
        this.updateFileRecord = {};
        this.oldDocumentRecordId = '';
        this.uploadedFiles = {};
        this.isModalOpen = true;
        this.FileName = '';
    }

    handleCancel() {
        this.isModalOpen = false
    }

    uploadfinished(event) {
        this.uploadedFiles = event.detail.files[0];
        console.log('uploadedFiles: ' + JSON.stringify(this.uploadedFiles));
        this.updateFileRecord = Object.assign(this.updateFileRecord, this.uploadedFiles);
        this.updateFileRecord['ContentDocumentId'] = this.uploadedFiles.documentId;
        this.updateFileRecord['Id'] = this.uploadedFiles.contentVersionId;
        console.log('Changed and final updateFileRecord uploadfinished---' + JSON.stringify(this.updateFileRecord));
        this.FileName = this.uploadedFiles.name;
    }

    handleSave() {
        console.log(' this.isInputValid()---->' +  this.isInputValid());
        if ( this.isInputValid()) {
                 saveUpdateFile({ ContentVersionRecord: this.updateFileRecord, oldDocumentRecordId: this.oldDocumentRecordId, recordId: this.recordId })
                .then(result => {
                    this.isLoaded = true;
                    console.log('save or update data' + result);
                    const event = new ShowToastEvent({
                        title: 'Successfully File Uploaded',
                        message: result,
                        variant: 'Success',
                    })
                    //fire this event
                    this.dispatchEvent(event);
                    this.isModalOpen = false;
                    
                    setTimeout(() => {
                        this.isLoaded = false;
                        refreshApex(this.wiredResult);
                    }, 2000);
                })
                .catch(error => {
                    console.log('save or update error' + JSON.stringify(error));
                })
        }
    }

    isInputValid() {
        let isValid = true;
        let inputField = this.template.querySelector('.validate');  
        let uploadField = this.template.querySelector('.uploadValidate');  
        console.log('this.uploadedFiles length---->' + Object.keys(this.uploadedFiles).length);
        if (!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
        }
        if(Object.keys(this.uploadedFiles).length == 0){
            isValid = false; 
            uploadField.setCustomValidity("Complete this field.");
            uploadField.reportValidity();
        }else {
            uploadField.setCustomValidity("");
        }
        return isValid;
    }


    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: DOCUMENT_TYPE })
    documentTypes({ data, error }) {
        if (data) this.documnetOptions = data.values;
    }
}