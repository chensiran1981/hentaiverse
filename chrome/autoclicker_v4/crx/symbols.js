ac.symbols = {
	//HTML&JS
	BattleForm:	{ id:'battleform'}
	,RiddleForm:	{ id:'riddleform'}
	,StuffBox:	{ className:'stuffbox'}
	,HookSubmit:	{ code:'battleform.submit = function() {document.dispatchEvent(new CustomEvent(\'submitBattleForm\'));}; document.addEventListener(\'reinitializeBattleManager\',function(e) {window.battle = new window.Battle();window.battle.clear_infopane();});'}                                                                  
	,SubmitBattleForm:			{name:'submitBattleForm'}
	,ReinitializeBattleManager:		{name:'reinitializeBattleManager'}
	//Basic
	,Overcharge:	{ name:'Overcharge',		max:250	}
	//Difficulty
	,PFUDOR: 	{ name:'PFUDOR'}
	//Title
	,Newbie: 	{ name:'Newbie'}
	//Mode
	,SpiritStance:	{ name:'Spirit',		type:'mode',	mode:'spirit'}
	//Item
	,HealthGem:		{ name:'Health Gem',	type:'item'}
	,ManaGem:		{ name:'Mana Gem',		type:'item'}
	,SpiritGem:		{ name:'Spirit Gem',		type:'item'}
	,MysticGem:		{ name:'Mystic Gem',	type:'item', 	effectRef:'EChanneling'}
	,HealthDraught:	{ name:'Health Draught',	type:'item',	effectRef:'ERegeneration'}
	,ManaDraught:	{ name:'Mana Draught',	type:'item',	effectRef:'EReplenishment'}
	,SpiritDraught:	{ name:'Spirit Draught',	type:'item',	effectRef:'ERefreshment'}
	,HealthPotion:	{ name:'Health Potion',	type:'item'}
	,ManaPotion:		{ name:'Mana Potion',	type:'item'}
	,SpiritPotion:		{ name:'Spirit Potion',	type:'item'}
	,HealthElixir:		{ name:'Health Elixir',	type:'item'}
	,ManaElixir:		{ name:'Mana Elixir',	type:'item'}
	,SpiritElixir:		{ name:'Spirit Elixir',	type:'item'}
	,LastElixir:		{ name:'Last Elixir',		type:'item'}
	//Skill
	,Flee:			{ name:'Flee',		type:'skill',	id:1001}
	,Scan:			{ name:'Scan',		type:'skill',	id:1011}
	,IrisStrike:		{ name:'Iris Strike',		type:'skill',	id:2401}
	,Backstab:		{ name:'Backstab',		type:'skill',	id:2402}
	,FrenziedBlows:	{ name:'Frenzied Blows',	type:'skill',	id:2403}
	,ShieldBash:		{ name:'Shield Bash',	type:'skill',	id:2201}
	,VitalStrike: 		{ name:'Vital Strike',	type:'skill',	id:2202}
	,MercifulBlow:	{ name:'Merciful Blow',	type:'skill',	id:2203}
	,FieryBlast:		{ name:'Fiery Blast',		type:'skill',	id:111}
	,Inferno:		{ name:'Inferno',		type:'skill',	id:112}
	,FlamesOfLoki:	{ name:'Flames of Loki',	type:'skill',	id:113}
	,Freeze:		{ name:'Freeze',		type:'skill',	id:121}
	,Blizzard:		{ name:'Blizzard',		type:'skill',	id:122}
	,Fimbulvetr:		{ name:'Fimbulvetr',		type:'skill',	id:123}
	,Shockblast:		{ name:'Shockblast',		type:'skill',	id:131}
	,ChainedLightning:	{ name:'Chained Lightning',	type:'skill',	id:132}
	,WrathOfThor:	{ name:'Wrath of Thor',	type:'skill',	id:133}
	,Gale:			{ name:'Gale',		type:'skill',	id:141}
	,Downburst:		{ name:'Downburst',		type:'skill',	id:142}
	,StormsOfNjord:	{ name:'Storms of Njord',	type:'skill',	id:143}
	,Smite:		{ name:'Smite',		type:'skill',	id:151}
	,Banishment:		{ name:'Banishment',	type:'skill',	id:152}
	,ParadiseLost:	{ name:'Paradise Lost',	type:'skill',	id:153}
	,Corruption:		{ name:'Corruption',		type:'skill',	id:161}
	,Disintegrate:		{ name:'Disintegrate',	type:'skill',	id:162}
	,Ragnarok:		{ name:'Ragnarok',		type:'skill',	id:163}
	,Drain:			{ name:'Drain',		type:'skill',	id:211}
	,Weaken:		{ name:'Weaken',		type:'skill',	id:212}
	,Imperil:		{ name:'Imperil',		type:'skill',	id:213}
	,Slow:			{ name:'Slow',		type:'skill',	id:221}
	,Sleep:			{ name:'Sleep',		type:'skill',	id:222}
	,Confuse:		{ name:'Confuse',		type:'skill',	id:223}
	,Blind:			{ name:'Blind',		type:'skill',	id:231}
	,Silence:		{ name:'Silence',		type:'skill',	id:232}
	,MagNet:		{ name:'MagNet',		type:'skill',	id:233}
	,Cure:			{ name:'Cure',		type:'skill',	id:311}
	,Regen:		{ name:'Regen',		type:'skill',	id:312,		effectRef:'ERegen'}
	,FullCure:		{ name:'Full-Cure',		type:'skill',	id:313}
	,Protection:		{ name:'Protection',		type:'skill',	id:411,		effectRef:'EProtection'}
	,Haste:		{ name:'Haste',		type:'skill',	id:412,		effectRef:'EHaste'}
	,ShadowVeil:		{ name:'Shadow Veil',	type:'skill',	id:413,		effectRef:'EShadowVeil'}
	,Absorb:		{ name:'Absorb',		type:'skill',	id:421,		effectRef:'EAbsorb'}
	,SparkOfLife:	{ name:'Spark of Life',	type:'skill',	id:422,	effectRef:'ESparkOfLife'}
	,SpiritShield:		{ name:'Spirit Shield',	type:'skill',	id:423,	effectRef:'ESpiritShield'}
	,Heartseeker:	{ name:'Heartseeker',	type:'skill',	id:431,		effectRef:'EHeartseeker'}
	,ArcaneFocus:	{ name:'Arcane Focus',	type:'skill',	id:432,	effectRef:'EArcaneFocus'}
	//Effect
	,EChanneling:		{ name:'Channeling',		type:'effect',	itemRef:'MysticGem',	factor:1.5}
	,ERegeneration:	{ name:'Regeneration',	type:'effect',	itemRef:'HealthDraught'}
	,EReplenishment:	{ name:'Replenishment',	type:'effect',	itemRef:'ManaDraught'}	
	,ERefreshment:	{ name:'Refreshment',	type:'effect',	itemRef:'SpiritDraught'}
	,ERegen:		{ name:'Regen',		type:'effect',	skillRef:'Regen'}
	,EProtection:		{ name:'Protection',		type:'effect',	skillRef:'Protection'}
	,EHaste:		{ name:'Hastened',		type:'effect',	skillRef:'Haste'}
	,EShadowVeil:	{ name:'Shadow Veil',	type:'effect',	skillRef:'ShadowVeil'}
	,EAbsorb:		{ name:'Absorbing Ward',	type:'effect',	skillRef:'Absorb'}
	,ESparkOfLife:	{ name:'Spark of Life',	type:'effect',	skillRef:'SparkOfLife'}
	,ESpiritShield:	{ name:'Spirit Shield',	type:'effect',	skillRef:'SpiritShield'}
	,EHeartseeker:	{ name:'Heartseeker',	type:'effect',	skillRef:'Heartseeker'}
	,EArcaneFocus:	{ name:'Arcane Focus',	type:'effect',	skillRef:'ArcaneFocus'}
	,EStunned:		{ name:'Stunned',		type:'effect'	}
	,EBleedingWound: 	{ name:'Bleeding Wound',	type:'effect'}
	,Bosses: {
		Manbearpig: 		{ name:'Manbearpig', 	type:'monster', isBoss:true}
		,WhiteBunneh: 	{ name:'White Bunneh', 	type:'monster', isBoss:true}	
		,Mithra: 		{ name:'Mithra', 		type:'monster', isBoss:true}	
		,Dalek: 		{ name:'Dalek', 		type:'monster', isBoss:true}
				
		,Konata: 		{ name:'Konata', 		type:'monster', isBoss:true}	
		,MikuruAsahina: 	{ name:'Mikuru Asahina', 	type:'monster', isBoss:true}	
		,RyoukoAsakura: 	{ name:'Ryouko Asakura', 	type:'monster', isBoss:true}	
		,YukiNagato: 		{ name:'Yuki Nagato', 	type:'monster', isBoss:true}
		
		,Yggdrasil: 		{ name:'Yggdrasil', 	type:'monster', isBoss:true}
		,Skuld: 		{ name:'Skuld', 	type:'monster', isBoss:true}	
		,Urd: 			{ name:'Urd', 	type:'monster', isBoss:true}	
		,Verdandi: 		{ name:'Verdandi', 	type:'monster', isBoss:true}
		
		,Rhaegal: 		{ name:'Rhaegal', 	type:'monster', isBoss:true}	
		,Viserion: 		{ name:'Viserion', 	type:'monster', isBoss:true}	
		,Drogon: 		{ name:'Drogon', 	type:'monster', isBoss:true}
		
		,RealLife: 			{ name:'Real Life', 			type:'monster', isBoss:true}	
		,InvisiblePinkUnicorn:  	{ name:'Invisible Pink Unicorn', 	type:'monster', isBoss:true}	
		,FlyingSpaghettiMonster:  	{ name:'Flying Spaghetti Monster', type:'monster', isBoss:true}	
		// 按名称查找。
		,name : (function() {
			var map = null;
			return function(name) {
				if (map === null) {
					map = {};
					ac.object.map(ac.symbols.Bosses,'name', map);
				}
				return map[name];
			}
		}())
	}
	// battle log
	,RandomEncounter:	{ name:'random encounter'}
	,ChallengeStart:	{ name:'battle start'}	
	,RoundStart:		{ name:'round start'}
	,SpawnMonster:	{ name:'spawn monster'}
}