<template>
    <div class="scroll" ref="wrapper">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
    export default{
      props:{
          probeType:{
              type:Number,
              default:1
          },
          click:{
              type:Boolean,
              default:true
          },
          scrollx:{
              type:Boolean,
              default:false
          },
        data:{
              type:Array,
              default:null
        },
        listenScroll:{
              type:Boolean,
              default:false
        }
      },
      data(){
          return{

          }
      },
       methods:{
           _initscroll(){
               if(!this.$refs.wrapper){
                   return
               }
               this.scroll = new BScroll(this.$refs.wrapper,{
                   probeType:this.probeType,
                   click: this.click,
                   scrollx:this.scrollx
               });
             if (this.listenScroll){
                 let me = this;
               this.scroll.on("scroll",(pos)=>{
                 me.$emit('scroll', pos);
               })
             }
           },
         disabled(){
               this.scroll&&this.scroll.disable();
         },
         eabled(){
             this.scroll&&this.scroll.enable();
         },
         refresh(){
             this.scroll&&this.scroll.refresh()
         },
         scrollTo(){
             this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
         }
       },
      watch:{
        data(){
            setTimeout(()=>{
                this.refresh()
            },20)
        }
      },
      mounted(){
           setTimeout(()=>{
             this._initscroll();
           },20);

      }
    }

</script>
<style>
  .scroll{
    height: 600px;
  }
  ul{
    padding:0 5px 0 5px;
    box-sizing: border-box;
    margin: 0;
  }
  ul li{
    width: 100%;
    text-align: left;
    font-size: 16px;
    box-sizing: border-box;
    list-style: none;
  }
  ul li:before{
    display: table;
    content: "";
  }
  ul li ul li{
    height: 50px;
    line-height:50px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
  }

</style>
