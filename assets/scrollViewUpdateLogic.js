
cc.Class({
    extends: cc.Component,

    properties: {
        updateLabel:        cc.Label,
        arrow:              cc.Node,
        zhuan:              cc.Node,
        scrollView:         cc.ScrollView,
        showUpdate:         cc.Node,
        scrollViewContent:  cc.Node
    },

    start () {
        this.currTime = 0;
        this.showLoadUI = false;
    },

    onEnable() {
        this.scrollViewPosY = this.scrollViewContent.y;
    },

    //刷新完成之后，隐藏刷新节点和重新设置滑动
    refreshFinish(){
        this.scrollView.vertical = true;
        this.showUpdate.active   = false;
    },

    update(dt){
        this.currTime += dt*1000;
        if(this.currTime >= 200){

            if( this.scrollView.isScrolling() === false     &&
            this.scrollView.isAutoScrolling() === false){
                
                if(this.showLoadUI){
                    this.showLoadUI = false;
                    this.showUpdate.active = true;
                    this.changeStatus(2);
                    this.scrollView.vertical = false;   //刷新过程中禁止滑动

                    setTimeout(() => {
                        this.refreshFinish();
                    }, 1000);
                }
                
                this.currTime = 0;
                return;
            }

            if(this.scrollViewPosY-this.scrollViewContent.y >= 30  &&
                this.scrollViewPosY-this.scrollViewContent.y < 90 ){
                console.log("update 150~230");
                this.showUpdate.active = true;
                this.changeStatus(0);
                this.showLoadUI = true;
            }else if(this.scrollViewPosY-this.scrollViewContent.y >= 90){
                console.log("update >230");
                this.showUpdate.active = true;
                this.changeStatus(1);
                this.showLoadUI = true;
            }

            this.currTime = 0;
        }
    },

    changeStatus(flag){
        if(flag === 0){
            this.updateLabel.string = "下拉刷新";
            this.arrow.scaleY = -1;
            this.arrow.active = true;
            this.zhuan.active = false;
        }else if(flag === 1){
            this.updateLabel.string = "释放刷新";
            this.arrow.scaleY = 1;
            this.arrow.active = true;
            this.zhuan.active = false;
        }else{
            this.updateLabel.string = "加载中";
            this.arrow.scaleY = -1;
            this.arrow.active = false;
            this.zhuan.active = true;
            this.zhuan.stopAllActions();
            this.zhuan.runAction(cc.repeatForever(cc.rotateBy(0.5,360)));
        }
    }

    // update (dt) {},
});
