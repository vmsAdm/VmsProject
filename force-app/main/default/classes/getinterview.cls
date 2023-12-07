public class getinterview
 {

@AuraEnabled(cacheable=true)
public static List <Interview__c> getResourcerecords()
{
 List<Interview__c> ll= [select Name,interview_Status__c,Interview_Mode__c,Interview_for_Possition__r.Name  from Interview__c];
System.debug('interview dtata' + ll);
return ll;

}
}