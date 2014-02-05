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
	res.send("api/2/get");
}

function getTestParameter(req, res){
	res.send(req.params.id);
}

function postTest(req, res){
	res.send("api/2/post");
}

function postTestParameter(req, res){
	res.send(req.params.id);
}

function deleteTest(req, res){
	res.send(req.params.id);
}