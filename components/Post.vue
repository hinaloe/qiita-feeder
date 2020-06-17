<template>
  <v-card tag="article" class="article">
    <v-card-title class="headline">{{ post.title }}</v-card-title>
    <v-card-text class="d-flex">
      <div class="post-info">
        <div class="author d-flex">
          <v-avatar size="32px" class="author-avatar"
            ><img :src="post.user.profile_image_url" alt=""
          /></v-avatar>
          <a :href="`https://qiita.com/${post.user.id}`" class="author-id"
            >@{{ post.user.id }}</a
          >
        </div>
        <div class="post-published">
          <time :datetime="post.created_at" :title="post.created_at">{{
            post.created_at | dateFormat
          }}</time
          >投稿
        </div>
        <div class="tags">
          <v-chip v-for="tag in post.tags" :key="tag.name">{{
            tag.name
          }}</v-chip>
        </div>
      </div>
      <v-spacer></v-spacer>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" flat :href="post.url" target="_blank"
        >Qiitaで読む</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn color="primary" flat nuxt @click="open = !open">{{
        open ? 'Close' : 'Continue'
      }}</v-btn>
    </v-card-actions>
    <v-card-text v-if="open">
      <div class="post-body MdContent" v-html="post.rendered_body"></div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AppPost',
  filters: {
    dateFormat(date) {
      const d = new Date(date)
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    },
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    }
  },
}
</script>

<style scoped>
.article {
  word-break: break-all;
}

.post-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.author {
  align-items: center;
  justify-content: flex-start;
  margin-right: 8px;
}

.author-avatar {
  margin-right: 8px;
}

.post-published {
  margin-right: 8px;
}

.MdContent >>> h1 {
  margin-top: 2em;
}

.MdContent >>> h2 {
  margin-top: 1.5em;
}

.MdContent >>> h3 {
  margin-top: 1em;
}

.MdContent >>> h4,
.MdContent >>> h5 {
  margin-top: 1em;
}

.MdContent >>> pre {
  display: block;
  padding: 0;
  margin: 0;
  font-size: inherit;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
  line-height: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  border-radius: 0;
  word-break: break-all;
  word-wrap: break-word;
}

.MdContent >>> ul {
  margin-left: 1em;
}
.MdContent >>> ol {
  padding-left: 40px;
}
.MdContent >>> img {
  max-width: 100%;
}

.MdContent >>> .code-frame {
  margin: 1.5em -16px;
  padding: 1em 18px;
}

.MdContent >>> .code-lang {
  display: inline-block;
  padding: 2px 10px;
  transform: translateY(-1em);
  background: #5b5c65;
}

/** https://github.com/richleland/pygments-css/blob/146834e/monokai.css */
.MdContent >>> .highlight {
  padding: 0.5em;
  overflow-x: auto;
  background-color: #333;
}

.MdContent >>> .highlight .hll {
  background-color: #49483e;
}
.MdContent >>> .highlight,
.MdContent >>> .code-frame {
  background: #272822;
  color: #f8f8f2;
}
.MdContent >>> .highlight .c {
  color: #75715e;
} /* Comment */
.MdContent >>> .highlight .err {
  color: #960050;
  background-color: #1e0010;
} /* Error */
.MdContent >>> .highlight .k {
  color: #66d9ef;
} /* Keyword */
.MdContent >>> .highlight .l {
  color: #ae81ff;
} /* Literal */
.MdContent >>> .highlight .n {
  color: #f8f8f2;
} /* Name */
.MdContent >>> .highlight .o {
  color: #f92672;
} /* Operator */
.MdContent >>> .highlight .p {
  color: #f8f8f2;
} /* Punctuation */
.MdContent >>> .highlight .ch {
  color: #75715e;
} /* Comment.Hashbang */
.MdContent >>> .highlight .cm {
  color: #75715e;
} /* Comment.Multiline */
.MdContent >>> .highlight .cp {
  color: #75715e;
} /* Comment.Preproc */
.MdContent >>> .highlight .cpf {
  color: #75715e;
} /* Comment.PreprocFile */
.MdContent >>> .highlight .c1 {
  color: #75715e;
} /* Comment.Single */
.MdContent >>> .highlight .cs {
  color: #75715e;
} /* Comment.Special */
.MdContent >>> .highlight .gd {
  color: #f92672;
} /* Generic.Deleted */
.MdContent >>> .highlight .ge {
  font-style: italic;
} /* Generic.Emph */
.MdContent >>> .highlight .gi {
  color: #a6e22e;
} /* Generic.Inserted */
.MdContent >>> .highlight .gs {
  font-weight: bold;
} /* Generic.Strong */
.MdContent >>> .highlight .gu {
  color: #75715e;
} /* Generic.Subheading */
.MdContent >>> .highlight .kc {
  color: #66d9ef;
} /* Keyword.Constant */
.MdContent >>> .highlight .kd {
  color: #66d9ef;
} /* Keyword.Declaration */
.MdContent >>> .highlight .kn {
  color: #f92672;
} /* Keyword.Namespace */
.MdContent >>> .highlight .kp {
  color: #66d9ef;
} /* Keyword.Pseudo */
.MdContent >>> .highlight .kr {
  color: #66d9ef;
} /* Keyword.Reserved */
.MdContent >>> .highlight .kt {
  color: #66d9ef;
} /* Keyword.Type */
.MdContent >>> .highlight .ld {
  color: #e6db74;
} /* Literal.Date */
.MdContent >>> .highlight .m {
  color: #ae81ff;
} /* Literal.Number */
.MdContent >>> .highlight .s {
  color: #e6db74;
} /* Literal.String */
.MdContent >>> .highlight .na {
  color: #a6e22e;
} /* Name.Attribute */
.MdContent >>> .highlight .nb {
  color: #f8f8f2;
} /* Name.Builtin */
.MdContent >>> .highlight .nc {
  color: #a6e22e;
} /* Name.Class */
.MdContent >>> .highlight .no {
  color: #66d9ef;
} /* Name.Constant */
.MdContent >>> .highlight .nd {
  color: #a6e22e;
} /* Name.Decorator */
.MdContent >>> .highlight .ni {
  color: #f8f8f2;
} /* Name.Entity */
.MdContent >>> .highlight .ne {
  color: #a6e22e;
} /* Name.Exception */
.MdContent >>> .highlight .nf {
  color: #a6e22e;
} /* Name.Function */
.MdContent >>> .highlight .nl {
  color: #f8f8f2;
} /* Name.Label */
.MdContent >>> .highlight .nn {
  color: #f8f8f2;
} /* Name.Namespace */
.MdContent >>> .highlight .nx {
  color: #a6e22e;
} /* Name.Other */
.MdContent >>> .highlight .py {
  color: #f8f8f2;
} /* Name.Property */
.MdContent >>> .highlight .nt {
  color: #f92672;
} /* Name.Tag */
.MdContent >>> .highlight .nv {
  color: #f8f8f2;
} /* Name.Variable */
.MdContent >>> .highlight .ow {
  color: #f92672;
} /* Operator.Word */
.MdContent >>> .highlight .w {
  color: #f8f8f2;
} /* Text.Whitespace */
.MdContent >>> .highlight .mb {
  color: #ae81ff;
} /* Literal.Number.Bin */
.MdContent >>> .highlight .mf {
  color: #ae81ff;
} /* Literal.Number.Float */
.MdContent >>> .highlight .mh {
  color: #ae81ff;
} /* Literal.Number.Hex */
.MdContent >>> .highlight .mi {
  color: #ae81ff;
} /* Literal.Number.Integer */
.MdContent >>> .highlight .mo {
  color: #ae81ff;
} /* Literal.Number.Oct */
.MdContent >>> .highlight .sa {
  color: #e6db74;
} /* Literal.String.Affix */
.MdContent >>> .highlight .sb {
  color: #e6db74;
} /* Literal.String.Backtick */
.MdContent >>> .highlight .sc {
  color: #e6db74;
} /* Literal.String.Char */
.MdContent >>> .highlight .dl {
  color: #e6db74;
} /* Literal.String.Delimiter */
.MdContent >>> .highlight .sd {
  color: #e6db74;
} /* Literal.String.Doc */
.MdContent >>> .highlight .s2 {
  color: #e6db74;
} /* Literal.String.Double */
.MdContent >>> .highlight .se {
  color: #ae81ff;
} /* Literal.String.Escape */
.MdContent >>> .highlight .sh {
  color: #e6db74;
} /* Literal.String.Heredoc */
.MdContent >>> .highlight .si {
  color: #e6db74;
} /* Literal.String.Interpol */
.MdContent >>> .highlight .sx {
  color: #e6db74;
} /* Literal.String.Other */
.MdContent >>> .highlight .sr {
  color: #e6db74;
} /* Literal.String.Regex */
.MdContent >>> .highlight .s1 {
  color: #e6db74;
} /* Literal.String.Single */
.MdContent >>> .highlight .ss {
  color: #e6db74;
} /* Literal.String.Symbol */
.MdContent >>> .highlight .bp {
  color: #f8f8f2;
} /* Name.Builtin.Pseudo */
.MdContent >>> .highlight .fm {
  color: #a6e22e;
} /* Name.Function.Magic */
.MdContent >>> .highlight .vc {
  color: #f8f8f2;
} /* Name.Variable.Class */
.MdContent >>> .highlight .vg {
  color: #f8f8f2;
} /* Name.Variable.Global */
.MdContent >>> .highlight .vi {
  color: #f8f8f2;
} /* Name.Variable.Instance */
.MdContent >>> .highlight .vm {
  color: #f8f8f2;
} /* Name.Variable.Magic */
.MdContent >>> .highlight .il {
  color: #ae81ff;
} /* Literal.Number.Integer.Long */
</style>
