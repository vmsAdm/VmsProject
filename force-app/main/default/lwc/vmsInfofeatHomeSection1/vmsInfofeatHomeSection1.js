import { LightningElement } from 'lwc';
import InfofeatLogoResource from '@salesforce/resourceUrl/infofeatLogImageSection1';
import myPNG_icon from '@salesforce/resourceUrl/SocialMediaLogos';
export default class VmsInfofeatHomeSection1 extends LightningElement {

    imageSource=InfofeatLogoResource;

    facebookLogoUrl = myPNG_icon + '/socialmedia/FacebookLogo.png';//'https://resilient-narwhal-nan951-dev-ed.lightning.force.com/lightning/r/ContentDocument/0695j00000I6Ru9AAF/view';
    twitterLogoUrl = myPNG_icon + '/socialmedia/InstagramLogo.png';
    youtubeLogoUrl = myPNG_icon + '/socialmedia/twitterLogo.png';
    instagramLogoUrl = myPNG_icon + '/socialmedia/youtubeLogo.png';
}