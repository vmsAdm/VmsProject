import { LightningElement } from 'lwc';
import sampleResource from '@salesforce/resourceUrl/AmazonCeo';

export default class VMS_section456 extends LightningElement {

    amazonCeoSection4 = sampleResource;
    
    handleContactUsClick(){
        const newURL = 'https://infofeat.com/contacts/';
        window.location.href = newURL;
    }
}