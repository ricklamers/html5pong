<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>HTML5 Canvas Pong - Experiment</title>
<link rel="stylesheet" type="text/css" href="style.css">
<link rel="shortcut icon" href="images/favicon.jpg" type="image/x-icon" /> 
<script src="js/jquery.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/soundmanager.js"></script>
<script src="js/actions.js"></script>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-27929874-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</head>
<body>
<div id="pageWrap">
<canvas id="gameCanvas" width="800" height="600"></canvas>
</div>

<div id="about">
<h2>About the Game</h2>
<p>This is my first HTML5 Canvas based game. I used <a target="_blank" href="http://www.schillmania.com/projects/soundmanager2/">SoundManager2</a> for HTML5/Flash audio. The rest is pure Canvas based Javascript and HTML5. I would love to know what you think of it, please leave a comment. All feedback is very much appreciated!<br>
<br>I would also like to thanks to Phrogz on <a href="http://stackoverflow.com/questions/4576724/dotted-stroke-in-canvas">stackoverflow</a> for the <a href="http://ricklamers.nl/pong/js/plugins.js">dotted line canvas snippet</a>.<br>
<br>
<span class="center">
Resources used:<br>
<a target="_blank" href="http://stackoverflow.com/">stackoverflow.com</a><br>
<a target="_blank" href="http://w3schools.com/">w3school.com<br></a>
<a target="_blank" href="http://net.tutsplus.com/">nettuts</a></span></p>
</div>
</script>
</body>
</html>