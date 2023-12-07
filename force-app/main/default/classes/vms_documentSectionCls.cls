public class vms_documentSectionCls {
    
    @AuraEnabled(cacheable=true)
    public static List<ContentVersion> getDocuments(Id recordId){
        
        List<ContentVersion> contentVersions = new List<ContentVersion>();
        List<ContentDocumentLink> contentLinked = [SELECT ContentDocumentId, LinkedEntityId  FROM ContentDocumentLink where LinkedEntityId =: recordId]  ;
        //system.debug('contentLinked-->'+contentLinked);
        
        set<Id> ContentDocumentIds = new set<Id>();
        for(ContentDocumentLink cc : contentLinked){
            ContentDocumentIds.add(cc.ContentDocumentId);
        }
        
        if(ContentDocumentIds.size() > 0){
            contentVersions = [select id,title,VersionDataUrl,ContentDocumentId,Document_Type__c,Description  from ContentVersion where ContentDocumentId IN : ContentDocumentIds];
            system.debug('contentVersions-->'+contentVersions);     
        }        
        return contentVersions;
    }
    
    @AuraEnabled
    Public static void saveUpdateFile(ContentVersion ContentVersionRecord, string oldDocumentRecordId, string recordId){
        system.debug('ContentVersionRecord-----'+ContentVersionRecord + 'oldDocumentRecordId---'+ oldDocumentRecordId + ' recordId---'+recordId);
        
        if(oldDocumentRecordId != ''){
          ContentDocument oldContentVersion = [select id from ContentDocument where Id =: oldDocumentRecordId];
          DELETE oldContentVersion;
        }
        
        ContentDocumentLink contentDocumentLinkRecord = new ContentDocumentLink();
        contentDocumentLinkRecord.ContentDocumentId = ContentVersionRecord.ContentDocumentId;
        contentDocumentLinkRecord.LinkedEntityId = recordId;
        contentDocumentLinkRecord.ShareType = 'I';
        contentDocumentLinkRecord.Visibility = 'AllUsers';
        
        Insert contentDocumentLinkRecord;
       
        update ContentVersionRecord;
    }
    
}