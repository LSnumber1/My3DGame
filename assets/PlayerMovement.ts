import { _decorator, Component, director, EventKeyboard, Input, input, KeyCode, Node, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerMovement')
export class PlayerMovement extends Component {

    @property(RigidBody)
    rigidBody: RigidBody;

    @property
    speed: Number = 0; //move speed

    @property
    foewardForce: number = 0; //move speed

    @property
    sideForce: number = 0; //move speed

    isLeftDown: boolean = false;
    isRightDown: boolean = false;

    start() {
        console.log("PlayerMovement start");
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(deltaTime: number) {
        let froce = new Vec3(0, 0, this.foewardForce * deltaTime);
        this.rigidBody.applyForce(froce, froce);

        if (this.isLeftDown) {
            let leftForce = new Vec3(this.sideForce * deltaTime, 0, 0);
            this.rigidBody.applyForce(leftForce);
        }

        if (this.isRightDown) {
            let rightForce = new Vec3(-this.sideForce * deltaTime, 0, 0);
            this.rigidBody.applyForce(rightForce);
        }

        if(this.node.position.y < -10) {
            console.log("game fail");
            this.enabled =false;
            director.getScene().emit('level_failed');       
        }
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {

        if (event.keyCode == KeyCode.KEY_A) {
            this.isLeftDown = true;
            console.log("PlayerMovement onKeyDown");
        }
        if (event.keyCode == KeyCode.KEY_D) {
            this.isRightDown = true;
            console.log("PlayerMovement onKeyUp");
        }
    }

    onKeyUp(event: EventKeyboard) {

        if (event.keyCode == KeyCode.KEY_A) {
            this.isLeftDown = false;
            console.log("PlayerMovement onKeyUp");
        }
        if (event.keyCode == KeyCode.KEY_D) {
            this.isRightDown = false;
            console.log("PlayerMovement onKeyUp");
        }
    }
}

