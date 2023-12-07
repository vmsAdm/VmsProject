import { LightningElement, wire } from 'lwc';
import getResourcerecords from '@salesforce/apex/recordlistapex.getResourcerecords';
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
   
]

export default class ResourceRecordsList extends NavigationMixin(LightningElement) {

    columns = column;
    dataSet;
    @wire(getResourcerecords)
    ResourceRecords({data,error}){
        if(data){
            // console.log('data -- >' + JSON.stringify(data));
            const result = JSON.parse(JSON.stringify(data));
            result.forEach(element => {
                if(element.Account !== undefined){
                    element.AccountName = element.Account.Name;
                }
                // console.log('element new-->'+JSON.stringify(element));
            });
            this.dataSet = result;
        }else if(error){
            console.log('Error -- >' + error);
        }
    }

    handleRowAction(event){
        const row = event.detail.row;
        const ResourceRecordId = row.Id;
        console.log('Rsourceid-->: '+ ResourceRecordId);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                // recordId: clientRecordId,
                
                name: 'resource_detail_page__c',
          },
          state: {
            recordId: ResourceRecordId
        }
        });
    }
}