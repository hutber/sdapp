define(function(){

  this["JST"] = this["JST"] || {};

  this["JST"]["app/www/js/templates/comp/footerIn.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<footer><sexnav><div data-type="wank"><img src="img/sex/wank.png"></div><div data-type="hands"><img src="img/sex/hands.png"></div><div data-type="oral"><img src="img/sex/oral.png"></div><div data-type="sex"><img src="img/sex/sex.png"></div><div data-type="anything"><img src="img/sex/anything.png"></div></sexnav></footer>';return __p};

  this["JST"]["app/www/js/templates/comp/footerOut.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<footer><div class="social"><a class="facebook" href="#facebook">facebook</a><a class="twitter" href="#twitter">twitter</a></div></footer>';return __p};

  this["JST"]["app/www/js/templates/comp/headerIn.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<header class="loggedin"><menuBtn>=</menuBtn><div class="title"></div><a class="logout" href="/">LO</a></header>';return __p};

  this["JST"]["app/www/js/templates/comp/headerOut.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<header><logo><a href="/">Sex<span> Diaries</span></a></logo></header>';return __p};

  this["JST"]["app/www/js/templates/comp/menu.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '';return __p};

  this["JST"]["app/www/js/templates/comp/shell.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<content><page></page></content>';return __p};

  this["JST"]["app/www/js/templates/home.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<div class="royalSlider rsDefault"><a class="rsImg" href="img/sex/full/wank.png" data-rsTmb="img/sex/wank.png" data-rsw="200"><anchor id="wank" data-type="1" href="#wank">Wank<span>For pleasuring man</span></anchor></a><a class="rsImg" href="img/sex/full/hands.png" data-rsTmb="img/sex/hands.png" data-rsw="360"><anchor id="hands" data-type="2" href="#hands">Hands<span>Because 2 hands aren\'t enough</span></anchor></a><a class="rsImg" href="img/sex/full/oral.png" data-rsTmb="img/sex/oral.png" data-rsw="267"><anchor id="oral" data-type="3" href="#oral">Oral Pleasures<span>2 Tounges are better than one</span></anchor></a><a class="rsImg" href="img/sex/full/sex.png" data-rsTmb="img/sex/sex.png" data-rsw="352"><anchor id="sex" data-type="4" href="#sex">Sexy Sex<span>Fucking!</span></anchor></a><a class="rsImg" href="img/sex/full/anything.png" data-rsTmb="img/sex/anything.png" data-rsw="179"><anchor id="anything" data-type="5" href="#anything">Anything Else<span>When sex just isn\'t enough...</span></anchor></a></div>';return __p};

  this["JST"]["app/www/js/templates/index.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<a href="#signup" class="btn signup">signup</a><a href="#login" class="btn">login</a>';return __p};

  this["JST"]["app/www/js/templates/login/login.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<form action="/" class="loginForm"><div class="control-group"><input type="text" name="uname" placeholder="Username" value="test"/></div><div class="control-group"><input type="password" name="pword" placeholder="Password" value="testmeout"/></div><button class="btn" type="submit">Login</button></form><div class="login"><a href="#signup">Sign Up</a></div>';return __p};

  this["JST"]["app/www/js/templates/login/signup.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<form action="/" class="loginForm"><div class="control-group"><input type="text" name="uname" placeholder="Enter your desired username" value="test"/></div><div class="control-group"><input type="email" name="email" placeholder="Email"/></div><div class="control-group"><input type="password" name="pword" placeholder="Password" value="testmeout"/></div><div class="control-group"><input type="password" name="pwordc" placeholder="Password Confirm"/></div><div class="control-group"><input type="text" name="gender" placeholder="Gender M/F"/></div><div class="control-group"><input type="text" name="dob" placeholder="Date of Birth DD/MM/YYYY"/></div><div class="control-group"><label><input type="checkbox" name="terms" class="terms"/>Agree to our Terms &amp; Condish!</label></div><button class="btn signup" type="submit">Sign Up</button><a href="#login">Already Signed Up?</a></form>';return __p};

  this["JST"]["app/www/js/templates/sex.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<!--<h2>' +((__t = ( data.header )) == null ? '' : __t) +'</h2>--><sexform class="' +((__t = ( data.sextype )) == null ? '' : __t) +'"><form action="post" method="' +((__t = ( data.url )) == null ? '' : __t) +'"><date><info><div>TODAY, Mon 28</div></info></date><when><info><div><h2>' +((__t = ( data.sextype )) == null ? '' : __t) +'</h2><date>Today 22:22</date></div></info><detailsimage><div><img src="img/sex/full/' +((__t = ( data.sextype )) == null ? '' : __t) +'.png" alt="' +((__t = ( data.sextype )) == null ? '' : __t) +'"/></div></detailsimage></when><who><info><div><h2>Who</h2><date>Tina</date></div></info><detailsimage><div><img src="img/sex/who.png" alt="Who"/></div></detailsimage></who><Rating><info><div><h2>Rating</h2><date>1/5</date></div></info><detailsimage><div><img src="img/sex/rating.png" alt="Who"/></div></detailsimage></Rating><Location><info><div><h2>Location</h2><date>Toilets</date></div></info><detailsimage><div><img src="img/sex/location.png" alt="Who"/></div></detailsimage></Location><Where><info><div><h2>Where</h2><date>London, GB</date></div></info><detailsimage><div><img src="img/sex/where.png" alt="Who"/></div></detailsimage></Where><extra><h2>Extra Details?</h2></extra><button name="save" type="submit" value="1">Save</button></form></sexform>';return __p};

  this["JST"]["app/www/js/templates/sex/anything.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>Anything</h2>';return __p};

  this["JST"]["app/www/js/templates/sex/fingers.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>hands</h2>';return __p};

  this["JST"]["app/www/js/templates/sex/oral.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>Oral</h2>';return __p};

  this["JST"]["app/www/js/templates/sex/sex.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>Sex</h2>';return __p};

  this["JST"]["app/www/js/templates/sex/sexTemplate.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<sexdetails></sexdetails>';return __p};

  this["JST"]["app/www/js/templates/sex/wank.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<form method="http://stage.sexdiaries.co.uk/stats/add" action="post"><date>TODAY, Mon 28</date><when><img alt="" src="../img/sex/when.png"><span>When</span></when><who><img alt="" src="../img/sex/who.png"><span>Who</span></who><rating><img alt="" src="../img/sex/rating.png"><span>Rating</span></rating><location><img alt="" src="../img/sex/location.png"><span>Location</span></location><where><img alt="" src="../img/sex/where.png"><span>Where</span></where><extra><img alt="" src="../img/sex/save.png"><span>Extra</span></extra><input type="hidden" name="when"></form>';return __p};

  return this["JST"];

});