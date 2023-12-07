import { LightningElement } from 'lwc';
import FaceBookBlackLogo from '@salesforce/resourceUrl/FaceBookBlackLogo';
import InstaBlackLogo from '@salesforce/resourceUrl/InstaBlackLogo';


export default class VmsHomeComponent10 extends LightningElement {
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