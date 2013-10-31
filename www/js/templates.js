define(function(){

  this["JST"] = this["JST"] || {};

  this["JST"]["app/www/js/templates/application.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<p>Your content here.</p>';return __p};

  this["JST"]["app/www/js/templates/comp/footer.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<footer><menuBtn>-</menuBtn></footer>';return __p};

  this["JST"]["app/www/js/templates/comp/headerIn.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<header><logo><a href="/">SD</a></logo><a class="logout" href="/#login">Logout</a></header>';return __p};

  this["JST"]["app/www/js/templates/comp/headerOut.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<header><logo><a href="/#home">Sex<span> Diaries</span></a></logo></header>';return __p};

  this["JST"]["app/www/js/templates/comp/menu.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '';return __p};

  this["JST"]["app/www/js/templates/comp/shell.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<page></page>';return __p};

  this["JST"]["app/www/js/templates/home.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h1>SELECT SOME SEXYNESS</h1><!--<acts class="royalSlider rsDefault visibleNearby">--><!--<a id="wank" data-type="1" href="#wank" data-rsw="336" data-rsh="500"><figure class="rsCaption">Wank</figure></a>--><!--<a id="hands" data-type="2" href="#hands" data-rsw="336" data-rsh="500"><figure class="rsCaption">Hands</figure></a>--><!--<a id="oral" data-type="3" href="#oral" data-rsw="336" data-rsh="500"><figure class="rsCaption">Oral</figure></a>--><!--<a id="sex" data-type="4" href="#sex" data-rsw="352"><figure class="rsCaption">Sexy Sex</figure></a>--><!--<a id="anything" data-type="5" href="#anything" data-rsw="179"><figure class="rsCaption">Anything Else!</figure></a>--><!--</acts>--><div class="royalSlider rsDefault visibleNearby"><a class="rsImg" href="img/sex/wank.png" data-rsw="200"><anchor id="wank" data-type="1" href="#wank">Wank<span>For pleasuring man</span></anchor></a><a class="rsImg" href="img/sex/hands.png" data-rsw="360"><anchor id="hands" data-type="2" href="#hands">Hands<span>Because 2 hands aren\'t enough</span></anchor></a><a class="rsImg" href="img/sex/oral.png" data-rsw="267"><anchor id="Oral" data-type="3" href="#oral">Oral Pleasures<span>2 Tounges are better than one</span></anchor></a><a class="rsImg" href="img/sex/sex.png" data-rsw="352"><anchor id="sex" data-type="4" href="#sex">Sexy Sex<span>Fucking!</span></anchor></a><a class="rsImg" href="img/sex/anything.png" data-rsw="179"><anchor id="anything" data-type="5" href="#anything">Anything Else<span>When sex just isn\'t enough...</span></anchor></a></div>';return __p};

  this["JST"]["app/www/js/templates/login.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<form action="/" class="loginForm"><div class="control-group"><input type="text" name="uname" placeholder="Username" value="test"/></div><div class="control-group"><input type="password" name="pword" placeholder="Password" value="testmeout"/></div><button class="btn" type="submit">Login</button></form><div class="login"><a href="/#registration">Sign Up</a> or <a href="/#login">Login</a></div>';return __p};

  this["JST"]["app/www/js/templates/sex.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>' +((__t = ( data.header )) == null ? '' : __t) +'</h2><sexform class="' +((__t = ( data.sextype )) == null ? '' : __t) +'"><form action="post" method="' +((__t = ( data.url )) == null ? '' : __t) +'"><items><when><img src="../img/sex/when.png" alt=""/><span>When</span></when><who><img src="../img/sex/who.png" alt=""/><span>Who</span></who><rating><img src="../img/sex/rating.png" alt=""/><span>Rating</span></rating></items><items><location><img src="../img/sex/location.png" alt=""/><span>Location</span></location><where><img src="../img/sex/where.png" alt=""/><span>Where</span></where><extra><img src="../img/sex/save.png" alt=""/><span>Extra</span></extra></items><input type="hidden" name="when"/></form><seximage><img src="../img/sex/full/' +((__t = ( data.sextype )) == null ? '' : __t) +'.png" alt="' +((__t = ( data.sextype )) == null ? '' : __t) +'"/></seximage></sexform>';return __p};

  this["JST"]["app/www/js/templates/sex/anything.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>Anything</h2>';return __p};

  this["JST"]["app/www/js/templates/sex/fingers.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>hands</h2>';return __p};

  this["JST"]["app/www/js/templates/sex/oral.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>Oral</h2>';return __p};

  this["JST"]["app/www/js/templates/sex/sex.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>Sex</h2>';return __p};

  this["JST"]["app/www/js/templates/sex/sexTemplate.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<sexdetails></sexdetails><sexoptions><wank></wank><hands></hands><oral></oral><sex></sex><anything></anything></sexoptions>';return __p};

  this["JST"]["app/www/js/templates/sex/wank.ejs"] = function(data) {var __t, __p = '', __e = _.escape;__p += '<h2>MOTHER FUCKING WANK!!!</h2><sexform class="wank"><form method="http://stage.sexdiaries.co.uk/stats/add" action="post"><items><when><img alt="" src="../img/sex/when.png"><span>When</span></when><who><img alt="" src="../img/sex/who.png"><span>Who</span></who><rating><img alt="" src="../img/sex/rating.png"><span>Rating</span></rating></items><items><location><img alt="" src="../img/sex/location.png"><span>Location</span></location><where><img alt="" src="../img/sex/where.png"><span>Where</span></where><extra><img alt="" src="../img/sex/save.png"><span>Extra</span></extra></items><input type="hidden" name="when"></form><seximage><img alt="wank" src="../img/sex/full/wank.png"></seximage></sexform>';return __p};

  return this["JST"];

});