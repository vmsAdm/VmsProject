import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
 
export default class LightningFileUpload extends LightningElement {
 
    // @api recordId;
    // get acceptedFormats() {
    //     return ['.png', '.PNG', '.jpg', '.JPG'];
    // }
 
    // handleUploadFinished(event) {
    //     const uploadedFiles = event.detail.files;
    //     this.showNotification(uploadedFiles.length + ' files are Uploaded Successfully', 'success');
    // }
 
    // showNotification(message, variant) {
    //     const evt = new ShowToastEvent({
    //         'message': message,
    //         'variant': variant
    //     });
    //     this.dispatchEvent(evt);
    // }
    @api recordId;
    uploadedFiles = [];

    get acceptedFormats() {
        return ['.png', '.PNG', '.jpg', '.JPG'];
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.uploadedFiles = uploadedFiles.map(file => ({
            name: file.name,
            documentId: file.documentId
        }));
        this.showNotification(uploadedFiles.length + ' file(s) uploaded successfully', 'success');
    }

    handleDownload(event) {
        const fileId = event.currentTarget.dataset.fileId;
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'filePreview'
            },
            state: {
                selectedRecordId: fileId
            }
        }).then(url => {
            window.open(url, '_blank');
        }).catch(error => {
            console.error('Error generating file download URL:', error);
        });
    }

    showNotification(message, variant) {
        const evt = new ShowToastEvent({
            'message': message,
            'variant': variant
        });
        this.dispatchEvent(evt);
    }
}