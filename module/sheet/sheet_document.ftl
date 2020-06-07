<#macro wiki post,layout,commentType,index>
<div class="b2-document-content wrapper">
	<div class="document-left widget-area b2-pd-r">
		<div class="document-left-item box b2-hover b2-radius mg-b">
			<h2>此组别内的文章</h2>
			<ul>
				<li><a href="javascript:;">B2主题的适用场景及特点</a></li>
				<li><a href="36824.html">B2主题的系统要求和环境安装</a></li>
				<li><a href="36826.html">WordPress的安装</a></li>
				<li><a href="36827.html">安装B2主题所需要的扩展</a></li>
				<li><a href="36878.html">WordPress伪静态和WordPress固定连接设置</a></li>
				<li><a href="36828.html">安装B2主题</a></li>
				<li>B2主题的必装和选装插件</li>
				<li><a href="36921.html">B2主题的优化</a></li>
			</ul>
		</div>
		<div class="document-left-item box b2-radius request-supper">
			<h2>需要支持？</h2>
			<p>如果通过文档没办法解决您的问题，请提交工单获取我们的支持！</p>
			<div><a href="javascript:void(0)" class="button">提交工单</a></div>
		</div>
	</div>

	<div id="primary-home" class="content-area box b2-radius b2-pd">
		<h1>${post.title!}</h1>
		<div class="post-meta"><time datetime="${post.editTime!}">最后更新于：${post.editTime?string('yyyy-MM-dd HH:mm:ss')}</div>
		<div class="entry-content">${post.formatContent!}</div>
		<div class="single-document-footer">
			<div class="document-tips">这篇文章对你有帮助吗？</div>
			<div class="document-help"><button><i class="b2font b2-duigou "></i>是</button> <button><i class="b2font b2-close "></i>否</button></div>
			<div class="document-help-count"><span class="useful">17</span>人中<span class="unuse">13</span>人觉得有帮助 </div>
		</div>
	</div>
</div>
</#macro>
