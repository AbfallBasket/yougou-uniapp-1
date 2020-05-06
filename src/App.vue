<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
    /*<!-- 引入 icon样式-->*/
    @import url('/style/icon.css');
	/*每个页面公共css */
    page {
        color:#333;
    }
    .text-line2{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
    }
</style>
