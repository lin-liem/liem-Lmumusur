<#macro document post,layout,commentType,index>
<#include "../comment/comment.ftl">
<link rel='stylesheet' id='b2-document-css-css' href='${theme_base!}/source/css/document-2.3.8.css' type='text/css' media='all'>
<div class="b2-document-single mg-t- mg-b box">
	<div class="document-single-top wrapper">
		<div class="document-breadcrumb b2-hover">
			<a href="${blog_url!}">首页</a><span>&gt;</span>
			<a href="javascript:;">文档中心</a><span>&gt;</span>
			${post.title!}
		</div>
	</div>
</div>
<div class="b2-document-content wrapper">
	
	<div class="document-left widget-area b2-pd-r">
		<div class="document-left-item box b2-hover b2-radius mg-b">
			<h2>相关内容</h2>
			<ul id="sheet-list" >
				<li v-for="sheet in sheets">
					<a :href="sheet.fullPath">{{sheet.title}}</a>
					<span class="sheet-look">{{sheet.visits}}人已看</span>
				</li>
			</ul>
		</div>
		<div class="document-left-item box b2-radius request-supper">
			<h2>需要支持？</h2>
			<p>如果通过文档没办法解决您的问题，请提交留言反馈获取我们的支持！</p>
			<div><a href="https://www.mumusur.com/s/guestbook.html" class="button">留言反馈</a></div>
		</div>
	</div>

	<div class="content-area">
		<div id="primary-home" class="box b2-radius b2-pd">
			<h1>${post.title!}</h1>
			<div class="post-meta"><time datetime="${post.editTime!}">最后更新于：${post.editTime?string('yyyy-MM-dd HH:mm:ss')}</div>
			<div class="entry-content">${post.formatContent!}</div>
			<div class="single-document-footer">
				<div class="document-tips">你愿意关注我们的公众号或QQ群吗？</div>
				<div class="document-help">
					<button onclick="gongzhonghaoBox.show = true">公众号</button>
					<button class="empty"><a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=c98acaeab8547d5b5be9192e192192916603daca30143e21df22c9ed6999d806">企鹅群</a></button>
				</div>
				<div class="document-help-count">每<span class="useful">100</span>人中<span class="unuse">73</span>人已关注我们 </div>
			</div>
		</div>
		
		<div class="comments-box request-submit">
			<div id="comments" class="comments-area box b2-radius">
				<div class="comments-title">
					<div class="comment-info">
						<span>${post.commentCount}条回复</span> 
						<span>|</span>
						<span>若显示条数与实际不符，表明部分留言非开放</span>
					</div>
					<div class="comment-tips" style="">
						<span><i class="b2font b2-write "></i>世界以痛吻我，要我报之以歌</span>
					</div>
				</div>
				
				<div class="comments-area-content respond">
					<#if commentType =='post'>
						<@comment post,"post" />
					<#else>
						<@comment post,"sheet" />
					</#if>
				</div>
			</div> 
		</div>
	</div>
</div>
</#macro>
