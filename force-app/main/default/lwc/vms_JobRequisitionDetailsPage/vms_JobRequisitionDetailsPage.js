import { LightningElement,api, wire  } from 'lwc';
import getJobRequisitionDetail from '@salesforce/apex/VMS_Job_Requisition.getJobRequisitionDetail';

export default class Vms_JobRequisitionDetailsPage extends LightningElement {

    jobResult;
    jobRecord;
    @api recordId;

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







}