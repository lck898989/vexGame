/***
 * 
 * 技能系统数据类
 * 
 */
/** 攻击类型 */
export enum AttackType {
    /** 单攻 */
    SIGNAL,
    /** 群攻 */
    MORE
    
}
export enum SkillShape {
    RECT,
    TRIANGLE,
    /** 扇形 */
    SECTOR,
}
export enum SkillImpact {
    /** 生命值伤害 */
    Damage,
    /** 减少攻击力 */
    DownAttack
}
const {ccclass, property} = cc._decorator;
@ccclass
export default class SkillData {

    /** 技能id */
    @property({
        type: cc.Integer,
        displayName: "技能id",
        min: 0,
        max: 100,
        tooltip: "技能Id"
    })
    public id: number = 0;
    /** 技能名称 */
    @property({
        type: cc.String,
        displayName: "技能名称"
    })
    public name: string = "";
    /*** 技能描述 */
    public description: string;
    /** 攻击距离 在攻击距离内的才会受到伤害 */
    @property({
        type: cc.Integer,
        displayName: "攻击距离"
    })
    public attackDistance: number = 0;
    /** 法力消耗 */
    @property({
        type: cc.Integer,
        displayName: "法力消耗"
    })
    public costSP: number = 10;
    /** 攻击比率 实际为攻击比率* 基础攻击力 */
    @property({
        type: cc.Float,
        displayName: "攻击比率",
        tooltip: "与基础攻击力的倍率"
    })
    public atRatio: number = 1;

    /** 技能冷却时间 */
    @property({
        type: cc.Integer,
        displayName: "技能冷却时间"
    })
    public coolTime: number = 2;
    /** 技能冷却剩余时间 */
    public coolRemain: number;

    /** 技能影响类型（是掉血,减少攻击力 还是其他） */
    public impactType: string[] = [SkillImpact[0],SkillImpact[1]];
    /** 连击的下一个技能编号 */
    @property({
        type: cc.Integer,
        displayName: "连击的下一个技能编号"
    })
    public nextComSkillId: number = 0;

    /** 技能持续时间 */
    @property({
        type: cc.Integer,
        displayName: "技能持续时间"
    })
    public durationTime: number = 0;
    /** 技能间隔（技能每放一次所需要的时间 durationTime / skillInterval 代表可以释放该技能多少次） */
    @property({
        type: cc.Integer,
        displayName: "技能间隔"
    })
    public skillInterval: number = 0;

    /** 技能所属 */
    @property({
        type: cc.Node,
        displayName: "技能所属"
    })
    public owner: cc.Node;
    /** 技能预制件 */
    @property({
        type: cc.Prefab,
        displayName: "技能预制件"
    })
    public skillPrefab: cc.Prefab;
    /** 技能预制件名称 */
    @property({displayName: "技能预制件名称"})
    public skillPrefabName: string = "";
    /** 技能伴随的动画名称 */
    @property({displayName: "技能伴随的动画名称"})
    public skillAnimationName: string = "";
    /** 受击特效或者动画 */
    public hitObj: any;

    /** 攻击类型 */
    @property({
        type: cc.Enum(AttackType),
        displayName: "攻击类型"
    })
    public skillAttackType: AttackType = AttackType.SIGNAL;
    /** 攻击形状 */
    @property({
        type: cc.Enum(SkillShape),
        displayName: "攻击产生的形状"
    })
    public attachShaper: SkillShape = SkillShape.SECTOR;

}