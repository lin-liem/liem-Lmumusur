<style type="text/css">
	.entry-footer{
		padding: 10px 5px;
		background-color: #CCCCCC;
		
	}
</style>
<footer class="entry-footer mar20-t pos-a" data-margin-top="70">
	<div class="pos-r clearfix">
		<div class="share-box fs12">
			<div class="weixin mouh" id="share-weixin">
				<i class="b2font b2-weixin"></i>
				<div class="wx-t-x pos-a hide box" id="weixin-box">
					<img class="qrcode fl bor-3" src="http://zixuephp.net/inc/qrcode_img.php?url=${post.fullPath!}">
				</div>
			</div>
			<span class="dot"></span>
			<a href="https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${post.fullPath!}&sharesource=qzone&title=${post.title!}&pics=${post.thumbnail!}&summary=${post.summary!}" target="_blank" class="qzone">
				<i class="b2font b2-qqkongjian"></i>
			</a>
			<span class="dot"></span>
			<a href="http://connect.qq.com/widget/shareqq/index.html?url=${post.fullPath!}&sharesource=qzone&title=${post.title!}&pics==${post.thumbnail!}&summary=${post.summary!}" target="_blank" class="qq">
				<i class="b2font b2-qq"></i>
			</a>
			<span class="dot"></span>
			<a href="http://service.weibo.com/share/share.php?count=1&url=${post.fullPath!}&title=${post.title!}&pic=${post.thumbnail!}" target="_blank" class="weibo">
				<i class="b2font b2-weibo"></i>
			</a>
		</div>
		<div class="footer-author fs14 mar20-t">
			<button class="text" @click.stop="favorites()">
				<i :class="['iconfont' ,loved ? 'zrz-icon-font-collect' : 'zrz-icon-font-shoucang2']"></i>
				<span v-text="count"></span> 收藏
			</button>
		</div>
	</div>
</footer> 