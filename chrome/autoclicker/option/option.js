function init() {
	
	// 挂钩数据域的失焦和点击事件，即时保存用户修改。
	var inputs = document.querySelectorAll('input[data="true"]');
	for(var i=0; i< inputs.length;i++) {
		var input = inputs[i];
		if (input.type == "checkbox") 
			input.onclick = onSave;
		else 
			input.onblur = onSave;
	}
}


function onSave() {
	saveAll();
}

// 提交表单。
function saveAll() {
	
	//遍历所有表单。
	var forms = document.querySelectorAll('form[data="true"]');
	for (var j = 0 ;j<forms.length;j++) {
		save(forms[j]);
	}
}

function save(form) {
	
	// 遍历该表单的数据域，合并成一个对象，然后保存。
	var fields = document.querySelectorAll('#' + form.id + ' input[data="true"]');
	var obj = {};
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i]
		var b;
		
		// 若数据域为checkbox
		if (field.type == 'checkbox') 
			b = field.checked;
		else
			b = field.value;
		
		var n = field.name;
		obj[n] = b;							// 形如{autofight:ture,...}
	}
	auto.db.setItem(form.getAttribute('path'), obj);
}

// 提取表单内容。
function load(formid) {

	// 表单的path属性指定了数据库key值，依据该值读取保存的数据。
	var key = this[formid].getAttribute('path');
	var obj = auto.db.getItem(key);
	
	// 如果是首次使用，数据库还未存入任何内容，则结束操作。
	if (!obj) {
	
		// 返回false，告诉外部程序数据库没有该表单对应的条目。
		return false;
	}
	
	// 遍历该表单的数据域，依据name属性到对象中查找值。
	var fields = document.querySelectorAll('#'+formid+' input[data="true"]');
	for(var i=0;i<fields.length;i++) {
		
	
		// 若数据域是CheckBox类型，则需要设定checked属性。
		if (fields[i].type=="checkbox") 
			fields[i].checked = obj[fields[i].name];
		else
			fields[i].value = obj[fields[i].name];
	}
	return true;
}

// 页面加载时应执行的内容。
function run() {
	init();
	
	// 遍历所有数据表单，加载数据内容。
	var forms = document.querySelectorAll('form[data="true"]');
	for(var i=0; i< forms.length;i++) {
	
		// 若载入数据失败，则将UI预设值保存回数据库。
		if (!load(forms[i].id)) {
			save(forms[i]);
		}
	}
}

// 跑吧，兄弟！
run();


