define(function(){

  this["JST"] = this["JST"] || {};

  this["JST"]["app/www/js/templates/comp/footerIn.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<footer><sexnav><div data-type="wank"><img src="img/sex/wank.png"></div><div data-type="hands"><img src="img/sex/hands.png"></div><div data-type="oral"><img src="img/sex/oral.png"></div><div data-type="sex"><img src="img/sex/sex.png"></div><div data-type="anything"><img src="img/sex/anything.png"></div></sexnav><saveBox class="blocks"><save><info><div><h2>Save The Details?</h2></div></info><detailsimage><div><img src="img/sex/save.png" alt="Save?"/></div></detailsimage></save></saveBox><saveWho class="blocks"><save><info><div><h2>Add the Who?</h2></div></info><detailsimage><div><img src="img/sex/save.png" alt="Save?"/></div></detailsimage></save></saveWho></footer>';return __p};

  this["JST"]["app/www/js/templates/comp/footerOut.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<footer><div class="social"><a class="facebook" href="#facebook">facebook</a><a class="twitter" href="#twitter">twitter</a></div></footer>';return __p};

  this["JST"]["app/www/js/templates/comp/headerIn.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<header class="loggedin"><menuBtn class="icon-menu"></menuBtn><back onclick="window.history.back();" class="icon-left-big"></back><div class="title"></div><add class="icon-user-add"></add></header>';return __p};

  this["JST"]["app/www/js/templates/comp/headerOut.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<header><logo><a href="/">Sex<span> Diaries</span></a></logo></header>';return __p};

  this["JST"]["app/www/js/templates/comp/menu.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<menu><h1 class="headertitle">sexdiaries.co.uk</h1><!--<a href="#profile" data-id="profile" class="headertitle"><i class="icon-user"></i>Jamie Hutber</a>--><a href="#home" data-id="home"><i class="icon-pencil"></i>Home</a><a href="#profile" data-id="profile"><i class="icon-chart-alt-outline"></i>Stats Overview</a><a href="#previous" data-id="previous"><i class="icon-calendar-outlilne"></i>Sex History</a><a href="#managewhos" data-id="managewhos"><i class="icon-users"></i>Manage Who\'s</a><a href="#shop" data-id="shop"><i class="icon-basket"></i>Shop</a><a href="#privacy" data-id="privacy"><i class="icon-lock"></i>Privacy Statement</a><a href="#settings" data-id="settings"><i class="icon-wrench"></i>Settings</a><a href="#upgrade" data-id="pro"><i class="icon-money"></i>Go Pro?</a><a href="#logout" onclick="SD.DV.doLogOut();"><i class="icon-logout"></i>Logout</a></menu>';return __p};

  this["JST"]["app/www/js/templates/comp/shell.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<content><page></page></content>';return __p};

  this["JST"]["app/www/js/templates/details/where.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<results class="searchbox"><input type="text" placeholder="Search..." id="searchwhere"/><whereReturned class="blocks"></whereReturned><input type="hidden" id="wheres"/></results>';return __p};

  this["JST"]["app/www/js/templates/details/where_result.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<result data-name="' +((__t = ( data.name )) == null ? '' : __t) +'" data-id="' +((__t = ( data.id )) == null ? '' : __t) +'"><info><div><h2>' +((__t = ( data.name )) == null ? '' : __t) +'</h2></div></info><detailsimage><div><img src="img/sex/who.png" alt="' +((__t = ( data.who )) == null ? '' : __t) +'"/></div></detailsimage></result>';return __p};

  this["JST"]["app/www/js/templates/details/who.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<results class="searchbox"><input type="text" placeholder="Search..." id="searchwho"/><whoReturned class="blocks"></whoReturned><input type="hidden" id="whos"/></results>';return __p};

  this["JST"]["app/www/js/templates/details/whoAdd.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="searchbox"><input type="text" placeholder="Person\'s Name" id="who"/></div>';return __p};

  this["JST"]["app/www/js/templates/details/who_result.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<result data-name="' +((__t = ( data.who )) == null ? '' : __t) +'" data-id="' +((__t = ( data.id )) == null ? '' : __t) +'"><info><div><h2>' +((__t = ( data.who )) == null ? '' : __t) +'</h2></div></info><detailsimage><div><img src="img/sex/who.png" alt="' +((__t = ( data.who )) == null ? '' : __t) +'"/></div></detailsimage></result>';return __p};

  this["JST"]["app/www/js/templates/home.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="royalSlider rsDefault"><a class="rsImg" id="wank" href="img/sex/full/wank.png" data-rsTmb="img/sex/wank.png" data-rsw="200"><anchor id="wank" data-type="1" href="#wank">Wank<span>For pleasuring man</span></anchor></a><a class="rsImg" id="hands" href="img/sex/full/hands.png" data-rsTmb="img/sex/hands.png" data-rsw="360"><anchor id="hands" data-type="2" href="#hands">Hands<span>Because 2 hands aren\'t enough</span></anchor></a><a class="rsImg" id="oral" href="img/sex/full/oral.png" data-rsTmb="img/sex/oral.png" data-rsw="267"><anchor id="oral" data-type="3" href="#oral">Oral Pleasures<span>2 Tounges are better than one</span></anchor></a><a class="rsImg" id="sex" href="img/sex/full/sex.png" data-rsTmb="img/sex/sex.png" data-rsw="352"><anchor id="sex" data-type="4" href="#sex">Sexy Sex<span>Fucking!</span></anchor></a><a class="rsImg" id="anything" href="img/sex/full/anything.png" data-rsTmb="img/sex/anything.png" data-rsw="179"><anchor id="anything" data-type="5" href="#anything">Anything Else<span>When sex just isn\'t enough...</span></anchor></a></div>';return __p};

  this["JST"]["app/www/js/templates/index.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div><a href="#signup" class="btn signup"><i class="icon-pencil"></i>signup</a><a href="#login" class="btn"><i class="icon-login"></i>login</a></div>';return __p};

  this["JST"]["app/www/js/templates/login/forgotten.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div><form id="forgotten" name="forgotten" method="post" action=""><input name="email" type="email" id="email" size="50" placeholder="The email address please"/><input name="Submit" type="submit" value="Recover Lost Details...?" /></form><a href="#login">Already Signed Up?</a></div>';return __p};

  this["JST"]["app/www/js/templates/login/login.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div><form action="/" class="loginForm"><div class="control-group"><i class="icon-user"><input type="text" name="uname" placeholder="Email" value="testme"/></i></div><div class="control-group"><i class="icon-lock"><input type="password" name="pword" placeholder="Password" value="testmeout"/></i></div><button class="btn" type="submit">Login</button></form><div class="login"><a href="#signup">Sign Up</a><br><a href="#forgotten">Forgotten Details?</a></div></div>';return __p};

  this["JST"]["app/www/js/templates/login/signup.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<form action="' +((__t = ( SD.AJAX+'users/reg' )) == null ? '' : __t) +'" class="signupForm ajax"><div class="elements"><div class="control-group uname"><input type="text" placeholder="Username" data-ajaxlocation="' +((__t = ( SD.HTTP+'registration/ajax/' )) == null ? '' : __t) +'" name="uname" class="server" data-error="Please enter a Username" data-to="16" data-from="4" autocomplete="off"/></div><div class="control-group email"><input type="text" placeholder="Email Address" data-ajaxlocation="' +((__t = ( SD.HTTP+'registration/ajax/' )) == null ? '' : __t) +'" name="email" class="required email server" data-error="Please enter a Email Adress" data-from="5"/></div><div class="control-group pw"><input type="password" placeholder="Password" name="pw" data-to="16" data-from="8"/></div><div class="control-group cpw"><input type="password" placeholder="Confirm Password" name="cpw" data-to="16" data-from="8"/></div><div class="control-group gener"><select name="gender" data-error="Please select a Gender" id="gender"><option value="">Gender</option><option value="0">Male</option><option value="1">Female</option></select></div><div class="control-group dob"><input type="text" name="dob" id="dob" placeholder="Date of Birth"/></div><label><input type="checkbox" name="acc_tc" class="terms" id="acc_tc"/>Agree to our <a href="terms">Terms &amp; Condish!</a></label><button class="btn signup" type="submit">Sign Up</button><a href="#login">Already Signed Up?</a></div></form>';return __p};

  this["JST"]["app/www/js/templates/other/privacy.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<ul><li class="clear" onclick="detail_view(\'Data\');" id="selector_Data"><img src="img/privacy/data.png" class="icon">We only collect anonymous information.</li><li class="clear" onclick="detail_view(\'Location\');" id="selector_Location"><img src="img/privacy/location.png" class="icon">We may collect but do not share your location history.</li><li class="clear" onclick="detail_view(\'Access\');" id="selector_Access"><img src="img/privacy/access.png" class="icon">You can request to see your personal data.</li><li class="clear" onclick="detail_view(\'Deletion\');" id="selector_Deletion"><img src="img/privacy/deletion.png" class="icon">We keep personal data until you delete it.</li><li class="clear" onclick="detail_view(\'Sharing\');" id="selector_Sharing"><img src="img/privacy/sharing.png" class="icon">We don\'t share your personal data with other companies.</li><li class="clear" onclick="detail_view(\'Ad_Tracking\');" id="selector_Ad_Tracking"><img src="img/privacy/adtracking.png" class="icon">No ad companies collect data through our service.</li><li class="clear" onclick="detail_view(\'Contact\');" id="selector_Contact"><img src="img/privacy/contact.png" class="icon">You can ask privacy questions.</li><li class="clear" onclick="detail_view(\'Vendors\');" id="selector_Vendors"><img src="img/privacy/analytics.png" class="icon">Service providers access data on our behalf.</li><li class="clear" onclick="detail_view(\'Security\');" id="selector_Security"><img src="img/privacy/vendors.png" class="icon">We take detailed steps to protect personal information.</li><li class="clear" onclick="detail_view(\'Special\');" id="selector_Special"><img src="img/privacy/special.png" class="icon">Special situations may require disclosure of your data.</li><li class="clear" onclick="detail_view(\'More\');" id="selector_More"><img src="img/privacy/more.png" class="icon">You can review more privacy-related information.</li></ul><div id="detail" style="display: none;"><div id="detail_Data" style="display: none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/data.png" class="icon">We only collect anonymous information.</li></ul><div class="text">Our systems log information like your browser, operating system and IP address.&nbsp;  We do not collect personally identifiable information about you. In other words, we do not collect informationsuchas your name, address, phone number or email address. Other than the details that were used uponregistrationand or the \'whos\' that you may add.  We do not knowingly contact or collect personal informationfromchildren under 16. If you believe we have inadvertently collected such information, please contact us so wecanpromptly obtain parental consent or remove the information.</div></div><div id="detail_Location" style="display:none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/location.png" class="icon">We may collect but do not share your location history.</li></ul><div class="text">To customize our service for you, we may collect and store your precise geographic location aspart of your user profile. This data is never shared with others. We may ask for your consent on your firstuseof the service.</div></div><div id="detail_Access" style="display:none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/access.png" class="icon">You can request to see your personal data.</li></ul><div class="text">You can sign into your account to see any personally identifiable information we have stored, suchas your name, email, address or phone number. You can also contact us by email to request to see thisinformation.</div></div><div id="detail_Deletion" style="display:none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/deletion.png" class="icon">We keep personal data until you delete it.</li></ul><div class="text">We remove personally identifiable information (such as your name, address, email or phone number) and other preferences associated with your account promptly after you delete your account. We may retain other data indefinitely.</div></div><div id="detail_Sharing" style="display:none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/sharing.png" class="icon">We don\'t share your personal data with other companies.</li></ul><div class="text">We do not share personally identifiable information (such as name, address, email or phone) with other companies.</div></div><div id="detail_Ad_Tracking" style="display: none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/adtracking.png" class="icon">No ad companies collect data through our service.</li></ul><div class="text">We do not allow advertising companies to collect data through our service for ad targeting.</div></div><div id="detail_Contact" style="display: none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/contact.png" class="icon">You can ask privacy questions.</li></ul><div class="tet">If you have any questions or concerns about our privacy policies, please contact us: <a href="mailto:privacy@sexdiaries.co.uk">privacy@sexdiaries.co.uk</a></div></div><div id="detail_Vendors" style="display:none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/analytics.png" class="icon">Service providers access data on our behalf.</li></ul><div class="text">In order to serve you, we may share your personal and anonymous information with othercompanies,including vendors and contractors. Their use of information is limited to these purposes, and subject toagreements that require them to keep the information confidential. Our vendors provide assurance that theytakereasonable steps to safeguard the data they hold on our behalf, although data security cannot be guaranteed.Analytics companies may access anonymous data (such as your IP address or device ID) to help usunderstandhow our services are used. They use this data solely on our behalf. They do not share it except in aggregateform; no data is shared as to any individual user. Click to see company privacy policies that govern theiruseof data.</div><div><ul><li onclick="tracker_view(\'90\');"><a href="javascript:tracker_view(\'90\');">Google Analytics</a></li></ul></div></div><div id="detail_Security" style="display:none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/vendors.png" class="icon">We take detailed steps to protect personal information.</li></ul><div class="text">We take reasonable administrative, physical and electronic measures designed to safeguard andprotect your information from unauthorized access or disclosure. This includes utilizing Secure SocketsLayer(SSL) software, which encrypts the personal information you input, and storing your information in encryptedform behind a firewall designed to block access from outside our network. However, no security or encryptionmethod can be guaranteed to protect information from hackers or human error.  Information we collectmaybe stored or processed on computers located in any country where we do business.</div></div><div id="detail_Special" style="display:none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/special.png" class="icon">Special situations may require disclosure of your data.</li></ul><div class="text"></div></div><div id="detail_More" style="display:none;" class="detail"><h1 onclick="history.back()">Privacy</h1><ul><li class="clear back sel" onclick="history.back()"><img src="img/privacy/more.png" class="icon">You can review more privacy-related information.</li></ul><div class="text">This privacy policy was last updated on [DATE]. Our privacy policy may change from time totime.If we make any material changes to our policies, we will place a prominent notice on our website orapplication.If the change materially affects registered users, we will send a notice to you by email, push notificationortext.</div></div><div id="detail_90" style="display: none;" class="tracker"><h1 onclick="history.back()">More Info</h1>    <a href="mobile?policy=36367&amp;mockup=1" style="text-decoration: none;"><ul><li class="clear back sel" style="padding-left:20px; text-decoration: none; color:#7A8EB6;">Back</li></ul></a><div class="text"><img src="http://images.privacychoice.org/images/network/90.jpg" class="logo tracker"><p>"Google Analytics is a web analytics tool that helps website owners understand how visitors engage withtheirwebsite. Google Analytics customers can view a variety of reports about how visitors interact with theirwebsite so they can improve it. Google Analytics collects information anonymously. It reports websitetrendswithout identifying individual visitors."</p></div><ul><li onclick="document.location.href=\'http://www.google.com/analytics/learn/privacy.html\';"><ahref="http://www.google.com/analytics/learn/privacy.html">Full Privacy Policy</a></li></ul></div></div>';return __p};

  this["JST"]["app/www/js/templates/other/shop.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += 'shop';return __p};

  this["JST"]["app/www/js/templates/sex.ejs"] = function(data) {var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }__p += '<!--<h2>' +((__t = ( data.header )) == null ? '' : __t) +'</h2>--><sexform class="' +((__t = ( data.sextype )) == null ? '' : __t) +' blocks"><date><info><div>Today, Mon 28</div></info></date><when><info><div><h2>' +((__t = ( data.sextype )) == null ? '' : __t) +'</h2><date>' +((__t = ( data.sextime[1] )) == null ? '' : __t) +'</date></div></info><detailsimage><div><img src="img/sex/full/' +((__t = ( data.sextype )) == null ? '' : __t) +'.png" alt="' +((__t = ( data.sextype )) == null ? '' : __t) +'"/></div></detailsimage></when><who><info><div><h2>Who</h2><searchSelectedItems>';for(var index in data.who){ ;__p +=((__t = ( index )) == null ? '' : __t); if(index !== Object.keys(data.who)[--Object.keys(data.who).length]){ ;__p += ', '; }} ;__p += '</searchSelectedItems></div></info><detailsimage><div><img src="img/sex/who.png" alt="Who"/></div></detailsimage></who><Rating><info><face><img src="img/icons/face.png" alt="My Face!!!"/></face><face><img src="img/icons/face.png" alt="My Face!!!"/></face><face><img src="img/icons/face.png" alt="My Face!!!"/></face><face><img src="img/icons/face.png" alt="My Face!!!"/></face><face><img src="img/icons/face.png" alt="My Face!!!"/></face></info></Rating><Location><info><div><h2>Location</h2><location>' +((__t = ( data.location[1] )) == null ? '' : __t) +'</location></div></info><detailsimage><div><img src="img/sex/location.png" alt="Where"/></div></detailsimage></Location><Where><info><div><h2>Where</h2><searchSelectedItems>';for(var index in data.where){ ;__p +=((__t = ( index )) == null ? '' : __t); if(index !== Object.keys(data.where)[--Object.keys(data.where).length]){ ;__p += ', '; }} ;__p += '</searchSelectedItems></div></info><detailsimage><div><img src="img/sex/where.png" alt="Location"/></div></detailsimage></Where><save class="disabled"><info><div><h2>Save the sex?</h2></div></info><detailsimage><div><img src="img/sex/save.png" alt="Save?"/></div></detailsimage></save><!--<extra>--><!--<h2>Extra Details?</h2>--><!--</extra>--></sexform>';return __p};

  this["JST"]["app/www/js/templates/sexTemplate.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<sexdetails></sexdetails>';return __p};

  this["JST"]["app/www/js/templates/users/managewhos.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += 'managewhos';return __p};

  this["JST"]["app/www/js/templates/users/previous.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += 'previous';return __p};

  this["JST"]["app/www/js/templates/users/profile.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="royalSlider rsDefault"><div class="graphs"><div id="sexoverview"></div><div class="minigraphs"><h2>You Are...</h2><div class="miniGraph"><div id="WankPerMonth"></div></div><div class="miniGraph"><div id="OralPerMonth"></div></div><div class="miniGraph"><div id="SexPerMonth"></div></div></div><div class="miniIcons"><h2>Top stats from this month</h2><div class="user"><i class="icon-user"></i><span>Stacey</span></div><div class="location"><i class="icon-location"></i><span>America</span></div><div class="where"><i class="icon-map"></i><span>McDonalds Toilet</span></div><div class="time"><i class="icon-clock"></i><span>18:00 - 19:00</span></div></div></div><div class="profilehome"><div class="titlebox"><div class="you"><span>You</span></div><div class="vs">Vs</div><div class="theworld"><span>World</span></div></div><div class="stats"><item><you>' +((__t = ( data.youtotal.total )) == null ? '' : __t) +'</you><type>Total Sexes</type><theworld>' +((__t = ( data.world.Wank+data.world.Hands+data.world.Oral+data.world.Sex+data.world.Anything+123112 )) == null ? '' : __t) +'</theworld></item><item><you>' +((__t = ( data.youtotal.Wank )) == null ? '' : __t) +'</you><type>Self Sex’d</type><theworld>' +((__t = ( data.world.Wank+12112 )) == null ? '' : __t) +'</theworld></item><item><you>' +((__t = ( data.youtotal.Hands )) == null ? '' : __t) +'</you><type>Handed Borrowed</type><theworld>' +((__t = ( data.world.Hands+1211 )) == null ? '' : __t) +'</theworld></item><item><you>' +((__t = ( data.youtotal.Oral )) == null ? '' : __t) +'</you><type>Licked/Sucked</type><theworld>' +((__t = ( data.world.Oral+9122 )) == null ? '' : __t) +'</theworld></item><item><you>' +((__t = ( data.youtotal.Sex )) == null ? '' : __t) +'</you><type>Sex</type><theworld>' +((__t = ( data.world.Sex+21112 )) == null ? '' : __t) +'</theworld></item><item><you>' +((__t = ( data.youtotal.Anything )) == null ? '' : __t) +'</you><type>Everything else</type><theworld>' +((__t = ( data.world.Anything+1314 )) == null ? '' : __t) +'</theworld></item><!--<item>--><!--<you>' +((__t = ( data.world.Wank+12112 )) == null ? '' : __t) +'</you>--><!--<type>Popular Location</type>--><!--<theworld>' +((__t = ( data.world.Wank+12112 )) == null ? '' : __t) +'</theworld>--><!--</item>--><!--<item>--><!--<you>123</you>--><!--<type>Different Partners</type>--><!--<theworld>' +((__t = ( data.world.Wank+12112 )) == null ? '' : __t) +'</theworld>--><!--</item>--><!--<item>--><!--<you>123</you>--><!--<type>Wanks/Sex</type>--><!--<theworld>' +((__t = ( data.world.Wank+12112 )) == null ? '' : __t) +'</theworld>--><!--</item>--></div><bg></bg></div></div>';return __p};

  this["JST"]["app/www/js/templates/users/settings.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += 'settings';return __p};

  return this["JST"];

});