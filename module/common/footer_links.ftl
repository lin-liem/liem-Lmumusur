<div class="footer-links mobile-hidden">
	<ul>
		<@linkTag method="listTeams">
		<#list teams as item>
		  <#if item.team == settings.footer_links_alias!'友情链接'>
				<li>友情链接</li>
				<#list item.links as link>
					<li><a href="${link.url!}"  title="${link.description!}" target="_blank">${link.name!}</a></li>
				</#list>
		  </#if>
		</#list>
		</@linkTag>
	</ul>
</div>
