public class VMS_Job_Requisition {
    
     @AuraEnabled(cacheable=true)
    public static List<Job_Requisition__c> getJobRequisitionRecords (){
        
        List<Job_Requisition__c> requisitionList = [SELECT ID,Name,Job_Title__c,Job_Posting_Date__c,Experience_Required__c FROM Job_Requisition__c];
        return requisitionList;
    }
    
     @AuraEnabled(cacheable=true)
    public static List<Job_Requisition__c> getJobRequisitionDetail( String recordId){
        
        List<Job_Requisition__c> job = [SELECT ID,Name,Job_Title__c,Job_Contract__c,No_of_Candidate_Required__c,Reports_To_Title__c,Sub_Domain__c,Education_Required__c,General_Description__c,Job_Loaction__c,Job_Posting_Date__c,Reports_To_Name__c,Experience_Required__c FROM Job_Requisition__c WHERE Id =: recordId];
        
        return job;
    }

}