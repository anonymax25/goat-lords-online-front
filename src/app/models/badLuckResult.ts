import { Result } from "./result"

export class BadLuckResult extends Result {
    constructor(
        ids: number[], 
        isHidden: boolean, 
        dice: number, 
        isSherifResolve: boolean = false, 
        isActionDone: boolean = false, 
        isRedeemed: boolean = false,
        cardID: number = null,
        private playersRedeemedMap: Map<number, boolean> = new Map(),
        ){
            super(ids, isHidden, dice, isSherifResolve, isActionDone, isRedeemed, cardID)
            for(let id of ids) {
                playersRedeemedMap.set(id, false)
            }
        }

        set playersRedeemed(data: Map<number, boolean>){
            this.isRedeemed = this.isPlayerRedeemedMapTrue(data)
            this.playersRedeemedMap = data
        }

        get playersRedeemed(){
            return this.playersRedeemedMap
        }

        isPlayerRedeemedMapTrue(map: Map<number, boolean>): boolean {
            map.forEach((value: boolean, key: number) => {
                if(!value) return false
            });
            return true
        }

}