/***
 * 
 * 
 * 技能管理器
 * 
 * 
 */

import SkillData, { SkillImpact, Direction } from "../common/SkillData";
import ResourceManager from "../../managers/ResourceManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillManager extends cc.Component {

    /** 技能map 存储起来 */
    public skillDataMap: Map<string,SkillData> = new Map<string,SkillData>();

    /** 当前的技能 */
    public curSkill: SkillData = null;

    /** 当前的技能节点 */
    public curSkillNode: cc.Node = null;

    /** 将所需要的技能添加到该节点下 */
    public generateSkill(skillName: string) {   
        if(this.skillDataMap.get(skillName)) {
            let skillDataItem: SkillData = this.skillDataMap.get(skillName);
            this.curSkill = skillDataItem;

            /** 所有者是自己 */
            if(skillDataItem.owner === this.node && skillDataItem.skillPrefab) {
                this.curSkillNode = cc.instantiate(skillDataItem.skillPrefab);

                this.node.addChild(this.curSkillNode);
            }
        }
    }

    /** 初始化技能预制体信息 应该率先初始化这些技能缓存防止释放技能时候卡顿 */
    public async initSkillData() {
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

        skillData.isCanMove = true;
        skillData.skillSpeed = 100;
        skillData.spreadDir = Direction.RIGHT;
        
        this.skillDataMap.set(skillData.name,skillData);
    } 
    start () {
        /** 填充技能映射表 */
        this.initSkillData();
    }

    update (dt) {
        /** 更新技能的位置 */
        if(this.curSkillNode) {
            this.curSkillNode.x += this.curSkill.skillSpeed * dt;
        }

        /** 检测技能是否碰撞到敌人 */


        
    }
}
