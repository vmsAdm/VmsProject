import { LightningElement } from 'lwc';

export default class TwoGridsWithImages extends LightningElement {
    images1 = [
        { id: 1, url: 'URL_TO_IMAGE_1', alt: 'Image 1' },
        
        // Add more images as needed
    ];

    images2 = [
        { id: 3, url: 'URL_TO_IMAGE_3', alt: 'Image 2' },
        
        // Add more images as needed
    ];
}