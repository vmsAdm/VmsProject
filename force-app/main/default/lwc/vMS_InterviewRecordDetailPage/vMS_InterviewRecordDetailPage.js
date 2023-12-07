import { LightningElement, api, track,wire } from 'lwc';
import getJobTitles from '@salesforce/apex/JobRequisitionController.getJobTitles';

export default class vMS_InterviewRecordDetailPage extends LightningElement {
    @track selectedJobTitle;
    @track jobTitles = [];

    @wire(getJobTitles)
    wiredJobTitles({ data, error }) {
        if (data) {
            this.jobTitles = data.map(title => ({ label: title, value: title }));
        } else if (error) {
            console.error('Error fetching job titles:', error);
        }
        }
      

        handleAccountSelection(event) {
            this.accountName = event.detail.value;

        }
}