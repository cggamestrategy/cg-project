var historylist = new Array();
historylist["menu"] = 0;
historylist["petbook"] = "index";
var secNum, showdiv = '', petbook = new Array, divlist = [];
for (i = 1; i <= 12; i++)
    divlist.push('Pet' + i);
var preloadpetbookstart = new Image();
preloadpetbookstart.src = 'image/beast/star.gif';
for (p = 0; p < divlist.length; p++) {
    petbook[divlist[p]] = 0;
    showdiv += '<div id="' + divlist[p] + '" class="style"></div>';
}
function show(secNum) {
    if (secNum != '') {
        if (historylist['menu'] != 0) {
            setbgposition('b' + historylist['menu'], 'auto', 0);
        }
        setbgposition('b' + secNum, 'auto', -30);
        historylist['menu'] = secNum;
    } else {
        setbgposition('b' + historylist['menu'], 'auto', 0);
    }
}
function pet(id) {
    var group = id;
    var id = "Pet" + id;
    if (id != historylist['petbook']) {
        document.documentElement.scrollTop = '0px';
        document.getElementById(id).style.display = 'block';
        window.location.hash = group;
        if (petbook[id] == 0) {
            getfile(id, 'petbook', id, function() {
                if (!document.getElementById(id).getElementsByClassName)
                    return;
                var set = document.getElementById(id).getElementsByClassName('image_party');
                var div = document.createElement('div');
                if (div.classList)
                    div.classList.add('listindex');
                else
                    div.className = 'listindex';
                document.getElementById(id).insertBefore(div, document.getElementById(id).childNodes[0]);
                for (var i = 0; i < set.length; i++) {
                    setAnim(set[i]);
                    if (set[i].classList)
                        set[i].classList.add('id-' + id + '-' + i);
                    else
                        set[i].className += 'id-' + id + '-' + i;
                    var img = set[i].getElementsByClassName('imagemap')[0];
                    var pet = document.createElement('div');
                    if (pet.classList)
                        pet.classList.add('img');
                    else
                        pet.className = 'img';
                    pet.title = set[i].parentNode.getElementsByClassName('name')[0].innerHTML.replace(/<br>.+/, '').replace('(檔次未明)', '');
                    pet.innerHTML = pet.title;
                    if (!pet.dataset)
                        pet.setAttribute('data-id', 'id-' + id + '-' + i);
                    else
                        pet.dataset.id = 'id-' + id + '-' + i;
                    pet.addEventListener('click', function(e) {
                        var id = this.dataset ? this.dataset.id : this.getAttribute('data-id');
                        document.body.scrollTop = document.getElementsByClassName(id)[0].offsetTop - 150;
                        document.documentElement.scrollTop = document.getElementsByClassName(id)[0].offsetTop - 150;
                    });
                    div.appendChild(pet);
                }
            });
            petbook[id] = 1;
        } else
            showrestore();
        if (historylist['petbook'] != 0)
            document.getElementById(historylist['petbook']).style.display = 'none';
        historylist['petbook'] = id;
    }
}
var imageSlot = {};
function setAnim(obj) {
    if (!obj.dataset) {
        if (!obj.getAttribute)
            return;
        obj.dataset = {};
        obj.dataset.size = obj.getAttribute('data-size');
        obj.dataset.id = obj.getAttribute('data-id');
    }
    var map = obj.getElementsByClassName('imagemap')[0];
    if (!map.dataset) {
        if (!map.getAttribute)
            return;
        map.dataset = {};
        map.dataset.time = map.getAttribute('data-time');
        map.dataset.frame = map.getAttribute('data-frame');
        map.dataset.atkball = map.getAttribute('data-atkball');
    }
    var sizeD = obj.dataset.size.split(',');
    var sizes = [];
    var actions = [0, 1, 2, 3, 5, 6, 8, 10];
    for (var i = 0, j = 0; i < actions.length; i++)
        sizes[actions[i]] = {
            x: sizeD[j++],
            y: sizeD[j++],
            f: sizeD[j++],
            t: sizeD[j++],
            ox: sizeD[j++],
            oy: sizeD[j++]
        };
    var width = map.style.width.replace(/[^0-9]/g, '') * 1;
    var interval = map.dataset.time;
    var totalf = map.dataset.frame;
    var stopAtLoop = false;
    var currentf = 0;
    var animNo = obj.dataset.id;
    var mousedownID = 0;
    var delayAfterStop = 0;
    var idleF = 0;
    var animQ = [];
    var chAnim = function(action, stoploop) {
        clearTimeout(animID);
        stoploop = stoploop || false;
        currentf = 0;
        if (!stopAtLoop && stoploop)
            stopAtLoop = true;
        if (sizes[action].x.length == 0) {
            if (action == 3)
                action = 2;
        }
        var imgP = '//i.cgsword.hk/anim/map/' + animNo + '4' + (('0' + action).substr(-2)) + '.png';
        if (!imageSlot[imgP]) {
            imageSlot[imgP] = new Image();
            imageSlot[imgP].src = imgP;
        }
        map.style.backgroundImage = 'url(' + imageSlot[imgP].src + ')';
        map.style.width = sizes[action].x + 'px';
        map.style.height = sizes[action].y + 'px';
        map.style.marginLeft = -sizes[action].ox + 'px';
        map.style.marginTop = -sizes[action].oy + 'px';
        width = sizes[action].x;
        totalf = sizes[action].f;
        interval = sizes[action].t;
        if (action == 10) {
            stopAtLoop = true;
            interval *= 1.3;
            delayAfterStop = 3000;
            map.classList.add('die');
            setTimeout(function() {
                map.style.opacity = 0;
                setTimeout(function() {
                    map.classList.remove('die');
                    map.style.opacity = 1;
                }, 3000);
            }, interval);
        }
        if (action == 5 && map.dataset.atkball == 1) {
            var mapSize = map.getBoundingClientRect();
            var bodySize = document.body.getBoundingClientRect();
            var leftP = mapSize.left * 1 + sizes[action].ox * 1 - bodySize.left;
            var topP = mapSize.top * 1 + sizes[action].oy * 1 - bodySize.top;
            canvas.width = window.innerWidth - leftP;
            canvas.height = document.body.clientHeight - topP;
            canvas.style.left = (leftP) + 'px';
            canvas.style.top = (topP) + 'px';
            setTimeout(function() {
                var a = Math.random() * 40
                  , b = Math.random() * 40
                  , minr = Math.min(a, b)
                  , maxr = Math.max(a, b)
                  , l = Math.random() * 10;
                for (var i = 0; i < l; i++)
                    balls.push(new Spirit(Math.random() * 10 + 20,minr + (maxr - minr) / l * i));
                canvas.style.display = '';
            }, interval * 0.8);
        }
        animF();
    }
    var animF = function() {
        if (currentf >= totalf) {
            currentf = 0;
            if (stopAtLoop) {
                setTimeout(function() {
                    stopAtLoop = false;
                    delayAfterStop = 0;
                    chAnim(0);
                }, delayAfterStop);
                return;
            }
        }
        if (false && idleF % 50 == 0) {
            var aa = [0, 1, 5, 6, 8, 10];
            idleF = 0;
            if (Math.random() > 0.5) {
                chAnim(aa[Math.floor(Math.random() * aa.length)]);
                setTimeout(function() {
                    chAnim(0)
                }, 3000);
            }
        }
        map.style.backgroundPosition = '-' + (currentf * width) + 'px 0px';
        animID = setTimeout(arguments.callee, interval / totalf);
        currentf++;
    };
    var animID;
    chAnim(0);
    obj.addEventListener('mouseover', function(event) {
        idleF = 0;
        chAnim(1);
    });
    obj.addEventListener('mousedown', function(event) {
        event.preventDefault();
        idleF = 0;
        mousedownID = setTimeout(function() {
            chAnim(3);
        }, 500);
    });
    obj.addEventListener('mouseup', function() {
        clearTimeout(mousedownID);
        mousedownID = null;
    });
    obj.addEventListener('mouseleave', function(event) {
        idleF = 0;
        if (mousedownID)
            clearTimeout(mousedownID);
        event.stopPropagation();
        if (stopAtLoop)
            return;
        chAnim(0);
    });
    obj.addEventListener('click', function(event) {
        event.preventDefault();
        if (event.button == 0) {
            idleF = 0;
            chAnim(5, true);
        }
    });
    obj.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        chAnim(6, true);
    });
    obj.addEventListener('dblclick', function(event) {
        event.preventDefault();
        idleF = 0;
        chAnim(10);
    });
}
var ballImage = new Image();
ballImage.src = 'image/anim/map/110016000.png';
if (!Math.radians)
    Math.radians = function(degrees) {
        return degrees * Math.PI / 180;
    }
    ;
var balls = [];
function loop() {
    clear();
    update();
    draw();
    queue();
}
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function update() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].update(canvas);
        if (balls[i].dead)
            balls.splice(i, 1);
    }
    if (balls.length == 0)
        canvas.style.display = 'none';
}
function draw() {
    for (var i = 0; i < balls.length; i++)
        balls[i].draw(ctx);
}
function queue() {
    window.requestAnimationFrame(loop);
}
function Spirit(speed, direction) {
    this.position = {
        x: 0,
        y: 0
    };
    this.speed = {
        x: 0,
        y: 0
    };
    var radians = Math.radians(direction);
    this.speed.x = Math.cos(radians) * speed;
    this.speed.y = Math.sin(radians) * speed;
    this.dead = false;
    this.currentf = 0;
    var thisBall = this;
    this.interval = setInterval(function() {
        thisBall.currentf++;
        if (thisBall.currentf >= 8)
            thisBall.currentf = 0;
    }, 17);
}
Spirit_prototype = {
    update: function(canvas) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if (this.position.x > canvas.width)
            this.dead = true;
        if (this.position.y > canvas.height)
            this.dead = true;
        if (this.dead)
            clearInterval(this.interval);
    },
    draw: function(ctx) {
        ctx.drawImage(ballImage, this.currentf * 64, 0, 64, 63, this.position.x, this.position.y, 64, 63);
    }
}
for (var prop in Spirit_prototype)
    Spirit.prototype[prop] = Spirit_prototype[prop];
var canvas = document.createElement('canvas');
if (canvas.getContext && window.requestAnimationFrame) {
    canvas.style.position = 'absolute';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (window.requestAnimationFrame)
        loop();
}
function printmenu() {
    var menu = ['野獸系', '不死系', '飛行系', '昆蟲系', '植物系', '特殊系', '金屬系', '龍　系', '人形系', '邪魔系', '改　造', '其他'];
    s = '<div id="menu"><div id="firstmenu">';
    for (var i = 1; i <= 6; i++)
        s += '<dl><dt id="bmenu' + i + '" onclick="pet(\'' + i + '\')">' + menu[i - 1] + '</dt></dl>';
    s += '</div><div id="secmenu">';
    for (var i = 7; i <= 12; i++)
        s += '<dl><dt id="bmenu' + i + '" onclick="pet(\'' + i + '\')">' + menu[i - 1] + '</dt></dl>';
    s += '</div></div>';
    document.write(s);
}
printmenu();
document.write('<div style="height: 100px"></div>');
