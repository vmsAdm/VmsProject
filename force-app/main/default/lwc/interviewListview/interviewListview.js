import { LightningElement, wire } from 'lwc';
import getClientRecords from '@salesforce/apex/getinterview.getResourcerecords';
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
    {label: "Interview Mode", fieldName: "Interview_Mode__c"},
    { label: "Interview for Possition", fieldName: "Interview_for_Possition" },
    { label: "interview Status", fieldName: "interview_Status__c" },
    
   
]

export default class Recored extends NavigationMixin(LightningElement) {

    columns = column;
    dataSet = {};

    @wire(getClientRecords)
    clientRecords({data,error}){
        if(data){
            // console.log('data -- >' + JSON.stringify(data));
            const result = JSON.parse(JSON.stringify(data));
            console.log('check result -- >' + JSON.stringify(result));
            result.forEach(element => {
                element.Interview_for_Possition = element.Interview_for_Possition__r.Name;
                console.log('element new is here-->'+JSON.stringify(element));
            });
            this.dataSet = result;
            console.log('result 11111' + result);
            console.log('dataaa set' +  this.dataSet);
        }else if(error){
            console.log('Error -- >' + error);
        }
    }

    handleRowAction(event){
        const row = event.detail.row;
        const clientRecordId = row.Id;
        console.log('clientRecordId-->: '+ clientRecordId);
       
    }
}