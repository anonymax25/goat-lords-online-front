export class Result {
    constructor(public ids: number[], public isHidden: boolean, public dice: number, public isSherifResolve: boolean = false, public isActionDone: boolean = false, public isRedeemed: boolean = false, public cardID: number = null){}
}