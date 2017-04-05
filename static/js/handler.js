$(document).ready(function() {
     function getQuerystring (key) {
        key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regex = new RegExp("[\\?&]"+key+"=([^]*)");
        var qs = regex.exec(location.search);
        return qs[1];
      }

      document.write('Message ID: ' + decodeURIComponent(getQuerystring('messageId')) + '<br />');
      document.write('Date & Time: ' + decodeURIComponent(getQuerystring('datetime')) + '<br /><br />');
      document.write('Message: ' + decodeURIComponent(getQuerystring('message')));
});
