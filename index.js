var fs = require('fs'),
    youtube = require('youtube-dl');

fs.readFile('videos.txt', 'utf-8', function(err, data) {
  if(err) {
    console.log('Impossible to open/read the file. ['+err+']');
    return;
  }

  var videos = data.split('\n');
  
  videos.forEach(function(url) {
    if (url.length > 'https://youtube.com/'.length) {
      var video = youtube(url);
      var d = new Date();

      video.on('info', function(info) {
        console.log('Downloading ' + info._filename + '...\n');
        video.pipe(fs.createWriteStream('./tmp/'+d.getTime()+'.mp4'));
      });
    }
  });
});
