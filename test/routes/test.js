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
	res.send("get test/routes");
}

function getTestParameter(req, res){
	res.send(req.params.id + " test/routes");
}

function postTest(req, res){
	res.send("post test/routes");
}

function postTestParameter(req, res){
	res.send(req.params.id + " test/routes");
}

function deleteTest(req, res){
	res.send(req.params.id + " test/routes");
}
