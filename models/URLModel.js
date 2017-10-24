const mongoose = require('mongoose');
mongoose.connect('mongodb://rohit:yadav@ds155160.mlab.com:55160/urlapp');


var Schema = mongoose.Schema;

var urlSchema = new Schema({ short_url : String, original_url : String});
mongoose.model('short_urls', urlSchema);

var urlModel = mongoose.model('short_urls');

urlModel.getShortURL = function(urlObj, callback) {
  urlObj.save(callback);
}


urlModel.getLongURL = function(key,callback) {
  urlModel.findOne({short_url : key}, callback);
}

module.exports = urlModel;