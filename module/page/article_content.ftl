<#include "../comment/comment.ftl">
<#import "../fragment/article_related_tag.ftl" as tags_related_macro>
<div class="b2-single-content wrapper">
	<div id="primary-home" class="content-area">
		<article class="single-article b2-radius box">
			<div class="single-top-html">
				<a href="${settings.ad_post_top_url!'#none'}"><img src="${settings.ad_post_top!'${theme_base!}/source/picture/ads-example.jpg'}"></a>
			</div>
			<header class="entry-header">
				<div class="">
					<div class="post-list-cat  b2-radius">
						<#if categories?? && categories?size gt 0>
							<#list categories as category>
								<a target="__blank" class="post-list-cat-item b2-radius" href="${category.fullPath!}">
									<span class="post-3-cat" style="border: 2px solid #55efc4"></span>${category.name!}
								</a>
							</#list>
						<#else>
							<a target="__blank" class="post-list-cat-item b2-radius" href="#none">
								<span class="post-3-cat" style="border: 2px solid #55efc4"></span>暂无相关分类
							</a>
						</#if>
						
					</div>
				</div>
				<h1>${post.title!}</h1>
				<div id="post-meta">
					<ul class="post-meta">
						<li class="single-date"><span><time datetime="${post.createTime!}" itemprop="datePublished" data-tid="2" class="b2timeago">${post.createTime?string('yyyy-MM-dd HH:mm:ss')}</time></span></li>
						<li class="single-like"><span><i class="b2font b2-pinglun"></i><b>${post.commentCount}</b></span></li>
						<li class="single-eye"><span><i class="b2font b2-eye "></i><b>${post.visits!}</b></span></li>
					</ul>
					<div class="post-user-info">
						<div class="post-meta-left">
							<div class="avatar-parent">
								<img src="${user.avatar!}" class="avatar b2-radius">
							</div>
							<div class="post-user-name">
								<b>${user.nickname!}</b>
								<span class="user-title">${user.description!}</span>
							</div>
						</div>
						<div class="post-meta-right">
							<div id="gongzhonghao_box">
								<button @click="show()">RSS订阅</button>
								<button class="empty"><a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=c98acaeab8547d5b5be9192e192192916603daca30143e21df22c9ed6999d806">企鹅群</a></button>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div class="entry-content">${post.formatContent!}</div>

			<div id="content-ds" class="content-ds" >
				<p><i class="b2font b2-shipinye-meiguihua "></i><span>予人玫瑰，手有余香</span></p>
				<div class="content-ds-button"><button @click="show()">赞赏</button></div>
				<p class="give-gray">还没有人赞赏，快来当第一个赞赏的人吧！</p>
			</div>
			<div class="content-footer">
				<div class="content-footer-poster">
					<button class="poster-span"><i class="b2font b2-feiji "></i><b>海报分享</b></button>
				</div>
				<div class="content-footer-zan-cai">
					<span class="">最后编辑时间&nbsp;&nbsp;|&nbsp;&nbsp;${post.editTime?string('yyyy-MM-dd HH:mm:ss')}</span> 
				</div>
			</div>
			<div class="post-tags-meat">
				<#if tags?? && tags?size gt 0>
					<#list tags as tag>
					  <a class="b2-radius" href="${tag.fullPath!}">
						<span class="tag-img">
							<i class="b2font b2-tags "></i>
						</span>
						<span class="tag-text">&nbsp;${tag.name!}</span>
					  </a>
					</#list>
				<#else>
					<a class="b2-radius" href="#none">
						<span class="tag-img">
							<i class="b2font b2-tags "></i>
						</span>
						<span class="tag-text">&nbsp;暂无相关标签</span>
					</a>
				</#if>
			</div>
		</article>
		
		<#if nextPost?? && prevPost??>
			<#include "../fragment/article_prev_next.ftl">
		</#if>
		
		<div class="single-bottom-html mg-b box b2-radius">
			<a href="${settings.ad_post_bottom_url!'#none'}"><img src="${settings.ad_post_bottom!'${theme_base!}/source/picture/ads-example.jpg'}"></a>
		</div>
	
		<div class="comments-box">
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
		
		<div class="related-posts mg-t box b2-radius">
			<div class="related-posts-title">猜你喜欢</div>
			<div class="hidden-line">
				<div class="related-posts-in">
					<#-- 标签推荐 -->
					<#if tags?? && tags?size gt 0>
						<@tags_related_macro.tagsRelatedMacro />
					</#if>
				</div>
			</div>
		</div>
	</div>
	<aside id="secondary" class="widget-area">
		<div class="sidebar-innter" style="">
			<div class="inner-wrapper-sticky" style="position: relative; transform: translate3d(0px, 0px, 0px);">
				<#include "../section/hello_info.ftl">
				<#include "../section/recent_posts.ftl">
				<#include "../section/tag_cloud.ftl">
			</div>
		</div>
	</aside>
</div>

