ac.namespace('ac.e');

//*** 事件 ***
//将消息递送给所有订阅者，调用各自注册的处理函数。

//问题：消息被多个任务响应，任务A要求最先响应，任务C要求最后响应。
//解答：执行顺序意味这些任务存在潜在的相关性。
// 		任务B“后于”任务A，未必就是直接更在任务A后边执行。
//		任务B也可能“后于”整个任务集合。
//解决：自设优先级。

//发布消息。
ac.e.publish = function(eventName,data) {
	
}

//订阅消息。
ac.e.subscribe =  function(eventName, handler) {

}