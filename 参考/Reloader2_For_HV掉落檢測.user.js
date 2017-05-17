// ==UserScript==
// @name        Reloader2_For_HV掉落檢測
// @author      nihilvoid, Dan31, Hoheneim
// @run-at      document-start
// @include     http://hentaiverse.org/*
// @version     1.2
// @grant       unsafeWindow
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// ==/UserScript==

//Vanilla Reloader by nihilvoid: http://forums.e-hentai.org/index.php?s=&showtopic=65126&view=findpost&p=3455688

//Select a custom font in your settings: http://hentaiverse.org/?s=Character&ss=se
//Example: Cambria/9/bold/normal/-4

//Change your settings here
var settings = {
    
    //added by Hoheneim
    //Activate advanced Skill Hotkey handling
    skillHotkey: true,
    //Show when Spirit Shield is running out, when channeled and when sparked
    spiritShieldAlert: false,
    channelAlert: false,
    sparkAlert: false,
    
    //Hide the Welcome to the Hentaiverse image
    hideWelcome: false,
    //Disable buff/debuff blinking
    noBlinking: true,
    //Show buff/debuff durations
    effectDurations: true,
    //Show gem, click on icon to use
    gemIcon: true,
    //Show current round at the bottom of the page
    roundCounter: true,
    //Change the default action to a T1 spell
    //No change: 0, Fiery Blast: 1, Freeze: 2, Shockblast: 3, Gale: 4, Smite: 5, Corruption: 6
    defaultAction: 0,
    //Enable Mousemelee, disable it on conditions (minHP = 0.4 means disabled when HP under 40%, etc.)
    mouseMelee: true,
    minHP: 0.4,
    minMP: 0.12,
    minSP: 0.12,
    stopWhenChanneling: true,
    //Show the battle log (if disabled, still show round rewards) + method used (replace or append)
    battleLog: false,
    battleLogAppend: false,
    //Auto-advance to next round on round clear after set time (ms)
    skipToNextRound: true,
    popupTime: 0
};

//-----------------------------------------------------------------------------------------------------------------

//### No blinking script ###
//Disables buff/debuff blinking
//by replacing the init_battle() function before it is used
if (settings.noBlinking) {
    var changed = 0; // script need to be edited with
    window.addEventListener('beforescriptexecute', function(e) {
        //for inline script:
        if (e.target === document.getElementsByTagName("script")[1]) {
            changed++;
            append(NewScript1);
        }
        //when done, remove the listener:
        if (changed == 1) window.removeEventListener(e.type, arguments.callee, true);
    }, true);
    ////// append with new block function:
    function append(s) {
        document.head.appendChild(document.createElement('script'))
            .innerHTML = s.toString().replace(/^function.*{|}$/g, '');
    }
    //////
    function NewScript1() {
        /* insert new block here */
        function init_battle() {
            var a = new Battle();
            a.clear_infopane();
            return a;
        }
    };
}
//### No blinking script - end ###

//### Skill Hotkey ###
//Added by Hoheneim
	var skillCount = 0;
	
	if (settings.skillHotkey) {
		document.addEventListener('keyup',function(e) {
      // 107 is the keycode for the numpad "+" key
      // 13 is the keycode for the "enter" key
      if ( ( [107, 13].indexOf(e.keyCode) == -1) || document.querySelector('.btcp') ) {
         skillCount = 0;
         return;
      }
        
			var pane = document.getElementById('togpane_magico'), 
				toggleSkillsPane = document.getElementById('ckey_magic'),
				skillsList = document.querySelectorAll('#togpane_magico tr:nth-child(3) ~ tr > td > div:not([style])'),
				skillTarget, 
				skillArray = [],
				skillOrder = [0, 1, 2, 3, 4]
				additionalSkills = 1;
				
			skillOrder.length = skillsList.length;
			
			  // check if the additional skills "Fus Ro Dah" and/or "Orbital Friendship Cannon" exist and are active
        if ( document.getElementById('1101') ) {
            if ( document.getElementById('1101').hasAttribute("onclick") ) {
                additionalSkills++;
            }
        }
        if ( document.getElementById('1111') ) {
            if ( document.getElementById('1111').hasAttribute("onclick") ) {
                additionalSkills++;
            }
        }	

        // if skillsList has no length, no skill is available: bail out
        if (!skillsList.length) {
            skillCount = 0;
            return;
        } else {
            if (e.keyCode == 107) { 
                //changes skillArray order so that the weapon skills are selected first
                skillArray = skillOrder.slice(additionalSkills, skillOrder.length).concat(skillOrder.splice(0, additionalSkills));
            } else {
                //leaves skillArray order as it is so that additional skills are selected first
                skillArray = skillOrder;
            }

            skillTarget = skillsList[skillArray[skillCount++]];

        }
        while (pane.style.cssText.length) toggleSkillsPane.click();

        // after cycling through the skill List, select "Attack", then start over again
        if ( skillCount > (skillsList.length) ) {
            document.getElementById('1011').click(); //forces the interface to deselect a skill
            document.getElementById('ckey_attack').click();
            skillCount = 0;
        } else { 
            skillTarget.click();
        }

    },false);
  }
//### Skill Hotkey - end ###

this.$ = this.jQuery = jQuery.noConflict(true);

function OnPageReload() {
    ReplacePostMechanism();

    // Show the logs!  
    // Note: Hiding the log panel will significantly reduce render time
    //   Change "show" to "hide" to try it :D
    //$('#togpane_log').show();

    // TODO: Anything that needs to trigger when a new battle page starts should go here
    //   i.e. Stat tracking, log parsing, battle-UI changes, etc.
    
    //### Change default action ###
    switch (settings.defaultAction) {
        //Default (Attack)
        case 0:
            break;
        case 1:
            //Fiery Blast
            var caller = document.getElementById("111");
            unsafeWindow.battle.lock_action(caller, 1, 'magic', 111);
            unsafeWindow.battle.set_hostile_subattack(111);
            break;
        case 2:
            //Freeze
            var caller = document.getElementById("121");
            unsafeWindow.battle.lock_action(caller, 1, 'magic', 121);
            unsafeWindow.battle.set_hostile_subattack(121);
            break;
        case 3:
            //Shockblast
            var caller = document.getElementById("131");
            unsafeWindow.battle.lock_action(caller, 1, 'magic', 131);
            unsafeWindow.battle.set_hostile_subattack(131);
            break;
        case 4:
            //Gale
            var caller = document.getElementById("141");
            unsafeWindow.battle.lock_action(caller, 1, 'magic', 141);
            unsafeWindow.battle.set_hostile_subattack(141);
            break;
        case 5:
            //Smite
            var caller = document.getElementById("151");
            unsafeWindow.battle.lock_action(caller, 1, 'magic', 151);
            unsafeWindow.battle.set_hostile_subattack(151);
            break;
        case 6:
            //Corruption
            var caller = document.getElementById("161");
            unsafeWindow.battle.lock_action(caller, 1, 'magic', 161);
            unsafeWindow.battle.set_hostile_subattack(161);
			break;
    }
    //### Change default action - end ###

    //### HV Counter Plus ###
    var record = localStorage.record ? JSON.parse(localStorage.record) : {
            'turns': 0,
            'time': 0,
            'EXP': 0,
            'Credits': 0
        },
        pop = document.getElementsByClassName('btcp')[0],
        set = function() {
            localStorage.setItem('record', JSON.stringify(record));
        },
        build = function(item, point) {
            record[item] = record[item] * 1 + point * 1;
        };

    if (!record.time) {
        build('time', Date.now());
        set();
    }
    if (pop) {
        var target, label, i = 0,
            text = document.querySelectorAll('#togpane_log .t3b'),
            turn = document.querySelector('#togpane_log .t1').textContent;
        build('turns', turn);
        while (i < text.length) {
            target = text[i].textContent;
            if (/Victorious.$|Fleeing.$/.test(target)) break;
            label = target.match(/(\d+) ([EC]\w+).$/);
            if (label) build(label[2], label[1]);
            i++;
        }
        if (pop.getElementsByTagName('img')[0]) set();
        else {
            var num = 0,
                runTime = Math.floor((Date.now() - record.time) / 1000),
                text = pop.getElementsByClassName('fd4'),
                len = text.length,
                result = pop.appendChild(document.createElement('div'));
            result.style.cssText = 'font-size:15px;font-weight:bold;margin-top:15px;';
            for (i = 0; i < len; i++) text[i].firstChild.style.marginTop = '-4px';
            pop.style.top = '23px';
            if (len > 2) pop.style.height = len > 3 ? '190px' : '170px';

            for (key in record) {
                var div = result.appendChild(document.createElement('div'));
                div.style.cssText = 'display:inline-block;margin-bottom:7px;';
                if (!(num % 2)) div.style.marginRight = '20px';
                if (key == 'time') {
                    var hour = ('0' + Math.floor(runTime / 3600) % 100).slice(-2),
                        min = ('0' + Math.floor(runTime / 60) % 60).slice(-2),
                        sec = ('0' + runTime % 60).slice(-2);
                    div.textContent = (hour != 0 ? hour + ' h ' : '') + (min != 0 ? min + ' m ' : '') + sec + ' s';
                    result.appendChild(document.createElement('br'));
                } else {
                    var total = record[key] + '';
                    while (total != (total = total.replace(/^(\d+)(\d{3})/, '$1,$2')));
                    div.textContent = total + ' ' + key.toLowerCase();
                    if (!num) div.textContent += ' (' + ((Math.floor((record[key] / runTime) * 1000)) / 1000).toFixed(2) + ' t/s)';
                }
                num++;
            }
        }
    }
    //### HV Counter Plus - end ###

    //### Effect duration ###
    //From HV Stats Slim
    if (settings.effectDurations) {
        var targets = document.querySelectorAll('img[onmouseover^="battle.set_infopane_effect"]'),
            i = targets.length;
        while (i--) {
            var duration = targets[i].getAttribute('onmouseover').match(/, ([-\d]+)\)/);
            if (!duration || duration < 0) duration = 'IA';
            else duration = duration[1];
            var div = targets[i].parentNode.insertBefore(document.createElement('div'), targets[i].nextSibling);
            div.appendChild(document.createElement('div')).innerHTML = duration;
            
            //Added by Hoheneim 
            div.style.cssText = 'width:30px;display:inline-block;text-align:center;position:relative;margin-left:-30px;top:-3px;';
            div.firstChild.style.cssText =  'background:black;color:White;padding:0;display:inline-block;font-size:13px;width: 23px;height: 16px;';
        }
    }
    //### Effect duration - end ###
    
    //### Letters to Numbers ###
    //Added by Hoheneim
    var numbers = $('.btm2'), i = 1;
    numbers.each( function() {
       $(this).children(':first-child').hide();
        $(this).prepend($('<div/>').html( (i++)%10 ).css( { 'font-size': '2em', 'font-family': 'HentaiVerse', 'color': 'darkbrown', 'margin-bottom': '5px' } ));
    });
    //### Letters to Numbers - end ###

    //### Show Gems script ###
    //Show an icon when possessing a gem, which can be clicked to use it.
    if (settings.gemIcon) {
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
            };

            gem_icon = document.querySelector('.btp').appendChild(document.createElement('img'));
            //gem_icon.src = 'https://raw.github.com/greentea039/HVSTAT/5a7a1e09b8847394faacf0d4b1321d51cb96816f/css/images/' + icon;
            //gem_icon.src = icon;
            gem_icon.src = 'http://ehgt.org/v/e/' + icon;
            gem_icon.style.cssText = 'border: 1px solid black; position: absolute; float: right; right: 6px; top: 8px; cursor: pointer;';
            gem_icon.onclick = function() {
                unsafeWindow.battle.lock_action(gem, 1, 'items', 'ikey_p');
                unsafeWindow.battle.set_friendly_subattack('999');
                unsafeWindow.battle.touch_and_go();
                gem.remove();
                gem_icon.remove();
            }
            gem_icon.id = "gem_icon";
        } else if (!gem && gem_icon) {
            gem_icon.remove();
        }
    }
    //### Show Gems script - end ###

    //### Alerts ###
    //Added by Hoheneim

    // Spirit Shield Alert
    if (settings.spiritShieldAlert && document.querySelector('img[onmouseover^="battle.set_infopane_effect(\'Spirit Shield\'"]') ) {
        var runningOut = document.querySelector('img[onmouseover^="battle.set_infopane_effect(\'Spirit Shield\'"]').getAttribute('onmouseover').match(/, ([-\d]+)\)/);
        if (runningOut[1] < 10) {
            document.querySelector('#mainpane > .btt > .bte').style.cssText = 'background-color: rgba(0,128,0,0.5)';
        } 
    }
    
    // channel alert
    if (settings.channelAlert && (document.querySelector('.btp > img[src$="channeling.png"]') || document.querySelector('.bte > img[src$="channeling.png"]'))) {
        //window.alert("You gain the effect Channeling.");
        document.querySelector('#mainpane > .btt > .bte').style.cssText = 'background-color: rgba(0,0,255,0.2)';
    }

    // spark alert
    if (settings.sparkAlert && document.querySelector('.bte > img[src$="fallenshield.png"]')) {
        window.alert("Spark of Life has triggered.");
    }
    //### Alerts - end ###
    
    //### custom MouseMelee script ###
    //Hover over monsters to attack. Stops on defined conditions.
    if (settings.mouseMelee) {
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
            var m = mpane.getElementsByClassName("btm1");
            for (var i = 0; i < m.length; i++) {
                if (m[i].hasAttribute('onclick')) {
                    m[i].setAttribute('onmouseover', m[i].getAttribute('onclick'));
                }
            }
        }
    }
    //### custom MouseMelee script - end ###
}

var semaphore = false;
var replacements = [
    'div.btt', // Status bar + popup
    '#ckey_spirit', // Spirit button
    '#ckey_defend', // Defend button
    'div.cwbdv', // HP, MP, SP, Overcharge bars
    '#togpane_magico', '#togpane_magict', // Magic and Skill tabs
    '#togpane_item', // Items
    '#quickbar', // Provides status info and shortcuts during manual play
];
var monsterReplacements = [
    '#mkey_0', '#mkey_1', '#mkey_2', '#mkey_3', '#mkey_4', '#mkey_5', '#mkey_6', '#mkey_7', '#mkey_8', '#mkey_9'
];
function SubmitAction() {
    // Prevent a display glitch when using an item
    unsafeWindow.battle.toggle_default_pane();

    if (!semaphore) {
        semaphore = true;

        // Selectively replace elements on the screen
        $('#LoadingText').show();
        var loadStart = (new Date()).getTime();
        $.ajax({
                type: 'POST',
                url: '',
                data: $('#battleform > input').serialize()
            })
            .done(function(data) {
                //var loadEnd = (new Date()).getTime();
                //$('#PostTime').text(loadEnd - loadStart);

                // Parse the returned data into a jQuery object
                data = $(data);

                // Handle simple replacements
                var i = replacements.length;
                while (i--) {
                    var existing = $(replacements[i]);
                    var newStuff = data.find(replacements[i]);
                    var j = existing.length;
                    while (j--) {
                        existing.eq(j).replaceWith(newStuff.eq(j));
                    }
                }

                // Handle monster replacements (don't replace dead monsters)
                i = monsterReplacements.length;
                while (i--) {
                    var existing = $(monsterReplacements[i]);
                    if (existing.length <= 0 || existing.filter('[onclick]').length <= 0) {
                        monsterReplacements.splice(i, 1);
                        continue;
                    }
                    var newStuff = data.find(monsterReplacements[i]);
                    existing.replaceWith(newStuff);
                }

                // Battle log
                if (settings.battleLog) {
					if (settings.battleLogAppend) {
						var logs = data.find('#togpane_log tr');
						var turnNum = logs.filter(':first').children('td.t1').text();
						$('#togpane_log tr').filter(':first').before(
							logs.filter(function() {
								return $(this).children('td.t1').text() === turnNum;
							})
						);
					}
					else {
						var existing = $('#togpane_log');
						var newStuff = data.find('#togpane_log');
						var j = existing.length;
						while (j--) {
							existing.eq(j).replaceWith(newStuff.eq(j));
						}
					}
                }

                // Check for the next round button
                var continueButton = document.querySelector('#ckey_continue');
                //Check for the nav bar (= end of battle serie)
                var navbar = data.find("#navbar");
                //Round end
                if ((continueButton != null) || (navbar.length > 0)) {
                    // Show round completion info (if log disabled otherwise)
                    if (!settings.battleLog) {
                        var logs = data.find('#togpane_log tr');
                        var turnNum = logs.filter(':first').children('td.t1').text();
                        $('#togpane_log tr').filter(':first').before(
                            logs.filter(function() {
                                return $(this).children('td.t1').text() === turnNum;
                            })
                        );
                    }
                    if (navbar.length > 0) {
                        //Display the nav bar
                        navbar.insertAfter(".clb");
                    }
                }

                // Do everything again
                //$('#LoadingText').hide();
                //var swapEnd = (new Date()).getTime();
                //$('#SwapTime').text(swapEnd - loadEnd);
                OnPageReload();

				        //Check for end of round
                if ((continueButton != null) || (navbar.length > 0)) {
                    //Reset the round counter
                    sessionStorage.removeItem('rounds');
                    if ((navbar.length == 0) && (continueButton != null)) {
                        if (settings.skipToNextRound) {
                            $('.btcp').hide(); //Added by Hoheneim
                            //Auto-advance to next round
                            setTimeout(function() {
                                document.getElementById("event_of_dropscript").onclick();
                            }, settings.popupTime);
                        } else {
                            continueButton.setAttribute("onclick", 'document.getElementById("event_of_dropscript").onclick();');
                        }
                    } else {
                        //Remove the record of Counter Plus
                        localStorage.removeItem('record');
                    }
                    return;
                }

                //var customEnd = (new Date()).getTime();
                //$('#CustomTime').text(customEnd - swapEnd);
                //$('#TotalTime').text(customEnd - loadStart);
                semaphore = false;
            }).fail(function(jqXHR) {
            semaphore = false;

            // Try to resend
            setTimeout(SubmitAction, 1);
        });
    }
}

var OriginalPost = undefined;

function ReplacePostMechanism() {
    // Reinitialize the battle manager
    unsafeWindow.battle = unsafeWindow.init_battle();

    // Replace the function that performs the POST
    unsafeWindow.battle.OriginalPost = unsafeWindow.battle.touch_and_go
    unsafeWindow.battle.touch_and_go = unsafeWindow.ContextSwitch;
};

addEventListener("ContextSwitch", function(event) {
    SubmitAction();
}, false);

// Run this stuff after the page is loaded
addEventListener('DOMContentLoaded', OnPageLoad, false);

function OnPageLoad() {

    // TODO: One-time stuff that happens on page load should go here

    if (settings.hideWelcome) {
        document.title = 'HV'; //Change page title to 'HV'
        $('img.cw').hide(); //Hide the 'Welcome to the Hentaiverse' image.
        $('.clb').prepend("<div style='height:114px'></div>") //Keep stuff that was under that image at the same place
    }

    // Check to see if the overcharge bar is present
    // This usually means a battle is occurring
    var overcharge = $('div.cwbdv > .cwb2[alt="overcharge"]');
    if (overcharge.length != 1) {
        return;
    }

    //### Round counter ###
    if (settings.roundCounter) {
        
        var logs = document.querySelector('#togpane_log tr:nth-last-child(2)').textContent;
        if (/Round/.test(logs) && !sessionStorage.rounds) {
            var round = logs.match(/Round ([\d\s\/]+)/)[1];
            sessionStorage.setItem('rounds', round);
        } else {
            var round = sessionStorage.getItem('rounds') || undefined;
        }
        if (round !== undefined) {
            var x = document.querySelector('#mainpane').appendChild(document.createElement('div'));
            x.id = 'round';
            
            //Added by Hoheneim
            x.style.cssText = 'position: absolute; left: 1080px; top: 15px; width: 120px; font-size: 20px; font-weight: bold; z-index: 10, text-align: right';
            
            
            x.innerHTML = round;
            
            var final = round.split('/');
            switch (final[1] - final[0]) {
                case 0:
                    x.style.color = '#CC0000';
                    break;
                case 1:
                    x.style.color = 'darkorange';
                    break;
            }
            
        }
    }
    //### Round counter - end ###

    //commented out by Hoheneim: the style is handled directly in the Effect Duration section
    //style for effect duration
    //document.head.appendChild(document.createElement('style')).innerHTML =
    //    '.duration{width:30px;display:inline-block;text-align:center;position:relative;margin-left:-30px;top:-4px;}.duration>div{background:white;min-width: 22px;border:1px solid black;padding:0;display:inline-block;font-weight:bold;height:12px;}';

    // Append a display to show reload timing information (debug info)
    /*$('#infopane').after(
        '<div style="position:absolute; top:108px; right:10px">'
            + 'POST: <span id="PostTime"></span> ms</br>'
            + 'Swap: <span id="SwapTime"></span> ms</br>'
            + 'Other: <span id="CustomTime"></span> ms</br>'
            + 'Total: <span id="TotalTime"></span> ms</br>'
            + '<div id="LoadingText" style="display:none">Loading...</div>'
        + '</div>');*/

    // Replace the battle form with something I can manipulate
    // This simultaneously disables traditional form submission (which forces a full page reload)
    // and preserves the functionality of the HentaiVerse's built-in scripts
    $('#battleform').after('<div id="battleform">' + $('#battleform').html() + '</div>').remove();

    // Add the page-to-user script context switching function
    function ContextSwitch() {
        try {
            unsafeWindow.battle.OriginalPost();
        } catch (ignored) {}

        // Dispatch a custom event to trigger the SubmitAction function in the 
        //   context script, rather than the page script
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent("ContextSwitch", true, true, undefined);
        document.documentElement.dispatchEvent(event);
    }
    exportFunction(ContextSwitch, unsafeWindow, {
        defineAs: "ContextSwitch"
    });

    OnPageReload();
}