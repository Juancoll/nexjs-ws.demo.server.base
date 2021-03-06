import { Rest, Hub, HubEventSelectorData, HubEventSelector } from '@nexjs/wsserver'
import { AnyData } from '../models'

export class AuthContract {

    // IName interface implementation
    public readonly service = 'authContract';

    @Hub( {
        isAuth: true,
    } )
    onUpdate = new HubEventSelector<string, string>();

    @Hub( {
        isAuth: true,
    } )
    onDataUpdate = new HubEventSelectorData<string, string, AnyData>();

    @Rest( {
        isAuth: true,
    } )
    print (): void {
        console.log( '[AuthContract] print()' )
    }

    @Rest( {
        isAuth: true,
    } )
    notify (): void {
        console.log( '[AuthContract] notify()' )
        this.onUpdate.emit( 'serverCredentials-001' )
        this.onDataUpdate.emit( 'serverCredentials-002', { a: 'hello', b: true } as AnyData )
    }
}