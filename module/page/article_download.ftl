<#import "../fragment/article_related_tag.ftl" as tags_related_macro>
<#import "../fragment/article_related_categories.ftl" as categories_related_macro>
<div id="page" class="site">
	<div id="content" class="site-content" style="padding-bottom: 30px;">
		<div class="b2-single-content wrapper">
			<div id="primary-home" class="content-area">
				<article class="single-article b2-radius box">
					<div class="entry-content">${post.formatContent!}</div>
					<div class="content-footer">
						<div class="content-footer-zan-cai">
							<span style="margin-left:0">最后编辑时间&nbsp;&nbsp;|&nbsp;&nbsp;${post.editTime?string('yyyy-MM-dd HH:mm:ss')}</span> 
						</div>
					</div>
					<div class="post-tags-meat">
						<#if tags?? && tags?size gt 0>
							<#list tags as tag>
							  <a class="b2-radius" href="${tag.fullPath!}">
								<span class="tag-img">
									<i class="b2font b2-tags "></i>
								</span>
								<span class="tag-text">&nbsp;${tag.name!}</span>
							  </a>
							</#list>
						<#else>
							<a class="b2-radius" href="#none">
								<span class="tag-img">
									<i class="b2font b2-tags "></i>
								</span>
								<span class="tag-text">&nbsp;暂无相关标签</span>
							</a>
						</#if>
					</div>
				</article>
				
				<#if nextPost?? && prevPost??>
					<#include "../fragment/article_prev_next.ftl">
				</#if>
				
				<div class="single-bottom-html mg-b box b2-radius">
					<a href="${settings.ad_post_bottom_url!'#none'}"><img src="${settings.ad_post_bottom!'${theme_base!}/source/picture/c9bf8aba4945b31d4b2da26496b32f8b.jpg'}"></a>
				</div>
			
				<div class="comments-box">
					<div id="comments" class="comments-area box b2-radius">
						<div class="comments-title">
							<div class="comment-info"><span>
									136 条回复 </span> <span><b class="comment-auth-mod comment-auth">A</b><i>文章作者</i></span> <span><b class="comment-auth-mod comment-mod">M</b><i>管理员</i></span></div>
							<div class="comment-tips" style=""><span><span>世界以痛吻我，要我报之以歌
									</span></span></div>
						</div>
						<div class="comments-area-content">
							<ol class="comment-list">
								<li>
									<article id="comment-2960" itemscope="itemscope" itemtype="http://schema.org/Comment" class="comment">
										<figure class="gravatar avatar-parent"><img alt="" src="static/picture/2679969ed953e9625_1_avatar-image1.jpg"
											 srcset="https://static.7b2.com/wp-content/uploads/2020/04/2679969ed953e9625_1_avatar.jpg?x-oss-process=image/resize,https://www.dachaoka.com/m_fill,https://www.dachaoka.com/h_121,https://www.dachaoka.com/w_121 2x"
											 height="43" width="43" class="avatar avatar-43 photo avatar-default"><svg fill="currentColor" viewBox="0 0 24 24"
											 width="18" height="18" class="Zi Zi--BadgeCert">
												<g fill="none" fill-rule="evenodd">
													<path fill="#0F88EB" d="M2.64 13.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.122 3.21.655 4.083 1.734l-.125-.154c.876 1.084 2.304 1.092 3.195.027l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.279-2.238l.017.197c-.122-1.388.655-3.212 1.734-4.084l-.154.125c1.083-.876 1.092-2.304.027-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.279l.198-.017c-1.387.123-3.21-.654-4.083-1.733l.125.153c-.876-1.083-2.304-1.092-3.195-.027l.127-.152c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.279 2.24L4.4 6.363c.122 1.387-.655 3.21-1.734 4.084l.154-.126c-1.083.878-1.092 2.304-.027 3.195l-.152-.127z"></path>
													<path fill="#FFF" d="M9.78 15.728l-2.633-2.999s-.458-.705.242-1.362c.7-.657 1.328-.219 1.328-.219l1.953 2.132 4.696-4.931s.663-.348 1.299.198c.636.545.27 1.382.27 1.382s-3.466 3.858-5.376 5.782c-.98.93-1.778.017-1.778.017z"></path>
												</g>
											</svg></figure>
										<div class="comment-item">
											<div role="complementary" class="comment-meta">
												<div class="comment-user-info">
													<div><span class="comment-author"><a target="_blank" href="dBvzwlpqs.html">iiuu23</a><span></span><span
															 class="user-title">春哥测试账户5</span></span> <span><span class="lv-icon user-vip b2-vip2" style="background-color: rgba(129, 215, 66, 0.18);"><i
																 style="border-color: rgb(129, 215, 66);"></i><b style="color: rgb(129, 215, 66);">铂金会员</b></span><span
															 class="lv-icon user-lv b2-lv3"><b>高中</b><i>lv3</i></span></span></div>
												</div>
												<div class="comment-floor"><time datetime="2020-04-14 18:55:05" itemprop="datePublished" data-tid="4" class="b2timeago">1月前</time></div>
											</div>
											<div itemprop="text" class="comment-content post-content">
												<div class="comment-content-text">
													<p>测试</p>
												</div>
												<div class="comment-footer">
													<div class="comment-footer-tools">
														<div class="comment-vote-hidden"><button id="comment-up-2960" onclick="b2CommentList.vote(this,'comment_up','2960')"
															 class="comment-up text "><i class="b2font b2-love "></i><span>0</span></button> <button id="comment-down-2960"
															 onclick="b2CommentList.vote(this,'comment_down','2960')" class="comment-down text "><i class="b2font b2-buxihuan "></i><span>0</span></button></div>
														<div class="comment-item-hidden"><button onclick="b2CommentList.sticky('2960')" class="text comment-zd">置顶</button>
															<button data-id="2960" onclick="b2CommentList.move('2960')" class="text fr reply">回复</button></div>
													</div>
												</div>
												<div id="comment-form-2960"></div>
											</div>
										</div>
										<div id="comment-children-2960" class="children children-mark"></div>
									</article>
								</li>
							</ol>
						</div>
						<div class="b2-pagenav comment-nav b2-radius ">
							<div class="ajax-pager">
								<div class="ajax-pagenav">
									<div class="btn-group"><button class="empty button">1</button><button disabled="disabled" class="empty button bordernone">...</button><button
										 class="empty button">9</button><button class="empty button">10</button><button class="empty button">11</button><button
										 disabled="disabled" class="empty button selected">12</button> <label class="pager-center"><input type="text"
											 autocomplete="off">/12 页</label></div>
									<div class="btn-pager"><button class="empty button">❮</button> <button disabled="disabled" class="empty button">❯</button></div>
								</div>
							</div>
						</div>
					</div><!-- #comments -->

					<div id="comment-form" class="comment-form mg-t">
						<div id="respond" class="respond box b2-radius">
							<div class="com-info"><img class="com-info-avatar avatar b2-radius" src="https://www.dachaoka.com/wp-content/themes/b2/Assets/fontend/images/default-avatar.png"></div>
							<div data-commenter="{&quot;user_name&quot;:&quot;&quot;,&quot;user_email&quot;:&quot;&quot;,&quot;avatar&quot;:&quot;https:\/\/www.dachaoka.com\/wp-content\/themes\/b2\/Assets\/fontend\/images\/default-avatar.png&quot;}"
							 class="com-form">
								<div id="com-form-title" class="com-form-title b2-show">
									<div>
										<div><span>欢迎您，新朋友，感谢参与互动！</span></div>
									</div>
									<div><button class="text">修改资料</button></div>
								</div>
								<div class="com-form-input"><input id="author" type="text" name="nickname" placeholder="称呼"> <input id="email"
									 type="text" name="email" placeholder="邮箱"></div>
								<div class="com-form-textarea"><textarea id="textarea" placeholder="说说你的看法" style="overflow: hidden; overflow-wrap: break-word; height: 100px;"></textarea></div>
								<div class="com-form-button">
									<div class="com-form-button-l"><span><i class="b2font b2-face"></i></span>
										<div class="comment-smile-box"><button class="text smily-button"><img src="static/picture/1f600.svg" class="b2-smilies"></button><button
											 class="text smily-button"><img src="static/picture/1f604.svg" class="b2-smilies"></button><button class="text smily-button"><img
												 src="static/picture/1f60e.svg" class="b2-smilies"></button><button class="text smily-button"><img src="static/picture/1f612.svg"
												 class="b2-smilies"></button><button class="text smily-button"><img src="static/picture/1f613.svg" class="b2-smilies"></button><button
											 class="text smily-button"><img src="static/picture/1f602.svg" class="b2-smilies"></button><button class="text smily-button"><img
												 src="static/picture/1f60d.svg" class="b2-smilies"></button><button class="text smily-button"><img src="static/picture/1f60f.svg"
												 class="b2-smilies"></button><button class="text smily-button"><img src="static/picture/1f619.svg" class="b2-smilies"></button><button
											 class="text smily-button"><img src="static/picture/1f61f.svg" class="b2-smilies"></button><button class="text smily-button"><img
												 src="static/picture/1f616.svg" class="b2-smilies"></button><button class="text smily-button"><img src="static/picture/1f61d.svg"
												 class="b2-smilies"></button><button class="text smily-button"><img src="static/picture/1f628.svg" class="b2-smilies"></button><button
											 class="text smily-button"><img src="static/picture/1f631.svg" class="b2-smilies"></button><button class="text smily-button"><img
												 src="static/picture/1f62d.svg" class="b2-smilies"></button><button class="text smily-button"><img src="static/picture/1f480.svg"
												 class="b2-smilies"></button><button class="text smily-button"><img src="static/picture/1f4a9.svg" class="b2-smilies"></button><button
											 class="text smily-button"><img src="static/picture/1f44d.svg" class="b2-smilies"></button><button class="text smily-button"><img
												 src="static/picture/1f4aa.svg" class="b2-smilies"></button><button class="text smily-button"><img src="static/picture/1f44a.svg"
												 class="b2-smilies"></button><button class="text smily-button"><img src="static/picture/1f61a.svg" class="b2-smilies"></button></div>
										<!---->
									</div>
									<div class="com-form-button-r"><button class="text mg-r">取消回复</button> <button class="">提交</button></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="related-posts mg-t box b2-radius">
					<div class="related-posts-title">猜你喜欢</div>
					<div class="hidden-line">
						<div class="related-posts-in">
							<#-- 标签推荐 -->
							<#if tags?? && tags?size gt 0>
								<@tags_related_macro.tagsRelatedMacro />
							</#if>
						</div>
					</div>
				</div>
			</div>
			<aside id="secondary" class="widget-area" style="min-width: 350px;">
				<div class="sidebar-innter" style="">
					<div class="inner-wrapper-sticky" style="position: relative; transform: translate3d(0px, 0px, 0px);">
						<#include "../section/download.ftl">
							
						<#-- 分类推荐 -->
						<#if categories?? && categories?size gt 0>
							<@categories_related_macro.categoryRelatedMacro />
						</#if>
							
						<#include "../section/recent_posts.ftl">
					</div>
				</div>
			</aside>
		</div>
	</div>
</div>

<!-- 海报组件 -->
<div id="poster-box">
	<div class="modal poster-box" data="">
		<div data-poster="{&quot;title&quot;:&quot;\u5927\u516c\u53f8\u5934\u6761\uff1a\u963f\u91cc\u5ba3\u5e03 20 \u4ebf\u7f8e\u5143\u6536\u8d2d\u7f51\u6613\u8003\u62c9&quot;,&quot;content&quot;:&quot;\u963f\u91cc\u5ba3\u5e03 20 \u4ebf\u7f8e\u5143\u6536\u8d2d\u7f51\u6613\u8003\u62c9\uff0c\u9886\u6295\u7f51\u6613\u4e91\u97f3\u4e50 7 \u4ebf\u7f8e\u5143\u878d\u8d44 \u4eca\u5929\u4e0a\u5348\uff0c\u963f\u91cc\u5ba3\u5e03\u4ee5 20 \u4ebf\u7f8e\u5143\u5168\u8d44\u6536&quot;,&quot;thumb&quot;:&quot;https:\/\/static.7b2.com\/wp-content\/uploads\/2020\/04\/41475962a1e20195a_1_cover.jpg?x-oss-process=image\/resize,m_fill,h_700,w_482&quot;,&quot;logo&quot;:&quot;https:\/\/static.7b2.com\/wp-content\/uploads\/2020\/01\/1a592ea2634ae3.png&quot;,&quot;desc&quot;:&quot;\u53c8\u662f\u90a3\u5c61\u6668\u5149\uff0c\u8fd8\u662f\u4ece\u8001\u5730\u65b9\u7167\u8fdb\u6765\uff0c\u771f\u597d\uff01&quot;,&quot;date&quot;:{&quot;year&quot;:&quot;2019&quot;,&quot;month&quot;:&quot;09&quot;,&quot;day&quot;:&quot;06&quot;},&quot;link&quot;:&quot;https:\/\/www.dachaoka.com\/35223.html?ref=dBCBCkrns&quot;}"
		 class="modal-content b2-radius"><span class="close-button">×</span>
			<div class="poster-content">
				<div class="poster-loading button empty b2-loading empty-page text"></div>
				<div class="poster-box-left">
					<div>
						<div class="poster-image" style="background-image: url(&quot;https://static.7b2.com/wp-content/uploads/2020/04/41475962a1e20195a_1_cover.jpg?x-oss-process=image/resize,m_fill,h_700,w_482&quot;);">
							<div class="poster-date">
								<div class="poster-date-day"><span>06</span></div>
								<div class="poster-date-year"><span>2019</span> <span>09</span></div>
							</div>
						</div>
						<div class="poster-info">
							<h2>大公司头条：阿里宣布 20 亿美元收购网易考拉</h2>
							<p>阿里宣布 20 亿美元收购网易考拉，领投网易云音乐 7 亿美元融资 今天上午，阿里宣布以 20 亿美元全资收</p>
						</div>
						<div class="poster-footer">
							<div class="poster-footer-left"><img src="https://static.7b2.com/wp-content/uploads/2020/01/1a592ea2634ae3.png">
								<p>又是那屡晨光，还是从老地方照进来，真好！</p>
							</div>
							<div class="poster-footer-right"><img src="data:image/jpeg;base64,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"></div>
						</div>
					</div>
				</div>
				<div class="poster-share">
					<div class="social-share">
						<p>分享到：</p> <button class="poster-share-weibo">微博</button> <button class="poster-share-qq">QQ好友</button>
						<button class="poster-share-qq-k">QQ空间</button>
					</div>
					<div class="poster-down-load">
						<p>下载海报：</p> <a href="" download="大公司头条：阿里宣布 20 亿美元收购网易考拉.jpg" class="poster-share-download button">点击下载</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

