//var serverurl = "wss://cursors--gabrielmakiewic.repl.co"
var serverurl = "ws://128.199.12.58:2828/"
//var serverurl = "ws://kursors.io/ws/";
//var serverurl = "ws://mpp-proxy-new-8--gabrielmakiewic.repl.co/?target=ws://64.227.108.75:2828/&origin=http://cursors.io"
var maincursormove = true

var clientLevel = -1;
var prevLevels = [];
var grid = 5;
var cursorx;
var cursory;
var movement = false;
var serverx = 0;
var servery = 0;


let ws = new WebSocket("ws://localhost:8080");

ws.onmessage = function(msg) {
  var json = JSON.parse(msg.data);

  if(typeof json.botsCount !== "undefined") {
    document.getElementById("botCounter").innerHTML = json.botsCount;
  }
}

var arrows = {
  "arrowLeft": [
    [0, -6, -2, -4],
    [2, -4, 0, -6],
    [0, 0, 0, -6]
  ],
  "arrowUp": [
    [-1, 0, -6, 0],
    [0, 0, -1, 0],
    [-4, -2, -6, 0],
    [-4, 2, -6, 0]
  ],
  "arrowRight": [
    [0, 6, 0, 0],
    [-2, 4, 0, 6],
    [2, 4, 0, 6]
  ],
  "arrowDown": [
    [0, 0, 6, 0],
    [4, -2, 6, 0],
    [4, 2, 6, 0]
  ]
}

var imgData = {
  "cursor": [
    [10, 0, 0, 0],
    [7, 3, 10, 0],
    [7, 7, 7, 3],
    [0, 0, 7, 7]
  ],
  "cursorInRect": [
    [10, 0, 0, 0],
    [7, 3, 10, 0],
    [7, 3, 7, 3],
    [7, 7, 7, 3],
    [0, 0, 7, 7],
    [12, -9, -4, -9],
    [12, -9, 12, -9],
    [12, 13, 12, -9],
    [-3, 13, 12, 13],
    [-4, 13, -3, 13],
    [-4, -9, -4, 13],
    [1, 7, -4, 13],
    [12, 13, 1, 7],
    [1, -4, -4, -9],
    [12, -9, 1, -4]
  ],
  "cuteSmile": [
    [1, 2, 1, 1],
    [2, 2, 1, 2],
    [2, 1, 2, 2],
    [1, 1, 2, 1],
    [2, 2, 1, 1],
    [1, 2, 2, 1],
    [2, 4, 1, 4],
    [2, 5, 2, 4],
    [1, 5, 2, 5],
    [1, 4, 1, 5],
    [2, 5, 1, 4],
    [1, 5, 2, 4],
    [3, 5, 3, 1],
    [4, 5, 3, 5],
    [5, 4, 4, 5],
    [5, 3, 5, 4],
    [5, 2, 5, 3],
    [4, 1, 5, 2],
    [3, 1, 4, 1]
  ],
  "dickButt": [
    [105, 27, 81, 12],
    [81, 12, 45, 5],
    [45, 5, 39, 2],
    [39, 2, 29, 8],
    [29, 8, 30, 15],
    [30, 15, 35, 19],
    [35, 19, 43, 15],
    [43, 15, 45, 5],
    [45, 5, 40, 12],
    [40, 12, 34, 13],
    [34, 13, 29, 8],
    [22, 38, 33, 32],
    [33, 32, 39, 35],
    [39, 35, 37, 47],
    [37, 47, 29, 50],
    [29, 50, 24, 46],
    [24, 46, 22, 38],
    [22, 38, 28, 43],
    [28, 43, 35, 40],
    [35, 40, 39, 35],
    [33, 24, 46, 17],
    [46, 17, 49, 20],
    [49, 20, 46, 28],
    [41, 52, 60, 8],
    [29, 8, 14, 14],
    [14, 14, 6, 23],
    [6, 23, 3, 37],
    [3, 37, 5, 47],
    [5, 47, 15, 55],
    [15, 55, 48, 63],
    [48, 63, 71, 74],
    [71, 74, 63, 81],
    [63, 81, 58, 91],
    [58, 91, 59, 99],
    [59, 99, 29, 103],
    [29, 103, 27, 109],
    [27, 109, 31, 115],
    [31, 115, 60, 114],
    [60, 114, 55, 123],
    [55, 123, 57, 127],
    [57, 127, 63, 127],
    [63, 127, 65, 120],
    [63, 127, 66, 132],
    [66, 132, 73, 132],
    [73, 132, 78, 121],
    [78, 121, 69, 116],
    [69, 116, 66, 105],
    [66, 105, 67, 96],
    [67, 96, 59, 99],
    [67, 96, 70, 89],
    [70, 89, 68, 83],
    [70, 89, 77, 84],
    [78, 121, 86, 122],
    [86, 122, 103, 114],
    [103, 114, 110, 104],
    [110, 104, 111, 97],
    [111, 97, 138, 103],
    [138, 103, 132, 85],
    [132, 85, 125, 81],
    [125, 81, 127, 94],
    [127, 94, 113, 91],
    [113, 91, 120, 79],
    [120, 79, 122, 64],
    [122, 64, 152, 62],
    [152, 62, 144, 46],
    [144, 46, 138, 44],
    [138, 44, 141, 57],
    [141, 57, 122, 58],
    [122, 58, 119, 43],
    [119, 43, 105, 27],
    [61, 50, 91, 59],
    [91, 59, 96, 57],
    [96, 57, 102, 58],
    [102, 58, 102, 62],
    [102, 62, 95, 61],
    [95, 61, 102, 65],
    [102, 65, 101, 68],
    [101, 68, 94, 66],
    [94, 66, 94, 75],
    [94, 75, 91, 75],
    [91, 75, 88, 64],
    [88, 64, 60, 56],
    [73, 82, 74, 80],
    [79, 97, 82, 95],
    [92, 96, 94, 94],
    [96, 100, 98, 98],
    [100, 105, 101, 104],
    [48, 111, 49, 109],
    [52, 111, 53, 109]
  ]
}

//pathfinder
var visit = [];

dos = function(dx, dy, items, gridSpace) {
  var gridX = 400 / gridSpace,
    gridY = 300 / gridSpace;
  var grid = [];
  visit = [];
  for (var i = 0; i < gridY; i++) {
    grid[i] = [];
    visit[i] = [];
    for (var j = 0; j < gridX; j++) grid[i][j] = 0, visit[i][j] = 0;
  }
  items.forEach(function(d) {
    if (d.type === 1) {
      for (var i = 0; i < d.height; i += gridSpace) {
        for (var j = 0; j < d.width; j += gridSpace) {
          grid[(d.y + i) / gridSpace][(d.x + j) / gridSpace] = 3;
        }
      }
    }
  });
  var bfs = [
      [dx, dy]
    ],
    bfs2 = [];
  while (bfs.length) {
    bfs.forEach(function(dat) {
      var x = dat[0],
        y = dat[1];
      if (grid[y][x] == 3) return;
      grid[y][x] = 3;
      for (var X = x + 1; X < gridX && !(grid[y][X] & 1); X++) {
        grid[y][X] |= 1;
        if (!visit[y][X]) {
          visit[y][X] = [x, y], bfs2.push([X, y]);
        }
      }
      for (var X = x - 1; X >= 0 && !(grid[y][X] & 1); X--) {
        grid[y][X] |= 1;
        if (!visit[y][X]) {
          visit[y][X] = [x, y], bfs2.push([X, y]);
        }
      }
      for (var Y = y + 1; Y < gridY && !(grid[Y][x] & 2); Y++) {
        grid[Y][x] |= 2;
        if (!visit[Y][x]) {
          visit[Y][x] = [x, y], bfs2.push([x, Y]);
        }
      }
      for (var Y = y - 1; Y >= 0 && !(grid[Y][x] & 2); Y--) {
        grid[Y][x] |= 2;
        if (!visit[Y][x]) {
          visit[Y][x] = [x, y], bfs2.push([x, Y]);
        }
      }
    });
    bfs = bfs2;
    bfs2 = [];
  }
}

path = function(ox, oy, dx, dy, items, grid) {

  var rdx = dx,
    rdy = dy;
  ox /= grid;
  oy /= grid;
  dx /= grid;
  dy /= grid;

  ox |= 0;
  oy |= 0;
  dx |= 0;
  dy |= 0;

  var mov = [];
  if (!(ox == dx && oy == dy)) {
    dos(ox, oy, items, grid);
    var xy2 = [dx, dy];
    while (visit[xy2[1]][xy2[0]]) {
      mov.push(xy2);
      xy2 = visit[xy2[1]][xy2[0]];
    }

    mov.reverse();
  }

  for (var i = 0; i < mov.length; ++i) {
    mov[i][0] *= grid;
    mov[i][0] += grid / 2;
    mov[i][1] *= grid;
    mov[i][1] += grid / 2;
  }
  mov.push([rdx, rdy]);
  return mov;
}

function mkHTML(tag, opts = {}) {
  var elm = document.createElement(tag);
  for (var i in opts) {
    elm[i] = opts[i]
  }
  return elm;
}

var drawing = false;
var drawingScale = 1;
var customImage = [];
var cheatDiv = document.createElement("div");
cheatDiv.style["border"] = "3px solid currentColor";

function mkText(text, br = false) {
  return cheatDiv.appendChild(mkHTML(br ? "div" : "span", {
    innerHTML: text
  }))
}


var keybinds = (() => {

  var object = {
    digit1: {
      action: function() {
        ws.send(JSON.stringify({
          "eval": "clickingAllButtons"
        }))
      },
      description: "Starts clicking all buttons",
      keyName: "Digit 1"
    },
    digit2: {
      action: function() {
        drawArray(customImage);
      },
      description: "Draws custom image",
      keyName: "Digit 2"
    },
    digit9: {
      action: function() {
        ws.send(JSON.stringify({
          "eval": "deploy",
          x: p,
          y: s
        }))
      },
      description: "Deploys a bot to your mouse position",
      keyName: "Digit 9"
    },
    digit0: {
      action: function() {
        ws.send(JSON.stringify({
          "eval": "undeploy"
        }))
      },
      description: "Undeploys a bot (click somewhere to get the bot back to you)",
      keyName: "Digit 0"
    },
    arrowleft: {
      action: function() {
        drawArray(arrows.arrowLeft)
      },
      description: "Draws the left arrow",
      keyName: "Left arrow"
    },
    arrowup: {
      action: function() {
        drawArray(arrows.arrowUp)
      },
      description: "Draws the top arrow",
      keyName: "Top arrow"
    },
    arrowright: {
      action: function() {
        drawArray(arrows.arrowRight)
      },
      description: "Draws the right arrow",
      keyName: "Right arrow"
    },
    arrowdown: {
      action: function() {
        drawArray(arrows.arrowDown)
      },
      description: "Draws the bottom arrow",
      keyName: "Bottom arrow"
    },
  }
  var images = Object.keys(imgData); //just weird variable

  for (var i = 0; i < images.length; i++) { //drawings
    let image = images[i];
    let key = (i <= 8 ? "digit" : "null") + (i + 3);
    let keyName = (i <= 8 ? "Digit" : "Null") + " " + (i + 3);

    object[key] = {
      action: function() {
        drawArray(imgData[image])
      },
      description: "Draws " + image,
      keyName
    }
  }


  return object;
})();

function addKeybinds() {
  for (var i in keybinds) {
    var keybind = keybinds[i];
    mkText(`${keybind.keyName} or click `);
    cheatDiv.appendChild(mkHTML("button", {
      onclick: keybind.action,
      innerHTML: "button"
    }))
    mkText(`: ${keybind.description}`)
    cheatDiv.appendChild(mkHTML("br"))
  }
}

mkText("Bot count: ");
cheatDiv.appendChild(mkHTML("span", {
  id: "botCounter",
  innerHTML: 0,
}))

cheatDiv.appendChild(mkHTML("br"))

mkText("Bot count to connect: ");
cheatDiv.appendChild(mkHTML("input", {
  id: "botsCountToConnect",
  value: 20,
  min: 1,
  type: "number",
  placeholder: "Count"
}))
mkText(" bots per proxy: ");
cheatDiv.appendChild(mkHTML("input", {
  id: "botsPerProxy",
  value: 1,
  min: 1,
  max: 3,
  type: "number",
  placeholder: "Count"
}))
mkText(" connecting timeout: ");
cheatDiv.appendChild(mkHTML("input", {
  id: "botsTimeout",
  value: 10,
  min: 10,
  type: "number",
  placeholder: "Timeout"
}))
cheatDiv.appendChild(mkHTML("button", {
  innerHTML: "connect",
  onclick: function() {
    if(this.innerHTML === "connect") {
      this.innerHTML = "disconnect"
      var count = parseInt(document.getElementById("botsCountToConnect").value)
      var botsPerProxy = parseInt(document.getElementById("botsPerProxy").value)
      var timeout = parseInt(document.getElementById("botsTimeout").value)

      ws.send(JSON.stringify({
        eval: "connect",
        ws: serverurl,
        origin: window.origin,
        count,
        botsPerProxy,
        timeout
      }));
    } else {
      this.innerHTML = "connect";
      ws.send(JSON.stringify({
        eval: "stop"
      }))
    }
  }
}))

cheatDiv.appendChild(mkHTML("br"));

mkText("Text to draw (keybind: enter?): ")
cheatDiv.appendChild(mkHTML("input", {
  id: "message",
  placeholder: "Type and press enter",
}))
mkText(" Font size: ")
cheatDiv.appendChild(mkHTML("input", {
  id: "fontOfMessage",
  value: 2,
  type: "number",
  placeholder: "Font size",
}))
cheatDiv.appendChild(mkHTML("br"))

mkText("Drawing scale: ");
cheatDiv.appendChild(mkHTML("input", {
  id: "drawingScale",
  type: "number",
  value: drawingScale,
  placeholder: "Scale",
  onchange: function() {
    drawingScale = parseFloat(this.value);
  }
}))
cheatDiv.appendChild(mkHTML("br"))

cheatDiv.appendChild(mkHTML("div", {
  id: "parsingError",
  style: "color: #ff0000"
}))
mkText("Paste here custom image: ");

cheatDiv.appendChild(mkHTML("input", {
  value: JSON.stringify(imgData.cuteSmile),
  placeholder: JSON.stringify(imgData.cuteSmile),
  onchange: async function() {
    try {
      customImage = JSON.parse(this.value);
    } catch (e) {
      document.getElementById("parsingError").innerHTML = "parsing error";
      await sleep(3000)
      document.getElementById("parsingError").innerHTML = ""
    }
  }
}))

cheatDiv.appendChild(mkHTML("br"));
cheatDiv.appendChild(mkHTML("br"));

cheatDiv.appendChild(mkHTML("span", {
  style: "font-size: 25px",
  innerHTML: "Keybinds: "
}))
cheatDiv.appendChild(mkHTML("br"));
addKeybinds();


try {
  document.getElementsByTagName("a")[0].remove();
  document.getElementsByTagName("div")[4].remove()
} catch (e) {}
document.getElementsByTagName("div")[window.origin === "http://cursors.io" ? 3 : 2].appendChild(cheatDiv)

var moveInterval;

var alphabet = {
  32: [],
  33: [
    [0, 1, 1.5, 1],
    [2, 1, 2.5, 1]
  ], //!
  34: [
    [0, 0.5, 1, 0.5],
    [0, 1.25, 1, 1.25]
  ], //"
  35: [
    [0.5, -0.25, 0.5, 2.3],
    [1.5, -0.25, 1.5, 2.3],
    [-0.25, 0.5, 2.3, 0.5],
    [-0.25, 1.5, 2.3, 1.5]
  ], //#
  36: [
    [0, 0, 0, 2],
    [1, 0, 1, 2],
    [2, 0, 2, 2],
    [0, 0, 1, 0],
    [1, 2, 2, 2],
    [-0.5, 1, 0, 1],
    [2, 1, 2.5, 1]
  ], //$
  37: [
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 1, 2, 1],
    [2, 1, 2, 2],
    [2, 2, 1, 2],
    [1, 2, 1, 0],
    [2, 0, 0, 2]
  ], //% v1
  //37:[[0,0,0,0.75],[0,0.75,0.75,0.75],[0.75,0.75,0.75,0],[0.75,0,0,0],[2,0,0,2],[1.25,1.25,1.25,2],[1.25,2,2,2],[2,2,2,1.25],[2,1.25,1.25,1.25]],//% v2
  //37:[[1,0.5,0.5,0],[0.5,0,0,0.5],[0,0.5,0.5,1],[0.5,1,1,0.5],[2,0,0,2],[2,1.5,1.5,1],[1.5,1,1,1.5],[1,1.5,1.5,2],[1.5,2,2,1.5]],//% v3
  38: [
    [0.5, 1, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 2, 0],
    [2, 0, 2, 0.5],
    [2, 0.5, 1, 1.5],
    [1, 0, 1, 0.5],
    [1, 0.5, 2, 1.5]
  ], //&
  39: [
    [0, 0.5, 1, 0.5]
  ], // '
  40: [
    [0, 2, 0.5, 1],
    [0.5, 1, 1.5, 1],
    [1.5, 1, 2, 2]
  ], //(
  41: [
    [0, 0, 0.5, 1],
    [0.5, 1, 1.5, 1],
    [1.5, 1, 2, 0]
  ], //)
  42: [
    [0.5, 0, 1.5, 2],
    [1.5, 0, 0.5, 2],
    [0, 1, 2, 1]
  ], //*
  43: [
    [0, 1, 2, 1],
    [1, 0, 1, 2]
  ], //+
  44: [
    [2, 0, 3, 0]
  ], //,
  45: [
    [0.6, 0.3, 0.6, 1.7]
  ], //-
  46: [
    [1.5, 0, 2, 0]
  ], //.
  47: [
    [2, 0.4, 0, 1.6]
  ], //  /
  48: [
    [2, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 2, 2, 2],
    [2, 2, 2, 0],
    [2, 0, 0, 2]
  ], //0
  49: [
    [0, 1, 2, 1],
    [1, 0, 0, 1],
    [2, 0, 2, 2]
  ], //1
  50: [
    [0, 0, 0, 2],
    [0, 2, 1, 2],
    [1, 2, 1, 0],
    [1, 0, 2, 0],
    [2, 0, 2, 2]
  ], //2
  51: [
    [0, 0, 0, 2],
    [0, 2, 2, 2],
    [2, 2, 2, 0],
    [1, 0, 1, 2]
  ],
  52: [
    [0, 0, 1, 0],
    [1, 0, 1, 2],
    [0, 2, 2, 2]
  ],
  53: [
    [0, 2, 0, 0],
    [0, 0, 1, 0],
    [1, 0, 1, 2],
    [1, 2, 2, 2],
    [2, 2, 2, 0]
  ],
  54: [
    [0, 2, 0, 0],
    [0, 0, 2, 0],
    [2, 0, 2, 2],
    [2, 2, 1, 2],
    [1, 2, 1, 0]
  ],
  55: [
    [0, 0, 0, 2],
    [0, 2, 2, 0]
  ],
  56: [
    [0, 0, 0, 2],
    [0, 2, 2, 2],
    [2, 2, 2, 0],
    [2, 0, 0, 0],
    [1, 0, 1, 2]
  ],
  57: [
    [0, 0, 1, 0],
    [1, 0, 1, 2],
    [0, 2, 2, 2],
    [0, 0, 0, 2],
    [2, 0, 2, 2]
  ], //9
  58: [
    [0, 1, 0.5, 1],
    [1.5, 1, 2, 1]
  ], //:
  59: [
    [0, 1, 0.5, 1],
    [2, 1, 3, 1]
  ], //;
  60: [
    [0, 2, 1, 0],
    [1, 0, 2, 2]
  ], //<
  61: [
    [0.5, 0, 0.5, 2],
    [1.5, 0, 1.5, 2]
  ], //=
  62: [
    [0, 0, 1, 2],
    [1, 2, 2, 0]
  ], //>
  63: [
    [1, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 2, 1, 2],
    [1, 2, 1, 1],
    [1, 1, 1.5, 1],
    [2, 1, 2.5, 1]
  ], //?
  64: [
    [2.5, 2, 2.5, 0],
    [2.5, 0, -0.5, 0],
    [-0.5, 0, -0.5, 2],
    [-0.5, 2, 1.5, 2],
    [1.5, 2, 1.5, 1],
    [1.5, 1, 0.5, 1],
    [0.5, 1, 0.5, 2]
  ], //@
  91: [
    [0, 1.5, 0, 0.5],
    [0, 0.5, 2, 0.5],
    [2, 0.5, 2, 1.5]
  ], // [
  92: [
    [0, 0.4, 2, 1.6]
  ], // backslash
  93: [
    [0, 0.5, 0, 1.5],
    [0, 1.5, 2, 1.5],
    [2, 1.5, 2, 0.5]
  ], // ]
  94: [
    [1.5, 0, 0, 1],
    [0, 1, 1.5, 2]
  ], //^
  95: [
    [2, 0, 2, 2]
  ], //_
  96: [
    [0, 0.5, 1, 0.5]
  ], // ` display same as 39
  97: [
    [2, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 2, 2],
    [1, 0, 1, 2]
  ], //a
  98: [
    [2, 0, 0, 0],
    [0, 0, 0, 1],
    [1, 0, 1, 1],
    [2, 0, 2, 1],
    [0, 1, 0.5, 2],
    [0.5, 2, 1, 1],
    [1, 1, 1.5, 2],
    [1.5, 2, 2, 1]
  ], //b
  99: [
    [2, 2, 2, 0],
    [2, 0, 0, 0],
    [0, 0, 0, 2]
  ], //c
  100: [
    [2, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 1, 1, 2],
    [1, 2, 2, 1],
    [2, 1, 2, 0]
  ],
  101: [
    [2, 2, 2, 0],
    [2, 0, 0, 0],
    [0, 0, 0, 2],
    [1, 0, 1, 2]
  ],
  102: [
    [2, 0, 0, 0],
    [0, 0, 0, 2],
    [1, 0, 1, 2]
  ],
  103: [
    [1, 1, 1, 2],
    [1, 2, 2, 2],
    [2, 2, 2, 0],
    [2, 0, 0, 0],
    [0, 0, 0, 2]
  ],
  104: [
    [0, 0, 2, 0],
    [0, 2, 2, 2],
    [1, 0, 1, 2]
  ],
  105: [
    [0, 0, 0, 2],
    [0, 1, 2, 1],
    [2, 0, 2, 2]
  ],
  //106:[[0,0,0,2],[0,1,2,1],[2,0,2,1]], //j v1
  106: [
    [1.5, 0, 2, 0],
    [2, 0, 2, 1.5],
    [0, 1.5, 2, 1.5],
    [0, 0.85, 0, 2.25]
  ], //j v2
  107: [
    [0, 0, 2, 0],
    [1, 0, 0, 2],
    [1, 0, 2, 2]
  ],
  108: [
    [0, 0, 2, 0],
    [2, 0, 2, 2]
  ],
  109: [
    [0, 0, 2, 0],
    [0, 0, 2, 1],
    [2, 1, 0, 2],
    [0, 2, 2, 2]
  ],
  110: [
    [0, 0, 2, 0],
    [0, 0, 2, 2],
    [0, 2, 2, 2]
  ],
  111: [
    [2, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 2, 2, 2],
    [2, 2, 2, 0]
  ],
  112: [
    [2, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 2, 1, 2],
    [1, 2, 1, 0]
  ],
  113: [
    [2, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 2, 2, 2],
    [2, 2, 2, 0],
    [1, 1, 2, 2]
  ],
  114: [
    [2, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 2, 1, 2],
    [1, 2, 1, 0],
    [1, 1, 2, 2]
  ],
  115: [
    [0, 0, 0, 2],
    [1, 0, 1, 2],
    [2, 0, 2, 2],
    [0, 0, 1, 0],
    [1, 2, 2, 2]
  ],
  116: [
    [0, 0, 0, 2],
    [0, 1, 2, 1]
  ],
  117: [
    [0, 0, 2, 0],
    [0, 2, 2, 2],
    [2, 0, 2, 2]
  ],
  118: [
    [0, 0, 2, 1],
    [0, 2, 2, 1]
  ],
  119: [
    [0, 0, 2, 0],
    [0, 2, 2, 2],
    [2, 0, 1, 1],
    [2, 2, 1, 1]
  ],
  120: [
    [0, 0, 2, 2],
    [2, 0, 0, 2]
  ],
  121: [
    [0, 0, 1, 1],
    [0, 2, 1, 1],
    [2, 1, 1, 1]
  ],
  122: [
    [0, 0, 0, 2],
    [0, 2, 2, 0],
    [2, 0, 2, 2]
  ], //z
  123: [
    [0, 1.5, 0, 0.5],
    [0, 0.5, 0.5, 0.5],
    [0.5, 0.5, 1, 0],
    [1, 0, 1.5, 0.5],
    [1.5, 0.5, 2, 0.5],
    [2, 0.5, 2, 1.5]
  ], // {
  124: [
    [0, 1, 2, 1]
  ], // |
  125: [
    [0, 0.5, 0, 1.5],
    [0, 1.5, 0.5, 1.5],
    [0.5, 1.5, 1, 2],
    [1, 2, 1.5, 1.5],
    [1.5, 1.5, 2, 1.5],
    [2, 1.5, 2, 0.5]
  ], // }
  126: [
    [0.5, 0, 0, 0.75],
    [0, 0.75, 0.5, 1.5],
    [0.5, 1.5, 0, 2.25]
  ], // ~
};

function drawOnPlayer(x1, y1, x2, y2) {
  var g = new ArrayBuffer(9)
  var dv = new DataView(g);
  var x = serverx;
  var y = serverx

  x1 = x + x1;
  y1 = y + y1;
  x2 = x + x2;
  y2 = y + y2;

  drawOnCoords(x1, y1, x2, y2)
}

function drawOnCoords(x1, y1, x2, y2) {
  var g = new ArrayBuffer(9)
  var dv = new DataView(g);

  dv.setUint8(0, 3);
  dv.setUint16(1, x1, !0);
  dv.setUint16(3, y1, !0);
  dv.setUint16(5, x2, !0);
  dv.setUint16(7, y2, !0);
  ws.send(JSON.stringify({
    "eval": "draw",
    x1,
    y1,
    x2,
    y2
  }))
  serverx = x2
  servery = y2
  q.send(g)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawWord(str, x = serverx, y = servery, fontSize = 2, kerning = 3, timeout = 250) {
  str = str.trim()
  if (str == undefined || str.length === 0 || drawing == true) return false;
  return new Promise(async function(resolve) {
    await ua(x, y);

    for (var i = 0; i < str.length; i++) {
      var scale = 1
      if (str[i] == str[i].toLowerCase()) scale = 0.75;
      let letter = alphabet[str.toLowerCase().charCodeAt(i)] || alphabet[63] || []
      for (let line of letter) {
        let x1 = x + (line[1] * scale + kerning * i) * fontSize;
        let y1 = y + (line[0] * scale * fontSize);
        let x2 = x + (line[3] * scale + kerning * i) * fontSize;
        let y2 = y + (line[2] * scale * fontSize);
        drawOnCoords(x1, y1, x2, y2)
        await sleep(Math.floor(timeout / letter.length))
      }
    }
    drawing = false;
    await ua(x, y)
    resolve(true)
  })
}

async function drawArray(array, x = serverx, y = servery, timeout = 70, scale = drawingScale) {
  for (var i = 0; i < array.length; i++) {
    var x1 = x + array[i][1] * scale;
    var y1 = y + array[i][0] * scale;
    var x2 = x + array[i][3] * scale;
    var y2 = y + array[i][2] * scale;
    drawOnCoords(x1, y1, x2, y2);
    await sleep(timeout)
  }
}


function ra(a) {
  return a << 1
}

function S() {
  return document.pointerLockElement === x || document.mozPointerLockElement === x || document.webkitPointerLockElement === x
}

function aa() {
  a.fillStyle = "#000000";
  a.font = "35px NovaSquare";
  a.fillText("Please do not embed our website, thank you.", 400 - a.measureText("Please do not embed our website, thank you.").width / 2, 300);
  a.font = "16px NovaSquare";
  a.fillText("Play the game on http://cursors.io/", 400 - a.measureText("Play the game on http://cursors.io/").width / 2, 330);
  top.location = "http://cursors.io";
  throw "Please do not embed our website, thank you.";
}

function U(a, b) {
  F = a;
  G = b;
  k = p = a;
  l = s = b;
  A = p << 1;
  B = s << 1
}

function ta(a) {
  if (y) return H = !1, T(a), !1;
  S() ? V || (V = !0, U(k, l)) : (V = !1, y || I.checked || x.requestPointerLock && x.requestPointerLock());
  if (H) H = !1, J();
  else if (T(a), (a.ctrlKey || a.shiftKey || a.altKey) && !C.checked) W = !0, N = k, O = l;
  else if (100 < t - ba) {
    ba = t;
    D.push([p << 1, s << 1, t]);
    ua(p, s);
    var b = [p, s];
    K.push(b);
    setTimeout(function() {
      K.remove(b)
    }, 1E3)
  }
  return !1
}

function va(a) {
  W = !1
}

function socketConnect() {
  q = new WebSocket(serverurl);
  q.binaryType = "arraybuffer";
  q.onopen = onSocketConnect;
  q.onmessage = socketOnMessage;
  q.onclose = onSocketClose;
  q.onerror = onSocketError
}

function Ba() {
  window.localStorage && I && (window.localStorage.setItem("noCursorLock", I.checked ? "1" : "0"), window.localStorage.setItem("noDrawings", C.checked ? "1" : "0"))
}

function T(a) {
  if (S()) {
    var b = a.webkitMovementX || a.mozMovementX || a.movementX || 0;
    a = a.webkitMovementY || a.mozMovementY || a.movementY || 0;
    300 > Math.abs(b) + Math.abs(a) && X(A + b, B + a)
  } else a.offsetX ? X(a.offsetX, a.offsetY) : a.layerX && X(a.layerX, a.layerY);
  if (y) k = p, l = s
  else if (Y(), !S() || p == k && s == l || (a = b = 0, p > k && (b = 1), s > l && (a = 1), p = k, s = l, A = (p << 1) + b, B = (s << 1) + a), W && (N != k || O != l) && 50 < t - da) {
    b = N;
    a = O;
    var c = k,
      d = l;
    if (!y && null != q && q.readyState == WebSocket.OPEN) {
      var f = new ArrayBuffer(9),
        e = new DataView(f);
      e.setUint8(0, 3);
      e.setUint16(1, b, !0);
      e.setUint16(3, a, !0);
      e.setUint16(5, c, !0);
      e.setUint16(7, d, !0);
      ws.send(JSON.stringify({
        "eval": "draw",
        "x1": b,
        "y1": a,
        "x2": c,
        "y2": d
      }))

      q.send(f)
      serverx = c
      servery = d
    }
    N = k;
    O = l;
    da = t
  }
}

function X(a, b) {
  A = a;
  B = b;
  p = A >> 1;
  s = B >> 1
}

function Y() {
  var a = k,
    b = l;
  if (P(k, l)) {
    var c;
    a: {
      c = k;
      var d = l,
        f = [],
        e = new Uint8Array(12E4);
      f.push([c, d]);
      e[c + 400 * d] = 1;
      do {
        var h = f.shift(),
          g = h[0],
          h = h[1];
        if (!(0 > g || 0 > h || 400 <= g || 300 <= h)) {
          if (!P(g, h)) {
            c = {
              x: g,
              y: h
            };
            break a
          }
          e[g - 1 + 400 * h] || (f.push([g - 1, h]), e[g - 1 + 400 * h] = 1);
          e[g + 1 + 400 * h] || (f.push([g + 1, h]), e[g + 1 + 400 * h] = 1);
          e[g + 400 * (h - 1)] || (f.push([g, h - 1]), e[g + 400 * (h - 1)] = 1);
          e[g + 400 * (h + 1)] || (f.push([g, h + 1]), e[g + 400 * (h + 1)] = 1)
        }
      } while (0 < f.length);
      c = {
        x: c,
        y: d
      }
    }
    k = c.x;
    l = c.y

  }
  if (k != p || l != s) c = ea(k, l, p, s), k = c.x, l = c.y,
    cursorx = p, cursory = s;
  fa(F, G, a, b) && !fa(F, G, k, l) && (J(a, b), J(k, l));
  a: {
    for (a = 0; a < m.length; a++)
      if (b = m[a], 2 == b.type && !(k < b.x || l < b.y || k >= b.x + b.width || l >= b.y + b.height)) {
        a = !0;
        break a
      }
    a = !1
  }
  a && J()
}

function Z() {
  Q.set(Ca);
  m = [];
  D = [];
  L = []
}

function onSocketConnect() {
  Z();
  console.log("Connected!")
}

function onSocketClose(e) {
  Z();
  console.log("Socket closed: " + e.reason)
  socketConnect()
}

function onSocketError(e) {
  console.log("Socket error: " + e)
}

function Da(a, b) {
  for (var c = "", d = 0, f = 0; 0 != (f = a.getUint8(b)); ++b) d <<= 8, d |= f, f & 128 || (c += String.fromCharCode(d), d = 0);
  0 != d && (c += String.fromCharCode(d));
  return [c, b + 1]
}

function Ea(a, b) {
  setTimeout(function() {
    var c = a.getUint16(b, !0),
      d = 0;
    a: for (; d < c; d++) {
      for (var f = a.getUint16(b + 2 + 4 * d, !0), e = a.getUint16(b + 4 + 4 * d, !0), h = 0; h < K.length; h++) {
        var g = K[h];
        if (g[0] == f && g[1] == e) {
          K.splice(h, 1);
          continue a
        }
      }
      D.push([f << 1, e << 1, t])
    }
  }, 100);
  return b + 2 + 4 * a.getUint16(b, !0)
}

function Fa(a, b) {
  !C.checked && setTimeout(function() {
    for (var c = a.getUint16(b, !0), d = 0; d < c; d++) {
      var f = a.getUint16(b + 2 + 8 * d, !0),
        e = a.getUint16(b +
          4 + 8 * d, !0),
        h = a.getUint16(b + 6 + 8 * d, !0),
        g = a.getUint16(b + 8 + 8 * d, !0);
      L.push([f << 1, e << 1, h << 1, g << 1, t])
    }
  }, 50);
  return b + 2 + 8 * a.getUint16(b, !0)
}

function socketOnMessage(a) {
  a = a.data;
  var b = new DataView(a);
  switch (b.getUint8(0)) {
    case 0:
      ga = b.getUint32(1, !0);
      console.log(ga)
      break;
    case 1:
      var c;
      ha = c = b.getUint16(1, !0);
      ia = 100 <= c;
      var d = [],
        f;
      for (f in v) v.hasOwnProperty(f) && d.push(f);
      for (var e = 0; e < c; e++) {
        f = b.getUint32(3 + 8 * e, !0);
        var h = b.getUint16(7 + 8 * e, !0),
          g = b.getUint16(9 + 8 * e, !0);
        if (f != ga)
          if (null != v[f]) {
            for (var r = 0; r < d.length; r++)
              if (d[r] == f) {
                d.splice(r, 1);
                break
              }
            f = v[f];
            f.oldX = f.getX();
            f.oldY = f.getY();
            f.newX = h;
            f.newY = g;
            f.time = t

          } else v[f] = new ja(h, g)
      }
      for (e = 0; e < d.length; e++) delete v[d[e]];
      c = Ea(b, 3 + 8 * c);
      f = b.getUint16(c, !0);
      c += 2;
      for (d = 0; d < f; d++) {
        a: for (h = b.getUint32(c, !0), e = 0; e < m.length; e++)
          if (m[e].id == h) {
            var k = m[e];
            if (1 == k.type)
              for (var h = k.x | 0, g = k.y | 0, r = k.width | 0, k = k.height | 0, l = g; l < g + k; ++l)
                for (var p = h; p < h + r; ++p) --Q[p + 400 * l];
            m.splice(e, 1);
            break a
          } c += 4
      }
      f = b.getUint16(c, !0);
      c += 2;
      for (d = 0; d < f; d++) {
        a: {
          e = b.getUint32(c, !0);
          for (h = 0; h < m.length; h++)
            if (m[h].id == e) {
              e = m[h];
              break a
            }
          e = {
            id: e
          };
          m.push(e)
        }
        c += 4;
        c = ka(b, c, e)
      }
      c = Fa(b, c);
      if (a.byteLength < c + 4) break;
      $ = b.getUint32(c, !0);
      break;
    case 4:
      if (clientLevel === -1) clientLevel++
      Z();
      serverx = b.getUint16(1, !0)
      servery = b.getUint16(3, !0)
      U(b.getUint16(1, !0), b.getUint16(3, !0));
      f = b.getUint16(5, !0);
      c = 7;
      for (d = 0; d < f; d++) e = {}, e.id = b.getUint32(c, !0), c += 4, c = ka(b, c, e), m.push(e);
      a.byteLength >= c + 4 ? u = Math.max(u, b.getUint32(c, !0)) : a.byteLength >= c + 2 && (u = Math.max(u, b.getUint16(c, !0)));
      Y();

      grid = 100; //pathFinder thing
      for (var i = 0; i < m.length; ++i) {
        if (grid <= 1) {
          grid = 1;
          break;
        }
        if (m[i].type === 1)
          if (
            (m[i].x / grid | 0) != (m[i].x / grid) ||
            (m[i].y / grid | 0) != (m[i].y / grid) ||
            (m[i].width / grid | 0) != (m[i].width / grid) ||
            (m[i].height / grid | 0) != (m[i].height / grid)
          ) --grid, i = -1;
      }

      var compare = [];
      for (var i = 0; i < m.length; ++i) {
        var o = m[i];
        if (o.type === 0) {
          compare.push({
            x: o.x,
            y: o.y,
            size: o.size,
            content: o.content
          });
        } else if (o.type === 1) {
          if (o.color === '#000000') compare.push({
            x: o.x,
            y: o.y,
            w: o.width,
            h: o.height
          });
        } else if (o.type === 2) {
          compare.push({
            x: o.x,
            y: o.y,
            w: o.width,
            h: o.height,
            isBad: o.isBad
          });
        } else {
          compare.push({
            x: o.x,
            y: o.y,
            w: o.width,
            h: o.height,
            color: o.color
          });
        }
      }
      compare = JSON.stringify(compare);
      var i = prevLevels.indexOf(compare);
      if (i != -1) clientLevel = i;
      else ++clientLevel, prevLevels.push(compare);
      ws.send(JSON.stringify({ //sends level to bot lol
        eval: "levelUpdate",
        level: clientLevel
      }))
      break;
    case 5:
      serverx = b.getUint16(1, !0)
      servery = b.getUint16(3, !0)
      U(b.getUint16(1, !0), b.getUint16(3, !0)),
        9 <= b.byteLength ?
        u = Math.max(u, b.getUint32(5, !0)) :
        7 <= b.byteLength && (u = Math.max(u, b.getUint16(5, !0))),
        Y()
  }
}

function J(a, b) {
  /*if (!y && !H && null != q && q.readyState == WebSocket.OPEN && ("undefined" == typeof a && (a = k), "undefined" == typeof b && (b = l), a != F || b != G)) {
    if (movement == true) {
      var moves = path(serverx, servery, p, s, m, grid)
      for(var i = 0; i <0;i++) {
        var move = moves[i];
        var c = new ArrayBuffer(9);
        var dv = new DataView(c);
        dv.setUint8(0, 1);
        dv.setUint16(1, move[0], !0);
        dv.setUint16(3, move[1], !0);
        dv.setUint32(5, -1, !0);
        q.send(c)
      }
      ws.send(JSON.stringify({
        "eval": "move",
        "x": p,
        "y": s
      }))
      console.log(moves.length)
      serverx = moves[moves.length - 1][0]
      servery = moves[moves.length - 1][1]
    }
    F = a;
    G = b
  }*/
}

function ua(a, b, timeout = 0) {
  if (!y && null != q && q.readyState == WebSocket.OPEN) {
    return new Promise(async function(resolve) {
      var moves = path(serverx, servery, p, s, m, grid);
      var array = new ArrayBuffer(9);
      var dv = new DataView(array);
      ws.send(JSON.stringify({
        eval: "move",
        x: p,
        y: s
      }))
      for (var i = 0; i < moves.length; i++) {
        var move = moves[i];

        dv.setUint8(0, 1);
        dv.setUint16(1, move[0], true);
        dv.setUint16(3, move[1], true);
        dv.setUint32(5, -1, true); //you can use -1 not ther variable u
        q.send(array)

        serverx = move[0];
        servery = move[1];
        await sleep(timeout);
      }

      dv.setUint8(0, 2); //clic at the end
      q.send(array)
      resolve()
    })
  }
}

function ka(a, b, c) {
  function d() {
    c.x = a.getUint16(b, !0);
    b += 2;
    c.y = a.getUint16(b, !0);
    b += 2;
    c.width = a.getUint16(b, !0);
    b += 2;
    c.height = a.getUint16(b, !0);
    b += 2
  }

  function f() {
    for (var d = a.getUint32(b, !0).toString(16); 6 > d.length;) d = "0" + d;
    b += 4;
    c.color = "#" + d
  }
  var e = a.getUint8(b);
  b += 1;
  c.type = e;
  switch (e) {
    case 255:
      break;
    case 0:
      c.x = a.getUint16(b, !0);
      b += 2;
      c.y = a.getUint16(b, !0);
      b += 2;
      c.size = a.getUint8(b);
      b += 1;
      c.isCentered = !!a.getUint8(b);
      b += 1;
      e = Da(a, b);
      c.text = e[0];
      b = e[1];
      break;
    case 1:
      d();
      var h = !c.color;
      f();
      var e = c.x | 0,
        g = c.y | 0,
        k = c.width | 0,
        l = c.height | 0;
      if (h)
        for (h = g; h < g + l; ++h)
          for (var m = e; m < e + k; ++m) ++Q[m + 400 * h];
      break;
    case 2:
      d();
      c.isBad = !!a.getUint8(b);
      b += 1;
      break;
    case 3:
      d();
      c.count = a.getUint16(b, !0);
      b += 2;
      f();
      break;
    case 4:
      d();
      c.count ? c.count > a.getUint16(b, !0) && (c.lastClickAt = t) : c.lastClickAt = 0;
      c.count = a.getUint16(b, !0);
      b += 2;
      f();
      break;
    default:
      throw Error("Unknown object type " + e);
  }
  return b
}

function la() {
  a.clearRect(0, 0, 800, 600);
  a.save();
  if (null != q && q.readyState != WebSocket.OPEN || H) {
    var n;
    if (null == q) n = "Click to begin";
    else switch (q.readyState) {
      case WebSocket.CONNECTING:
        n = "Connecting";
        break;
      case WebSocket.CLOSING:
      case WebSocket.CLOSED:
        n = "Lost connection to server";
        break;
      default:
        n = "Click to begin"
    }
    a.font = "60px NovaSquare";
    a.fillText(n, 400 - a.measureText(n).width / 2, 315);
    ma();
    na(!1)
  } else {
    a.fillStyle = "#000000";
    a.save();
    a.globalAlpha = 1;
    Ga();
    for (n = 0; n < m.length; n++) {
      var b = m[n];
      if (0 == b.type) {
        a.font = b.size + "px NovaSquare";
        var c = b.x << 1,
          d = b.y << 1;
        b.isCentered && (c -= a.measureText(b.text).width / 2);
        a.fillStyle = "#000000";
        a.fillText(b.text, c, d)
      } else if (1 == b.type) a.fillStyle = b.color, a.fillRect(b.x << 1, b.y << 1, b.width << 1, b.height << 1), a.strokeStyle = "#000000", a.globalAlpha = .2, a.lineWidth = 2, a.strokeRect((b.x << 1) + 1, (b.y << 1) + 1, (b.width << 1) - 2, (b.height << 1) - 2), a.globalAlpha = 1;
      else if (2 == b.type) a.fillStyle = b.isBad ? "#FF0000" : "#00FF00", a.globalAlpha = .2, a.fillRect(b.x << 1, b.y << 1, b.width << 1, b.height << 1), a.globalAlpha = 1;
      else if (3 == b.type) {
        var c = b.x << 1,
          d = b.y << 1,
          f = b.width << 1,
          e = b.height << 1;
        a.fillStyle = b.color;
        a.globalAlpha = .2;
        a.fillRect(c, d, f, e);
        a.globalAlpha = .5;
        a.fillStyle = "#000000";
        40 > b.width || 40 > b.height ? (a.font = "30px NovaSquare", a.fillText(b.count, c + f / 2 - a.measureText(b.count).width / 2, d + e / 2 + 10)) : (a.font = "60px NovaSquare", a.fillText(b.count, c + f / 2 - a.measureText(b.count).width / 2, d + e / 2 + 20));
        a.globalAlpha = 1
      } else if (4 == b.type) {
        c = b.x << 1;
        d = b.y << 1;
        f = b.width << 1;
        e = b.height << 1;
        a.fillStyle = b.color;
        a.strokeStyle = b.color;
        a.globalAlpha = 1;
        a.fillRect(c, d, f, e);
        a.globalAlpha = .2;
        a.fillStyle = "#000000";
        a.fillRect(c, d, f, e);
        a.globalAlpha = 1;
        a.fillStyle = b.color;
        var h = 150 > t - b.lastClickAt,
          g = h ? 8 : 12;
        a.fillRect(c + g, d + g, f - 2 * g, e - 2 * g);
        a.strokeStyle = "#000000";
        a.globalAlpha = .1;
        a.beginPath();
        a.moveTo(c, d);
        a.lineTo(c + g, d + g);
        a.moveTo(c + f, d);
        a.lineTo(c + f - g, d + g);
        a.moveTo(c, d + e);
        a.lineTo(c + g, d + e - g);
        a.moveTo(c + f, d + e);
        a.lineTo(c + f - g, d + e - g);
        a.moveTo(c, d);
        a.rect(c, d, f, e);
        a.rect(c + g, d + g, f - 2 * g, e - 2 * g);
        a.stroke();
        a.fillStyle = "#000000";
        a.globalAlpha = .5;
        50 > b.width || 50 > b.height ? (a.font = "35px NovaSquare", a.fillText(b.count, c + f / 2 - a.measureText(b.count).width / 2, d + e / 2 + 13)) : (a.font = "45px NovaSquare", a.fillText(b.count, c + f / 2 - a.measureText(b.count).width / 2, d + e / 2 + 16));
        h && (a.fillStyle = "#000000", a.globalAlpha = .15, a.fillRect(c + g, d + g, f - 2 * g, e - 2 * g));
        a.globalAlpha = 1
      }
    }
    a.restore();
    y || (a.font = "12px NovaSquare", a.strokeStyle = "#000000", a.fillStyle = "#FFFFFF", a.lineWidth = 2.5, n = ia ? "Area too full, not all cursors are shown" : 30 < ha ? "Area too full, drawing is disabled" : "Use shift+click to draw", a.globalAlpha = .5, a.strokeText(n, 10, 590), a.globalAlpha = 1, a.fillText(n, 10, 590), 0 != $ && (n = $ + " players online", b = a.measureText(n).width, a.globalAlpha = .5, a.strokeText(n, 790 - b, 590), a.globalAlpha = 1, a.fillText(n, 790 - b, 590)));
    n = "mouse: X: " + cursorx + " " + "Y: " + cursory + " server: X: " + serverx + " " + "Y: " + servery;
    a.font = "12px NovaSquare";
    a.strokeStyle = "#000000";
    a.fillStyle = "#FFFFFF";
    a.lineWidth = 2.5;
    a.globalAlpha = 0.5;
    a.strokeText(n, 690 - a.measureText(n).width, 574); // Subtract these numbers by 200 if u want.... ;P
    a.globalAlpha = 1;
    a.fillText(n, 690 - a.measureText(n).width, 574);
    ma();
    if (!C.checked) {
      a.save();
      a.strokeStyle = "#000000";
      a.lineWidth = 1;
      t = +new Date;
      for (n = 0; n < L.length; n++) b = L[n], c = 10 - (t - b[4]) / 1E3, 0 >= c ? (L.splice(n, 1), --n) : (1 < c && (c = 1), a.globalAlpha = .3 * c, a.beginPath(), a.moveTo(b[0] - .5, b[1] - .5), a.lineTo(b[2] - .5, b[3] - .5), a.stroke());
      a.restore()
    }
    a.save();

    for (var k in v) {
      a.fillStyle = "#FFFFFF";
      a.strokeStyle = "#000000";
      a.lineWidth = 2.5;
      a.font = "14px NovaSquare";
      a.globalAlpha = .5;
      a.strokeText(k.toString(), ra(v[k].getX()), ra(v[k].getY()));
      a.globalAlpha = 1;
      a.fillText(k.toString(), ra(v[k].getX()), ra(v[k].getY()));
      v.hasOwnProperty(k) && a.drawImage(M, ra(v[k].getX()) - 6, ra(v[k].getY()) - 6, 23, 30);
    }
    a.restore();
    na(!0)
  }
  a.restore();
  window.requestAnimationFrame(la)
}

function ma() {
  a.save();
  a.strokeStyle = "#000000";
  t = +new Date;
  for (var n = 0; n < D.length; n++) {
    var b = D[n],
      c = (t - b[2]) / 1E3,
      d = 1 - 2 * c;
    0 >= d ? (D.splice(n, 1), --n) : (c *= 50, a.beginPath(), a.globalAlpha = .3 * d, a.arc(b[0], b[1], c, 0, 2 * Math.PI, !1), a.stroke())
  }
  a.restore()
}

function na(n) {
  if (y) a.save(), a.globalAlpha = 1, a.drawImage(M, A - 5, B - 5);
  else {
    var b = 0,
      c = 0;
    p != k || s != l ? (a.save(), n && (a.globalAlpha = .2, a.fillStyle = "#00ff00", a.beginPath(), a.arc(A + 2, B + 8, 20, 0, 2 * Math.PI, !1), a.fill()), a.globalAlpha = .5, a.drawImage(M, A - 5, B - 5, 23, 30), a.restore()) : (b = A & 1, c = B & 1);
    a.save();
    n && (a.globalAlpha = .2, a.fillStyle = "#3366ff", a.beginPath(), a.arc((k << 1) + b + 2, (l << 1) + c + 8, 20, 0, 2 * Math.PI, !1), a.fill());
    a.globalAlpha = 1;
    a.drawImage(Ha, (k << 1) + b - 5, (l << 1) + c - 5, 23, 30)
  }
  a.restore()
}

function ja(a, b) {
  posX = this.oldX = this.newX = a;
  posY = this.oldY = this.newY = b;
  this.time = t
}

function oa(a) {
  return a * a * (3 - 2 * a)
}

function ea(a, b, c, d) {
  a |= 0;
  b |= 0;
  c |= 0;
  d |= 0;
  if (P(a, b)) return {
    x: a,
    y: b
  };
  if (a == c && b == d) return {
    x: c,
    y: d
  };
  var f = a,
    e = b;
  c = c - a | 0;
  d = d - b | 0;
  var h = 0,
    g = 0,
    k = 0,
    l = 0;
  0 > c ? h = -1 : 0 < c && (h = 1);
  0 > d ? g = -1 : 0 < d && (g = 1);
  0 > c ? k = -1 : 0 < c && (k = 1);
  var m = Math.abs(c) | 0,
    p = Math.abs(d) | 0;
  m <= p && (m = Math.abs(d) | 0, p = Math.abs(c) | 0, 0 > d ? l = -1 : 0 < d && (l = 1), k = 0);
  c = m >> 1;
  for (d = 0; d <= m && !P(a, b); d++) f = a, e = b, c += p, c >= m ? (c -= m, a += h, b += g) : (a += k, b += l);
  return {
    x: f,
    y: e
  }
}

function fa(a, b, c, d) {
  a = ea(a, b, c, d);
  return a.x == c && a.y == d
}

function P(a, b) {
  return 0 > a || 400 <= a || 0 > b || 300 <= b ? !0 : Q[a + 400 * b]
}
var Aa = "file:" == window.location.protocol,
  E, a, x, ha = 0,
  p = 0,
  s = 0,
  A = 0,
  B = 0,
  k = 0,
  l = 0,
  F = -1,
  G = -1,
  I = null,
  C = null,
  M = new Image;
M.src = "img/cursor.png";
var Ha = M,
  y = false,
  D = [],
  L = [],
  t = 0,
  ba = 0,
  q = null,
  ga = -1,
  v = {},
  $ = 0,
  ia = !1,
  W = !1,
  N = 0,
  O = 0,
  da = 0,
  V = !1,
  H = !y && !0,
  Q = new Uint8Array(12E4),
  m = [],
  K = [],
  R = window.devicePixelRatio;
Array.prototype.remove = function(a) {
  a = this.indexOf(a);
  return -1 != a ? (this.splice(a, 1), !0) : !1
};
var u = 0;
ja.prototype = {
  oldX: 0,
  oldY: 0,
  newX: 0,
  newY: 0,
  time: 0,
  getX: function() {
    var a = this.newX - this.oldX,
      b = (t - this.time) / 100,
      b = oa(0 >= b ? 0 : 1 <= b ? 1 : b);
    return this.oldX + b * a
  },
  getY: function() {
    var a = this.newY - this.oldY,
      b = (t - this.time) / 100,
      b = oa(0 >= b ? 0 : 1 <= b ? 1 : b);
    return this.oldY + b * a
  }
};
var pa = function() {
    function n() {
      var a = 0,
        b = 0,
        c = p / 10,
        d = s / 10;
      h < c ? (c = Math.ceil(c), a = Math.floor(h)) : (c = Math.floor(c), a = Math.ceil(h));
      g < d ? (d = Math.ceil(d), b = Math.floor(g)) : (d = Math.floor(d), b = Math.ceil(g));
      if (a > c) var e = c,
        c = a,
        a = e;
      b > d && (e = d, d = b, b = e);
      return {
        sx: a,
        sy: b,
        fx: c,
        fy: d
      }
    }

    function b() {
      e = !0;
      h = p / 10;
      g = s / 10
    }

    function c(a) {
      return "0x" + parseInt(a.slice(1), 16).toString(16).toUpperCase()
    }

    function d(a, b, c, d, e) {
      a = {
        x: 10 * ~~(k / 10) - ~~(a / 2) + c,
        y: 10 * ~~(l / 10) - ~~(b / 2) + d,
        width: a,
        height: b
      };
      for (var f in e) e.hasOwnProperty(f) && (a[f] = e[f]);
      return a
    }

    function f(a, b) {
      for (var c = null, d = Number.POSITIVE_INFINITY, e = 0; e < m.length; e++) {
        var f = m[e];
        if (f.hasOwnProperty("x") && f.hasOwnProperty("y") && f.hasOwnProperty("width") && f.hasOwnProperty("height")) {
          var g = f.x + f.width / 2,
            h = f.y + f.height / 2,
            g = (a - g) * (a - g) + (b - h) * (b - h);
          g < d && (d = g, c = f)
        }
      }
      return c
    }
    var e = !1,
      h = 0,
      g = 0,
      r = 1,
      q = 200,
      t = 150,
      v = new Uint8Array(1200),
      u = "#000000 #FF9999 #9999FF #FFFF99 #99FFFF #FF99FF #3333FF".split(" ");
    document.addEventListener("mouseup", function() {
      if (e) {
        for (var a = n(), b = r, c = a.sy; c < a.fy; ++c)
          for (var d = a.sx; d < a.fx; ++d) v[d + 40 * c] = b;
        e = !1
      }
    });
    document.addEventListener("mousemove", function() {});
    window.generateCode = function() {
      for (var a = "class Level? : public Level {\npublic:\n\tLevel?() : Level(" + q + ", " + t + "){}\n\n\tvoid OnInit(){\n", a = a + ("\t\tstd::vector<LevelObject*> wallByColor[" + u.length + "];\n"), b = new Uint8Array(1200), d = [], e = 0; 30 > e; ++e)
        for (var f = 0; 40 > f; ++f)
          if (!b[f + 40 * e]) {
            var g = v[f + 40 * e];
            if (0 != g) {
              for (var h = f; 40 > f && v[f + 40 * e] == g && !b[f + 40 * e];) b[f + 40 * e] = !0, ++f;
              var k = f--,
                n = k - h,
                l = e++;
              a: for (; 30 > e;) {
                for (var p = h; p < k; ++p) {
                  if (v[p + 40 * e] != g) break a;
                  if (b[p +
                      40 * e]) break a
                }
                for (p = h; p < k; ++p) b[p + 40 * e] = !0;
                ++e
              }
              k = e - l;
              e = l;
              d.push({
                x: 10 * h,
                y: 10 * l,
                width: 10 * n,
                height: 10 * k,
                color: g - 1
              })
            }
          }
      for (b = 0; b < d.length; b++) e = d[b], 0 == e.color ? a += "\t\tAddObject(new ObjWall(" + e.x + ", " + e.y + ", " + e.width + ", " + e.height + ", 0x000000));\n" : (f = c(u[e.color]), a += "\t\twallByColor[" + e.color + "].push_back(AddObject(new ObjWall(" + e.x + ", " + e.y + ", " + e.width + ", " + e.height + ", " + f + ")));\n");
      for (b = 0; b < m.length; b++) d = m[b], 0 != d.type && (2 == d.type ? a += "\t\tAddObject(new ObjTeleport(LevelManager::GetNextLevel(this), " +
        d.x + ", " + d.y + ", " + d.width + ", " + d.height + "));\n" : 3 == d.type ? (a += "\t\tAddObject(new ObjAreaCounter(wallByColor[" + d.colorCode + "], " + d.x + ", " + d.y + ", " + d.width + ", " + d.height + ", ", a += d.count + ", " + c(d.color) + "));\n") : 4 == d.type && (a += "\t\tAddObject(new ObjClickBox(wallByColor[" + d.colorCode + "], " + d.x + ", " + d.y + ", " + d.width + ", " + d.height + ", ", a += d.count + ", 1000, " + c(d.color) + "));\n"));
      return a += "\t}\n};\n"
    };
    document.addEventListener("keydown", function(a) {
      if (y) {
        var b = a.keyCode;
        65 == b ? (--r, 0 > r && (r = u.length)) : 83 == b ? (++r, r > u.length && (r = 0)) : 66 == b ? 1 >= r || m.push(d(40, 40, 5, 5, {
          type: 4,
          color: u[r - 1],
          colorCode: r - 1,
          count: 5
        })) : 90 == b ? m.pop() : 87 == b ? m.push(d(50, 50, -5, -5, {
          type: 2,
          isBad: !1
        })) : 79 == b ? (q = k, t = l) : 78 == b ? 1 >= r || m.push(d(40, 40, 0, 0, {
          type: 3,
          color: u[r - 1],
          colorCode: r - 1,
          count: 1
        })) : 37 == b ? (b = f(p, s), null != b && (a.shiftKey ? b.width -= 10 : (b.x -= 10, b.width += 10), 0 == b.width && m.splice(m.indexOf(b), 1))) : 39 == b ? (b = f(p, s), null != b && (a.shiftKey ? (b.x += 10, b.width -= 10) : b.width += 10, 0 == b.width && m.splice(m.indexOf(b), 1))) : 38 == b ? (b = f(p, s), null != b && (a.shiftKey ? b.height -= 10 : (b.y -= 10, b.height += 10), 0 == b.height && m.splice(m.indexOf(b), 1))) : 40 == b && (b = f(p, s), null != b && (a.shiftKey ? (b.y += 10, b.height -= 10) : b.height += 10, 0 == b.height && m.splice(m.indexOf(b), 1)))
      }
    });
    return {
      renderEditor: function() {
        if (y) {
          a.save();
          a.fillStyle = "#FF0000";
          a.strokeStyle = "#FF0000";
          a.lineWidth = 1;
          a.globalAlpha = .09;
          a.beginPath();
          for (var b = 0; 400 > b; b += 10) a.moveTo((b << 1) + .5, 0), a.lineTo((b << 1) + .5, 600);
          for (var c = 0; 300 > c; c += 10) a.moveTo(0, (c << 1) + .5), a.lineTo(800, (c << 1) + .5);
          a.stroke();
          a.lineWidth = 2;
          a.beginPath();
          a.moveTo(400.5, 0);
          a.lineTo(400.5, 600);
          a.moveTo(0, 300.5, 0);
          a.lineTo(800, 300.5);
          a.stroke();
          a.lineWidth = 1;
          a.globalAlpha = 1;
          a.fillStyle = "#000000";
          for (var d = n(), c = 0; 300 > c; c += 10)
            for (b = 0; 400 > b; b += 10) {
              var f = b / 10 | 0,
                g = c / 10 | 0,
                h = v[f + 40 * g];
              e && f >= d.sx && f < d.fx && g >= d.sy && g < d.fy && (h = r);
              0 != h && (a.fillStyle = u[h - 1], a.fillRect(b << 1, c << 1, 20, 20))
            }
          a.save();
          a.globalAlpha = .09;
          a.fillStyle = "#0000FF";
          a.beginPath();
          a.arc(q << 1, t << 1, 20, 0, 2 * Math.PI, !1);
          a.fill();
          a.restore();
          a.save();
          a.fillStyle = "#FFFFFF";
          a.strokeStyle = "#000000";
          a.lineWidth = 2.5;
          a.font = "14px NovaSquare";
          a.globalAlpha = .5;
          a.strokeText("Current color: ", 10, 590);
          a.globalAlpha = 1;
          a.fillText("Current color: ", 10, 590);
          0 == r ? a.fillText("ESR", 105, 590) : (a.fillStyle = "#000000", a.fillRect(104, 575, 22, 22), a.fillStyle = u[r - 1], a.fillRect(105, 576, 20, 20));
          a.restore();
          a.restore()
        }
      },
      initEditor: function() {
        x.addEventListener("mousedown", b)
      }
    }
  }(),
  Ga = pa.renderEditor,
  Ia = pa.initEditor,
  Ca = new Uint8Array(12E4);
Array.prototype.remove = function(a) {
  a = this.indexOf(a);
  return -1 != a ? (this.splice(a, 1), !0) : !1
};

setTimeout(function() {
  E = document.getElementById("canvas");
  /*E.onclick = function(e) {
  }*/
  window.addEventListener("keydown", function(key) {
    if (document.getElementById("message") === document.activeElement || document.getElementById("fontOfMessage") === document.activeElement) {
      if (key.key.length === 1) {
        return;
      }
      if (key.key === "Enter" && document.getElementById("message") === document.activeElement) {
        var message = document.getElementById("message").value;
        var fontSize = document.getElementById("fontOfMessage").value;
        drawWord(message, serverx, servery, fontSize);
      }
    }

    var action = keybinds[key.code.toLowerCase()];
    if (action) action.action();
  })
  a = E.getContext("2d");
  x = document.getElementById("canvasContainer") || E;
  /*try {
      window.top.location.origin != window.location.origin && aa()
  } catch (k) {
      aa()
  }*/
  E.width = 800 * R;
  E.height = 600 * R;
  a.scale(R, R);
  x.onmousemove = T;
  x.onmousedown = ta;
  x.onmouseup = va;
  I = document.getElementById("noCursorLock");
  C = document.getElementById("noDrawings");
  null != localStorage && (I.checked = "1" == window.localStorage.getItem("noCursorLock") ? !0 : !1, C.checked = "1" == window.localStorage.getItem("noDrawings") ? !0 : !1);
  window.onbeforeunload = Ba;
  x.requestPointerLock = x.requestPointerLock || x.mozRequestPointerLock || x.webkitRequestPointerLock;
  E.style.cursor = "none";
  Ia();
  y || socketConnect();
  moveInterval = setInterval(J, 50);
  window.requestAnimationFrame(la)
}, 2000)
