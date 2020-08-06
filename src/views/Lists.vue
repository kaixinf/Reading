<template>
  <div class="content">
    <div class="con_lists">
      <div style="background:#fff;width:750px;padding:20px 10px 20px 10px">
        <div class="media" v-for="(article,index) in articles" :key="index">
         
            <div class="media-left media-middle">
              <img class="media-object" src="../img/111.jpg" alt style="width:200px;height:180px" />
            </div>
            <div class="media-body">
               <router-link :to="'/detail/'+article.id">
              <h4 class="media-heading" style="text-align:left">{{article.title}}</h4>
                </router-link>
              <div class="person">
                <span><img src="../img/ico-pen.png" alt="">{{article.author}}</span>
                <span><img src="../img/ico-h.png" alt="">{{article.podcast}}</span>
                <span><img src="../img/ico-time.png" alt="">{{article.created_time}}</span>
                <span><img src="../img/ico-er.png" alt="">{{article.play_time}}</span>
              </div>
              <div class="conts">{{article.content}}</div>
            </div>
        
        </div>
      </div>
      <router-view name="right"></router-view>
      <router-view name="Page" @sendPage="getPage"></router-view>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      articles: [],
      page:1
    };
  },
  created() {
    this.axios("http://localhost:3000/api/articles/1/page/1")
      .then(res => {
        this.articles = this.articles.concat(res.data.res.articles);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods:{
    getPage(data){  //点击分页获取数据
      this.articles=[]
      this.page=data
      console.log(777,this.page)
      console.log(22222,data)
      this.axios("http://localhost:3000/api/articles/"+this.$store.state.ticket+"/page/"+this.page)
      .then(res => {
        this.articles = this.articles.concat(res.data.res.articles);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  watch: { //监听路由(tab切换)
    $route: {
      handler(to) {
        this.articles = [];
        this.axios(
          "http://localhost:3000/api/articles/" + to.params.type_id + "/page/"+this.page
        )
          .then(res => {
            this.$store.state.ticket=to.params.type_id
            this.articles = this.articles.concat(res.data.res.articles);
          })
          .catch(err => {
            console.log(err);
          });
      }
      //页面刚加载进去就立即执行
    }
  }
  
};
</script>>
<style>
/* 内容区 */
.content {
  padding-top: 50px;
  padding-bottom: 20px;
  width: 100%;
  background: #f6f6f6;
}
.con_lists {
  margin-top: 20px;
  position: relative;
  width: 1220px;
  margin: 0 auto;
}
/* 标题颜色 */
.media-body a{
  color: #222;
}
.media-body a:hover{
  text-decoration: none;
}
.media-body a:focus{
  color: #c33;
}
.person {
  margin-top: 15px;
  text-align: left;
}
.person span {
  padding-right: 15px;
  color: #b6b6b6;
}
.person span img{
  margin-top: -6px;
  margin-right: 5px;
  width: 15px;
  height: 15px;
}
.conts {
  margin-top: 20px;
  line-height: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

</style>