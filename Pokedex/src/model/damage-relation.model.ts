export class DamageRelation {
    doubleDamageFrom: Array<string>
    doubleDamageTo: Array<string>
    halfDamageFrom: Array<string>
    halfDamageTo: Array<string>
    noDamageFrom: Array<string>
    noDamageTo: Array<string>

    constructor(
        doubleDamageFrom: Array<string>, 
        doubleDamageTo: Array<string>, 
        halfDamageFrom: Array<string>, 
        halfDamageTo: Array<string>, 
        noDamageFrom: Array<string>, 
        noDamageTo: Array<string>
    ) 
    {
        this.doubleDamageFrom = doubleDamageFrom
        this.doubleDamageTo = doubleDamageTo
        this.halfDamageFrom = halfDamageFrom
        this.halfDamageTo = halfDamageTo
        this.noDamageFrom = noDamageFrom
        this.noDamageTo = noDamageTo
    }
}