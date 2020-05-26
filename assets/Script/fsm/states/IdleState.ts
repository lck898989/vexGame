import FSMState from "../FSMState";
import { FSMStateId } from "../common/FSMStateId";
import FSMBase from "../FSMBase";
import FSMTrigger from "../FSMTrigger";

const {ccclass, property} = cc._decorator;
@ccclass
export class IdleState extends FSMState {
    
    constructor() {
        super();
    }

    public init() {
        this.id = FSMStateId.Idle;
    }

    public enterState(fsm: FSMBase) {
        super.enterState(fsm);

        let firstClipName = fsm.ani.getClips()[0].name;
        fsm.ani.play(firstClipName);
    }
    public actionState(fsm: FSMBase) {

    }
    public existState(fsm: FSMBase) {

    }
}