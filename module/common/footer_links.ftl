<div class="footer-links-memo-box mobile-hidden">
	<div class="footer-links-memo-box-title">友情链接：</div>
	<div style="footer-links-memo-box-href"><a href="${settings.footer_flinks_url}" target="_blank">${settings.footer_flinks_name!'申请友链'}</a></div>
</div>
<div class="footer-links mobile-hidden">
	<ul>
		<@linkTag method="listTeams">
		<#list teams as item>
		  <#if item.team == settings.footer_links_alias!'友情链接'>
				<#list item.links as link>
					<li><a href="${link.url!}"  title="${link.description!}" target="_blank">${link.name!}</a></li>
				</#list>
		  </#if>
		</#list>
		</@linkTag>
	</ul>
</div>
