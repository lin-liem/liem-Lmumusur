<script type="text/javascript">
	var $config = {
		title               : '${post.title!}', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
		description         : '${post.summary!}', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
		image               : '${post.thumbnail!}', // 图片, 默认取网页中第一个img标签
		wechatQrcodeTitle   : '微信扫一扫分享', // 微信二维码提示文字
	};
	socialShare('.social-share', $config);
</script> 