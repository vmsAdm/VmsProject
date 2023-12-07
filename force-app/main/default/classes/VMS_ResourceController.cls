public class VMS_ResourceController {
    
    @AuraEnabled(cacheable=true)
    public static Contact getContactDetails(String contactId) {
        Contact contact = [SELECT Id,Name, AccountId,FirstName, LastName, Email,Skill_Set__c,Document__c,Document_Type__c,MailingAddress,
                           Availability_status__c,Shift_Timings__c,Contact_Number__c,Birthdate,Phone,State__c,Refernce__c FROM Contact 
                           WHERE Id = :contactId LIMIT 1];
        return contact;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        System.debug('Method trigger');
        List<Account> accountList = [SELECT Id ,Name FROM Account Limit 10];
        return accountList;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Skill_Set__c> getAvailableSkillSets() {
        return [SELECT Id, Name FROM Skill_Set__c LIMIT 10]; 
    } 
    
    @AuraEnabled
    public static void updateContactDetails(Id newAccountId, String ResourceName, Id skillSet,Id SelectanAccount,String Document,String Email,String DocumentType, String MailingAddress,String Availability,Date BirthDate,String ShiftTimings,Decimal ContactNumber,String Reference) {
        
        System.debug('newAccountId----->'+ newAccountId);
        System.debug('ResourceName----->'+ ResourceName);
        System.debug('skillSet----->'+ skillSet);
        System.debug('SelectanAccount----->'+ SelectanAccount);
        System.debug('Document----->'+ Document);
        System.debug('Email----->'+ Email);
        System.debug('DocumentType----->'+ DocumentType);
        System.debug('MailingAddress----->'+ MailingAddress);
        System.debug('Availability----->'+ Availability);
        System.debug('BirthDate----->'+ BirthDate);
        System.debug('ShiftTimings----->'+ ShiftTimings);
        System.debug('ContactNumber----->'+ ContactNumber);
        
        System.debug('Reference----->'+ Reference);
        
        List<Contact> conList=[SELECT Id,Name, Account.name,AccountId,FirstName, LastName, Email,Skill_Set__c,Document__c,Document_Type__c,MailingAddress,
                               Availability_status__c,Shift_Timings__c,Contact_Number__c,Birthdate,Refernce__c FROM Contact 
                               WHERE Id = :newAccountId LIMIT 1];
        Map<Id, Contact> contactMap = new Map<Id, Contact>(conList);
        for(Contact con : conList){
            if(contactMap.get(con.Id).Name != ResourceName && ResourceName != null ){
                
                List<String> res = ResourceName.split(' ');
                System.debug(res);
                if( res.size()>0 && res.size()<2 ){
                    con.FirstName = null;   
                    con.LastName = res[0];   
                }
                else if( res.size()>1 ){
                    con.FirstName = res[0];
                    con.LastName = res[1];   
                }
                
            }
            
            if(contactMap.get(con.Id).Skill_Set__c != skillSet && skillSet !=null){
                con.Skill_Set__c = skillSet;
            }
            if(contactMap.get(con.Id).Document__c != Document && Document !=null){
                con.Document__c = Document;
            }
            if(contactMap.get(con.Id).Document_Type__c != DocumentType && DocumentType !=null){
                con.Document_Type__c = DocumentType;
            }
            if(contactMap.get(con.Id).Birthdate != BirthDate && BirthDate !=null){
                con.Birthdate = BirthDate;
            }
            if(contactMap.get(con.Id).Shift_Timings__c != ShiftTimings && ShiftTimings !=null){
                con.Shift_Timings__c = ShiftTimings;
            }
            if(contactMap.get(con.Id).Contact_Number__c != ContactNumber && ContactNumber !=null){
                con.Contact_Number__c = ContactNumber;
            }
            if(contactMap.get(con.Id).Refernce__c != Reference && Reference !=null){
                con.Refernce__c = Reference;
            }
            
            if(contactMap.get(con.Id).Contact_Number__c != ContactNumber && ContactNumber !=null){
                con.Contact_Number__c = ContactNumber;
            }
            
            if(contactMap.get(con.Id).Email != Email && Email !=null){
                con.Email = Email;
            }
            if(contactMap.get(con.Id).Availability_status__c != Availability && Availability !=null){
                con.Availability_status__c = Availability;
            }
            
            if(contactMap.get(con.Id).AccountId != SelectanAccount && SelectanAccount !=null){
                con.AccountId = SelectanAccount;
            }
            
        }
        
        System.debug('conList----->'+ conList);
        if(conList != null){
            update conList;

        }
                }
    
    @AuraEnabled(cacheable=true)
    public static String getAccountName(Id accountId) {
        Account acc = [SELECT Name FROM Account WHERE Id = :accountId LIMIT 1];
        return acc.Name;
    } 
    
    @AuraEnabled
    public static String uploadFile(String base64, String filename, String recordId) {
        ContentVersion cv = createContentVersion(base64, filename);
        ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
        if (cv == null || cdl == null) { return null; }
        return cdl.Id;
    }
    
    private static ContentVersion createContentVersion(String base64, String filename) {
        ContentVersion cv = new ContentVersion();
        cv.VersionData = EncodingUtil.base64Decode(base64);
        cv.Title = filename;
        cv.PathOnClient = filename;
        try {
            insert cv;
            return cv;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }
    
    private static ContentDocumentLink createContentLink(String contentVersionId, String recordId) {
        if (contentVersionId == null || recordId == null) { return null; }
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = [
            SELECT ContentDocumentId 
            FROM ContentVersion 
            WHERE Id =: contentVersionId
        ].ContentDocumentId;
        cdl.LinkedEntityId = recordId;
        // ShareType is either 'V', 'C', or 'I'
        // V = Viewer, C = Collaborator, I = Inferred
        cdl.ShareType = 'V';
        try {
            insert cdl;
            return cdl;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }
    
}