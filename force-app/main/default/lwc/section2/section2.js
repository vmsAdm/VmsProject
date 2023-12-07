import { LightningElement } from 'lwc';
import myResource from '@salesforce/resourceUrl/VMSLogos';
import sampleResource from '@salesforce/resourceUrl/AmazonCeo';
import sampleResource1 from '@salesforce/resourceUrl/Computer_Image';
export default class Section2 extends LightningElement {
    computer6= sampleResource1;
    RocketLogo =  myResource + '/svgfolder/icons8-rocket-50.png';
    Speaker  =  myResource + '/svgfolder/icons8-46-66.png';
    HandShake =  myResource + '/svgfolder/icons8-handshake-64.png';
    TouchPad =  myResource + '/svgfolder/icons8-touchpad-80.png';

     goToInfofeatAboutUrl(event){
        window.open('https://infofeat.com/who-we-are/');
    }

     amazonCeoSection4 = sampleResource;
    
    handleContactUsClick(){
        const newURL = 'https://infofeat.com/contacts/';
        window.location.href = newURL;
    }
}