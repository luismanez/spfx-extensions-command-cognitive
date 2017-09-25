import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'ImageCognitiveMetadataCommandSetStrings';

import { Dialog } from '@microsoft/sp-dialog';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IImageCognitiveMetadataCommandSetProperties {
  // This is an example; replace with your own property
  visible: boolean | undefined;
}

const LOG_SOURCE: string = 'ImageCognitiveMetadataCommandSet';

export default class ImageCognitiveMetadataCommandSet
  extends BaseListViewCommandSet<IImageCognitiveMetadataCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized ImageCognitiveMetadataCommandSet');
    return Promise.resolve<void>();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const command: Command | undefined = this.tryGetCommand('GET_IMAGE_METADATA');
    if (command) {
      Log.info(LOG_SOURCE, `Command ${command.id} loaded`);
      if (event.selectedRows.length === 1) {
        command.visible = true;        
      } else {
        command.visible = false;
      }      
      this.properties.visible = command.visible;
    }    
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.commandId) {
      case 'GET_IMAGE_METADATA':
        alert(`Clicked ${strings.Command1}`);
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
