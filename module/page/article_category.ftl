<div id="page" class="site">
	<div id="content" class="site-content">
		<div class="tax-header mg-t- mg-b">
			<div class="b2-light-dark">
				<div class="b2-light-dark-outside">
					<div class="b2-light-dark-bg" style="background-image: url(${theme_base!}/source/picture/category_bg.jpg);"></div>
				</div>
				<div class="wrapper">
					<div class="tax-info">
						<div class="tax-info-item">
							<button class="fliter-button" @click.stop="show('hot')">智能<i class="b2font b2-jt-block-down "></i></button>
						</div>
						<div class="tax-info-item mobile-show" @click.stop="show('cat')">
							<button class="fliter-button">筛选<i class="b2font b2-jt-block-down "></i></button>
						</div>
						<div class="tax-search tax-info-item">
							<form method="post" action="https://www.dachaoka.com/wp-jq/fenlei1" autocomplete="off">
								<input type="text" name="archiveSearch" class="b2-radius" placeholder="在「分类3」中搜索" value="">
								<button class="text"><i class="b2font b2-search "></i></button>
							</form>
						</div>
						<div class="tax-info-item">
							<a class="fliter-button button" href="javascript:;" target="_blank">全部标签</a>
						</div>
						<div class="tax-info-item tag-list">
							<a href="测试.html">测试</a> <a href="wordpress.html">wordpress</a> <a href="ziranzhi2.html">ziranzhi2</a> <a href="wp技巧.html">WP技巧</a>
						</div>
						<div class="tax-title">
							<h1 class="b2-radius" style="background-image:url(static/image/1ea9b58345ba48.jpg)"><span>分类3</span></h1>
						</div>
					</div>
					<div class="tax-fliter-hot" v-show="showFliter.hot" v-cloak="">
						<div class="tax-order-box">
							<div class="order-items"><a href="javascript:;" class="current">最新</a><a href="javascript:;" class="">随机</a><a
								 href="javascript:;" class="">最多浏览</a><a href="javascript:;" class="">最多喜欢</a><a href="javascript:;" class="">最多评论</a></div>
						</div>
					</div>
					<div :id="showFliter.cat ? 'fliter-show' : ''" class="tax-fliter-cat" ref="filterContent">
						<div id="filter-top">
							<div class="filters-box">
								<ul>
									<li>
										<div class="filter-name">分类：</div>
										<div class="filter-items"><a href="fenlei14.html" class="" title="这是另外一个分类目录">这是另外一个分类目录</a><a href="fenlei3.html"
											 class="" title="分类5">分类5</a><a href="fenlei4.html" class="" title="分类6">分类6</a><a href="years.html" class=""
											 title="years">years</a><a href="fenlei6.html" class="" title="未分类">未分类</a><a href="wp-jq.html" class=""
											 title="WP技巧">WP技巧</a><a href="" class="current" title="分类3">分类3</a><a href="fenlei2.html" class="" title="分类4">分类4</a><a
											 href="fenlei8.html" class="" title="测试分类">测试分类</a><a href="ertae.html" class="" title="主题更新">主题更新</a></div>
									</li>
									<li>
										<div class="filter-name">专题：</div>
										<div class="filter-items"><a href="" class="current">全部</a><a href="javascript:;" class="" title="柒比贰主题技巧">柒比贰主题技巧</a><a
											 href="javascript:;" class="" title="新物种奇观">新物种奇观</a><a href="javascript:;" class="" title="疯狂的大自然">疯狂的大自然</a><a
											 href="javascript:;" class="" title="动物也逗逼">动物也逗逼</a><a href="javascript:;" class="" title="心系武汉，区块链从业者不是旁观者">心系武汉，区块链从业者不是旁观者</a><a
											 href="javascript:;" class="" title="它是外星物种吗？">它是外星物种吗？</a><a href="javascript:;" class="" title="地理奇迹之旅">地理奇迹之旅</a></div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="waves-bg">
					<svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 24 150 28"
					 preserveaspectratio="none" shape-rendering="auto">
						<defs>
							<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
						</defs>
						<g class="parallax">
							<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"></use>
							<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"></use>
							<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"></use>
							<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
						</g>
					</svg>
				</div>
			</div>
		</div>
		<div class="b2-single-content wrapper category single-sidebar-show ">

			<div id="primary-home" class="content-area box">
				<style>
					.post-item-1 ul.b2_gap > li{
							width:100%    
					}
				</style>
				<div class="archive-row">
					<div class="post-3 post-list post-item-1 hidden-line" id="post-list">
						<ul class="b2_gap ">
							<li class="post-3-li post-list-item">
								<div class="item-in b2-radius">
									<div class="post-module-thumb">
										<div style="padding-top:70%;width:100%;height:0">
											<a href="31055.html" rel="nofollow" class="thumb-link"><img class="post-thumb b2-radius lazy" data-src="static/picture/17ee9055c7ead9-imageresizem_fill3.jpg"
												 src="static/picture/default-img.jpg"></a>
										</div>
									</div>
									<div class="post-info">
										<div class="post-list-cat  b2-radius"><a class="post-list-cat-item b2-radius" href=""><span class="post-3-cat"
												 style="border: 2px solid #607d8b"></span>分类3</a></div>
										<h2><a href="31055.html">短代码嵌套测试，音乐-浮夸</a></h2>
										<div class="post-excerpt">
											听这首歌产生共鸣，可能是因为我就像歌中的喽啰，出身于农村，毕业于三本，无钱无势无背景，感觉自己就像是人潮内不被理睬的那一个，我夸张，我害怕，想找到一个...
										</div>
										<div class="post-list-meta-box ">
											<ul class="post-list-meta">
												<li class="post-list-meta-user"><a class="post-list-meta-avatar" href="auuAwtzuk.html"><img class="avatar b2-radius lazy"
														 data-src="static/picture/119ba8f8ed6d95_1_avatar-imageres.jpg" src="static/picture/default-img.jpg"><span>春哥</span><svg
														 class="Zi Zi--BadgeCert" fill="currentColor" viewbox="0 0 24 24" width="18" height="18">
															<g fill="none" fill-rule="evenodd">
																<path fill="#0F88EB" d="M2.64 13.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.122 3.21.655 4.083 1.734l-.125-.154c.876 1.084 2.304 1.092 3.195.027l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.279-2.238l.017.197c-.122-1.388.655-3.212 1.734-4.084l-.154.125c1.083-.876 1.092-2.304.027-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.279l.198-.017c-1.387.123-3.21-.654-4.083-1.733l.125.153c-.876-1.083-2.304-1.092-3.195-.027l.127-.152c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.279 2.24L4.4 6.363c.122 1.387-.655 3.21-1.734 4.084l.154-.126c-1.083.878-1.092 2.304-.027 3.195l-.152-.127z"></path>
																<path fill="#FFF" d="M9.78 15.728l-2.633-2.999s-.458-.705.242-1.362c.7-.657 1.328-.219 1.328-.219l1.953 2.132 4.696-4.931s.663-.348 1.299.198c.636.545.27 1.382.27 1.382s-3.466 3.858-5.376 5.782c-.98.93-1.778.017-1.778.017z"></path>
															</g>
														</svg></a></li>
												<li class="post-list-meta-date"><span><time class="b2timeago" datetime="2018-4-30 8:26:08" itemprop="datePublished">2018-4-30
															8:26:08</time></span></li>
												<li class="post-list-meta-like"><span><i class="b2font b2-love "></i>1</span></li>
												<li class="post-list-meta-views"><span><i class="b2font b2-eye "></i>3k</span></li>
											</ul>
										</div>
									</div>
								</div>
							</li>
							<li class="post-3-li post-list-item">
								<div class="item-in b2-radius">
									<div class="post-module-thumb">
										<div style="padding-top:70%;width:100%;height:0">
											<a href="30889.html" rel="nofollow" class="thumb-link"><img class="post-thumb b2-radius lazy" data-src="static/picture/13007ca58827dd-imageresizem_fill4.jpg"
												 src="static/picture/default-img.jpg"></a>
										</div>
									</div>
									<div class="post-info">
										<div class="post-list-cat  b2-radius"><a class="post-list-cat-item b2-radius" href=""><span class="post-3-cat"
												 style="border: 2px solid #607d8b"></span>分类3</a><a class="post-list-cat-item b2-radius" href="fenlei8.html"><span
												 class="post-3-cat" style="border: 2px solid #607d8b"></span>测试分类</a></div>
										<h2><a href="30889.html">主题升级到 2.3.0 ，并且已经改名柒比贰（seven）主题，请大家注意！</a></h2>
										<div class="post-excerpt">
											我的自然志网站已经出售，所以主题也改了名，从这个版本起，咱们主题更名为柒比贰（seven）主题。如果没有意外，主题一般会保持半个月到一个月内更新一次的频率...
										</div>
										<div class="post-list-meta-box ">
											<ul class="post-list-meta">
												<li class="post-list-meta-user"><a class="post-list-meta-avatar" href="auuAwtzuk.html"><img class="avatar b2-radius lazy"
														 data-src="static/picture/119ba8f8ed6d95_1_avatar-imageres.jpg" src="static/picture/default-img.jpg"><span>春哥</span><svg
														 class="Zi Zi--BadgeCert" fill="currentColor" viewbox="0 0 24 24" width="18" height="18">
															<g fill="none" fill-rule="evenodd">
																<path fill="#0F88EB" d="M2.64 13.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.122 3.21.655 4.083 1.734l-.125-.154c.876 1.084 2.304 1.092 3.195.027l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.279-2.238l.017.197c-.122-1.388.655-3.212 1.734-4.084l-.154.125c1.083-.876 1.092-2.304.027-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.279l.198-.017c-1.387.123-3.21-.654-4.083-1.733l.125.153c-.876-1.083-2.304-1.092-3.195-.027l.127-.152c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.279 2.24L4.4 6.363c.122 1.387-.655 3.21-1.734 4.084l.154-.126c-1.083.878-1.092 2.304-.027 3.195l-.152-.127z"></path>
																<path fill="#FFF" d="M9.78 15.728l-2.633-2.999s-.458-.705.242-1.362c.7-.657 1.328-.219 1.328-.219l1.953 2.132 4.696-4.931s.663-.348 1.299.198c.636.545.27 1.382.27 1.382s-3.466 3.858-5.376 5.782c-.98.93-1.778.017-1.778.017z"></path>
															</g>
														</svg></a></li>
												<li class="post-list-meta-date"><span><time class="b2timeago" datetime="2018-4-19 7:07:46" itemprop="datePublished">2018-4-19
															7:07:46</time></span></li>
												<li class="post-list-meta-like"><span><i class="b2font b2-love "></i>1</span></li>
												<li class="post-list-meta-views"><span><i class="b2font b2-eye "></i>4.9k</span></li>
											</ul>
										</div>
									</div>
								</div>
							</li>
							<li class="post-3-li post-list-item">
								<div class="item-in b2-radius">
									<div class="post-module-thumb">
										<div style="padding-top:70%;width:100%;height:0">
											<a href="356.html" rel="nofollow" class="thumb-link"><img class="post-thumb b2-radius lazy" data-src="static/picture/201711231037163hxz6G0A21TiNvgk-i1.gif"
												 src="static/picture/default-img.jpg"></a>
										</div>
									</div>
									<div class="post-info">
										<div class="post-list-cat  b2-radius"><a class="post-list-cat-item b2-radius" href=""><span class="post-3-cat"
												 style="border: 2px solid #607d8b"></span>分类3</a><a class="post-list-cat-item b2-radius" href="ertae.html"><span
												 class="post-3-cat" style="border: 2px solid #43d480"></span>主题更新</a></div>
										<h2><a href="356.html">“华生”出演圣诞爱情广告，腾讯视频在北师大办床单电影院</a></h2>
										<div class="post-excerpt">
											这里有营销和营销人相关的一切...
										</div>
										<div class="post-list-meta-box ">
											<ul class="post-list-meta">
												<li class="post-list-meta-user"><a class="post-list-meta-avatar" href="auuAwtzuk.html"><img class="avatar b2-radius lazy"
														 data-src="static/picture/119ba8f8ed6d95_1_avatar-imageres.jpg" src="static/picture/default-img.jpg"><span>春哥</span><svg
														 class="Zi Zi--BadgeCert" fill="currentColor" viewbox="0 0 24 24" width="18" height="18">
															<g fill="none" fill-rule="evenodd">
																<path fill="#0F88EB" d="M2.64 13.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.122 3.21.655 4.083 1.734l-.125-.154c.876 1.084 2.304 1.092 3.195.027l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.279-2.238l.017.197c-.122-1.388.655-3.212 1.734-4.084l-.154.125c1.083-.876 1.092-2.304.027-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.279l.198-.017c-1.387.123-3.21-.654-4.083-1.733l.125.153c-.876-1.083-2.304-1.092-3.195-.027l.127-.152c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.279 2.24L4.4 6.363c.122 1.387-.655 3.21-1.734 4.084l.154-.126c-1.083.878-1.092 2.304-.027 3.195l-.152-.127z"></path>
																<path fill="#FFF" d="M9.78 15.728l-2.633-2.999s-.458-.705.242-1.362c.7-.657 1.328-.219 1.328-.219l1.953 2.132 4.696-4.931s.663-.348 1.299.198c.636.545.27 1.382.27 1.382s-3.466 3.858-5.376 5.782c-.98.93-1.778.017-1.778.017z"></path>
															</g>
														</svg></a></li>
												<li class="post-list-meta-date"><span><time class="b2timeago" datetime="2017-11-29 15:35:49" itemprop="datePublished">2017-11-29
															15:35:49</time></span></li>
												<li class="post-list-meta-like"><span><i class="b2font b2-love "></i>1</span></li>
												<li class="post-list-meta-views"><span><i class="b2font b2-eye "></i>2.5k</span></li>
											</ul>
										</div>
									</div>
								</div>
							</li>
							<li class="post-3-li post-list-item">
								<div class="item-in b2-radius">
									<div class="post-module-thumb">
										<div style="padding-top:70%;width:100%;height:0">
											<a href="125.html" rel="nofollow" class="thumb-link"><img class="post-thumb b2-radius lazy" data-src="static/picture/201711141636364KsCiHlRWwcL2SYg-i3.jpg"
												 src="static/picture/default-img.jpg"></a>
										</div>
									</div>
									<div class="post-info">
										<div class="post-list-cat  b2-radius"><a class="post-list-cat-item b2-radius" href=""><span class="post-3-cat"
												 style="border: 2px solid #607d8b"></span>分类3</a></div>
										<h2><a href="125.html">最大限度发挥 iPhone 的双镜头，这个应用比苹果自己的更好</a></h2>
										<div class="post-excerpt">
											比系统相机应用强大到不知哪里去。...
										</div>
										<div class="post-list-meta-box ">
											<ul class="post-list-meta">
												<li class="post-list-meta-user"><a class="post-list-meta-avatar" href="auuAwtzuk.html"><img class="avatar b2-radius lazy"
														 data-src="static/picture/119ba8f8ed6d95_1_avatar-imageres.jpg" src="static/picture/default-img.jpg"><span>春哥</span><svg
														 class="Zi Zi--BadgeCert" fill="currentColor" viewbox="0 0 24 24" width="18" height="18">
															<g fill="none" fill-rule="evenodd">
																<path fill="#0F88EB" d="M2.64 13.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.122 3.21.655 4.083 1.734l-.125-.154c.876 1.084 2.304 1.092 3.195.027l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.279-2.238l.017.197c-.122-1.388.655-3.212 1.734-4.084l-.154.125c1.083-.876 1.092-2.304.027-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.279l.198-.017c-1.387.123-3.21-.654-4.083-1.733l.125.153c-.876-1.083-2.304-1.092-3.195-.027l.127-.152c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.279 2.24L4.4 6.363c.122 1.387-.655 3.21-1.734 4.084l.154-.126c-1.083.878-1.092 2.304-.027 3.195l-.152-.127z"></path>
																<path fill="#FFF" d="M9.78 15.728l-2.633-2.999s-.458-.705.242-1.362c.7-.657 1.328-.219 1.328-.219l1.953 2.132 4.696-4.931s.663-.348 1.299.198c.636.545.27 1.382.27 1.382s-3.466 3.858-5.376 5.782c-.98.93-1.778.017-1.778.017z"></path>
															</g>
														</svg></a></li>
												<li class="post-list-meta-date"><span><time class="b2timeago" datetime="2017-4-15 0:07:16" itemprop="datePublished">2017-4-15
															0:07:16</time></span></li>
												<li class="post-list-meta-like"><span><i class="b2font b2-love "></i>0</span></li>
												<li class="post-list-meta-views"><span><i class="b2font b2-eye "></i>917</span></li>
											</ul>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div class="b2-pagenav post-nav b2-hidden-always" data-max="1">
					<page-nav paged="1" navtype="post" pages="1" type="p" :box="selecter" :opt="opt" :api="api" url="https://www.dachaoka.com/wp-jq/fenlei1"
					 title="分类3"></page-nav>

				</div>
			</div>


			<aside id="secondary" class="widget-area">
				<div class="sidebar-innter">
					<section id="b2-widget-user-13" class="mobile-hidden widget b2-widget-user mg-b box b2-radius">
						<div class="b2-widget-box">
							<div class="user-widget" id="user-widget" ref="userWidget">
								<div class="user-widget-content">
									<div class="widget-gujia-user" ref="gujia">
										<div class="user-widget-cover">
										</div>
										<div class="user-widget-info">
											<div class="user-w-avatar">

											</div>
											<div class="user-w-name">
											</div>
										</div>
										<div class="user-w-tj">
											<div>
											</div>
											<div>
											</div>
											<div>
											</div>
											<div>
											</div>
										</div>
										<div class="user-w-rw"></div>
										<div class="user-w-gold">
											<div class="user-money"></div>
											<div class="user-credit"></div>
										</div>
									</div>
									<div v-if="data !== '' && !data.oauth" v-cloak="">
										<div class="user-widget-cover">
											<img :src="data.cover" v-if="data.cover">
										</div>
										<div class="user-widget-info">
											<div class="user-w-avatar">
												<a :href="data.link" class="avatar-parent"><img :src="data.avatar" v-if="data.avatar" class="avatar"></a>
											</div>
											<div class="user-w-name">
												<a :href="data.link">
													<h2 v-text="data.name"></h2><span v-html="data.verify_icon" v-if="data.verify"></span>
												</a>
												<div class="user-w-lv">
													<div v-html="data.lv.vip.icon" v-if="data.lv.vip.icon"></div>
													<div v-html="data.lv.lv.icon" v-if="data.lv.lv.icon"></div>
												</div>
											</div>
										</div>
										<div class="user-w-tj">
											<div>
												<p>文章</p>
												<span v-text="data.post_count"></span>
											</div>
											<div>
												<p>评论</p>
												<span v-text="data.comment_count"></span>
											</div>
											<div>
												<p>关注</p>
												<span v-text="data.following"></span>
											</div>
											<div>
												<p>粉丝</p>
												<span v-text="data.followers"></span>
											</div>
										</div>
										<div class="user-w-rw"><a class="link-block" href="task.html"></a>您已完成今天任务的<span v-text="data.task+'%'"></span></div>
										<div class="user-w-gold">
											<div class="user-money"><a href="gold.html">￥{{data.money}}</a></div>
											<div class="user-credit"><a href="gold.html"><i class="b2font b2-jifen "></i>{{data.credit}}</a></div>
										</div>
									</div>
									<div v-cloak="" v-else-if="data !== ''">
										<div class="user-w-logon">
											<p class="user-w-logon-title">嗨！朋友</p>
											<p>所有的伟大，都源于一个勇敢的开始</p>
										</div>
										<div v-if="data.oauth.length !== 0">
											<div class="user-w-login-tips">
												免注册登录
											</div>
											<div class="oauth-login-button">
												<a :href="open.url" :class="'login-'+key" v-for="(open,key,index) in data.oauth" @click="markHistory(key)"
												 v-if="open.open">{{open.name}}登录</a>
											</div>
										</div>
										<div class="no-social" v-else="">
											<button @click="login.show = true">登录</button>
										</div>
									</div>
								</div>
							</div>

						</div>
					</section>
					<section id="b2-widget-mission-2" class="mobile-hidden widget b2-widget-mission mg-b box b2-radius">
						<div class="b2-widget-box">
							<div class="mission-widget" ref="missionWidget" data-count="6">
								<div class="mission-gujia" ref="missiongujia">
									<div class="user-w-qd">
										<div class=""></div>
									</div>
									<div class="user-w-qd-list">
										<div class="user-w-qd-list-title">
											<p><span></span></p>
											<p><span></span></p>
										</div>
										<div class="mission-today-list">
											<ul>

												<li>
													<a href="#" class="user-link-block avatar-parent"><span></span></a>
													<div class="user-mission-info">
														<div class="user-mission-info-left">
															<a href="#">
																<p></p>
															</a>
															<p><time></time></p>
														</div>
														<div class="user-mission-info-right">
															<span class="user-credit"></span>
														</div>
													</div>
												</li>

												<li>
													<a href="#" class="user-link-block avatar-parent"><span></span></a>
													<div class="user-mission-info">
														<div class="user-mission-info-left">
															<a href="#">
																<p></p>
															</a>
															<p><time></time></p>
														</div>
														<div class="user-mission-info-right">
															<span class="user-credit"></span>
														</div>
													</div>
												</li>

												<li>
													<a href="#" class="user-link-block avatar-parent"><span></span></a>
													<div class="user-mission-info">
														<div class="user-mission-info-left">
															<a href="#">
																<p></p>
															</a>
															<p><time></time></p>
														</div>
														<div class="user-mission-info-right">
															<span class="user-credit"></span>
														</div>
													</div>
												</li>

												<li>
													<a href="#" class="user-link-block avatar-parent"><span></span></a>
													<div class="user-mission-info">
														<div class="user-mission-info-left">
															<a href="#">
																<p></p>
															</a>
															<p><time></time></p>
														</div>
														<div class="user-mission-info-right">
															<span class="user-credit"></span>
														</div>
													</div>
												</li>

												<li>
													<a href="#" class="user-link-block avatar-parent"><span></span></a>
													<div class="user-mission-info">
														<div class="user-mission-info-left">
															<a href="#">
																<p></p>
															</a>
															<p><time></time></p>
														</div>
														<div class="user-mission-info-right">
															<span class="user-credit"></span>
														</div>
													</div>
												</li>

												<li>
													<a href="#" class="user-link-block avatar-parent"><span></span></a>
													<div class="user-mission-info">
														<div class="user-mission-info-left">
															<a href="#">
																<p></p>
															</a>
															<p><time></time></p>
														</div>
														<div class="user-mission-info-right">
															<span class="user-credit"></span>
														</div>
													</div>
												</li>

											</ul>
											<div class="widget-mission-footer"><a href="mission.html" target="_blank">签到排行</a></div>
										</div>
									</div>
								</div>
								<div v-cloak="" v-if="data !== ''">
									<div :class="['user-w-qd',{'cur':!data.mission.credit}]" @click="mission()" v-if="data !== ''">
										<div class="" v-if="locked"><i class="b2font b2-gift2e "></i>幸运之星正在降临...</div>
										<div class="" v-else-if="data.mission.credit == ''"><i class="b2font b2-gift2e "></i>点击领取今天的签到奖励！</div>
										<div class="" v-else=""><i class="b2font b2-gift2e "></i>恭喜！您今天获得了<b>{{data.mission.credit}}</b>积分</div>
									</div>
									<div class="user-w-qd-list">
										<div class="user-w-qd-list-title">
											<p :class="type == 'today' ? 'picked' : ''" @click="type = 'today'"><span>今日签到</span></p>
											<p :class="type == 'always' ? 'picked' : ''" @click="type = 'always'"><span>连续签到</span></p>
										</div>
										<div class="mission-today-list" v-cloak="" v-if="data.mission">
											<ul v-if="type === 'today'">
												<li v-for="item in data.mission_today_list.data">
													<a :href="item.user.link" class="user-link-block avatar-parent"><img :src="item.user.avatar" class="b2-radius avatar"><span
														 v-if="item.user.user_title" v-html="item.user.verify_icon"></span></a>
													<div class="user-mission-info">
														<div class="user-mission-info-left">
															<a :href="item.user.link">
																<p v-text="item.user.name"></p>
															</a>
															<p><time class="b2timeago" :datetime="item.date" itemprop="datePublished">{{item.date}}</time></p>
														</div>
														<div class="user-mission-info-right">
															<span class="user-credit"><i class="b2font b2-jifen "></i>{{item.credit}}</span>
														</div>
													</div>
												</li>
											</ul>
											<ul v-else="">
												<li v-for="_item in data.mission_always_list.data">
													<a :href="_item.user.link" class="user-link-block avatar-parent"><img :src="_item.user.avatar" class="b2-radius avatar"><span
														 v-if="_item.user.user_title" v-html="_item.user.verify_icon"></span></a>
													<div class="user-mission-info">
														<div class="user-mission-info-left">
															<a :href="_item.user.link">
																<p v-text="_item.user.name"></p>
															</a>
															<p><time class="b2timeago" :datetime="_item.date" itemprop="datePublished">{{_item.date}}</time></p>
														</div>
														<div class="user-mission-info-right">
															连续{{_item.count}}天
														</div>
													</div>
												</li>
											</ul>
											<div class="widget-mission-footer"><a href="mission.html" target="_blank">签到排行</a></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section id="b2-widget-credit-top-2" class="mobile-hidden widget b2-widget-credit-top mg-b box b2-radius">
						<div class="b2-widget-title">
							<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>积分排行</h2>
						</div>
						<div class="b2-widget-box">
							<div class="credit-top" data-settings='{"meta_key":"zrz_credit_total","orderby":"meta_value_num","order":"DESC","number":"10","exclude":["1"]}'
							 ref="creditTop">
								<ul class="gujia credit-top-list" ref="creditTopGujia">
									<li>
										<div class="credit-top-avatar"></div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class=""></div>
												<p><span></span><span></span></p>
											</div>
											<div class="credit-top-info-right"></div>
										</div>
									</li>
									<li>
										<div class="credit-top-avatar"></div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class=""></div>
												<p><span></span><span></span></p>
											</div>
											<div class="credit-top-info-right"></div>
										</div>
									</li>
									<li>
										<div class="credit-top-avatar"></div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class=""></div>
												<p><span></span><span></span></p>
											</div>
											<div class="credit-top-info-right"></div>
										</div>
									</li>
									<li>
										<div class="credit-top-avatar"></div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class=""></div>
												<p><span></span><span></span></p>
											</div>
											<div class="credit-top-info-right"></div>
										</div>
									</li>
									<li>
										<div class="credit-top-avatar"></div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class=""></div>
												<p><span></span><span></span></p>
											</div>
											<div class="credit-top-info-right"></div>
										</div>
									</li>
									<li>
										<div class="credit-top-avatar"></div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class=""></div>
												<p><span></span><span></span></p>
											</div>
											<div class="credit-top-info-right"></div>
										</div>
									</li>
									<li>
										<div class="credit-top-avatar"></div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class=""></div>
												<p><span></span><span></span></p>
											</div>
											<div class="credit-top-info-right"></div>
										</div>
									</li>
									<li>
										<div class="credit-top-avatar"></div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class=""></div>
												<p><span></span><span></span></p>
											</div>
											<div class="credit-top-info-right"></div>
										</div>
									</li>
									<li>
										<div class="credit-top-avatar"></div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class=""></div>
												<p><span></span><span></span></p>
											</div>
											<div class="credit-top-info-right"></div>
										</div>
									</li>
									<li>
										<div class="credit-top-avatar"></div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class=""></div>
												<p><span></span><span></span></p>
											</div>
											<div class="credit-top-info-right"></div>
										</div>
									</li>
								</ul>
								<ul class="credit-top-list" v-if="data != ''" v-cloak="">
									<li v-for="item in data">
										<div class="credit-top-avatar">
											<img :src="item.avatar" class="avatar b2-radius">
										</div>
										<div class="credit-top-info">
											<div class="credit-top-info-left">
												<div class="credit-top-name" v-text="item.name"></div>
												<p><span v-html="item.vip"></span><span v-html="item.lv"></span></p>
											</div>
											<div class="credit-top-info-right"><span><i class="b2font b2-jifen "></i><b v-text="item.credit"></b></span></div>
										</div>
									</li>
								</ul>
								<div class="widget-mission-footer"><a href="gold-top.html" target="_blank">积分排行</a></div>
							</div>
						</div>
					</section>
				</div>
			</aside>
		</div>
		
	</div>
</div>
