<!-- 手机端轮播 -->
<div class="pc-hidden home_row home_row_1  module-sliders  " style="background-color:;">
	<div class="wrapper">
		<div class="home-row-left content-area  " style="width:1100px">
			<div class="slider-1 carousel slider-height box b2-radius  slider-show-title" data-flickity='{"wrapAround":true,"fullscreen":true,"autoPlay":4000,"fade":false,"imagesLoaded":true,"freeScroll":false,"prevNextButtons":false,"pageDots":true}'
			 style="width:1100px;max-width:100%">
			 
				<#assign text>${settings.slider_main_json_content!}</#assign>
				<#assign json=text?eval />
				<#list json as sliderMainJson>
				<div class="slider-1-carousel slider-height" style="width:1100px;max-width:100%;">
					<div class="slider-in slider-info b2-radius" style="height:0;padding-top:56.363636%;max-width:100%">
						<img class="slider-img b2-radius lazy" data-src="${sliderMainJson.thumbnail!}" src="${theme_base!}/source/picture/default-img.jpg">
						<a class="link-block" href="${sliderMainJson.url!}"></a>
						<#if settings.slider_is_show_info!'false'>
						<div class="slider-info-box">
							<#if settings.slider_is_show_cate!'false'>
							<div class="slider-cat">
								<span class="b2-radius"><b style="border-left:4px solid #55efc4"></b>${sliderMainJson.cate!}</span>
							</div>
							</#if>
								
							<#if settings.slider_is_show_title!'false'>
							<h2>${sliderMainJson.title!}</h2>
							</#if>
							
							<#if settings.slider_is_show_author!'false'>
							<div class="slider-user">
								<img class="avatar b2-radius lazy" data-src="${sliderMainJson.authorUrl!}" src="${theme_base!}/source/picture/default-img.jpg">
								 <span>${sliderMainJson.author!}</span><span>${sliderMainJson.createTime!}</span>
							</div>
							</#if>
						</div>
						</#if>
					</div>
				</div>
				</#list>
				
				<#assign text>${settings.slider_side_json_content!}</#assign>
				<#assign sideJson=text?eval />
				<div class="slider-1-carousel slider-height" style="width:1100px;max-width:100%;">
					<div class="slider-in slider-info b2-radius" style="height:0;padding-top:56.363636%;max-width:100%">
						<img class="slider-img b2-radius lazy" data-src="${sideJson.thumbnail!}" src="${theme_base!}/source/picture/default-img.jpg">
						<a class="link-block" href="${sideJson.url!}"></a>
						<#if settings.slider_is_show_info!'false'>
						<div class="slider-info-box">
							<#if settings.slider_is_show_cate!'false'>
							<div class="slider-cat">
								<span class="b2-radius"><b style="border-left:4px solid #55efc4"></b>${sideJson.cate!}</span>
							</div>
							</#if>
								
							<#if settings.slider_is_show_title!'false'>
							<h2>${sideJson.title!}</h2>
							</#if>
								
							<#if settings.slider_is_show_author!'false'>
							<div class="slider-user">
								<img class="avatar b2-radius lazy" data-src="${sideJson.authorUrl!}" src="${theme_base!}/source/picture/default-img.jpg">
								<span>${sideJson.author!}</span><span>${sideJson.createTime!}</span>
							</div>
							</#if>
						</div>
						</#if>
					</div>
				</div>
				
				<#assign text>${settings.slider_list_json_content!}</#assign>
				<#assign json=text?eval />
				<#list json as listJson>
				<div class="slider-1-carousel slider-height" style="width:1100px;max-width:100%;">
					<div class="slider-in slider-info b2-radius" style="height:0;padding-top:56.363636%;max-width:100%">
						<img class="slider-img b2-radius lazy" data-src="${listJson.thumbnail!}" src="${theme_base!}/source/picture/default-img.jpg">
						<a class="link-block" href="${listJson.url!}"></a>
						<#if settings.slider_is_show_info!'false'>
						<div class="slider-info-box">
							<#if settings.slider_is_show_cate!'false'>
							<div class="slider-cat">
								<span class="b2-radius"><b style="border-left:4px solid #55efc4"></b>${listJson.cate!}</span>
							</div>
							</#if>
							
							<#if settings.slider_is_show_title!'false'>
							<h2>${listJson.title!}</h2>
							</#if>
							
							<#if settings.slider_is_show_author!'false'>
							<div class="slider-user">
								<img class="avatar b2-radius lazy" data-src="${listJson.authorUrl!}" src="${theme_base!}/source/picture/default-img.jpg"><span>${listJson.author!}</span><span>${listJson.createTime!}</span>
							</div>
							</#if>
						</div>
						</#if>
					</div>
				</div>
				</#list>
			</div>
		</div>
	</div>
</div>