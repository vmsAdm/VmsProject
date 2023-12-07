import { LightningElement, wire, api, track } from 'lwc';
    import { getObjectInfo } from 'lightning/uiObjectInfoApi';
    import CONTACT_OBJECT from '@salesforce/schema/Contact';
    import { getPicklistValues } from 'lightning/uiObjectInfoApi';
    import STATE_FIELD from '@salesforce/schema/Contact.State__c';
    import CITY_FIELD from '@salesforce/schema/Contact.City__c';
    import AREA_FIELD from '@salesforce/schema/Contact.Area__c';
    import DOCUMENT_FIELD from '@salesforce/schema/Contact.Document__c';
    import DOMAIN_FIELD from '@salesforce/schema/Contact.Domain__c';
    import SUB_DOMAIN_FIELD from '@salesforce/schema/Contact.Domain_Sub_Category__c';
    import { ShowToastEvent } from 'lightning/platformShowToastEvent';
    import uploadFile from '@salesforce/apex/VMS_ClientInformation.uploadFile';
    import getContactRecordInfo from '@salesforce/apex/VMS_ClientInformation.getContactRecodsDetails';
    import searchAccounts from '@salesforce/apex/VMS_ClientInformation.searchAccounts';

export default class Vms_ClientDetailsPage extends LightningElement {
    @api recordId;
    recordData;
    fileData;
    Name;
    firstName;
    lastName;
    email;
    domain;
    subDomain;
    state;
    city;
    area;
    address;
    mailingAddress;
    birthDate;
    mobile;
    otherPhone;
    document;
    @track accountName;
    isDisabled=true;

        @track stateOptions;
        @track documnetOptions;
        @track domainOptions;
        @track subDomainOptions;
        @track citiesOptions;
        @track areaOptions;
        @track allFieldDetails;

        @track searchTerm = '';
        @track accounts;
        @track selectedAccountId;
    
        handleSearchTermChange(event) {
            this.searchTerm = event.target.value;
        }
    
        @wire(searchAccounts)
        wiredAccounts({ data, error }) {
            if (data) {
                this.accounts = data;
                console.log('Test Data:--',this.accounts );
                this.accountOptions = data.map(account => ({
                    label: account.Name,
                    value: account.Id
                }));
            } else if (error) {
                console.error('Error retrieving accounts:', error);
            }
        }
      

        handleAccountSelection(event) {
            this.accountName = event.detail.value;

        }
        
       @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
        contactInfo;

       connectedCallback(){
        this.getData();
       }

       disabledData(){
        this.isDisabled=false;
       }
       
        getData(){
            getContactRecordInfo({ recordId: this.recordId})
            .then((result) => {
             var strData = JSON.parse( JSON.stringify( result ) );
              this.name = strData['Name'];
              this.firstName = strData['FirstName'];
              this.lastName = strData['LastName'];
              this.email = strData['Email'];
              this.document = strData['Document__c'];
              this.domain = strData['Domain__c'];
              this.subDomain = strData['Domain_Sub_Category__c'];
              this.area = strData['Area__c'];
              this.address = strData['OtherAddress'];
              this.city = strData['City__c'];
              this.state = strData['State__C'];
              this.mailingAddress = strData['MailingAddress'];
              this.otherPhone = strData['Phone'];    
              this.accountName = strData['AccountId'] ; 
            })
            .catch((error) => {
              this.error = error;
            });
           }

  

        @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: DOCUMENT_FIELD })
        documnetFieldInfo({ data, error }) {
            if (data) this.documnetOptions = data.values;
        }
        @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: DOMAIN_FIELD })
        domainFieldInfo({ data, error }) {
            if (data) this.domainOptions = data.values;
        }
        @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: STATE_FIELD })
        stateFieldInfo({ data, error }) {
            if (data) {
                this.stateOptions = data.values;
                console.log('state values:---',this.stateOptions);   
            }
        }
        @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: CITY_FIELD })
        citiesFieldInfo({ data, error }) {
            if (data) this.citiesOptions = data.values;
        }
        @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: AREA_FIELD })
        areaFieldInfo({ data, error }) {
            console.log('area Debugs:-----',JSON.stringify(data));
            if (data) this.areaOptions = data.values;
        }
        @wire(getPicklistValues, { recordTypeId: '$contactInfo.data.defaultRecordTypeId', fieldApiName: SUB_DOMAIN_FIELD })
        subDomainFieldInfo({ data, error }) {
            if (data) this.subDomainOptions = data.values;
        }
       
        handleStateChange(event) {
           console.log('hii this is StateEvent');
            let key = this.stateOptions.controllerValues[event.target.value];
            this.citiesOptions = this.stateOptions.values.filter(opt => opt.validFor.includes(key));
        }

         openfileUpload(event) {
                const file = event.target.files[0]
                var reader = new FileReader()
                reader.onload = () => {
                    var base64 = reader.result.split(',')[1]
                    this.fileData = {
                        'filename': file.name,
                        'base64': base64,
                        'recordId': this.recordId
                    }
                    console.log(this.fileData)
                }
                reader.readAsDataURL(file)
            }

            // handleClick(){
            //     const {base64, filename, recordId} = this.fileData
            //     uploadFile({ base64, filename, recordId }).then(result=>{
            //         this.fileData = null
            //         let title = `${filename} uploaded successfully!!`
            //         this.toast(title)
            //     })
            // }

            toast(title){
                const toastEvent = new ShowToastEvent({
                    title, 
                    variant:"success"
                })
                this.dispatchEvent(toastEvent)
            }
}