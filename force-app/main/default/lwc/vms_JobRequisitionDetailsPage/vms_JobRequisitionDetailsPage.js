import { LightningElement,api, wire,track } from 'lwc';
import getJobRequisitionDetail from '@salesforce/apex/VMS_Job_Requisition.getJobRequisitionDetail';
import saveJobRecord from '@salesforce/apex/VMS_Job_Requisition.saveJobRecord';

import CONTENT_VERSION from '@salesforce/schema/ContentVersion';

import Job_Contract__c from '@salesforce/schema/Job_Requisition__c.Job_Contract__c';
import Experience_Required__c from '@salesforce/schema/Job_Requisition__c.Experience_Required__c';
import Education_Required__c from '@salesforce/schema/Job_Requisition__c.Education_Required__c';
import { refreshApex } from '@salesforce/apex';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import Job_Requisition from '@salesforce/schema/Job_Requisition__c';
import Domain__c from '@salesforce/schema/Job_Requisition__c.Domain__c';
import Sub_Domain__c from '@salesforce/schema/Job_Requisition__c.Sub_Domain__c';

export default class Vms_JobRequisitionDetailsPage extends LightningElement {

    jobResult;
    jobRecord;
    @api recordId;
    allPicklistValues;
    JobContract;
    @track Domainjob;
    @track JobSubDomain
    @track subDomainOption;
    JobExperience;
    JobEducationRequired;
    isEdit = false;
    isDisabled = true;
    isLoaded = false;
    

    @wire(getJobRequisitionDetail, { recordId: '$recordId' })
    JobRequisition(result) {
        this.jobResult = result;
        const { data, error } = result;
        if (data) {
            this.jobRecord = JSON.parse(JSON.stringify(data));
            console.log('jobRecord NEW WIRE--->' + JSON.stringify(this.clientRecord))
        }
        if (error) {
            console.error('job Error: ' + JSON.stringify(error));
        }
    }

    handleChange(event) {
        const changeDatafieldName = event.target.fieldName;
        const changeDataValue = event.target.value;
        const changeJobRecord = this.jobRecord[0];
        changeJobRecord[changeDatafieldName] = changeDataValue;

        console.log('changeDatafieldName',changeDatafieldName);

        
            if(changeDatafieldName == 'Domain__c'){
                let key = this.JobSubDomain.controllerValues[changeDataValue];
                this.subDomainOption = this.JobSubDomain.values.filter(opt => opt.validFor.includes(key));
                console.log('domai option clicked',this.subDomainOption);

            }
           
         
    }

    handleEdit() {
        this.isEdit = true;
        this.isDisabled = false;
    }

    handleCancel() {
        this.isEdit = false;
        this.isDisabled = true;
        this.dispatchEvent(new CloseActionScreenEvent());
            //get client record
            getJobRequisitionDetail({ recordId: this.recordId })
            .then((result) => {
                this.jobRecord = JSON.parse(JSON.stringify(result));
            })
            .catch((error) => {
                console.log('Error--->' + error)
            });
    }
 
    handleSave() {
        saveJobRecord({ jobRecords: this.jobRecord })
            .then(result => {
                this.isLoaded = true;
                const event = new ShowToastEvent({
                    title: 'Successfully Updated',
                    message: result,
                    variant: 'Success',
                })
                this.dispatchEvent(event);

                setTimeout(() => {
                    this.isLoaded = false;
                    refreshApex(this.contactResult);
                    this.isDisabled = true;
                    this.isEdit = false;
                }, 1000);

            })
            .catch(error => {
                console.log('error in save --->' + JSON.stringify(error));
                const event = new ShowToastEvent({
                    title: 'Error While Saving',
                    message: 'Please Fill Proper Data.',
                    variant: 'Error',
                })
                this.dispatchEvent(event);
            })

    }

    @wire(getObjectInfo, { objectApiName: Job_Requisition })
    jobInfo;

    @wire(getPicklistValues, { recordTypeId: '$jobInfo.data.defaultRecordTypeId', fieldApiName: Job_Contract__c })
    JobContractinfo({ data, error }) {
        if (data) this.JobContract = data.values;
        console.log('JobContract values ',this.JobContract );
    }
    @wire(getPicklistValues, { recordTypeId: '$jobInfo.data.defaultRecordTypeId', fieldApiName: Domain__c })
    Domaininfo({ data, error }) {
        if (data) this.Domainjob = data.values;
        console.log('Domainjob values ',this.Domainjob );
    }

    @wire(getPicklistValues, { recordTypeId: '$jobInfo.data.defaultRecordTypeId', fieldApiName: Sub_Domain__c })
    SubDomaininfo({ data, error }) {
        if (data) this.JobSubDomain = data;
        console.log('JobSubDomain values ',JSON.stringify(this.JobSubDomain));
    }
    @wire(getPicklistValues, { recordTypeId: '$jobInfo.data.defaultRecordTypeId', fieldApiName: Experience_Required__c })
    ExperienceRequiredinfo({ data, error }) {
        if (data) this.JobExperience = data.values;
        console.log('JobExperience values ',this.JobExperience );
    }

    @wire(getPicklistValues, { recordTypeId: '$jobInfo.data.defaultRecordTypeId', fieldApiName: Education_Required__c })
    EducationRequiredinfo({ data, error }) {
        if (data) this.JobEducationRequired = data.values;
        console.log('JobEducationRequired values ',this.JobEducationRequired );
    }
   

}