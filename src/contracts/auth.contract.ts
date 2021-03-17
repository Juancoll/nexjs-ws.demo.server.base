import { Rest, Hub, HubEvent, HubEventData } from '../wslib'
import { AnyData } from '../models'

export class AuthContract {
    public readonly service = 'authContract';
    public readonly isAuth = true;
    public readonly roles = ['admin']

    @Hub()
    onUpdate = new HubEvent();

    @Hub()
    onDataUpdate = new HubEventData<AnyData>();

    @Rest()
    print (): void {
        console.log( '[AuthContract] print()' )
    }

    @Rest()
    notify (): void {
        console.log( '[AuthContract] notify()' )
        this.onUpdate.emit()
        this.onDataUpdate.emit( { a: 'hola', b: true } )
    }
}