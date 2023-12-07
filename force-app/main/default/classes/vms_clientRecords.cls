public class vms_clientRecords {
    
    @auraenabled(cacheable=true)
    public static List<Contact> getClientRecords(){
        
        Id RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Client Contact').getRecordTypeId();
        system.debug('RecordTypeId -->' + RecordTypeId );
        List<Contact> clientRecords = [SELECT Name,AccountId,Email,MobilePhone,Domain__c,Domain_Sub_Category__c,Account.Name FROM Contact WHERE RecordTypeId =: RecordTypeId];
        system.debug('clientRecords -->' + clientRecords );
        return clientRecords;
    }
}