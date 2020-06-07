<div class="mobile-hidden home_row home_row_0  module-sliders  " style="background-color:;">
	<div class="wrapper">
		<div class="home-row-left content-area  " style="width:1100px">
			<div class="slider-4 slider-4-1  slider-show-title" style="width:1100px">
				<style>
					.slider-4-1 .slider-row-2 .slider-4-item + .slider-4-item .slider-in, .slider-4-1 .slider-row-1 .slider-4-item .slider-in{
						margin-left:16px;
					}
					.module-sliders .box {
						border: 2px solid #fff;
					}
				</style>
				<#-- 首页第一屏开关 -->
				<#if settings.slider_main_enable!false>
					<#include "./slider_pc_one.ftl">
				</#if>
				<#-- 首页第二屏开关 -->
				<#if settings.slider_list_enable!false>
					<#include "./slider_pc_two.ftl">
				</#if>
			</div>
		</div>
	</div>
</div>