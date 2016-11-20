<style>
	.edit-textarea {
		flex: 1;
		border-right: 1px solid #ccc;
		padding: 20px
	}
	
	.preview {
		flex: 1;
		padding: 20px;
	}
	
	input,
	textarea {
		width: 100%;
		padding: 5px;
		margin-bottom: 10px;
	}
	
	div[contenteditable="true"] {
		border: 1px solid #ccc;
		padding: 5px;
	}
	
	.detail-content {
		min-height: 50vh
	}
	
	.edit-textarea p .tag-wrap {
		padding-left: 20px;
	}
	
	.edit-textarea label.tag {
		position: relative;
		margin-right: 15px;
        border:1px solid #00aaff;
        border-radius:5px;
        padding: 5px 7px;
        cursor: pointer;
	}
	
	.edit-textarea label.tag:after {
		content: 'X';
		position: absolute;
		right: -8px;
		top: 0;
		color: #f44336;
		font-size: 12px;
		visibility: hidden;
	}
	
	.edit-textarea label.tag:hover:after {
		visibility: visible;
	}
</style>
<template>
	<div class="page-view page-post_detail">
		<div>
			<ul>
				<li><a href="javascript:;" @click="save(true)">发布</a></li>
				<li><a href="javascript:;" @click="save(false)">保存为草稿</a></li>
				<li><a href="javascript:;" @click="del">删除</a></li>
			</ul>
		
		<div class="flex flex-center">
			<div class="edit-textarea">
				<p>标签 
                    <span class="tag-wrap">
                        <label class="tag" v-for="item in detail.tags" @click="removeTag(item)">{{item.title}} </label>
                    </span>
                </p>
				<select name="tag" multiple>
                    <option v-for="tag in tags" v-bind:value="tag._id" @click="selectTag(tag)">{{tag.title}}</option>
                </select>
				<p>标题</p>
				<input type="" name="" v-model="detail.title">
				<p>介绍</p>
				<input type="" name="" v-model="detail.introduce">
				<p>
					创建时间: {{detail.create_time}} | 最后更新时间： {{detail.last_update_time}}
				</p>
				<textarea v-model="detail.content" class="detail-content" @keydown="edit"></textarea>
			</div>
			<div class="preview">
				<div v-html="compileMarkdown(detail.content)"></div>
			</div>
		</div>
        </div>
	</div>
</template>
<script>
    import marked from 'marked'
    import _ from 'lodash'
    import timeago from 'timeago.js'
    import async from 'async'
    // import {router} from '../app';
    // const router = require('../app').router

    export default {
        data() {
            return {
                detail: {
                    title: '',
                    introduce: '',
                    create_time: null,
                    last_update_time: null,
                    content: '# hello world!!!',
                    tags: []
                },
                tags: []
            }
        },
        mounted: function() {
            var id = this.$route.params.id
            var self = this
            async.auto({
                detail: done => {
                    if (id) {
                        fetch(`/admin/posts/detail/${id}`,{
                            credentials: 'include',
                        })
                            .then(res => res.json())
                            .then(data => {
                                data.info.post.create_time = timeago().format(new Date(data.info.post.create_time), 'zh_CN')
                                data.info.post.last_update_time = timeago().format(new Date(data.info.post.last_update_time), 'zh_CN')
                                self.detail = data.info.post
                                done(null, self.detail)
                            })
                    }
                },
                tags: done => {
                    fetch('/admin/tags',{
                        credentials: 'include',
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.code === 0) {
                                self.tags = data.info.tags
                            }
                            done(null, self.tags)
                        })
                }
            }, (err, results) => {
                // self.selectedTags = results.detail.tags.map(item=>item)
            })
        },
        methods: {
            compileMarkdown: marked,
            update: _.debounce(function(e) {
                this.detail.content = e.target.value
                var keyCode = e.keyCode || e.which
                if (keyCode == 'Tab') {
                    e.preventDefault();
                }
            }, 50),
            edit: function(e) {
                if (e.keyCode == 9) {
                    e.preventDefault();
                    e.target.value = e.target.value + '\t'
                }
                this.detail.content = e.target.value
            },
            save: function(is_publish) {
                let url = is_publish ? '/admin/posts/publish' : '/admin/posts/save_to_draft'
                fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.detail)
                    }).then(res => res.json())
                    .then(data => {
                        if (data.code === 0) {
                            alert('success')
                            router.push({
                                path: '/posts'
                            })
                        } else {
                            alert(data.info.result)
                        }
                    })
            },
            del: function() {
                fetch('/admin/posts/del/' + this.detail._id,{
                    credentials: 'include',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            },
            selectTag: function(tag) {
                let unInserted = this.detail.tags.every( item => item._id != tag._id)
                if(unInserted) {
                    this.detail.tags.push(tag)
                }
            },
            removeTag: function(tag) {
                this.detail.tags.splice(tag, 1)
            }
        }
    }
</script>