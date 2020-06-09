<!-- 
<style type="text/css">
	.site-main .box {
		overflow: inherit !important;
	}

	.entry-footer {
		top: 0;
		left: -50px;
	}
	.entry-footer i {
		font-size: 24px;
		color: rgba(32, 44, 59, 0.36);
		font-style: normal;
	}
	.mar20-t {
		margin-top: 20px;
	}

	.mouh {
		cursor: pointer;
	}
	.pos-r {
		position: relative;
	}

	.pos-a {
		position: absolute;
	}

	.entry-footer .share-box {
		left: 10px;
		top: 11px;
	}

	.single .site-main .box {
		overflow: inherit;
	}

	.site-main .box {
		letter-spacing: 0;
		font-size: 12px;
		border-top: 0;
	}

	.wx-t-x {
		width: 100px;
		height: 100px;
		bottom: 53px;
		background: #f3faff;
		left: 33px;
		top: 0;
		padding: 5px;
		z-index: 2;
	}

	.hide {
		display: none;
	}

	.box {
		background-color: #fff;
		border-radius: 2px;
		overflow: hidden;
		box-shadow: 0 0 10px rgba(0, 0, 0, .05);
	}

	.pos-a {
		position: absolute;
	}

	.hide,
	[v-cloak] {
		display: none;
	}

	.entry-footer span {
		display: block;
	}

	.dot {
		margin: 0 5px;
	}

	.entry-footer a {
		display: block;
	}
</style>
<footer class="entry-footer mar20-t pos-a" data-margin-top="70">
	<div class="pos-r clearfix">
		<div class="share-box fs12">
			<div class="weixin mouh" id="share-weixin">
				<i class="b2font b2-weixin-bg"></i>
				<div class="wx-t-x pos-a hide box" id="weixin-box">
					<img class="qrcode fl bor-3" src="http://zixuephp.net/inc/qrcode_img.php?url=${post.fullPath!}">
				</div>
			</div>
			<span class="dot"></span>
			<a href="https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${post.fullPath!}&sharesource=qzone&title=${post.title!}&pics=${post.thumbnail!}&summary=${post.summary!}"
			 target="_blank" class="qzone">
				<i class="b2font b2-qqkongjian-bg"></i>
			</a>
			<span class="dot"></span>
			<a href="http://connect.qq.com/widget/shareqq/index.html?url=${post.fullPath!}&sharesource=qzone&title=${post.title!}&pics==${post.thumbnail!}&summary=${post.summary!}"
			 target="_blank" class="qq">
				<i class="b2font b2-qq-bg"></i>
			</a>
			<span class="dot"></span>
			<a href="http://service.weibo.com/share/share.php?count=1&url=${post.fullPath!}&title=${post.title!}&pic=${post.thumbnail!}"
			 target="_blank" class="weibo">
				<i class="b2font b2-weibo-bg"></i>
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

-->
<style type="text/css">
	.share-box{
		position: absolute; top: 0; left: -80px; height: 100%;width: 30px;
	}
</style>

<div class="share-box">
	<div class="social-share" ></div>
</div>
<link rel="stylesheet" href="//s.xinac.net/static/social-share.js/v1.0.16/css/share.min.css">
<script src="//s.xinac.net/static/social-share.js/v1.0.16/js/social-share.min.js"></script>
<script type="text/javascript">
	var $config = {
		title               : '${post.title!}', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
		description         : '${post.summary!}', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
		image               : '${post.thumbnail!}', // 图片, 默认取网页中第一个img标签
		sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
		disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
		wechatQrcodeTitle   : '微信扫一扫分享', // 微信二维码提示文字
		wechatQrcodeHelper  : ''
	};
	socialShare('.social-share', $config);
</script> 
<style>
    .social-share a {
        border: none !important;
        font-size: 1.4em !important;
    }
    .social-share a svg{
        width: 23px;
    }
    .social-share .views svg {
        color: #7b68ee;
        padding-top: 3px;
        margin-top: 5px;
    }
    .social-share .views:after{
        content: '26';
        position: absolute;
        top: -11px;
        left: -15px;
        font-size: 0.3em;
        background-color: #cfc8f9;
        height: 20px;
        border-radius: 3px;
        padding: 0;
        line-height: 20px !important;
        padding-left: 5px;
        padding-right: 5px;
    }
    .social-share .views:hover,
    .social-share .views:hover{
        background-color: #7b68ee;
    }
    .social-share .views:hover:after  {
        background-color: #947bc0;
    }
    .social-share .views:hover svg {
        color: white;
    }

</style>           
 