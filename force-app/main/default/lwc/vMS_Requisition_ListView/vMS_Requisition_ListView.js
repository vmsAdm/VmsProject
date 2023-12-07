import { LightningElement } from 'lwc';
//import GetRequisitionRecords from 'salesforce';
const columns = [
    { label: 'Job No', fieldName: 'Name' , type:'url'},
    { label: 'Job Title', fieldName: 'Job_Title__c', type: 'text' },
    { label: 'Job Posting Date', fieldName: 'Job_Posting_Date__c', type: 'text' },
    { label: 'Experience Required', fieldName: 'Experience_Required__c', type: 'text' },

];
export default class VMS_Requisition_ListView extends LightningElement {

    columns=columns;
    data = [];
}