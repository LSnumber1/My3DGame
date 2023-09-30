import { _decorator, BoxCollider, Component, director, ICollisionEvent, ITriggerEvent, Node } from 'cc';
import { PlayerMovement } from './PlayerMovement';
const { ccclass, property } = _decorator;

@ccclass('PlayerCollision')
export class PlayerCollision extends Component {
    start() {
        let collider = this.node.getComponent(BoxCollider);
        collider.on("onCollisionEnter", this.onCollisionEnter,this); 
        collider.on("onTriggerEnter", this.onTriggerEnter,this); 
    }

    onCollisionEnter(event: ICollisionEvent) {
       
        if(event.otherCollider.node.name == "Obstacle") {
            console.log("hit");
            let movement = this.node.getComponent(PlayerMovement);
            movement.enabled = false;
            director.getScene().emit('level_failed');  
        }
    }

    onTriggerEnter(event: ITriggerEvent) {
        console.log("You Win");
        let movement = this.node.getComponent(PlayerMovement);
        movement.enabled = false;
        director.getScene().emit('level_successful');       
    }

    update(deltaTime: number) {
        
    }

   protected onDestroy(): void {
       let collider = this.node.getComponent(BoxCollider);
       collider.off("onCollisionEnter", this.onCollisionEnter, this);
       collider.off("onTriggerEnter", this.onCollisionEnter,this); 
   }
}



