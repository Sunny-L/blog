<style scoped>

</style>
<template>
	<div class="page-view page-index">
		<section>
			<div class="row">
				<div class="card card-blue">
					<div>
						<strong>{{counts.posts}}</strong>
					</div>
					<span>文章数</span>
				</div>
				<div class="card card-orange">
					<div>
						<strong>{{counts.views.views}}</strong>
					</div>
					<span>点击数</span>
				</div>
				<div class="card card-green">
					<div>
						<strong>{{counts.messages}}</strong>
					</div>
					<span>留言数</span>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
  import 'whatwg-fetch'
  export default {
    data() {
      return {
        counts: {
          posts: 0,
          views: 0,
          messages: 0
        }
      }
    },
    created: function() {
      fetch('/admin/getCounts', {
          credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
          this.counts.posts = data.counts.posts
          this.counts.views = data.counts.views[0]
          this.counts.messages = data.counts.messages
        })
    }
  }
</script>