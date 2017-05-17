// ==UserScript==
// @name        Reloader
// @namespace   HVRLD3
// @author      nihilvoid, Dan31, FabulousCupcake
// @run-at      document-end
// @include     /^https?:\/\/(alt|www)?\.?hentaiverse\.org.*$/
// @version     1.3.3b
// @grant       none
// ==/UserScript==

// Vanilla Reloader:
// http://forums.e-hentai.org/index.php?s=&showtopic=65126&view=findpost&p=4259841

// Select a custom font in your settings:
// http://hentaiverse.org/?s=Character&ss=se

// Todo List:
// - Hoverplay instead of mousemelee+defaultaction
// - Fix round counter display at end of game
// - Fix no buff blinking

// Credits and Sources
// ------------------------
// Original reloader idea   : nihilvoid
// Reloader maintainer      : Dan31
// No Blinking              : HV Stat
// HV Counter Plus          : OMP, Superlatanium
// HV State HP              : tatarime

/* ======================================== *\
 * ============= CONFIGURATION ============ *
\* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
var settings = {
    hideWelcome: true,          // Hide the "Welcome to the Hentaiverse" image/logo
    noBlinking: true,           // Disable buff/debuff blinking
    effectDurations: true,      // Show buff/debuff durations
    gemIcon: true,              // Show gem/powerup, click on icon to use
    roundCounter: true,         // Show current round and rounds remaining
    hvStateHP: true,            // Show enemy HP value
    fluidHPBar: true,           // Shorten HP Bar width to easily see which monster has the most HP

    defaultAction: 0,           // Change the default action to a T1 spell
    // |     0     |      1      |   2    |     3      |  4   |   5   |     6      |
    // | No Change | Fiery Blast | Freeze | Shockblast | Gale | Smite | Corruption |

    mouseMelee: true,           // MouseMelee ( hover on enemies to attack )
    minHP: 0.35,                // Stop if hp is below this threshold
    minMP: 0.2 ,                // Stop if mp ...
    minSP: 0.3,                 // Stop if sp ...
    stopWhenChanneling: true,   // Stop if you have channeling buff
    chromeFix: true,            // Fix MM things on chrome by manually tracking cursor movement

    battleLog: true,            // Show battle log

    skipToNextRound: true,      // Auto-advance to next round
    popupTime: 0,               // after `popupTime`ms

    counterPlus: true,          // HV-Counter-Plus ; log and show turn/speed/time/exp/credits
    counterPlusSave: true       // Store additional datas for Income Summary by Superlatanium
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *\
 * =========== CONFIGURATION END ========== *
\* ======================================== */



/* ======================================== *\
 * ============= INITIAL LOAD ============= *
\* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// Stuffs to be ran on page load

function initialPageLoad() {
    // Hoverplay fix for Chrome
    // Constantly track cursor position to allow chrome to keep hitting a monster when hovering on one.
    // You'd have to keep moving your cursor without this fix
    if ( settings.mouseMelee && settings.chromeFix ) {

        // Get cursor position from the last round
        curX = localStorage.getItem('curX');
        curY = localStorage.getItem('curY');
        localStorage.removeItem('curX');
        localStorage.removeItem('curY');

        // Update curX and curY whenever cursor moves
        if (window.Event) document.captureEvents(Event.MOUSEMOVE);
        document.onmousemove = function(e) {
            curX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            curY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        };
    }

    // Change page title to "HV"
    document.title = 'HV';

    // Insert stylesheet for Round Counter and Effect Duration
    var sheet = document.createElement('style');
    sheet.innerHTML = '#round{position:absolute;left:1080px;top:15px;width:120px;font-size:20px;font-weight:bold;z-index:10;text-align:right}.duration{width:30px;display:inline-block;text-align:center;position:relative;margin-left:-30px;top:-4px}.duration>div{background:white;border:1px solid black;padding:0 2px;display:inline-block;min-width:8px;font-weight:bold;height:13px}.hvhp{width:inherit;display:block;position:absolute;top:0;text-align:center;font-weight:bold;color:#ff0;font-size:10px;z-index:999;white-space:nowrap;text-shadow:-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000}.chbd>img{height:12px;}';

    // Hide Battle Log
    if (!settings.battleLog) sheet.innerHTML += '#togpane_log {display: none}';

    // Hide Welcome Logo
    if (settings.hideWelcome) { sheet.innerHTML += 'img.cw{display: none}.cbl:nth-of-type(1){padding-top:114px}'; }
    document.head.appendChild(sheet);

    /* ============== NO BLINKING ============= */
    if (settings.noBlinking) {
    (function(){
        window.addEventListener('beforescriptexecute', function(e) {
            if (/battle\.set_infopane\("Battle Time"\)/.test(e.target.innerHTML)) {
                e.preventDefault();
                window.removeEventListener(e.type, arguments.callee, true);
            }
        }, true);
    })();
    }
    /* ============ NO BLINKING END =========== */

    /* ============= ROUND COUNTER ============ */
    if (settings.roundCounter) {
        (function(){
        var logs = document.querySelector('#togpane_log tr:nth-last-child(2)').textContent;
        if (/Round/.test(logs)) {
            var round = logs.match(/Round ([\d\s\/]+)/)[1];
            localStorage.setItem('rounds', round);
        } else {
            var round = localStorage.getItem('rounds') || undefined;
        }

        if (round !== undefined) {
            var x = document.getElementById('mainpane').appendChild(document.createElement('div'));
            x.id = 'round';
            x.innerHTML = round;
            var final = round.split('/');
            switch (final[1] - final[0]) {
                case 0:
                    x.style.color = '#ff0000';
                    break;
                case 1:
                    x.style.color = '#ffcc99';
                    break;
            }
        }
        })();
    }
    /* =========== ROUND COUNTER END ========== */

}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *\
 * =========== INITIAL LOAD END =========== *
\* ======================================== */



/* ======================================== *\
 * ============ ON PAGE RELOAD ============ *
\* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// Stuffs to be executed after the xhr request is sent
// and the page is loaded with new content.

function OnPageReload() {
    // Reinitialize the battle manager
    window.battle = new window.Battle();
    window.battle.clear_infopane();

    // TODO: Anything that needs to trigger when a new battle page starts should go here
    //  i.e. Stat tracking, log parsing, battle-UI changes, etc.

    /* ============ DEFAULT ACTION ============ */
    function changeDefault(id) {
        var caller = document.getElementById(id.toString());
        window.battle.lock_action(caller, 1, 'magic', id);
        window.battle.set_hostile_subattack(id);
    }
    switch (settings.defaultAction) {
        //Default (Attack)
        case 0:
            break;
        case 1:
            //Fiery Blast
            changeDefault(111);
            break;
        case 2:
            //Freeze
            changeDefault(121);
            break;
        case 3:
            //Shockblast
            changeDefault(131);
            break;
        case 4:
            //Gale
            changeDefault(141);
            break;
        case 5:
            //Smite
            changeDefault(151);
            break;
        case 6:
            //Corruption
            changeDefault(161);
            break;
    }
    /* ========== DEFAULT ACTION END ========== */

    /* ============ HV COUNTER PLUS =========== */
    if (settings.counterPlus) {
        (function(){
        var record = (localStorage.record) ?
            JSON.parse(localStorage.record) :
            {'turns': 0, 'time': 0, 'EXP': 0, 'Credits': 0, 'rounds': 0 };

        var pop = document.getElementsByClassName('btcp')[0];

        function set() {
            record.rounds++;
            localStorage.setItem('record', JSON.stringify(record));
        }

        function build(item, point) {
            record[item] = ( parseInt(record[item]) || 0 ) + parseInt(point);
            // parseInt(null) is NaN, add `NaN || 0` so it becomes 0.
        }

        if (!record.time) {
            build('time', Date.now());
            set();
        }

        // If there's a popup...
        if (pop) {

            // Fetch amount of turns taken to complete the round
            var target, label, i = 0,
                textC = document.querySelectorAll('#togpane_log .t3b'),
                turn = document.querySelector('#togpane_log .t1').textContent;
                build('turns', turn);

            // And find for credit drops
            while (i < textC.length) {
                target = textC[i].textContent;
                if (/Victorious.$|Fleeing.$/.test(target)) break; // stop at end
                label = target.match(/(\d+) ([EC]\w+).$/);
                if (label) build(label[2], label[1]);
                i++;
            }

            // If there's an image in the popup ( the continue button; signifying "not game end" )...
            if (pop.getElementsByTagName('img')[0]) {
                // Save it to storage and we're done
                set();
            } else {
                // No image! It's game end! Display the stats and then burn it.
                var num = 0,
                    runTime = Math.floor((Date.now() - record.time) / 1000),
                    text = pop.getElementsByClassName('fd4'),
                    len = text.length,
                    result = pop.appendChild(document.createElement('div'));
                result.style.cssText = 'font-size:15px;font-weight:bold;margin-top:15px;';
                for (i = 0; i < len; i++) text[i].firstChild.style.marginTop = '-4px';
                pop.style.top = '23px';
                if (len > 2) pop.style.height = len > 3 ? '190px' : '170px';

                for (var key in record) {
                    var div = result.appendChild(document.createElement('div'));
                    div.style.cssText = 'display:inline-block;margin-bottom:7px;';
                    div.style.marginRight = '7px';
                    div.style.marginLeft = '7px';
                    if (key == 'time') {
                        var hour = ('0' + Math.floor(runTime / 3600) % 100).slice(-2),
                            min = ('0' + Math.floor(runTime / 60) % 60).slice(-2),
                            sec = ('0' + runTime % 60).slice(-2);
                        div.textContent = (hour !== 0 ? hour + ' h ' : '') + (min !== 0 ? min + ' m ' : '') + sec + ' s';
                        result.appendChild(document.createElement('br'));
                    } else {
                        var total = record[key] + '';
                        while (total != (total = total.replace(/^(\d+)(\d{3})/, '$1,$2')));
                        div.textContent = total + ' ' + key.toLowerCase();
                        if (!num) div.textContent += ' (' + ((Math.floor((record[key] / runTime) * 1000)) / 1000).toFixed(2) + ' t/s)';
                    }
                    num++;
                }

                // Counter Plus Save for _Income Summary_ by superlatanium
                if ( settings.counterPlusSave ) {
                    var cpsLogs = (localStorage.counterPlusSaveLogs) ?
                        JSON.parse(localStorage.counterPlusSaveLogs) :
                        [];

                    cpsLogs.push({
                        rounds: record.rounds,
                        turns: record.turns,
                        runTime: runTime,
                        timestamp: Date.now()
                    });

                    localStorage.counterPlusSaveLogs = JSON.stringify(cpsLogs);
                }
            }
        }
        })();
    }
    /* ========== HV COUNTER PLUS END ========= */

    /* ============= BUFF DURATION ============ */
    if (settings.effectDurations) {
        (function(){
        var targets = document.querySelectorAll('img[onmouseover^="battle.set_infopane_effect"]'),
            i = targets.length;
        while (i--) {
            var duration = targets[i].getAttribute('onmouseover').match(/, ([-\d]+)\)/);
            if (!duration || duration < 0) duration = '-';
            else duration = duration[1];
            var div = targets[i].parentNode.insertBefore(document.createElement('div'), targets[i].nextSibling);
            div.appendChild(document.createElement('div')).innerHTML = duration;
            div.className = 'duration';
        }
        })();
    }
    /* =========== BUFF DURATION END ========== */

    /* =============== SHOW GEMS ============== */
    if (settings.gemIcon) {
        (function(){
        var gem = document.getElementById('ikey_p');
        var gem_icon = document.getElementById("gem_icon");
        if (gem && !gem_icon) {
            var icon;
            switch (gem.getAttribute('onmouseover').match(/'([^\s]+) Gem/)[1]) {
                case 'Mystic':
                    icon = 'channeling.png';
                    break;
                case 'Health':
                    icon = 'healthpot.png';
                    break;
                case 'Mana':
                    icon = 'manapot.png';
                    break;
                case 'Spirit':
                    icon = 'spiritpot.png';
                    break;
            }

            gem_icon = document.querySelector('.btp').appendChild(document.createElement('img'));
            //gem_icon.src = 'https://raw.github.com/greentea039/HVSTAT/5a7a1e09b8847394faacf0d4b1321d51cb96816f/css/images/' + icon;
            //gem_icon.src = icon;
            gem_icon.src = 'http://ehgt.org/v/e/' + icon;
            gem_icon.style.cssText = 'border: 1px solid black; position: absolute; float: right; right: 6px; top: 8px;';
            gem_icon.onclick = function() {
                window.battle.lock_action(gem, 1, 'items', 'ikey_p');
                window.battle.set_friendly_subattack('999');
                window.battle.touch_and_go();
                gem.remove();
                gem_icon.remove();
            };
            gem_icon.id = "gem_icon";
        } else if (!gem && gem_icon) {
            gem_icon.remove();
        }
        })();
    }
    /* ============= SHOW GEMS END ============ */

    /* ============== MOUSE MELEE ============= */
    if (settings.mouseMelee) {
        (function(){

        function getMonsterUnderCursor() {
            var el = document.elementFromPoint(curX, curY);
            var result = false;

            // Check `el` and iteratively its parents until we hit body or found monster
            while(!result) {
                if(el.nodeName.toLowerCase() === 'body') break;
                result = ( el.id.match('mkey') ? el : false );
                el = el.parentElement;
            }

            return result;
        }

        function NoHoverClick() {
            var bars = document.getElementsByClassName("cwb2");
            var hp = bars[0].width / 120;
            var mp = bars[1].width / 120;
            var sp = bars[2].width / 120;
            //var oc = bars[3].width/120;
            var low_hp = (hp < settings.minHP);
            var low_mp = (mp < settings.minMP);
            var low_sp = (sp < settings.minSP);
            //var oc_full = (oc == 1);
            var bar_backs = document.getElementsByClassName("cwbdv");
            if (low_hp) bar_backs[0].setAttribute("style", "background-color:purple");
            if (low_mp) bar_backs[1].setAttribute("style", "background-color:purple");
            if (low_sp) bar_backs[2].setAttribute("style", "background-color:purple");
            var is_channeling = function() {
                if (!settings.stopWhenChanneling) return false;
                var status_icons = document.querySelectorAll('img[onmouseover^="battle.set_infopane_effect"]');
                for (var i = 0, len = status_icons.length; i < len; i++) {
                    if (/\bchanneling\b/i.test(status_icons[i].onmouseover.toString())) {
                        //var img = document.querySelector('.btp').appendChild(document.createElement('img'));
                        //img.src = "http://ehgt.org/v/e/channeling.png";
                        //img.style.cssText = 'border: 3px solid cyan; margin-right:2px; margin-left:2px;';
                        return true;
                    }
                }
                return false;
            };
            //return (low_hp || low_mp || low_sp || oc_full || is_channeling);
            return (low_hp || low_mp || low_sp || is_channeling());
        }

        var mpane = document.getElementById('monsterpane');
        if (mpane && !NoHoverClick()) {
            // Check if cursor is hovering on a monster
            if ( settings.chromeFix ) {
                var monster = getMonsterUnderCursor();
                if ( monster && monster.onclick !== null ) {
                    monster.click();
                    return;
                }
            }

            // Add hover event listeners
            var m = mpane.getElementsByClassName("btm1");
            for (var i = 0; i < m.length; i++) {
                if (m[i].hasAttribute('onclick')) {
                    m[i].setAttribute('onmouseover', m[i].getAttribute('onclick'));
                }
            }
        }
    })();
    }
    /* ============ MOUSE MELEE END =========== */

    /* ============== HV STATE HP ============= */
    if(settings.hvStateHP) {
        (function(){

            function writeHP(index, value) {
                var targ        = document.querySelectorAll('.btm5:first-child')[index];
                if ( targ.children[0].nodeName == 'IMG' ) return;                                // Skip if dead
                var realHPperc  = targ.children[0].children[0].width/120;
                var realHP      = Math.round( realHPperc * value );
                var maxHP       = value;
                var el = document.createElement('span');
                el.classList.add('hvhp');
                el.innerHTML = `${realHP} / ${maxHP}`;

                targ.appendChild(el);
            }
            function changeHPBarWidth(index, value, maxvalue) {
                var targ = document.querySelectorAll('.btm5:first-child')[index];
                if ( targ.children[0].nodeName == 'IMG' ) return;                                // Skip if dead
                var realwidth   = targ.children[0].children[0].width;
                var maxwidth    = 120;
                realwidth   = Math.round(realwidth * value/maxvalue);
                maxwidth    = Math.round( maxwidth * value/maxvalue);

                targ.style.width = `${maxwidth}px`;
                targ.children[0].style.width = `${maxwidth}px`;
                targ.children[0].children[0].style.width = `${realwidth}px`;
                targ.children[0].children[1].style.width = `${maxwidth}px`;
            }
            function fetchMonsterHPs() {
                var i = 0;
                var hpList = '';

                while(true) {
                    index = 3 + i;
                    var log = document.querySelector(`#togpane_log tr:nth-last-child(${index})`);
                    if ( log && /Spawned Monster/.test(log.textContent) ) {
                        var hp = log.textContent.match(/HP=(\d+)/)[1];
                        hpList += `${hp};`;
                    } else {
                        break;
                    }
                    i += 1;
                }

                if (hpList) localStorage.setItem('hpList', hpList);
            }
            function isBattleStart() {
                var log = document.querySelector('#togpane_log tr:nth-last-child(1)').textContent;
                if ( /Battle Start!/.test(log) ) return true;
                return false;
            }

            // Get list of monster HP
            if ( isBattleStart() ) fetchMonsterHPs();
            var hpList = localStorage.getItem('hpList');
            if( typeof hpList == "undefined" ) return;
            hpList = hpList.split(';');

            // Write HP to each monster
            for(var i = 0; i<hpList.length-1; i+=1) {
                writeHP(i, hpList[i]);
            }

            // Fluid HP bar
            if(settings.fluidHPBar) {
                var maxHP = Math.max.apply(null, hpList);
                for(var i = 0; i<hpList.length-1; i+=1) {
                    changeHPBarWidth(i, hpList[i], maxHP);
                }
            }

        })();
    }
    /* ============ HV STATE HP END =========== */

    /* =========== EXTERNAL SCRIPTS =========== */
    window.dispatchEvent(new CustomEvent('Reloader_reloaded'));
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *\
 * ========== ON PAGE RELOAD END ========== *
\* ======================================== */


/* ======================================== *\
 * ===============  C O R E  ============== *
\* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ============= SUBMIT ACTION ============ */
function SubmitAction() {
    // Reload page if end of round detected ( marked by the existence of popup/navbar )
    if (document.querySelector('.btcp') || document.querySelector('#navbar')) {
        window.location.href = window.location.href;
        return;
    }

    // Serialize form data
    var inputs = document.getElementsByTagName("input");
    var serializedForm = "";
    for (var i = 0; i < inputs.length; i++) {
        if (i !== 0)
            serializedForm += "&";
        serializedForm += inputs[i].id + "=" + inputs[i].value;
    }

    // Send XHR
    var r = new XMLHttpRequest();
    r.open("POST", "", true);
    r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    r.responseType = 'document';
    r.onload = function() {
        if (r.status >= 200 && r.status < 400) {
            updatePage(r.response);
        }
    };
    r.send(serializedForm);

    /* ============== UPDATE PAGE ============= */
    function updatePage(data) {
        var existing, newStuff, i;
        var replacements = '.cwbdv, .bte, #ckey_spirit, #ckey_defend, #togpane_magico, #togpane_magict, #togpane_item, #quickbar, #togpane_log';
        var monsterReplacements = '#mkey_0, #mkey_1, #mkey_2, #mkey_3, #mkey_4, #mkey_5, #mkey_6, #mkey_7, #mkey_8, #mkey_9';

        // Replace `replacements` elements on live document with the newly obtained data
        existing = document.querySelectorAll(replacements);
        newStuff = data.querySelectorAll(replacements);
        i = existing.length;
        while (i--) {
            existing[i].parentNode.replaceChild(newStuff[i], existing[i]);
        }

        // Replace `monsterReplacements` elements on live document with the newly obtained data
        // Don't update dead monsters
        existing = document.querySelectorAll(monsterReplacements);
        newStuff = data.querySelectorAll(monsterReplacements);
        i = existing.length;
        while (i--) {
            if (existing[i].hasAttribute("onclick") || newStuff[i].hasAttribute("onclick")) {
                existing[i].parentNode.replaceChild(newStuff[i], existing[i]);
            }
        }

        var popup  = data.getElementsByClassName('btcp');
        var navbar = data.getElementById('navbar');

        var popupLength = popup.length; // this is because popup.length is changed after insertBefore() is called for some reason.
        var navbarExists = !!navbar;

        // If there's navbar/popup in new content, show it
        if (navbarExists) {
            var mainpane = document.getElementById('mainpane');
            mainpane.parentNode.insertBefore(navbar, mainpane);
            window.at_attach("parent_Character", "child_Character", "hover", "y", "pointer");
            window.at_attach("parent_Bazaar", "child_Bazaar", "hover", "y", "pointer");
            window.at_attach("parent_Battle", "child_Battle", "hover", "y", "pointer");
            window.at_attach("parent_Forge", "child_Forge", "hover", "y", "pointer");
        }
        if (popupLength !== 0) {
            // Here we're loading popup to the page regardless of the skipNextRound / popupTime settings
            // even though it is "skipped" and not even visible; slightly increasing load time.
            // This is because OnPageReload() will later call scripts,
            // some of which will require popup in the document ( Counter Plus )
            var parent = document.getElementsByClassName('btt')[0];
            parent.insertBefore(popup[0], parent.firstChild);
        }

        // Run all script modules again
        OnPageReload();

        // Reload page if `skipToNextRound` and it is Round End
        // Round End detection: popup exists and navbar does not
        if ( popupLength !== 0 && !navbarExists ) {
            /*
            if ( settings.mouseMelee ) {
                localStorage.setItem('curX', curX);
                localStorage.setItem('curY', curY);
            }
            */
            // Skip to next round
            if ( settings.skipToNextRound ) {
                if (settings.popupTime === 0) {
                    window.location.href = window.location.href;
                } else {
                    setTimeout(function() {
                        window.location.href = window.location.href;
                    }, settings.popupTime);
                }
            }
        }

        // Remove counter datas on Game End
        // Game End detection: popup and navbar exists
        if ( popupLength !== 0 && navbarExists ) {
            localStorage.removeItem('record');
            localStorage.removeItem('rounds');
        }

    }
    /* ============ UPDATE PAGE END =========== */

}
/* =========== SUBMIT ACTION END ========== */

// Start script if in battle
if ( document.getElementById('togpane_log') ) {

    // Init
    initialPageLoad();

    // External Script Init
    window.dispatchEvent(new CustomEvent('Reloader_page_reloaded'));

    // Replace submit with custom submit
    document.getElementById("battleform").submit = SubmitAction;

    // Run all script modules
    OnPageReload();
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *\
 * ===========  C O R E   E N D  ========== *
\* ======================================== */