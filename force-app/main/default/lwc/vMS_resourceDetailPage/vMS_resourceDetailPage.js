import { LightningElement, wire, track ,api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import DOCUMENT_FIELD from '@salesforce/schema/Contact.Document__c';
import Document_Type from '@salesforce/schema/Contact.Document_Type__c';
import Availability_status from '@salesforce/schema/Contact.Availability_status__c';
import Shift_Timings from '@salesforce/schema/Contact.Shift_Timings__c';
import Skill_Set from "@salesforce/schema/Contact.Skill_Set__c";
import Refernce from '@salesforce/schema/Contact.Refernce__c';
import getContactDetails from '@salesforce/apex/VMS_ResourceController.getContactDetails';
import updateContactDetails from '@salesforce/apex/VMS_ResourceController.updateContactDetails';
import getAvailableAccounts from '@salesforce/apex/VMS_ResourceController.getAccounts';
import getAccountName from '@salesforce/apex/VMS_ResourceController.getAccountName';
import getAvailableSkillSets from '@salesforce/apex/VMS_ResourceController.getAvailableSkillSets';

export default class ContactDetail extends LightningElement {
    @api recordId
    name
    firstName
    lastName
    email
    document
    documenttype
    mailingAddress
    availability
    birthDate
    Shift_Timings
    ContactNumber
    reference
    accountName
    skills
    isDisabled=true;
    ResourceName
    skillSet
    SelectanAccount
    Document
    Email
    DocumentType
    Availability
    MailingAddress
    BirthDate
    ShiftTimings
    ContactNumber
    Reference





    @track skillSetOptions;
    @track documnetOptions;
    @track accountOptions;
    @track documenttype;
    @track availabilityOptions;
    @track ShiftTimingsOptions;
    @track allFieldDetails;
    @track referenceOptions;
    @track skillSet; 
    @track searchTerm = '';
    @track accounts;
    @track selectedAccountId;

//upload functionality starts here 

    
get acceptedFormats() {
    return ['.png', '.PNG', '.jpg', '.JPG'];
}

handleUploadFinished(event) {
    const uploadedFiles = event.detail.files;
    this.showNotification(uploadedFiles.length + ' files are Uploaded Successfully', 'success');
}

showNotification(message, variant) {
    const evt = new ShowToastEvent({
        'message': message,
        'variant': variant
    });
    this.dispatchEvent(evt);
}
showNotification1(message, variant) {
    const evt = new ShowToastEvent({
        'message': message,
        'variant': variant
    });
    this.dispatchEvent(evt);
}
// upload functionality ends here


    @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
    contactInfo;

    connectedCallback(){
    this.getData();
    }

    editHandle(){
    this.isDisabled=false;
    }
    handleChange(event){
    if(event.target.label=='Resource Name'){
        this.ResourceName=event.target.value;
        console.log("resource name",this.ResourceName)
    }
    if(event.target.label=='skillSet'){
        this.skillSet=event.target.value;
        console.log("skill set",this.skillSet)
    }
    if(event.target.label=='Select an Account'){
        this.SelectanAccount=event.target.value;
        console.log("account name",this.SelectanAccount)
    }
    if(event.target.label=='Document'){
        this.Document=event.target.value;
        console.log(" this.Document", this.Document)
    }
    if(event.target.label=='Email'){
        this.Email=event.target.value;
    }
    if(event.target.label=='Document Type'){
        this.DocumentType=event.target.value;
        console.log("this.DocumentType", this.DocumentType)
    }
    if(event.target.label=='Mailing Address'){
        this.MailingAddress=event.target.value;
        console.log("this.MailingAddress", this.MailingAddress)
    }
    if(event.target.label=='Availability'){
        this.Availability=event.target.value;
        console.log(" this.Availability", this.Availability)
    }
    if(event.target.label=='Birthdate'){
        this.BirthDate=event.target.value;
        console.log("this.BirthDate", this.BirthDate)
        
    }if(event.target.label=='Shift_Timings'){
        this.ShiftTimings=event.target.value;
        console.log("this.ShiftTimings", this.ShiftTimings)

    }
    if(event.target.label=='Contact Number'){
        this.ContactNumber=event.target.value;
        
    }
    if(event.target.label=='Reference'){
        this.Reference=event.target.value;
        console.log("this.Reference", this.ShiftTimings)

    }
    
    }
    
    HandleSave(){
    console.log("record id--",this.recordId)

    updateContactDetails({
        newAccountId: this.recordId,
        ResourceName: this.ResourceName,
        skillSet: this.skillSet,
        SelectanAccount: this.SelectanAccount,
        Document: this.Document,
        Email: this.Email,
        DocumentType: this.DocumentType,
        MailingAddress: this.MailingAddress,
        Availability: this.Availability,
        BirthDate: this.BirthDate,
        ShiftTimings: this.ShiftTimings,
        ContactNumber: this.ContactNumber,
        Reference: this.Reference
    })
    .then(result => {
        
        this.contacts = result;
        // Display success toast
        this.showNotification1( 'Record saved successfully', 'success');
        
        this.error = undefined;
             
    })
    .catch(error => {
        this.error = error;
        this.contacts = undefined;

        // Display error toast
        this.showNotification1('Error saving record', 'error');
    });

this.isDisabled = true;
this.getData();
}



    @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: DOCUMENT_FIELD })
    documnetFieldInfo({ data, error }) {
        if (data) this.documnetOptions = data.values;
        console.log('documnetOptions values:---',this.documnetOptions);

    }
    @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: Document_Type })
    domainFieldInfo({ data, error }) {
        if (data) this.documnettypeOptions = data.values;
        console.log('documnettypeOptions values:---',this.documnettypeOptions);
    }
    @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: Availability_status })
    stateFieldInfo({ data, error }) {
        if (data) {
            this.availabilityOptions = data.values;
            console.log('availabilityOptions values:---',this.availabilityOptions);   
        }
    }
    @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: Shift_Timings })
    citiesFieldInfo({ data, error }) {
    console.log('Shifts Debugs:-----',JSON.stringify(data));
        if (data) this.ShiftTimingsOptions = data.values;
    }
    @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: Skill_Set })
    areaFieldInfo({ data, error }) {
        console.log('skillset Debugs:-----',JSON.stringify(data));
        if (data) this.skillSetOptions = data.values;
        console.log('skillset values ',this.skillSetOptions );
    }
    @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: Refernce })
    subDomainFieldInfo({ data, error }) {
        if (data) this.referenceOptions = data.values;
        console.log('referenceOptions values ',this.referenceOptions );
    }
    

    @wire(getAvailableAccounts)
    wiredAccounts({ data, error }) {
        if (data) {
            this.accounts = data;
            console.log('Test Data:--',this.accounts );
            this.accountOptions = data.map(account => ({
                label: account.Name,
                value: account.Id
            }));
            console.log('Test Data 98 :--',this.accountOptions);
        } else if (error) {
            console.error('Error retrieving accounts:', error);
        }
    }


    handleAccountSelection(event) {
    this.accountName = event.detail.value;

}


    @wire(getAvailableSkillSets)
    wiredSkillSet({ data, error }) {
        if (data) {
            this.skills = data;
            console.log('Test Data2:--',this.skills );
            this.skillSetOptions = data.map(skill => ({
                label: skill.Name,
                value: skill.Id
            }));
        } else if (error) {
            console.error('Error retrieving accounts:', error);
        }
    }

    handleSkillSetSelection(event) {
    this.skillSet = event.detail.value;

}

getData(){
    getContactDetails({ contactId: this.recordId})
    .then((result) => {
        var strData = JSON.parse( JSON.stringify( result ) );
        this.name = strData['Name'];
        this.firstName = strData['FirstName'];
        this.lastName = strData['LastName'];
        this.email = strData['Email'];
        this.document = strData['Document__c'];
        this.documenttype = strData['Document_Type__c'];
        this.mailingAddress = strData['MailingAddress'];
        this.availability = strData['Availability_status__c'];
        this.birthDate = strData['Birthdate'];
        this.Shift_Timings = strData['Shift_Timings__c'];
        this.ContactNumber = strData['Contact_Number__c'];
        this.reference = strData['Refernce__c'];
        this.skillSetId = strData['Skill_Set__c'];    
        this.accountName = strData['AccountId'] ; 
    })
    .catch((error) => {
        this.error = error;
    });
    }
}