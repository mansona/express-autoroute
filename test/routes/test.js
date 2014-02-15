module.exports.autoroute = {
	get: {
		'/getTest' : getTest,
		'/getTest/:id' : getTestParameter
	},
	post: {
		'/postTest' : postTest,
		'/postTest/:id' : postTestParameter,
	},
	delete: {
		'/deleteTest/:id' : deleteTest
	}
};

function getTest(req, res){
	res.send("get");
}

function getTestParameter(req, res){
	res.send(req.params.id);
}

function postTest(req, res){
	res.send("post");
}

function postTestParameter(req, res){
	res.send(req.params.id);
}

function deleteTest(req, res){
	res.send(req.params.id);
}