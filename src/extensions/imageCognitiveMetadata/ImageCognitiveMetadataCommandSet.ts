import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse, IHttpClientOptions, HttpClientResponse, HttpClient } from '@microsoft/sp-http';

import * as strings from 'ImageCognitiveMetadataCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IImageCognitiveMetadataCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'ImageCognitiveMetadataCommandSet';

export default class ImageCognitiveMetadataCommandSet extends BaseListViewCommandSet<IImageCognitiveMetadataCommandSetProperties> {

  private cognitiveServicesKey: string = "[YOUR_KEY_HERE]";
  private cognitiveServicesVisionUrl: string = `https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Adult,Categories,Color,Description,Faces,ImageType,Tags&subscription-key=${this.cognitiveServicesKey}`;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized ImageCognitiveMetadataCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':        

        Log.info(LOG_SOURCE, 'COMMAND_1');
        console.log(event.selectedRows[0]);        

        const kk: ISPHttpClientOptions = { };
        const imageInfoUrl = event.selectedRows[0].getValueByName('.spItemUrl') + '&$select=@content.downloadUrl';
        this.context.spHttpClient.fetch(imageInfoUrl, SPHttpClient.configurations.v1, kk).then((response: SPHttpClientResponse) => {
            console.log(`Status text: ${response.statusText}`);
            response.json().then((responseJSON: any) => {
            console.log(responseJSON);
            const imageDownloadUrl: string = responseJSON['@content.downloadUrl'];
            console.log(imageDownloadUrl);

            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-type', 'application/json');
            requestHeaders.append('Cache-Control', 'no-cache');
    
            const body: string = JSON.stringify({
              'Url': imageDownloadUrl
            });
            const httpOptions: IHttpClientOptions = {          
              body: body,
              headers: requestHeaders
            }; 

            this.context.httpClient.post(this.cognitiveServicesVisionUrl, 
            HttpClient.configurations.v1, 
            httpOptions).then((cognitiveResponse: HttpClientResponse) => {
              // Access properties of the response object. 
              console.log(`Status code: ${cognitiveResponse.status}`);
              console.log(`Status text: ${cognitiveResponse.statusText}`);

              //response.json() returns a promise so you get access to the json in the resolve callback.
              cognitiveResponse.json().then((cognitiveResponseJSON: any) => {
                let tagsInfo: string = '';
                console.log(cognitiveResponseJSON);
                const tags: any = cognitiveResponseJSON.tags;
                tags.forEach(element => {
                  tagsInfo = tagsInfo.concat(element.name, ", ");
                });

                Dialog.alert(tagsInfo);
              }).catch((error: any) => {
                console.log(error);
                Dialog.alert(JSON.stringify(error));
              });
            });
          });
        });        
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
