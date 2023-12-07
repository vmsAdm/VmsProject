public class ListViewController {


     @auraenabled
    public static List<Contact> getClientRecords(){
        
        Id RecordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Client Contact').getRecordTypeId();
        system.debug('RecordTypeId -->' + RecordTypeId );
        List<Contact> ResourceRecords = [SELECT Name,AccountId,Area__c,City__c,Level__c,Skills__c FROM Contact WHERE RecordTypeId =: RecordTypeId];
        system.debug('Resouce-->' + ResourceRecords);
        return ResourceRecords;
    }
    }