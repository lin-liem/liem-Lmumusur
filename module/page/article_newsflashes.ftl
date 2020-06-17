<div class="b2-single-content wrapper">
	<div id="primary-home" class="content-area">
		<article class="single-article b2-radius box">
			<header class="entry-header">
				<div class="">
					<div class="post-list-cat  b2-radius"></div>
				</div>
				<h1>${post.title!}</h1>
				<div id="post-meta">
					<ul class="post-meta">
						<li class="single-tags"><span><a href="https://www.dachaoka.com/newsflashes/apple" target="_blank">apple</a></span></li>
						<li class="single-date"><span><span>>${post.createTime?string('yyyy年MM月dd日')}</span><span>星期六</span></span></li>
						<li class="single-eye"><span><i class="b2font b2-eye "></i><b>${post.visits!}</b></span></li>
						
						<li class="single-like"><span><i class="b2font b2-pinglun"></i><b>${post.commentCount}</b></span></li>
					</ul>
					<div class="post-user-info">
						<div class="post-meta-left">
							<div class="avatar-parent">
								<img src="${user.avatar!}" class="avatar b2-radius">
							</div>
							<div class="post-user-name">
								<b>${user.nickname!}</b>
								<span class="user-title">${user.description!}</span>
							</div>
						</div>
						<div class="post-meta-right">
							<div id="content-gongzhonghao">
								<button onclick="gongzhonghaoBox.show = true" >公众号</button>
								<button class="empty"><a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=c98acaeab8547d5b5be9192e192192916603daca30143e21df22c9ed6999d806">企鹅群</a></button>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div class="entry-content">${post.formatContent!}</div>
			<div class="content-footer">
				<div class="content-footer-poster">
					<button class="poster-span" @click="openPoster()"><i class="b2font b2-feiji "></i><b>海报分享</b></button>
				</div>
				<div class="content-footer-zan-cai">
					<span class="">最后编辑时间&nbsp;&nbsp;|&nbsp;&nbsp;${post.editTime?string('yyyy-MM-dd HH:mm:ss')}</span> 
				</div>
			</div>
			
		</article>
		<div class="comments-box">
			<div id="comments" class="comments-area box b2-radius">
				<div class="comments-title">
					<div class="comment-info">
						<span>${post.commentCount}条回复</span> 
						<span>|</span>
						<span>若显示条数与实际不符，表明部分留言非开放</span>
					</div>
					<div class="comment-tips" style="">
						<span><i class="b2font b2-write "></i>世界以痛吻我，要我报之以歌</span>
					</div>
				</div>
				
				<div class="comments-area-content respond">
					<#if commentType =='post'>
						<@comment post,"post" />
					<#else>
						<@comment post,"sheet" />
					</#if>
				</div>
			</div> 
		</div>
		<div class="comments-box">
			<div id="comments" class="comments-area box b2-radius">
				<div class="comments-title">
					<div class="comment-info"><span> 0 条回复 </span> <span><b class="comment-auth-mod comment-auth">A</b><i>文章作者</i></span>
						<span><b class="comment-auth-mod comment-mod">M</b><i>管理员</i></span></div>
					<div class="comment-tips" style=""><span><span>停留是刹那，转身即天涯
							</span></span></div>
				</div>
				<div class="comments-area-content">
					<ol class="comment-list">
						<div class="none-comment">暂无讨论，说说你的看法吧</div>
					</ol>
				</div>
				<div class="b2-pagenav comment-nav b2-radius b2-hidden-always">
					<div class="ajax-pager" style="display: none;">
						<div class="ajax-pagenav">
							<div class="btn-group"> <label class="pager-center" style="display: none;"><input type="text" autocomplete="off">/0
									页</label></div>
							<div class="btn-pager"><button disabled="disabled" class="empty button">❮</button> <button disabled="disabled"
								 class="empty button">❯</button></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<aside id="secondary" class="widget-area">
		<div class="sidebar-innter is-affixed" style="position: relative;">
			<div class="inner-wrapper-sticky" style="position: relative; transform: translate3d(0px, 71px, 0px);">
				<section id="b2-widget-newsflashes-2" class="mobile-hidden widget b2-widget-newsflashes mg-b box b2-radius">
					<div class="b2-widget-title">
						<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>快讯</h2><a target="_blank" href="https://www.dachaoka.com/newsflashes">全部</a>
					</div>
					<div class="b2-widget-box">
						<div data-json="{&quot;post_type&quot;:&quot;newsflashes&quot;,&quot;posts_per_page&quot;:5,&quot;orderby&quot;:&quot;desc&quot;}"
						 class="widget-newsflashes-box">
							<ul>
								<div style="display: none;">
									<li class="widget-news-gujia">
										<div class="widget-new-header"><span class="widget-news-user"></span> <span></span> <span></span></div>
										<div class="widget-new-content">
											<h2 class="anhover"></h2>
											<p></p>
										</div>
									</li>
									<li class="widget-news-gujia">
										<div class="widget-new-header"><span class="widget-news-user"></span> <span></span> <span></span></div>
										<div class="widget-new-content">
											<h2 class="anhover"></h2>
											<p></p>
										</div>
									</li>
									<li class="widget-news-gujia">
										<div class="widget-new-header"><span class="widget-news-user"></span> <span></span> <span></span></div>
										<div class="widget-new-content">
											<h2 class="anhover"></h2>
											<p></p>
										</div>
									</li>
									<li class="widget-news-gujia">
										<div class="widget-new-header"><span class="widget-news-user"></span> <span></span> <span></span></div>
										<div class="widget-new-content">
											<h2 class="anhover"></h2>
											<p></p>
										</div>
									</li>
									<li class="widget-news-gujia">
										<div class="widget-new-header"><span class="widget-news-user"></span> <span></span> <span></span></div>
										<div class="widget-new-content">
											<h2 class="anhover"></h2>
											<p></p>
										</div>
									</li>
								</div>
								<div style="">
									<li>
										<div class="widget-new-header"><span class="widget-news-user"><img src="https://thirdqq.qlogo.cn/g?b=oidb&amp;k=ZhvIqhOU2pMfqkNX3l8UNA&amp;s=40&amp;t=1555678011">
												<b>林浩楠</b></span> <span class="ps1">17:08</span> <span class="ps"><a href="https://www.dachaoka.com/newsflashes/apple"><b>apple</b></a></span></div>
										<div class="widget-new-content">
											<h2 class="anhover"><a href="https://www.dachaoka.com/newsflashes/36932.html" target="_blank"><b>大乘汽车深陷资金困境，土地将被政府收回</b></a></h2>
											<p><a href="https://www.dachaoka.com/newsflashes/36932.html" target="_blank">日前被曝拖欠员工数月工资的大乘汽车，名下的一块土地将被当地政府收回。江西省抚州市高新区管委会已决定收储大乘汽车位于该市的一宗400余亩工业用地及其地面附着物。3月27日，大乘汽车一位内部人士对记者表示，“那块土地是江铃轻汽的老厂区，政府准备回收进行商业开发。”</a></p>
										</div>
									</li>
									<li>
										<div class="widget-new-header"><span class="widget-news-user"><img src="https://thirdwx.qlogo.cn/mmopen/jLL0Tq6XDvNgq85rM7gKVQJ4D7iaHPtJuogZJnI5jFKFJsEXQJwLfPH7AoFRNumE06SnJdnwIF0LB9IgITBT6Pz39KXsFNJpN/132">
												<b>搞机网作者</b></span> <span class="ps1">19:24</span> <span class="ps"><a href="https://www.dachaoka.com/newsflashes/%e6%96%b0%e5%86%a0%e7%96%ab%e6%83%85"><b>新冠疫情</b></a></span></div>
										<div class="widget-new-content">
											<h2 class="anhover"><a href="https://www.dachaoka.com/newsflashes/36930.html" target="_blank"><b>新年新气象新电脑上班才爽AMD
														3950x+2080ti游戏工作担当</b></a></h2>
											<p><a href="https://www.dachaoka.com/newsflashes/36930.html" target="_blank">去年的AMD发布的产品中，第三代的RYZEN系列的处理器，收获了众多网友的一致好评。在计算行业中Intel这些年挤牙膏的行为，让我们都已经身心疲惫，AMD的这一次升级不得不说给计算这个市场注射了一针发奋挤，看着RYZEN
													9系列的产品中，虫子君的口水早已经流成江河一般。尤其是在去年的年末阶段看到3950x的测评以后，一直都是心痒难耐，不过口袋太空。无奈只能在心底的最深处将这些配置幻想在我的电脑中过一把瘾。</a></p>
										</div>
									</li>
									<li>
										<div class="widget-new-header"><span class="widget-news-user"><img src="https://static.7b2.com/wp-content/uploads/2020/06/1b1d521b44e8ed_1_avatar.jpg?x-oss-process=image/resize,m_fill,h_120,w_120">
												<b>春哥</b></span> <span class="ps1">08:02</span> <span class="ps"><a href="https://www.dachaoka.com/newsflashes/%e6%96%b0%e5%86%a0%e7%96%ab%e6%83%85"><b>新冠疫情</b></a></span></div>
										<div class="widget-new-content">
											<h2 class="anhover"><a href="https://www.dachaoka.com/newsflashes/36783.html" target="_blank"><b>阿里本地生活架构调整：成立三大事业群和三大事业部</b></a></h2>
											<p><a href="https://www.dachaoka.com/newsflashes/36783.html" target="_blank">3 月 6
													日晚，界面新闻获悉，阿里本地生活服务公司宣布了一轮组织架构调整，具体来说会调整为三大事业群和三大事业部。</a></p>
										</div>
									</li>
									<li>
										<div class="widget-new-header"><span class="widget-news-user"><img src="https://static.7b2.com/wp-content/uploads/2020/06/1b1d521b44e8ed_1_avatar.jpg?x-oss-process=image/resize,m_fill,h_120,w_120">
												<b>春哥</b></span> <span class="ps1">22:11</span> <span class="ps"><a href="https://www.dachaoka.com/newsflashes/apple"><b>apple</b></a></span></div>
										<div class="widget-new-content">
											<h2 class="anhover"><a href="https://www.dachaoka.com/newsflashes/36757.html" target="_blank"><b>斗鱼上线云游戏平台，用户可web端登陆不需再下载游戏</b></a></h2>
											<p><a href="https://www.dachaoka.com/newsflashes/36757.html" target="_blank">近日，斗鱼透露已在云端部署了近20款端游和30多款手游，囊括了最受玩家喜爱的DOTA2、绝地求生、魔兽世界、星际争霸、王者荣耀、跑跑卡丁车、消消乐等等。据了解，云游戏对显卡、内存要求很低。依托斗鱼已有的联运账号体系，玩家在web端一次性登陆，也不用下载安装游戏。</a></p>
										</div>
									</li>
									<li>
										<div class="widget-new-header"><span class="widget-news-user"><img src="https://static.7b2.com/wp-content/uploads/2019/11/19773c6c9d5957462.jpg?x-oss-process=image/resize,m_fill,h_120,w_120">
												<b>yexu</b></span> <span class="ps1">21:27</span> <span class="ps"><a href="https://www.dachaoka.com/newsflashes/%e6%96%b0%e5%86%a0%e7%96%ab%e6%83%85"><b>新冠疫情</b></a></span></div>
										<div class="widget-new-content">
											<h2 class="anhover"><a href="https://www.dachaoka.com/newsflashes/36750.html" target="_blank"><b>美媒称彭斯“控制”疫情信息发布，要求“统一口径”</b></a></h2>
											<p><a href="https://www.dachaoka.com/newsflashes/36750.html" target="_blank">【环球网综合报道】对本土肺炎疫情的判断，美国疾控中心专家和白宫官员表态不一。前者曾暗示疫情向上拐点，后者则坚称疫情已得到控制。对此，美国副总统彭斯上周召集美国卫生部门官员学者开会，明确大家要“口径一致”，声明发布前需向彭斯汇总。</a></p>
										</div>
									</li>
								</div>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</div>
	</aside>
</div>
