import FSMState from "../FSMState"
import { FSMStateId } from "../common/FSMStateId";
import FSMBase from "../FSMBase";
import ResourceManager from "../../managers/ResourceManager";

export default class DeadState extends FSMState {

    constructor() {
        super();
    }

    public init() { 
        this.id = FSMStateId.Dead;
    }

    /** 进入状态播放动画 */
    public async enterState(fsm: FSMBase) {
        let clip: cc.AnimationClip = await ResourceManager.getInstance().loadResourceByUrl("animations/boxing/fall_down.anim",cc.AnimationClip);
        console.log("clip is ",clip);
        let clipName: string = clip.name;
        // await new Promise((resolve,reject) => {
        //     let timeId = setTimeout(() => {
        //         fsm.ani.play(clipName);
        //         clearTimeout(timeId);
        //         resolve();
        //     },1000);
        // });
        /** 禁用状态机 */
        // fsm.enabled = false;
    }
    public actionState(fsm: FSMBase) {
        
    }

    public existState(fsm: FSMBase) {

    }
}