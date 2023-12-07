import { LightningElement, wire } from 'lwc';
import getconactRecords from '@salesforce/apex/ListViewController.getconactRecords';

export default class ListviewComponent extends LightningElement {
    records;

    @wire(getconactRecords)
    wiredRecords({ error, data }) {
        if (data) {
            this.records = data;
        } else if (error) {
            console.error('Error fetching data:', error);
        }
    }
}