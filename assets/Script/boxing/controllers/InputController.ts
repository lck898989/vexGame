/**
 * 
 * 
 * 输入控制类
 * 
 * 
 */

import SkillManager from "../../skillSystem/managers/SkillManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InputController extends cc.Component {

    onLoad () {
        // 开启物理系统
        // cc.director.getPhysicsManager().enabled = true;
        /** 开启碰撞 */
        cc.director.getCollisionManager().enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);

    }
    private keyDown(event: cc.Event.EventKeyboard): void {
        let code = event.keyCode;

        switch(code) {
            case cc.macro.KEY.a:
                let skillManager: SkillManager = this.node.getComponent("SkillManager");
                /** 释放技能 */
                skillManager.generateSkill("波浪拳");
                break;
        }



    }
    private keyUp(event: cc.Event): void {

    }
    start () {

    }
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this);
    }

    update (dt) {

    }
}
