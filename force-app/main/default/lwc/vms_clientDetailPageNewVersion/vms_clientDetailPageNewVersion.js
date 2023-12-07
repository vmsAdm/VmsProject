import { LightningElement, api, wire } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContactRecordInfo from '@salesforce/apex/VMS_ClientInformation.getContactRecodsDetails';
import searchAccounts from '@salesforce/apex/VMS_ClientInformation.searchAccounts';
import saveContactRecord from '@salesforce/apex/VMS_ClientInformation.saveContactRecord';
import { CloseActionScreenEvent } from 'lightning/actions';
import { getPicklistValuesByRecordType } from "lightning/uiObjectInfoApi";
import { refreshApex } from '@salesforce/apex';

export default class Vms_clientDetailPageNewVersion extends LightningElement{

    @api recordId;
    clientRecord;
    isEdit = false;
    isDisabled = true;
    allPicklistValues;
    accountsResult;
    contactResult;
    accountOptions;
    isLoaded = false;
    
    @wire(searchAccounts)
    accounts({data,error}){
        if (data) {
            this.accountOptions = data.map(account => ({
                label: account.Name,
                value: account.Id
            }));
        }
        if (error) {
            console.error('accounts Error: ' + JSON.stringify(error));
        }
    }   

    @wire(getContactRecordInfo, { recordId: '$recordId' })
    contacts(result) {
        this.contactResult = result;
        const { data, error } = result;
        if (data) {
            this.clientRecord = JSON.parse(JSON.stringify(data));
            console.log('clientRecord NEW WIRE--->' + JSON.stringify(this.clientRecord))
        }
        if (error) {
            console.error('contacts Error: ' + JSON.stringify(error));
        }
    }

    handleChange(event) {
        const changeDatafieldName = event.target.fieldName;
        const changeDataValue = event.target.value;
        const changeClientRecord = this.clientRecord[0];
        changeClientRecord[changeDatafieldName] = changeDataValue;
        // console.log('changed HandleChange-->' + JSON.stringify(this.clientRecord));
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
            getContactRecordInfo({ recordId: this.recordId })
            .then((result) => {
                this.clientRecord = JSON.parse(JSON.stringify(result));
            })
            .catch((error) => {
                console.log('Error--->' + error)
            });
    }

    handleSave() {
        saveContactRecord({ contactRecords: this.clientRecord })
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

    @wire(getPicklistValuesByRecordType, {
        objectApiName: CONTACT_OBJECT,
        recordTypeId: "0125j000000ASVQAA4",
    })
    allPicklistValuesFunction({ data, error }) {
        if (data) {
            this.allPicklistValues = data.picklistFieldValues;  
        }
    };

}