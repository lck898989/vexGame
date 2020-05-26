/***
 * 
 * 
 * 技能管理器
 * 
 * 
 */

import SkillData, { SkillImpact } from "../common/SkillData";
import ResourceManager from "../../managers/ResourceManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillManager extends cc.Component {

    /** 技能map 存储起来 */
    public skillDataMap: Map<string,SkillData> = new Map<string,SkillData>();

    /** 当前的技能 */
    public curSkill: SkillData = null;

    /** 向技能列表中添加技能 */
    public async generateSkill() {

        let skillData = new SkillData();
        skillData.id = 1;
        skillData.name = "波浪拳";
        skillData.description = "波浪拳，造成450真实伤害";
        skillData.attackDistance = 500;
        skillData.costSP = 10;
        skillData.atRatio = 1.5;
        skillData.coolTime = 10;
        skillData.impactType = [SkillImpact[0],SkillImpact[1]];
        skillData.nextComSkillId = 0;
        skillData.durationTime = 2;
        skillData.skillInterval = 2;
        skillData.owner = this.node;
        skillData.skillPrefab = await ResourceManager.getInstance().loadResourceByUrl("/prefab/wave_boxing.prefab",cc.Prefab);
        skillData.skillPrefabName = "wave_boxing";
        skillData.skillAnimationName = "waveboxing";
        
        this.skillDataMap.set(skillData.name,skillData);

        console.log("skillDataMap is ",this.skillDataMap);
    }

    /** 初始化技能预制体信息 */
    public initSkillPrefab(skillData: SkillData) {
        
    } 
    start () {
        this.generateSkill();
    }

    update (dt) {

    }
}
