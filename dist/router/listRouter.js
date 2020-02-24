"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _todolist = require("../model/todolist");

var _todolist2 = _interopRequireDefault(_todolist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.route("/createtodo").get(function (req, res) {
  return res.render("createtodo");
}).post(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _todolist2.default({ item: req.body.item }).save(function (error, success) {
              if (error) {
                console.log(error);
                res.send(error._message);
              } else {
                res.redirect("/todolist");
              }
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.get("/todolist", function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var sorted, currentPage, items, allTodos, amountTodos, pageCount;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sorted = req.query.sort;
            currentPage = req.query.page || 1;
            items = 5;
            _context2.next = 5;
            return _todolist2.default.find();

          case 5:
            allTodos = _context2.sent;
            _context2.next = 8;
            return _todolist2.default.find().skip((currentPage - 1) * items).limit(items).sort({ item: sorted });

          case 8:
            amountTodos = _context2.sent;
            pageCount = Math.ceil(allTodos.length / items);


            res.render("todolist", { amountTodos: amountTodos, pageCount: pageCount, currentPage: currentPage });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

router.get("/delete/:id", function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _todolist2.default.deleteOne({ _id: req.params.id });

          case 2:
            res.redirect("/todolist");

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

router.route("/update/:id").get(function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var update;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _todolist2.default.findById({ _id: req.params.id });

          case 2:
            update = _context4.sent;

            res.render("edit", { update: update });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()).post(function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _todolist2.default.updateOne({ _id: req.params.id }, { $set: { item: req.body.item } });

          case 2:
            res.redirect("/todolist");

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

module.exports = router;