<template>
  <div>
    <scroll :probeType = "probeType"
            @scroll="scroll"
            :listen-scroll="listenScroll"
            class="listview"
            ref="listview"
    >
      <ul>
        <li v-for="item in recommoned" ref="listGroup">
          <h2 class="index-list-anchor">{{item.main}}</h2>
          <ul>
            <li v-for="(city,index) in item.city">{{city}}</li>
          </ul>
        </li>
      </ul>
      <div class="index-list-nav">
        <ul>
          <li v-for="(item,index) in recommoned"
              :class="{'active': currentIndex === index}"
              @click="relive(index)">
            {{item.main}}
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>
<script>
   import scroll from 'components/scroll/scroll.vue'
   export default{
       data(){
           return {
               recommoned:[],
               currentIndex:0,
               scrollY:0
           }
       },
     created(){
        this.$http.get('/api/citynews').then((res)=>{
           var res = res.body;
           if(res.errno == 0){
             this.recommoned = res.data;
           }
        });
        this.listHeight = [];
        this.probeType = 3;
        this.listenScroll = true
     },
     components:{
        scroll
      },
     methods:{
       relive(index){
           this.currentIndex = index;
           this._scrollTo(index);
       },
       _calcHeight(){
           const list = this.$refs.listGroup;
           let height = 0;
           this.listHeight.push(height);
           for(var i = 0;i<list.length;i++){
              var cliHeight = list[i].clientHeight;
              height += cliHeight;
              this.listHeight.push(height);
           }
       },
       scroll(pos){
          this.scrollY = -pos.y;
         this._locationArea();
       },
       _locationArea(){
           for(var i=0;i<this.listHeight.length;i++){
               var height1 = this.listHeight[i];
               var height2 = this.listHeight[i+1];
             if(this.scrollY>=height1&&this.scrollY<height2){
               this.currentIndex = i;
               }
           }
       },
       _scrollTo(index){
           this.$refs.listview.scrollTo(0,-this.listHeight[index]);
       }
     },
     mounted(){
         setTimeout(()=>{
             this._calcHeight();
         },20)
     }
   }
</script>
<style>
   h2{
     background-color: #eee;
     margin-top: 0;
   }
   .index-list-nav {
     position: fixed;
     z-index: 30;
     right: 0;
     top: 50%;
     -webkit-transform: translateY(-50%);
     transform: translateY(-50%);
     font-family: Helvetica;
   }
   .active{
     color: #d4a550;
   }

</style>
