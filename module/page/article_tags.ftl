<#include "../fragment/article_category_tag_list.ftl">
<div class="b2-single-content wrapper category single-sidebar-show ">
	<div id="primary-home" class="content-area box">
		<style>
			.post-item-1 ul.b2_gap > li{
					width:100%    
			}
		</style>
		<div class="archive-row">
			<div class="post-3 post-list post-item-1 hidden-line" id="post-list">
				<ul class="b2_gap ">
					<@categoryTag method="list">
					  <#list tags as tag>
					    <@postTag method="listByTgaId" categoryId="${tag.id}">
							<#include "../fragment/article_categorys_tags_content.ftl">
					    </@postTag>
					  </#list>
					</@categoryTag>
				</ul>
			</div>
		</div>
	</div>


	<aside id="secondary" class="widget-area">
		<div class="sidebar-innter">
			<!-- 问候模块 -->
			<#if settings.hello_info_enable!true>
				<#include "../section/hello_info.ftl">
			</#if>
				
				
			<!-- 导入最新文章 -->
			<#if settings.recent_post_enable!true>
				<#include "../section/recent_posts.ftl">
			</#if>
			
		</div>
	</aside>
</div>

