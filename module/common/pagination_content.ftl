<div data-max="3" class="b2-pagenav post-nav">
	<div class="ajax-pager">
		<div class="ajax-pagenav">
			<div class="btn-group">
				<#list pagination.rainbowPages as number>
					<#if number.isCurrent>
						<a href="javascript:;" class="button empty selected disabled">${number.page!}</a>
					<#else>
						<a href="${number.fullPath!}" class="button empty ">${number.page!}</a>
					</#if>
				</#list>
				<label class="pager-center"><input type="text" value="${posts.number + 1}"> /${posts.totalPages} 页 </label>
			</div>
			<div class="btn-pager">
				<#if pagination.hasPrev>
					<a herf="${pagination.prevPageFullPath!}" class="empty button">❮</a>
				<#else >
					<a herf="javascript:;" class="empty button selected">❮</a>
				</#if>
				
				<#if pagination.hasNext>
					<a href="${pagination.nextPageFullPath!}" class="empty button">❯</a>
				<#else >
					<a href="javascript:;" class="empty button selected">❯</a>
				</#if>
			</div>
		</div>
	</div>
</div>