import SkillData, { AttackType, SkillShape, Direction } from "../common/SkillData";
import ClassFactory from "../../utils/ClassFactory";
import SkillSelector from "../skillSelector/ISkillSelector";
import IImpact from "../impact/IImpact";
import ResourceManager from "../../managers/ResourceManager";
import Player from "../../fsm/Player";
import AnimationManager from "../../managers/AnimationManager";
// import {Direction} from "../common/SkillData"

/**
 * 
 * 
 * 技能释放器
 * 
 * 
 */
const {ccclass, property} = cc._decorator;
@ccclass
export default abstract class SkillReleaser extends cc.Component {

    /** 技能释放器的技能数据 */
    private skillData: SkillData = null;

    /** 选取算法对象 */
    private attackSelector: SkillSelector = null;

    /** 技能节点 */
    private skillNode: cc.Node = null;

    /** 影响效果数组 */
    private IimpactEffects: IImpact[] = [];

    public get SkillData() {
        return this.skillData;
    }
    public set SkillData(skill: SkillData) {

        this.skillData = skill;

        /** 玩家播放动画 */
    
        this.skillData.owner.getComponent(Player).playAnimation(this.skillData.skillAnimationName);
        /** 创建算法对象 */
        this.initReleaser();
    }
    private async playskillAnim() {
        let delay  = this.skillData.skillDelay;
        if(this.skillData.skillDelay > 0) {
            await new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve();
                },delay * 1000);
            })
        }
        let skillAnim: cc.Animation = this.skillNode.getComponent(cc.Animation);
        if(skillAnim) {
            /** 播放技能动画 */
            skillAnim.play(this.skillData.skillAnimationName + "_skill",0);

        }
    }
    public set SkillNode(skillNode: cc.Node) {
        this.skillNode = skillNode;
    }
    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        // console.log('on collision enter');
        if(other.node.group === 'player' && other.node !== this.skillData.owner && !other.node.getComponent(Player).isDead) {
            console.log("击中对手了");
            /** 计算技能影响 */
            this.dealImpacts(other.node);
            // 告诉技能管理器回收技能
            cc.director.emit("collect_skill",this.skillNode);
        } else if(other.node.group === "wall") {
            /** 回收节点到节点池 */
            cc.director.emit("collect_skill",this.skillNode);
        }
        
    }
    onLoad () {

    }

    start () {
        cc.director.on("animation_finish",this.playskillAnim,this);
    }
    onDestroy() {
        cc.director.off("animation_finish",this.playskillAnim,this);
    }
    onDisable() {
        cc.director.off("animation_finish",this.playskillAnim,this);
    }
    /**
     * 计算影响
     * 
     * @param  {cc.Node} node 目标对象
     * @returns void
     */
    dealImpacts(node: cc.Node): void {
        /** 开始运行伤害 */
        this.IimpactEffects.forEach((item,index) => {
            item.impactRun(node,this.skillData);
        });
    }

    /** 初始化算法对象 */
    initReleaser() {
        /*** 技能选区规范命名：技能选取枚举名+ Selector 例如扇形选取 SectorSelector*/
        // this.attackSelector = ClassFactory.getClass(`${AttackType[this.skillData.skillAttackType]}Selector`);

        /** 技能影响： 伤害生命，降低防御力，眩晕，减速等效果 */
        for(let i = 0; i < this.skillData.impactType.length; i++) {
            let impactItem = this.skillData.impactType[i];
            /** 利用发射获得影响效果的对象 */
            let impactClass = ClassFactory.getClass(`${impactItem}Impact`);
            this.IimpactEffects.push(impactClass);
        }
    }

    update (dt) {
        if(this.skillNode && this.skillData.isCanMove) {
            switch(this.skillData.spreadDir) {
                case Direction.RIGHT:
                        this.skillNode.scaleX = 1;
                        this.skillNode.x += this.skillData.skillSpeed * dt;
                    break;
                    case Direction.LEFT:
                        this.skillNode.scaleX = -1;
                        this.skillNode.x -= this.skillData.skillSpeed * dt;
                    break;
                case Direction.UP:
                    break;
                case Direction.DOWN:
                    break;             
            }
        }
    }
}
