import { LightningElement } from 'lwc';
import myResource from '@salesforce/resourceUrl/VMSLogos';
import sampleResource from '@salesforce/resourceUrl/AmazonCeo';
import sampleResource1 from '@salesforce/resourceUrl/Computer_Image';
import saleforcepartnerlogo from '@salesforce/resourceUrl/saleforcepartnerlogo';
import nasscomlogo  from '@salesforce/resourceUrl/nasscomlogo';
import infofeatlogo from '@salesforce/resourceUrl/infofeatlogo';
import address_logo from '@salesforce/resourceUrl/address_logo';
import Email_logo   from '@salesforce/resourceUrl/Email_logo';
import Call_logo    from '@salesforce/resourceUrl/Call_logo';
import insta_logo   from '@salesforce/resourceUrl/Insta_logo';
import LN_logo      from '@salesforce/resourceUrl/LN_logo';
import myResource2 from '@salesforce/resourceUrl/Logo2';
import FaceBookBlackLogo from '@salesforce/resourceUrl/FaceBookBlackLogo';
import InstaBlackLogo from '@salesforce/resourceUrl/InstaBlackLogo';


export default class Home_Page_Container extends LightningElement {

  RocketLogo =  myResource + '/svgfolder/icons8-rocket-50.png';
    Speaker  =  myResource + '/svgfolder/icons8-46-66.png';
    HandShake =  myResource + '/svgfolder/icons8-handshake-64.png';
    TouchPad =  myResource + '/svgfolder/icons8-touchpad-80.png';
        computer6= sampleResource1;
        Logo2 = myResource2;
    amazonCeoSection4 = sampleResource;
    
    handleContactUsClick(){
        const newURL = 'https://infofeat.com/contacts/';
        window.location.href = newURL;
    }

    /*footer javascript*/
     saleforcepartnerlogo= saleforcepartnerlogo;
    nasscomlogo  =  nasscomlogo;
    infofeatlogo =  infofeatlogo;
    address_logo =  address_logo;
    Email_logo   =  Email_logo;
    Call_logo    =  Call_logo;
    insta_logo   =  insta_logo;
    LN_logo      =  LN_logo;

    // 10section
        name = '';
        email = '';
        message = '';

    // Define URLs for social media icons
    FaceBookBlackLogo = FaceBookBlackLogo;
    instagramBlackLogo = InstaBlackLogo;

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleMessageChange(event) {
        this.message = event.target.value;
    }
}