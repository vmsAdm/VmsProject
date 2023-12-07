import { LightningElement, wire } from 'lwc';
import getClientRecords from '@salesforce/apex/vms_clientRecords.getClientRecords';
import { NavigationMixin } from 'lightning/navigation';

const column = [
    {
        label: "Name", fieldName: "Name",
        type: "button",
        sortable: true,
        typeAttributes: {
            label: {
                fieldName: "Name"
            },
            variant: 'base',
        },
    },
    {
        label: "Email", fieldName: "Email",
        type: "url",
        sortable: true,
        typeAttributes: {
            label: {
                fieldName: "Email"
            },
        },
    },
    {label: "Account Name", fieldName: "AccountName"},
    { label: "Mobile Number", fieldName: "MobilePhone" },
    { label: "Domain", fieldName: "Domain__c" },
    { label: "Domain Sub Category", fieldName: "Domain_Sub_Category__c" },
]

export default class Vms_clientRecordsList extends NavigationMixin(LightningElement) {

    columns = column;
    dataSet;

    @wire(getClientRecords)
    clientRecords({data,error}){
        if(data){
            // console.log('data -- >' + JSON.stringify(data));
            const result = JSON.parse(JSON.stringify(data));
            result.forEach(element => {
                element.AccountName = element.Account.Name;
                // console.log('element new-->'+JSON.stringify(element));
            });
            this.dataSet = result;
        }else if(error){
            console.log('Error -- >' + error);
        }
    }

    handleRowAction(event){
        const row = event.detail.row;
        const clientRecordId = row.Id;
        console.log('clientRecordId-->: '+ clientRecordId);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                // recordId: clientRecordId,
                name: 'client_detail_page__c',
          },
          state: {
            recordId: clientRecordId 
        }
        });
    }
}