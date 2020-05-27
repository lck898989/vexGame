import SkillData, { AttackType, SkillShape } from "../common/SkillData";
import ClassFactory from "../../utils/ClassFactory";
import SkillSelector from "../skillSelector/SkillSelector";

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

    public get SkillData() {
        return this.skillData;
    }
    public set SkillData(skill: SkillData) {
        this.skillData = skill;
    }

    onLoad () {

    }

    start () {

    }
    /** 初始化算法对象 */
    initReleaser() {
        /*** 技能选区规范命名：技能选取枚举名+ Selector 例如扇形选取 SectorSelector*/
        this.attackSelector = ClassFactory.getClass(`${AttackType[this.skillData.skillAttackType]}Selector`);

        /** 技能影响： 伤害生命，降低防御力，眩晕，减速等效果 */
        for(let i = 0; i < this.skillData.impactType.length; i++) {
            let impactItem = this.skillData.impactType[i];
            /** 利用发射获得影响效果的对象 */
            let impactClass = ClassFactory.getClass(`${impactItem}Impact`);
        }
    }

    update (dt) {

    }
}
