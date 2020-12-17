import { Rest, Hub, HubEventSelectorData, HubEventSelector } from '@nexjs/wsserver'
import { AnyData } from '../models'

export class CredentialsContract{

    // IName interface implementation
    public readonly service = 'credentialContract';

    @Hub( {
        validate: async ( instance, user, credential ) => {
            console.log( '[CredentialContract] [validation] onUpdate', credential )
            return true
        },
        select: async ( instance, user, userCredentials, serverCredentials ) => {
            console.log( '[CredentialContract] [selection] onUpdate', userCredentials, serverCredentials )
            return true
        },
    } )
    onUpdate = new HubEventSelector<string, string>();

    @Hub( {
        validate: async ( instance, user, credential ) => {
            console.log( '[CredentialContract] [validation] onDataUpdate', credential )
            return true
        },
        select: async ( instance, user, userCredentials, serverCredentials ) => {
            console.log( '[CredentialContract] [selection] onDataUpdate', userCredentials, serverCredentials )
            return true
        },
    } )
    onDataUpdate = new HubEventSelectorData<string, string, AnyData>();

    @Rest( )
    print (): void {
        console.log( '[CredentialContract] print()' )
    }

    @Rest()
    notify (): void {
        console.log( '[CredentialContract] notify()' )
        this.onUpdate.emit( 'serverCredentials-001' )
        this.onDataUpdate.emit( 'serverCredentials-002', { a: 'hello', b: true } as AnyData )
    }
}