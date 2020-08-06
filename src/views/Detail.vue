<template>
  <div class="container">
    <div class="details">
      <div v-for="(detail,index) in details" :key="index" style="display:flex">
        <div style="width: 750px;">
          <div class="top">
            <p class="title">{{detail.title}}</p>
            <div class="top_person">
              <p>
                <span>
                  <img src="../img/ico-pen.png" alt />
                  {{detail.author}}
                </span>
                <span>
                  <img src="../img/ico-er.png" alt />
                  {{detail.podcast}}
                </span>
                <span>
                  <img src="../img/ico-time.png" alt />
                  {{detail.duration}}
                </span>
              </p>
              <p>
                播放：
                <span style="font-size:18px">{{detail.count}}</span>次
              </p>
            </div>
            <audio
              style="width:100%;margin-top:60px"
              src="http://m10.music.126.net/20200623202150/5545b85da0e57481670e7f23b22e25ed/ymusic/b3ef/a73b/2912/6aaf5fef2aac1e1ccbaca792918c456a.mp3"
              controls
              autoplay
              loop
            ></audio>
          </div>
          <div class="bot">
            <div v-html="detail.content" class="content_dd"></div>
            <div class="spread">
              <span @click="an" class="spread_t">展开全文</span>
              <img src="../img/next.png" alt id="imgs_next" />
            </div>
          </div>
          <div class="foot_1">
            <div>
              <b>标签：</b>
              <span
                style="color:#b6b6b6;word-spacing:10px;font-size:13px"
              >{{detail.labels.split(",").join(" ")}}</span>
            </div>
            <div class="share">
              <img src="../img/wbo.png" alt />
              <img src="../img/dou.png" alt />
              <img src="../img/QQ.png" alt />
              <img src="../img/wxin.png" alt />
            </div>
          </div>
          <div class="slide">
            <div class="previous">
              <span @click="pre(parseInt(detail.id)-1)">
                <img src="../img/ico-left.png" alt />上一篇
              </span>
            </div>
            <div class="next">
              <span @click="nex(parseInt(detail.id)+1)">
                下一篇
                <img src="../img/ico-right.png" alt />
              </span>
            </div>
          </div>
          <div class="discuss">
            <div class="published">
              <input id="dis_cont" type="text" placeholder="说点什么吧！" />
              <button @click="discuss">评论</button>
            </div>
            <div class="dis_lists">
              <p>最新评论({{get_length}})</p>
              <div>
                <span v-if="get_length==0">暂无评论</span>
                <ul v-else id="disscuss_lists">
                  <li v-for="(item,index) in dis_items" :key="index">
                    <span>{{item.content}}</span>
                    <button @click="del_btn(item.id)">删除</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="details_r">
          <div class="t_top">
            <div style="border-bottom:1px solid #e5e5e5">
              <p class="top_author">
                {{detail.author}}
                <img src="../img/ico-h.png" alt style="width:15px;height:15px" />
              </p>
              <div class="top_about">
                <div>
                  <p>作品：7</p>
                  <p>粉丝：91</p>
                </div>
                <div class="focus_on">
                  <button @click="like" id="like_cc">关注</button>
                </div>
              </div>
            </div>
            <div class="t_bot">
              <div style="display:flex;box-sizing:border-box">
                <div>
                  <img src="../img/good.png" alt />
                </div>
                <span style="margin-top:13px;padding-left:10px">0</span>
              </div>
              <div style="display:flex">
                <div>
                  <img src="../img/like.png" alt />
                </div>
                <span style="margin-top:13px;padding-left:10px">0</span>
              </div>
              <div>
                <div>
                  <img src="../img/enjoy.png" alt />
                </div>
              </div>
            </div>..
          </div>
          <div class="t_cen" style="height:182px">
            <div class="other">
              <div class="other_l">
                <i></i>
                <span>其他相关节目</span>
              </div>
              <div class="other_r">
                <button @click="getslide1">
                  <img src="../img/ico-left.png" alt />
                </button>
                <button @click="getslide1">
                  <img src="../img/ico-right.png" alt />
                </button>
              </div>
            </div>
            <div class="slide_con">
              <div
                style="cursor:default"
                v-for="(slides,index) in slide.slice(0,4)"
                :key="index"
                @click="change_one(slides.id)"
              >{{slides.title}}</div>
            </div>
          </div>
          <div class="t_cen">
            <div class="other">
              <div class="other_l">
                <i></i>
                <span>{{get_title}}FM频道其他相关节目</span>
              </div>
              <div class="other_r">
                <span style="font-size:13px">
                  查看全部
                  <img
                    src="../img/ico-right.png"
                    alt
                    style="width:15px;height:15px;margin-top:-2px;margin-left:5px"
                  />
                </span>
              </div>
            </div>
            <ul class="other_lists">
              <li v-for="(all,index) in alls" :key="index">
                <p
                  @click="change_con(all.id)"
                  style="cursor:default"
                  class="change_articles"
                >{{all.title}}</p>
                <p>
                  <span>文：{{all.author}}</span>
                  <span>主播：{{all.podcast}}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      details: [],
      txt: "展开全文",
      slide: [],
      alls: [],
      dis_items: []
    };
  },

  created() {
    // 页面刚加载进去 调用轮播
    this.getslide1();
    // 悦读其他节目
    this.other_pro();
  },
  // 监听路由 (点击上一篇下一篇)
  watch: {
    $route: {
      handler(to) {
        this.details = [];
        this.axios(
          "http://localhost:3000/api/article/" + this.$route.params.id
        ).then(res => {
          this.details = this.details.concat(res.data.res);
        });
        // 渲染评论列表  监听路由 切换文章的时候有路由变化
        this.dis_items = [];
        this.axios(
          "http://localhost:3000/api/comments/" + to.params.id + "/page/1"
        ).then(res => {
          if (res.data.res_msg == "暂无评论") {
            this.$store.state.length = 0; //没有评论的时候就让length这个值为0
          } else {
            this.$store.state.length = res.data.res.length; //把content的length
            this.dis_items = this.dis_items.concat(res.data.res);
            console.log(this.$store.state.length);
          }
        });
      },
      immediate: true //页面刚加载立即执行
    }
  },
  computed: {
    get_title(){
      return this.$store.state.title
    },
    get_length() {
      return this.$store.state.length;
    }
  }, //this.$store报错 用computed计算一下 运用于页面
  methods: {
    other_pro() {
      this.alls = [];
      this.axios(
        "http://localhost:3000/api/articles/" +
          this.$store.state.ticket +
          "/rand"
      ).then(res => {
        console.log(22, this.$store.state.index);
        console.log(11111, res.data);
        this.alls = res.data.res;
      });
    },
    // 点击右侧的五篇文章内容发生改变
    change_con(id) {
      this.$router.push({ path: "/detail/" + id });
    },
    // 点击轮播 内容改变
    change_one(id) {
      this.$router.push({ path: "/detail/" + id });
    },
    an() {
      var text = document.getElementsByClassName("spread_t")[0];
      var imgs_next = document.getElementById("imgs_next");
      var content_dd = document.getElementsByClassName("content_dd")[0];
      if (text.innerHTML == this.txt) {
        content_dd.style.webkitLineClamp = 1000;
        text.innerHTML = "收起全文";
        imgs_next.style.transform = "rotate(180deg)";
      } else {
        content_dd.style.webkitLineClamp = 10;
        text.innerHTML = "展开全文";
        imgs_next.style.transform = "rotate(0deg)";
      }
    },
    // 上一篇下一篇
    pre(r) {
      this.$router.push({ path: "/detail/" + r });
      this.other_pro();
    },
    nex(r) {
      this.$router.push({ path: "/detail/" + r });
      this.other_pro();
    },
    // 点击加关注
    like() {
      if (this.$store.state.user == null) {
        alert("请先登陆");
      } else {
        var like_cc = document.getElementById("like_cc");
        console.log(like_cc.innerHTML);
        if (like_cc.innerHTML == "关注") {
          like_cc.innerHTML = "已关注";
        } else {
          like_cc.innerHTML = "关注";
        }
      }
    },
    // 文章轮播
    getslide1() {
      this.slide = [];
      this.axios("http://localhost:3000/api/articles/rand")
        .then(res => {
          this.slide = this.slide.concat(res.data.res);
        })
    },
    // 添加评论
    discuss() {
      var marks = this.$store.state.mark;
      var dis_cont = document.getElementById("dis_cont");
      // 评论时判断是否登陆 是否内容为空
      if (this.$store.state.user == null) {
        alert("请先登陆");
        dis_cont.value = "";
        this.dis_items = null;
      } else if (dis_cont.value == "") {
        alert("评论内容不能为空");
      } else {
        this.axios
          .post(
            "http://localhost:3000/api/comment",
            {
              article_id: this.$route.params.id,
              content: dis_cont.value //评论添加进数据库
            },
            {
              headers: {
                Authorization: `Bearer ${marks}`
              }
            }
          )
          .then(res => {
            console.log(5555, res);
          });
      }
      dis_cont.value = "";
      // 渲染评论列表
      this.dis_items = [];
      this.axios(
        "http://localhost:3000/api/comments/" +
          this.$route.params.id +
          "/page/1"
      ).then(res => {
        this.dis_items = this.dis_items.concat(res.data.res);
        this.$store.state.length = res.data.res.length;
        // console.log(this.$store.state.length);
      });
    },
    // 删除评论
    del_btn(id) {
      var marks = this.$store.state.mark;
      console.log(id);
      this.axios
        .delete("http://localhost:3000/api/comment/" + id, {
          headers: {
            Authorization: `Bearer ${marks}`
          }
        })
        .then(res => {
          console.log(res.data);
        });
      // this.dis_items=[]
      this.axios(
        "http://localhost:3000/api/comments/" +
          this.$route.params.id +
          "/page/1"
      ).then(res => {
        if (res.data.res_msg == "暂无评论") {
          this.$store.state.length = 0;
        } else {
          // console.log(4444, res.data.res);
          this.dis_items = res.data.res;
          this.$store.state.length = res.data.res.length;
        }
      });
    }
  }
};
</script>
<style>
.container {
  width: 100%;
  background: #f6f6f6;
}
.details {
  width: 1220px;
  margin: 0 auto;
}
.top {
  padding: 30px 35px;
  margin-top: 30px;
  height: 250px;
  background: #fff;
}
.title {
  margin-bottom: 0;
  font-size: 18px;
  color: #222;
  font-weight: 400;
}
.top_person {
  display: flex;
  justify-content: space-between;
}
.top_person p {
  color: #b6b6b6;
}
.top_person p:nth-of-type(1) {
  line-height: 28px;
}

.top_person span {
  margin-right: 20px;
}
.top_person span img {
  margin-top: -4px;
  margin-right: 5px;
  width: 15px;
  height: 15px;
}
.bot {
  margin-bottom: 25px;
  color: #b6b6b6;
  line-height: 30px;
  text-indent: 2rem;
  margin-top: 30px;
  height: auto;
  background: #fff;
  padding: 30px 40px;
}
.content_dd {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
}
.spread {
  cursor: default;
  text-align: right;
}
.spread img {
  vertical-align: middle;
  width: 15px;
  height: 17px;
}
.foot_1 {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding: 5px 40px;
  background: #fff;
}
.share img {
  vertical-align: middle;
  width: 21px;
  height: 21px;
  margin-left: 7px;
}
/* 上一篇 下一篇 */
.slide {
  display: flex;
  padding: 0 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  justify-content: space-between;
}
.slide div {
  cursor: pointer;
}
.slide img {
  width: 15px;
  height: 15px;
}
/* 评论 */
.published {
  background: #fff;
}
.published input {
  width: 90%;
  outline: none;
  border: none;
  padding: 15px 10px;
}
.published button {
  color: #fff;
  width: 10%;
  border: none;
  outline: none;
  padding: 15px 20px;
  background: #c33;
}
.dis_lists {
  margin-bottom: 20px;
  margin-top: 30px;
}
.dis_lists p {
  width: 150px;
  text-align: center;
  color: #c33;
  padding: 10px 20px;
  background: #fff;
}
.dis_lists div {
  text-align: center;
  padding: 30px 0;
  width: 100%;
  background: #fff;
  margin-top: -10px;
}
.dis_lists div ul {
  text-align: left;
  list-style: none;
}
.dis_lists div ul li {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #e5e5e5;
}
.dis_lists div ul li button {
  border: none;
  outline: none;
  background: #fff;
  color: #c33;
}
/* 右侧导航栏 */
.details_r {
  width: 440px;
  box-sizing: border-box;
  margin-left: 50px;
  margin-top: 30px;
}
.t_top {
  background: #fff;
  width: 100%;
}
.top_author {
  text-align: center;
  padding-top: 20px;
  font-size: 17px;
}
.top_about {
  width: 48%;
  margin-left: 137px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.focus_on button {
  color: #fff;
  margin-top: 8px;
  padding: 7px 13px;
  background: #c33;
  border: none;
  outline: none;
}
.t_bot {
  width: 80%;
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
  padding-bottom: 20px;
  justify-content: space-around;
}
.t_bot > div > div {
  text-align: center;
  line-height: 40px;
  width: 45px;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
.t_bot div img {
  width: 30px;
  height: 30px;
}
/* 其他相关节目 */
.t_cen {
  margin-top: 20px;
  background: #fff;
  padding: 30px 30px;
}
.other {
  display: flex;
  justify-content: space-between;
}
.other_l {
  position: relative;
}
.other_l i {
  display: inline-block;
  width: 3.5px;
  height: 20px;
  background: #cb3232;
  position: absolute;
  margin-right: 10px;
  top: -1px;
  left: 0;
}
.other_l span {
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;
}
.other_r button {
  background: #fff;
  border: none;
  outline: none;
}
.other_r img {
  width: 13px;
  height: 13px;
}
.slide_con {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.slide_con div {
  padding-top: 30px;
  width: 45%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.slide_con div:hover {
  color: #c33;
}
/* 悦读其他相关节目 */
.other_lists {
  list-style: none;
  margin-top: 30px;
  padding-left: 0;
}
.other_lists li {
  margin-top: 15px;
  border-bottom: 1px dashed #ccc;
}
.other_lists li p:nth-of-type(2) {
  color: #b6b6b6;
}
.change_articles:hover {
  color: #c33;
}
</style>