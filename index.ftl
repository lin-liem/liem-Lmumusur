<#include "module/layout.ftl">
<@layout type="index" title="${options.blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}" canonical="${context!}">
     <div class="b2-content">
     	<div id="primary-home" class="content-area">
			
     		<#include "./module/fragment/slider.ftl">
     		<#include "./module/fragment/ad_banner.ftl">
			
     		<div class=" home_row home_row_5  module-posts  " style="background-color:;">
     			<div class="wrapper">
     				<div class="home-row-left content-area box b2-radius " style="width:804px">
     					<#include "./module/page/index_list.ftl">
     				</div>
     				<div class="widget-area">
     					<div class="sidebar-innter widget-ffixed">
							<#include "./module/section/section.ftl">
     					</div>
     				</div>
     			</div>
     		</div>
			
     	</div>
    </div>
</@layout>