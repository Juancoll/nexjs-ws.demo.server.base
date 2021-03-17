import { Rest, HubEvent, HubEventData, Hub, Data } from '../wslib'
import { AnyData } from '../models'

export class BaseContract {
    public readonly service = 'baseContract';

    @Hub()
    onUpdate = new HubEvent();

    @Hub()
    onDataUpdate = new HubEventData<AnyData>();

    @Rest()
    print (): void{
        console.log( '[BaseContract] print()' )
    }

    @Rest()
    delay ( @Data() value: number ): Promise<number> {
        console.log( `[BaseContract] delay(${value})` )
        return new Promise<number>( ( resolve, reject ) => {
            setTimeout( () => {
                resolve( value )
                console.log( '[BaseContract] delay(...) : send response' )
            }, value )
        } )
    }

    @Rest()
    notify (): void {
        console.log( '[BaseContract] notify()' )
        this.onUpdate.emit()
        this.onDataUpdate.emit( { a: 'hello', b: true } as AnyData )
    }
}