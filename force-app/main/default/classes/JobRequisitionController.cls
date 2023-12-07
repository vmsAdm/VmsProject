public with sharing class JobRequisitionController {
    @AuraEnabled(cacheable=true)
    public static List<String> getJobTitles() {
        List<String> jobTitles = new List<String>();
        
        Schema.DescribeFieldResult fieldResult = Job_Requisition__c.Job_Title__c.getDescribe();
        List<Schema.PicklistEntry> picklistValues = fieldResult.getPicklistValues();

        for (Schema.PicklistEntry entry : picklistValues) {
            jobTitles.add(entry.getLabel());
        }

        return jobTitles;
    }
}