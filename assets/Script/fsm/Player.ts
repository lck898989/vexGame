
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    /** 英雄的血量 */
    @property({
        type: cc.Integer,
        displayName: "血量",
        min: 0,
        step: 1,
        slide: true,
        max: 2000,
        visible() {
            return true;
        }
    })
    public hp: number = 100;

    /** 基础攻击力 300 即平a造成的伤害 */
    public baseAttack: number = 300;

   
    /** 英雄是否死亡 */
    private isDead: boolean = false;

    onLoad () {

    }

    start () {

    }

    update (dt) {

    }
}
