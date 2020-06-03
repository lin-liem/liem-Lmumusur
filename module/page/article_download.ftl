<#include "../comment/comment.ftl">
<#import "../fragment/article_related_tag.ftl" as tags_related_macro>
<#import "../fragment/article_related_categories.ftl" as categories_related_macro>
<div class="b2-single-content wrapper">
	<div id="primary-home" class="content-area">
		<article class="single-article b2-radius box">
			<div class="entry-content">${post.formatContent!}</div>
			<div class="content-footer">
				<div class="content-footer-zan-cai">
					<span style="margin-left:0">最后编辑时间&nbsp;&nbsp;|&nbsp;&nbsp;${post.editTime?string('yyyy-MM-dd HH:mm:ss')}</span> 
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
					<#if commentType=='post'>
						<@comment post,"post" />
					<#else>
						<@comment post,"sheet" />
					</#if>
				</div>
				<style type="text/css">
					.halo-comment .comment-form input, .halo-comment .comment-form textarea{
						border-radius: 0px !important;
					}
					.halo-comment .comment-buttons .button-preview-edit, .halo-comment .comment-buttons .button-submit{
						border-radius: 0px !important;
					}
					.halo-comment .comment-form {
						margin-left: 45px !important;
					}
					.halo-comment .avatar {
						border-radius: 3px !important;
						width: 34px !important;
						height: 34px !important;
					}
				</style>
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
	<aside id="secondary" class="widget-area" style="min-width: 350px;">
		<div class="sidebar-innter" style="">
			<div class="inner-wrapper-sticky" style="position: relative; transform: translate3d(0px, 0px, 0px);">
				<#include "../section/download.ftl">
					
				<#-- 分类推荐 -->
				<#if categories?? && categories?size gt 0>
					<@categories_related_macro.categoryRelatedMacro />
				</#if>
					
				<#include "../section/recent_posts.ftl">
			</div>
		</div>
	</aside>
</div>
