// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Os = require("os");
var Curry = require("bs-platform/lib/js/curry.js");
var Process = require("process");
var Belt_Int = require("bs-platform/lib/js/belt_Int.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");

var getToday = (function() {
  let date = new Date();
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split("T")[0];
});

var encoding = "utf8";

function getCommandConstructor(command, param) {
  var command$1 = command.trim().toLocaleLowerCase();
  var pos = Belt_Option.flatMap(param, Belt_Int.fromString);
  switch (command$1) {
    case "add" :
        return {
                TAG: /* Add */0,
                _0: param
              };
    case "del" :
        return {
                TAG: /* Del */1,
                _0: pos
              };
    case "done" :
        return {
                TAG: /* Done */2,
                _0: pos
              };
    case "help" :
        return /* Help */0;
    case "ls" :
        return /* Ls */1;
    case "report" :
        return /* Report */2;
    default:
      return /* Help */0;
  }
}

var todos_file = "todo.txt";

var completed_file = "done.txt";

var help_string = "\nUsage :-\n$ ./todo add \"todo item\"  # Add a new todo\n$ ./todo ls               # Show remaining todos\n$ ./todo del NUMBER       # Delete a todo\n$ ./todo done NUMBER      # Complete a todo\n$ ./todo help             # Show usage\n$ ./todo report           # Statistics";

function readFile(filename) {
  if (!Fs.existsSync(filename)) {
    return [];
  }
  var text = Fs.readFileSync(filename, {
        encoding: encoding,
        flag: "r"
      });
  var lines = text.split(Os.EOL);
  return lines.filter(function (todo) {
              return todo !== "";
            });
}

function writeRecord(file, lines) {
  var text = Belt_Array.joinWith(lines, Os.EOL, (function (dummy) {
          return dummy;
        }));
  Fs.writeFileSync(file, text, {
        encoding: encoding,
        flag: "w"
      });
  
}

function addToRecord(file, content) {
  Fs.appendFileSync(file, content + Os.EOL, {
        encoding: encoding,
        flag: "a"
      });
  
}

function commHelp(param) {
  console.log(help_string);
  
}

function commLs(param) {
  var todos = readFile(todos_file);
  var size = todos.length;
  if (size === 0) {
    console.log("There are no pending todos!");
  } else {
    console.log(Belt_Array.reduceWithIndex(Belt_Array.reverse(todos), "", (function (acc, todo, index) {
                  return acc + ("[" + String(size - index | 0) + "] " + todo + Os.EOL);
                })).trim());
  }
  
}

function commAdd(todo) {
  if (todo !== undefined) {
    addToRecord(todos_file, todo);
    console.log("Added todo: \"" + todo + "\"");
  } else {
    console.log("Error: Missing todo string. Nothing added!");
  }
  
}

function commDelete(todo_num) {
  if (todo_num !== undefined) {
    var todos = readFile(todos_file);
    if (todo_num > todos.length || todo_num < 1) {
      console.log("Error: todo #" + String(todo_num) + " does not exist. Nothing deleted.");
      return ;
    }
    var todos$1 = todos.filter(function (param, idx) {
          return idx !== (todo_num - 1 | 0);
        });
    writeRecord(todos_file, todos$1);
    console.log("Deleted todo #" + String(todo_num));
    return ;
  }
  console.log("Error: Missing NUMBER for deleting todo.");
  
}

function commMarkCompletion(todo_num) {
  if (todo_num !== undefined) {
    var todos = readFile(todos_file);
    if (todo_num > todos.length || todo_num < 1) {
      console.log("Error: todo #" + String(todo_num) + " does not exist. Nothing Marked as done.");
      return ;
    }
    var target = Caml_array.get(todos, todo_num - 1 | 0);
    var todos$1 = todos.filter(function (param, idx) {
          return idx !== (todo_num - 1 | 0);
        });
    writeRecord(todos_file, todos$1);
    addToRecord(completed_file, "x " + Curry._1(getToday, undefined) + " " + target);
    console.log("Marked todo #" + String(todo_num) + " as done.");
    return ;
  }
  console.log("Error: Missing NUMBER for marking todo as done.");
  
}

function commReport(param) {
  var pending_cnt = String(readFile(todos_file).length);
  var completed_cnt = String(readFile(completed_file).length);
  console.log(Curry._1(getToday, undefined) + " Pending : " + pending_cnt + " Completed : " + completed_cnt);
  
}

var work = Belt_Option.getWithDefault(Belt_Array.get(Process.argv, 2), "help");

var cliParam = Belt_Array.get(Process.argv, 3);

var work$1 = getCommandConstructor(work, cliParam);

if (typeof work$1 === "number") {
  switch (work$1) {
    case /* Help */0 :
        console.log(help_string);
        break;
    case /* Ls */1 :
        commLs(undefined);
        break;
    case /* Report */2 :
        commReport(undefined);
        break;
    
  }
} else {
  switch (work$1.TAG | 0) {
    case /* Add */0 :
        commAdd(work$1._0);
        break;
    case /* Del */1 :
        commDelete(work$1._0);
        break;
    case /* Done */2 :
        commMarkCompletion(work$1._0);
        break;
    
  }
}

exports.getToday = getToday;
exports.encoding = encoding;
exports.getCommandConstructor = getCommandConstructor;
exports.todos_file = todos_file;
exports.completed_file = completed_file;
exports.help_string = help_string;
exports.readFile = readFile;
exports.writeRecord = writeRecord;
exports.addToRecord = addToRecord;
exports.commHelp = commHelp;
exports.commLs = commLs;
exports.commAdd = commAdd;
exports.commDelete = commDelete;
exports.commMarkCompletion = commMarkCompletion;
exports.commReport = commReport;
exports.cliParam = cliParam;
exports.work = work$1;
/* work Not a pure module */
