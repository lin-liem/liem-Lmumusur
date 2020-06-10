<div class="slider-row-1">
	<div class="slider-height slider-row-1-in" style="width:75%;">
		<div class="slider-in b2-radius" style="height:0;padding-top:53.675613%">
			<div class="slider-4-row carousel b2-radius box" data-flickity='{"wrapAround":true,"fullscreen":true,"autoPlay":4000,"fade":false,"imagesLoaded":true,"prevNextButtons":false,"pageDots":true}'>
				<#assign text>${settings.slider_main_json_content!}</#assign>
				<#assign json=text?eval />
				<#list json as sliderMainJson>
					<div class="slider-4-carousel slider-height">
						<div class="slider-info b2-radius">
							<a class="link-block" href="${sliderMainJson.url}"></a>
							<img class="slider-img b2-radius lazy" data-src="${sliderMainJson.thumbnail}" src="${theme_base!}/source/picture/default-img.jpg">
							<div class="slider-info-box">
								<#if sliderMainJson.cate?? || sliderMainJson.cate == ""> 
								<div class="slider-cat">
									<span class="b2-radius"><b style="border-left:4px solid #43d480"></b>${sliderMainJson.cate}</span>
								</div>
								</#if>
								<h2>${sliderMainJson.title}</h2>
								<#if sliderMainJson.authorUrl?? || sliderMainJson.author?? || sliderMainJson.createTime?? || sliderMainJson.authorUrl == "" || sliderMainJson.author == "" || sliderMainJson.createTime == "">
								<div class="slider-user">
									<img class="avatar b2-radius lazy" data-src="${sliderMainJson.authorUrl}" src="${theme_base!}/source/picture/default-img.jpg">
									 <span>${sliderMainJson.author}</span><span>${sliderMainJson.createTime}</span>
								</div>
								</#if>
							</div>
						</div>
					</div>
				</#list>
			</div>
		</div>
	</div>
	<div class="slider-4-box1 slider-4-item slider-height" style="width:25%">
		<#assign text>${settings.slider_side_json_content!}</#assign>
		<#assign sideJson=text?eval />
		<div class="slider-in b2-radius box" style="">
			<div class="slider-info b2-radius">
				<a class="link-block" href="${sideJson.url}"></a>
				<img class="slider-img b2-radius lazy" data-src="${sideJson.thumbnail}" src="${theme_base!}/source/picture/default-img.jpg">
				<div class="slider-info-box">
					<#if sideJson.cate?? || sideJson.cate == ""> 
					<div class="slider-cat">
						<span class="b2-radius"><b style="border-left:4px solid #43d480"></b>${sideJson.cate}</span>
					</div>
					</#if>
					<h2>${sideJson.title}</h2>
					<#if sideJson.authorUrl?? || sideJson.author?? || sideJson.createTime?? || sideJson.authorUrl == "" || sideJson.author == "" || sideJson.createTime == "">
					<div class="slider-user">
						<img class="avatar b2-radius lazy" data-src="${sideJson.authorUrl}" src="${theme_base!}/source/picture/default-img.jpg">
						<span>${sideJson.author}</span><span>${sideJson.createTime}</span>
					</div>
					</#if>
				</div>
			</div>
		</div>
	</div>
</div>