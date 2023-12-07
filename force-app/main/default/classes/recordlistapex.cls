public class recordlistapex
 {

    
    @auraenabled(cacheable=true)
    public static List<Contact> getResourcerecords(){
        
        Id RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Resource Contact').getRecordTypeId();
        system.debug('RecordTypeId -->' + RecordTypeId );
        List<Contact> ResourceRecords = [SELECT Name,AccountId,Email,MobilePhone,Account.Name FROM Contact WHERE RecordTypeId =: RecordTypeId];
        system.debug('Resource Records-->' + ResourceRecords );
        return ResourceRecords;
    }
}