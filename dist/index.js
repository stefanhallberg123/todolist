"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _listRouter = require("./router/listRouter");

var _listRouter2 = _interopRequireDefault(_listRouter);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _config = require("./config/config");

var _config2 = _interopRequireDefault(_config);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _ejs = require("ejs");

var _ejs2 = _interopRequireDefault(_ejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.set("views", "views");
app.set("view engine", "ejs");
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.static(_path2.default.join(__dirname, "public")));

app.use(_listRouter2.default);

var port = process.env.PORT || 9696;

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

_mongoose2.default.connect(_config2.default.databaseURL, options).then(function () {
  app.listen(port);
  console.log("listening on " + port + " the coolest port in the world");
});

function ejs2html(_ref) {
  var path = _ref.path,
      outPath = _ref.outPath,
      data = _ref.data,
      options = _ref.options;

  _fs2.default.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return false;
    }
    _ejs2.default.renderFile(path, data, options, function (err, html) {
      if (err) {
        console.log(err);
        return false;
      }
      _fs2.default.writeFile(outPath, html, function (err) {
        if (err) {
          console.log(err);
          return false;
        }
        return true;
      });
    });
  });
}

ejs2html({
  path: __dirname + "/views/todolist.ejs",
  outPath: __dirname + "/public/index.html"
});