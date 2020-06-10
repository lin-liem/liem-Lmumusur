<div class="slider-row-2" style="margin-top:16px;">
	<#assign text>${settings.slider_list_json_content!}</#assign>
	<#assign json=text?eval />
	<#list json as listJson>
		<div class="slider-4-box2 slider-4-item slider-height" style="width:25%">
			<div class="slider-in b2-radius box" style="height:0;padding-top:53.818182%">
				<div class="slider-info b2-radius">
					<a class="link-block" href="${listJson.url}"></a>
					<img class="slider-img b2-radius lazy" data-src="${listJson.thumbnail}" src="${theme_base!}/source/picture/default-img.jpg">
					<#if settings.slider_is_show_info!'false'>
					<div class="slider-info-box">
						<#if listJson.cate?? || listJson.cate != ""> 
						<div class="slider-cat">
							<span class="b2-radius"><b style="border-left:4px solid #55efc4"></b>${listJson.cate}</span>
						</div>
						</#if>
						<h2>${listJson.title}</h2>
						<#if listJson.authorUrl?? || listJson.author?? || listJson.createTime?? || listJson.authorUrl != "" || listJson.author != "" || listJson.createTime != "">
						<div class="slider-user">
							<img class="avatar b2-radius lazy" data-src="${listJson.authorUrl}" src="${theme_base!}/source/picture/default-img.jpg"><span>${listJson.author}</span><span>${listJson.createTime}</span>
						</div>
						</#if>
					</div>
					</#if>
				</div>
			</div>
		</div>
	</#list>
</div>
