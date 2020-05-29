<#macro header layout>
<style>
	.header-banner {
		background-color: #0a0a0a
	}

	.header-banner .ym-menu a,
	.header-banner {
		color: #ffffff
	}
</style>
<div class="header-banner">
	<div class="header-banner-content wrapper">
		<div class="header-banner-left">
			<div id="ym-menu" class="ym-menu">
				<ul id="menu-header-top" class="menu">
					<#assign text>${settings.header_links!}</#assign>
					<#assign json=text?eval />
					<#list json as link>
						<li id="menu-item-35311" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-35311">
							<a href="${link.url}">
								<#if link.icon!=''>
									<i class="${link.icon}"></i>
								</#if>
								<span>${link.name}</span>
							</a>
						</li>
					</#list>
				</ul>
			</div>
		</div>
	</div>
</div>
</#macro>