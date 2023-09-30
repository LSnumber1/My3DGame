import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {


    @property(Node)
    uiLevelFailure:Node;
    @property(Node)
    uiSuccess:Node;
    @property(Node)
    uiComplete:Node;

    start() {
        director.getScene().on('level_failed', this.onEvent_LevelFailed, this); 
        director.getScene().on('level_successful', this.onEvent_LevelSuccessful, this); 
    }

    update(deltaTime: number) {
        
    }

    onBtnReplay(){
        director.loadScene(director.getScene().name);
    }

    onBtnMainMenu(){
        director.loadScene('main');
    }

    onBtnNext(){
        let currentScene =  director.getScene().name;
        if(currentScene == 'level-001') {
            director.loadScene('level-002');
        }
        if(currentScene == 'level-002') {
            director.loadScene('level-003');
        } 
    }

    onEvent_LevelFailed(){
        this.uiLevelFailure.active = true;
    }

    onEvent_LevelSuccessful(){
        
        if(director.getScene().name == 'level-003') {
            this.uiComplete.active = true;
        } else {
            this.uiSuccess.active = true;
        }
    }
}

